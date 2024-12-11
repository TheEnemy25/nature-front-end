import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Polygon, GeoJSON } from 'react-leaflet';
import { LatLngTuple } from 'leaflet';
import { reserveBoundary } from '../../utils/Coords';
import Animal from '../../api-client/models/Animal';
import AnimalService from '../../api-client/service/AnimalService';
import '../../utils/Coords';
// import GeoJSON from 'geojson';

interface GeoJSONData {
    type: string;
    features: any[];
}

const MainPage = () => {
    const [animals, setAnimals] = useState<Animal[]>([]);
    const [geoData, setGeoData] = useState<GeoJSONData[]>([]);

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

    // useEffect(() => {
    //     fetch("../../utils/qwe.geojson")
    //         .then((response) => {
    //             return response
    //         })
    //         .then((newData: any) => setGeoData((prevData) => [...prevData, newData]))
    //         .catch((error) => console.error("Error loading GeoJSON data:", error));
    // }, []);

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

                {/* {geoData.map((data: any, index) => {
                    debugger
                    return (

                        <GeoJSON
                            key={index}
                            data={data}
                            onEachFeature={(object, layer) => {
                                layer.on("mouseover", function (e) {
                                    if (object.properties && object.properties.name) {
                                        layer.bindPopup(object.properties.name).openPopup();
                                    }
                                });

                                layer.on("mouseout", function (e) {
                                    layer.closePopup();
                                });

                                layer.on("contextmenu", function (e) {
                                    console.log("hi");
                                });

                                layer.on("click", function (e) {
                                });
                            }}
                        />
                    )
                })} */}
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

export default MainPage;
