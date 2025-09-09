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
        archiveDesc: 'Посмотрите результаты прошедших соревнований и работы участников',
        archiveBtn: 'Просмотреть архив',
        openRegistration: 'Регистрация',
        pendingRegistration: 'Скоро',
        registrationClosed: 'Закрыто',
        aerooFest: {
          title: "AEROO Fest 2026",
          category: "Всеказахстанский фестиваль",
          description: "Грандиозный фестиваль космических технологий и инноваций для участников всех возрастов",
          status: "Скоро",
          deadline: "",
          ages: "7-18 лет"
        },
        satelliteLaunch: {
          title: "Satellite Launch 2026",
          category: "Космическое соревнование",
          description: "Международное соревнование по запуску спутников с возможностью реального запуска проектов",
          status: "Скоро",
          deadline: "",
          ages: "14-18 лет"
        },
        spaceSettlement: {
          title: "Space Settlement 2025",
          category: "Проектирование поселений",
          description: "Создайте проект космического поселения будущего с командой единомышленников",
          status: "Регистрация",
          deadline: "20 апреля 2025", 
          ages: "12-18 лет"
        },
        aiChallenge: {
          title: "Space AI 2026",
          category: "Искусственный интеллект",
          description: "Разработайте AI-решения для космических задач и исследований",
          status: "В разработке",
          deadline: "",
          ages: "16-25 лет"
        },
        driveCompetition: {
          title: "DRIVE Competition",
          category: "Инженерные решения",
          description: "Создайте инновационные транспортные решения для космических миссий",
          status: "В разработке", 
          deadline: "",
          ages: "14-20 лет"
        },
        droneCompetition: {
          title: "Drone Football",
          category: "Беспилотники",
          description: "Команды управляют дронами в защитных сферах и соревнуются на специальной арене, забивая голы в полете.",
          status: "Скоро",
          deadline: "", 
          ages: "12-18 лет"
        }
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
      form: {
        applicationTitle: 'Competition Application',
        breadcrumbCompetitions: 'Competitions',
        breadcrumbApplication: 'Application',
        statusLabel: 'Status:',
        competitionNotFound: 'Competition not found. Return to',
        registrationNotOpen: 'Registration for this competition is not yet open.',
        teamName: 'Team Name',
        teamCaptain: 'Team Captain',
        teamParticipants: 'Team Participants',
        participant1: 'Participant 1',
        participant2Title: 'Participant 2',
        participant3Title: 'Participant 3',
        mentor: 'Mentor',
        fullName: 'Full Name',
        fullNamePlaceholder: 'Enter full name',
        iin: 'IIN',
        iinPlaceholder: '123456789012',
        phone: 'Phone',
        phonePlaceholder: '+7 777 123 45 67',
        school: 'School/University',
        schoolPlaceholder: 'Educational institution name',
        city: 'City',
        cityPlaceholder: 'Enter city',
        grade: 'Grade/Course',
        gradePlaceholder: 'For example: 10 or 2nd year',
        telegramPlaceholder: '@username',
        source: 'How did you learn about the competition?',
        sourceInstagramKaz: 'Instagram @aeroo.kz',
        sourceInstagramOther: 'Instagram (other accounts)',
        sourceTelegram: 'Telegram',
        sourceFriends: 'From friends',
        sourceOther: 'Other',
        questions: 'Questions or comments',
        questionsPlaceholder: 'Your questions for the organizers...',
        consent: 'Consent to rules and privacy policy',
        submit: 'Submit Application',
        submitting: 'Submitting...',
        toastConsentRequired: 'Consent required',
        toastConsentDescription: 'Please confirm consent to the rules',
        toastSubmitError: 'Submission error',
        toastSubmitSuccess: 'Application successfully submitted!',
        duplicateRegistration: 'You are already registered for this competition'
      },
      enroll: {
        title: 'Competition Registration',
        competition: 'Competition',
        status: 'Status',
        personalInfo: 'Personal Information',
        teamInfo: 'Team Information',
        teamName: 'Team Name',
        teamNamePlaceholder: 'For example: AEROO Crew',
        captain: 'Team Captain',
        captainFullName: 'Captain Full Name',
        captainFullNamePlaceholder: 'John Smith',
        captainPhone: 'Captain Phone',
        captainPhonePlaceholder: '+7 (xxx) xxx-xx-xx',
        captainAge: 'Captain Age',
        captainAgePlaceholder: '18',
        city: 'City',
        cityPlaceholder: 'Your city',
        studyPlace: 'Study Place',
        studyPlacePlaceholder: 'Educational institution name',
        participant: 'Participant',
        participantName: 'Participant Full Name',
        participantNamePlaceholder: 'Enter participant full name',
        addParticipant: 'Add Participant',
        removeParticipant: 'Remove Participant',
        source: 'How did you learn about the competition?',
        selectSource: 'Select source',
        consent: 'I have read the regulations and agree to the privacy policy',
        submit: 'Confirm Participation',
        sending: 'Sending...',
        sourceInstagramKaz: 'Instagram (@aeroo.space)',
        sourceInstagramOther: 'Instagram (other accounts)',
        sourceTelegram: 'Telegram',
        sourceFriends: 'From friends',
        sourceOther: 'Other'
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
        },
        testimonials: {
          title: 'Отзывы о AEROO',
          subtitle: 'Что говорят о нас директора школ, учителя, участники и победители соревнований',
          types: {
            director: 'Директор',
            teacher: 'Учитель', 
            participant: 'Участник',
            winner: 'Победитель'
          },
          items: {
            0: {
              text: 'AEROO полностью изменил подход к изучению физики и технологий в нашей школе. Ученики стали более заинтересованными и мотивированными.',
              author: 'Алмагуль Нурбекова',
              position: 'Директор НИШ г. Алматы'
            },
            1: {
              text: 'Образовательные наборы AEROO помогают объяснить сложные концепции аэродинамики простым и понятным способом. Результаты учеников значительно улучшились.',
              author: 'Дмитрий Петров',
              position: 'Учитель физики, Лицей №165'
            },
            2: {
              text: 'Победа в соревновании Space Settlement дала мне уверенность в выборе будущей профессии. Теперь я изучаю аэрокосмическую инженерию в университете.',
              author: 'Айжан Касымова',
              position: 'Победительница Space Settlement 2024'
            },
            3: {
              text: 'Участие в проектах AEROO научило меня работать в команде и решать реальные инженерные задачи. Это бесценный опыт!',
              author: 'Арман Турсунов',
              position: 'Участник CanSat Competition'
            },
            4: {
              text: 'Наборы CubeSat позволяют студентам получить практический опыт работы с настоящими спутниковыми технологиями. Это будущее образования!',
              author: 'Светлана Ким',
              position: 'Преподаватель КазНТУ'
            },
            5: {
              text: 'Благодаря сотрудничеству с AEROO мы смогли организовать современную лабораторию робототехники. Качество оборудования превосходное.',
              author: 'Ержан Мусабеков',
              position: 'Директор IT-лицея'
            }
          },
          cta: {
            text: 'Присоединяйтесь к тысячам довольных участников и педагогов',
            competitions: 'Участвовать в соревнованиях',
            products: 'Заказать наборы'
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
            title: 'Платформа',
            links: ['Соревнования', 'Курсы', 'Продукты', 'О нас', 'Карьера']
          },
          {
            title: 'Поддержка',
            links: ['Контакты', 'FAQ', 'Техподдержка', 'Сообщество']
          },
          {
            title: 'Документы',
            links: ['Политика конфиденциальности', 'Пользовательское соглашение', 'Правила соревнований']
          }
        ],
        bottom: {
          rights: 'Все права защищены.',
          privacy: 'Конфиденциальность',
          terms: 'Условия использования',
          cookies: 'Cookies'
        }
      },
      careers: {
        metaTitle: 'Карьера в AEROO — Присоединяйтесь к нашей команде',
        metaDescription: 'Ищете работу в инновационной аэрокосмической компании? Присоединяйтесь к команде AEROO. Открытые вакансии для инженеров и менеджеров.',
        hero: {
          title: 'Карьера в AEROO',
          subtitle: 'Присоединяйтесь к нашей инновационной команде и помогайте формировать будущее аэрокосмического образования'
        },
        join: {
          title: 'Хотите работать с нами?',
          description: 'Если вы хотите работать в нашей инновационной компании и развивать аэрокосмические технологии, отправьте свое резюме на нашу электронную почту.',
          button: 'Отправить резюме'
        },
        positions: {
          title: 'Открытые позиции',
          0: {
            title: 'Hardware Engineer',
            description: 'Разработка и тестирование аэрокосмических систем',
            requirements: {
              0: 'Опыт работы с микроконтроллерами',
              1: 'Знание схемотехники',
              2: 'Опыт проектирования PCB'
            }
          },
          1: {
            title: 'Software Engineer',
            description: 'Разработка программного обеспечения для образовательной платформы',
            requirements: {
              0: 'React/TypeScript',
              1: 'Python/C++',
              2: 'Опыт работы с API'
            }
          },
          2: {
            title: 'Project Manager',
            description: 'Управление проектами и координация команды',
            requirements: {
              0: 'Опыт управления проектами',
              1: 'Знание Agile/Scrum',
              2: 'Коммуникативные навыки'
            }
          }
        },
        requirements: 'Требования:',
        culture: {
          title: 'Почему AEROO?',
          innovation: {
            title: 'Инновации',
            text: 'Работайте с передовыми технологиями в области аэрокосмоса и образования'
          },
          impact: {
            title: 'Влияние',
            text: 'Помогайте формировать будущее поколение инженеров и исследователей'
          },
          growth: {
            title: 'Развитие',
            text: 'Непрерывное обучение и профессиональный рост в динамичной среде'
          },
          team: {
            title: 'Команда',
            text: 'Работайте с passionate командой профессионалов из разных областей'
          }
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
      },
      about: {
        metaTitle: 'О AEROO — миссия и команда',
        metaDesc: 'Образовательная экосистема AEROO: миссия, ценности, команда и партнёры',
        heroTitle: 'О AEROO',
        heroSubtitle: 'Мы вдохновляем и обучаем новое поколение создателей, развивая навыки, командную работу и системное мышление в области аэрокосмических технологий.',
        missionTitle: 'Наша миссия',
        missionText: 'Создать образовательную экосистему, которая объединяет школьников, студентов и молодых инженеров вокруг передовых технологий. Мы стремимся сделать аэрокосмические знания доступными каждому талантливому человеку.',
        valuesTitle: 'Наши ценности',
        values: {
          innovation: 'Инновации и технологическое превосходство',
          openness: 'Открытость и доступность образования',
          teamwork: 'Командная работа и взаимопомощь',
          excellence: 'Стремление к совершенству'
        },
        achievementsTitle: 'Наши достижения',
        achievements: {
          participants: 'участников',
          events: 'мероприятий',
          countries: 'страны'
        },
        teamTitle: 'Наша команда',
        teamMembers: {
          mirasName: 'Мирас Нусупов',
          ryspayName: 'Рыспай Алихан'
        },
        partnersTitle: 'Наши партнёры',
        becomePartner: 'Стать партнёром',
        leadTitle: 'Свяжитесь с нами',
        leadRequired: 'Заполните имя и email',
        leadSuccess: 'Спасибо! Мы свяжемся с вами в ближайшее время.',
        formName: 'Имя',
        formPhone: 'Телефон',
        formMessage: 'Сообщение',
        sendMessage: 'Отправить',
        privacyNote: 'Отправляя форму, вы соглашаетесь с политикой конфиденциальности.'
      },
      contacts: {
        metaTitle: 'Контакты — AEROO',
        metaDesc: 'Свяжитесь с AEROO: email, телефон, Instagram, Telegram и WhatsApp.',
        title: 'Контакты AEROO',
        subtitle: 'Мы на связи: выберите удобный способ и свяжитесь с нашей командой.',
        phone: 'Телефон',
        telegram: 'Сообщество AEROO',
        location: 'Локация'
      },
      terms: {
        metaTitle: 'Пользовательское соглашение — AEROO',
        metaDesc: 'Правила использования платформы AEROO',
        title: 'Пользовательское соглашение',
        subtitle: 'Правила использования платформы AEROO.',
        content: {
          general: {
            title: '1. ОБЩИЕ ПОЛОЖЕНИЯ',
            point1: '1.1. Настоящее Пользовательское соглашение (далее – Соглашение) регулирует отношения между Товариществом с ограниченной ответственностью "AEROO" (далее – Компания) и Пользователем при использовании сайта, расположенного по адресу: aeroo.space, и всех его поддоменов (далее – Сайт).',
            point2: '1.2. Использование Сайта означает полное согласие Пользователя с настоящим Соглашением.',
            point3: '1.3. Компания оставляет за собой право вносить изменения в настоящее Соглашение без уведомления Пользователя. Новая редакция вступает в силу с момента ее публикации на Сайте.',
            point4: '1.4. Пользователь обязуется самостоятельно отслеживать изменения в настоящем Соглашении.'
          },
          definitions: {
            title: '2. ОПРЕДЕЛЕНИЯ ТЕРМИНОВ',
            intro: '2.1. Перечисленные ниже термины, используемые в настоящем Соглашении, означают:',
            site: '2.1.1. Сайт – совокупность веб-страниц, расположенных на доменном имени aeroo.space и его поддоменах, предназначенных для информирования, предоставления услуг и взаимодействия с Пользователями.',
            admin: '2.1.2. Администрация – сотрудники Компании, уполномоченные управлять Сайтом.',
            user: '2.1.3. Пользователь – физическое или юридическое лицо, получившее доступ к Сайту посредством сети Интернет.',
            content: '2.1.4. Содержание – охраняемые результаты интеллектуальной деятельности, включая текстовые, графические, фото- и видеоматериалы, логотипы, программное обеспечение и другие объекты интеллектуальной собственности, размещенные на Сайте.'
          }
        }
      },
      privacy: {
        metaTitle: 'Политика конфиденциальности — AEROO',
        metaDesc: 'Как мы собираем и обрабатываем ваши данные',
        title: 'Политика конфиденциальности',
        subtitle: 'Порядок сбора, обработки, хранения, использования и защиты персональной информации пользователей.',
        content: {
          intro: 'Настоящая Политика конфиденциальности (далее — Политика) регулирует порядок сбора, обработки, хранения, использования и защиты персональной информации пользователей сайта https://www.aeroo.space/ (далее — Сайт).',
          description: 'Сайт предоставляет возможность регистрации для участия в образовательных курсах, соревнованиях, мероприятиях, а также для получения информационных материалов. Администратором данных выступает ТОО «AEROO» (далее — Компания).',
          agreement: 'Используя Сайт, Пользователь подтверждает свое согласие с условиями настоящей Политики. Если Пользователь не согласен с условиями, он обязан прекратить использование Сайта.'
        }
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
        archiveDesc: 'View results of past competitions and participant projects',
        archiveBtn: 'View Archive',
        openRegistration: 'Registration',
        pendingRegistration: 'Coming Soon',
        registrationClosed: 'Closed',
        aerooFest: {
          title: "AEROO Fest 2026",
          category: "National Festival",
          description: "A grand festival of space technologies and innovations for participants of all ages",
          status: "Coming Soon",
          deadline: "",
          ages: "7-18 years"
        },
        satelliteLaunch: {
          title: "Satellite Launch 2026",
          category: "Space Competition",
          description: "International satellite launch competition with possibility of real project launches",
          status: "Coming Soon",
          deadline: "",
          ages: "14-18 years"
        },
        spaceSettlement: {
          title: "Space Settlement 2025",
          category: "Settlement Design",
          description: "Create a future space settlement project with a team of like-minded individuals",
          status: "Registration",
          deadline: "April 20, 2025", 
          ages: "12-18 years"
        },
        aiChallenge: {
          title: "Space AI 2026",
          category: "Artificial Intelligence",
          description: "Develop AI solutions for space tasks and research",
          status: "In Development",
          deadline: "",
          ages: "16-25 years"
        },
        driveCompetition: {
          title: "DRIVE Competition",
          category: "Engineering Solutions",
          description: "Create innovative transportation solutions for space missions",
          status: "In Development", 
          deadline: "",
          ages: "14-20 years"
        },
        droneCompetition: {
          title: "Drone Football",
          category: "Drones",
          description: "Teams control drones in protective spheres and compete in a special arena, scoring goals in flight.",
          status: "Coming Soon",
          deadline: "", 
          ages: "12-18 years"
        }
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
            title: 'Platform',
            links: ['Competitions', 'Courses', 'Products', 'About', 'Careers']
          },
          {
            title: 'Support',
            links: ['Contacts', 'FAQ', 'Tech Support', 'Community']
          },
          {
            title: 'Documents',
            links: ['Privacy Policy', 'Terms of Use', 'Competition Rules']
          }
        ],
        bottom: {
          rights: 'All rights reserved.',
          privacy: 'Privacy',
          terms: 'Terms of Use',
          cookies: 'Cookies'
        }
      },
      careers: {
        metaTitle: 'Careers at AEROO — Join our team',
        metaDescription: 'Looking for a job in an innovative aerospace company? Join the AEROO team. Open positions for engineers and managers.',
        hero: {
          title: 'Careers at AEROO',
          subtitle: 'Join our innovative team and help shape the future of aerospace education'
        },
        join: {
          title: 'Want to work with us?',
          description: 'If you want to work in our innovative company and develop aerospace technologies, send your resume to our email.',
          button: 'Send Resume'
        },
        positions: {
          title: 'Open Positions',
          0: {
            title: 'Hardware Engineer',
            description: 'Development and testing of aerospace systems',
            requirements: {
              0: 'Experience with microcontrollers',
              1: 'Knowledge of circuit design',
              2: 'PCB design experience'
            }
          },
          1: {
            title: 'Software Engineer',
            description: 'Software development for educational platform',
            requirements: {
              0: 'React/TypeScript',
              1: 'Python/C++',
              2: 'API experience'
            }
          },
          2: {
            title: 'Project Manager',
            description: 'Project management and team coordination',
            requirements: {
              0: 'Project management experience',
              1: 'Agile/Scrum knowledge',
              2: 'Communication skills'
            }
          }
        },
        requirements: 'Requirements:',
        culture: {
          title: 'Why AEROO?',
          innovation: {
            title: 'Innovation',
            text: 'Work with cutting-edge technologies in aerospace and education'
          },
          impact: {
            title: 'Impact',
            text: 'Help shape the future generation of engineers and researchers'
          },
          growth: {
            title: 'Growth',
            text: 'Continuous learning and professional development in a dynamic environment'
          },
          team: {
            title: 'Team',
            text: 'Work with a passionate team of professionals from different fields'
          }
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
        },
        testimonials: {
          title: 'AEROO Reviews',
          subtitle: 'What school directors, teachers, participants and competition winners say about us',
          types: {
            director: 'Director',
            teacher: 'Teacher',
            participant: 'Participant', 
            winner: 'Winner'
          },
          items: {
            0: {
              text: 'AEROO has completely transformed the approach to studying physics and technology in our school. Students have become more interested and motivated.',
              author: 'Almagul Nurbekova',
              position: 'Director of NIS Almaty'
            },
            1: {
              text: 'AEROO educational kits help explain complex aerodynamics concepts in a simple and understandable way. Student results have improved significantly.',
              author: 'Dmitry Petrov',
              position: 'Physics Teacher, Lyceum #165'
            },
            2: {
              text: 'Winning the Space Settlement competition gave me confidence in choosing my future profession. Now I study aerospace engineering at university.',
              author: 'Aizhan Kasymova',
              position: 'Space Settlement 2024 Winner'
            },
            3: {
              text: 'Participating in AEROO projects taught me to work in a team and solve real engineering problems. This is invaluable experience!',
              author: 'Arman Tursunov',
              position: 'CanSat Competition Participant'
            },
            4: {
              text: 'CubeSat kits allow students to gain practical experience with real satellite technologies. This is the future of education!',
              author: 'Svetlana Kim',
              position: 'KazNTU Professor'
            },
            5: {
              text: 'Thanks to cooperation with AEROO, we were able to organize a modern robotics laboratory. The quality of equipment is excellent.',
              author: 'Yerzhan Musabekov',
              position: 'IT Lyceum Director'
            }
          },
          cta: {
            text: 'Join thousands of satisfied participants and educators',
            competitions: 'Participate in competitions',
            products: 'Order kits'
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
      },
      about: {
        metaTitle: 'About AEROO — mission and team',
        metaDesc: 'AEROO educational ecosystem: mission, values, team and partners',
        heroTitle: 'About AEROO',
        heroSubtitle: 'We inspire and educate the new generation of creators, developing skills, teamwork and systems thinking in aerospace technologies.',
        missionTitle: 'Our mission',
        missionText: 'Create an educational ecosystem that unites school students, university students and young engineers around advanced technologies. We strive to make aerospace knowledge accessible to every talented person.',
        valuesTitle: 'Our values',
        values: {
          innovation: 'Innovation and technological excellence',
          openness: 'Openness and accessibility of education',
          teamwork: 'Teamwork and mutual assistance',
          excellence: 'Pursuit of excellence'
        },
        achievementsTitle: 'Our achievements',
        achievements: {
          participants: 'participants',
          events: 'events',
          countries: 'countries'
        },
        teamTitle: 'Our team',
        teamMembers: {
          mirasName: 'Miras Nussupov',
          ryspayName: 'Ryspay Alikhan'
        },
        partnersTitle: 'Our partners',
        becomePartner: 'Become a partner',
        leadTitle: 'Contact us',
        leadRequired: 'Please fill in name and email',
        leadSuccess: 'Thank you! We will contact you soon.',
        formName: 'Name',
        formPhone: 'Phone',
        formMessage: 'Message',
        sendMessage: 'Send',
        privacyNote: 'By submitting the form, you agree to the privacy policy.'
      },
      contacts: {
        metaTitle: 'Contacts — AEROO',
        metaDesc: 'Contact AEROO: email, phone, Instagram, Telegram and WhatsApp.',
        title: 'AEROO Contacts',
        subtitle: 'We are in touch: choose a convenient way and contact our team.',
        phone: 'Phone',
        telegram: 'AEROO Community',
        location: 'Location'
      },
      terms: {
        metaTitle: 'Terms of Service — AEROO',
        metaDesc: 'AEROO platform usage rules',
        title: 'Terms of Service',
        subtitle: 'AEROO platform usage rules.',
        content: {
          general: {
            title: '1. GENERAL PROVISIONS',
            point1: '1.1. These Terms of Service (hereinafter referred to as the Agreement) govern the relationship between Limited Liability Partnership "AEROO" (hereinafter referred to as the Company) and the User when using the website located at: aeroo.space, and all its subdomains (hereinafter referred to as the Site).',
            point2: '1.2. Use of the Site means full agreement of the User with this Agreement.',
            point3: '1.3. The Company reserves the right to make changes to this Agreement without notifying the User. The new version comes into effect from the moment of its publication on the Site.',
            point4: '1.4. The User undertakes to independently monitor changes in this Agreement.'
          },
          definitions: {
            title: '2. DEFINITIONS OF TERMS',
            intro: '2.1. The terms listed below, used in this Agreement, mean:',
            site: '2.1.1. Site – a set of web pages located on the domain name aeroo.space and its subdomains, designed to inform, provide services and interact with Users.',
            admin: '2.1.2. Administration – Company employees authorized to manage the Site.',
            user: '2.1.3. User – an individual or legal entity that has gained access to the Site via the Internet.',
            content: '2.1.4. Content – protected results of intellectual activity, including text, graphic, photo and video materials, logos, software and other intellectual property objects posted on the Site.'
          }
        }
      },
      privacy: {
        metaTitle: 'Privacy Policy — AEROO',
        metaDesc: 'How we collect and process your data',
        title: 'Privacy Policy',
        subtitle: 'The procedure for collecting, processing, storing, using and protecting personal information of users.',
        content: {
          intro: 'This Privacy Policy (hereinafter — the Policy) governs the collection, processing, storage, use, and protection of personal information of users of the website https://www.aeroo.space/ (hereinafter — the Website).',
          description: 'The Website provides the opportunity to register for participation in educational courses, competitions, events, as well as to receive informational materials. The data controller is LLP "AEROO" (hereinafter — the Company).',
          agreement: 'By using the Website, the User confirms their consent to the terms of this Policy. If the User does not agree with the terms, they must stop using the Website.',
          section1: {
            title: '1. Personal Information of Users',
            subtitle1: '1.1. Collected information',
            intro1: 'The Company collects the following categories of personal data:',
            identification: 'Identification data: first name, last name, age (to verify eligibility for age categories);',
            contact: 'Contact data: phone number, email address;',
            educational: 'Educational data: place of study, grade or course of study, achievements;',
            technical: 'Technical data: IP address, browser type, information about the user\'s device.',
            subtitle2: '1.2. Data sources',
            sources: 'The data is provided voluntarily by the User during registration on the Website, when filling out forms, or submitting applications to participate in events or courses.',
            subtitle3: '1.3. Cookies and technical information',
            cookies: 'The Website may automatically collect technical information using cookies. This data is used for traffic analysis, optimization of the Website, and improving user experience.',
            subtitle4: '1.4. Processing of minors\' data',
            minors: 'If the User is under 18 years old, registration is possible only with the consent of parents or legal guardians.'
          },
          section2: {
            title: '2. Purposes of Processing Personal Information',
            intro: 'The personal information of Users is processed for the following purposes:',
            purpose1: 'Registration for educational courses, competitions, and events organized by the Company;',
            purpose2: 'Organization of the learning process, distribution of materials, and management of access to educational resources;',
            purpose3: 'Informing about participation conditions, updates, and schedule changes of events;',
            purpose4: 'Preparation of certificates, diplomas, and other confirming documents;',
            purpose5: 'Conducting statistical and analytical research to improve the quality of services provided;',
            purpose6: 'Informing about new events, courses, and promotions of the Company (subject to the User\'s consent).'
          },
          section3: {
            title: '3. Conditions of Processing Personal Information',
            subtitle1: '3.1. User consent',
            consent: 'The processing of personal data is carried out only based on the voluntary consent of the User, expressed by filling out registration forms on the Website.',
            subtitle2: '3.2. Data transfer',
            transferIntro: 'The Company may transfer personal data to third parties in the following cases:',
            transfer1: 'To fulfill obligations (for example, to partners providing educational resources or organizing events);',
            transfer2: 'With the explicit consent of the User;',
            transfer3: 'In cases provided for by the legislation of the Republic of Kazakhstan (e.g., at the request of government authorities).',
            subtitle3: '3.3. Data storage',
            storage: 'Users\' personal information is stored for the period necessary to achieve the purposes of processing, but not longer than 5 years after the completion of events, unless a longer storage period is required by law.',
            subtitle4: '3.4. Data deletion',
            deletion: 'The User has the right to request the deletion of their data by sending a request to the Company\'s email: info@aeroo.space.'
          },
          section4: {
            title: '4. Protection of Personal Information',
            subtitle1: '4.1. Security measures',
            intro: 'The Company applies modern technical and organizational measures to protect personal data from:',
            measure1: 'Unauthorized access and alteration;',
            measure2: 'Loss, destruction, or leakage;',
            measure3: 'Other unlawful actions.',
            subtitle2: '4.2. Access to data',
            access: 'Access to personal information is granted only to authorized employees of the Company, who have received training in the field of personal data handling.',
            subtitle3: '4.3. Incident response',
            incident: 'In the event of a data breach or other security incident, the Company will notify Users and the competent authorities within the time frame established by law.'
          },
          section5: {
            title: '5. User Rights',
            subtitle: '5.1. The User has the right to:',
            right1: 'Obtain information about the purposes and methods of processing their data;',
            right2: 'Request a copy of their personal data processed by the Company;',
            right3: 'Require correction or deletion of their data;',
            right4: 'Withdraw consent to the processing of data;',
            right5: 'Restrict the use of their data within the framework of the law.',
            subtitle2: '5.2. Requests',
            requests: 'To exercise these rights, the User may send a request to info@aeroo.space. The request will be processed within 30 business days.'
          },
          section6: {
            title: '6. Dispute Resolution',
            subtitle1: '6.1. Pre-trial settlement',
            pretrial: 'All disputes arising in connection with the processing of personal data shall be resolved in a pre-trial procedure.',
            subtitle2: '6.2. Court jurisdiction',
            court: 'If it is not possible to resolve the dispute in a pre-trial procedure, it shall be submitted to the court at the place of registration of the Company in accordance with the legislation of the Republic of Kazakhstan.'
          },
          section7: {
            title: '7. Changes and Amendments',
            subtitle1: '7.1. Updates',
            updates: 'The Company has the right to amend this Policy. The current version of the Policy is available at: https://www.aeroo.space/policy/.',
            subtitle2: '7.2. Effective date',
            effective: 'The new version of the Policy comes into force from the moment of its publication, unless otherwise provided by the Policy or legislation.',
            subtitle3: '7.3. Notifications',
            notifications: 'The Company notifies Users of significant changes to the Policy by publishing a notice on the Website or by sending informational emails to the Users\' contact details.'
          }
        }
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
        archiveDesc: 'Өткен сайыстардың нәтижелері мен қатысушылардың жұмыстарын қараңыз',
        archiveBtn: 'Мұрағатты қарау',
        openRegistration: 'Тіркелу',
        pendingRegistration: 'Жақында',
        registrationClosed: 'Жабық',
        aerooFest: {
          title: "AEROO Fest 2026",
          category: "Ұлттық фестиваль",
          description: "Барлық жас ерекшелігіндегі қатысушыларға арналған ғарыштық технологиялар мен инновациялардың керемет фестивалі",
          status: "Жақында",
          deadline: "",
          ages: "7-18 жас"
        },
        satelliteLaunch: {
          title: "Satellite Launch 2026",
          category: "Ғарыштық сайыс",
          description: "Жобаларды нақты іске қосу мүмкіндігімен халықаралық серіктерді іске қосу сайысы",
          status: "Жақында",
          deadline: "",
          ages: "14-18 жас"
        },
        spaceSettlement: {
          title: "Space Settlement 2025",
          category: "Қоныстарды жобалау",
          description: "Ұқсас көзқарасты ұстанатын адамдар командасымен болашақ ғарыштық қоныс жобасын жасаңыз",
          status: "Тіркелу",
          deadline: "20 сәуір 2025", 
          ages: "12-18 жас"
        },
        aiChallenge: {
          title: "Space AI 2026",
          category: "Жасанды интеллект",
          description: "Ғарыштық тапсырмалар мен зерттеулерге арналған AI шешімдерін әзірлеңіз",
          status: "Әзірлеуде",
          deadline: "",
          ages: "16-25 жас"
        },
        driveCompetition: {
          title: "DRIVE Competition",
          category: "Инженерлік шешімдер",
          description: "Ғарыштық миссияларға арналған инновациялық көлік шешімдерін жасаңыз",
          status: "Әзірлеуде", 
          deadline: "",
          ages: "14-20 жас"
        },
        droneCompetition: {
          title: "Drone Football",
          category: "Дронтар",
          description: "Командалар қорғаныш сфераларда дронтарды басқарады және арнайы аренада ұшып жүріп гол соғуға сайысады.",
          status: "Жақында",
          deadline: "", 
          ages: "12-18 жас"
        }
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
      form: {
        applicationTitle: 'Сайысқа қатысу өтініші',
        breadcrumbCompetitions: 'Сайыстар',
        breadcrumbApplication: 'Өтініш',
        statusLabel: 'Күйі:',
        competitionNotFound: 'Сайыс табылмады. Қайта оралыңыз',
        registrationNotOpen: 'Бұл сайысқа тіркелу әлі ашылмаған.',
        teamName: 'Команда атауы',
        teamCaptain: 'Команда капитаны',
        teamParticipants: 'Команда қатысушылары',
        participant1: 'Қатысушы 1',
        participant2Title: 'Қатысушы 2',
        participant3Title: 'Қатысушы 3',
        mentor: 'Дайындаушы',
        fullName: 'Аты-жөні',
        fullNamePlaceholder: 'Толық атын енгізіңіз',
        iin: 'ЖСН',
        iinPlaceholder: '123456789012',
        phone: 'Телефон',
        phonePlaceholder: '+7 777 123 45 67',
        school: 'Мектеп/Университет',
        schoolPlaceholder: 'Білім беру мекемесінің атауы',
        city: 'Қала',
        cityPlaceholder: 'Қаланы енгізіңіз',
        grade: 'Сынып/Курс',
        gradePlaceholder: 'Мысалы: 10 немесе 2 курс',
        telegramPlaceholder: '@username',
        source: 'Сайыс туралы қайдан білдіңіз?',
        sourceInstagramKaz: 'Instagram @aeroo.kz',
        sourceInstagramOther: 'Instagram (басқа аккаунттар)',
        sourceTelegram: 'Telegram',
        sourceFriends: 'Таныстардан',
        sourceOther: 'Басқа',
        questions: 'Сұрақтар немесе пікірлер',
        questionsPlaceholder: 'Ұйымдастырушыларға сұрақтарыңыз...',
        consent: 'Ережелермен және құпиялылық саясатымен келісу',
        submit: 'Өтініш беру',
        submitting: 'Жіберілуде...',
        toastConsentRequired: 'Келісім қажет',
        toastConsentDescription: 'Ережелермен келісіміңізді растаңыз',
        toastSubmitError: 'Жіберу қатесі',
        toastSubmitSuccess: 'Өтініш сәтті жіберілді!',
        duplicateRegistration: 'Сіз бұл сайысқа қазірдің өзінде тіркелгенсіз'
      },
      enroll: {
        title: 'Сайысқа тіркелу',
        competition: 'Сайыс',
        status: 'Күйі',
        personalInfo: 'Жеке ақпарат',
        teamInfo: 'Команда туралы ақпарат',
        teamName: 'Команда атауы',
        teamNamePlaceholder: 'Мысалы: AEROO Crew',
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
            title: 'Платформа',
            links: ['Сайыстар', 'Курстар', 'Өнімдер', 'Біз туралы', 'Мансап']
          },
          {
            title: 'Қолдау',
            links: ['Байланыс', 'Жиі қойылатын сұрақтар', 'Техникалық қолдау', 'Қауымдастық']
          },
          {
            title: 'Құжаттар',
            links: ['Құпиялылық саясаты', 'Пайдалану шарттары', 'Сайыс ережелері']
          }
        ],
        bottom: {
          rights: 'Барлық құқықтар қорғалған.',
          privacy: 'Құпиялылық',
          terms: 'Пайдалану шарттары',
          cookies: 'Cookies'
        }
      },
      careers: {
        metaTitle: 'AEROO-да мансап — біздің командаға қосылыңыз',
        metaDescription: 'Инновациялық аэроғарыш компаниясында жұмыс іздеп жүрсіз бе? AEROO командасына қосылыңыз. Инженерлер мен менеджерлерге арналған ашық позициялар.',
        hero: {
          title: 'AEROO-да мансап',
          subtitle: 'Біздің инновациялық командаға қосылыңыз және аэроғарыштық білім берудің болашағын қалыптастыруға көмектесіңіз'
        },
        join: {
          title: 'Бізбен жұмыс істегіңіз келе ме?',
          description: 'Егер сіз біздің инновациялық компанияда жұмыс істегіңіз және аэроғарыштық технологияларды дамытқыңыз келсе, резюмеңізді біздің электрондық поштаға жіберіңіз.',
          button: 'Резюме жіберу'
        },
        positions: {
          title: 'Ашық позициялар',
          0: {
            title: 'Hardware Engineer',
            description: 'Аэроғарыштық жүйелерді дамыту және тестілеу',
            requirements: {
              0: 'Микроконтроллерлермен жұмыс тәжірибесі',
              1: 'Схемотехника білімі',
              2: 'PCB жобалау тәжірибесі'
            }
          },
          1: {
            title: 'Software Engineer',
            description: 'Білім беру платформасына арналған бағдарламалық қамтамасыз ету дамыту',
            requirements: {
              0: 'React/TypeScript',
              1: 'Python/C++',
              2: 'API тәжірибесі'
            }
          },
          2: {
            title: 'Project Manager',
            description: 'Жобаларды басқару және команданы үйлестіру',
            requirements: {
              0: 'Жобаларды басқару тәжірибесі',
              1: 'Agile/Scrum білімі',
              2: 'Коммуникациялық дағдылар'
            }
          }
        },
        requirements: 'Талаптар:',
        culture: {
          title: 'Неліктен AEROO?',
          innovation: {
            title: 'Инновациялар',
            text: 'Аэроғарыш және білім беру саласындағы озық технологиялармен жұмыс істеңіз'
          },
          impact: {
            title: 'Әсер ету',
            text: 'Инженерлер мен зерттеушілердің болашақ ұрпағын қалыптастыруға көмектесіңіз'
          },
          growth: {
            title: 'Өсу',
            text: 'Динамикалық ортада үздіксіз оқыту және кәсіби дамыту'
          },
          team: {
            title: 'Команда',
            text: 'Әртүрлі салалардан келген мамандардың құмарлы командасымен жұмыс істеңіз'
          }
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
        },
        testimonials: {
          title: 'AEROO туралы пікірлер',
          subtitle: 'Мектеп директорлары, мұғалімдер, қатысушылар мен сайыс жеңімпаздары біз туралы не дейді',
          types: {
            director: 'Директор',
            teacher: 'Мұғалім',
            participant: 'Қатысушы',
            winner: 'Жеңімпаз'
          },
          items: {
            0: {
              text: 'AEROO біздің мектептегі физика мен технологияларды зерттеу тәсілін толығымен өзгертті. Оқушылар қызығушылық пен уәждемелік танытады.',
              author: 'Алмагүл Нұрбекова',
              position: 'НЗМ Алматы қ. директоры'
            },
            1: {
              text: 'AEROO білім беру жиынтықтары аэродинамиканың күрделі тұжырымдамаларын қарапайым және түсінікті тәсілмен түсіндіруге көмектеседі. Оқушылардың нәтижелері айтарлықтай жақсарды.',
              author: 'Дмитрий Петров',
              position: 'Физика мұғалімі, №165 лицей'
            },
            2: {
              text: 'Space Settlement сайысындағы жеңіс маған болашақ мамандығымды таңдауда сенімділік берді. Қазір университетте аэроғарыш инженериясын оқып жатырмын.',
              author: 'Айжан Қасымова',
              position: 'Space Settlement 2024 жеңімпазы'
            },
            3: {
              text: 'AEROO жобаларына қатысу мені командада жұмыс істеуге және нақты инженерлік мәселелерді шешуге үйретті. Бұл бағасыз тәжірибе!',
              author: 'Арман Тұрсынов',
              position: 'CanSat Competition қатысушысы'
            },
            4: {
              text: 'CubeSat жиынтықтары студенттерге нақты серіктік технологиялармен практикалық тәжірибе алуға мүмкіндік береді. Бұл білім берудің болашағы!',
              author: 'Светлана Ким',
              position: 'ҚазҰТУ оқытушысы'
            },
            5: {
              text: 'AEROO-мен ынтымақтастық арқасында біз заманауи робототехника зертханасын ұйымдастыра алдық. Жабдықтың сапасы тамаша.',
              author: 'Ержан Мұсабеков',
              position: 'IT-лицей директоры'
            }
          },
          cta: {
            text: 'Мыңдаған қанағаттанған қатысушылар мен педагогтарға қосылыңыз',
            competitions: 'Сайыстарға қатысу',
            products: 'Жиынтықтар тапсырысы'
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
      },
      about: {
        metaTitle: 'AEROO туралы — миссия және команда',
        metaDesc: 'AEROO білім беру экожүйесі: миссия, құндылықтар, команда және серіктестер',
        heroTitle: 'AEROO туралы',
        heroSubtitle: 'Біз аэроғарыш технологиялары саласында дағдыларды, командалық жұмысты және жүйелік ойлауды дамыта отырып, жаңа буын жасаушыларын шабыттандырамыз және оқытамыз.',
        missionTitle: 'Біздің миссия',
        missionText: 'Мектеп оқушыларын, студенттерді және жас инженерлерді озық технологиялар айналасында біріктіретін білім беру экожүйесін құру. Біз аэроғарыш білімін әр талантты адамға қол жетімді ету үшін тырысамыз.',
        valuesTitle: 'Біздің құндылықтар',
        values: {
          innovation: 'Инновациялар және технологиялық үстемдік',
          openness: 'Білім берудің ашықтығы мен қол жетімділігі',
          teamwork: 'Командалық жұмыс және өзара көмек',
          excellence: 'Кемелдікке ұмтылу'
        },
        achievementsTitle: 'Біздің жетістіктер',
        achievements: {
          participants: 'қатысушы',
          events: 'іс-шара',
          countries: 'ел'
        },
        teamTitle: 'Біздің команда',
        teamMembers: {
          mirasName: 'Мирас Нусупов',
          ryspayName: 'Рыспай Алихан'
        },
        partnersTitle: 'Біздің серіктестер',
        becomePartner: 'Серіктес болу',
        leadTitle: 'Бізбен байланысыңыз',
        leadRequired: 'Атыңыз бен email-ді толтырыңыз',
        leadSuccess: 'Рахмет! Біз сізбен жақын арада байланысамыз.',
        formName: 'Аты',
        formPhone: 'Телефон',
        formMessage: 'Хабарлама',
        sendMessage: 'Жіберу',
        privacyNote: 'Форманы жібере отырып, сіз құпиялылық саясатымен келісесіз.'
      },
      contacts: {
        metaTitle: 'Байланыс — AEROO',
        metaDesc: 'AEROO-мен байланысыңыз: email, телефон, Instagram, Telegram және WhatsApp.',
        title: 'AEROO байланыс',
        subtitle: 'Біз байланыстамыз: ыңғайлы тәсілді таңдап, біздің командамен хабарласыңыз.',
        phone: 'Телефон',
        telegram: 'AEROO қауымдастығы',
        location: 'Орналасуы'
      },
      terms: {
        metaTitle: 'Пайдаланушы келісімі — AEROO',
        metaDesc: 'AEROO платформасын пайдалану ережелері',
        title: 'Пайдаланушы келісімі',
        subtitle: 'AEROO платформасын пайдалану ережелері.',
        content: {
          general: {
            title: '1. ЖАЛПЫ ЕРЕЖЕЛЕР',
            point1: '1.1. Осы Пайдаланушы келісімі (бұдан әрі – Келісім) "AEROO" жауапкершілігі шектеулі серіктестігі (бұдан әрі – Компания) мен Пайдаланушы арасындағы қатынастарды aeroo.space мекенжайында орналасқан сайтты және оның барлық субдомендерін (бұдан әрі – Сайт) пайдалану кезінде реттейді.',
            point2: '1.2. Сайтты пайдалану Пайдаланушының осы Келісіммен толық келісуін білдіреді.',
            point3: '1.3. Компания Пайдаланушыны хабардар етпестен осы Келісімге өзгерістер енгізу құқығын өзінде қалдырады. Жаңа редакция Сайтта жарияланған сәттен бастап күшіне енеді.',
            point4: '1.4. Пайдаланушы осы Келісімдегі өзгерістерді дербес қадағалауға міндеттенеді.'
          },
          definitions: {
            title: '2. ТЕРМИНДЕРДІҢ АНЫҚТАМАЛАРЫ',
            intro: '2.1. Төменде көрсетілген, осы Келісімде қолданылатын терминдер мынаны білдіреді:',
            site: '2.1.1. Сайт – aeroo.space домен атауында және оның субдомендерінде орналасқан, Пайдаланушыларды ақпараттандыру, қызмет көрсету және олармен өзара әрекеттесу үшін арналған веб-беттердің жиынтығы.',
            admin: '2.1.2. Әкімшілік – Сайтты басқаруға уәкілеттік берілген Компания қызметкерлері.',
            user: '2.1.3. Пайдаланушы – Интернет желісі арқылы Сайтқа қол жеткізген жеке немесе заңды тұлға.',
            content: '2.1.4. Мазмұн – Сайтта орналастырылған мәтіндік, графикалық, фото және видео материалдар, логотиптер, бағдарламалық қамтамасыз ету және зияткерлік меншіктің басқа объектілерін қоса алғанда, зияткерлік қызметтің қорғалатын нәтижелері.'
          }
        }
      },
      privacy: {
        metaTitle: 'Құпиялылық саясаты — AEROO',
        metaDesc: 'Біз сіздің деректеріңізді қалай жинайтындығымыз және өңдейтіндігіміз',
        title: 'Құпиялылық саясаты',
        subtitle: 'Пайдаланушылардың жеке ақпаратын жинау, өңдеу, сақтау, пайдалану және қорғау тәртібі.',
        content: {
          intro: 'Осы Құпиялылық саясаты (бұдан әрі — Саясат) https://www.aeroo.space/ сайтының (бұдан әрі — Сайт) пайдаланушыларының жеке ақпаратын жинау, өңдеу, сақтау, пайдалану және қорғау тәртібін реттейді.',
          description: 'Сайт білім беру курстарына, сайыстарға, іс-шараларға қатысуға тіркелу, сондай-ақ ақпараттық материалдарды алу мүмкіндігін ұсынады. Деректер әкімшісі "AEROO" ЖШС болып табылады (бұдан әрі — Компания).',
          agreement: 'Сайтты пайдалана отырып, Пайдаланушы осы Саясаттың шарттарымен келісетінін растайды. Егер Пайдаланушы шарттармен келіспесе, ол Сайтты пайдалануды тоқтатуға міндетті.'
        }
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