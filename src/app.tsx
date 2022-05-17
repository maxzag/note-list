import React from 'react'
import { Notes } from './components/notes'
import { AuthProvider, NoteListProvider, ViewModeProvider } from './contexts'

export default function App() {
  return (
    <AuthProvider>
      <ViewModeProvider>
        <NoteListProvider>
          <Notes/>
        </NoteListProvider>
      </ViewModeProvider>
    </AuthProvider>
  )
}
