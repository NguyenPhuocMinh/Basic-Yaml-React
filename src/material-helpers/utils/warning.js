// eslint-disable-next-line import/no-anonymous-default-export
export default (condition, message) => {
  if (condition && process.env.NODE_ENV !== 'production') {
    console.warn(message); // eslint-disable-line
  }
};