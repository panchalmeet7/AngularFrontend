export const ValidatorsPattern = {
  email: '[a-z0-9]+@[a-z]+[.][a-z]{2,3}',
  password: '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$',
  mobileNumber: '^[6789][0-9]{9}',
};
