import { Dispatcher, Note, NoteListEvent, NoteListEventType, NoteListState, ViewMode } from '../types'

export const initialState: NoteListState = {
  notes: [] as Note[],
  showNoteId: undefined,
  viewMode: ViewMode.Empty
};

export const noteListReducer = (
  state: NoteListState,
  event: NoteListEvent
): NoteListState => {
  switch (event.type) {
    case NoteListEventType.ChangeViewMode: {
      return {
        ...state,
        viewMode: event.viewMode,
        showNoteId: event.noteId
      }
    }

    case NoteListEventType.AddNote: {
      return {
        ...state,
        notes: [
          ...state.notes,
          {
            id: new Date().getTime(),
            title: event.title,
            description: event.description
          }
        ],
        viewMode: ViewMode.Empty
      };
    }

    case NoteListEventType.RemoveNote: {
      return {
        ...state,
        notes: state.notes.filter((note) => note.id !== event.noteId),
        showNoteId: event.noteId === state.showNoteId ? undefined : state.showNoteId,
        viewMode: event.noteId === state.showNoteId ? ViewMode.Empty : state.viewMode,
      };
    }

    case NoteListEventType.UpdateNote: {
      return {
        ...state,
        showNoteId: undefined,
        notes: state.notes.map((note) =>
          note.id === event.noteId
            ? { ...note, title: event.title, description: event.description }
            : note
        ),
        viewMode: ViewMode.Empty
      };
    }
  }
};

export const changeViewMode = (dispatch: Dispatcher) => (viewMode: ViewMode, noteId?: number): void =>
  dispatch({
    type: NoteListEventType.ChangeViewMode,
    noteId,
    viewMode
  });

export const addNote = (dispatch: Dispatcher) => (title: string, description: string): void =>
  dispatch({
    type: NoteListEventType.AddNote,
    title,
    description
  });

export const removeNote = (dispatch: Dispatcher) => (noteId: number): void =>
  dispatch({
    type: NoteListEventType.RemoveNote,
    noteId
  });

export const updateNote = (dispatch: Dispatcher) => (
  noteId: number,
  title: string,
  description: string
): void =>
  dispatch({
    type: NoteListEventType.UpdateNote,
    noteId,
    title,
    description
  });
