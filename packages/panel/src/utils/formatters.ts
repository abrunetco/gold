export const DateFormatter = Intl.DateTimeFormat("fa-IR", {
  year: "numeric",
  month: "long",
  day: "numeric",
});

export const PercentFormatter = new Intl.NumberFormat("fa-IR", {
  style: "percent",
  signDisplay: "always",
});

export const DateTimeFormatter = Intl.DateTimeFormat("fa-IR", {
  month: "long",
  day: "numeric",
  hour: "2-digit",
  minute: "2-digit",
});

export const ShortDateFormatter = Intl.DateTimeFormat("fa-IR", {
  month: "long",
  day: "numeric",
});

export const TimeFormatter = Intl.DateTimeFormat("fa-IR", {
  hour: "2-digit",
  minute: "2-digit",
});

export const PriceFormatter = Intl.NumberFormat("fa-IR", {
  currency: "IRR",
  style: "currency",
  maximumFractionDigits: 0,
  roundingIncrement: 5000,
});

export const BalanceFormatter = Intl.NumberFormat("fa-IR", {
  currency: "IRR",
  style: "currency",
  maximumFractionDigits: 0,
  roundingIncrement: 5000,
  signDisplay: "always",
});
