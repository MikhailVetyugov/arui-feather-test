/* Actions */
export const START_PASSWORD_RESET = 'START_PASSWORD_RESET';
export const SUCCEED_PASSWORD_RESET = 'SUCCEED_PASSWORD_RESET';
export const FAIL_PASSWORD_RESET = 'FAIL_PASSWORD_RESET';

/* Action creators */
export const startPasswordReset = (values) => ({
  type: START_PASSWORD_RESET,
  values
});

export const succeedPasswordReset = () => ({
  type: SUCCEED_PASSWORD_RESET
});

export const failPasswordReset = () => ({
  type: FAIL_PASSWORD_RESET
});
