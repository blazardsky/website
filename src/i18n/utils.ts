import { getRelativeLocaleUrl } from "astro:i18n";
import { defaultLang, ui, type Lang, type UiKey } from "./ui";

export type LocalizedData<T> = Record<Lang, T>;

export function pickLocale<T>(data: LocalizedData<T>, locale: Lang): T {
  return data[locale] ?? data[defaultLang];
}

export function useTranslations(lang: Lang) {
  return function t(key: UiKey, params?: Record<string, string>): string {
    let value: string = ui[lang][key] ?? ui[defaultLang][key];
    if (params) {
      for (const [param, replacement] of Object.entries(params)) {
        value = value.replace(`{${param}}`, replacement);
      }
    }
    return value;
  };
}

/** Path segment without locale prefix, for use with getRelativeLocaleUrl. */
export function getRoutePath(pathname: string, locale: string): string {
  let path = pathname;
  if (locale !== defaultLang) {
    const prefix = `/${locale}`;
    if (path.startsWith(prefix)) {
      path = path.slice(prefix.length) || "/";
    }
  }
  return path === "/" ? "" : path.replace(/^\//, "");
}

export function localizedUrl(locale: Lang, routePath: string): string {
  return getRelativeLocaleUrl(locale, routePath);
}

export function getAlternateLocale(locale: Lang): Lang {
  return locale === "it" ? "en" : "it";
}

export function getLocaleSwitchUrl(
  pathname: string,
  currentLocale: string,
): string {
  const alternate = getAlternateLocale(currentLocale as Lang);
  const routePath = getRoutePath(pathname, currentLocale);
  return getRelativeLocaleUrl(alternate, routePath);
}

export const ogLocales: Record<Lang, string> = {
  it: "it_IT",
  en: "en_US",
};
