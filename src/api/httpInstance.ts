import axios from 'axios';

const httpInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}`,
});

export default httpInstance;
