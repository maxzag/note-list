import React, { useContext } from 'react';
import { Button } from 'react-bootstrap'
import { ViewMode } from '../../types'
import { NoteContext } from '../app'
import { NoteListItem } from '../note-list-item'

export function NoteList() {
  const {
    viewMode,
    setViewMode,
    noteList,
    setNoteList,
    showItem,
    setShowItem
  } = useContext(NoteContext);

  function onShow(id:number | null) {
    setShowItem(id);
    setViewMode(ViewMode.Show);
  }

  function onEdit(id:number | null) {
    setShowItem(id);
    setViewMode(ViewMode.Edit);
  }

  function onDelete(id:number) {
    if (viewMode === ViewMode.Show || viewMode === ViewMode.Edit) {
      setViewMode(ViewMode.Empty);
      setShowItem(null);
    }
    setNoteList(noteList.filter((item, index) => index != id))
  }

  return (
    <>
      <div className={'d-flex justify-content-between mb-3'}>
        <h3 className={'mb-0'}>Note list</h3>

        <Button onClick={() => setViewMode(ViewMode.Create)}>Create note</Button>
      </div>

      {(noteList.map((noteItem, index) => (
        <NoteListItem
          isOpen={index === showItem}
          key={index}
          id={index}
          title={noteItem.title}
          desc={noteItem.desc}
          onDelete={onDelete}
          onShow={onShow}
          onEdit={onEdit}
        />
      )))}
    </>
  );
}
