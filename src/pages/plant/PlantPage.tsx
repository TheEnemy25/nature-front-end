import React, { useEffect, useState } from 'react';
import Animal from '../../api-client/models/Animal';
import AnimalService from '../../api-client/service/AnimalService';

const Plant = () => {
    const [animals, setAnimals] = useState<Animal[]>([]);

    useEffect(() => {
        const fetchAnimals = async () => {
            try {
                const animalsData = await AnimalService.getAnimals();
                setAnimals(animalsData);
            } catch (error) {
                console.error("Error fetching animals:", error);
            }
        };

        fetchAnimals();
    }, []);

    return (
        <>
            <section>

                <h1>List of animal</h1>
                <article>
                    {animals.map((animal, index) => (
                        <div key={index}>{animal.description}</div>
                    ))}
                </article>
            </section>
        </>
    );
};

export default Plant;
