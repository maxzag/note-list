import { createContext, FC, useContext, useEffect, useReducer, useState } from 'react'
import { getNoteList, storeNoteList } from '../components/notes'
import { addNote, changeViewMode, initialState, noteListReducer, removeNote, updateNote } from '../reducers'
import { Dispatcher, NoteListState } from '../types'

export const NoteListContext = createContext<[NoteListState, Dispatcher]>([initialState, () => undefined]);

export const NoteListProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(noteListReducer, initialState, (state) => ({ ...state, notes: getNoteList() }))

  useEffect(() => storeNoteList([...state.notes]), [state.notes])

  return <NoteListContext.Provider value={[state, dispatch]}>{children}</NoteListContext.Provider>
}

export const useListState = () => {
  const [state, dispatch] = useContext(NoteListContext)
  const [actions] = useState(() => ({
    addNote: addNote(dispatch),
    removeNote: removeNote(dispatch),
    updateNote: updateNote(dispatch),
    changeViewMode: changeViewMode(dispatch)
  }))

  return [state, actions] as const;
}
