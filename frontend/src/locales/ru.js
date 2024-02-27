export default {
  translation: {
    LoginPage: {
      imgAlt: 'Войти',
      bottomText: 'Нет аккаунта?',
      btnSignup: 'Регистрация',
      form: {
        header: 'Войти',
        usernameLabel: 'Ваш ник',
        passwordLabel: 'Пароль',
        errors: {
          nonExistentUser: 'Неверные имя пользователя или пароль',
        },
      },
    },
    NotFoundPage: {
      header: 'Страница не найдена',
      textBox: 'Но вы можете перейти',
      linkToMain: 'на главную страницу',
    },
    SignupPage: {
      header: 'Регистрация',
      form: {
        usernameLabel: 'Имя пользователя',
        passwordLabel: 'Пароль',
        confirmPasswordLabel: 'Подтвердите пароль',
        btnSubmit: 'Зарегистрироваться',
        errors: {
          requireField: 'Обязательное поле',
          length: 'От 3 до 20 символов',
          minLength: 'Не менее 6 символов',
          mismatchPassword: 'Пароли должны совпадать',
          userExists: 'Такой пользователь уже существует',
        },
      },
    },
    Loader: {
      textLable: 'Загрузка',
    },
    Layout: {
      siteName: 'Hexlet Chat',
      signOutBtn: 'Выйти',
    },
    ChatPage: {
      ChannelsList: {
        title: 'Каналы',
        btnAddChannel: 'Добавить канал',
        ChannelBtn: {
          btnChannelManagement: 'Управление каналом',
          btnRemoveChannel: 'Удалить',
          btnRenameChannel: 'Переименовать',
        },
      },
      Chat: {
        counterMessage: {
          message_one: '{{count}} сообщение',
          message_few: '{{count}} сообщения',
          message_many: '{{count}} сообщений',
        },
        form: {
          inputPlaceholder: 'Введите сообщение...',
          inputLabel: 'Новое сообщение',
          btnSubmit: 'Отправить',
        },
      },
    },
    modals: {
      AddChannel: {
        title: 'Добавить канал',
        formLable: 'Имя канала',
      },
      RemoveChannel: {
        title: 'Удалить канал',
        textBox: 'Уверены?',

      },
      RenameChannel: {
        title: 'Переименовать канал',
        lable: 'Имя канала',
      },
      btnSend: 'Отправить',
      btnCancel: 'Отменить',
      btnRemove: 'Удалить',
      errors: {
        minLength: 'Минимум 3 символа',
        maxLength: 'Максимум 20 символов!',
        uniqueName: 'Должно быть уникальным',
      },
    },
  },
};
