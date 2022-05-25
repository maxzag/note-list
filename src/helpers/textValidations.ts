import { MAX_NOTE_DESCRIPTION_LENGTH, MAX_NOTE_TITLE_LENGTH } from '../constants'
import { NoteFormState } from '../types'
import { removeHTMLTags } from './removeHTMLTags'

export const isTitleValid = (title:string):boolean => title.length <= MAX_NOTE_TITLE_LENGTH
export const isDescriptionValid = (description:string):boolean => description.length <= MAX_NOTE_DESCRIPTION_LENGTH
export const isFormValid = (state: NoteFormState):boolean => {
  console.log(state);

  return removeHTMLTags(state.note.title).length !== 0
    && state.isFormTitleValid
    && removeHTMLTags(state.note.description).length !== 0
    && state.isFormDescriptionValid
}
