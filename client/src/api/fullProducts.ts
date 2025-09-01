import { FullProduct } from '../types/FullProduct';
import { client } from '../utils/fetchClient';

export const getPhones = () => {
  return client.get<FullProduct[]>('/phones');
};

export const getTablets = () => {
  return client.get<FullProduct[]>('/tablets');
};

export const getAccessories = () => {
  return client.get<FullProduct[]>('/accessories');
};
