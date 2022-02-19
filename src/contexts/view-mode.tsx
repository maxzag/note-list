import { createContext, FC, useContext, useReducer, useState } from 'react'
import {
  changeViewMode,
  viewModeInitialState, viewModeReducer
} from '../reducers'
import { ViewMode, ViewModeDispatcher, ViewModeState } from '../types'

export const ViewModeContext = createContext<[ViewModeState, ViewModeDispatcher]>([viewModeInitialState, () => undefined]);

export const ViewModeProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(viewModeReducer, viewModeInitialState, (state) => ({ ...state, viewMode: ViewMode.NoteList }))

  return <ViewModeContext.Provider value={[state, dispatch]}>{children}</ViewModeContext.Provider>
}

export const useViewModeState = () => {
  const [state, dispatch] = useContext(ViewModeContext)
  const [actions] = useState(() => ({
    changeViewMode: changeViewMode(dispatch)
  }))

  return [state, actions] as const;
}
