import React, { FC, useMemo } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useListState, useViewModeState } from '../../contexts'
import { Note, NoteListState, ViewMode } from '../../types'
import { NoteForm } from '../note-form'
import { NoteList } from '../note-list'
import { NoteShow } from '../note-show'

export type NotesProp = {
  readonly currentNote: Note
  readonly viewMode: ViewMode
} & Omit<NoteListState, "showNoteId">

export const NotesView: FC<NotesProp> = ({
  viewMode,
  currentNote
}) => {
  return (
    <Container className={'py-4'}>
      <Row className={'justify-content-center'}>
        <Col md={6}>
          {(viewMode === ViewMode.NoteList) &&
            <NoteList/>
          }

          {(viewMode === ViewMode.Create || viewMode === ViewMode.Edit) &&
            <NoteForm note={currentNote} />
          }

          {(viewMode === ViewMode.Show && currentNote) &&
            <NoteShow
              note={currentNote}
            />
          }
        </Col>
      </Row>
    </Container>
  );
};

export const Notes = () => {
  const [state] = useListState();
  const [viewModeState] = useViewModeState();
  const currentNote = useMemo(() => state.notes.filter(item => item.id === state.showNoteId)[0], [state.showNoteId, state.notes])

  return (
    <NotesView
      viewMode={viewModeState.viewMode}
      notes={state.notes}
      currentNote={currentNote}
    />
  )
}
