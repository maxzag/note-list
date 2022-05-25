import { isDescriptionValid, isFormValid, isTitleValid } from '../helpers'
import { Note, NoteFormDispatcher, NoteFormEvent, NoteFormEventType, NoteFormState } from '../types'

export const noteFormInitialState: NoteFormState = {
  note: {
    id: -1,
    title: '',
    description: ''
  },
  isFormValid: false,
  isFormTitleValid: true,
  isFormDescriptionValid: true
}

export const noteFormReducer = (
  state: NoteFormState,
  event: NoteFormEvent
): NoteFormState => {
  switch (event.type) {
    case NoteFormEventType.SetupForm: {
      const isFormTitleValid = isTitleValid(event.note.title);
      const isFormDescriptionValid = isDescriptionValid(event.note.description);
      return {
        ...state,
        note: event.note,
        isFormTitleValid,
        isFormDescriptionValid,
        isFormValid: isFormValid({
          ...state,
          note: event.note,
          isFormTitleValid,
          isFormDescriptionValid
        })
      }
    }
    case NoteFormEventType.ChangeTitle: {
      const isFormTitleValid = isTitleValid(event.title);
      return {
        ...state,
        note: {
          ...state.note,
          title: event.title
        },
        isFormTitleValid,
        isFormValid: isFormValid({
          ...state,
          note: {
            ...state.note,
            title: event.title
          },
          isFormTitleValid
        })
      }
    }
    case NoteFormEventType.ChangeDescription: {
      const isFormDescriptionValid = isDescriptionValid(event.description);
      return {
        ...state,
        note: {
          ...state.note,
          description: event.description
        },
        isFormDescriptionValid,
        isFormValid: isFormValid({
          ...state,
          note: {
            ...state.note,
            description: event.description
          },
          isFormDescriptionValid
        })
      }
    }
    case NoteFormEventType.ResetForm: {
      return noteFormInitialState
    }
  }
}

export const setupForm = (dispatch: NoteFormDispatcher) => (note: Note): void =>
  dispatch({
    type: NoteFormEventType.SetupForm,
    note
  });

export const changeTitle = (dispatch: NoteFormDispatcher) => (title: string): void =>
  dispatch({
    type: NoteFormEventType.ChangeTitle,
    title
  })

export const changeDescription = (dispatch: NoteFormDispatcher) => (description: string): void =>
  dispatch({
    type: NoteFormEventType.ChangeDescription,
    description
  })

export const resetForm = (dispatch: NoteFormDispatcher) => (): void =>
  dispatch({
    type: NoteFormEventType.ResetForm
  })
