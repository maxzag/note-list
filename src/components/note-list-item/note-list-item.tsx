import React from 'react';
import { Button, Card } from 'react-bootstrap'
import sanitizeHtml from 'sanitize-html'
import { useListState, useViewModeState } from '../../contexts'
import { Note, ViewMode } from '../../types'

export type DefaultListItemProps = {
  readonly note: Note
  readonly isOpen: boolean
  readonly onDelete: (id: number) => void
  readonly onChangeViewMode: (id: number, viewMode: ViewMode) => void
}

export const NoteListItemView: React.FC<DefaultListItemProps> = ({
  note,
  isOpen,
  onChangeViewMode,
  onDelete

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
          <Button onClick={() => onChangeViewMode(ViewMode.Show, note.id)}>Open</Button>

          <div>
            <Button
              variant={'outline-primary'}
              className={'mx-3'}
              onClick={() => onChangeViewMode(ViewMode.Edit, note.id)}
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
        </div>
      </Card.Body>
    </Card>
  )
}

export const NoteListItem: React.FC<Pick<DefaultListItemProps, "note">> = ({ note }) => {
  const [state, actions] = useListState()
  const [_, viewModeActions] = useViewModeState()
  const isOpen = state.showNoteId === note.id

  const onChangeViewMode = (viewMode: ViewMode, id: number,) => {
    actions.setShowNoteId(id)
    viewModeActions.changeViewMode(viewMode)
  }

  return <NoteListItemView
    note={note}
    isOpen={isOpen}
    onDelete={actions.removeNote}
    onChangeViewMode={onChangeViewMode}
  />
}
