export const trimProtocols = (url: string) => {
  return url.replace(/(^\w+:|^)\/\//, "");
};

export default trimProtocols;
