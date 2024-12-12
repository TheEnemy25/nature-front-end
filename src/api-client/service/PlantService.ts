import APIRoutes from "../api/APIRoutes";
import APIService from "../api/APIService"
import Plant from "../models/Plant";

const PlantService = {
    getPlants: async (): Promise<Plant[]> => {
        try {
            return await APIService.get<Plant[]>(`${APIRoutes.plantControllerUrl()}/get-all`);
        }
        catch (error) {
            console.error('Error while fetching plants:', error);
            throw error;
        }
    },

    getPlantById: async (plantId: string): Promise<Plant> => {
        try {
            return await APIService.get<Plant>(`${APIRoutes.plantControllerUrl()}/get-by-id`, { Id: plantId });
        } catch (error) {
            console.error('Error fetching plant by id:', error);
            throw error;
        }
    },

    createPlant: async (plantData: Omit<Plant, 'id'>): Promise<Plant> => {
        try {
            const newPlant = await APIService.post<Plant>(`${APIRoutes.plantControllerUrl()}/create`, plantData);
            return newPlant;
        } catch (error) {
            console.error('Error creating plant:', error);
            throw error;
        }
    },

    updatePlant: async (plantId: string, plantData: Plant): Promise<Plant> => {
        try {
            return await APIService.put<Plant>(`${APIRoutes.plantControllerUrl()}/put/${plantId}`, plantData);
        } catch (error) {
            console.error('Error updating plant:', error);
            throw error;
        }
    },

    deletePlant: async (plantId: string): Promise<void> => {
        try {
            await APIService.delete(`${APIRoutes.plantControllerUrl()}/delete?Id=${plantId}`);
        }
        catch (error) {
            console.error('Error deleting Plant:', error);
            throw error;
        }
    }
};

export default PlantService;
