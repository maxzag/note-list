import React, { useContext, useEffect, useMemo, useState } from 'react';
import { Button, Form } from 'react-bootstrap'
import ContentEditable from 'react-contenteditable'
import { MAX_NOTE_DESCRIPTION_LENGTH, MAX_NOTE_TITLE_LENGTH } from '../../constants'
import { isDescriptionValid, isTitleValid, removeHTMLTags } from '../../helpers'
import { ViewMode } from '../../types'
import { NoteContext } from '../app'
import styles from './note-form.module.css'

export type NoteFormProp = {
  title: string;
  description: string;
}

export function NoteForm({
  title,
  description
}:NoteFormProp) {
  const {
    showItem,
    setShowItem,
    viewMode,
    setViewMode,
    noteList,
    setNoteList
  } = useContext(NoteContext);
  const [formData, setFormData] = useState({title, description});
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

  useEffect(() => {
    setFormData({
      title,
      description
    })
  }, [title, description])

  function onCreate(){
    setNoteList([...noteList, {id: new Date().getTime(), ...formData}])
    setFormData({title: '', description: ''})
  }

  function onEdit(){
    if (showItem !== null) {
      setNoteList(noteList.map((
        item
      ) => (item.id === showItem) ? {
        ...item,
        title: formData.title,
        desc: formData.description
      } : item));
      setViewMode(ViewMode.Show);
    }
  }

  function onCancel(){
    setViewMode(ViewMode.Empty)
    setShowItem(null)
  }

  function getFormTitle():string {
    switch (viewMode){
      case ViewMode.Create:
        return 'Create new note'
      case ViewMode.Edit:
        return 'Edit note'
      default:
        return ''
    }
  }

  return (
    <>
      <h3 className={'mb-3'}>
        {getFormTitle()}
      </h3>

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

        {(viewMode === ViewMode.Create && <Button disabled={!isFormDataValid} onClick={onCreate}>Create</Button>)}

        {(viewMode === ViewMode.Edit && <Button disabled={!isFormDataValid} onClick={onEdit}>Save</Button>)}

        <Button
          variant={'outline-primary'}
          className={'mx-3'}
          onClick={onCancel}
        >
          Cancel
        </Button>
      </Form>
    </>
  );
}
