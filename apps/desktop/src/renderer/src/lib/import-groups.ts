export type UiGroup = 'opencode' | 'workbuddy' | 'wbi'

/**
 * The renderer names the WorkBuddy AI source `wbi` (sidebar, selection state,
 * import sheet), while the gateway and importers address it as
 * `workbuddy-ai`. Sending the UI id through `ImportSelection.groups` made every
 * importer drop the WBI models, so the boundary converts here.
 */
export function toProviderGroups(groups: readonly string[]): string[] {
  return groups.map(group => (group === 'wbi' ? 'workbuddy-ai' : group))
}
