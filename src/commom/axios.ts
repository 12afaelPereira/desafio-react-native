import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';


const githubInstance: AxiosRequestConfig = {
    baseURL: 'https://api.github.com',  
}

const githubAPI: AxiosInstance = axios.create(githubInstance);

export default githubAPI;