const english = document.documentElement.lang === 'en';
const revealButton = document.getElementById('reveal-email');
const emailAddress = document.getElementById('email-address');
const copyButton = document.getElementById('copy-email');
const copyStatus = document.getElementById('copy-status');
let contactAddress = '';
revealButton.addEventListener('click', () => {
  contactAddress = atob('aGVsbG8=') + String.fromCharCode(64) + atob('cGF0cnljb2RlLm5ldA==');
  emailAddress.textContent = contactAddress;
  emailAddress.href = 'mailto:' + contactAddress;
  emailAddress.hidden = false;
  copyButton.hidden = false;
  revealButton.hidden = true;
  emailAddress.focus();
});
copyButton.addEventListener('click', async () => {
  if (!contactAddress) return;
  try {
    await navigator.clipboard.writeText(contactAddress);
    copyButton.textContent = english ? 'Copied' : 'Skopiowano';
    copyStatus.textContent = english ? 'Email address copied to clipboard.' : 'Adres e-mail jest w schowku.';
  } catch {
    copyStatus.textContent = english ? 'Select and copy the email address shown.' : 'Zaznacz i skopiuj widoczny adres e-mail.';
  }
});
if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.remove('is-pending');
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });
  document.querySelectorAll('.reveal').forEach((element) => {
    if (element.getBoundingClientRect().top > window.innerHeight) {
      element.classList.add('is-pending');
      observer.observe(element);
    }
  });
}

// Section navigation reflects the section under the viewport's centre.
const sections = [...document.querySelectorAll('.page-section')];
const indicators = [...document.querySelectorAll('.section-indicator a')];
let sectionFrame = 0;
function updateSection() {
  sectionFrame = 0;
  const middle = window.innerHeight / 2;
  let current = sections[0];
  for (const section of sections) {
    const bounds = section.getBoundingClientRect();
    if (bounds.top <= middle && bounds.bottom > middle) { current = section; break; }
  }
  indicators.forEach((link) => {
    if (link.getAttribute('href') === '#' + current.id) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  });
}
window.addEventListener('scroll', () => { if (!sectionFrame) sectionFrame = requestAnimationFrame(updateSection); }, { passive: true });
window.addEventListener('resize', updateSection);
updateSection();

// An abstract dot field gently bends around the pointer. It rests when untouched.
const canvas = document.getElementById('pointer-art');
const art = canvas.parentElement;
const context = canvas.getContext('2d');
if (context) {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const finePointer = window.matchMedia('(pointer: fine)');
  let width = 0, height = 0, frame = 0;
  let x = -1000, y = -1000, targetX = -1000, targetY = -1000;
  function draw() {
    frame = 0;
    x += (targetX - x) * .12;
    y += (targetY - y) * .12;
    context.clearRect(0, 0, width, height);
    const step = width < 500 ? 27 : 36;
    const fieldWidth = Math.min(width * .7, 680);
    const fieldHeight = Math.min(height * .66, 340);
    const left = (width - fieldWidth) / 2;
    const top = (height - fieldHeight) / 2;
    for (let row = 0; row <= fieldHeight; row += step) {
      for (let col = 0; col <= fieldWidth; col += step) {
        const px = left + col, py = top + row;
        const dx = px - x, dy = py - y;
        const distance = Math.hypot(dx, dy);
        const force = reducedMotion.matches ? 0 : Math.max(0, 1 - distance / 160);
        const shift = force * force * 28;
        context.beginPath();
        context.arc(px + dx / (distance || 1) * shift, py + dy / (distance || 1) * shift, 1.3 + force * 1.5, 0, Math.PI * 2);
        context.fillStyle = `rgba(32,34,31,${.12 + force * .55})`;
        context.fill();
      }
    }
    if (!reducedMotion.matches && Math.abs(targetX - x) + Math.abs(targetY - y) > .2) frame = requestAnimationFrame(draw);
  }
  function resizeArt() {
    const bounds = art.getBoundingClientRect();
    width = bounds.width; height = bounds.height;
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(width * ratio); canvas.height = Math.round(height * ratio);
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
    if (frame) cancelAnimationFrame(frame);
    draw();
  }
  art.addEventListener('pointermove', (event) => {
    if (reducedMotion.matches || !finePointer.matches) return;
    const bounds = art.getBoundingClientRect();
    targetX = event.clientX - bounds.left; targetY = event.clientY - bounds.top;
    if (x === -1000) { x = targetX; y = targetY; }
    if (!frame) frame = requestAnimationFrame(draw);
  });
  art.addEventListener('pointerleave', () => { targetX = -1000; targetY = -1000; if (!frame) frame = requestAnimationFrame(draw); });
  document.addEventListener('visibilitychange', () => { if (document.hidden && frame) { cancelAnimationFrame(frame); frame = 0; } });
  reducedMotion.addEventListener('change', () => { if (frame) cancelAnimationFrame(frame); draw(); });
  new ResizeObserver(resizeArt).observe(art);
}
