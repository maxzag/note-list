export interface NoteListItemProp {
  id: number,
  title: string;
  description: string;
}

export enum ViewMode {
  Empty,
  Create,
  Edit,
  Show
}
