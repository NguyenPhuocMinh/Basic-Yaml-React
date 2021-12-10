const TRANSLATIONS_EN = {
  title: 'Story Book',
  auth: {
    auth_check_error: 'Please login to continue',
    user_menu: 'Profile',
    username: 'Username',
    password: 'Password',
    sign_in: 'Sign in',
    sign_in_error: 'Authentication failed, please retry',
    logout: 'Logout'
  },
  users: {
    title: 'Story Book React',
    labels: {
      first_name: 'First Name',
      last_name: 'Last Name',
      email: 'Email',
      password: 'Password',
      password_confirm: 'Password Confirm',
      remember_me: 'Remember me'
    },
    texts: {
      or: 'OR',
      not_account: "Don't have an account?",
      has_account: 'You have an account?',
      welcome: 'Welcome To',
      subtitle: 'The Story Book React!',
      description: 'Demo page admin template for Web Applications.'
    },
    forgotPass: 'Forgot Password?',
    actions: {
      login: 'Login',
      login_google: 'Login with Google',
      login_facebook: 'Login with Facebook',
      register_account: 'Create an account'
    },
    notification: {
      register: {
        success: 'Register user successfully!',
        duplicate_email: 'Duplicate email',
        password_confirm_not_match:
          'Password confirm not match current password'
      },
      login: {
        success: 'Login successfully!',
        email_not_found: 'Email not found',
        incorrect_password: 'Incorrect Password'
      },
      logout: {
        success: 'Logout successfully!'
      }
    }
  },
  appBar: {
    toolbar: {
      title: 'Welcome to demo page',
      tooltip: {
        github: 'Github of page',
        change_language: 'Change language',
        change_setting: 'Change setting',
        change_profile: 'Change profile'
      },
      language: {
        en: 'English',
        vn: 'VietNam'
      },
      setting: {
        title: 'Settings',
        mode: 'Mode',
        themes: {
          light: 'Light',
          dark: 'Dark'
        }
      },
      profile: {
        show_profile: 'My Profile',
        logout: 'Logout'
      }
    }
  },
  resources: {
    dashboard: {
      name: 'Dash board'
    },
    ancients: {
      name: 'Ancient',
      vampires: {
        name: 'Vampire'
      },
      monsters: {
        name: 'Monster'
      }
    },
    animes: {
      name: 'Anime'
    }
  },
  page: {
    error: {
      name: 'Something went wrong',
      message:
        "A client error occurred and your request couldn't be completed.",
      message_text: 'Need help with this error? Try the following',
      message_help: 'Get help from the core team via',
      search_on: 'Search on',
      community_answers: 'for community answers'
    },
    not_found: {
      name: 'Not found',
      message: 'Either you typed a wrong URL, or you followed a bad link.'
    }
  },
  actions: {
    button: {
      back: 'Back'
    }
  },
  validation: {
    required: 'Required',
    minLength: 'Must be {{min}} characters at least',
    maxLength: 'Must be {{max}} characters or less',
    minValue: 'Must be at least {{min}}',
    maxValue: 'Must be {{max}} or less',
    users: {
      email: 'Email does not match format',
      password:
        'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character',
      password_confirm: 'Password confirm does not match password'
    }
  },
  common: {
    action: {
      undo: 'Undo'
    }
  }
};

export default TRANSLATIONS_EN;
