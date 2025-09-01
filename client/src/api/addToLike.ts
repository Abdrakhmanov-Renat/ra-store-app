import axios from "axios";
import { Product } from "../types/Product";
import { actions as likeActions } from "../features/likedProducts";

export const addNewToLikes = (userId: string, product: Product) => {
  return async (dispatch: any) => {
    // dispatch(AddToCartActions.add(product));
    // dispatch(quantityActions.incrementQuantity(+product.itemId));

    try {
      await axios.post(`http://localhost:5700/likes/${userId}`, {
        id: product.itemId,
        category: product.category,
      });
    } catch (error) {
      console.error('Error adding to likes:', error);
    }
  };
};

export const fetchLikes = (userId: string) => {
  return async (dispatch: any) => {
    try {
      const response = await axios.get(`http://localhost:5700/likes/${userId}`);
      const items = response.data;

      const itemIds = items.map((item: any) => item.itemId);

      const productsResponse = await axios.post(`http://localhost:5700/products/many`, {
        ids: itemIds,
      });

      const products = productsResponse.data;

      dispatch(likeActions.setProducts(products));
    } catch (error) {
      console.error('Error loading likes:', error);
    }
  };
};

export const deleteItemFromLikes = (productId: string, userId: string) => {
  return async (dispatch: any) => {
    try {
      await axios
        .delete(`http://localhost:5700/likes/${userId}/${productId}`);

      dispatch(likeActions.deleteOne(productId));
    } catch (error) {
      console.error('Error to delete item:', error);
    }
  }
};
