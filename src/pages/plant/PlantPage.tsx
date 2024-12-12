import React, { useEffect, useState } from "react";
import Plant from "../../api-client/models/Plant";
import PlantService from "../../api-client/service/PlantService";
import { Link } from "react-router-dom";

const PlantPage = () => {
    const [plants, setPlants] = useState<Plant[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPlants = async () => {
            try {
                const plantsData = await PlantService.getPlants();

                if (Array.isArray(plantsData)) {
                    setPlants(plantsData);
                } else {
                    console.error("API response is not an array:", plantsData);
                    setError("Unexpected API response.");
                }
            } catch (error) {
                console.error("Error fetching plants:", error);
                setError("Failed to fetch plants.");
            }
        };

        fetchPlants();
    }, []);

    if (error) {
        return <p className="text-red-500 text-center mt-8">{error}</p>;
    }

    return (
        <section className="bg-gray-900 min-h-screen py-10">
            <div className="container mx-auto px-4">
                <h1 className="text-4xl text-center font-bold text-white mb-10">Plants List</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {plants.length > 0 ? (
                        plants.map((plant) => (
                            <div
                                className="bg-gray-800 rounded-lg shadow-lg overflow-hidden"
                                key={plant.id}
                            >
                                {plant.photoUrl && (
                                    <img
                                        src={plant.photoUrl}
                                        alt={plant.name}
                                        className="w-full h-96 object-cover"
                                    />
                                )}
                                <div className="p-6">
                                    <h2 className="text-xl font-bold text-white mb-2">{plant.name}</h2>
                                    <p className="text-gray-400 mb-2 flex flex-row gap-2"><p className="text-white">Species:</p> {plant.species}</p>
                                    <p className="text-gray-400 mb-4">{plant.description}</p>
                                    <Link
                                        to={`/plant/${plant.id}`}
                                        className="inline-block bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition"
                                    >
                                        View Details
                                    </Link>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-white text-center col-span-full">No plants found.</p>
                    )}
                </div>
            </div>
        </section>
    );
};

export default PlantPage;
