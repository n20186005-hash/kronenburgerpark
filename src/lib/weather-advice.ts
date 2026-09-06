import type { WeatherCondition } from '@/lib/weather';

export type AdviceInput = {
  condition: WeatherCondition; // right now
  feelsLike: number;
  max: number; // today high
  min: number; // today low
  precipProbability: number; // today
  windKmh: number;
  uvMax: number; // today
};

export type AdvicePlan = {
  outfit: string[];
  activity: string[];
  items: string[];
  risks: string[];
};

const PRECIP_NOW = new Set<WeatherCondition>([
  'drizzle',
  'lightRain',
  'moderateRain',
  'heavyRain',
  'rainShowers',
]);

const HEAVY_RAIN = new Set<WeatherCondition>(['moderateRain', 'heavyRain']);

/**
 * Turns raw weather numbers into short, visitor-friendly message keys.
 * Suggestions are grouped (outfit / activities / items / risks); anything not
 * triggered is omitted so visitors only see what actually matters today.
 */
export function buildAdvice(input: AdviceInput): AdvicePlan {
  const outfit: string[] = [];
  const activity: string[] = [];
  const items: string[] = [];
  const risks: string[] = [];

  const { condition } = input;
  const rainingNow = PRECIP_NOW.has(condition);
  const precipLikely = input.precipProbability >= 60 && !rainingNow;
  const windy = input.windKmh >= 50; // Beaufort 7+
  const breezy = input.windKmh >= 29 && input.windKmh < 50; // Beaufort 5-6
  const hot = input.feelsLike >= 32 || input.max >= 32;
  const cold = input.max <= 10;
  const spread = input.max - input.min > 8;
  const sunnyish = condition === 'clear' || condition === 'mainlyClear';
  const overcastish = condition === 'partlyCloudy' || condition === 'overcast';
  const brightish = sunnyish || condition === 'partlyCloudy';
  const gloomy = condition === 'fog' || condition === 'snow' || condition === 'snowShowers';
  const outdoorWet = rainingNow || precipLikely;

  // ---- Risks (panel is hidden entirely when there is none) ----
  if (condition === 'thunderstorm') risks.push('r_thunder');
  else if (HEAVY_RAIN.has(condition)) risks.push('r_heavyrain');
  if (windy) risks.push('r_strongwind');
  if (condition === 'fog') risks.push('r_fog');

  // ---- Outfit ----
  if (hot) outfit.push('o_heat');
  else if (cold && condition !== 'thunderstorm') outfit.push('o_cold');
  if (windy) outfit.push('o_wind');
  if (rainingNow && breezy) outfit.push('o_rain');
  if (spread && input.max < 24 && !hot && !rainingNow) outfit.push('o_spread');

  // ---- Activities ----
  if (condition === 'thunderstorm') activity.push('a_storm');
  else if (rainingNow) {
    activity.push(
      condition === 'drizzle' || condition === 'lightRain' ? 'a_lightRain' : 'a_heavyRain'
    );
  }
  if (precipLikely) activity.push('a_rainLikely');
  if (condition === 'fog') activity.push('a_fog');
  if (!rainingNow && !precipLikely && !gloomy) {
    if (sunnyish) activity.push('a_sunny');
    else if (overcastish) activity.push('a_overcast');
  }
  if (hot && !rainingNow) activity.push('a_hot');
  if (cold && !rainingNow && condition !== 'thunderstorm') activity.push('a_cold');
  if (breezy && !outdoorWet && !gloomy) activity.push('a_breezy');
  if (windy && !outdoorWet && !gloomy) activity.push('a_windy');

  // ---- Items (only what is genuinely useful) ----
  if (rainingNow) {
    if (HEAVY_RAIN.has(condition) || breezy || windy) items.push('i_raincoat');
    else items.push('i_umbrella');
  } else if (precipLikely) {
    items.push(breezy || windy ? 'i_raincoat' : 'i_umbrella');
  }

  // UV forecast is model based; only suggest sun gear when sunshine is plausible.
  if (brightish && input.uvMax >= 5) {
    items.push('i_sunscreen');
    items.push('i_sunglasses');
    items.push('i_hat');
  }
  if (hot) items.push('i_water');
  if (cold) items.push('i_thermal');

  return { outfit, activity, items, risks };
}
