export type NavButton = {
  label: string;
  href: string;
  target: string;
  className?: string;
}

export type NavLink = {
  label: string;
  href: string;
  className?: string;
}

export type OgTags = {
  /**
   * @ogTitle
   * @ogDescription
   * @ogImage
   */
  title: string;
  description: string;
  image: string;
}

export type BetterDocsConfig = {
  /**
   * Path to the landing page
   */
  landing?: string;
  /**
   * Logo
   */
  logo?: string;
  /**
   * Page Title
   */
  title?: string;
  ogTags: OgTags;
  /**
   * Component config
   */
  component?: {
    /**
     * Wrapping Component
     */
    wrapper: string;
  };
  /**
   * Tracking code
   */
  trackingCode?: string;
  /**
   * Custom text injected to the HEAD
   */
  head?: string;

  /**
   * NavButtons showed in the TOP section
   */
  navButtons: Array<NavButton>;
  /**
   * Navigation links
   */
  navLinks: Array<NavLink>;
}