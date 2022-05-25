import React from 'react'
import { Notes } from './components/notes'
import { AuthProvider, NoteListProvider, ViewModeProvider } from './contexts'
import { NoteFormProvider } from './contexts/note-form'
import { NoteServiceProvider } from './contexts/note-service'

export default function App() {
  return (
    <AuthProvider>
      <ViewModeProvider>
        <NoteListProvider>
          <NoteFormProvider>
            <NoteServiceProvider>
              <Notes/>
            </NoteServiceProvider>
          </NoteFormProvider>
        </NoteListProvider>
      </ViewModeProvider>
    </AuthProvider>
  )
}
