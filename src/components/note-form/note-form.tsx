import { FC, useContext } from 'react';
import { Button, Form } from 'react-bootstrap'
import ContentEditable from 'react-contenteditable'
import { MAX_NOTE_DESCRIPTION_LENGTH, MAX_NOTE_TITLE_LENGTH } from '../../constants'
import { useNoteFormState } from '../../contexts/note-form'
import { NoteServiceContext } from '../../contexts/note-service'
import { Note } from '../../types'
import styles from './note-form.module.css'

export type NoteFormProp = {
  readonly formData: Note
  readonly isTitleValid: boolean
  readonly isDescriptionValid: boolean
  readonly isFormValid: boolean
  readonly onChangeTitle: (title: string) => void
  readonly onChangeDescription: (description: string) => void
  readonly onCancel: () => void
  readonly onSubmit: () => void
}

export const NoteFormView: FC<NoteFormProp> = ({
  formData,
  isTitleValid,
  isDescriptionValid,
  isFormValid,
  onChangeTitle,
  onChangeDescription,
  onCancel,
  onSubmit
}) => {
  const formTitle = formData.id === -1 ? 'Create new note' : 'Edit note';

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
            onChange={(e) => onChangeTitle(e.target.value)}
          />
          <Form.Text className={'text-danger'}>
            {!isTitleValid && `Field length: ${MAX_NOTE_TITLE_LENGTH - formData.title.length}`}
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Content <span className="text-danger">*</span></Form.Label>
          <ContentEditable
            className={`form-control ${styles.content}`}
            html={formData.description}
            onChange={(e) => onChangeDescription(e.target.value)}
            style={{
              minHeight: '150px'
            }}
          />
          <Form.Text className={'text-danger'}>
            {!isDescriptionValid && `Field length: ${MAX_NOTE_DESCRIPTION_LENGTH - formData.description.length}`}
          </Form.Text>
        </Form.Group>

        <Button disabled={!isFormValid} onClick={() => onSubmit()}>Submit</Button>

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

export const NoteForm: FC = () => {
  const [formState, formActions] = useNoteFormState();

  const { createNote, updateNote, formCancel } = useContext(NoteServiceContext);

  const updateTitle = (title: string) => formActions.changeTitle(title)

  const updateDescription = (description: string) => formActions.changeDescription(description)

  const onSubmit = () => {
    if (formState.note.id === -1) {
      createNote(formState)
    } else {
      updateNote(formState)
    }
  }

  return <NoteFormView
    onChangeTitle={updateTitle}
    onChangeDescription={updateDescription}
    formData={formState.note}
    isTitleValid={formState.isFormTitleValid}
    isDescriptionValid={formState.isFormDescriptionValid}
    isFormValid={formState.isFormValid}
    onCancel={formCancel}
    onSubmit={onSubmit}
  />
}
