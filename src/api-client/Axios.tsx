import axios from "axios";

const Axios = axios.create({ timeout: 20000 });

Axios.interceptors.request.use(

);

Axios.interceptors.response.use(
    (response) => {
        return response;
    },
);

export default Axios;