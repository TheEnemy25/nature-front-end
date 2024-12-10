import Reserve from "./Reserve";
import ReserveArea from "./ReserveArea";

type MapPoint = {
    id: string;
    reserveAreaId: string;
    reserveId: string;

    latitude: string;
    longtitude: string;

    //Relationships
    reserve: Reserve;
    reserveArea: ReserveArea;
};

export default MapPoint