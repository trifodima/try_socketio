import axios from 'axios';
export default ((options) => axios({
  baseURL: 'http://localhost:9999',
  ...options,
}))
