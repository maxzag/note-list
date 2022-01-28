import React, { createContext, useEffect, useMemo, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap'
import { getNoteList, storeNoteList } from '../../services'
import { NoteListItemProp, ViewMode } from '../../types'
import { EmptyState } from '../empty-state'
import { NoteForm } from '../note-form'
import { NoteList } from '../note-list'
import { NoteShow } from '../note-show'

export type NoteContextProp = {
  viewMode: ViewMode
  setViewMode: (c: ViewMode) => void
  noteList: NoteListItemProp[]
  setNoteList: (c: NoteListItemProp[]) => void
  showItem: number | null
  setShowItem: (c: number | null) => void
}
export const NoteContext = createContext<NoteContextProp>({
  viewMode: ViewMode.Empty,
  setViewMode: (c) => {},
  noteList: [] as NoteListItemProp[],
  setNoteList: (c) => {},
  showItem: null,
  setShowItem: (c) => {}
});

export function App() {
  const [isRender, setIsRender] = useState(false);
  const [viewMode, setViewMode] = useState(ViewMode.Empty);
  const [noteList, setNoteList] = useState([] as NoteListItemProp[]);
  const [showItem, setShowItem] = useState<number | null>(null);

  useEffect(() => {
    if (isRender) {
      storeNoteList(noteList);
    } else {
      setNoteList(getNoteList());
      setIsRender(true)
    }
  }, [noteList, isRender]);

  const currentNote = useMemo(() => noteList.filter(item => item.id === showItem)[0], [showItem])

  return (
    <NoteContext.Provider value={{
      viewMode,
      setViewMode,
      noteList,
      setNoteList,
      showItem,
      setShowItem
    }}>
      <Container className={'py-4'}>
        <Row className={'justify-content-between'}>
          <Col md={5}>
            {(viewMode === ViewMode.Empty && noteList.length === 0) &&
              <EmptyState />
            }

            {(viewMode === ViewMode.Create || viewMode === ViewMode.Edit) &&
              <NoteForm
                title={showItem !== null ? currentNote.title : ''}
                description={showItem !== null ? currentNote.description : ''}
              />
            }

            {(viewMode === ViewMode.Show && showItem != null) &&
              <NoteShow
                id={currentNote.id}
                title={currentNote.title}
                description={currentNote.description}
              />
            }
          </Col>

          <Col md={5}>
            <NoteList/>
          </Col>
        </Row>
      </Container>
    </NoteContext.Provider>
  );
}
