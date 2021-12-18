import { NoteListItemProp } from '../types'

export function storeNoteList(noteList:NoteListItemProp[]):void {
  localStorage.setItem("noteList", JSON.stringify(noteList));
}
