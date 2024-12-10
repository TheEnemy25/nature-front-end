import City from "./City";
import MapPoint from "./MapPoint";
import Plant from "./Plant";

type Reserve = {
    id: string;
    cityId: string;

    name: string;

    //Relationships
    city: City;
    mapPoints: MapPoint[];
};

export default Reserve