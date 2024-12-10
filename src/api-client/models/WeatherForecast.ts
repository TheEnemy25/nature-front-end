import Reserve from "./Reserve";

type WeatherForecast = {
    id: string;
    reserveId: string;

    timestamp: Date;
    temperatureC: number;
    temperatureF: number;
    atmospherePressure: number;
    rainfallChance: number;
    windSpeed: number;

    //Relationships
    reserve: Reserve;
};

export default WeatherForecast