// create some utility functions to handle google analytics events

export const logEvent = (
  eventName: string,
  params: Record<string, any> = {}
) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", eventName, params);
  }
};
export const logPageView = (url: string) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("config", process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID!, {
      page_path: url,
    });
  }
};
export const logException = (description: string, fatal: boolean = false) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "exception", {
      description,
      fatal,
    });
  }
};

export const logTiming = (
  category: string,
  variable: string,
  value: number,
  label?: string
) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "timing_complete", {
      name: variable,
      value,
      event_category: category,
      event_label: label,
    });
  }
};

export const logPurchase = (
  transactionId: string,
  affiliation: string,
  revenue: number,
  tax: number,
  shipping: number,
  currency: string,
  items: Array<{
    item_name: string;
    item_id: string;
    price: number;
    quantity: number;
  }>
) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "purchase", {
      transaction_id: transactionId,
      affiliation,
      value: revenue,
      tax,
      shipping,
      currency,
      items,
    });
  }
};

export const logSocialInteraction = (
  network: string,
  action: string,
  target: string
) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "social_interaction", {
      event_category: network,
      action,
      target,
    });
  }
};

export const logSearch = (term: string, results: number, category?: string) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "search", {
      search_term: term,
      results,
      event_category: category,
    });
  }
};
