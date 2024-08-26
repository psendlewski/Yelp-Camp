module.exports = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};

// return function that accepts function and executes it, catching any arrors and passing them to next
