import { createContext, FC } from 'react'
import { createNoteService } from '../services'
import { CreateNoteService } from '../types'
import { useNoteFormState } from './note-form'
import { useListState } from './note-list'
import { useViewModeState } from './view-mode'

export const NoteServiceContext = createContext({} as CreateNoteService)

export const NoteServiceProvider: FC = ({ children }) => {
  const [_, viewModeActions] = useViewModeState();
  const [__, noteFormActions] = useNoteFormState();
  const [___, noteListActions] = useListState();

  const actions = createNoteService(viewModeActions, noteFormActions, noteListActions);

  return <NoteServiceContext.Provider value={actions}>
    { children }
  </NoteServiceContext.Provider>
}
