import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.body.classList.add('no-webgl')
      return
    }

    let renderer: THREE.WebGLRenderer
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: false,
        alpha: false,
        powerPreference: 'high-performance',
      })
    } catch {
      document.body.classList.add('no-webgl')
      return
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8))
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setClearColor(0x05070d, 1)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 100)
    camera.position.set(0, 0, 7)

    const uniforms = {
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uAspect: { value: window.innerWidth / window.innerHeight },
    }

    const backdropGeometry = new THREE.PlaneGeometry(26, 18)
    const backdropMaterial = new THREE.ShaderMaterial({
      uniforms,
      depthWrite: false,
      vertexShader: /* glsl */ `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: /* glsl */ `
        precision highp float;
        varying vec2 vUv;
        uniform float uTime;
        uniform float uAspect;
        uniform vec2 uMouse;

        float hash21(vec2 p) {
          p = fract(p * vec2(123.34, 456.21));
          p += dot(p, p + 45.32);
          return fract(p.x * p.y);
        }

        void main() {
          vec2 p = vUv - 0.5;
          p.x *= uAspect;
          vec2 mouse = (uMouse - 0.5) * 0.12;
          p += mouse;

          float r = length(p);
          float angle = atan(p.y, p.x);
          float swirl = sin(angle * 6.0 + r * 15.0 - uTime * 0.55) * 0.5 + 0.5;
          float glow = smoothstep(0.78, 0.0, r);
          float ring = smoothstep(0.018, 0.0, abs(fract(r * 5.5 - uTime * 0.13) - 0.5) - 0.475);
          float outer = smoothstep(0.04, 0.0, abs(fract(r * 2.2 + 0.15) - 0.5) - 0.49);

          vec3 col = vec3(0.004, 0.006, 0.016);
          col += vec3(0.014, 0.055, 0.26) * glow * 0.42;
          col += vec3(0.035, 0.14, 0.68) * ring * (0.08 + glow * 0.28);
          col += vec3(0.03, 0.1, 0.3) * outer * 0.12;
          col += vec3(0.1, 0.35, 0.9) * swirl * glow * 0.014;

          vec2 grid = floor(vUv * vec2(210.0, 150.0));
          float star = hash21(grid);
          if (star > 0.994) {
            float twinkle = 0.55 + 0.45 * sin(uTime * 1.4 + star * 40.0);
            col += vec3(0.45, 0.6, 1.0) * smoothstep(0.994, 1.0, star) * twinkle * 0.55;
          }

          col *= 1.0 - smoothstep(0.22, 0.92, r) * 0.8;
          float grain = (hash21(vUv * 1000.0 + uTime) - 0.5) * 0.012;
          gl_FragColor = vec4(col + grain, 1.0);
        }
      `,
    })
    const backdrop = new THREE.Mesh(backdropGeometry, backdropMaterial)
    backdrop.position.z = -7
    scene.add(backdrop)

    const field = new THREE.Group()
    scene.add(field)

    const count = 1400
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    const seeds = new Float32Array(count)
    const color = new THREE.Color()

    for (let i = 0; i < count; i += 1) {
      const radius = 1.3 + Math.pow(Math.random(), 1.7) * 5.4
      const angle = Math.random() * Math.PI * 2
      const depth = (Math.random() - 0.5) * 3.2
      positions[i * 3] = Math.cos(angle) * radius
      positions[i * 3 + 1] = Math.sin(angle) * radius * 0.56 + depth * 0.35
      positions[i * 3 + 2] = depth
      color.setHSL(0.6 + Math.random() * 0.08, 0.78, 0.48 + Math.random() * 0.35)
      colors[i * 3] = color.r
      colors[i * 3 + 1] = color.g
      colors[i * 3 + 2] = color.b
      seeds[i] = Math.random() * Math.PI * 2
    }

    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    geometry.setAttribute('aSeed', new THREE.BufferAttribute(seeds, 1))

    const pointsMaterial = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      vertexColors: true,
      uniforms: { uTime: { value: 0 }, uPixelRatio: { value: renderer.getPixelRatio() } },
      vertexShader: /* glsl */ `
        attribute float aSeed;
        varying vec3 vColor;
        varying float vAlpha;
        uniform float uTime;
        uniform float uPixelRatio;
        void main() {
          vColor = color;
          vec3 p = position;
          float pulse = sin(uTime * 0.8 + aSeed) * 0.5 + 0.5;
          p.z += sin(uTime * 0.35 + aSeed) * 0.18;
          vec4 mv = modelViewMatrix * vec4(p, 1.0);
          gl_Position = projectionMatrix * mv;
          gl_PointSize = (1.2 + pulse * 2.1) * uPixelRatio * (8.0 / -mv.z);
          vAlpha = 0.12 + pulse * 0.52;
        }
      `,
      fragmentShader: /* glsl */ `
        varying vec3 vColor;
        varying float vAlpha;
        void main() {
          vec2 uv = gl_PointCoord - 0.5;
          float d = length(uv);
          float a = smoothstep(0.5, 0.05, d) * vAlpha;
          gl_FragColor = vec4(vColor, a);
        }
      `,
    })

    const points = new THREE.Points(geometry, pointsMaterial)
    field.add(points)

    const knotGeometry = new THREE.TorusKnotGeometry(2.1, 0.018, 260, 12, 2, 3)
    const knotMaterial = new THREE.LineBasicMaterial({
      color: 0x1e4fff,
      transparent: true,
      opacity: 0.1,
    })
    const knot = new THREE.LineSegments(new THREE.WireframeGeometry(knotGeometry), knotMaterial)
    knot.rotation.x = 0.55
    field.add(knot)

    const shellGeometry = new THREE.IcosahedronGeometry(3.25, 2)
    const shellMaterial = new THREE.LineBasicMaterial({
      color: 0x5d8bff,
      transparent: true,
      opacity: 0.035,
    })
    const shell = new THREE.LineSegments(new THREE.WireframeGeometry(shellGeometry), shellMaterial)
    field.add(shell)

    let mouseX = 0
    let mouseY = 0
    const onPointerMove = (event: PointerEvent) => {
      mouseX = (event.clientX / window.innerWidth - 0.5) * 2
      mouseY = (event.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('pointermove', onPointerMove, { passive: true })

    const resize = () => {
      const width = window.innerWidth
      const height = window.innerHeight
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8))
      renderer.setSize(width, height)
      uniforms.uAspect.value = width / height
      pointsMaterial.uniforms.uPixelRatio!.value = renderer.getPixelRatio()
    }
    window.addEventListener('resize', resize)

    const startedAt = performance.now()
    let frameId = 0
    let running = true

    const render = () => {
      if (!running) return
      const time = (performance.now() - startedAt) / 1000
      uniforms.uTime.value = time
      uniforms.uMouse.value.set(mouseX * 0.5 + 0.5, -mouseY * 0.5 + 0.5)
      pointsMaterial.uniforms.uTime!.value = time

      field.rotation.y = time * 0.045 + mouseX * 0.08
      field.rotation.x = -mouseY * 0.045
      points.rotation.z = time * 0.018
      knot.rotation.z = time * 0.08
      knot.rotation.y = time * 0.06
      shell.rotation.y = -time * 0.012

      renderer.render(scene, camera)
      frameId = requestAnimationFrame(render)
    }
    render()

    const onVisibility = () => {
      running = !document.hidden
      if (running) render()
    }
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      running = false
      cancelAnimationFrame(frameId)
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('resize', resize)
      document.removeEventListener('visibilitychange', onVisibility)
      document.body.classList.remove('no-webgl')
      scene.traverse(object => {
        if (object instanceof THREE.Mesh || object instanceof THREE.LineSegments || object instanceof THREE.Points) {
          object.geometry.dispose()
          const material = object.material
          if (Array.isArray(material)) material.forEach(item => item.dispose())
          else material.dispose()
        }
      })
      renderer.dispose()
    }
  }, [])

  return <canvas id="webgl" ref={canvasRef} aria-hidden="true" />
}
