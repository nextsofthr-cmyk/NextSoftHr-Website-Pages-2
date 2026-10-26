/**
 * Helpers for legal pages where the long document column sits in a panel the
 * same height as the sidebar. On desktop the two-column row is pinned (sticky)
 * inside a taller "track", and normal page scrolling drives the panel's
 * content, so scrolling anywhere on the page moves the document.
 *
 * Markup: <div data-scroll-track> <div class="lg:sticky ..."> ... <div id={panelId}>
 *           <div>content</div> </div> ... </div> </div>
 */
import { useEffect } from 'react';

interface PinState {
  panel: HTMLElement;
  track: HTMLElement;
  sticky: HTMLElement;
  start: number; // window scrollY where the row becomes pinned
  extra: number; // how far the panel content can scroll
}

const getPin = (panelId: string): PinState | null => {
  const panel = document.getElementById(panelId);
  const track = panel?.closest<HTMLElement>('[data-scroll-track]');
  const sticky = track?.firstElementChild as HTMLElement | null;
  if (!panel || !track || !sticky) return null;

  const stickyStyle = getComputedStyle(sticky);
  if (stickyStyle.position !== 'sticky') return null; // mobile: normal page flow

  const stickyTop = parseFloat(stickyStyle.top) || 0;
  const start = track.getBoundingClientRect().top + window.pageYOffset - stickyTop;
  const extra = Math.max(0, panel.scrollHeight - panel.clientHeight);
  return { panel, track, sticky, start, extra };
};

// True when the panel is currently clipping its own content (desktop)
export const isPanelScrolling = (panel: HTMLElement | null): panel is HTMLElement =>
  !!panel &&
  getComputedStyle(panel).overflowY !== 'visible' &&
  panel.scrollHeight > panel.clientHeight;

// Lets page scrolling drive the panel content while the row is pinned
export const usePinnedScrollPanel = (panelId: string) => {
  useEffect(() => {
    const panel = document.getElementById(panelId);
    const track = panel?.closest<HTMLElement>('[data-scroll-track]');
    const sticky = track?.firstElementChild as HTMLElement | null;
    if (!panel || !track || !sticky) return;

    const sync = () => {
      const pin = getPin(panelId);
      if (!pin) return;
      panel.scrollTop = Math.min(pin.extra, Math.max(0, window.pageYOffset - pin.start));
    };

    // Track height = pinned row height + scrollable content distance
    const measure = () => {
      const pin = getPin(panelId);
      track.style.height = pin ? `${sticky.offsetHeight + pin.extra}px` : '';
      sync();
    };

    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(sticky);
    if (panel.firstElementChild) resizeObserver.observe(panel.firstElementChild);

    window.addEventListener('scroll', sync, { passive: true });
    window.addEventListener('resize', measure);
    measure();

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('scroll', sync);
      window.removeEventListener('resize', measure);
      track.style.height = '';
    };
  }, [panelId]);
};

// Scroll the page so a section comes into view (inside the pinned panel on desktop)
export const scrollToSection = (id: string, panelId: string, windowOffset = 120) => {
  const target = document.getElementById(id);
  if (!target) return;

  const pin = getPin(panelId);
  if (pin) {
    const offset =
      target.getBoundingClientRect().top - pin.panel.getBoundingClientRect().top + pin.panel.scrollTop - 24;
    window.scrollTo({ top: pin.start + Math.min(pin.extra, Math.max(0, offset)), behavior: 'smooth' });
    return;
  }

  const y = target.getBoundingClientRect().top + window.pageYOffset - windowOffset;
  window.scrollTo({ top: y, behavior: 'smooth' });
};

// Viewport Y position used as the "reading line" for scrollspy
export const getReadingLine = (panelId: string, windowOffset = 160) => {
  const pin = getPin(panelId);
  if (pin) {
    return pin.panel.getBoundingClientRect().top + 80;
  }
  return windowOffset;
};
