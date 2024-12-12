import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Animal from "../../api-client/models/Animal";
import AnimalService from "../../api-client/service/AnimalService";

const AnimalDetailsPage = () => {
    const { id } = useParams<{ id: string }>();
    const [animal, setAnimal] = useState<Animal | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchAnimal = async () => {
            try {
                if (id) {
                    const animalData = await AnimalService.getAnimalById(id);
                    setAnimal(animalData);
                }
            } catch (error) {
                console.error("Error fetching animal details:", error);
                setError("Failed to fetch animal details.");
            }
        };

        fetchAnimal();
    }, [id]);

    if (error) {
        return <p className="text-red-500 text-center mt-8">{error}</p>;
    }

    if (!animal) {
        return <p className="text-gray-400 text-center mt-8">Loading animal details...</p>;
    }

    return (
        <section className="bg-gray-900 min-h-screen py-10">
            <div className="container mx-auto px-4">
                <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                    <div className="p-6">
                        <h1 className="text-3xl font-bold text-white mb-4">{animal.name}</h1>
                        <p className="text-gray-400 mb-2">
                            <span className="font-semibold text-white">Species:</span> {animal.species}
                        </p>
                        <p className="text-gray-400 mb-2">
                            <span className="font-semibold text-white">Description:</span> {animal.description}
                        </p>
                        <p className="text-gray-400 mb-2">
                            <span className="font-semibold text-white">Behavior:</span> {animal.behavior}
                        </p>
                        {animal.photoUrl && (
                            <div className="mt-4">
                                <img
                                    src={animal.photoUrl}
                                    alt={animal.name}
                                    className="h-auto rounded-lg"
                                />
                            </div>
                        )}
                        {/* {animal.audioUrl && (
                            <div className="mt-4">
                                <audio controls className="w-full">
                                    <source src={animal.audioUrl} type="audio/mpeg" />
                                    Your browser does not support the audio element.
                                </audio>
                            </div>
                        )} */}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AnimalDetailsPage;
