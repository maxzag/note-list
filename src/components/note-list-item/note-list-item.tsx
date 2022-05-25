import React, { useContext } from 'react';
import { Button, Card } from 'react-bootstrap'
import sanitizeHtml from 'sanitize-html'
import { useListState } from '../../contexts'
import { NoteServiceContext } from '../../contexts/note-service'
import { Note } from '../../types'

export type DefaultListItemProps = {
  readonly note: Note
  readonly isOpen: boolean
  readonly onOpen: (id: number) => void
  readonly onEdit: (note: Note) => void
  readonly onDelete: (id: number) => void
  readonly isAuth: boolean
}

export const NoteListItemView: React.FC<DefaultListItemProps> = ({
  note,
  isOpen,
  onOpen,
  onEdit,
  onDelete,
  isAuth
}) => {
  const NowrapText:React.CSSProperties = {
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    marginBottom: 24
  }

  return (
    <Card className={`mb-3 ${isOpen && 'border-dark'}`}>
      <Card.Body>
        <h5 className={'mb-2'} style={NowrapText}>{note.title}</h5>

        <div
          style={NowrapText}
          dangerouslySetInnerHTML={{
            __html: sanitizeHtml(note.description, {
              allowedTags: [],
            })
          }} />

        <div className={'d-flex justify-content-between'}>
          <Button onClick={() => onOpen(note.id)}>Open</Button>

          {isAuth && (
            <div>
              <Button
                variant={'outline-primary'}
                className={'mx-3'}
                onClick={() => onEdit(note)}
              >
                Edit
              </Button>

              <Button
                variant={'danger'}
                onClick={() => onDelete(note.id)}
              >
                Delete
              </Button>
            </div>
          )}
        </div>
      </Card.Body>
    </Card>
  )
}

export const NoteListItem: React.FC<Pick<DefaultListItemProps, "note" | "isAuth">> = ({ note, isAuth }) => {
  const [state, actions] = useListState()
  const isOpen = state.showNoteId === note.id
  const { editNote, openNote } = useContext(NoteServiceContext)

  return <NoteListItemView
    note={note}
    isOpen={isOpen}
    onDelete={actions.removeNote}
    onEdit={editNote}
    onOpen={openNote}
    isAuth={isAuth}
  />
}
