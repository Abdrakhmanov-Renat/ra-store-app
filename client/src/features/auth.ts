type User = { id: number; name: string; email: string };
type LoginAction = { type: 'auth/LOGIN'; payload: User };
type LogoutAction = { type: 'auth/LOGOUT' };
type AuthCheckedAction = { type: 'auth/SET_AUTH_CHECKED'; payload: boolean };
type Action = LoginAction | LogoutAction | AuthCheckedAction;

const login = (user: User): LoginAction => ({
  type: 'auth/LOGIN',
  payload: user,
});

const logout = (): LogoutAction => ({
  type: 'auth/LOGOUT',
});

const setAuthChecked = (value: boolean): AuthCheckedAction => ({
  type: 'auth/SET_AUTH_CHECKED',
  payload: value,
});

type AuthState = {
  isAuthenticated: boolean;
  user: User | null;
  isAuthChecked: boolean;
};

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  isAuthChecked: false,
};

/* eslint-disable @typescript-eslint/default-param-last */
const authReducer = (state: AuthState = initialState, action: Action): AuthState => {
  switch (action.type) {
    case 'auth/LOGIN':
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
      };
    case 'auth/LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    case 'auth/SET_AUTH_CHECKED':
      return {
        ...state,
        isAuthChecked: action.payload,
      };
    default:
      return state;
  }
};

export const actions = { login, logout, setAuthChecked };
export { initialState };
export default authReducer;
