// All of the site's client-side behaviour lives here. Every feature is an
// enhancement: with JavaScript off, the page still shows all of its content.

const root = document.documentElement;
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = matchMedia('(hover: hover) and (pointer: fine)').matches;

// Tells the page's safety timer that this script started, so content stays hidden
// until it scrolls into view. If the script fails, everything is shown instead.
(window as unknown as { __siteReady?: boolean }).__siteReady = true;

// --- Reveal elements as they scroll into view ------------------------------

const reveals = document.querySelectorAll<HTMLElement>('[data-reveal]');
if (reduceMotion || !('IntersectionObserver' in window)) {
  reveals.forEach((el) => el.classList.add('is-in'));
} else {
  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      }
    },
    { threshold: 0.1, rootMargin: '0px 0px -5% 0px' },
  );
  reveals.forEach((el) => io.observe(el));
}

// --- Numbers count up the first time they're seen --------------------------

const counters = document.querySelectorAll<HTMLElement>('[data-count]');
if (!reduceMotion && 'IntersectionObserver' in window && counters.length) {
  const countIO = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        countIO.unobserve(entry.target);
        const el = entry.target as HTMLElement;
        const to = parseFloat(el.dataset.count ?? '0');
        const decimals = parseInt(el.dataset.decimals ?? '0', 10);
        const start = performance.now();
        const duration = 1500;
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / duration);
          el.textContent = (to * (1 - Math.pow(1 - t, 4))).toFixed(decimals);
          if (t < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    },
    { threshold: 0.6 },
  );
  counters.forEach((el) => countIO.observe(el));
}

// --- A warm light that follows the cursor ----------------------------------

const ambient = document.querySelector<HTMLElement>('.ambient');
if (ambient && finePointer && !reduceMotion) {
  let targetX = innerWidth * 0.72;
  let targetY = innerHeight * 0.24;
  let x = targetX;
  let y = targetY;
  let frame = 0;
  const follow = () => {
    x += (targetX - x) * 0.12;
    y += (targetY - y) * 0.12;
    ambient.style.setProperty('--lx', `${x.toFixed(1)}px`);
    ambient.style.setProperty('--ly', `${y.toFixed(1)}px`);
    frame = Math.abs(targetX - x) > 0.5 || Math.abs(targetY - y) > 0.5 ? requestAnimationFrame(follow) : 0;
  };
  addEventListener(
    'pointermove',
    (event) => {
      targetX = event.clientX;
      targetY = event.clientY;
      if (!frame) frame = requestAnimationFrame(follow);
    },
    { passive: true },
  );
}

// --- Cards glow where the cursor is, and the featured screenshot tilts -----

if (finePointer) {
  document.addEventListener(
    'pointermove',
    (event) => {
      const card = (event.target as Element).closest?.<HTMLElement>('.spot');
      if (!card) return;
      const rect = card.getBoundingClientRect();
      card.style.setProperty('--sx', `${event.clientX - rect.left}px`);
      card.style.setProperty('--sy', `${event.clientY - rect.top}px`);
    },
    { passive: true },
  );

  if (!reduceMotion) {
    document.querySelectorAll<HTMLElement>('.card--featured').forEach((card) => {
      const shot = card.querySelector<HTMLElement>('[data-tilt]');
      if (!shot) return;
      card.addEventListener('pointermove', (event) => {
        const rect = card.getBoundingClientRect();
        const px = (event.clientX - rect.left) / rect.width - 0.5;
        const py = (event.clientY - rect.top) / rect.height - 0.5;
        shot.style.setProperty('--ry', `${(px * 6).toFixed(2)}deg`);
        shot.style.setProperty('--rx', `${(-py * 5).toFixed(2)}deg`);
      });
      card.addEventListener('pointerleave', () => {
        shot.style.removeProperty('--ry');
        shot.style.removeProperty('--rx');
      });
    });
  }
}

// --- Scroll: progress bar, timeline, and which nav link is current ---------

const progress = document.querySelector<HTMLElement>('.progress');
const timeline = document.querySelector<HTMLElement>('[data-timeline]');
const timelineItems = timeline ? Array.from(timeline.querySelectorAll<HTMLElement>('.t-item')) : [];
const navLinks = Array.from(document.querySelectorAll<HTMLAnchorElement>('.site-nav a[href^="/#"]'));

const onScroll = () => {
  const max = root.scrollHeight - innerHeight;
  progress?.style.setProperty('--scroll', max > 0 ? String(Math.min(1, scrollY / max)) : '0');

  if (timeline) {
    const rect = timeline.getBoundingClientRect();
    const line = innerHeight * 0.58;
    timeline.style.setProperty('--p', Math.min(1, Math.max(0, (line - rect.top) / rect.height)).toFixed(3));
    timelineItems.forEach((item) => item.classList.toggle('is-lit', item.getBoundingClientRect().top + 12 < line));
  }

  if (scrollY < 240) navLinks.forEach((link) => link.removeAttribute('aria-current'));
};

let scrollQueued = false;
const queueScroll = () => {
  if (scrollQueued) return;
  scrollQueued = true;
  requestAnimationFrame(() => {
    scrollQueued = false;
    onScroll();
  });
};
addEventListener('scroll', queueScroll, { passive: true });
addEventListener('resize', queueScroll, { passive: true });
onScroll();

if ('IntersectionObserver' in window && location.pathname === '/') {
  const sections = new Map<Element, HTMLAnchorElement>();
  for (const link of navLinks) {
    const section = document.getElementById(new URL(link.href).hash.slice(1));
    if (section) sections.set(section, link);
  }
  const spy = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting || scrollY < 240) continue;
        navLinks.forEach((link) => link.removeAttribute('aria-current'));
        sections.get(entry.target)?.setAttribute('aria-current', 'true');
      }
    },
    { rootMargin: '-40% 0px -55% 0px' },
  );
  sections.forEach((_, section) => spy.observe(section));
}

// --- Filter the projects by type -------------------------------------------

const filterBar = document.querySelector<HTMLElement>('[data-filters]');
if (filterBar) {
  filterBar.hidden = false;
  const items = document.querySelectorAll<HTMLElement>('[data-project]');
  const groups = document.querySelectorAll<HTMLElement>('[data-group]');
  const status = document.querySelector<HTMLElement>('[data-filter-status]');
  filterBar.addEventListener('click', (event) => {
    const button = (event.target as Element).closest<HTMLButtonElement>('button[data-filter]');
    if (!button) return;
    const wanted = button.dataset.filter;
    filterBar.querySelectorAll('button').forEach((b) => b.setAttribute('aria-pressed', String(b === button)));
    let count = 0;
    items.forEach((item) => {
      const show = wanted === 'all' || item.dataset.type === wanted;
      item.hidden = !show;
      if (!show) return;
      count++;
      item.classList.add('is-in');
      item.classList.remove('is-shown');
      void item.offsetWidth; // restart the fade-in
      item.classList.add('is-shown');
    });
    // Hide a whole section (like "More work") when the filter leaves nothing in it.
    groups.forEach((group) => (group.hidden = !group.querySelector('[data-project]:not([hidden])')));
    if (status) status.textContent = `Showing ${count} ${count === 1 ? 'project' : 'projects'}`;
  });
}

// --- Switch the highlighted option in a case-study comparison ---------------

document.querySelectorAll<HTMLElement>('[data-compare]').forEach((compare) => {
  const switcher = compare.querySelector<HTMLElement>('[data-compare-switch]');
  const value = compare.querySelector<HTMLElement>('[data-compare-value]');
  const label = compare.querySelector<HTMLElement>('[data-compare-label]');
  if (!switcher || !value || !label) return;
  switcher.hidden = false;
  switcher.addEventListener('change', (event) => {
    const input = event.target as HTMLInputElement;
    if (input.type !== 'radio') return;
    compare.querySelectorAll<HTMLElement>('[data-option]').forEach((el) => {
      const on = el.dataset.option === input.value;
      el.classList.toggle('is-selected', on);
      if (on && el.dataset.value) {
        value.textContent = el.dataset.value;
        label.textContent = el.dataset.label ?? '';
      }
    });
  });
});

// --- Highlight the current section in a case study's contents list ----------

const tocLinks = Array.from(document.querySelectorAll<HTMLAnchorElement>('.toc a[href^="#"]'));
if (tocLinks.length && 'IntersectionObserver' in window) {
  const headings = new Map<Element, HTMLAnchorElement>();
  for (const link of tocLinks) {
    const heading = document.getElementById(decodeURIComponent(link.hash.slice(1)));
    if (heading) headings.set(heading, link);
  }
  const tocSpy = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        tocLinks.forEach((link) => link.removeAttribute('aria-current'));
        headings.get(entry.target)?.setAttribute('aria-current', 'true');
      }
    },
    { rootMargin: '-15% 0px -75% 0px' },
  );
  headings.forEach((_, heading) => tocSpy.observe(heading));
}

// --- Copy the email address ------------------------------------------------

const copyButton = document.querySelector<HTMLButtonElement>('[data-copy]');
const copyStatus = document.querySelector<HTMLElement>('[data-copy-status]');
if (copyButton && copyStatus && navigator.clipboard) {
  copyButton.hidden = false;
  copyButton.addEventListener('click', () =>
    navigator.clipboard.writeText(copyButton.dataset.copy ?? '').then(
      () => (copyStatus.textContent = 'Email copied'),
      () => (copyStatus.textContent = 'Couldn’t copy. Select the address instead.'),
    ),
  );
}

// --- Local time in the footer ----------------------------------------------

const clock = document.querySelector<HTMLElement>('[data-clock]');
if (clock) {
  try {
    const format = new Intl.DateTimeFormat('en-CA', { hour: 'numeric', minute: '2-digit', timeZone: clock.dataset.tz });
    const tick = () => (clock.textContent = `${clock.dataset.city} · ${format.format(new Date())}`);
    tick();
    clock.hidden = false;
    setInterval(tick, 20000);
  } catch {
    // An unknown time zone just leaves the clock hidden.
  }
}
