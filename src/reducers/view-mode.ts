import {
  ViewMode,
  ViewModeDispatcher,
  ViewModeEvent, ViewModeEventType,
  ViewModeState
} from '../types'

export const viewModeInitialState: ViewModeState = {
  viewMode: ViewMode.NoteList
}

export const viewModeReducer = (
  state: ViewModeState,
  event: ViewModeEvent
): ViewModeState => {
  switch (event.type) {
    case ViewModeEventType.ChangeViewMode: {
      return {
        ...state,
        viewMode: event.viewMode
      }
    }
  }
}

export const changeViewMode = (dispatch: ViewModeDispatcher) => (viewMode: ViewMode): void =>
  dispatch({
    type: ViewModeEventType.ChangeViewMode,
    viewMode
  });
