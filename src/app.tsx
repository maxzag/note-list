import React from 'react'
import { Notes } from './components/notes'
import { NoteListProvider, ViewModeProvider } from './contexts'

export default function App() {
  return (
    <ViewModeProvider>
      <NoteListProvider>
        <Notes/>
      </NoteListProvider>
    </ViewModeProvider>
  )
}
