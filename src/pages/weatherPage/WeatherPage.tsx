import React, { useEffect, useState } from "react";
import WeatherService from "../../api-client/service/WeatherService";
import {
    WiDaySunny,
    WiCloudy,
    WiRain,
    WiSnow,
    WiThunderstorm,
    WiFog,
} from "react-icons/wi";

const getWeatherIcon = (condition: string) => {
    if (condition.includes("Snow")) return <WiSnow size={48} />;
    if (condition.includes("Rain")) return <WiRain size={48} />;
    if (condition.includes("Overcast") || condition.includes("Cloudy")) return <WiCloudy size={48} />;
    if (condition.includes("Sunny") || condition.includes("Clear")) return <WiDaySunny size={48} />;
    if (condition.includes("Thunderstorm")) return <WiThunderstorm size={48} />;
    if (condition.includes("Fog") || condition.includes("Mist")) return <WiFog size={48} />;
    return <WiDaySunny size={48} />;
};

const WeatherPage = () => {
    const [weather, setWeather] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const today = new Date().toISOString().split("T")[0];

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                const data = await WeatherService.getWeather("Ukraine, Lviv");
                setWeather(data);
            } catch (error) {
                setError("Unable to fetch weather data.");
            } finally {
                setLoading(false);
            }
        };

        fetchWeather();
    }, []);

    if (loading) {
        return <p className="text-center text-white">Loading weather data...</p>;
    }

    if (error) {
        return <p className="text-center text-red-500">{error}</p>;
    }

    return (
        <div className="min-h-screen bg-gray-900 text-white p-5">
            <h1 className="text-4xl font-bold text-center mb-6">
                Weather for {weather?.resolvedAddress}
            </h1>
            <p className="text-center mb-6">{weather?.description}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {weather?.days.slice(0, 7).map((day: any, index: number) => (
                    <div
                        key={index}
                        className={`p-4 rounded-lg shadow-lg flex flex-col items-center ${day.datetime === today
                            ? "bg-blue-700 text-white"
                            : "bg-gray-800"
                            }`}
                    >
                        <p className="text-xl font-semibold">{day.datetime}</p>
                        {getWeatherIcon(day.conditions || "")}
                        <p className="text-lg">
                            <strong>Temp:</strong> {day.temp.toFixed(1)}°C
                        </p>
                        <p className="text-lg">
                            <strong>Conditions:</strong> {day.conditions}
                        </p>
                        <p className="text-lg">
                            <strong>Humidity:</strong> {day.humidity}%
                        </p>
                        <p className="text-lg">
                            <strong>Wind:</strong> {day.windspeed} km/h
                        </p>
                        <p className="text-sm italic mt-2">{day.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default WeatherPage;
