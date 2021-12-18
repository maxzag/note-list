import React from 'react';
import { NoteListItemProp } from '../../types'

export function NoteShow({
  title,
  desc
}:NoteListItemProp) {
  return (
    <>
      <h2 className={'mb-3'}>{title}</h2>

      <div>
        {desc}
      </div>
    </>
  );
}
