import React, { useEffect } from 'react';
import { Button } from 'react-bootstrap'
import sanitizeHtml from 'sanitize-html';
import { useViewModeState } from '../../contexts'
import { sanitizeConfig } from '../../helpers'
import { Note, ViewMode } from '../../types'
import { DefaultListItemProps } from '../note-list-item'
import styles from './note-show.module.css'

export type NoteShowProp = {
  readonly note: Note
  readonly onBack: () => void
}

export const NoteShowView: React.FC<NoteShowProp> = ({ note, onBack }) => {
  return (
    <>
      <div className={'mb-3'}>
        <Button
          variant={'outline-primary'}
          onClick={onBack}
        >
          Back
        </Button>
      </div>

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


export const NoteShow: React.FC<Pick<DefaultListItemProps, "note">> = ({ note }) => {
  const [, actions] = useViewModeState();
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

  return <NoteShowView
    note={note}
    onBack={() => actions.changeViewMode(ViewMode.NoteList)}
  />
}
