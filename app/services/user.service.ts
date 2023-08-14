import axios from 'axios';
import {apiBase} from '../resources';

export async function getUser(token: string) {
  const result = await axios.get(`${apiBase}/user/`, {
    headers: {Authorization: `Bearer ${token}`},
  });
  return result.data;
}
