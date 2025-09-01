type IncrementAction = { type: 'cartQuantities/INCREMENT'; payload: string };
type DecrementAction = { type: 'cartQuantities/DECREMENT'; payload: string };
type RemoveAction = { type: 'cartQuantities/REMOVE'; payload: string };
type SetNullAction = { type: 'cartQuantities/SETNULL' };
type SetQuantitiesAction = {
  type: 'cartQuantities/SET';
  payload: { id: string; quantity: number }[];
};

type CartAction =
  | IncrementAction
  | DecrementAction
  | RemoveAction
  | SetQuantitiesAction
  | SetNullAction;

const incrementQuantity = (id: string): IncrementAction => ({
  type: 'cartQuantities/INCREMENT',
  payload: id,
});

const decrementQuantity = (id: string): DecrementAction => ({
  type: 'cartQuantities/DECREMENT',
  payload: id,
});

const removeQuantity = (id: string): RemoveAction => ({
  type: 'cartQuantities/REMOVE',
  payload: id,
});

const setQuantities = (
  quantities: { id: string; quantity: number }[],
): SetQuantitiesAction => ({
  type: 'cartQuantities/SET',
  payload: quantities,
});

const setNullQuantity = (): SetNullAction => ({
  type: 'cartQuantities/SETNULL',
});

/* eslint-disable @typescript-eslint/default-param-last */
const cartQuantitiesReducer = (
  state: { id: string; quantity: number }[] = [],
  action: CartAction,
) => {
  /* eslint-disable @typescript-eslint/indent */
  switch (action.type) {
    case 'cartQuantities/INCREMENT':
      return state.some(item => item.id === action.payload)
        ? state.map(item =>
          item.id === action.payload
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        )
        : [...state, { id: action.payload, quantity: 2 }];

    case 'cartQuantities/DECREMENT':
      return state
        .map(item =>
          item.id === action.payload
            ? { ...item, quantity: item.quantity - 1 }
            : item,
        )
        .filter(item => item.quantity > 0);

    case 'cartQuantities/REMOVE':
      return state.filter(item => item.id !== action.payload);

    case 'cartQuantities/SET':
      return action.payload;
    
    case 'cartQuantities/SETNULL':
      return [];

    default:
      return state;
  }
};

export const actions = {
  incrementQuantity,
  decrementQuantity,
  removeQuantity,
  setQuantities,
  setNullQuantity
};

export default cartQuantitiesReducer;
