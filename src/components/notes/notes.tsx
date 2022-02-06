import { FC, useEffect, useReducer } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { NoteListContext } from '../../contexts'
import { initialState, noteListReducer } from '../../reducers'
import { Note } from '../../types'
import { NoteList } from '../note-list'
import { NoteSingle } from '../note-single'

export const NotesView = () => {
  return (
    <Container className={'py-4'}>
      <Row className={'justify-content-between'}>
        <Col md={5}>
          <NoteSingle/>
        </Col>

        <Col md={5}>
          <NoteList/>
        </Col>
      </Row>
    </Container>
  );
};

export const NoteListProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(noteListReducer, initialState, (state) => ({ ...state, notes: getNoteList() }))

  useEffect(() => storeNoteList([...state.notes]), [state.notes])

  return <NoteListContext.Provider value={[state, dispatch]}>{children}</NoteListContext.Provider>
}

export const Notes = () => {
  return (
    <NoteListProvider>
      <NotesView/>
    </NoteListProvider>
  )
}

export function getNoteList():Note[] {
  const data = localStorage.getItem("noteList");
  return data ? JSON.parse(data) : [];
}

export function storeNoteList(noteList:Note[]):void {
  localStorage.setItem("noteList", JSON.stringify(noteList));
}
