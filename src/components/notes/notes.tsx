import React, { FC, useMemo } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import { useAuthState, useListState, useViewModeState } from '../../contexts'
import { Note, ViewMode } from '../../types'
import { Auth } from '../auth'
import { NoteForm } from '../note-form'
import { NoteList } from '../note-list'
import { NoteShow } from '../note-show'

export type NotesProp = {
  readonly currentNote: Note
  readonly viewMode: ViewMode
  readonly isAuth: boolean
  readonly onLogin: () => void
  readonly onLogout: () => void
}

export const NotesView: FC<NotesProp> = ({
  viewMode,
  currentNote,
  isAuth,
  onLogout,
  onLogin
}) => {
  return (
    <Container className={'py-4'}>
      <div className="d-flex justify-content-between align-items-center mb-5">
        <div><h2>Logo</h2></div>

        <div>
          {isAuth
            ? <Button onClick={onLogout}>Logout</Button>
            : <Button onClick={onLogin}>Login</Button>
          }
        </div>
      </div>

      <Row className={'justify-content-center'}>
        <Col md={6}>
          <NotesInnerContent
            currentNote={currentNote}
            isAuth={isAuth}
            viewMode={viewMode}
          />
        </Col>
      </Row>
    </Container>
  );
};

export const NotesInnerContent: FC<Omit<NotesProp, "onLogin" | "onLogout">> = ({
   viewMode,
   currentNote,
   isAuth
}) => {
  switch (viewMode) {
    case ViewMode.Auth:
      return <Auth/>
    case ViewMode.Create:
      return <NoteForm note={currentNote} />
    case ViewMode.Edit:
      return <NoteForm note={currentNote} />
    case ViewMode.Show:
      return <NoteShow note={currentNote} />
    case ViewMode.NoteList:
       return <NoteList isAuth={isAuth}/>
    default:
      return null;
  }
}

export const Notes = () => {
  const [state] = useListState();
  const [viewModeState, viewModeAction] = useViewModeState();
  const [{isAuth}, authActions] = useAuthState();
  const currentNote = useMemo(() => state.notes.filter(item => item.id === state.showNoteId)[0], [state.showNoteId, state.notes])

  return (
    <NotesView
      viewMode={viewModeState.viewMode}
      currentNote={currentNote}
      isAuth={isAuth}
      onLogin={() => viewModeAction.changeViewMode(ViewMode.Auth)}
      onLogout={() => authActions.logout()}
    />
  )
}
