import { isServer } from '@utils/isServer';

export const isMac = () => {
  return /(Mac|iPhone|iPod|iPad)/i.test(navigator.platform);
};

export const addBodyStyles = () => {
  const documentStyle = document.documentElement.style;
  const mac = isMac();
  documentStyle.overflow = 'hidden';
  if (
    window.matchMedia('(orientation: landscape)').matches &&
    document.documentElement.scrollHeight > window.innerHeight &&
    !mac
  ) {
    const appbar = document.getElementById('appbar');
    if (appbar) {
      appbar.style.width = 'calc(100% - 10px)';
    }
    documentStyle.marginRight = '10px';
  }
};

export const removeBodyStyles = () => {
  setTimeout(() => {
    const mac = isMac();
    const isModalOpen = document.documentElement.classList.contains(
      'ReactModal__Body--open',
    );
    if (!isModalOpen) {
      const documentStyle = document.documentElement.style;
      documentStyle.removeProperty('overflow');
      if (!mac) {
        const appbar = document.getElementById('appbar');
        if (appbar) {
          appbar.style.removeProperty('width');
        }
        documentStyle.removeProperty('margin-right');
      }
    }
  });
};

export const addScrollStyles = () => {
  const mac = isMac();

  if (mac || isServer) return;

  document.documentElement.classList.add('windows-scroll');
};
