import Country from "./Country";

type City = {
    id: string;
    countryId: string;

    name: string;

    //Relationships
    country: Country;
};

export default City