import React from 'react';
import { Button, Card } from 'react-bootstrap'
import { NoteListItemProp } from '../../types'

interface Prop extends NoteListItemProp{
  id: number,
  onDelete: (id:number) => void
  onShow: (id:number) => void
  onEdit: (id:number) => void
  isOpen: boolean
}

export function NoteListItem({
  id,
  title,
  desc,
  onDelete,
  onShow,
  onEdit,
  isOpen = false
}:Prop) {
  const NowrapText:React.CSSProperties = {
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
  }

  return (
    <Card className={`mb-3 ${isOpen && 'border-dark'}`}>
      <Card.Body>
        <h5 className={'mb-2'} style={NowrapText}>{title}</h5>

        <p style={NowrapText}>{desc}</p>

        <div className={'d-flex justify-content-between'}>
          <Button onClick={() => onShow(id)}>Open</Button>

          <div>
            <Button
              variant={'outline-primary'}
              className={'mx-3'}
              onClick={() => onEdit(id)}
            >
              Edit
            </Button>

            <Button
              variant={'danger'}
              onClick={(e) => onDelete(id)}
            >
              Delete
            </Button>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}
