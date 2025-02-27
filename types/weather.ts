export interface WeatherLocation {
  name: string;
  region: string;
  country: string;
  lat: number;
  lon: number;
  tz_id: string;
  localtime: string;
}

export interface WeatherCondition {
  text: string;
  icon: string;
  code: number;
}

export interface WeatherCurrent {
  temp_c: number;
  temp_f: number;
  condition: WeatherCondition;
  wind_kph: number;
  humidity: number;
  feelslike_c: number;
  wind_dir: string;
  wind_degree: number;
  uv: number;
  pressure_mb: number;
}

export interface WeatherForecastDay {
  date: string;
  day: {
    maxtemp_c: number;
    mintemp_c: number;
    avgtemp_c: number;
    avghumidity: number;
    maxwind_kph: number;
    uv: number;
    daily_chance_of_rain: number;
    condition: WeatherCondition;
  };
}

export interface WeatherForecast {
  forecastday: WeatherForecastDay[];
}

export interface WeatherData {
  location: WeatherLocation;
  current: WeatherCurrent;
  forecast: WeatherForecast;
}
