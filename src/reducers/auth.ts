import { AuthDispatcher, AuthEvent, AuthEventType, AuthState, User } from '../types'

const mockUsers: User[] = [{login: 'admin', password: 'qwerty'}];

export const authInitialState: AuthState = {
  isAuth: false,
  isError: false
}

export const authReducer = (
  state: AuthState,
  event: AuthEvent
): AuthState => {
  switch (event.type) {
    case AuthEventType.Login: {
      return {
        ...state,
        isAuth: true,
        login: event.login,
        password: event.password
      }
    }
    case AuthEventType.Logout: {
      return {
        ...state,
        isAuth: false,
        login: undefined,
        password: undefined
      }
    }
    case AuthEventType.LoginError: {
      return {
        ...state,
        isError: event.isError
      }
    }
  }
}

export const login = (dispatch: AuthDispatcher) => (login: string, password: string): void => {
  if(mockUsers.some((user) => user.login === login && user.password === password)){
    dispatch({
      type: AuthEventType.Login,
      login,
      password,
      isError: false
    })
  }else{
    dispatch({
      type: AuthEventType.LoginError,
      isError: true
    })
  }
}

export const removeError = (dispatch: AuthDispatcher) => (): void => dispatch({
  type: AuthEventType.LoginError,
  isError: false
})

export const logout = (dispatch: AuthDispatcher) => (): void =>
  dispatch({
    type: AuthEventType.Logout
  })
