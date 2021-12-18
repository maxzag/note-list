import React, { useContext, useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap'
import { NoteListItemProp, ViewMode } from '../../types'
import { NoteContext } from '../app'

export function NoteForm({
  title,
  desc
}:NoteListItemProp) {
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
    setFormData({title, desc})
  }, [showItem])

  function onCreate(){
    if(formData.title.length
      && validateTitleLength()
      && formData.desc.length
    ) {
      setNoteList([...noteList, formData])
      setFormData({title: '', desc: ''})
    }
  }

  function onEdit(){
    if(formData.title.length
      && validateTitleLength()
      && formData.desc.length
      && showItem
    ) {
      setNoteList(noteList.map((
        item,
        index
      ) => (index === showItem) ? formData : item))
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
            onChange={(e) => setFormData({...formData, title: e.target.value})}
          />
          <Form.Text className={'text-danger'}>
            {!validateTitleLength() && `Field length: ${maxTitleLength - formData.title.length}`}
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Content</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder={'Enter note content'}
            value={formData.desc}
            onChange={(e) => setFormData({...formData, desc: e.target.value})}
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
