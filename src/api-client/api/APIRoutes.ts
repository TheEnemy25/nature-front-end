import APIConfig from "../configuration/APIConfig";

const APIRoutes = {
    animalControllerUrl: () => APIConfig.URL + "api/Animal",
    movieControllerUrl: () => APIConfig.URL + "api/Movie",

};

export default APIRoutes;