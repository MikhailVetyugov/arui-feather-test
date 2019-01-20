import React from 'react';
import autobind from 'autobind-decorator';

import Notification from 'arui-feather/notification';

const NOTIFICATION_TIMEOUT = 5000;

export default class NotificationsManager extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSuccessNotificationVisible: false,
      isErrorNotificationVisible: false
    };
  }

  componentDidUpdate(prevProps) {
    const { succeeded, failed } = this.props;

    if (succeeded !== prevProps.succeeded && succeeded) {
      this.showSuccessNotification();
      this.setHideNotificationTimeout('isSuccessNotificationVisible');
      return;
    }

    if (failed !== prevProps.failed && failed) {
      this.showErrorNotification();
      this.setHideNotificationTimeout('isErrorNotificationVisible');
      return;
    }
  }

  componentWillUnmount() {
    this.clearNotificationTimeout();
  }

  setHideNotificationTimeout(property) {
    this.notificationTimeout = setTimeout(
      () => this.setState({ [property]: false }),
      NOTIFICATION_TIMEOUT);
  }

  clearNotificationTimeout() {
    if (this.notificationTimeout) {
      clearTimeout(this.notificationTimeout);
    }
  }

  @autobind
  showSuccessNotification() {
    this.clearNotificationTimeout();
    this.setState({ isSuccessNotificationVisible: true });
  }

  @autobind
  hideSuccessNotification() {
    this.clearNotificationTimeout();
    this.setState({ isSuccessNotificationVisible: false });
  }

  @autobind
  showErrorNotification() {
    this.clearNotificationTimeout();
    this.setState({ isErrorNotificationVisible: true });
  }

  @autobind
  hideErrorNotification() {
    this.clearNotificationTimeout();
    this.setState({ isErrorNotificationVisible: false });
  }

  render() {
    const { isSuccessNotificationVisible, isErrorNotificationVisible } = this.state;
    return (
      <React.Fragment>
        <Notification
          visible={isSuccessNotificationVisible}
          status='ok'
          offset={10}
          stickTo='right'
          title='Новый пароль сохранен'
          onCloserClick={this.hideSuccessNotification}
          onClickOutside={this.hideSuccessNotification}>
          Вам необходимо перезайти в систему под новым паролем
        </Notification>

        <Notification
          visible={isErrorNotificationVisible}
          status='error'
          offset={10}
          stickTo='right'
          title='Что-то пошло не так'
          onCloserClick={this.hideErrorNotification}
          onClickOutside={this.hideErrorNotification}>
          Попробуйте еще раз или обратитесь в нашу поддержку. Приносим свои извинения.
        </Notification>
      </React.Fragment>
    );
  }
}
