
const logger = (env) => (req, res, next) => {
  console.log(`${env} ${req.method} ${req.url}`);
  next();
}

module.exports = logger