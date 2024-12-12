import React, { useState } from 'react';
import { MapContainer, TileLayer, Polygon, Popup } from 'react-leaflet';
import { LatLngTuple } from 'leaflet';
import { reserveBoundary } from '../../utils/Coords';
import { testPolygon2, testPolygon3, testPolygon4 } from '../../utils/Polygons';
import Animal from '../../api-client/models/Animal';
import Plant from '../../api-client/models/Plant';
import AnimalService from '../../api-client/service/AnimalService';
import PlantService from '../../api-client/service/PlantService';
import WeatherService from '../../api-client/service/WeatherService';

const MainPage = () => {
    const [animals, setAnimals] = useState<Animal[]>([]);
    const [plants, setPlants] = useState<Plant[]>([]);
    const [selectedArea, setSelectedArea] = useState<{ name: string, animals: Animal[], plants: Plant[] } | null>(null);
    const [weather, setWeather] = useState<{ date: string, temperature: number, condition: string } | null>(null);
    const [error, setError] = useState<string | null>(null);

    const polygonCoordinates: LatLngTuple[] = reserveBoundary[0].map(
        ([lng, lat]) => [lat, lng] as LatLngTuple
    );

    const educationalContent = {
        mainReserve: {
            title: "Nature Reserve Boundary",
            description: "This large polygon represents the boundary of the nature reserve. Inside this protected area, diverse ecosystems thrive, offering a unique opportunity to learn about local flora and fauna."
        },
        area2: {
            title: "Wetland Habitat",
            description: "This region is primarily a wetland habitat. Wetlands are crucial ecosystems that help purify water and support migratory bird species and amphibians."
        },
        area3: {
            title: "Grassland Meadow",
            description: "This grassland meadow boasts a variety of herbaceous plants and is a prime feeding ground for grazing animals."
        },
        area4: {
            title: "Forest Edge",
            description: "Along the forest edge, you'll find transitional habitats that support both woodland and meadow species."
        }
    };

    const fetchWeatherData = async () => {
        const today = new Date().toISOString().split("T")[0];
        try {
            const data = await WeatherService.getWeather("Ukraine, Lviv");
            const todayData = data?.days?.find((day: any) => day.datetime === today);
            if (todayData) {
                return {
                    date: todayData.datetime,
                    temperature: todayData.temp,
                    condition: todayData.conditions
                };
            } else {
                return null;
            }
        } catch (error) {
            console.error("Unable to fetch weather data:", error);
            return null;
        }
    };

    const handlePolygonClick = async (areaKey: string) => {
        try {
            // Завантажуємо всі тварини та рослини
            const [fetchedAnimals, fetchedPlants] = await Promise.all([
                AnimalService.getAnimals(),
                PlantService.getPlants()
            ]);

            let weatherData = null;
            if (areaKey === 'mainReserve') {
                weatherData = await fetchWeatherData();
            }

            setWeather(weatherData as any);
            setAnimals(Array.isArray(fetchedAnimals) ? fetchedAnimals : []);
            setPlants(Array.isArray(fetchedPlants) ? fetchedPlants : []);
            setSelectedArea({
                name: areaKey,
                animals: Array.isArray(fetchedAnimals) ? fetchedAnimals : [],
                plants: Array.isArray(fetchedPlants) ? fetchedPlants : []
            });
        } catch (err) {
            console.error("Error fetching data:", err);
            setError("Failed to fetch animals or plants.");
        }
    };

    return (
        <div className="relative min-h-screen flex flex-col bg-gray-900">
            <div className="h-[60vh] relative z-10">
                <MapContainer
                    center={[50.2743385, 23.5886818]}
                    zoom={12}
                    style={{ height: '100%', width: '100%' }}
                >
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; OpenStreetMap contributors'
                    />

                    {/* Main Reserve Boundary */}
                    <Polygon
                        positions={polygonCoordinates}
                        fillColor="#aad3df"
                        fillOpacity={0.4}
                        weight={2}
                        color="#2b8cbe"
                        eventHandlers={{
                            click: () => handlePolygonClick('mainReserve')
                        }}
                    >
                        <Popup>
                            <h2>{educationalContent.mainReserve.title}</h2>
                            <p>{educationalContent.mainReserve.description}</p>
                        </Popup>
                    </Polygon>

                    {/* Polygon 2: Wetland Habitat */}
                    <Polygon
                        positions={testPolygon2}
                        fillColor="#f4cccc"
                        fillOpacity={0.4}
                        weight={2}
                        color="#2b8cbe"
                        eventHandlers={{
                            click: () => handlePolygonClick('area2')
                        }}
                    >
                        <Popup>
                            <h2>{educationalContent.area2.title}</h2>
                            <p>{educationalContent.area2.description}</p>
                        </Popup>
                    </Polygon>

                    {/* Polygon 3: Grassland Meadow */}
                    <Polygon
                        positions={testPolygon3}
                        fillColor="#fff2cc"
                        fillOpacity={0.4}
                        weight={2}
                        color="#2b8cbe"
                        eventHandlers={{
                            click: () => handlePolygonClick('area3')
                        }}
                    >
                        <Popup>
                            <h2>{educationalContent.area3.title}</h2>
                            <p>{educationalContent.area3.description}</p>
                        </Popup>
                    </Polygon>

                    {/* Polygon 4: Forest Edge */}
                    <Polygon
                        positions={testPolygon4}
                        fillColor="#d9ead3"
                        fillOpacity={0.4}
                        weight={2}
                        color="#2b8cbe"
                        eventHandlers={{
                            click: () => handlePolygonClick('area4')
                        }}
                    >
                        <Popup>
                            <h2>{educationalContent.area4.title}</h2>
                            <p>{educationalContent.area4.description}</p>
                        </Popup>
                    </Polygon>
                </MapContainer>
            </div>

            <div className="relative z-20 bg-gray-900 text-white py-10 px-4">
                {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                {selectedArea ? (
                    <>
                        <h2 className="text-4xl text-center font-bold mb-8 capitalize">
                            {selectedArea.name.replace('mainReserve', 'Nature Reserve')}
                        </h2>

                        {selectedArea.name === 'mainReserve' && weather && (
                            <div className="max-w-4xl mx-auto mb-10 bg-gray-800 p-6 rounded-lg shadow-lg">
                                <h3 className="text-2xl font-bold mb-4">Today's Weather</h3>
                                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                                    <p><strong>Date:</strong> {weather.date}</p>
                                    <p><strong>Temperature:</strong> {weather.temperature.toFixed(1)}°C</p>
                                    <p><strong>Condition:</strong> {weather.condition}</p>
                                </div>
                            </div>
                        )}

                        {/* Animals Section */}
                        <div className="max-w-6xl mx-auto mb-10">
                            <h3 className="text-3xl font-bold mb-6">Animals</h3>
                            <p className="text-gray-300 mb-4">Total: {selectedArea.animals?.length || 0}</p>
                            {selectedArea.animals && selectedArea.animals.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {selectedArea.animals.map((animal) => (
                                        <div
                                            className="bg-gray-800 rounded-lg shadow-lg overflow-hidden"
                                            key={animal.id}
                                        >
                                            {animal.photoUrl && (
                                                <img
                                                    src={animal.photoUrl}
                                                    alt={animal.name}
                                                    className="w-full h-64 object-cover"
                                                />
                                            )}
                                            <div className="p-6">
                                                <h2 className="text-xl font-bold text-white mb-2">{animal.name}</h2>
                                                <p className="text-gray-400 mb-2">Species: {animal.species}</p>
                                                <p className="text-gray-400 mb-4">{animal.description}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-white text-center">No animals found.</p>
                            )}
                        </div>

                        {/* Plants Section */}
                        <div className="max-w-6xl mx-auto mb-10">
                            <h3 className="text-3xl font-bold mb-6">Plants</h3>
                            <p className="text-gray-300 mb-4">Total: {selectedArea.plants?.length || 0}</p>
                            {selectedArea.plants && selectedArea.plants.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {selectedArea.plants.map((plant) => (
                                        <div
                                            className="bg-gray-800 rounded-lg shadow-lg overflow-hidden"
                                            key={plant.id}
                                        >
                                            {plant.photoUrl && (
                                                <img
                                                    src={plant.photoUrl}
                                                    alt={plant.name}
                                                    className="w-full h-64 object-cover"
                                                />
                                            )}
                                            <div className="p-6">
                                                <h2 className="text-xl font-bold text-white mb-2">{plant.name}</h2>
                                                <p className="text-gray-400 mb-2"><span className="text-white font-semibold">Species:</span> {plant.species}</p>
                                                <p className="text-gray-400 mb-4">{plant.description}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-white text-center">No plants found.</p>
                            )}
                        </div>
                    </>
                ) : (
                    <p className="text-center text-gray-300 text-xl">Click on an area inside the reserve to see animals, plants, and (for the main reserve) today's weather.</p>
                )}
            </div>
        </div>
    );
};

export default MainPage;
