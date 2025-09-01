import { Product } from '../types/Product';

type AddAction = { type: 'addedToCartProducts/ADD'; payload: Product };
type DeleteAction = { type: 'addedToCartProducts/DELETE'; payload: string };
type SetAction = { type: 'addedToCartProducts/SET'; payload: Product[] };
type SetNullAction = { type: 'addedToCartProducts/SETNULL' };

type Action = AddAction | DeleteAction | SetAction | SetNullAction;

const add = (product: Product): AddAction => ({
  type: 'addedToCartProducts/ADD',
  payload: product,
});
const deleteOne = (id: string): DeleteAction => ({
  type: 'addedToCartProducts/DELETE',
  payload: id,
});
const setProducts = (products: Product[]): SetAction => ({
  type: 'addedToCartProducts/SET',
  payload: products,
});
const setNullProducts = (): SetNullAction => ({
  type: 'addedToCartProducts/SETNULL',
});

/* eslint-disable @typescript-eslint/default-param-last */
const addedToCartProductsReducer = (
  addedToCartProducts: Product[] = [],
  action: Action,
) => {
  switch (action.type) {
    case 'addedToCartProducts/ADD':
      return [...addedToCartProducts, action.payload];

    case 'addedToCartProducts/DELETE':
      return addedToCartProducts.filter(
        product => product.itemId !== action.payload,
      );
    case 'addedToCartProducts/SET':
      return action.payload;

    case 'addedToCartProducts/SETNULL':
      return [];

    default:
      return addedToCartProducts;
  }
};

export const actions = { add, deleteOne, setProducts, setNullProducts };

export default addedToCartProductsReducer;
