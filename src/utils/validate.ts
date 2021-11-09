export const emailRegExp = new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
export const validateEmail = (email: string) => {
  return emailRegExp.test(email);
};

export const urlRegExp = new RegExp(
  /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[\w]*))?)/i,
);

export const validateUrl = (url: string) => {
  try {
    new URL(url);
    return true;
  } catch (error) {
    return false;
  }
};

export const userNameRegex =
  /^(?=[a-zA-Z0-9._-]{4,20}$)(?!.*[_.-]{2})[^_.-].*[^_.-]$/;

export const validateUsername = (username?: string) => {
  if (!username) {
    return false;
  }
  const usernameRegExp = new RegExp(userNameRegex);
  return usernameRegExp.test(username);
};

export function validateYouTubeUrl(url = '') {
  if (url) {
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=|\?v=)([^#&?]*).*/;
    const match = url.match(regExp);
    if (match && match[2].length === 11) {
      return `https://www.youtube.com/embed/${match[2]}?autoplay=1&auto_play=true&fs=0`;
    }
    return false;
  }
}

export function escapeRegex(string: string) {
  return string.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');
}

export const mentionRegex = /\B(@[a-zA-Z0-9._-]+)/gim;

export const validateDate = (date: string) => {
  if (date) {
    const dateRegex =
      /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{2}$/;
    return dateRegex.test(date);
  }
};

export const numberRegex = new RegExp(/^\d+$/);
export const validateNumbers = (value: string) => {
  return numberRegex.test(value);
};
