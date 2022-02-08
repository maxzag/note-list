import React, { useEffect } from 'react';
import sanitizeHtml from 'sanitize-html';
import { sanitizeConfig } from '../../helpers'
import { Note } from '../../types'
import styles from './note-show.module.css'

export type NoteShowProp = {
  readonly note: Note
}

export const NoteShowView: React.FC<NoteShowProp> = ({ note }) => {
  return (
    <>
      <h2 className={'mb-4'}>{note.title}</h2>

      <div
        className={styles.content}
        dangerouslySetInnerHTML={{
        __html: sanitizeHtml(note.description, sanitizeConfig)
        }}
      />
    </>
  );
}


export const NoteShow = ({ note }: NoteShowProp) => {
  useEffect(() => {
    const links:NodeListOf<HTMLAnchorElement> = (document.querySelectorAll('a'));

    const listener = function (event:MouseEvent, link: HTMLAnchorElement) {
      event.preventDefault();
      const isSure = window.confirm('Are you sure you want to leave the page?');
      if(isSure){
        window.location.href = link.href;
      }
    };

    links.forEach((link) => {
      link.addEventListener('click', (e) => {
        listener(e, link);
      })
    })

    return () => {
      links.forEach((link) => {
        link.removeEventListener('click', (e) => {
          listener(e, link);
        })
      })
    }
  }, [note])

  return <NoteShowView note={note} />
}
