import APIRoutes from "../api/APIRoutes";
import APIService from "../api/APIService"
import Animal from "../models/Animal";

const AnimalService = {
    getAnimals: async (): Promise<Animal[]> => {
        try {
            return await APIService.get<Animal[]>(`${APIRoutes.animalControllerUrl()}/get-all`);
        }
        catch (error) {
            console.error('Error while fetching animals:', error);
            throw error;
        }
    },

    getAnimalById: async (animalId: string): Promise<Animal> => {
        try {
            return await APIService.get<Animal>(`${APIRoutes.animalControllerUrl()}/get-by-id`, { Id: animalId });
        } catch (error) {
            console.error('Error fetching animal by id:', error);
            throw error;
        }
    },

    createAnimal: async (animalData: Omit<Animal, 'id'>): Promise<Animal> => {
        try {
            const newAnimal = await APIService.post<Animal>(`${APIRoutes.animalControllerUrl()}/create`, animalData);
            return newAnimal;
        } catch (error) {
            console.error('Error creating animal:', error);
            throw error;
        }
    },

    updateAnimal: async (animalId: string, animalData: Animal): Promise<Animal> => {
        try {
            return await APIService.put<Animal>(`${APIRoutes.animalControllerUrl()}/put/${animalId}`, animalData);
        } catch (error) {
            console.error('Error updating animal:', error);
            throw error;
        }
    },

    deleteAnimal: async (animalId: string): Promise<void> => {
        try {
            await APIService.delete(`${APIRoutes.animalControllerUrl()}/delete?Id=${animalId}`);
        }
        catch (error) {
            console.error('Error deleting animal:', error);
            throw error;
        }
    }
};

export default AnimalService;

// const AnimalService = {
//     getAnimals: async (): Promise<Animal[]> => {
//         try {
//             const response = await axios.get(`${APIRoutes.animalControllerUrl()}/get-all`);
//             const data = response.data;

//             if (data?.$values) {
//                 return data.$values;
//             } else {
//                 throw new Error("Unexpected response structure");
//             }
//         } catch (error) {
//             console.error("Error fetching animals:", error);
//             throw error;
//         }
//     },

//     getAnimalById: async (animalId: string): Promise<Animal> => {
//         try {
//             const response = await axios.get(`${APIRoutes.animalControllerUrl()}/get-by-id`, {
//                 params: { Id: animalId },
//             });
//             return response.data;
//         } catch (error) {
//             console.error("Error fetching animal by id:", error);
//             throw error;
//         }
//     },

//     createAnimal: async (animalData: Omit<Animal, "id">): Promise<Animal> => {
//         try {
//             const response = await axios.post(`${APIRoutes.animalControllerUrl()}/create`, animalData);
//             return response.data;
//         } catch (error) {
//             console.error("Error creating animal:", error);
//             throw error;
//         }
//     },

//     updateAnimal: async (animalId: string, animalData: Animal): Promise<Animal> => {
//         try {
//             const response = await axios.put(
//                 `${APIRoutes.animalControllerUrl()}/put/${animalId}`,
//                 animalData
//             );
//             return response.data;
//         } catch (error) {
//             console.error("Error updating animal:", error);
//             throw error;
//         }
//     },

//     deleteAnimal: async (animalId: string): Promise<void> => {
//         try {
//             await axios.delete(`${APIRoutes.animalControllerUrl()}/delete?Id=${animalId}`);
//         } catch (error) {
//             console.error("Error deleting animal:", error);
//             throw error;
//         }
//     },
// };

// export default AnimalService;