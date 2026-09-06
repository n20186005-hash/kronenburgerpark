import { LATITUDE, LONGITUDE } from '@/lib/site-data';

export type WeatherCondition =
  | 'clear'
  | 'mainlyClear'
  | 'partlyCloudy'
  | 'overcast'
  | 'fog'
  | 'drizzle'
  | 'lightRain'
  | 'moderateRain'
  | 'heavyRain'
  | 'rainShowers'
  | 'snowShowers'
  | 'snow'
  | 'thunderstorm';

// WMO weather interpretation codes -> fine-grained visitor-facing categories.
const WMO_CONDITION: Record<number, WeatherCondition> = {
  0: 'clear',
  1: 'mainlyClear',
  2: 'partlyCloudy',
  3: 'overcast',
  45: 'fog',
  48: 'fog',
  51: 'drizzle',
  53: 'drizzle',
  55: 'drizzle',
  56: 'drizzle',
  57: 'drizzle',
  61: 'lightRain',
  63: 'moderateRain',
  65: 'heavyRain',
  66: 'drizzle',
  67: 'drizzle',
  71: 'snow',
  73: 'snow',
  75: 'snow',
  77: 'snow',
  80: 'rainShowers',
  81: 'rainShowers',
  82: 'heavyRain',
  85: 'snowShowers',
  86: 'snowShowers',
  95: 'thunderstorm',
  96: 'thunderstorm',
  99: 'thunderstorm',
};

const FORECAST_URL = `https://api.open-meteo.com/v1/forecast?latitude=${LATITUDE}&longitude=${LONGITUDE}&current=temperature_2m,apparent_temperature,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,uv_index_max&timezone=Europe%2FAmsterdam&forecast_days=7&wind_speed_unit=kmh`;

export type CurrentWeather = {
  temperature: number;
  feelsLike: number;
  windKmh: number;
  condition: WeatherCondition;
};

export type DailyForecast = {
  date: string;
  condition: WeatherCondition;
  max: number;
  min: number;
  precipProbability: number;
  uvMax: number;
};

export type WeatherData = {
  current: CurrentWeather;
  daily: DailyForecast[];
  updatedAt: string;
};

export async function fetchWeather(): Promise<WeatherData | null> {
  try {
    const res = await fetch(FORECAST_URL, {
      next: { revalidate: 900 },
      headers: { Accept: 'application/json' },
      signal: AbortSignal.timeout(9000),
    });
    if (!res.ok) return null;

    const json = (await res.json()) as {
      current: {
        temperature_2m: number;
        apparent_temperature: number;
        weather_code: number;
        wind_speed_10m: number;
      };
      daily: {
        time: string[];
        weather_code: number[];
        temperature_2m_max: number[];
        temperature_2m_min: number[];
        precipitation_probability_max: number[];
        uv_index_max: number[];
      };
    };

    const conditionKey = (code: number): WeatherCondition => WMO_CONDITION[code] ?? 'partlyCloudy';

    return {
      current: {
        temperature: Math.round(json.current.temperature_2m),
        feelsLike: Math.round(json.current.apparent_temperature),
        windKmh: Math.round(json.current.wind_speed_10m),
        condition: conditionKey(json.current.weather_code),
      },
      daily: json.daily.time.map((date, i) => ({
        date,
        condition: conditionKey(json.daily.weather_code[i]),
        max: Math.round(json.daily.temperature_2m_max[i]),
        min: Math.round(json.daily.temperature_2m_min[i]),
        precipProbability: json.daily.precipitation_probability_max[i] ?? 0,
        uvMax: Math.floor(json.daily.uv_index_max[i] ?? 0),
      })),
      updatedAt: new Date().toISOString(),
    };
  } catch {
    return null;
  }
}
