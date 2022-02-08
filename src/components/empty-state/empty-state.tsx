import React from 'react'
import { Button } from 'react-bootstrap'
import { useListState } from '../../contexts'
import { ViewMode } from '../../types'

export type EmptyStateProp = {
  readonly onChangeViewMode: (viewMode:ViewMode) => void
}

export const EmptyStateView: React.FC<EmptyStateProp> = ({ onChangeViewMode }) => {
  return (
    <>
      <h2>Your note list is empty =(</h2>

      <p>Start add your note.</p>

      <Button onClick={() => onChangeViewMode(ViewMode.Create)}>Create note</Button>
    </>
  )
}

export const EmptyState: React.FC = () => {
  const [_, actions] = useListState();

  return <EmptyStateView onChangeViewMode={actions.changeViewMode} />
}
