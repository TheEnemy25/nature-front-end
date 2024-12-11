import React, { useEffect, useState } from 'react';
import Animal from '../../api-client/models/Animal';
import AnimalService from '../../api-client/service/AnimalService';
import { Link } from 'react-router-dom';

const AnimalPage = () => {
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
            <section className="">
                <h1 className="text-white text-[48px] pb-[20px]">Movies List</h1>
                <div className="flex flex-col">
                    {animals.map((animal) => (
                        <article className="flex flex-row" key={animal.id}>
                            <img
                                className=""
                            // src={animal.imageLink}
                            // alt={animal.title}
                            />
                            <div className="flex flex-row gap-x-[20px]">
                                <Link to={`/animal/${animal.id}`} className="">
                                    {animal.name}
                                </Link>
                                <p>{animal.species}</p>
                                <p>{animal.description}</p>
                                <p>{animal.behavior}</p>

                            </div>
                        </article>
                    ))}
                </div>
            </section>
        </>
    );
};

export default AnimalPage;
