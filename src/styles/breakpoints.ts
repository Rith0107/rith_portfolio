// Single source of truth for the mobile/desktop split. CSS media queries
// can't reference custom properties, so this value is mirrored by hand into
// every `@media (max-width: …)` rule in the component CSS files — keep them
// in sync with the constant below.
export const MOBILE_MAX = 640

export const MEDIA = {
  fromDesktop: `(min-width: ${MOBILE_MAX + 1}px)`,
} as const
