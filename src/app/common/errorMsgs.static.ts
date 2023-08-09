export const ErrorMessages = {
  CommonError: {
    InterServererror: 'Something went wrong, Please try again later',
  },

  ResetPassword: {
    password: {
      required: 'Password is required',
      pattern:
        'Password must contains at-least 1 UpperCase, 1 LowerCase, 1 Digit and 1 Special character and must be 8 to 15 character...',
    },
    confirmPassword: {
      required: 'ConfirmPassword is required',
    },

    checkPass: {
      match: 'new password and confirm password should match!',
    },
  },

  Login: {
    email: {
      required: 'Email address is required',
      pattern: 'Enter a Valid email address',
    },
  },
};
