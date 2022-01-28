import React, { useContext, useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap'
import ContentEditable from 'react-contenteditable'
import { removeHTMLTags } from '../../helpers'
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
  const maxDescLength = 1000;
  const {
    showItem,
    setShowItem,
    viewMode,
    setViewMode,
    noteList,
    setNoteList
  } = useContext(NoteContext);
  const [formData, setFormData] = useState({title, desc});
  const [isFormDataValid, setFormDataValid] = useState(false);
  const isTitleLengthValid = ():boolean => formData.title.length <= maxTitleLength
  const isDescLengthValid = ():boolean => formData.desc.length <= maxDescLength

  useEffect(() => {
    setFormData({
      title: title,
      desc: desc
    })
  }, [title, desc])

  useEffect(() => {
    if(removeHTMLTags(formData.title).length != 0
      && isTitleLengthValid()
      && removeHTMLTags(formData.desc).length != 0
      && isDescLengthValid()
    ) {
      setFormDataValid(true)
    }else{
      setFormDataValid(false)
    }
  }, [formData])



  function onCreate(){
    setNoteList([...noteList, {id: new Date().getTime(), ...formData}])
    setFormData({title: '', desc: ''})
  }

  function onEdit(){
    if (showItem !== null) {
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
            {!isTitleLengthValid() && `Field length: ${maxTitleLength - formData.title.length}`}
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Content <span className="text-danger">*</span></Form.Label>
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
          <Form.Text className={'text-danger'}>
            {!isDescLengthValid() && `Field length: ${maxDescLength - formData.desc.length}`}
          </Form.Text>
        </Form.Group>

        {(viewMode === ViewMode.Create && <Button disabled={!isFormDataValid} onClick={() => onCreate()}>Create</Button>)}

        {(viewMode === ViewMode.Edit && <Button disabled={!isFormDataValid} onClick={() => onEdit()}>Save</Button>)}

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
