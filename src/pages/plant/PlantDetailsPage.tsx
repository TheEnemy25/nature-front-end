import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Plant from "../../api-client/models/Plant";
import PlantService from "../../api-client/service/PlantService";

const PlantDetailsPage = () => {
    const { id } = useParams<{ id: string }>();
    const [plant, setPlant] = useState<Plant | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPlant = async () => {
            try {
                if (id) {
                    const plantData = await PlantService.getPlantById(id);
                    setPlant(plantData);
                }
            } catch (error) {
                console.error("Error fetching plant details:", error);
                setError("Failed to fetch plant details.");
            }
        };

        fetchPlant();
    }, [id]);

    if (error) {
        return <p className="text-red-500 text-center mt-8">{error}</p>;
    }

    if (!plant) {
        return <p className="text-gray-400 text-center mt-8">Loading plant details...</p>;
    }

    return (
        <section className="bg-gray-900 min-h-screen py-10">
            <div className="container mx-auto px-4">
                <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                    <div className="p-6">
                        <h1 className="text-3xl font-bold text-white mb-4">{plant.name}</h1>
                        <p className="text-gray-400 mb-2">
                            <span className="font-semibold text-white">Species:</span> {plant.species}
                        </p>
                        <p className="text-gray-400 mb-2">
                            <span className="font-semibold text-white">Description:</span> {plant.description}
                        </p>
                        {plant.habitats && plant.habitats.length > 0 && (
                            <p className="text-gray-400 mb-2">
                                <span className="font-semibold text-white">Habitats:</span> {plant.habitats.map(h => h.name).join(", ")}
                            </p>
                        )}
                        {plant.threats && plant.threats.length > 0 && (
                            <p className="text-gray-400 mb-2">
                                <span className="font-semibold text-white">Threats:</span> {plant.threats.map(t => t.name).join(", ")}
                            </p>
                        )}
                        {plant.safekeepings && plant.safekeepings.length > 0 && (
                            <p className="text-gray-400 mb-2">
                                <span className="font-semibold text-white">Safekeeping Methods:</span> {plant.safekeepings.map(s => s.name).join(", ")}
                            </p>
                        )}
                        {plant.photoUrl && (
                            <div className="mt-4">
                                <img
                                    src={plant.photoUrl}
                                    alt={plant.name}
                                    className="h-auto rounded-lg"
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PlantDetailsPage;
