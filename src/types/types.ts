export enum ViewMode {
  NoteList,
  Create,
  Edit,
  Show,
  Auth
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

export type User = {
  login: string,
  password: string
}

export enum AuthEventType {
  Login = "Login",
  LoginError = "LoginError",
  Logout = "Logout",
}

export type LoginEvent = {
  readonly type: AuthEventType.Login
  readonly login: string
  readonly password: string
  readonly isError: boolean
}

export type LogoutEvent = {
  readonly type: AuthEventType.Logout
}

export type LoginErrorEvent = {
  readonly type: AuthEventType.LoginError
  readonly isError: boolean
}

export type AuthEvent =
  | LoginEvent
  | LoginErrorEvent
  | LogoutEvent

export type AuthState = {
  readonly login?: string
  readonly password?: string
  readonly isAuth: boolean
  readonly isError: boolean
};

export type AuthDispatcher = (event: AuthEvent) => void;
