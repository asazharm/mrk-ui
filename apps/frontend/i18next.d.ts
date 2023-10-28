// import the original type declarations
import "i18next";
// import all namespaces (for the default language, only)
import ns from "locales/am/ns.json";

declare module "i18next" {
  // Extend CustomTypeOptions
  interface CustomTypeOptions {
    // custom namespace type, if you changed it
    defaultNS: "ns1";
    // custom resources type
    resources: {
      ns: typeof ns;
    };
    // other
  }
}
