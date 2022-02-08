export enum ViewMode {
  Empty,
  Create,
  Edit,
  Show
}

export type Note = {
  readonly id: number,
  readonly title: string;
  readonly description: string;
};

export enum NoteListEventType {
  ChangeViewMode = "ChangeViewMode",
  AddNote = "AddNote",
  RemoveNote = "RemoveNote",
  UpdateNote = "UpdateNote"
}

export type AddNoteEvent = {
  readonly type: NoteListEventType.AddNote;
  readonly title: string;
  readonly description: string;
};

export type RemoveNoteEvent = {
  readonly type: NoteListEventType.RemoveNote;
  readonly noteId: number;
};

export type ChangeViewModeEvent = {
  readonly type: NoteListEventType.ChangeViewMode
  readonly noteId?: number
  readonly viewMode: ViewMode
};

export type UpdateNoteEvent = {
  readonly type: NoteListEventType.UpdateNote;
  readonly noteId: number;
  readonly title: string;
  readonly description: string;
};

export type NoteListEvent =
  | ChangeViewModeEvent
  | AddNoteEvent
  | RemoveNoteEvent
  | UpdateNoteEvent;

export type NoteListState = {
  readonly notes: readonly Note[],
  readonly showNoteId: number | undefined,
  readonly viewMode: ViewMode
};

export type Dispatcher = (event: NoteListEvent) => void;
