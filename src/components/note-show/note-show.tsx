import React, { useEffect } from 'react';
import sanitizeHtml from 'sanitize-html';
import { sanitizeConfig } from '../../helpers'
import { NoteListItemProp } from '../../types'
import styles from './note-show.module.css'

export function NoteShow({
  title,
  desc
}:NoteListItemProp) {
  useEffect(() => {
    const links:NodeListOf<HTMLAnchorElement> = (document.querySelectorAll('a'));
    const listener = function (event:MouseEvent, link: HTMLAnchorElement) {
      event.preventDefault();
      const isSure = window.confirm('Are you sure you want to leave the page?');
      if(isSure){
        console.log(link.href);
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
  }, [title, desc])
  return (
    <>
      <h2 className={'mb-4'}>{title}</h2>

      <div className={styles.content} dangerouslySetInnerHTML={{
        __html: sanitizeHtml(desc, sanitizeConfig)
      }} />
    </>
  );
}
