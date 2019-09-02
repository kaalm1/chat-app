import moment from 'moment';

export function isSameDay(currentMessage = {}, diffMessage = {}) {
  if (!diffMessage.created) {
    return false;
  }

  const currentCreated = moment(currentMessage.created);
  const diffCreated = moment(diffMessage.created);

  if (!currentCreated.isValid() || !diffCreated.isValid()) {
    return false;
  }

  return currentCreated.isSame(diffCreated, 'day');
}

export function isSameUser(currentMessage = {}, diffMessage = {}) {
  return !!(diffMessage.userId === currentMessage.userId);
}
