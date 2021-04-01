export const toCamelCase = str => `${str[0].toUpperCase()}${str.slice(1)}`;

export const httpToHttps = url => url.replace(/^http:\/\//i, "https://");
