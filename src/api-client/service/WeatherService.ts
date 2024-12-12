import axios from "axios";

const WEATHER_API_KEY = "ZYJY2KXDPVVX5ELBB9PZM9CSW";

const WeatherService = {
    getWeather: async (city: string) => {
        try {
            const response = await axios.get(
                `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}`,
                {
                    params: {
                        unitGroup: "metric", // Use metric units (Celsius)
                        key: WEATHER_API_KEY,
                        contentType: "json",
                    },
                }
            );
            return response.data;
        } catch (error) {
            console.error("Error fetching weather data:", error);
            throw error;
        }
    },
};

export default WeatherService;

// const WEATHER_API_KEY = "ZYJY2KXDPVVX5ELBB9PZM9CSW";
// const CITY_API_KEY = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/Ukraine%2C%20Lviv?unitGroup=us&key=ZYJY2KXDPVVX5ELBB9PZM9CSW&contentType=json"
