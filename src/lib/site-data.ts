// Single-source entity configuration for the Kronenburgerpark SEO entity binding.
// Replace the values below when this template is reused for another attraction.

export const SITE_DOMAIN = 'kronenburgerpark.com';
export const BASE_URL = `https://${SITE_DOMAIN}`;

export const ATTRACTION_FULL_NAME = 'Kronenburgerpark';
export const ATTRACTION_SHORT_NAME = 'Kronenburgerpark';
export const CITY_NAME = 'Nijmegen';
export const STATE_PROVINCE = 'Gelderland';
export const COUNTRY_NAME = 'Netherlands';
export const COUNTRY_CODE = 'NL';
export const POSTAL_CODE = '6511 AL';
export const STREET_ADDRESS = 'Kronenburgersingel';
export const PLUS_CODE = 'RVW4+HX Nijmegen, Netherlands';
export const PHONE = '+31630731481';

// Google Maps coordinates of the attraction (exact values from the official embed)
export const LATITUDE = 51.8464231;
export const LONGITUDE = 5.8574389;

export const MAPS_SHARE_URL = 'https://maps.app.goo.gl/e4VLp6hr6crxq4Sr9';
export const MAPS_EMBED_SRC =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4217.1117362121095!2d5.8574389!3d51.846423099999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c708428eaa7819%3A0x9f46d28c9f63ad0a!2sKronenburgerpark!5e1!3m2!1sen!2s!4v1788708810500!5m2!1sen!2s';

// Authoritative outbound links (government / official tourism / .org knowledge)
export const GOVT_TOURISM_URL = 'https://www.holland.com';
export const LOCAL_TOURISM_URL = 'https://en.intonijmegen.com/';
export const MUNICIPALITY_URL = 'https://www.nijmegen.nl/';
export const PROVINCE_URL = 'https://www.gelderland.nl/';
export const HERITAGE_URL = 'https://www.cultureelerfgoed.nl/';
export const WIKIPEDIA_URL = 'https://nl.wikipedia.org/wiki/Kronenburgerpark';

// Local images referenced by SEO (og:image, JSON-LD image nodes, hero)
export const HERO_IMAGE_PATH = '/gallery/kronenburgerpark%20(1).jpg';
export const SECOND_IMAGE_PATH = '/gallery/kronenburgerpark%20(2).jpg';
export const HERO_IMAGE_URL = `${BASE_URL}${HERO_IMAGE_PATH}`;
export const SECOND_IMAGE_URL = `${BASE_URL}${SECOND_IMAGE_PATH}`;

// Ratings shown on the page & in structured data (from the live Google listing)
export const RATING_VALUE = '4.5';
export const RATING_COUNT = '5231';
export const RATING_LABEL = '4.5/5 (5,231)';
