export const toCamelCase = str => `${str[0].toUpperCase()}${str.slice(1)}`;

export const httpToHttps = url => url.replace(/^http:\/\//i, "https://");

export const isValidCSSColor = strColor => {
  const s = new Option().style;
  s.color = strColor;
  return s.color === strColor;
};
