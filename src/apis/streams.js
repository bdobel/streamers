// create instance of axios and export
import axios from 'axios';

export default axios.create({
  baseURL: 'http://localhost:3001' 
});
