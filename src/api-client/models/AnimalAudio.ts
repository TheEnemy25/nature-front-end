import Animal from "./Animal";

type AnimalAudio = {
    id: string;
    animalId: string;

    audioBytes: string;

    //Relationships
    animal: Animal;
};

export default AnimalAudio