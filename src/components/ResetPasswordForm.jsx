import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

import Button from 'arui-feather/button';
import Form from 'arui-feather/form';
import FormField from 'arui-feather/form-field';
import Heading from 'arui-feather/heading';
import Spin from 'arui-feather/spin';

import FormInput from './FormInput';
import NotificationsManager from './NotificationsManager';

import './ResetPasswordForm.css';

class ResetPasswordForm extends React.Component {
  render() {
    // TODO: required asteriks, refactoring
    const { handleSubmit, loading, succeeded, failed } = this.props;

    return (
      <div className="form-wrapper">
        <Form onSubmit={handleSubmit} className="reset-password-form">
          <Heading size="s" className="heading">Смена пароля</Heading>

          <Field
            name="oldPassword"
            label="Старый пароль"
            type="password"
            width="available"
            component={FormInput} />

          <Field
            name="newPassword"
            label="Новый пароль"
            type="password"
            width="available"
            component={FormInput} />

          <Field
            name="passwordConfirmation"
            label="Подтверждение пароля"
            type="password"
            width="available"
            component={FormInput} />

          <FormField className="save-form-field">
            <Button
              view="extra"
              type="submit"
              disabled={loading}
              icon={<Spin visible={loading} size='m' />}>
              Сохранить
            </Button>
          </FormField>
        </Form>

        <NotificationsManager succeeded={succeeded} failed={failed} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { loading, succeeded, failed } = state.password;
  return {
    loading,
    succeeded,
    failed
  };
}

ResetPasswordForm = connect(mapStateToProps, null)(ResetPasswordForm);

/* Redux-form */

function validate(values) {
  const errors = {};
  const REQUIRED_FIELD_ERROR = 'Обязательное поле';

  if (!values.oldPassword) {
    errors.oldPassword = REQUIRED_FIELD_ERROR;
  }

  if (!values.newPassword) {
    errors.newPassword = REQUIRED_FIELD_ERROR;
  }

  if (!values.passwordConfirmation) {
    errors.passwordConfirmation = REQUIRED_FIELD_ERROR;
  }

  if (values.oldPassword
    && values.newPassword
    && values.oldPassword === values.newPassword) {
      errors.newPassword = 'Новый пароль не должен совпадать со старым';
  }

  if (values.newPassword
    && values.passwordConfirmation
    && values.newPassword !== values.passwordConfirmation) {
      errors.passwordConfirmation = 'Пароли не совпадают';
  }

  return errors;
}

export default reduxForm({
  form: 'resetPasswordForm',
  validate
})(ResetPasswordForm);
