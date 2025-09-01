import { Product } from "../types/Product";
import { actions as AddToCartActions } from '../../src/features/addedToCartProducts';
import { actions as quantityActions } from '../../src/features/cartQuantities';
import axios from "axios";

export const addNewToCart = (userId: string, product: Product, quantity: number) => {
  return async (dispatch: any) => {
    // dispatch(AddToCartActions.add(product));
    // dispatch(quantityActions.incrementQuantity(+product.itemId));

    console.log(userId, product, quantity);

    try {
      await axios.post(`http://localhost:5700/cart/${userId}`, {
        id: product.itemId,
        count: quantity,
        category: product.category,
      });
    } catch (error) {
      console.error('Error adding to cart:', error);
      // Можна додати відкат, якщо не вдалось
    }
  };
};

export const fetchCart = (userId: string) => {
  return async (dispatch: any) => {
    try {
      const response = await axios.get(`http://localhost:5700/cart/${userId}`);
      const items = response.data;

      const itemIds = items.map((item: any) => item.itemId);

      const productsResponse = await axios.post(`http://localhost:5700/products/many`, {
        ids: itemIds,
      });
      const products = productsResponse.data;

      const quantities = items.map((item: any) => ({
        id: item.itemId,
        quantity: item.quantity,
      }));

      dispatch(AddToCartActions.setProducts(products));
      dispatch(quantityActions.setQuantities(quantities));
    } catch (error) {
      console.error('Error loading cart:', error);
    }
  };
};

export const deleteItemFromCart = (productId: string, userId: string, id: string) => {
  return async (dispatch: any) => {
    try {
      await axios
        .delete(`http://localhost:5700/cart/${userId}/${productId}`);

      dispatch(AddToCartActions.deleteOne(productId));
      dispatch(quantityActions.removeQuantity(id));
    } catch (error) {
      console.error('Error to delete item:', error);
    }
  }
};

export const updateCartQuantity = (userId: string, productId: string, newQuantity: number) => {
  return async (dispatch: any) => {
    try {
      await axios.patch(`http://localhost:5700/cart/${userId}/${productId}`, {
        quantity: newQuantity,
      });
    } catch (error) {
      console.error('Error updating cart quantity:', error);
    }
  };
};
