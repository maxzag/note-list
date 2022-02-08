import React, { FC, useMemo } from 'react'
import { useListState } from '../../contexts'
import { Note, NoteListState, ViewMode } from '../../types'
import { EmptyState } from '../empty-state'
import { NoteForm } from '../note-form'
import { NoteShow } from '../note-show'

export type NoteSingleProp = {
  readonly currentNote: Note
} & Omit<NoteListState, "showNoteId">

export const NoteSingleView: FC<NoteSingleProp> = ({
  viewMode,
  notes,
  currentNote
}) => {
  return (
    <>
      {(viewMode === ViewMode.Empty && notes.length === 0) &&
        <EmptyState />
      }

      {(viewMode === ViewMode.Create || viewMode === ViewMode.Edit) &&
        <NoteForm note={currentNote} />
      }

      {(viewMode === ViewMode.Show && currentNote) &&
        <NoteShow
          note={currentNote}
        />
      }
    </>
  )
}

export const NoteSingle: React.FC = () => {
  const [state] = useListState();
  const currentNote = useMemo(() => state.notes.filter(item => item.id === state.showNoteId)[0], [state.showNoteId])

  return <NoteSingleView
    viewMode={state.viewMode}
    notes={state.notes}
    currentNote={currentNote}
  />
}
