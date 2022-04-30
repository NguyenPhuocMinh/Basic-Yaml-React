import { objectYup, stringYup, refYup } from 'story-bootstrap';

export const validateUserLogin = translate => {
  return objectYup().shape({
    email: stringYup()
      .required(translate('validation.required'))
      .email(translate('validation.users.email')),
    password: stringYup().required(translate('validation.required'))
    // .matches(
    //   /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
    //   translate('validation.users.password')
    // )
  });
};

export const validateUserRegister = translate => {
  return objectYup().shape({
    firstName: stringYup()
      .required(translate('validation.required'))
      .min(2, translate('validation.minLength', { min: 2 }))
      .max(10, translate('validation.maxLength', { max: 10 })),
    lastName: stringYup()
      .required(translate('validation.required'))
      .min(2, translate('validation.minLength', { min: 2 }))
      .max(10, translate('validation.maxLength', { max: 10 })),
    email: stringYup()
      .required(translate('validation.required'))
      .email(translate('validation.users.email')),
    password: stringYup()
      .required(translate('validation.required'))
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        translate('validation.users.password')
      ),
    passwordConfirm: stringYup()
      .required(translate('validation.required'))
      .oneOf(
        [refYup('password'), null],
        translate('validation.users.password_confirm')
      )
  });
};
