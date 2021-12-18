export interface NoteListItemProp {
  id: number,
  title: string;
  desc: string;
}

export enum ViewMode {
  Empty,
  Create,
  Edit,
  Show
}
