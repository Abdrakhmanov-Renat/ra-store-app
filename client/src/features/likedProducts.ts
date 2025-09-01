import { Product } from '../types/Product';

type AddAction = { type: 'likedProducts/ADD'; payload: Product };
type GetAllAction = { type: 'likedProducts/GETALL' };
type DeleteAction = { type: 'likedProducts/DELETE'; payload: string };
type SetAction = { type: 'likedProducts/SET'; payload: Product[] };
type SetNullAction = { type: 'likedProducts/SETNULL' };

type Action =
  AddAction |
  GetAllAction |
  DeleteAction |
  SetAction |
  SetNullAction;

const add = (product: Product): AddAction => ({
  type: 'likedProducts/ADD',
  payload: product,
});
const setProducts = (products: Product[]): SetAction => ({
  type: 'likedProducts/SET',
  payload: products,
});
const getAll = (): GetAllAction => ({ type: 'likedProducts/GETALL' });
const deleteOne = (id: string): DeleteAction => ({
  type: 'likedProducts/DELETE',
  payload: id,
});
const setNullProducts = (): SetNullAction => ({
  type: 'likedProducts/SETNULL',
});

/* eslint-disable @typescript-eslint/default-param-last */
const likedProductsReducer = (
  likedProducts: Product[] = [],
  action: Action,
) => {
  switch (action.type) {
    case 'likedProducts/ADD':
      return [...likedProducts, action.payload];

    case 'likedProducts/GETALL':
      return likedProducts;

    case 'likedProducts/DELETE':
      return likedProducts.filter(product => product.itemId !== action.payload);

    case 'likedProducts/SET':
      return action.payload;

    case 'likedProducts/SETNULL':
      return [];

    default:
      return likedProducts;
  }
};

export const actions = { add, getAll, deleteOne, setProducts, setNullProducts };

export default likedProductsReducer;
