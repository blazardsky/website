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

export function getWorkForLocale<
  T extends { data: { slug: string; locale: Lang } },
>(entries: T[], slug: string, locale: Lang): T | undefined {
  const matches = entries.filter((e) => e.data.slug === slug);
  return (
    matches.find((e) => e.data.locale === locale) ??
    matches.find((e) => e.data.locale === defaultLang) ??
    matches[0]
  );
}

export function getWorksForLocale<
  T extends {
    data: { locale: Lang; portfolio: string; slug: string; start_date: Date };
  },
>(entries: T[], locale: Lang, portfolio?: string): T[] {
  const filtered = portfolio
    ? entries.filter((e) => e.data.portfolio === portfolio)
    : entries;

  const bySlug = new Map<string, T[]>();
  for (const entry of filtered) {
    const slug = entry.data.slug;
    const group = bySlug.get(slug) ?? [];
    group.push(entry);
    bySlug.set(slug, group);
  }

  const result: T[] = [];
  for (const matches of bySlug.values()) {
    const picked =
      matches.find((e) => e.data.locale === locale) ??
      matches.find((e) => e.data.locale === defaultLang) ??
      matches[0];
    if (picked) result.push(picked);
  }

  return result.sort(
    (a, b) => b.data.start_date.getTime() - a.data.start_date.getTime(),
  );
}
