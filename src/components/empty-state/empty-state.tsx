import React, { useContext } from 'react';
import { Button } from 'react-bootstrap'
import { ViewMode } from '../../types'
import { NoteContext } from '../app'

export function EmptyState() {
  const {
    setViewMode
  } = useContext(NoteContext);

  return (
    <>
      <h2>Your note list is empty =(</h2>

      <p>Start add your note.</p>

      <Button onClick={() => setViewMode(ViewMode.Create)}>Create note</Button>
    </>
  );
}
