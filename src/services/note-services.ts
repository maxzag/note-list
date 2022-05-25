import {
  CreateNoteService,
  Note,
  NoteFormActions,
  NoteFormState,
  NoteListActions,
  ViewMode,
  ViewModeActions
} from '../types'

export const createNoteService = (
  viewModeActions: ViewModeActions,
  noteFormActions: NoteFormActions,
  noteListActions: NoteListActions
): CreateNoteService => {
  const createNote = ({ note }: NoteFormState) => {
    noteListActions.addNote(note.title, note.description)
    viewModeActions.changeViewMode(ViewMode.NoteList)
    noteFormActions.resetForm()
  }

  const updateNote = ({ note }: NoteFormState) => {
    noteListActions.updateNote(
      note.id,
      note.title,
      note.description
    )
    viewModeActions.changeViewMode(ViewMode.NoteList)
    noteFormActions.resetForm()
  }

  const formCancel = () => {
    viewModeActions.changeViewMode(ViewMode.NoteList)
    noteFormActions.resetForm()
  }

  const editNote = (note: Note) => {
    noteFormActions.setupForm(note)
    viewModeActions.changeViewMode(ViewMode.Edit)
  }

  const openNote = (id: number) => {
    noteListActions.setShowNoteId(id)
    viewModeActions.changeViewMode(ViewMode.Show)
  }

  return {
    createNote,
    updateNote,
    formCancel,
    editNote,
    openNote
  }
}
