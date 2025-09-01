import React from 'react';
import './ProductByCard.scss';
import { Product } from '../../types/Product';
import { useDispatch, useSelector } from 'react-redux';
import { actions as quantityActions } from '../../features/cartQuantities';
import { RootState } from '../../app/store';
import { deleteItemFromCart, updateCartQuantity } from '../../api/addToCart';

type Props = {
  product: Product;
};

export const ProductBuyCard: React.FC<Props> = ({ product }) => {
  const dispatch: any = useDispatch();
  const cart = useSelector((state: RootState) => state.cartQuantities);
  const user = useSelector((state: RootState) => state.auth.user);

  const currentItem = cart.find(item => item.id === product.itemId);
  const quantity = currentItem ? currentItem.quantity : 1;

  const handleIncrement = async () => {
    if (quantity <= 9 && user?.id) {
      dispatch(quantityActions.incrementQuantity(product.itemId));
  
      try {
        await dispatch(updateCartQuantity(
          user.id.toString(),
          product.itemId,
          quantity + 1
        ));
      } catch (error) {
        console.error('Failed to update quantity', error);
      }
    }
  };
  
  const handleDecrement = async () => {
    if (quantity > 1 && user?.id) {
      dispatch(quantityActions.decrementQuantity(product.itemId));
  
      try {
        await dispatch(updateCartQuantity(
          user.id.toString(),
          product.itemId,
          quantity - 1
        ));
      } catch (error) {
        console.error('Failed to update quantity', error);
      }
    }
  };

  const handleDelete = async (productToDelete: Product, userId: number | undefined) => {
    if (!userId) {
      console.error('User ID is missing');
      return;
    }

    await dispatch(
      deleteItemFromCart(productToDelete.itemId, `${userId}`, productToDelete.itemId)
    )
  };

  return (
    <div className="productBuyCard">
      <div className="productBuyCard__top-byCard top-buyCard">
        <button
          className="top-buyCard__button-close"
          onClick={() => handleDelete(product, user?.id)}
        />

        <div className="top-buyCard__image">
          <img
            src={product.image}
            alt={product.name}
            className="top-buyCard__image--img"
          />
        </div>

        <p className="top-buyCard__name">{product.name}</p>
      </div>

      <div className="productBuyCard__bottom-buyCard bottom-buyCard">
        <div className="bottom-buyCard__count-products count-products">
          <button
            className="count-products__button"
            disabled={quantity <= 1}
            onClick={handleDecrement}
          >
            −
          </button>

          <span className="count-products__value">{quantity}</span>

          <button
            className="count-products__button"
            disabled={quantity === 9}
            onClick={handleIncrement}
          >
            +
          </button>
        </div>

        <p className="bottom-buyCard__price-product">{`$${product.price ? product.price * quantity : 0}`}</p>
      </div>
    </div>
  );
};
