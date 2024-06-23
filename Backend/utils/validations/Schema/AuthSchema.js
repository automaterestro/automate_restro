const yup = require("yup");
const emailRegex = /^[a-zA-Z]+[a-zA-Z0-9]*@[a-zA-Z0-9.-]+\.[a-zA-Z]{1,4}$/;
const mobileNoRegex = /^[1-9]\d{9}$/;
exports.userSchema = yup.object().shape({
  name: yup
    .string()
    .required("name is required")
    .matches(/^[a-zA-Z]+$/, "First name must contain only letters"),
  email: yup
    .string()
    .required("Email is required")
    .matches(emailRegex, "Invalid email format"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters long")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Password must contain at least one special character"
    ),
  mobile_no: yup
    .string()
    .required("Mobile number is required")
    .matches(mobileNoRegex, "Mobile number must be Valid."),

  accountType: yup
    .string()
    .required("Account type is required")
    .oneOf(
      ["Manager", "Waiter", "Kitchen", "User"],
      "Account type must be Manager,Waiter,Kitchen,User"
    ),
});

exports.loginSchema = yup.object().shape({
  email: yup
    .string()
    .required("Email is required")
    .matches(emailRegex, "Invalid email format"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters long")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Password must contain at least one special character"
    ),
});
