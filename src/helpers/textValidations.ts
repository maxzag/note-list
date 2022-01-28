import { MAX_NOTE_DESCRIPTION_LENGTH, MAX_NOTE_TITLE_LENGTH } from '../constants'

export const isTitleValid = (title:string):boolean => title.length <= MAX_NOTE_TITLE_LENGTH
export const isDescriptionValid = (description:string):boolean => description.length <= MAX_NOTE_DESCRIPTION_LENGTH
