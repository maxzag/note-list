import { NoteListItemProp } from '../types'

export function getNoteList():NoteListItemProp[] {
  const data = localStorage.getItem("noteList");
  return data ? JSON.parse(data) : [];
}
