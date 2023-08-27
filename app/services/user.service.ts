import axios from 'axios';
import {apiBase} from '../resources';
import {contactType, settingsType} from '../types';

export async function getUser(token: string) {
  const result = await axios.get(`${apiBase}/user/`, {
    headers: {Authorization: `Bearer ${token}`},
  });
  return result.data;
}

export async function addNewContact(params: {
  token: string;
  contact: contactType;
}) {
  const result = await axios.post(
    `${apiBase}/settings/new-contact`,
    params.contact,
    {
      headers: {Authorization: `Bearer ${params.token}`},
    },
  );
  return result.data;
}

export async function updateSettings(params: {
  token: string;
  settings: settingsType;
}) {
  const result = await axios.patch(
    `${apiBase}/settings/update-settings`,
    params.settings,
    {
      headers: {Authorization: `Bearer ${params.token}`},
    },
  );
  return result.data;
}

export async function getSettings(token: string) {
  const result = await axios.get(`${apiBase}/settings`, {
    headers: {Authorization: `Bearer ${token}`},
  });
  return result.data;
}

export async function getAllContacts(token: string) {
  const result = await axios.get(`${apiBase}/settings/contacts/all`, {
    headers: {Authorization: `Bearer ${token}`},
  });
  return result.data;
}
