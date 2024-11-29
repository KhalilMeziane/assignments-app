import axios, { Axios } from 'axios';
import { BadRequestError, ConflictError, ForbiddenError, NotFoundError, UnAuthorizedError, UnhandledError } from './networkErrors';
let axiosInstance: Axios;

export const HttpClient = () => {
  if (axiosInstance) return axiosInstance;
  axiosInstance = axios.create({
    baseURL: 'localhost',
  });

  axiosInstance.interceptors.response.use(response => response, error => {
    if (error.response) {
      const status = error.response.status;
      const message = error.response.data?.message || 'An error occurred';
      switch (status) {
        case 400:
          throw new BadRequestError(message);
        case 401:
          throw new UnAuthorizedError(message);
        case 403:
          throw new ForbiddenError(message);
        case 404:
          throw new NotFoundError(message);
        case 409:
          throw new ConflictError(message);
        default:
          throw new UnhandledError(message);
      }
    } else {
      throw new UnhandledError(error.message);
    }
  })
  return axiosInstance
};







