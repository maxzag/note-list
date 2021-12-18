import React, { useContext, useEffect, useState } from 'react';
import { Button, FormControl } from 'react-bootstrap'
import { NoteListItemProp, ViewMode } from '../../types'
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
  const [filteredList, setFilteredList] = useState([] as NoteListItemProp[]);

  useEffect(() => {
    setFilteredList(noteList)
  }, [noteList])

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
    setNoteList(noteList.filter((item) => item.id !== id))
  }

  function onFilter(query:string) {
    setFilteredList(
      noteList.filter((item) =>
        item.title.toLowerCase().includes(query)
        || item.desc.toLowerCase().includes(query)
      )
    );
  }

  function setCreateMode(){
    setShowItem(null);
    setViewMode(ViewMode.Create);
  }

  return (
    <>
      <div className={'d-flex justify-content-between mb-3'}>
        <h3 className={'mb-0'}>Note list</h3>

        <Button onClick={() => setCreateMode()}>Create note</Button>
      </div>

      <div className={'mb-3'}>
        <FormControl
          placeholder={'Search'}
          type={'text'}
          onChange={(e) => onFilter(e.target.value.toLowerCase())}
        />
      </div>

      {(filteredList.map((noteItem, index) => (
        <NoteListItem
          isOpen={noteItem.id === showItem}
          key={noteItem.id}
          id={noteItem.id}
          title={noteItem.title}
          desc={noteItem.desc}
          onDelete={onDelete}
          onShow={onShow}
          onEdit={onEdit}
        />
      ))).reverse()}
    </>
  );
}
