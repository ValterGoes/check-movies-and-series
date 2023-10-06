import axios from 'axios';
import { responseInterceptor } from './interceptors/ResponseInterceptor';
import { errorInterceptor } from './interceptors';


// Create a instance of axios to use the same base url.
const Api = axios.create({
    baseURL: 'http://localhost:3333',
});


Api.interceptors.response.use(
    (response) => responseInterceptor(response),
    (error) => errorInterceptor(error),
);

export { Api };