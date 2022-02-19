import React, { useCallback, useEffect, useState } from 'react';
import { Button, FormControl } from 'react-bootstrap'
import { useListState, useViewModeState } from '../../contexts'
import { Note, ViewMode } from '../../types'
import { NoteListItem } from '../note-list-item'

export type NoteListProp = {
  readonly notes: readonly Note[]
  readonly onChangeViewMode: (viewMode: ViewMode) => void
  readonly onFilter: (query: string) => void
}

export const NoteListView: React.FC<NoteListProp> = React.memo(({notes, onChangeViewMode, onFilter}) => {
  return (
    <>
      <div className={'d-flex justify-content-between mb-3'}>
        <h3 className={'mb-0'}>Note list</h3>

        <Button onClick={() => onChangeViewMode(ViewMode.Create)}>Create note</Button>
      </div>

      <div className={'mb-3'}>
        <FormControl
          placeholder={'Search'}
          type={'text'}
          onChange={(e) => onFilter(e.target.value)}
        />
      </div>

      {(notes.map((note) => (
        <NoteListItem
          key={note.id}
          note={note}
        />
      ))).reverse()}
    </>
  );
})

export const NoteList: React.FC = () => {
  const [state] = useListState();
  const [_, viewModeActions] = useViewModeState();
  const [notes, setNotes] = useState(state.notes);

  useEffect(() => {
    setNotes(state.notes)
  }, [state.notes])

  const onFilter = useCallback((query:string) => {
    setNotes(
      notes.filter((item) =>
        {
          return item.title.toLowerCase().includes(query)
            || item.description.toLowerCase().includes(query)
        }
      )
    )
  }, [notes])

  return <NoteListView
    onChangeViewMode={viewModeActions.changeViewMode}
    notes={notes}
    onFilter={onFilter}
  />
}
