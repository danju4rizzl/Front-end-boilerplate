import addYears from 'date-fns/addYears';
import UniversalCookie, { CookieSetOptions } from 'universal-cookie';

const Cookie = new UniversalCookie();

const getCookieClient = (key: string) => {
  return Cookie.get(key);
};

const getCookieServer = (key: string, cookie?: string) => {
  if (!cookie) {
    return undefined;
  }
  const rawCookie = cookie
    .split(';')
    .find((c) => c.trim().startsWith(`${key}=`));
  if (!rawCookie) {
    return undefined;
  }

  return decodeURIComponent(rawCookie.split('=')[1] || '');
};

export const setCookie = (
  key: string,
  value: string,
  props?: CookieSetOptions,
) => {
  Cookie.set(key, value, {
    path: '/',
    sameSite: 'lax',
    expires: addYears(new Date(), 1),
    ...props,
  });
};

export const removeCookie = (key: string) => {
  Cookie.remove(key, {
    maxAge: 0,
  });
};

export const getCookie = (key: string, cookieString?: string) => {
  return typeof window !== 'undefined'
    ? getCookieClient(key)
    : getCookieServer(key, cookieString);
};

export default {
  getCookie,
  removeCookie,
  setCookie,
};
