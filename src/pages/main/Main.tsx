import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Polygon } from 'react-leaflet';
import { LatLngTuple } from 'leaflet';
import { reserveBoundary } from '../../utils/Coords';
import Animal from '../../api-client/models/Animal';
import AnimalService from '../../api-client/service/AnimalService';

const Main = () => {
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


    const polygonCoordinates: LatLngTuple[] = reserveBoundary[0].map(
        ([lng, lat]) => [lat, lng] as LatLngTuple
    );

    return (
        <>
            <MapContainer
                center={[50.2743385, 23.5886818]}
                zoom={12}
                style={{ height: '100vh', width: '100%' }}
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />

                <Polygon
                    positions={polygonCoordinates}
                    fillColor="lightblue"
                    fillOpacity={0.4}
                    weight={2}
                    color="blue"
                />
            </MapContainer>

            <section>

                <h1>List of animal</h1>
                <article>
                    {animals.map((animal, index) => (
                        <div>{animal.description}</div>
                    ))}
                </article>
            </section>
        </>
    );
};

export default Main;
