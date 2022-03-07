import { getWeatherIcon } from '../helpers/utils';

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