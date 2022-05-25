import { FC, useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useAuthState, useViewModeState } from '../../contexts'
import { User, ViewMode } from '../../types'

export type AuthProp = {
  readonly user: User
  readonly isError: boolean
  readonly onChange: (user:User) => void
  readonly onSubmit: () => void
  readonly onCancel: () => void
}

export const AuthView: FC<AuthProp> = ({
  user,
  isError,
  onChange,
  onSubmit,
  onCancel
}) => {
  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-5">
        <h2 className={'mb-0'}>Login form</h2>

        <Button onClick={onCancel}>Back</Button>
      </div>

      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Login <span className="text-danger">*</span></Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your login"
            value={user.login}
            onChange={(e) => onChange({...user, login: e.target.value})}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password <span className="text-danger">*</span></Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter your password"
            value={user.password}
            onChange={(e) => onChange({...user, password: e.target.value})}
          />
        </Form.Group>

        {isError && <div className="text-danger mb-3">Invalid credential</div>}

        <Button onClick={onSubmit}>Submit</Button>
      </Form>
    </>
  )
}

export const Auth = () => {
  const [formData, setFormData] = useState({login: '', password: ''} as User);
  const [_, viewModeAction] = useViewModeState();
  const [{isAuth, isError}, authActions] = useAuthState();

  const onChange = (user: User) => setFormData(() => user)
  const onSubmit = () => authActions.login(formData.login, formData.password)
  const onCancel = () => {
    viewModeAction.changeViewMode(ViewMode.NoteList)
    authActions.removeError()
  }

  useEffect(() => {
    if(isAuth){
      viewModeAction.changeViewMode(ViewMode.NoteList)
    }
  }, [isAuth])

  return (
    <AuthView
      user={formData}
      onChange={onChange}
      onSubmit={onSubmit}
      onCancel={onCancel}
      isError={isError}
    />
  )
}
