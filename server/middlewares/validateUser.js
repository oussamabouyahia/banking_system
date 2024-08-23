const { body, validationResult } = require("express-validator");

const validateUserInput = [
  body("email").isEmail().withMessage("Please enter a valid email address"),
  body("name")
    .isLength({ min: 3 })
    .withMessage("Name must be at least 3 characters long"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be longer than 5 characters"),
  body("balance")
    .isFloat({ gt: 10 })
    .withMessage("Balance must be greater than 10"),

  // Middleware to check for validation errors
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array()[0].msg });
    }
    next();
  },
];

module.exports = validateUserInput;
