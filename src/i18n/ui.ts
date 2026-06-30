export const languages = {
  it: "Italiano",
  en: "English",
} as const;

export const defaultLang = "it";

export type Lang = keyof typeof languages;

export const ui = {
  it: {
    "open": "apri",
    "in_new_tab": "in una nuova scheda",
    "nav.home": "HOME",
    "nav.menu": "Menu",
    "nav.close": "Chiudi",
    "nav.menu.open": "apri il menu",
    "nav.menu.close": "chiudi il menu",
    "nav.accessibility":
      "Cambia font per rendere il testo più leggibile",
    "nav.accessibility.title":
      "Cambia il font scritto a mano con un monospaziato",
    "lang.switch": "EN",
    "lang.switch.title": "Leggi in inglese",
    "lang.switch.aria": "Cambia lingua",
    "menu.title": "Menu aperto: link rapidi per contattarmi",
    "menu.contact": "Contattami",
    "menu.projects": "(other) Projects",
    "menu.skills": "Skills",
    "menu.gallery": "Gallery",
    "footer.privacy": "Privacy policy",
    "footer.credits": "Credits",
    "footer.openSocial": "apri {name} in una nuova scheda",
    "footer.locallyMeet": "Ci possiamo incontrare dal vivo vicino a:",
    "cookie.message":
      "Ciao! Questo sito utilizza solo cookie tecnici necessari al suo funzionamento e usa Umami per raccogliere statistiche anonime. Continuando la navigazione accetti l'uso di questi cookie.",
    "cookie.more": "Maggiori informazioni",
    "cookie.accept": "Ok, ho capito",
    "meta.defaultDescription":
      "Portfolio - Niccolò Agnoletti: web developer + designer + digital illustrator.",
    "meta.ogTitle":
      "Web Developer, Designer and Digital Illustrator - Niccolò Agnoletti",
    "portfolio.readMore": "Approfondisci progetto",
    "portfolio.back": "torna al portfolio",
    "portfolio.descriptionHeading": "Descrizione del progetto",
    "portfolio.detailsHeading": "Dettagli del progetto",
    "portfolio.infoHeading": "Informazioni del progetto",
    "portfolio.notesHeading": "Note sul progetto",
    "portfolio.client": "Realizzato per",
    "portfolio.year": "Anno",
    "portfolio.status": "Status",
    "portfolio.type": "Tipo lavoro",
    "portfolio.link": "Link",
    "portfolio.galleryScroll": "Scorri {count} immagin{suffix} →",
    "portfolioButtons.fixedTitle": "Vuoi vedere i miei lavori?",
  },
  en: {
    "open": "open",
    "in_new_tab": "in a new tab",
    "nav.home": "HOME",
    "nav.menu": "Menu",
    "nav.close": "Close",
    "nav.menu.open": "open menu",
    "nav.menu.close": "close menu",
    "nav.accessibility": "Switch font for better readability",
    "nav.accessibility.title":
      "Replace the handwritten font with a monospaced one",
    "lang.switch": "IT",
    "lang.switch.title": "Read in Italian",
    "lang.switch.aria": "Switch language",
    "menu.title": "Menu open: quick links to get in touch",
    "menu.contact": "Get in touch",
    "menu.projects": "(other) Projects",
    "menu.skills": "Skills",
    "menu.gallery": "Gallery",
    "footer.privacy": "Privacy policy",
    "footer.credits": "Credits",
    "footer.openSocial": "open {name} in a new tab",
    "footer.locallyMeet": "I can meet locally near:",
    "cookie.message":
      "Hi! This site uses only essential cookies and Umami for anonymous analytics. By continuing to browse, you accept the use of these cookies.",
    "cookie.more": "Learn more",
    "cookie.accept": "OK, got it",
    "meta.defaultDescription":
      "Portfolio - Niccolò Agnoletti: web developer, designer and digital illustrator.",
    "meta.ogTitle":
      "Web Developer, Designer and Digital Illustrator - Niccolò Agnoletti",
    "portfolio.readMore": "Read more",
    "portfolio.back": "back to portfolio",
    "portfolio.descriptionHeading": "Project description",
    "portfolio.detailsHeading": "Project details",
    "portfolio.infoHeading": "Project information",
    "portfolio.notesHeading": "Project notes",
    "portfolio.client": "Client",
    "portfolio.year": "Year",
    "portfolio.status": "Status",
    "portfolio.type": "Work type",
    "portfolio.link": "Link",
    "portfolio.galleryScroll": "Scroll {count} image{suffix} →",
    "portfolioButtons.fixedTitle": "Want to see my work?",
  },
} as const;

export type UiKey = keyof (typeof ui)[typeof defaultLang];
