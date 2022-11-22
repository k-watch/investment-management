import axios from 'axios';

const httpInstance = axios.create({
  timeout: 3000,
});

export default httpInstance;
