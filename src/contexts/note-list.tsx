import { createContext, FC, useContext, useEffect, useReducer, useState } from 'react'
import { addNote, noteListInitialState, noteListReducer, removeNote, setShowNoteId, updateNote } from '../reducers'
import { NoteListDispatcher, Note, NoteListState } from '../types'

export const NoteListContext = createContext<[NoteListState, NoteListDispatcher]>([noteListInitialState, () => undefined]);

export const NoteListProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(noteListReducer, noteListInitialState, (state) => ({ ...state, notes: getNoteList() }))

  useEffect(() => storeNoteList([...state.notes]), [state.notes])

  return <NoteListContext.Provider value={[state, dispatch]}>{children}</NoteListContext.Provider>
}

export const useListState = () => {
  const [state, dispatch] = useContext(NoteListContext)
  const [actions] = useState(() => ({
    addNote: addNote(dispatch),
    removeNote: removeNote(dispatch),
    updateNote: updateNote(dispatch),
    setShowNoteId: setShowNoteId(dispatch)
  }))

  return [state, actions] as const;
}

export function getNoteList():Note[] {
  const data = localStorage.getItem("noteList");
  return data ? JSON.parse(data) : [];
}

export function storeNoteList(noteList:Note[]):void {
  localStorage.setItem("noteList", JSON.stringify(noteList));
}
