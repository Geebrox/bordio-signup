import fonts from "../assets/fonts.json";

const GOOGLE_FONTS_API: string = "https://fonts.googleapis.com/css2";

const FONTS_LIST: string = fonts.reduce((prev: string, curr: iFont) => {
  prev = `${prev}family=${curr.name.replace(
    " ",
    "+"
  )}:wght@${curr.variants.join(";")}&`;
  return prev;
}, "?");

const generateFontsURL = (): string => {
  return `${GOOGLE_FONTS_API}${FONTS_LIST}display=swap`;
};

const mergeClasses = (baseClass: string, mergeClass: string): string =>
  baseClass + (mergeClass.length > 0 ? " " + mergeClass : "");

export { mergeClasses, generateFontsURL };
