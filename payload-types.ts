/* tslint:disable */
/* eslint-disable */
/**
 * This file was automatically generated by Payload.
 * DO NOT MODIFY IT BY HAND. Instead, modify your source Payload config,
 * and re-run `payload generate:types` to regenerate this file.
 */

/**
 * Supported timezones in IANA format.
 *
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "supportedTimezones".
 */
export type SupportedTimezones =
  | 'Pacific/Midway'
  | 'Pacific/Niue'
  | 'Pacific/Honolulu'
  | 'Pacific/Rarotonga'
  | 'America/Anchorage'
  | 'Pacific/Gambier'
  | 'America/Los_Angeles'
  | 'America/Tijuana'
  | 'America/Denver'
  | 'America/Phoenix'
  | 'America/Chicago'
  | 'America/Guatemala'
  | 'America/New_York'
  | 'America/Bogota'
  | 'America/Caracas'
  | 'America/Santiago'
  | 'America/Buenos_Aires'
  | 'America/Sao_Paulo'
  | 'Atlantic/South_Georgia'
  | 'Atlantic/Azores'
  | 'Atlantic/Cape_Verde'
  | 'Europe/London'
  | 'Europe/Berlin'
  | 'Africa/Lagos'
  | 'Europe/Athens'
  | 'Africa/Cairo'
  | 'Europe/Moscow'
  | 'Asia/Riyadh'
  | 'Asia/Dubai'
  | 'Asia/Baku'
  | 'Asia/Karachi'
  | 'Asia/Tashkent'
  | 'Asia/Calcutta'
  | 'Asia/Dhaka'
  | 'Asia/Almaty'
  | 'Asia/Jakarta'
  | 'Asia/Bangkok'
  | 'Asia/Shanghai'
  | 'Asia/Singapore'
  | 'Asia/Tokyo'
  | 'Asia/Seoul'
  | 'Australia/Brisbane'
  | 'Australia/Sydney'
  | 'Pacific/Guam'
  | 'Pacific/Noumea'
  | 'Pacific/Auckland'
  | 'Pacific/Fiji';

export interface Config {
  auth: {
    users: UserAuthOperations;
  };
  blocks: {};
  collections: {
    treks: Trek;
    users: User;
    media: Media;
    'payload-locked-documents': PayloadLockedDocument;
    'payload-preferences': PayloadPreference;
    'payload-migrations': PayloadMigration;
  };
  collectionsJoins: {};
  collectionsSelect: {
    treks: TreksSelect<false> | TreksSelect<true>;
    users: UsersSelect<false> | UsersSelect<true>;
    media: MediaSelect<false> | MediaSelect<true>;
    'payload-locked-documents': PayloadLockedDocumentsSelect<false> | PayloadLockedDocumentsSelect<true>;
    'payload-preferences': PayloadPreferencesSelect<false> | PayloadPreferencesSelect<true>;
    'payload-migrations': PayloadMigrationsSelect<false> | PayloadMigrationsSelect<true>;
  };
  db: {
    defaultIDType: string;
  };
  globals: {
    header: Header;
    landing_page: LandingPage;
    treks_page: TreksPage;
    about_us: AboutUs;
    footer: Footer;
    booking_sheet: BookingSheet;
    trek_detail_settings: TrekDetailSetting;
    siteMetadata: SiteMetadatum;
  };
  globalsSelect: {
    header: HeaderSelect<false> | HeaderSelect<true>;
    landing_page: LandingPageSelect<false> | LandingPageSelect<true>;
    treks_page: TreksPageSelect<false> | TreksPageSelect<true>;
    about_us: AboutUsSelect<false> | AboutUsSelect<true>;
    footer: FooterSelect<false> | FooterSelect<true>;
    booking_sheet: BookingSheetSelect<false> | BookingSheetSelect<true>;
    trek_detail_settings: TrekDetailSettingsSelect<false> | TrekDetailSettingsSelect<true>;
    siteMetadata: SiteMetadataSelect<false> | SiteMetadataSelect<true>;
  };
  locale: null;
  user: User & {
    collection: 'users';
  };
  jobs: {
    tasks: unknown;
    workflows: unknown;
  };
}
export interface UserAuthOperations {
  forgotPassword: {
    email: string;
    password: string;
  };
  login: {
    email: string;
    password: string;
  };
  registerFirstUser: {
    email: string;
    password: string;
  };
  unlock: {
    email: string;
    password: string;
  };
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "treks".
 */
export interface Trek {
  id: string;
  name: string;
  slug: string;
  heroImage: string | Media;
  gallery?: (string | Media)[] | null;
  video?: string | null;
  price: {
    amount: number;
    currency: 'NPR' | 'USD' | 'EUR' | 'GBP' | 'INR' | 'AUD' | 'CAD';
  };
  durationDays: number;
  distanceKm?: number | null;
  maxAltitude?: number | null;
  difficulty?: ('Easy' | 'Moderate' | 'Challenging' | 'Strenuous') | null;
  bestSeason?: ('Spring' | 'Summer' | 'Autumn' | 'Winter')[] | null;
  summary: string;
  highlights?:
    | {
        value: string;
        id?: string | null;
      }[]
    | null;
  itinerary?:
    | {
        day: number;
        title: string;
        description: string;
        image?: (string | null) | Media;
        id?: string | null;
      }[]
    | null;
  included: {
    item: string;
    id?: string | null;
  }[];
  excluded?:
    | {
        item: string;
        id?: string | null;
      }[]
    | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "media".
 */
export interface Media {
  id: string;
  alt: string;
  updatedAt: string;
  createdAt: string;
  url?: string | null;
  thumbnailURL?: string | null;
  filename?: string | null;
  mimeType?: string | null;
  filesize?: number | null;
  width?: number | null;
  height?: number | null;
  focalX?: number | null;
  focalY?: number | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "users".
 */
export interface User {
  id: string;
  role: 'admin' | 'editor';
  updatedAt: string;
  createdAt: string;
  email: string;
  resetPasswordToken?: string | null;
  resetPasswordExpiration?: string | null;
  salt?: string | null;
  hash?: string | null;
  loginAttempts?: number | null;
  lockUntil?: string | null;
  password?: string | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-locked-documents".
 */
export interface PayloadLockedDocument {
  id: string;
  document?:
    | ({
        relationTo: 'treks';
        value: string | Trek;
      } | null)
    | ({
        relationTo: 'users';
        value: string | User;
      } | null)
    | ({
        relationTo: 'media';
        value: string | Media;
      } | null);
  globalSlug?: string | null;
  user: {
    relationTo: 'users';
    value: string | User;
  };
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-preferences".
 */
export interface PayloadPreference {
  id: string;
  user: {
    relationTo: 'users';
    value: string | User;
  };
  key?: string | null;
  value?:
    | {
        [k: string]: unknown;
      }
    | unknown[]
    | string
    | number
    | boolean
    | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-migrations".
 */
export interface PayloadMigration {
  id: string;
  name?: string | null;
  batch?: number | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "treks_select".
 */
export interface TreksSelect<T extends boolean = true> {
  name?: T;
  slug?: T;
  heroImage?: T;
  gallery?: T;
  video?: T;
  price?:
    | T
    | {
        amount?: T;
        currency?: T;
      };
  durationDays?: T;
  distanceKm?: T;
  maxAltitude?: T;
  difficulty?: T;
  bestSeason?: T;
  summary?: T;
  highlights?:
    | T
    | {
        value?: T;
        id?: T;
      };
  itinerary?:
    | T
    | {
        day?: T;
        title?: T;
        description?: T;
        image?: T;
        id?: T;
      };
  included?:
    | T
    | {
        item?: T;
        id?: T;
      };
  excluded?:
    | T
    | {
        item?: T;
        id?: T;
      };
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "users_select".
 */
export interface UsersSelect<T extends boolean = true> {
  role?: T;
  updatedAt?: T;
  createdAt?: T;
  email?: T;
  resetPasswordToken?: T;
  resetPasswordExpiration?: T;
  salt?: T;
  hash?: T;
  loginAttempts?: T;
  lockUntil?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "media_select".
 */
export interface MediaSelect<T extends boolean = true> {
  alt?: T;
  updatedAt?: T;
  createdAt?: T;
  url?: T;
  thumbnailURL?: T;
  filename?: T;
  mimeType?: T;
  filesize?: T;
  width?: T;
  height?: T;
  focalX?: T;
  focalY?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-locked-documents_select".
 */
export interface PayloadLockedDocumentsSelect<T extends boolean = true> {
  document?: T;
  globalSlug?: T;
  user?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-preferences_select".
 */
export interface PayloadPreferencesSelect<T extends boolean = true> {
  user?: T;
  key?: T;
  value?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-migrations_select".
 */
export interface PayloadMigrationsSelect<T extends boolean = true> {
  name?: T;
  batch?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * Configure everything that appears in the site header.
 *
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "header".
 */
export interface Header {
  id: string;
  /**
   * Upload the company logo. It will be displayed in the header.
   */
  logo: string | Media;
  /**
   * Text that appears on the “Book Now” button.
   */
  Book_now_button_text: string;
  /**
   * Color of the “Book Now” button (use a HEX code, RGB value, or valid CSS color name).
   */
  Book_now_button_color: string;
  /**
   * Add, remove, or reorder the links that appear in the header navigation.
   */
  navigation_links?:
    | {
        /**
         * Text displayed for the navigation link.
         */
        label: string;
        /**
         * Section to scroll to when the link is clicked. Make sure each ID exists on the page.
         */
        section_id: 'home' | 'about' | 'contact' | 'treks';
        id?: string | null;
      }[]
    | null;
  /**
   * Color applied to navigation links on hover (HEX code, RGB value, or valid CSS color name).
   */
  Navigation_links_hover_color?: string | null;
  updatedAt?: string | null;
  createdAt?: string | null;
}
/**
 * Configure everything that appears on the landing / hero section of your site.
 *
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "landing_page".
 */
export interface LandingPage {
  id: string;
  /**
   * Background image for the landing hero. Recommended ratio ≈ 16 : 9.
   */
  landing_page_background_image: string | Media;
  /**
   * Headline shown directly above the search bar.
   */
  Search_bar_heading?: string | null;
  /**
   * Placeholder text that appears inside the search input.
   */
  Search_bar_placeholder?: string | null;
  updatedAt?: string | null;
  createdAt?: string | null;
}
/**
 * Configure headings and button copy for the Treks page.
 *
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "treks_page".
 */
export interface TreksPage {
  id: string;
  /**
   * Main heading displayed at the top of the Treks page.
   */
  treks_page_heading?: string | null;
  /**
   * Text displayed on the right button inside each trek card.
   */
  treks_card_learn_more_button_text?: string | null;
  /**
   * Background color for the learn more button (HEX code, RGB value, or valid CSS color name).
   */
  treks_card_learn_more_button_color?: string | null;
  /**
   * Background color for the learn more button (HEX code, RGB value, or valid CSS color name).
   */
  treks_card_book_now_button_color: string;
  updatedAt?: string | null;
  createdAt?: string | null;
}
/**
 * Edit the “About Us” section and FAQ that appear on the landing page.
 *
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "about_us".
 */
export interface AboutUs {
  id: string;
  heading: string;
  subheading: string;
  /**
   * Add or remove selling‑point bullets.
   */
  bullets?:
    | {
        text: string;
        id?: string | null;
      }[]
    | null;
  /**
   * Questions show as accordion headings.
   */
  faqs?:
    | {
        question: string;
        answer: string;
        id?: string | null;
      }[]
    | null;
  updatedAt?: string | null;
  createdAt?: string | null;
}
/**
 * Logo text, quick links, social URLs, colours and footer badges.
 *
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "footer".
 */
export interface Footer {
  id: string;
  /**
   * Upload the logo
   */
  brand_logo: string | Media;
  quick_links?:
    | {
        label: string;
        section_id: string;
        id?: string | null;
      }[]
    | null;
  social?: {
    facebook?: string | null;
    instagram?: string | null;
    whatsapp?: string | null;
  };
  accent_color?: string | null;
  hover_bg_color?: string | null;
  /**
   * Logo + one line text for association badges.
   */
  cert_badges?:
    | {
        logo?: (string | null) | Media;
        text: string;
        id?: string | null;
      }[]
    | null;
  copyright_name?: string | null;
  updatedAt?: string | null;
  createdAt?: string | null;
}
/**
 * Button copy / colours, phone & WhatsApp numbers, public e-mail and trek list.
 *
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "booking_sheet".
 */
export interface BookingSheet {
  id: string;
  button_text: string;
  button_color: string;
  contact: {
    phone_number: string;
    whatsapp_number?: string | null;
    email_address: string;
  };
  /**
   * Auto-lists all treks; disabled for manual editing.
   */
  treks: (string | Trek)[];
  updatedAt?: string | null;
  createdAt?: string | null;
}
/**
 * Text and colours for the big “Book” buttons, the duration badge, and the trip-highlight badges.
 *
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "trek_detail_settings".
 */
export interface TrekDetailSetting {
  id: string;
  hero_button_text?: string | null;
  hero_button_color: string;
  sticky_button_text?: string | null;
  sticky_button_color: string;
  duration_badge_color?: string | null;
  highlight_badge_color?: string | null;
  updatedAt?: string | null;
  createdAt?: string | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "siteMetadata".
 */
export interface SiteMetadatum {
  id: string;
  defaultTitle: string;
  titleTemplate?: string | null;
  description: string;
  keywords?: string[] | null;
  themeColor?: string | null;
  ogImage?: (string | null) | Media;
  twitterHandle?: string | null;
  icons?: {
    android192?: (string | null) | Media;
    android512?: (string | null) | Media;
    appleTouch?: (string | null) | Media;
    favicon16?: (string | null) | Media;
    favicon32?: (string | null) | Media;
    faviconICO?: (string | null) | Media;
    webManifest?: (string | null) | Media;
  };
  updatedAt?: string | null;
  createdAt?: string | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "header_select".
 */
export interface HeaderSelect<T extends boolean = true> {
  logo?: T;
  Book_now_button_text?: T;
  Book_now_button_color?: T;
  navigation_links?:
    | T
    | {
        label?: T;
        section_id?: T;
        id?: T;
      };
  Navigation_links_hover_color?: T;
  updatedAt?: T;
  createdAt?: T;
  globalType?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "landing_page_select".
 */
export interface LandingPageSelect<T extends boolean = true> {
  landing_page_background_image?: T;
  Search_bar_heading?: T;
  Search_bar_placeholder?: T;
  updatedAt?: T;
  createdAt?: T;
  globalType?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "treks_page_select".
 */
export interface TreksPageSelect<T extends boolean = true> {
  treks_page_heading?: T;
  treks_card_learn_more_button_text?: T;
  treks_card_learn_more_button_color?: T;
  treks_card_book_now_button_color?: T;
  updatedAt?: T;
  createdAt?: T;
  globalType?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "about_us_select".
 */
export interface AboutUsSelect<T extends boolean = true> {
  heading?: T;
  subheading?: T;
  bullets?:
    | T
    | {
        text?: T;
        id?: T;
      };
  faqs?:
    | T
    | {
        question?: T;
        answer?: T;
        id?: T;
      };
  updatedAt?: T;
  createdAt?: T;
  globalType?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "footer_select".
 */
export interface FooterSelect<T extends boolean = true> {
  brand_logo?: T;
  quick_links?:
    | T
    | {
        label?: T;
        section_id?: T;
        id?: T;
      };
  social?:
    | T
    | {
        facebook?: T;
        instagram?: T;
        whatsapp?: T;
      };
  accent_color?: T;
  hover_bg_color?: T;
  cert_badges?:
    | T
    | {
        logo?: T;
        text?: T;
        id?: T;
      };
  copyright_name?: T;
  updatedAt?: T;
  createdAt?: T;
  globalType?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "booking_sheet_select".
 */
export interface BookingSheetSelect<T extends boolean = true> {
  button_text?: T;
  button_color?: T;
  contact?:
    | T
    | {
        phone_number?: T;
        whatsapp_number?: T;
        email_address?: T;
      };
  treks?: T;
  updatedAt?: T;
  createdAt?: T;
  globalType?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "trek_detail_settings_select".
 */
export interface TrekDetailSettingsSelect<T extends boolean = true> {
  hero_button_text?: T;
  hero_button_color?: T;
  sticky_button_text?: T;
  sticky_button_color?: T;
  duration_badge_color?: T;
  highlight_badge_color?: T;
  updatedAt?: T;
  createdAt?: T;
  globalType?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "siteMetadata_select".
 */
export interface SiteMetadataSelect<T extends boolean = true> {
  defaultTitle?: T;
  titleTemplate?: T;
  description?: T;
  keywords?: T;
  themeColor?: T;
  ogImage?: T;
  twitterHandle?: T;
  icons?:
    | T
    | {
        android192?: T;
        android512?: T;
        appleTouch?: T;
        favicon16?: T;
        favicon32?: T;
        faviconICO?: T;
        webManifest?: T;
      };
  updatedAt?: T;
  createdAt?: T;
  globalType?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "auth".
 */
export interface Auth {
  [k: string]: unknown;
}


declare module 'payload' {
  export interface GeneratedTypes extends Config {}
}