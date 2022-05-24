import { createContext, FC, useContext, useReducer, useState } from 'react'
import {
  changeDescription,
  changeTitle,
  noteFormInitialState,
  noteFormReducer, resetForm,
  setupForm
} from '../reducers/note-form'
import { NoteFormDispatcher, NoteFormState } from '../types'

export const NoteFormContext = createContext<[NoteFormState, NoteFormDispatcher]>([noteFormInitialState, () => undefined])

export const NoteFormProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(noteFormReducer, noteFormInitialState)

  return <NoteFormContext.Provider value={[state, dispatch]}>{children}</NoteFormContext.Provider>
}

export const useNoteFormState = () => {
  const [state, dispatch] = useContext(NoteFormContext)
  const [actions] = useState(() => ({
    setupForm: setupForm(dispatch),
    changeTitle: changeTitle(dispatch),
    changeDescription: changeDescription(dispatch),
    resetForm: resetForm(dispatch)
  }))

  return [state, actions] as const;
}
