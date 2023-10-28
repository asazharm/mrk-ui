import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import amAM from './locales/am-AM.json';

const defaultLanguage = 'am-AM';

export const defaultNamespace = 'default';

export const resources = {
  'am-AM': {
    [defaultNamespace]: amAM,
  },
};

i18n.use(initReactI18next).init({
  defaultNS: defaultNamespace,
  ns: [defaultNamespace],
  resources,
  lng: defaultLanguage,
  fallbackLng: defaultLanguage,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
