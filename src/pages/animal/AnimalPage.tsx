import React, { useEffect, useState } from "react";
import Animal from "../../api-client/models/Animal";
import AnimalService from "../../api-client/service/AnimalService";
import { Link } from "react-router-dom";

const AnimalPage = () => {
    const [animals, setAnimals] = useState<Animal[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchAnimals = async () => {
            try {
                const animalsData = await AnimalService.getAnimals();
                if (Array.isArray(animalsData)) {
                    setAnimals(animalsData);
                } else {
                    console.error("API response is not an array:", animalsData);
                    setError("Unexpected API response.");
                }
            } catch (error) {
                console.error("Error fetching animals:", error);
                setError("Failed to fetch animals.");
            }
        };

        fetchAnimals();
    }, []);

    if (error) {
        return <p className="text-red-500 text-center mt-8">{error}</p>;
    }

    return (
        <section className="bg-gray-900 min-h-screen py-10">
            <div className="container mx-auto px-4">
                <h1 className="text-4xl text-center font-bold text-white mb-10">Animals List</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {animals.length > 0 ? (
                        animals.map((animal) => (
                            <div
                                className="bg-gray-800 rounded-lg shadow-lg overflow-hidden"
                                key={animal.id}
                            >
                                {animal.photoUrl && (
                                    <img
                                        src={animal.photoUrl}
                                        alt={animal.name}
                                        className="w-full h-96 object-cover "
                                    />
                                )}
                                <div className="p-6">
                                    <h2 className="text-xl font-bold text-white mb-2">{animal.name}</h2>
                                    <p className="text-gray-400 mb-2">Species: {animal.species}</p>
                                    <p className="text-gray-400 mb-4">{animal.description}</p>
                                    <Link
                                        to={`/animal/${animal.id}`}
                                        className="inline-block bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
                                    >
                                        View Details
                                    </Link>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-white text-center col-span-full">No animals found.</p>
                    )}
                </div>
            </div>
        </section>
    );
};

export default AnimalPage;
