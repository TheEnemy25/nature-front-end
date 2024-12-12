import APIRoutes from "../api/APIRoutes";
import APIService from "../api/APIService"
import Individuals from "../models/Individuals";

const HabitatService = {
    getIndividuals: async (id: string): Promise<Individuals> => {
        try {
            return await APIService.get<Individuals>(`${APIRoutes.habbitatControllerUrl()}/get-individuals/` + id);
        }
        catch (error) {
            console.error('Error while fetching:', error);
            throw error;
        }
    },
};

export default HabitatService;
