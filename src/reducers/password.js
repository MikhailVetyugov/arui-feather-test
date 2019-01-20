import * as actions from 'actions/password';

const initialState = {
  oldPassword: '',
  newPassword: '',
  passwordConfirmation: '',
  loading: false,
  succeed: false,
  failed: false
}

export default function password(state = initialState, action) {
  switch (action.type) {
    case actions.START_PASSWORD_RESET:
      return { 
        ...state,
        ...action.values,
        loading: true,
        succeeded: false,
        failed: false
      };
    case actions.SUCCEED_PASSWORD_RESET:
      return {
        ...state,
        loading: false,
        succeeded: true
      };
    case actions.FAIL_PASSWORD_RESET:
      return {
        ...state,
        loading: false,
        failed: true
      };
    default:
      return state;
  }
}
