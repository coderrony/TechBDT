export const pageview = () => {
  (window as any).fbq("track", "PageView");
};

export const event = (name: string, options = {}) => {
  (window as any).fbq("track", name, options);
};

