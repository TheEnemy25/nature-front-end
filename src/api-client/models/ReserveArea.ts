import Habitat from "./Habitat";
import MapPoint from "./MapPoint";
import Reserve from "./Reserve";

type ReserveArea = {
    id: string;
    reserveId: string;

    name: string;

    //Relationships
    reserve: Reserve;
    habitats: Habitat[];
    mapPoints: MapPoint[];
};

export default ReserveArea