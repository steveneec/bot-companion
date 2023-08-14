import axios from 'axios';
import {apiBase} from '../resources';

export async function signin() {
  const response = await axios.post(`${apiBase}/auth/signin`, {});
  return response.data;
}

export async function signup(params: {
  name: string;
  email: string;
  birthday: Date;
  password: string;
}) {
  const response = await axios.post(`${apiBase}/auth/signup`, params);
  return response.data;
}
