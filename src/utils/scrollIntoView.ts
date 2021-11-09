export function scrollIntoView(
  menuEl: HTMLElement,
  focusedEl: HTMLElement,
): void {
  const menuRect = menuEl.getBoundingClientRect();
  const focusedRect = focusedEl.getBoundingClientRect();
  const overScroll = focusedEl.offsetHeight / 3;

  if (focusedRect.bottom + overScroll > menuRect.bottom) {
    menuEl.scrollTo({
      top: Math.min(
        focusedEl.offsetTop +
          focusedEl.clientHeight -
          menuEl.offsetHeight +
          overScroll,
        menuEl.scrollHeight,
      ),
    });
  } else if (focusedRect.top - overScroll < menuRect.top) {
    menuEl.scrollTo({ top: Math.max(focusedEl.offsetTop - overScroll, 0) });
  }
}
