import APIConfig from "../configuration/APIConfig";

const APIRoutes = {
    animalControllerUrl: () => APIConfig.URL + "api/Animal",
    plantControllerUrl: () => APIConfig.URL + "api/Plant",

    habbitatControllerUrl: () => APIConfig.URL + "api/Habbitat",


};

export default APIRoutes;