import React, { useContext, useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap'
import ContentEditable from 'react-contenteditable'
import { ViewMode } from '../../types'
import { NoteContext } from '../app'
import styles from './note-form.module.css'

export type NoteFormProp = {
  title: string;
  desc: string;
}

export function NoteForm({
  title,
  desc
}:NoteFormProp) {
  const maxTitleLength = 20;
  const {
    showItem,
    setShowItem,
    viewMode,
    setViewMode,
    noteList,
    setNoteList
  } = useContext(NoteContext);
  const [formData, setFormData] = useState({title, desc});
  const validateTitleLength = ():boolean => formData.title.length <= maxTitleLength

  useEffect(() => {
    setFormData({
      title: title,
      desc: desc
    })
  }, [title, desc])

  function onCreate(){
    if(formData.title.length
      && validateTitleLength()
      && formData.desc.length
    ) {
      setNoteList([...noteList, {id: new Date().getTime(), ...formData}])
      setFormData({title: '', desc: ''})
    }
  }

  function onEdit(){
    if (formData.title.length
      && validateTitleLength()
      && formData.desc.length
      && showItem !== null
    ) {
      setNoteList(noteList.map((
        item
      ) => (item.id === showItem) ? {
        ...item,
        title: formData.title,
        desc: formData.desc
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
          <Form.Label>Title</Form.Label>
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
            {!validateTitleLength() && `Field length: ${maxTitleLength - formData.title.length}`}
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Content</Form.Label>
          <ContentEditable
            className={`form-control ${styles.content}`}
            html={formData.desc}
            onChange={(e) => setFormData({
              ...formData,
              desc: e.target.value
            })}
            style={{
              minHeight: '150px'
            }}
          />
        </Form.Group>

        {(viewMode === ViewMode.Create && <Button onClick={() => onCreate()}>Create</Button>)}

        {(viewMode === ViewMode.Edit && <Button onClick={() => onEdit()}>Save</Button>)}

        <Button
          variant={'outline-primary'}
          className={'mx-3'}
          onClick={() => onCancel()}
        >
          Cancel
        </Button>
      </Form>
    </>
  );
}
