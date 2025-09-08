import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const saved = typeof localStorage !== 'undefined' ? localStorage.getItem('lng') || 'ru' : 'ru';

const resources = {
  ru: {
    translation: {
      nav: {
        competitions: 'Соревнования',
        community: 'Сообщество',
        courses: 'Курсы',
        products: 'Продукты',
        about: 'О нас',
        contacts: 'Контакты',
        dashboard: 'Личный кабинет',
        login: 'Войти',
      },
      competitions: {
        title: 'Соревнования AEROO',
        subtitle: 'Присоединяйтесь к инновационным соревнованиям по аэрокосмическим технологиям. Проверьте свои навыки и создавайте будущее вместе.',
        age: 'Возраст:',
        deadline: 'Дедлайн:',
        details: 'Подробнее',
        participate: 'Участвовать',
        enrollTeam: 'Регистрация команды',
        archiveTitle: 'Архив соревнований',
        openRegistration: 'Регистрация',
        pendingRegistration: 'Скоро',
        registrationClosed: 'Закрыто'
      },
      common: {
        loading: 'Загрузка...',
        error: 'Ошибка',
        success: 'Успешно',
        cancel: 'Отмена',
        save: 'Сохранить',
        submit: 'Отправить',
        back: 'Назад',
        next: 'Далее',
        edit: 'Редактировать',
        delete: 'Удалить',
        confirm: 'Подтвердить',
        yes: 'Да',
        no: 'Нет'
      },
      auth: {
        signIn: 'Войти',
        signUp: 'Зарегистрироваться',
        signOut: 'Выйти',
        email: 'Email',
        password: 'Пароль',
        forgotPassword: 'Забыли пароль?',
        resetPassword: 'Сбросить пароль',
        confirmPassword: 'Подтвердите пароль',
        alreadyHaveAccount: 'Уже есть аккаунт?',
        dontHaveAccount: 'Нет аккаунта?',
        emailSent: 'Письмо отправлено',
        checkEmail: 'Проверьте свой email для подтверждения',
        invalidCredentials: 'Неверные учетные данные',
        weakPassword: 'Слабый пароль',
        emailAlreadyExists: 'Email уже зарегистрирован',
        passwordsMustMatch: 'Пароли должны совпадать',
        passwordTooShort: 'Пароль должен содержать минимум 6 символов',
        passwordUpdated: 'Пароль обновлён',
        passwordUpdateError: 'Ошибка обновления пароля',
        passwordsDontMatch: 'Пароли не совпадают',
        passwordInvalid: 'Пароль не соответствует требованиям',
        passwordRules: 'Минимум 8 символов, одна заглавная буква и один спецсимвол'
      },
      profile: {
        title: 'Профиль',
        fullName: 'ФИО',
        fullNamePlaceholder: 'Введите ваше полное имя',
        iin: 'ИИН',
        iinPlaceholder: '123456789012',
        phone: 'Телефон',
        phonePlaceholder: '+7 (xxx) xxx-xx-xx',
        telegram: 'Telegram',
        telegramPlaceholder: '@username',
        school: 'Школа/Университет',
        schoolPlaceholder: 'Название учебного заведения',
        city: 'Город',
        cityPlaceholder: 'Ваш город',
        grade: 'Класс/Курс',
        age: 'Возраст'
      },
      enroll: {
        title: 'Регистрация на соревнование',
        competition: 'Соревнование',
        status: 'Статус',
        personalInfo: 'Личная информация',
        teamInfo: 'Информация о команде',
        teamName: 'Название команды',
        teamNamePlaceholder: 'Введите название команды',
        captain: 'Капитан команды',
        captainFullName: 'ФИО капитана',
        captainFullNamePlaceholder: 'Иванов Иван Иванович',
        captainPhone: 'Телефон капитана',
        captainPhonePlaceholder: '+7 (xxx) xxx-xx-xx',
        captainAge: 'Возраст капитана',
        captainAgePlaceholder: '18',
        city: 'Город',
        cityPlaceholder: 'Ваш город',
        studyPlace: 'Место обучения',
        studyPlacePlaceholder: 'Название учебного заведения',
        participant: 'Участник',
        participantName: 'ФИО участника',
        participantNamePlaceholder: 'Введите ФИО участника',
        addParticipant: 'Добавить участника',
        removeParticipant: 'Удалить участника',
        source: 'Откуда узнали о соревновании?',
        selectSource: 'Выберите источник',
        consent: 'С Положением ознакомлен(-а) и согласен(-а) с политикой конфиденциальности',
        submit: 'Подтвердить участие',
        sending: 'Отправка...',
        sourceInstagramKaz: 'Instagram (@aeroo.space)',
        sourceInstagramOther: 'Instagram других аккаунтов',
        sourceTelegram: 'Telegram',
        sourceFriends: 'У знакомых',
        sourceOther: 'Другое'
      },
      hero: {
        title: 'Изучай. Создавай. Запускай.',
        subtitle: 'Присоединяйся к будущему аэрокосмических технологий вместе с AEROO. Участвуй в соревнованиях, изучай космические технологии и создавай инновационные проекты.',
        cta: 'Начать путешествие',
        stats: {
          participants: 'участников',
          competitions: 'соревнований',
          projects: 'проектов'
        }
      },
      home: {
        metaTitle: 'AEROO — образовательная платформа',
        hero: {
          competitions: {
            title: 'Соревнования мирового уровня',
            desc: 'Участвуйте в престижных международных соревнованиях по аэрокосмическим технологиям и проверьте свои знания.',
            button: 'К соревнованиям'
          },
          products: {
            title: 'Образовательные наборы',
            desc: 'Изучайте аэрокосмические технологии через практические эксперименты с нашими образовательными комплектами.',
            button: 'Смотреть продукты'
          },
          settlement: {
            title: 'Space Settlement Competition 2025',
            dates: 'Регистрация: до 15 февраля 2025',
            registration: 'Создайте проект космического поселения будущего в команде единомышленников.',
            button: 'Зарегистрироваться'
          }
        },
        features: {
          title: 'Направления обучения',
          subtitle: 'Погрузитесь в мир аэрокосмических технологий через практические курсы и захватывающие соревнования',
          items: {
            0: {
              title: 'Ракетостроение',
              desc: 'Изучение аэродинамики, конструирование и запуск моделей ракет с твердотопливными двигателями'
            },
            1: {
              title: 'БПЛА',
              desc: 'Программирование дронов, FPV-пилотирование, аэросъёмка и автономные полёты'
            },
            2: {
              title: 'Спутниковые технологии',
              desc: 'Создание наноспутников, изучение бортовых систем и подготовка к запуску'
            },
            3: {
              title: 'Искусственный интеллект',
              desc: 'Разработка автономных алгоритмов для навигации и управления космическими миссиями'
            },
            4: {
              title: 'Соревнования',
              desc: 'Участие в международных конкурсах по аэрокосмическим технологиям'
            },
            5: {
              title: 'Командная работа',
              desc: 'Развитие навыков сотрудничества в многодисциплинарных проектах'
            }
          },
          learnMore: 'Узнать больше',
          cta: {
            title: 'Готовы начать свой путь в космос?',
            courses: 'Образовательные комплекты для школ',
            competitions: 'Ближайшие соревнования'
          }
        }
      },
      features: {
        title: 'Почему выбирают AEROO?',
        subtitle: 'Мы предлагаем уникальные возможности для развития в области аэрокосмических технологий',
        items: {
          0: {
            title: 'Практическое обучение',
            description: 'Получайте знания через реальные проекты и эксперименты'
          },
          1: {
            title: 'Международные соревнования',
            description: 'Участвуйте в престижных соревнованиях мирового уровня'
          },
          2: {
            title: 'Экспертное сообщество',
            description: 'Общайтесь с профессионалами индустрии и единомышленниками'
          },
          3: {
            title: 'Современное оборудование',
            description: 'Работайте с передовыми технологиями и инструментами'
          }
        }
      },
      footer: {
        description: 'Образовательная платформа для изучения аэрокосмических технологий и участия в международных соревнованиях.',
        sections: [
          {
            title: 'Компания',
            links: ['О нас', 'Команда', 'Карьера', 'Новости']
          },
          {
            title: 'Образование',
            links: ['Соревнования', 'Курсы', 'Продукты', 'Сертификаты']
          },
          {
            title: 'Поддержка',
            links: ['Контакты', 'FAQ', 'Техподдержка', 'Сообщество']
          },
          {
            title: 'Правовая информация',
            links: ['Политика конфиденциальности', 'Условия использования', 'Правила соревнований', 'Сертификаты']
          }
        ],
        bottom: {
          rights: 'Все права защищены.',
          privacy: 'Конфиденциальность',
          terms: 'Условия использования',
          cookies: 'Cookies'
        }
      },
      products: {
        metaTitle: 'Продукты AEROO — наборы и конструкторы',
        hero: {
          title: 'Продукты AEROO',
          subtitle: 'Образовательные комплекты для изучения аэрокосмических технологий. От простых моделей ракет до сложных наноспутников.'
        },
        advantages: {
          title: 'Преимущества наших наборов',
          items: {
            0: {
              title: 'Инновационные технологии',
              desc: 'Используем последние достижения в области аэрокосмических технологий'
            },
            1: {
              title: 'Полная безопасность',
              desc: 'Все наборы проходят строгую сертификацию и тестирование'
            },
            2: {
              title: 'Поддержка экспертов',
              desc: 'Техническая поддержка и консультации от наших инженеров'
            }
          }
        },
        grid: {
          title: 'Наши продукты'
        },
        items: {
          'rocket-kit': {
            title: 'Rocket Science Kit',
            description: 'Образовательный комплект для изучения основ ракетостроения и аэродинамики',
            category: 'Ракеты',
            features: {
              0: 'Безопасные двигатели',
              1: 'Конструктор ракеты',
              2: 'Создай свою ракету',
              3: 'Симуляция запуска'
            }
          },
          'cansat-kit': {
            title: 'CanSat Kit',
            description: 'Для сборки и запуска спутника формата CanSat на борту модельной ракеты',
            category: 'Ракеты',
            features: {
              0: 'Продвинутая модель ракеты',
              1: 'Работа с электроникой',
              2: 'Данные в режиме реального времени',
              3: 'Полезная нагрузка'
            }
          },
          'satellite-kit': {
            title: 'CubeSat Kit',
            description: 'Спутник с возможностью запуска в стратосферу для проведения реальных научных экспериментов',
            category: 'Спутники',
            features: {
              0: 'Солнечные панели',
              1: 'Радиосистема LoRa',
              2: 'Бортовой компьютер',
              3: 'Датчики'
            }
          },
          'football-drone-kit': {
            title: 'Drone Football Kit',
            description: 'Комплект для матчей в дрон-футбол — управляй дроном, соревнуйся и развивай командный дух',
            category: 'Дроны',
            features: {
              0: 'Безопасный полет',
              1: 'Тренировочная сетка и ворота',
              2: 'Спортивный дух',
              3: 'Стратегическое мышление'
            }
          }
        },
        inStock: 'В наличии',
        outOfStock: 'Нет в наличии',
        includes: 'Что входит в набор:',
        cta: {
          details: 'Подробнее',
          request: 'Оставить заявку',
          notify: 'Сообщить о поступлении'
        },
        detailsNotReady: 'Детальная страница в разработке',
        detailsComingSoon: 'Скоро будет доступна подробная информация о продукте',
        help: {
          title: 'Нужна консультация?',
          desc: 'Наши эксперты помогут выбрать подходящий набор для вашего уровня подготовки и образовательных целей. Свяжитесь с нами для персональной консультации.'
        },
        catalog: {
          download: 'Скачать каталог',
          soon: 'Каталог скоро',
          pdfLater: 'PDF-каталог будет доступен позже'
        },
        request: {
          sent: 'Заявка отправлена',
          weWillContact: 'Мы свяжемся с вами по email'
        }
      },
      dashboard: {
        title: 'Личный кабинет — AEROO',
        logout: 'Выйти',
        profile: 'Профиль',
        loading: 'Загрузка...',
        email: 'Email',
        fullName: 'ФИО',
        iin: 'ИИН',
        phone: 'Телефон',
        telegram: 'Telegram',
        school: 'Школа/Университет',
        city: 'Город',
        grade: 'Класс/Курс',
        age: 'Возраст',
        fieldUpdated: 'Поле обновлено',
        fieldUpdateError: 'Ошибка обновления',
        registrations: 'Мои регистрации',
        noRegistrations: 'У вас пока нет активных регистраций на соревнования.',
        competition: 'Соревнование',
        registeredAt: 'Дата регистрации',
        status: 'Статус',
        actions: 'Действия',
        edit: 'Редактировать',
        delete: 'Удалить',
        deleteConfirm: 'Вы уверены?',
        deleteDescription: 'Это действие нельзя отменить. Регистрация будет удалена безвозвратно.',
        changePassword: 'Сменить пароль',
        currentPassword: 'Текущий пароль',
        newPassword: 'Новый пароль',
        confirmPassword: 'Подтвердите пароль'
      },
      profileSetup: {
        title: 'Завершите настройку профиля',
        description: 'Пожалуйста, заполните информацию о себе для завершения регистрации.',
        fullName: 'ФИО',
        fullNamePlaceholder: 'Иванов Иван Иванович',
        iin: 'ИИН',
        iinPlaceholder: '123456789012',
        phone: 'Телефон',
        phonePlaceholder: '+7 700 000 00 00',
        telegram: 'Telegram',
        telegramPlaceholder: '@username',
        school: 'Учебное заведение',
        schoolPlaceholder: 'Название школы/ВУЗа',
        city: 'Город',
        cityPlaceholder: 'Алматы',
        grade: 'Класс/Курс обучения',
        gradePlaceholder: '11',
        submit: 'Завершить регистрацию',
        submitting: 'Сохранение...',
        success: 'Профиль успешно создан!',
        error: 'Ошибка при создании профиля'
      },
      dashboardExtra: {
        labels: {
          team: 'Команда',
          email: 'Email',
          telegram: 'Telegram',
          captain: 'Капитан',
          captainPhone: 'Телефон капитана',
          captainAge: 'Возраст капитана',
          city: 'Город',
          studyPlace: 'Место обучения',
          source: 'Источник',
          participant2: '2 участник',
          participant3: '3 участник',
          participant4: '4 участник',
          status: 'Статус'
        },
        actions: { edit: 'Редактировать', delete: 'Удалить', cancel: 'Отмена', confirmDelete: 'Удалить' },
        confirm: {
          title: 'Удалить регистрацию?',
          desc: 'Это действие необратимо. Ваша запись в соревнование будет удалена.'
        },
        toasts: { deleteSuccess: 'Регистрация удалена', deleteError: 'Не удалось удалить' }
      }
    }
  },
  en: {
    translation: {
      nav: {
        competitions: 'Competitions',
        community: 'Community',
        courses: 'Courses',
        products: 'Products',
        about: 'About',
        contacts: 'Contacts',
        dashboard: 'Dashboard',
        login: 'Login',
      },
      competitions: {
        title: 'AEROO Competitions',
        subtitle: 'Join innovative aerospace technology competitions. Test your skills and create the future together.',
        age: 'Age:',
        deadline: 'Deadline:',
        details: 'Details',
        participate: 'Participate',
        enrollTeam: 'Team Registration',
        archiveTitle: 'Competition Archive',
        openRegistration: 'Registration',
        pendingRegistration: 'Coming Soon',
        registrationClosed: 'Closed'
      },
      common: {
        loading: 'Loading...',
        error: 'Error',
        success: 'Success',
        cancel: 'Cancel',
        save: 'Save',
        submit: 'Submit',
        back: 'Back',
        next: 'Next',
        edit: 'Edit',
        delete: 'Delete',
        confirm: 'Confirm',
        yes: 'Yes',
        no: 'No'
      },
      auth: {
        signIn: 'Sign In',
        signUp: 'Sign Up',
        signOut: 'Sign Out',
        email: 'Email',
        password: 'Password',
        forgotPassword: 'Forgot Password?',
        resetPassword: 'Reset Password',
        confirmPassword: 'Confirm Password',
        alreadyHaveAccount: 'Already have an account?',
        dontHaveAccount: 'Don\'t have an account?',
        emailSent: 'Email sent',
        checkEmail: 'Check your email for confirmation',
        invalidCredentials: 'Invalid credentials',
        weakPassword: 'Weak password',
        emailAlreadyExists: 'Email already exists',
        passwordsMustMatch: 'Passwords must match',
        passwordTooShort: 'Password must be at least 6 characters',
        passwordUpdated: 'Password updated',
        passwordUpdateError: 'Password update error',
        passwordsDontMatch: 'Passwords don\'t match',
        passwordInvalid: 'Password doesn\'t meet requirements',
        passwordRules: 'Minimum 8 characters, one uppercase letter and one special character'
      },
      profile: {
        title: 'Profile',
        fullName: 'Full Name',
        fullNamePlaceholder: 'Enter your full name',
        iin: 'IIN',
        iinPlaceholder: '123456789012',
        phone: 'Phone',
        phonePlaceholder: '+7 (xxx) xxx-xx-xx',
        telegram: 'Telegram',
        telegramPlaceholder: '@username',
        school: 'School/University',
        schoolPlaceholder: 'Educational institution name',
        city: 'City',
        cityPlaceholder: 'Your city',
        grade: 'Grade/Course',
        age: 'Age'
      },
      enroll: {
        title: 'Competition Registration',
        competition: 'Competition',
        status: 'Status',
        personalInfo: 'Personal Information',
        teamInfo: 'Team Information',
        teamName: 'Team Name',
        teamNamePlaceholder: 'Enter team name',
        captain: 'Team Captain',
        captainFullName: 'Captain Full Name',
        captainFullNamePlaceholder: 'John Smith',
        captainPhone: 'Captain Phone',
        captainPhonePlaceholder: '+7 (xxx) xxx-xx-xx',
        captainAge: 'Captain Age',
        captainAgePlaceholder: '18',
        city: 'City',
        cityPlaceholder: 'Your city',
        studyPlace: 'Place of Study',
        studyPlacePlaceholder: 'Educational institution name',
        participant: 'Participant',
        participantName: 'Participant Name',
        participantNamePlaceholder: 'Enter participant name',
        addParticipant: 'Add Participant',
        removeParticipant: 'Remove Participant',
        source: 'How did you hear about the competition?',
        selectSource: 'Select source',
        consent: 'I have read the Terms and agree with the Privacy Policy',
        submit: 'Confirm participation',
        sending: 'Sending...',
        sourceInstagramKaz: 'Instagram (@aeroo.space)',
        sourceInstagramOther: 'Instagram (other accounts)',
        sourceTelegram: 'Telegram',
        sourceFriends: 'From friends',
        sourceOther: 'Other'
      },
      hero: {
        title: 'Learn. Create. Launch.',
        subtitle: 'Join the future of aerospace technology with AEROO. Participate in competitions, study space technologies and create innovative projects.',
        cta: 'Start Journey',
        stats: {
          participants: 'participants',
          competitions: 'competitions',
          projects: 'projects'
        }
      },
      features: {
        title: 'Why choose AEROO?',
        subtitle: 'We offer unique opportunities for development in aerospace technology',
        items: {
          0: {
            title: 'Hands-on Learning',
            description: 'Gain knowledge through real projects and experiments'
          },
          1: {
            title: 'International Competitions',
            description: 'Participate in prestigious world-class competitions'
          },
          2: {
            title: 'Expert Community',
            description: 'Connect with industry professionals and like-minded people'
          },
          3: {
            title: 'Modern Equipment',
            description: 'Work with cutting-edge technologies and tools'
          }
        }
      },
      footer: {
        description: 'Educational platform for studying aerospace technologies and participating in international competitions.',
        sections: [
          {
            title: 'Company',
            links: ['About', 'Team', 'Careers', 'News']
          },
          {
            title: 'Education',
            links: ['Competitions', 'Courses', 'Products', 'Certificates']
          },
          {
            title: 'Support',
            links: ['Contacts', 'FAQ', 'Tech Support', 'Community']
          },
          {
            title: 'Legal',
            links: ['Privacy Policy', 'Terms of Use', 'Competition Rules', 'Certificates']
          }
        ],
        bottom: {
          rights: 'All rights reserved.',
          privacy: 'Privacy',
          terms: 'Terms of Use',
          cookies: 'Cookies'
        }
      },
      products: {
        metaTitle: 'AEROO Products — kits and constructors',
        hero: {
          title: 'AEROO Products',
          subtitle: 'Educational kits for studying aerospace technologies. From simple rocket models to complex nanosatellites.'
        },
        advantages: {
          title: 'Advantages of our kits',
          items: {
            0: {
              title: 'Innovative technologies',
              desc: 'We use the latest achievements in aerospace technologies'
            },
            1: {
              title: 'Complete safety',
              desc: 'All kits undergo strict certification and testing'
            },
            2: {
              title: 'Expert support',
              desc: 'Technical support and consultations from our engineers'
            }
          }
        },
        grid: {
          title: 'Our products'
        },
        items: {
          'rocket-kit': {
            title: 'Rocket Science Kit',
            description: 'Educational kit for studying the basics of rocket science and aerodynamics',
            category: 'Rockets',
            features: {
              0: 'Safe engines',
              1: 'Rocket constructor',
              2: 'Build your rocket',
              3: 'Launch simulation'
            }
          },
          'cansat-kit': {
            title: 'CanSat Kit',
            description: 'For assembling and launching a CanSat format satellite aboard a model rocket',
            category: 'Rockets',
            features: {
              0: 'Advanced rocket model',
              1: 'Electronics work',
              2: 'Real-time data',
              3: 'Payload'
            }
          },
          'satellite-kit': {
            title: 'CubeSat Kit',
            description: 'Satellite with the ability to launch into the stratosphere for conducting real scientific experiments',
            category: 'Satellites',
            features: {
              0: 'Solar panels',
              1: 'LoRa radio system',
              2: 'Onboard computer',
              3: 'Sensors'
            }
          },
          'football-drone-kit': {
            title: 'Drone Football Kit',
            description: 'Kit for drone football matches — control the drone, compete and develop team spirit',
            category: 'Drones',
            features: {
              0: 'Safe flight',
              1: 'Training net and goals',
              2: 'Sporting spirit',
              3: 'Strategic thinking'
        }
      },
        },
        inStock: 'In stock',
        outOfStock: 'Out of stock',
        includes: 'What\'s included in the kit:',
        cta: {
          details: 'Details',
          request: 'Request',
          notify: 'Notify when available'
        },
        detailsNotReady: 'Detail page under development',
        detailsComingSoon: 'Detailed product information will be available soon',
        help: {
          title: 'Need consultation?',
          desc: 'Our experts will help you choose the right kit for your skill level and educational goals. Contact us for a personalized consultation.'
        },
        catalog: {
          download: 'Download catalog',
          soon: 'Catalog coming soon',
          pdfLater: 'PDF catalog will be available later'
        },
        request: {
          sent: 'Request sent',
          weWillContact: 'We will contact you by email'
        }
      },
      home: {
        metaTitle: 'AEROO — Educational Platform',
        hero: {
          competitions: {
            title: 'World-Class Competitions',
            desc: 'Participate in prestigious international aerospace technology competitions and test your knowledge.',
            button: 'View Competitions'
          },
          products: {
            title: 'Educational Kits',
            desc: 'Learn aerospace technologies through hands-on experiments with our educational kits.',
            button: 'View Products'
          },
          settlement: {
            title: 'Space Settlement Competition 2025',
            dates: 'Registration: until February 15, 2025',
            registration: 'Create a future space settlement project with a team of like-minded individuals.',
            button: 'Register'
          }
        },
        features: {
          title: 'Learning Areas',
          subtitle: 'Dive into the world of aerospace technologies through practical courses and exciting competitions',
          items: {
            0: {
              title: 'Rocket Engineering',
              desc: 'Study aerodynamics, design and launch rocket models with solid fuel engines'
            },
            1: {
              title: 'UAV',
              desc: 'Drone programming, FPV piloting, aerial photography and autonomous flights'
            },
            2: {
              title: 'Satellite Technologies',
              desc: 'Create nanosatellites, study onboard systems and prepare for launch'
            },
            3: {
              title: 'Artificial Intelligence',
              desc: 'Develop autonomous algorithms for navigation and space mission control'
            },
            4: {
              title: 'Competitions',
              desc: 'Participate in international aerospace technology competitions'
            },
            5: {
              title: 'Teamwork',
              desc: 'Develop collaboration skills in multidisciplinary projects'
            }
          },
          learnMore: 'Learn More',
          cta: {
            title: 'Ready to start your journey to space?',
            courses: 'Educational Kits for Schools',
            competitions: 'Upcoming Competitions'
          }
        }
      },
      dashboard: {
        title: 'Dashboard — AEROO',
        logout: 'Logout',
        profile: 'Profile',
        loading: 'Loading...',
        email: 'Email',
        fullName: 'Full Name',
        iin: 'IIN',
        phone: 'Phone',
        telegram: 'Telegram',
        school: 'School/University',
        city: 'City',
        grade: 'Grade/Course',
        age: 'Age',
        fieldUpdated: 'Field updated',
        fieldUpdateError: 'Update error',
        registrations: 'My Registrations',
        noRegistrations: 'You don\'t have any active competition registrations yet.',
        competition: 'Competition',
        registeredAt: 'Registration Date',
        status: 'Status',
        actions: 'Actions',
        edit: 'Edit',
        delete: 'Delete',
        deleteConfirm: 'Are you sure?',
        deleteDescription: 'This action cannot be undone. The registration will be permanently deleted.',
        changePassword: 'Change Password',
        currentPassword: 'Current Password',
        newPassword: 'New Password',
        confirmPassword: 'Confirm Password'
      },
      profileSetup: {
        title: 'Complete profile setup',
        description: 'Please fill in your information to complete registration.',
        fullName: 'Full Name',
        fullNamePlaceholder: 'John Smith',
        iin: 'IIN',
        iinPlaceholder: '123456789012',
        phone: 'Phone',
        phonePlaceholder: '+7 700 000 00 00',
        telegram: 'Telegram',
        telegramPlaceholder: '@username',
        school: 'Educational Institution',
        schoolPlaceholder: 'School/University name',
        city: 'City',
        cityPlaceholder: 'Almaty',
        grade: 'Grade/Course',
        gradePlaceholder: '11',
        submit: 'Complete registration',
        submitting: 'Saving...',
        success: 'Profile successfully created!',
        error: 'Error creating profile'
      },
      dashboardExtra: {
        labels: {
          team: 'Team',
          email: 'Email',
          telegram: 'Telegram',
          captain: 'Captain',
          captainPhone: 'Captain phone',
          captainAge: 'Captain age',
          city: 'City',
          studyPlace: 'Place of study',
          source: 'Source',
          participant2: '2nd participant',
          participant3: '3rd participant',
          participant4: '4th participant',
          status: 'Status'
        },
        actions: { edit: 'Edit', delete: 'Delete', cancel: 'Cancel', confirmDelete: 'Delete' },
        confirm: { title: 'Delete registration?', desc: 'This action is irreversible. Your competition entry will be deleted.' },
        toasts: { deleteSuccess: 'Registration deleted', deleteError: 'Failed to delete' }
      }
    }
  },
  kz: {
    translation: {
      nav: {
        competitions: 'Сайыстар',
        community: 'Қауымдастық',
        courses: 'Курстар',
        products: 'Өнімдер',
        about: 'Біз туралы',
        contacts: 'Байланыс',
        dashboard: 'Жеке кабинет',
        login: 'Кіру',
      },
      competitions: {
        title: 'AEROO сайыстары',
        subtitle: 'Аэроғарыш технологиялары бойынша инновациялық сайыстарға қосылыңыз. Дағдыларыңызды сынап, болашақты бірге құрайық.',
        age: 'Жас:',
        deadline: 'Мерзімі:',
        details: 'Толығырақ',
        participate: 'Қатысу',
        enrollTeam: 'Командамен тіркелу',
        archiveTitle: 'Сайыстар мұрағаты',
        openRegistration: 'Тіркелу',
        pendingRegistration: 'Жақында',
        registrationClosed: 'Жабық'
      },
      common: {
        loading: 'Жүктелуде...',
        error: 'Қате',
        success: 'Сәтті',
        cancel: 'Болдырмау',
        save: 'Сақтау',
        submit: 'Жіберу',
        back: 'Артқа',
        next: 'Келесі',
        edit: 'Өңдеу',
        delete: 'Жою',
        confirm: 'Растау',
        yes: 'Иә',
        no: 'Жоқ'
      },
      auth: {
        signIn: 'Кіру',
        signUp: 'Тіркелу',
        signOut: 'Шығу',
        email: 'Email',
        password: 'Құпия сөз',
        forgotPassword: 'Құпия сөзді ұмыттыңыз ба?',
        resetPassword: 'Құпия сөзді қалпына келтіру',
        confirmPassword: 'Құпия сөзді растау',
        alreadyHaveAccount: 'Аккаунтыңыз бар ма?',
        dontHaveAccount: 'Аккаунтыңыз жоқ па?',
        emailSent: 'Email жіберілді',
        checkEmail: 'Растау үшін email-ді тексеріңіз',
        invalidCredentials: 'Жарамсыз деректер',
        weakPassword: 'Әлсіз құпия сөз',
        emailAlreadyExists: 'Email бұрын тіркелген',
        passwordsMustMatch: 'Құпия сөздер сәйкес болуы керек',
        passwordTooShort: 'Құпия сөз кемінде 6 белгіден болуы керек',
        passwordUpdated: 'Құпия сөз жаңартылды',
        passwordUpdateError: 'Құпия сөзді жаңарту қатесі',
        passwordsDontMatch: 'Құпия сөздер сәйкес емес',
        passwordInvalid: 'Құпия сөз талаптарға сәйкес емес',
        passwordRules: 'Кемінде 8 белгі, бір бас әріп және бір арнайы белгі'
      },
      profile: {
        title: 'Профиль',
        fullName: 'Аты-жөні',
        fullNamePlaceholder: 'Толық атыңызды енгізіңіз',
        iin: 'ЖСН',
        iinPlaceholder: '123456789012',
        phone: 'Телефон',
        phonePlaceholder: '+7 (xxx) xxx-xx-xx',
        telegram: 'Telegram',
        telegramPlaceholder: '@username',
        school: 'Мектеп/Университет',
        schoolPlaceholder: 'Білім беру мекемесінің атауы',
        city: 'Қала',
        cityPlaceholder: 'Сіздің қалаңыз',
        grade: 'Сынып/Курс',
        age: 'Жас'
      },
      enroll: {
        title: 'Сайысқа тіркелу',
        competition: 'Сайыс',
        status: 'Күйі',
        personalInfo: 'Жеке ақпарат',
        teamInfo: 'Команда туралы ақпарат',
        teamName: 'Команда атауы',
        teamNamePlaceholder: 'Команда атауын енгізіңіз',
        captain: 'Команда капитаны',
        captainFullName: 'Капитанның аты-жөні',
        captainFullNamePlaceholder: 'Иванов Иван Иванович',
        captainPhone: 'Капитанның телефоны',
        captainPhonePlaceholder: '+7 (xxx) xxx-xx-xx',
        captainAge: 'Капитанның жасы',
        captainAgePlaceholder: '18',
        city: 'Қала',
        cityPlaceholder: 'Сіздің қалаңыз',
        studyPlace: 'Оқу орны',
        studyPlacePlaceholder: 'Білім беру мекемесінің атауы',
        participant: 'Қатысушы',
        participantName: 'Қатысушының аты-жөні',
        participantNamePlaceholder: 'Қатысушының аты-жөнін енгізіңіз',
        addParticipant: 'Қатысушы қосу',
        removeParticipant: 'Қатысушыны алып тастау',
        source: 'Сайыс туралы қайдан білдіңіз?',
        selectSource: 'Дереккөзді таңдаңыз',
        consent: 'Ережемен таныспын және құпиялылық саясатына келісемін',
        submit: 'Қатысуды растау',
        sending: 'Жіберілуде...',
        sourceInstagramKaz: 'Instagram (@aeroo.space)',
        sourceInstagramOther: 'Instagram (басқа аккаунттар)',
        sourceTelegram: 'Telegram',
        sourceFriends: 'Таныстардан',
        sourceOther: 'Басқа'
      },
      hero: {
        title: 'Үйрен. Жаса. Ұшыр.',
        subtitle: 'AEROO-мен аэроғарыш технологияларының болашағына қосыл. Сайыстарға қатыс, ғарыш технологияларын үйрен және инновациялық жобалар жаса.',
        cta: 'Саяхатты бастау',
        stats: {
          participants: 'қатысушы',
          competitions: 'сайыс',
          projects: 'жоба'
        }
      },
      home: {
        metaTitle: 'AEROO — білім беру платформасы',
        hero: {
          competitions: {
            title: 'Әлемдік деңгейдегі сайыстар',
            desc: 'Беделді халықаралық аэроғарыштық технологиялар сайыстарына қатысып, білімдеріңізді сынаңыз.',
            button: 'Сайыстарды көру'
          },
          products: {
            title: 'Білім беру жиынтықтары',
            desc: 'Біздің білім беру жиынтықтарымен практикалық тәжірибелер арқылы аэроғарыштық технологияларды үйреніңіз.',
            button: 'Өнімдерді көру'
          },
          settlement: {
            title: 'Space Settlement Competition 2025',
            dates: 'Тіркелу: 2025 жылдың 15 ақпанына дейін',
            registration: 'Ұқсас ойлы серіктестер командасымен болашақ ғарыштық қоныс жобасын жасаңыз.',
            button: 'Тіркелу'
          }
        },
        features: {
          title: 'Оқыту бағыттары',
          subtitle: 'Практикалық курстар мен қызықты сайыстар арқылы аэроғарыштық технологиялар әлеміне енуіңіз',
          items: {
            0: {
              title: 'Ракета жасау',
              desc: 'Аэродинамиканы зерттеу, қатты отынды қозғалтқыштары бар ракета үлгілерін жобалау және ұшыру'
            },
            1: {
              title: 'БПЛА',
              desc: 'Дрон бағдарламалау, FPV басқару, аэросуретке түсіру және автономды ұшулар'
            },
            2: {
              title: 'Серіктік технологиялары',
              desc: 'Наноспутниктер жасау, борттық жүйелерді зерттеу және ұшыруға дайындалу'
            },
            3: {
              title: 'Жасанды интеллект',
              desc: 'Навигация және ғарыштық миссияларды басқаруға арналған автономды алгоритмдер дамыту'
            },
            4: {
              title: 'Сайыстар',
              desc: 'Халықаралық аэроғарыштық технологиялар жарыстарына қатысу'
            },
            5: {
              title: 'Командалық жұмыс',
              desc: 'Көп салалы жобаларда ынтымақтастық дағдыларын дамыту'
            }
          },
          learnMore: 'Толығырақ білу',
          cta: {
            title: 'Ғарышқа сапарыңызды бастауға дайынсыз ба?',
            courses: 'Мектептерге арналған білім беру жиынтықтары',
            competitions: 'Алдағы сайыстар'
          }
        }
      },
      features: {
        title: 'Неліктен AEROO-ны таңдайды?',
        subtitle: 'Біз аэроғарыш технологиялары саласында дамуға арналған бірегей мүмкіндіктер ұсынамыз',
        items: {
          0: {
            title: 'Практикалық оқыту',
            description: 'Нақты жобалар мен тәжірибелер арқылы білім алыңыз'
          },
          1: {
            title: 'Халықаралық сайыстар',
            description: 'Әлемдік деңгейдегі беделді сайыстарға қатысыңыз'
          },
          2: {
            title: 'Сарапшы қауымдастығы',
            description: 'Индустрия мамандары мен ойластырушылармен қарым-қатынас жасаңыз'
          },
          3: {
            title: 'Заманауи жабдықтар',
            description: 'Озық технологиялар мен құралдармен жұмыс жасаңыз'
          }
        }
      },
      footer: {
        description: 'Аэроғарыш технологияларын зерттеуге және халықаралық сайыстарға қатысуға арналған білім беру платформасы.',
        sections: [
          {
            title: 'Компания',
            links: ['Біз туралы', 'Команда', 'Мансап', 'Жаңалықтар']
          },
          {
            title: 'Білім беру',
            links: ['Сайыстар', 'Курстар', 'Өнімдер', 'Сертификаттар']
          },
          {
            title: 'Қолдау',
            links: ['Байланыс', 'Жиі қойылатын сұрақтар', 'Техникалық қолдау', 'Қауымдастық']
          },
          {
            title: 'Құжаттар',
            links: ['Құпиялылық саясаты', 'Пайдалану шарттары', 'Сайыс ережелері', 'Сертификаттар']
          }
        ],
        bottom: {
          rights: 'Барлық құқықтар қорғалған.',
          privacy: 'Құпиялылық',
          terms: 'Пайдалану шарттары',
          cookies: 'Cookies'
        }
      },
      products: {
        metaTitle: 'AEROO өнімдері — жиынтықтар мен конструкторлар',
        hero: {
          title: 'AEROO өнімдері',
          subtitle: 'Аэроғарыштық технологияларды зерттеуге арналған білім беру жиынтықтары. Қарапайым ракета үлгілерінен күрделі наноспутниктерге дейін.'
        },
        advantages: {
          title: 'Біздің жиынтықтардың артықшылықтары',
          items: {
            0: {
              title: 'Инновациялық технологиялар',
              desc: 'Аэроғарыштық технологиялар саласындағы соңғы жетістіктерді қолданамыз'
            },
            1: {
              title: 'Толық қауіпсіздік',
              desc: 'Барлық жиынтықтар қатаң сертификаттау мен тестілеуден өтеді'
            },
            2: {
              title: 'Сарапшылардың қолдауы',
              desc: 'Біздің инженерлердің техникалық қолдауы мен кеңестері'
            }
          }
        },
        grid: {
          title: 'Біздің өнімдер'
        },
        items: {
          'rocket-kit': {
            title: 'Rocket Science Kit',
            description: 'Ракета жасау және аэродинамика негіздерін үйренуге арналған білім беру жиынтығы',
            category: 'Ракеталар',
            features: {
              0: 'Қауіпсіз қозғалтқыштар',
              1: 'Ракета конструкторы',
              2: 'Өз ракетаңды жаса',
              3: 'Ұшыру симуляциясы'
            }
          },
          'cansat-kit': {
            title: 'CanSat Kit',
            description: 'CanSat пішіндегі серіктік үлгілік ракетада құрастыру және ұшыруға арналған',
            category: 'Ракеталар',
            features: {
              0: 'Озық ракета үлгісі',
              1: 'Электроникамен жұмыс',
              2: 'Нақты уақыттағы мәліметтер',
              3: 'Пайдалы жүк'
            }
          },
          'satellite-kit': {
            title: 'CubeSat Kit',
            description: 'Нақты ғылыми тәжірибелер жүргізу үшін стратосфераға ұшыру мүмкіндігі бар серіктік',
            category: 'Серіктіктер',
            features: {
              0: 'Күн панельдері',
              1: 'LoRa радиожүйесі',
              2: 'Борттық компьютер',
              3: 'Сенсорлар'
            }
          },
          'football-drone-kit': {
            title: 'Drone Football Kit',
            description: 'Дрон футболындағы матчтарға арналған жиынтық — дронды басқар, жарыс және командалық рухты дамыт',
            category: 'Дрондар',
            features: {
              0: 'Қауіпсіз ұшу',
              1: 'Жаттығу тор мен қақпалар',
              2: 'Спорттық рух',
              3: 'Стратегиялық ойлау'
            }
          }
        },
        inStock: 'Қойымда бар',
        outOfStock: 'Қойымда жоқ',
        includes: 'Жиынтыққа кіретіндер:',
        cta: {
          details: 'Толығырақ',
          request: 'Өтінім қалдыру',
          notify: 'Келу туралы хабарлау'
        },
        detailsNotReady: 'Толық бет әзірленуде',
        detailsComingSoon: 'Өнім туралы толық ақпарат жақында қол жетімді болады',
        help: {
          title: 'Кеңес керек пе?',
          desc: 'Біздің сарапшылар сіздің дайындық деңгейіңіз бен білім беру мақсаттарыңызға сәйкес жиынтық таңдауға көмектеседі. Жеке кеңес алу үшін бізбен байланысыңыз.'
        },
        catalog: {
          download: 'Каталогты жүктеп алу',
          soon: 'Каталог жақында',
          pdfLater: 'PDF-каталог кейінірек қол жетімді болады'
        },
        request: {
          sent: 'Өтінім жіберілді',
          weWillContact: 'Біз сізбен email арқылы байланысамыз'
        }
      },
      dashboard: {
        title: 'Жеке кабинет — AEROO',
        logout: 'Шығу',
        profile: 'Профиль',
        loading: 'Жүктелуде...',
        email: 'Email',
        fullName: 'Аты-жөні',
        iin: 'ЖСН',
        phone: 'Телефон',
        telegram: 'Telegram',
        school: 'Мектеп/Университет',
        city: 'Қала',
        grade: 'Сынып/Курс',
        age: 'Жас',
        fieldUpdated: 'Өріс жаңартылды',
        fieldUpdateError: 'Жаңарту қатесі',
        registrations: 'Менің тіркелімдерім',
        noRegistrations: 'Сізде әлі белсенді жарыс тіркелімдері жоқ.',
        competition: 'Жарыс',
        registeredAt: 'Тіркелу күні',
        status: 'Мәртебе',
        actions: 'Әрекеттер',
        edit: 'Өңдеу',
        delete: 'Жою',
        deleteConfirm: 'Сіз сенімдісіз бе?',
        deleteDescription: 'Бұл әрекетті болдырмауға болмайды. Тіркелім мәңгіге жойылады.',
        changePassword: 'Құпия сөзді өзгерту',
        currentPassword: 'Ағымдағы құпия сөз',
        newPassword: 'Жаңа құпия сөз',
        confirmPassword: 'Құпия сөзді растау'
      },
      profileSetup: {
        title: 'Профиль орнатуын аяқтаңыз',
        description: 'Тіркелуді аяқтау үшін өзіңіз туралы ақпаратты толтырыңыз.',
        fullName: 'Аты-жөні',
        fullNamePlaceholder: 'Иванов Иван Иванович',
        iin: 'ЖСН',
        iinPlaceholder: '123456789012',
        phone: 'Телефон',
        phonePlaceholder: '+7 700 000 00 00',
        telegram: 'Telegram',
        telegramPlaceholder: '@username',
        school: 'Білім беру мекемесі',
        schoolPlaceholder: 'Мектеп/ЖОО атауы',
        city: 'Қала',
        cityPlaceholder: 'Алматы',
        grade: 'Сынып/Курс',
        gradePlaceholder: '11',
        submit: 'Тіркелуді аяқтау',
        submitting: 'Сақталуда...',
        success: 'Профиль сәтті жасалды!',
        error: 'Профиль жасау қатесі'
      },
      dashboardExtra: {
        labels: {
          team: 'Команда',
          email: 'Email',
          telegram: 'Telegram',
          captain: 'Капитан',
          captainPhone: 'Капитан телефоны',
          captainAge: 'Капитан жасы',
          city: 'Қала',
          studyPlace: 'Оқу орны',
          source: 'Дереккөз',
          participant2: '2 қатысушы',
          participant3: '3 қатысушы',
          participant4: '4 қатысушы',
          status: 'Күйі'
        },
        actions: { edit: 'Өңдеу', delete: 'Жою', cancel: 'Болдырмау', confirmDelete: 'Жою' },
        confirm: { title: 'Тіркелуді жою?', desc: 'Бұл әрекет қайтымсыз. Сайысқа тіркелуіңіз жойылады.' },
        toasts: { deleteSuccess: 'Тіркелу жойылды', deleteError: 'Жою сәтсіз аяқталды' }
      }
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: saved,
    fallbackLng: 'ru',
    interpolation: { escapeValue: false },
  });

i18n.on('languageChanged', (lng) => {
  try {
    localStorage.setItem('lng', lng);
  } catch {}
  if (typeof document !== 'undefined') {
    document.documentElement.lang = lng;
  }
});

export default i18n;