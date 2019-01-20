import React from 'react';
import FormField from 'arui-feather/form-field';
import Input from 'arui-feather/input';

export default class FormInput extends React.Component {
    render() {
        const {
          input,
          label,
          type,
          width,
          meta: { touched, error } } = this.props;
        return (
          <FormField>
            <Input
              {...input}
              label={label}
              type={type}
              width={width}
              error={touched && error} />
          </FormField>
        );
    }
}