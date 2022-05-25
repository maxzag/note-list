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

export type ViewModeActions = {
  readonly changeViewMode: (viewMode: ViewMode) => void
}

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

export type NoteListActions = {
  readonly addNote: (title: string, description: string) => void,
  readonly removeNote: (noteId: number) => void,
  readonly updateNote: (noteId: number, title: string, description: string) => void,
  readonly setShowNoteId: (noteId: number) => void
}

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

export enum NoteFormEventType {
  SetupForm = "SetupForm",
  ChangeTitle = "ChangeTitle",
  ChangeDescription = "ChangeContent",
  ResetForm = "ResetForm"
}

export type SetupFormEvent = {
  readonly type: NoteFormEventType.SetupForm
  readonly note: Note
}

export type ChangeTitleEvent = {
  readonly type: NoteFormEventType.ChangeTitle
  readonly title: string
}

export type ChangeDescriptionEvent = {
  readonly type: NoteFormEventType.ChangeDescription
  readonly description: string
}

export type ResetFormEvent = {
  readonly type: NoteFormEventType.ResetForm
}

export type NoteFormEvent =
  | SetupFormEvent
  | ChangeTitleEvent
  | ChangeDescriptionEvent
  | ResetFormEvent

export type NoteFormState = {
  readonly note: Note
  readonly isFormTitleValid: boolean,
  readonly isFormDescriptionValid: boolean
  readonly isFormValid: boolean
}

export type NoteFormDispatcher = (event: NoteFormEvent) => void;

export type NoteFormActions = {
  readonly setupForm: (note: Note) => void,
  readonly changeTitle: (title: string) => void,
  readonly changeDescription: (description: string) => void,
  readonly resetForm: () => void
}

export type CreateNoteService = {
  readonly createNote: (payload: NoteFormState) => void
  readonly updateNote: (payload: NoteFormState) => void
  readonly formCancel: () => void
  readonly editNote: (note: Note) => void
  readonly openNote: (id: number) => void
}
