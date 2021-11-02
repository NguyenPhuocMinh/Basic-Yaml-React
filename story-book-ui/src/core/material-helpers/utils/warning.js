// eslint-disable-next-line import/no-anonymous-default-export
const warning = (condition, message) => {
  if (condition && process.env.NODE_ENV !== 'production') {
    console.warn(message); // eslint-disable-line
  }
};

export default warning;

