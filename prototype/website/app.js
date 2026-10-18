const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

const hideBoot = () => $('#boot')?.classList.add('is-done');
if (reduceMotion || new URLSearchParams(location.search).has('noboot')) {
  hideBoot();
} else {
  window.setTimeout(hideBoot, 900);
}

/* ------------------------------------------------------------------ */
/* Reveal / counters                                                   */
/* ------------------------------------------------------------------ */

const revealObserver = new IntersectionObserver(
  entries => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  },
  { threshold: 0.14, rootMargin: '0px 0px -8% 0px' },
);

for (const element of $$('[data-reveal]')) revealObserver.observe(element);

const counterObserver = new IntersectionObserver(
  entries => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      const element = entry.target;
      const target = Number(element.dataset.count ?? 0);
      const start = performance.now();
      const duration = reduceMotion ? 0 : 900;
      const tick = now => {
        const progress = duration === 0 ? 1 : Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - progress, 3);
        element.textContent = String(Math.round(target * eased));
        if (progress < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      counterObserver.unobserve(element);
    }
  },
  { threshold: 0.6 },
);

for (const element of $$('[data-count]')) counterObserver.observe(element);

/* ------------------------------------------------------------------ */
/* Nav / scroll / cursor                                               */
/* ------------------------------------------------------------------ */

const nav = $('#nav');
const progress = $('#scrollProgress');
const menuButton = $('#menuButton');
const navLinks = $('.nav-links');

const onScroll = () => {
  nav?.classList.toggle('scrolled', window.scrollY > 12);
  const max = document.documentElement.scrollHeight - window.innerHeight;
  if (progress) progress.style.width = `${max > 0 ? (window.scrollY / max) * 100 : 0}%`;
};

window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

menuButton?.addEventListener('click', () => {
  const open = navLinks?.classList.toggle('open') ?? false;
  menuButton.setAttribute('aria-expanded', String(open));
});

for (const link of $$('.nav-links a')) {
  link.addEventListener('click', () => {
    navLinks?.classList.remove('open');
    menuButton?.setAttribute('aria-expanded', 'false');
  });
}

const glow = $('#cursorGlow');
if (glow && !reduceMotion && window.matchMedia('(pointer: fine)').matches) {
  let x = window.innerWidth / 2;
  let y = window.innerHeight / 2;
  let targetX = x;
  let targetY = y;
  window.addEventListener(
    'pointermove',
    event => {
      targetX = event.clientX;
      targetY = event.clientY;
    },
    { passive: true },
  );
  const renderGlow = () => {
    x += (targetX - x) * 0.1;
    y += (targetY - y) * 0.1;
    glow.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    requestAnimationFrame(renderGlow);
  };
  requestAnimationFrame(renderGlow);
}

/* ------------------------------------------------------------------ */
/* Protocol tabs                                                       */
/* ------------------------------------------------------------------ */

const protocols = {
  chat: {
    path: '/v1/chat/completions',
    client: 'WorkBuddy · DSH · any OpenAI client',
    code: `curl http://127.0.0.1:46890/v1/chat/completions \\
  -H "Authorization: Bearer $AI_BOBBY_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "wb/hy3",
    "stream": true,
    "messages": [
      { "role": "user", "content": "你好" }
    ]
  }'`,
  },
  responses: {
    path: '/v1/responses',
    client: 'Codex · Responses API',
    code: `curl http://127.0.0.1:46890/v1/responses \\
  -H "Authorization: Bearer $AI_BOBBY_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "oc/space-bunny-free",
    "input": "Explain local-first AI gateways.",
    "stream": true
  }'`,
  },
  messages: {
    path: '/v1/messages',
    client: 'Claude Code · Anthropic Messages',
    code: `curl http://127.0.0.1:46890/v1/messages \\
  -H "Authorization: Bearer $AI_BOBBY_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "wbi/glm-5.3",
    "max_tokens": 512,
    "messages": [
      { "role": "user", "content": "你好" }
    ]
  }'`,
  },
};

const codeElement = $('#protocolCode');
const pathElement = $('#protocolPath');
const clientElement = $('#protocolClient');

const escapeHtml = value =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const highlight = code => {
  let html = escapeHtml(code);
  html = html.replace(/(&quot;.*?&quot;|".*?")/g, '<span class="tok-str">$1</span>');
  html = html.replace(/\b(curl|http|https|Authorization|Bearer|Content-Type|application\/json)\b/g, '<span class="tok-key">$1</span>');
  html = html.replace(/\b(true|false|null)\b/g, '<span class="tok-num">$1</span>');
  html = html.replace(/(#.*)$/gm, '<span class="tok-com">$1</span>');
  return html;
};

const setProtocol = name => {
  const data = protocols[name] ?? protocols.chat;
  if (codeElement) codeElement.innerHTML = highlight(data.code);
  if (pathElement) pathElement.textContent = data.path;
  if (clientElement) clientElement.textContent = data.client;
  for (const tab of $$('.protocol-tab')) {
    const active = tab.dataset.protocol === name;
    tab.classList.toggle('active', active);
    tab.setAttribute('aria-selected', String(active));
  }
};

for (const tab of $$('.protocol-tab')) {
  tab.addEventListener('click', () => setProtocol(tab.dataset.protocol));
}
setProtocol('chat');

/* ------------------------------------------------------------------ */
/* Copy / toasts                                                       */
/* ------------------------------------------------------------------ */

const commandToast = $('#commandToast');

const copyText = async text => {
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    const area = document.createElement('textarea');
    area.value = text;
    area.style.position = 'fixed';
    area.style.opacity = '0';
    document.body.appendChild(area);
    area.select();
    document.execCommand('copy');
    area.remove();
  }
};

const showCommandToast = message => {
  if (!commandToast) return;
  commandToast.textContent = message;
  commandToast.classList.add('show');
  window.clearTimeout(showCommandToast.timer);
  showCommandToast.timer = window.setTimeout(() => commandToast.classList.remove('show'), 1900);
};

for (const button of $$('[data-copy]')) {
  button.addEventListener('click', async () => {
    await copyText(button.dataset.copy);
    button.classList.add('copied');
    showCommandToast('Install command copied to clipboard');
    window.setTimeout(() => button.classList.remove('copied'), 1500);
  });
}

const installToast = $('#installToast');
const updateToast = $('#updateToast');

const dismiss = toast => toast?.classList.remove('show');
for (const button of $$('.toast-close')) {
  button.addEventListener('click', () => dismiss(button.closest('.toast')));
}

installToast?.querySelector('.toast-action')?.addEventListener('click', async () => {
  await copyText('curl -fsSL https://xsin.github.io/ai-bobby/releases/latest/install.sh | bash');
  showCommandToast('Install command copied — demo prompt only');
  dismiss(installToast);
});

updateToast?.querySelector('.toast-action')?.addEventListener('click', () => {
  updateToast.querySelector('strong').textContent = 'Refreshing…';
  showCommandToast('Demo: service worker would activate the new version');
  window.setTimeout(() => dismiss(updateToast), 900);
});

const clean = new URLSearchParams(location.search).has('clean');
if (!clean) {
  window.setTimeout(() => installToast?.classList.add('show'), 6500);
  window.setTimeout(() => updateToast?.classList.add('show'), 10500);
}

/* ------------------------------------------------------------------ */
/* WebGL                                                               */
/* ------------------------------------------------------------------ */

const canvas = $('#webgl');

async function initWebGL() {
  if (!canvas || reduceMotion) {
    document.body.classList.add('no-webgl');
    return;
  }

  let THREE;
  try {
    THREE = await import('three');
  } catch {
    document.body.classList.add('no-webgl');
    return;
  }

  try {
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: false,
      alpha: false,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x05070d, 1);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.set(0, 0, 7);

    const uniforms = {
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uAspect: { value: window.innerWidth / window.innerHeight },
    };

    const backdrop = new THREE.Mesh(
      new THREE.PlaneGeometry(26, 18),
      new THREE.ShaderMaterial({
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
      }),
    );
    backdrop.position.z = -7;
    scene.add(backdrop);

    const field = new THREE.Group();
    scene.add(field);

    const count = 1400;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const seeds = new Float32Array(count);
    const color = new THREE.Color();

    for (let i = 0; i < count; i += 1) {
      const radius = 1.3 + Math.pow(Math.random(), 1.7) * 5.4;
      const angle = Math.random() * Math.PI * 2;
      const depth = (Math.random() - 0.5) * 3.2;
      positions[i * 3] = Math.cos(angle) * radius;
      positions[i * 3 + 1] = Math.sin(angle) * radius * 0.56 + depth * 0.35;
      positions[i * 3 + 2] = depth;
      color.setHSL(0.6 + Math.random() * 0.08, 0.78, 0.48 + Math.random() * 0.35);
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
      seeds[i] = Math.random() * Math.PI * 2;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute('aSeed', new THREE.BufferAttribute(seeds, 1));

    const pointsMaterial = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
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
    });

    const points = new THREE.Points(geometry, pointsMaterial);
    field.add(points);

    const knotGeometry = new THREE.TorusKnotGeometry(2.1, 0.018, 260, 12, 2, 3);
    const knot = new THREE.LineSegments(
      new THREE.WireframeGeometry(knotGeometry),
      new THREE.LineBasicMaterial({ color: 0x1e4fff, transparent: true, opacity: 0.1 }),
    );
    knot.rotation.x = 0.55;
    field.add(knot);

    const shell = new THREE.LineSegments(
      new THREE.WireframeGeometry(new THREE.IcosahedronGeometry(3.25, 2)),
      new THREE.LineBasicMaterial({ color: 0x5d8bff, transparent: true, opacity: 0.035 }),
    );
    field.add(shell);

    let mouseX = 0;
    let mouseY = 0;
    window.addEventListener(
      'pointermove',
      event => {
        mouseX = (event.clientX / window.innerWidth - 0.5) * 2;
        mouseY = (event.clientY / window.innerHeight - 0.5) * 2;
      },
      { passive: true },
    );

    const resize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8));
      renderer.setSize(width, height);
      uniforms.uAspect.value = width / height;
      pointsMaterial.uniforms.uPixelRatio.value = renderer.getPixelRatio();
    };
    window.addEventListener('resize', resize);

    let frameId = 0;
    let running = true;
    const clock = new THREE.Clock();

    const render = () => {
      if (!running) return;
      const time = clock.getElapsedTime();
      uniforms.uTime.value = time;
      uniforms.uMouse.value.set(mouseX * 0.5 + 0.5, -mouseY * 0.5 + 0.5);
      pointsMaterial.uniforms.uTime.value = time;

      field.rotation.y = time * 0.045 + mouseX * 0.08;
      field.rotation.x = -mouseY * 0.045;
      points.rotation.z = time * 0.018;
      knot.rotation.z = time * 0.08;
      knot.rotation.y = time * 0.06;
      shell.rotation.y = -time * 0.012;

      renderer.render(scene, camera);
      frameId = requestAnimationFrame(render);
    };
    render();

    document.addEventListener('visibilitychange', () => {
      running = !document.hidden;
      if (running) render();
    });

    window.addEventListener(
      'pagehide',
      () => {
        running = false;
        cancelAnimationFrame(frameId);
      },
      { once: true },
    );
  } catch {
    document.body.classList.add('no-webgl');
  }
}

initWebGL();
