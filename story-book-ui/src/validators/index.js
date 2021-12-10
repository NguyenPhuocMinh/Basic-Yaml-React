import * as Yup from 'yup';

export const validateUserLogin = (translate) => {
  return Yup.object().shape({
    email: Yup.string()
      .required(translate('validation.required'))
      .email(translate('validation.users.email')),
    password: Yup.string().required(translate('validation.required'))
    // .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
    //   translate('validation.users.password')
    // ),
  });
};

export const validateUserRegister = (translate) => {
  return Yup.object().shape({
    firstName: Yup.string()
      .required(translate('validation.required'))
      .min(2, translate('validation.minLength', { min: 2 }))
      .max(10, translate('validation.maxLength', { max: 10 })),
    lastName: Yup.string()
      .required(translate('validation.required'))
      .min(2, translate('validation.minLength', { min: 2 }))
      .max(10, translate('validation.maxLength', { max: 10 })),
    email: Yup.string()
      .required(translate('validation.required'))
      .email(translate('validation.users.email')),
    password: Yup.string()
      .required(translate('validation.required'))
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        translate('validation.users.password')
      ),
    passwordConfirm: Yup.string()
      .required(translate('validation.required'))
      .oneOf(
        [Yup.ref('password'), null],
        translate('validation.users.password_confirm')
      )
  });
};
