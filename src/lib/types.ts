export type Portfolio = 'technical' | 'creative';

export type PageMeta = {
  title: string;
  description?: string;
  heading: string;
};

export type ProjectItem = {
  titolo: string;
  descrizione: string;
  status: string;
  link: string;
};

export type ProjectsPageData = {
  meta: PageMeta;
  categories: Record<string, ProjectItem[]>;
};

export type SkillField = {
  type: string;
  skills: string[];
  meta: { bg: string; color: string };
};

export type SkillsPageData = {
  meta: PageMeta;
  fields: SkillField[];
};

export type PortfolioTypeData = {
  title: string;
  subtitle: string;
  bodyClass: string;
  style: string;
};

export type PortfolioPageData = Record<Portfolio, PortfolioTypeData>;

export type Testimonial = {
  id: number;
  by: string;
  role: string;
  link: string;
  body: string;
  img: string;
};

export type Certificate = {
  title: string;
  titleLang: string;
  subtitle: string;
  classes: string;
  oddLast: boolean;
};

export type CardData = {
  title: string;
  titleLang?: string;
  body: string;
  icon: string;
  class: string;
};

export type IndexPageData = {
  meta: { title: string };
  hero: {
    heading: string;
    technical: { title: string; ariaLabel: string; content: string };
    creative: { title: string; ariaLabel: string; content: string };
  };
  about: {
    heading: string;
    alt: string;
    introLabel: string;
    p1: string;
    p2Before: string;
    p2FontLink: string;
    p2After: string;
    p2ProjectsLink: string;
  };
  scroll: { heading: string };
  whyWork: { heading: string; cards: CardData[] };
  testimonials: { heading: string; items: Testimonial[] };
  skills: {
    heading: string;
    linkPrefix: string;
    linkText: string;
    tech: { label: string; heading: string; body: string };
    creative: { label: string; heading: string; body: string };
    socialHint: string;
  };
  certificates: { heading: string; items: Certificate[] };
  portfolioCta: { beforeTitle: string };
  contact: {
    heading: string;
    ctaAlt: string;
    ctaBefore: string;
    ctaLink: string;
    note: string;
  };
};