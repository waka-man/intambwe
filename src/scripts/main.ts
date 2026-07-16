// INTAMBWE — interactions
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const canHover = window.matchMedia('(hover: hover)').matches;

// ---- Preloader ----
window.addEventListener('load', () => {
  const pre = document.querySelector('.preloader') as HTMLElement | null;
  if (!pre) return;
  setTimeout(() => pre.classList.add('is-done'), reduce ? 200 : 700);
  document.body.classList.remove('no-scroll');
});

// ---- Scroll reveal ----
const reveals = document.querySelectorAll<HTMLElement>('[data-reveal]');
if (reveals.length) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add('is-in');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
  reveals.forEach((el) => io.observe(el));
}

// ---- Custom cursor ----
if (canHover && !reduce) {
  const dot = document.createElement('div');
  const ring = document.createElement('div');
  dot.className = 'cursor';
  ring.className = 'cursor-ring';
  document.body.append(dot, ring);
  let rx = 0, ry = 0, tx = 0, ty = 0;
  window.addEventListener('mousemove', (e) => {
    tx = e.clientX; ty = e.clientY;
    dot.style.transform = `translate(${tx}px, ${ty}px) translate(-50%, -50%)`;
  });
  const loop = () => {
    rx += (tx - rx) * 0.18;
    ry += (ty - ry) * 0.18;
    ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
    requestAnimationFrame(loop);
  };
  loop();
  document.querySelectorAll('a, button, [data-cursor]').forEach((el) => {
    el.addEventListener('mouseenter', () => ring.classList.add('is-active'));
    el.addEventListener('mouseleave', () => ring.classList.remove('is-active'));
  });
}

// ---- Magnetic buttons ----
if (canHover && !reduce) {
  document.querySelectorAll<HTMLElement>('[data-magnetic]').forEach((el) => {
    el.addEventListener('mousemove', (e) => {
      const r = el.getBoundingClientRect();
      const x = e.clientX - (r.left + r.width / 2);
      const y = e.clientY - (r.top + r.height / 2);
      el.style.transform = `translate(${x * 0.25}px, ${y * 0.35}px)`;
    });
    el.addEventListener('mouseleave', () => { el.style.transform = ''; });
  });
}

// ---- Header scroll state ----
const header = document.querySelector('[data-header]');
if (header) {
  const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 40);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
}

// ---- Mobile nav ----
const navToggle = document.querySelector('[data-nav-toggle]') as HTMLElement | null;
const navPanel = document.querySelector('[data-nav-panel]') as HTMLElement | null;
if (navToggle && navPanel) {
  const set = (open: boolean) => {
    navToggle.setAttribute('aria-expanded', String(open));
    navPanel.classList.toggle('is-open', open);
    document.body.classList.toggle('no-scroll', open);
  };
  navToggle.addEventListener('click', () => set(navToggle.getAttribute('aria-expanded') !== 'true'));
  navPanel.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => set(false)));
}

// ---- Live Kigali clock ----
const clock = document.querySelector('[data-clock]');
if (clock) {
  const fmt = () =>
    new Intl.DateTimeFormat('en-GB', {
      hour: '2-digit', minute: '2-digit', second: '2-digit',
      timeZone: 'Africa/Kigali', hour12: false,
    }).format(new Date());
  clock.textContent = fmt();
  setInterval(() => (clock.textContent = fmt()), 1000);
}

// ---- Hero parallax-ish tilt ----
const heroImg = document.querySelector('[data-hero-img]') as HTMLElement | null;
if (heroImg && canHover && !reduce) {
  const onMove = (e: MouseEvent) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 14;
    const y = (e.clientY / window.innerHeight - 0.5) * 14;
    heroImg.style.transform = `scale(1.06) translate(${x}px, ${y}px)`;
  };
  window.addEventListener('mousemove', onMove);
}

// ---- Footer year ----
const yEl = document.querySelector('[data-year]');
if (yEl) yEl.textContent = String(new Date().getFullYear());
