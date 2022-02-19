import { NoteListDispatcher, Note, NoteListEvent, NoteListEventType, NoteListState } from '../types'

export const noteListInitialState: NoteListState = {
  notes: [] as Note[],
  showNoteId: undefined,
};

export const noteListReducer = (
  state: NoteListState,
  event: NoteListEvent
): NoteListState => {
  switch (event.type) {
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
        ]
      };
    }

    case NoteListEventType.RemoveNote: {
      return {
        ...state,
        notes: state.notes.filter((note) => note.id !== event.noteId),
        showNoteId: event.noteId === state.showNoteId ? undefined : state.showNoteId,
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
        )
      };
    }

    case NoteListEventType.SetShowNoteId: {
      return {
        ...state,
        showNoteId: event.noteId
      }
    }
  }
};

export const addNote = (dispatch: NoteListDispatcher) => (title: string, description: string): void =>
  dispatch({
    type: NoteListEventType.AddNote,
    title,
    description
  });

export const removeNote = (dispatch: NoteListDispatcher) => (noteId: number): void =>
  dispatch({
    type: NoteListEventType.RemoveNote,
    noteId
  });

export const updateNote = (dispatch: NoteListDispatcher) => (
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

export const setShowNoteId = (dispatch: NoteListDispatcher) => (
  noteId: number
): void =>
  dispatch({
    type: NoteListEventType.SetShowNoteId,
    noteId
  });
