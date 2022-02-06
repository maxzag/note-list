import { createContext, useContext, useState } from 'react'
import { addNote, changeViewMode, initialState, removeNote, updateNote } from '../reducers'
import { Dispatcher, NoteListState } from '../types'

export const NoteListContext = createContext<[NoteListState, Dispatcher]>([initialState, () => undefined]);

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
