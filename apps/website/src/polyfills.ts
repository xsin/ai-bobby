// Older mobile WebViews (iOS Safari < 15.4, Android WebView < 92) miss
// Array/String.prototype.at, which modern bundles can still call at runtime.
interface AtCapable {
  at?: (index: number) => unknown
}

function defineAt(proto: AtCapable, get: (self: unknown, index: number) => unknown): void {
  if (typeof proto.at === 'function') return
  Object.defineProperty(proto, 'at', {
    configurable: true,
    writable: true,
    value: function at(this: unknown, index: number): unknown {
      const self = this as { length: number }
      const length = self.length >>> 0
      const relative = Math.trunc(index) || 0
      const position = relative < 0 ? length + relative : relative
      return position < 0 || position >= length ? undefined : get(self, position)
    },
  })
}

defineAt(Array.prototype as unknown as AtCapable, (self, index) => (self as unknown[])[index])
defineAt(String.prototype as unknown as AtCapable, (self, index) => (self as string)[index])
