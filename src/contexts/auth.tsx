import { createContext, FC, useContext, useEffect, useReducer, useState } from 'react'
import { authInitialState, authReducer, login, logout, removeError } from '../reducers'
import { AuthDispatcher, AuthState } from '../types'

export const AuthContext = createContext<[AuthState, AuthDispatcher]>([authInitialState, () => undefined]);

export const AuthProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, authInitialState, (state) => ({ ...state, isAuth: getAuth() }))

  useEffect(() => storeAuth(state.isAuth), [state.isAuth])

  return <AuthContext.Provider value={[state, dispatch]}>{children}</AuthContext.Provider>
}

export const useAuthState = () => {
  const [state, dispatch] = useContext(AuthContext)
  const [actions] = useState(() => ({
    login: login(dispatch),
    logout: logout(dispatch),
    removeError: removeError(dispatch)
  }))

  return [state, actions] as const;
}

export function getAuth():boolean {
  const data = localStorage.getItem("auth");
  return data ? JSON.parse(data) : false;
}

export function storeAuth(isAuth:boolean):void {
  localStorage.setItem("auth", JSON.stringify(isAuth));
}
