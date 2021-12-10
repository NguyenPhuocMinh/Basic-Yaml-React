const getErrorMessage = (error, defaultMessage) =>
  typeof error === 'string'
    ? error
    : typeof error === 'undefined' || !error.message
    ? defaultMessage
    : error.message;

export default getErrorMessage;
