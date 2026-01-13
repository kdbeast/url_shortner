export default function wrapAsync(fn) {
  return function (req, res, next) {
    fn(req, res, next).catch((err) => {
      console.log("error aagye", err);
      next();
    });
  };
}
