import React, { useEffect, useMemo, useState } from 'react';
import { Button, Form } from 'react-bootstrap'
import ContentEditable from 'react-contenteditable'
import { MAX_NOTE_DESCRIPTION_LENGTH, MAX_NOTE_TITLE_LENGTH } from '../../constants'
import { useListState } from '../../contexts'
import { isDescriptionValid, isTitleValid, removeHTMLTags } from '../../helpers'
import { Note, ViewMode } from '../../types'
import styles from './note-form.module.css'

export type NoteFormProp = {
  readonly viewMode: ViewMode
  readonly formTitle: string
  readonly note: Note
  readonly onCreate: (note: Note) => void
  readonly onEdit: (note: Note) => void
  readonly onCancel: () => void
}

export const NoteFormView: React.FC<NoteFormProp> = ({
  viewMode,
  formTitle,
  note,
  onCreate,
  onEdit,
  onCancel
}) => {
  const [formData, setFormData] = useState(note);

  const isNoteTitleValid = useMemo(() => isTitleValid(formData.title), [formData.title]);
  const isNoteDescriptionValid = useMemo(() => isDescriptionValid(formData.description), [formData.description]);
  const noteTitleCharDifference = useMemo(() => MAX_NOTE_TITLE_LENGTH - formData.title.length, [formData.title]);
  const noteDescriptionCharDifference = useMemo(() => MAX_NOTE_DESCRIPTION_LENGTH - formData.description.length, [formData.description]);
  const isFormDataValid = useMemo(() => {
    return removeHTMLTags(formData.title).length !== 0
      && isNoteTitleValid
      && removeHTMLTags(formData.description).length !== 0
      && isNoteDescriptionValid
  }, [formData])

  return (
    <>
      <h3 className={'mb-3'}>{formTitle}</h3>

      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Title <span className="text-danger">*</span></Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter note title"
            value={formData.title}
            onChange={(e) => setFormData({
              ...formData,
              title: e.target.value
            })}
          />
          <Form.Text className={'text-danger'}>
            {!isNoteTitleValid && `Field length: ${noteTitleCharDifference}`}
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Content <span className="text-danger">*</span></Form.Label>
          <ContentEditable
            className={`form-control ${styles.content}`}
            html={formData.description}
            onChange={(e) => setFormData({
              ...formData,
              description: e.target.value
            })}
            style={{
              minHeight: '150px'
            }}
          />
          <Form.Text className={'text-danger'}>
            {!isNoteDescriptionValid && `Field length: ${noteDescriptionCharDifference}`}
          </Form.Text>
        </Form.Group>

        {(viewMode === ViewMode.Create && <Button disabled={!isFormDataValid} onClick={() => onCreate(formData)}>Create</Button>)}

        {(viewMode === ViewMode.Edit && <Button disabled={!isFormDataValid} onClick={() => onEdit(formData)}>Save</Button>)}

        <Button
          variant={'outline-primary'}
          className={'mx-3'}
          onClick={onCancel}
        >
          Cancel
        </Button>
      </Form>
    </>
  )
}

export const NoteForm: React.FC<Pick<NoteFormProp, "note">> = ({ note }) => {
  const [state, actions] = useListState();
  const currentNote = note ? note : { title: '', description: ''} as Note

  const onCreate = (note: Note) => {
    actions.addNote(note.title, note.description)
  }

  const onEdit = (note: Note) => {
    actions.updateNote(note.id, note.title, note.description)
  }

  const onCancel = () => {
    actions.changeViewMode(ViewMode.Empty)
  }

  const formTitle = useMemo(() => {
    switch (state.viewMode){
      case ViewMode.Create:
        return 'Create new note'
      case ViewMode.Edit:
        return 'Edit note'
      default:
        return ''
    }
  }, [state.viewMode])

  return <NoteFormView
    viewMode={state.viewMode}
    formTitle={formTitle}
    note={currentNote}
    onCreate={onCreate}
    onEdit={onEdit}
    onCancel={onCancel}
  />
}
