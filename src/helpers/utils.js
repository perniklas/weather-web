import {
    faCloud,
    faBoltLightning,
    faCloudSunRain,
    faCloudSun,
    faCloudRain,
    faCloudShowersHeavy,
    faSnowflake,
    faSun,
    faMoon,
    faSmog
} from '@fortawesome/free-solid-svg-icons';

const weathers = {
    "clearsky_day": faSun,
    "clearsky_night": faMoon,
    "clearsky_polartwilight": faMoon,
    "fair_day": faCloudSun,
    "fair_night": faMoon,
    "fair_polartwilight": faMoon,
    "lightssnowshowersandthunder_day": faSnowflake,
    "lightssnowshowersandthunder_night": faSnowflake,
    "lightssnowshowersandthunder_polartwilight": faSnowflake,
    "lightsnowshowers_day": faSnowflake,
    "lightsnowshowers_night": faSnowflake,
    "lightsnowshowers_polartwilight": faSnowflake,
    "heavyrainandthunder": faBoltLightning,
    "heavysnowandthunder": faBoltLightning,
    "rainandthunder": faBoltLightning,
    "heavysleetshowersandthunder_day": faBoltLightning,
    "heavysleetshowersandthunder_night": faBoltLightning,
    "heavysleetshowersandthunder_polartwilight": faBoltLightning,
    "heavysnow": faSnowflake,
    "heavyrainshowers_day": faCloudShowersHeavy,
    "heavyrainshowers_night": faCloudShowersHeavy,
    "heavyrainshowers_polartwilight": faCloudShowersHeavy,
    "lightsleet": faSnowflake,
    "heavyrain": faCloudShowersHeavy,
    "lightrainshowers_day": faCloudSunRain,
    "lightrainshowers_night": faCloudSunRain,
    "lightrainshowers_polartwilight": faCloudSunRain,
    "heavysleetshowers_day": faSnowflake,
    "heavysleetshowers_night": faSnowflake,
    "heavysleetshowers_polartwilight": faSnowflake,
    "lightsleetshowers_day": faSnowflake,
    "lightsleetshowers_night": faSnowflake,
    "lightsleetshowers_polartwilight": faSnowflake,
    "snow": faSnowflake,
    "heavyrainshowersandthunder_day": faBoltLightning,
    "heavyrainshowersandthunder_night": faBoltLightning,
    "heavyrainshowersandthunder_polartwilight": faBoltLightning,
    "snowshowers_day": faSnowflake,
    "snowshowers_night": faSnowflake,
    "snowshowers_polartwilight": faSnowflake,
    "fog": faSmog,
    "snowshowersandthunder_day": faSnowflake,
    "snowshowersandthunder_night": faSnowflake,
    "snowshowersandthunder_polartwilight": faSnowflake,
    "lightsnowandthunder": faSnowflake,
    "heavysleetandthunder": faSnowflake,
    "lightrain": faCloudRain,
    "rainshowersandthunder_day": faBoltLightning,
    "rainshowersandthunder_night": faBoltLightning,
    "rainshowersandthunder_polartwilight": faBoltLightning,
    "rain": faCloudRain,
    "lightsnow": faSnowflake,
    "lightrainshowersandthunder_day": faBoltLightning,
    "lightrainshowersandthunder_night": faBoltLightning,
    "lightrainshowersandthunder_polartwilight": faBoltLightning,
    "heavysleet": faSnowflake,
    "sleetandthunder": faBoltLightning,
    "lightrainandthunder": faBoltLightning,
    "sleet": faSnowflake,
    "lightssleetshowersandthunder_day": faBoltLightning,
    "lightssleetshowersandthunder_night": faBoltLightning,
    "lightssleetshowersandthunder_polartwilight": faBoltLightning,
    "lightsleetandthunder": faBoltLightning,
    "partlycloudy_day": faCloudSun,
    "partlycloudy_night": faCloudSun,
    "partlycloudy_polartwilight": faCloudSun,
    "sleetshowersandthunder_day": faBoltLightning,
    "sleetshowersandthunder_night": faBoltLightning,
    "sleetshowersandthunder_polartwilight": faBoltLightning,
    "rainshowers_day": faCloudRain,
    "rainshowers_night": faCloudRain,
    "rainshowers_polartwilight": faCloudRain,
    "snowandthunder": faBoltLightning,
    "sleetshowers_day": faSnowflake,
    "sleetshowers_night": faSnowflake,
    "sleetshowers_polartwilight": faSnowflake,
    "cloudy": faCloud,
    "heavysnowshowersandthunder_day": faBoltLightning,
    "heavysnowshowersandthunder_night": faBoltLightning,
    "heavysnowshowersandthunder_polartwilight": faBoltLightning,
    "heavysnowshowers_day": faSnowflake,
    "heavysnowshowers_night": faSnowflake,
    "heavysnowshowers_polartwilight": faSnowflake
}

function getWeatherIcon(weather) {
    return weathers[weather];
}

export function handleWeatherResponse(response) {
    var currentHour     = response.properties.timeseries[0].data;
    var next1Hours      = response.properties.timeseries[1].data;
    var next6Hours      = response.properties.timeseries[6].data;
    var next12Hours     = response.properties.timeseries[12].data;
    var next7Days       = [];

    // Arbitrary "get weather at 12:00 for next 7 days" function - not ideal
    for (let i = 1; i < 8; i++) {
        let maxStart = new Date();
        let minStart = new Date();
        maxStart.setDate(maxStart.getDate() + i);
        minStart.setDate(minStart.getDate() + i + 1);

        const date          = maxStart.toISOString().split('T')[0];
        const nightDate     = minStart.toISOString().split('T')[0];
        const dayWeather    = response.properties.timeseries.filter(t => t.time === `${date}T12:00:00Z`)[0];
        const nightWeather  = response.properties.timeseries.filter(t => t.time === `${nightDate}T00:00:00Z`)[0];

        next7Days.push({
            temperature: {
                max:    dayWeather.data.instant.details.air_temperature,
                min:    nightWeather.data.instant.details.air_temperature
            },
            icon:           getWeatherIcon(dayWeather.data.next_6_hours.summary.symbol_code),
            date:           new Date(dayWeather.time),
            wind:           dayWeather.data.instant.details.wind_speed,
            humidity:       dayWeather.data.instant.details.relative_humidity,
            precipitation:  dayWeather.data.next_6_hours.details.precipitation_amount
        });
    }

    return {
        currentHour: {
            temperature:    currentHour.instant.details.air_temperature,
            icon:           getWeatherIcon(currentHour.next_1_hours.summary.symbol_code),
            wind:           currentHour.instant.details.wind_speed,
            humidity:       currentHour.instant.details.relative_humidity
        },
        nextHours: {
            one: {
                temperature:    next1Hours.instant.details.air_temperature,
                icon:           getWeatherIcon(next1Hours.next_1_hours.summary.symbol_code),
                wind:           currentHour.instant.details.wind_speed,
                humidity:       currentHour.instant.details.relative_humidity,
                precipitation:  currentHour.next_1_hours.details.precipitation_amount
            },
            six: {
                temperature:    next6Hours.instant.details.air_temperature,
                icon:           getWeatherIcon(next6Hours.next_1_hours.summary.symbol_code),
                wind:           next6Hours.instant.details.wind_speed,
                humidity:       next6Hours.instant.details.relative_humidity,
                precipitation:  currentHour.next_6_hours.details.precipitation_amount
            },
            twelve: {
                temperature:    next12Hours.instant.details.air_temperature,
                icon:           getWeatherIcon(next12Hours.next_1_hours.summary.symbol_code),
                wind:           next12Hours.instant.details.wind_speed,
                humidity:       next12Hours.instant.details.relative_humidity,
                precipitation:  next6Hours.next_6_hours.details.precipitation_amount
            },
        },
        nextDays: next7Days
    }
}

export function getFormattedDate(pDate, displayHour = false) {
    const days = {
        0: 'Sunday',
        1: 'Monday',
        2: 'Tuesday',
        3: 'Wednesday',
        4: 'Thursday',
        5: 'Friday',
        6: 'Saturday'
    }

    let date  = pDate.getDate() < 10 ? '0' + pDate.getDate() : pDate.getDate();
    let month = pDate.getMonth() < 9 ? '0' + (pDate.getMonth() + 1) : pDate.getMonth() + 1;
    let dateString = `${days[pDate.getDay()]} ${date}.${month}`;
    if (displayHour) {
        dateString += `, ${getFormattedHours(pDate)}`;
    }
    return dateString;
};

export function getFormattedHours(date) {
    let hours = date.getHours();
    return `${hours < 10 ? '0' + hours : hours}:00`;
}

export function getDateWithHoursAdded(date, hours) {
    date.setHours(date.getHours() + hours);
    return date;
};

// export default { handleWeatherResponse, formatDate, getDateWithHoursAdded }