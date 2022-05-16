export enum ViewMode {
  NoteList,
  Create,
  Edit,
  Show
}

export enum ViewModeEventType {
  ChangeViewMode = "ChangeViewMode",
}

export type ViewModeEvent =
  | ChangeViewModeEvent

export type ViewModeState = {
  readonly viewMode: ViewMode
}

export type ViewModeDispatcher = (event: ViewModeEvent) => void;

export type ChangeViewModeEvent = {
  readonly type: ViewModeEventType.ChangeViewMode
  readonly viewMode: ViewMode
};

export type Note = {
  readonly id: number,
  readonly title: string;
  readonly description: string;
};

export enum NoteListEventType {
  AddNote = "AddNote",
  RemoveNote = "RemoveNote",
  UpdateNote = "UpdateNote",
  SetShowNoteId = "SetShowNoteId"
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

export type UpdateNoteEvent = {
  readonly type: NoteListEventType.UpdateNote;
  readonly noteId: number;
  readonly title: string;
  readonly description: string;
};

export type SetShowNoteIdEvent = {
  readonly type: NoteListEventType.SetShowNoteId;
  readonly noteId: number,
}

export type NoteListEvent =
  | AddNoteEvent
  | RemoveNoteEvent
  | UpdateNoteEvent
  | SetShowNoteIdEvent;

export type NoteListState = {
  readonly notes: readonly Note[],
  readonly showNoteId: number | undefined,
};

export type NoteListDispatcher = (event: NoteListEvent) => void;
