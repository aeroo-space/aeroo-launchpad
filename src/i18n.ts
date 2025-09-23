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
          deadline: "25 октября 2025", 
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
      spaceSettlement2025: {
        meta: {
          title: "AEROO Space Settlement Competition 2025 — онлайн-хакатон",
          description: "Онлайн-хакатон по проектированию космических поселений для школьников. Регистрация: 20.09–25.10.2025, хакатон: 28–29.10.2025."
        },
        hero: {
          title: "AEROO Space Settlement Competition 2025",
          subtitle: "Республиканский онлайн-хакатон по проектированию космических поселений",
          dates: "Регистрация до 25.10.2025 | Хакатон 28-29 октября 2025",
          participate: "Принять участие",
          learnMore: "Подробнее"
        },
        countdown: {
          title: "До окончания регистрации",
          deadline: "25 октября 2025, 23:59 GMT+5",
          days: "дней",
          hours: "часов",
          minutes: "минут",
          seconds: "секунд"
        },
        breadcrumbs: {
          home: "Главная",
          competitions: "Соревнования"
        },
        about: {
          title: "О соревновании",
          text1: "AEROO Space Settlement Competition 2025 — республиканский онлайн-хакатон научно-исследовательской и инженерной направленности для школьников.",
          text2: "Цель — развить навыки проектирования космических поселений, научного анализа и инженерного обоснования.",
          text3: "Лучшие участники войдут в сборную Казахстана для участия в международном конкурсе",
          nssLink: "NSS Space Settlement Contest"
        },
        rules: {
          title: "Положение о соревновании",
          description: "Подробная информация о правилах участия, критериях оценки и требованиях к проектам",
          button: "Открыть положение"
        },
        goals: {
          title: "Цели и задачи",
          items: [
            "Развитие инженерных и исследовательских компетенций школьников",
            "Разработка проектов космических поселений с научным и инженерным обоснованием",
            "Формирование сборной Казахстана для NSS Space Settlement Contest",
            "Популяризация аэрокосмических направлений",
            "Выявление и поддержка талантливых участников"
          ]
        },
        format: {
          title: "Формат и секции хакатона",
          junior: "Младшая лига: 7–9 классы",
          senior: "Старшая лига: 10–12 классы",
          task: "Задание: разработка научно-инженерного проекта по теме колонизации космоса (10–15 страниц)",
          duration: "Формат: онлайн, 36 часов на выполнение с момента публикации задания"
        },
        timeline: {
          title: "Ключевые даты",
          deadline: "25 октября 2025 (23:59 GMT+5) — дедлайн подачи заявки",
          hackathon: "28–29 Октября 2025 — хакатон (36 часов на выполнение задания)"
        },
        submission: {
          title: "Подача работ",
          description: "Все работы загружаются в электронном виде через платформу организаторов до установленного дедлайна. Плагиат запрещён."
        },
        awards: {
          title: "Награды",
          items: [
            "Денежные призы",
            "Гранты от Energo University",
            "Формирование сборной Казахстана для NSS Space Settlement Contest"
          ]
        },
        contacts: {
          title: "Контакты"
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
        no: 'Нет',
        learnMore: 'Узнать больше'
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
        applicationTitle: 'Заявка на участие',
        editApplication: 'Редактирование заявки',
        selectCompetition: 'Выберите соревнование',
        breadcrumbCompetitions: 'Соревнования',
        breadcrumbApplication: 'Заявка',
        statusLabel: 'Статус:',
        competitionNotFound: 'Соревнование не найдено. Вернуться к',
        registrationNotOpen: 'Регистрация на это соревнование пока не открыта.',
        teamName: 'Название команды',
        teamCaptain: 'Капитан команды',
        teamParticipants: 'Участники команды',
        participant1: 'Участник 1',
        participant2Title: 'Участник 2 (необязательно)',
        participant3Title: 'Участник 3 (необязательно)',
        participant4Title: 'Участник 4 (необязательно)',
        mentor: 'Наставник',
        fullName: 'ФИО',
        fullNamePlaceholder: 'Введите полное имя',
        iin: 'ИИН',
        iinPlaceholder: '123456789012',
        phone: 'Телефон',
        phonePlaceholder: '+7 777 123 45 67',
        school: 'Школа/Университет',
        schoolPlaceholder: 'Название учебного заведения',
        city: 'Город',
        cityPlaceholder: 'Введите город',
        grade: 'Класс/Курс',
        gradePlaceholder: 'Например: 10 или 2 курс',
        telegramPlaceholder: '@username',
        source: 'Как вы узнали о соревновании?',
        sourceInstagramKaz: 'Instagram @aeroo.kz',
        sourceInstagramOther: 'Instagram (другие аккаунты)',
        sourceTelegram: 'Telegram',
        sourceFriends: 'От друзей',
        sourceOther: 'Другое',
        questions: 'Вопросы или комментарии',
        questionsPlaceholder: 'Ваши вопросы организаторам...',
        consent: 'Согласие с правилами и политикой конфиденциальности',
        submit: 'Подать заявку',
        submitting: 'Отправка...',
        toastConsentRequired: 'Требуется согласие',
        toastConsentDescription: 'Пожалуйста, подтвердите согласие с правилами',
        toastSubmitError: 'Ошибка отправки',
        toastSubmitSuccess: 'Заявка успешно подана!',
        duplicateRegistration: 'Вы уже зарегистрированы на это соревнование',
        minOneParticipant: 'Необходимо заполнить данные хотя бы одного участника',
        enrollmentNotFound: 'Заявка не найдена или у вас нет доступа к ней',
        metaDescription: 'Заполните форму команды и подтвердите согласие',
        metaDescriptionGeneral: 'в соревнованиях AEROO',
        required: 'обязательно для заполнения',
        noDigits: 'не должно содержать цифры',
        phoneFormat: 'должен быть в формате +7 777 777 77 77',
        teamNameLabel: 'Название команды',
        leagueLabel: 'Лига соревнования',
        juniorLeague: 'Младшая лига (7-9 классы)',
        seniorLeague: 'Старшая лига (10-12 классы)',
        teamMemberCount: 'Количество участников команды',
        participant1Captain: 'Участник 1 (Капитан команды)',
        participant2: 'Участник 2',
        participant3: 'Участник 3',
        participant4: 'Участник 4',
        participant5: 'Участник 5',
        editInProfile: 'Редактировать в профиле',
        participantCount: 'участник',
        participantCountPlural: 'а',
        participantCountMany: 'ов',
        mentorSection: 'Наставник',
        competitionsList: 'К списку соревнований',
        captainAge: 'Возраст капитана',
        ageRequired: 'Введите возраст',
        selectSource: 'Выберите'
      },
      home: {
        hero: {
          products: {
            title: 'Образовательные наборы AEROO',
            desc: 'Практические наборы для изучения ракетостроения, спутниковых технологий и космических исследований',
            button: 'Заказать наборы'
          },
          settlement: {
            title: 'Space Settlement 2025',
            dates: '25 октября 2025 — 15 января 2026',
            registration: 'Регистрация открыта',
            button: 'Участвовать'
          },
          competitions: {
            title: 'Соревнования AEROO',
            desc: 'Присоединяйтесь к инновационным соревнованиям по аэрокосмическим технологиям',
            button: 'Все соревнования'
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
              text: 'AEROO предоставляет отличные образовательные материалы. Наши ученики показывают высокие результаты в космических проектах.'
            },
            1: {
              text: 'Прекрасная методическая поддержка и качественные материалы помогают нам проводить увлекательные уроки астрономии.'
            },
            2: {
              text: 'Победа в соревновании дала мне огромный опыт и знания в области космических технологий!'
            },
            3: {
              text: 'Участие в программах AEROO открыло новые горизонты в изучении космоса. Очень благодарен за возможность!'
            },
            4: {
              text: 'Отличная платформа для развития интереса к науке у детей. Рекомендую всем коллегам!'
            },
            5: {
              text: 'AEROO помогает нашей школе готовить будущих инженеров и исследователей космоса.'
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
        },
        detailsNotReady: 'Детальная страница в разработке',
        detailsComingSoon: 'Скоро будет доступна подробная информация о продукте'
      },
      footer: {
        description: 'Образовательная платформа, объединяющая школьников, студентов и молодых инженеров вокруг аэрокосмических технологий.',
        location: 'Алматы, Казахстан',
        sections: {
          0: {
            title: 'Платформа',
            links: {
              0: 'Соревнования',
              1: 'Курсы',
              2: 'Продукты',
              3: 'О нас',
              4: 'Карьера'
            }
          },
          1: {
            title: 'Поддержка',
            links: {
              0: 'Контакты',
              1: 'FAQ',
              2: 'Техподдержка',
              3: 'Сообщество'
            }
          },
          2: {
            title: 'Документы',
            links: {
              0: 'Политика конфиденциальности',
              1: 'Пользовательское соглашение'
            }
          }
        },
        bottom: {
          rights: 'Все права защищены.'
        }
      },
          cta: {
            text: 'Присоединяйтесь к тысячам довольных участников и педагогов',
            competitions: 'Участвовать в соревнованиях',
            products: 'Заказать наборы'
          }
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
          deadline: "October 25, 2025", 
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
      spaceSettlement2025: {
        meta: {
          title: "AEROO Space Settlement Competition 2025 — Online Hackathon",
          description: "Online hackathon for space settlement design for high school students. Registration: Sep 20 – Oct 25, 2025, hackathon: Oct 28-29, 2025."
        },
        hero: {
          title: "AEROO Space Settlement Competition 2025",
          subtitle: "Republican online hackathon for space settlement design",
          dates: "Registration until Oct 25, 2025 | Hackathon Oct 28-29, 2025",
          participate: "Participate",
          learnMore: "Learn More"
        },
        countdown: {
          title: "Until registration deadline",
          deadline: "October 25, 2025, 11:59 PM GMT+5",
          days: "days",
          hours: "hours",
          minutes: "minutes",
          seconds: "seconds"
        },
        breadcrumbs: {
          home: "Home",
          competitions: "Competitions"
        },
        about: {
          title: "About the Competition",
          text1: "AEROO Space Settlement Competition 2025 is a republican online hackathon of scientific-research and engineering orientation for high school students.",
          text2: "Goal — to develop skills in space settlement design, scientific analysis and engineering justification.",
          text3: "Best participants will join Kazakhstan's team for the international",
          nssLink: "NSS Space Settlement Contest"
        },
        rules: {
          title: "Competition Regulations",
          description: "Detailed information about participation rules, evaluation criteria and project requirements",
          button: "Open Regulations"
        },
        goals: {
          title: "Goals and Objectives",
          items: [
            "Development of engineering and research competencies of students",
            "Development of space settlement projects with scientific and engineering justification",
            "Formation of Kazakhstan's team for NSS Space Settlement Contest",
            "Popularization of aerospace directions",
            "Identification and support of talented participants"
          ]
        },
        format: {
          title: "Hackathon Format and Sections",
          junior: "Junior League: Grades 7–9",
          senior: "Senior League: Grades 10–12",
          task: "Task: development of scientific-engineering project on space colonization theme (10–15 pages)",
          duration: "Format: online, 36 hours to complete from task publication"
        },
        timeline: {
          title: "Key Dates",
          deadline: "October 25, 2025 (11:59 PM GMT+5) — application deadline",
          hackathon: "October 28–29, 2025 — hackathon (36 hours to complete the task)"
        },
        submission: {
          title: "Work Submission",
          description: "All works are uploaded digitally through the organizers' platform by the established deadline. Plagiarism is prohibited."
        },
        awards: {
          title: "Awards",
          items: [
            "Cash prizes",
            "Grants from Energo University",
            "Formation of Kazakhstan's team for NSS Space Settlement Contest"
          ]
        },
        contacts: {
          title: "Contacts"
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
        no: 'No',
        learnMore: 'Learn More'
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
      form: {
        applicationTitle: 'Competition Application',
        editApplication: 'Edit Application',
        selectCompetition: 'Select Competition',
        breadcrumbCompetitions: 'Competitions',
        breadcrumbApplication: 'Application',
        statusLabel: 'Status:',
        competitionNotFound: 'Competition not found. Return to',
        registrationNotOpen: 'Registration for this competition is not yet open.',
        teamName: 'Team Name',
        teamCaptain: 'Team Captain',
        teamParticipants: 'Team Participants',
        participant1: 'Participant 1',
        participant2Title: 'Participant 2 (optional)',
        participant3Title: 'Participant 3 (optional)',
        participant4Title: 'Participant 4 (optional)',
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
        gradePlaceholder: 'e.g.: 10 or 2nd year',
        telegramPlaceholder: '@username',
        source: 'How did you learn about the competition?',
        sourceInstagramKaz: 'Instagram @aeroo.kz',
        sourceInstagramOther: 'Instagram (other accounts)',
        sourceTelegram: 'Telegram',
        sourceFriends: 'From friends',
        sourceOther: 'Other',
        questions: 'Questions or comments',
        questionsPlaceholder: 'Your questions to organizers...',
        consent: 'Consent to rules and privacy policy',
        submit: 'Submit Application',
        submitting: 'Submitting...',
        toastConsentRequired: 'Consent Required',
        toastConsentDescription: 'Please confirm your consent to the rules',
        toastSubmitError: 'Submission Error',
        toastSubmitSuccess: 'Application submitted successfully!',
        duplicateRegistration: 'You are already registered for this competition',
        minOneParticipant: 'You must fill in data for at least one participant',
        enrollmentNotFound: 'Application not found or you do not have access to it',
        metaDescription: 'Fill out the team form and confirm consent',
        metaDescriptionGeneral: 'in AEROO competitions',
        required: 'is required',
        noDigits: 'should not contain digits',
        phoneFormat: 'must be in format +7 777 777 77 77',
        teamNameLabel: 'Team Name',
        leagueLabel: 'Competition League',
        juniorLeague: 'Junior League (Grades 7-9)',
        seniorLeague: 'Senior League (Grades 10-12)',
        teamMemberCount: 'Number of team members',
        participant1Captain: 'Participant 1 (Team Captain)',
        participant2: 'Participant 2',
        participant3: 'Participant 3',
        participant4: 'Participant 4',
        participant5: 'Participant 5',
        editInProfile: 'Edit in Profile',
        participantCount: 'participant',
        participantCountPlural: 's',
        participantCountMany: 's',
        mentorSection: 'Mentor',
        competitionsList: 'To competitions list',
        captainAge: 'Captain Age',
        ageRequired: 'Enter age',
        selectSource: 'Select'
      },
      home: {
        hero: {
          products: {
            title: 'AEROO Educational Kits',
            desc: 'Practical kits for studying rocket engineering, satellite technology and space research',
            button: 'Order kits'
          },
          settlement: {
            title: 'Space Settlement 2025',
            dates: 'October 25, 2025 — January 15, 2026',
            registration: 'Registration open',
            button: 'Participate'
          },
          competitions: {
            title: 'AEROO Competitions',
            desc: 'Join innovative aerospace technology competitions',
            button: 'All competitions'
          }
        },
        features: {
          title: 'Learning Directions',
          subtitle: 'Dive into the world of aerospace technologies through practical courses and exciting competitions',
          items: {
            0: {
              title: 'Rocket Engineering',
              desc: 'Study of aerodynamics, design and launch of rocket models with solid fuel engines'
            },
            1: {
              title: 'UAV',
              desc: 'Drone programming, FPV piloting, aerial photography and autonomous flights'
            },
            2: {
              title: 'Satellite Technologies',
              desc: 'Creation of nanosatellites, study of onboard systems and launch preparation'
            },
            3: {
              title: 'Artificial Intelligence',
              desc: 'Development of autonomous algorithms for navigation and control of space missions'
            },
            4: {
              title: 'Competitions',
              desc: 'Participation in international aerospace technology competitions'
            },
            5: {
              title: 'Teamwork',
              desc: 'Development of collaboration skills in multidisciplinary projects'
            }
          },
          learnMore: 'Learn more',
          cta: {
            title: 'Ready to start your journey to space?',
            courses: 'Educational kits for schools',
            competitions: 'Upcoming competitions'
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
              text: 'AEROO provides excellent educational materials. Our students show high results in space projects.'
            },
            1: {
              text: 'Excellent methodological support and quality materials help us conduct engaging astronomy lessons.'
            },
            2: {
              text: 'Winning the competition gave me tremendous experience and knowledge in space technology!'
            },
            3: {
              text: 'Participating in AEROO programs opened new horizons in space exploration. Very grateful for the opportunity!'
            },
            4: {
              text: 'Great platform for developing children\'s interest in science. Recommend to all colleagues!'
            },
            5: {
              text: 'AEROO helps our school prepare future engineers and space researchers.'
            }
          },
          cta: {
            text: 'Join thousands of satisfied participants and educators',
            competitions: 'Participate in competitions',
            products: 'Order kits'
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
            description: 'Educational kit for studying the basics of rocket engineering and aerodynamics',
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
            description: 'Satellite with the possibility of launching into the stratosphere for conducting real scientific experiments',
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
              2: 'Sportsmanship',
              3: 'Strategic thinking'
            }
          }
        },
        inStock: 'In stock',
        outOfStock: 'Out of stock',
        includes: 'What\'s included in the kit:',
        cta: {
          details: 'Details',
          request: 'Request',
          notify: 'Notify when available'
        },
        help: {
          title: 'Need consultation?',
          desc: 'Our experts will help you choose the right kit for your level of preparation and educational goals. Contact us for personal consultation.'
        },
        catalog: {
          download: 'Download catalog',
          soon: 'Catalog coming soon',
          pdfLater: 'PDF catalog will be available later'
        },
        request: {
          sent: 'Request sent',
          weWillContact: 'We will contact you by email'
        },
        detailsNotReady: 'Detail page in development',
        detailsComingSoon: 'Detailed product information will be available soon'
      },
      footer: {
        description: 'Educational platform uniting schoolchildren, students and young engineers around aerospace technologies.',
        location: 'Almaty, Kazakhstan',
        sections: {
          0: {
            title: 'Platform',
            links: {
              0: 'Competitions',
              1: 'Courses',
              2: 'Products',
              3: 'About Us',
              4: 'Careers'
            }
          },
          1: {
            title: 'Support',
            links: {
              0: 'Contacts',
              1: 'FAQ',
              2: 'Tech Support',
              3: 'Community'
            }
          },
          2: {
            title: 'Documents',
            links: {
              0: 'Privacy Policy',
              1: 'Terms of Service'
            }
          }
        },
        bottom: {
          rights: 'All rights reserved.'
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
          deadline: "25 қазан 2025", 
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
      spaceSettlement2025: {
        meta: {
          title: "AEROO Space Settlement Competition 2025 — онлайн-хакатон",
          description: "Мектеп оқушыларына арналған ғарыштық қоныстарды жобалау бойынша онлайн-хакатон. Тіркелу: 20.09–25.10.2025, хакатон: 28–29.10.2025."
        },
        hero: {
          title: "AEROO Space Settlement Competition 2025",
          subtitle: "Ғарыштық қоныстарды жобалау бойынша республикалық онлайн-хакатон",
          dates: "Тіркелу 25.10.2025-ке дейін | Хакатон 28-29 қазан 2025",
          participate: "Қатысу",
          learnMore: "Толығырақ"
        },
        countdown: {
          title: "Тіркелу мерзімі аяқталғанға дейін",
          deadline: "25 қазан 2025, 23:59 GMT+5",
          days: "күн",
          hours: "сағат",
          minutes: "минут",
          seconds: "секунд"
        },
        breadcrumbs: {
          home: "Басты бет",
          competitions: "Сайыстар"
        },
        about: {
          title: "Сайыс туралы",
          text1: "AEROO Space Settlement Competition 2025 — мектеп оқушыларына арналған ғылыми-зерттеу және инженерлік бағыттағы республикалық онлайн-хакатон.",
          text2: "Мақсаты — ғарыштық қоныстарды жобалау, ғылыми талдау және инженерлік негіздеу дағдыларын дамыту.",
          text3: "Ең үздік қатысушылар халықаралық байқауға қатысу үшін Қазақстан құрамасына кіреді",
          nssLink: "NSS Space Settlement Contest"
        },
        rules: {
          title: "Сайыс ережелері",
          description: "Қатысу ережелері, бағалау критерийлері және жобаларға қойылатын талаптар туралы толық ақпарат",
          button: "Ережелерді ашу"
        },
        goals: {
          title: "Мақсаттар мен міндеттер",
          items: [
            "Мектеп оқушыларының инженерлік және зерттеу құзыреттілігін дамыту",
            "Ғылыми және инженерлік негіздемесі бар ғарыштық қоныстар жобаларын әзірлеу",
            "NSS Space Settlement Contest үшін Қазақстан құрамасын қалыптастыру",
            "Аэроғарыштық бағыттарды насихаттау",
            "Дарынды қатысушыларды анықтау және қолдау"
          ]
        },
        format: {
          title: "Хакатон форматы мен секциялары",
          junior: "Кіші лига: 7–9 сыныптар",
          senior: "Үлкен лига: 10–12 сыныптар",
          task: "Тапсырма: ғарышты колонизациялау тақырыбы бойынша ғылыми-инженерлік жоба әзірлеу (10–15 бет)",
          duration: "Формат: онлайн, тапсырма жарияланған сәттен бастап орындауға 36 сағат"
        },
        timeline: {
          title: "Негізгі күндер",
          deadline: "25 қазан 2025 (23:59 GMT+5) — өтініш беру мерзімі",
          hackathon: "28–29 қазан 2025 — хакатон (тапсырманы орындауға 36 сағат)"
        },
        submission: {
          title: "Жұмыстарды тапсыру",
          description: "Барлық жұмыстар белгіленген мерзімге дейін ұйымдастырушылардың платформасы арқылы электронды түрде жүктеледі. Плагиат тыйым салынған."
        },
        awards: {
          title: "Марапаттар",
          items: [
            "Ақшалай сыйлықтар",
            "Energo University грант тәжірибелері",
            "NSS Space Settlement Contest үшін Қазақстан құрамасын қалыптастыру"
          ]
        },
        contacts: {
          title: "Байланыстар"
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
        no: 'Жоқ',
        learnMore: 'Толығырақ білу'
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
        invalidCredentials: 'Қате деректер',
        weakPassword: 'Әлсіз құпия сөз',
        emailAlreadyExists: 'Email қазірдің өзінде тіркелген',
        passwordsMustMatch: 'Құпия сөздер сәйкес болуы керек',
        passwordTooShort: 'Құпия сөз кем дегенде 6 таңбадан тұруы керек',
        passwordUpdated: 'Құпия сөз жаңартылды',
        passwordUpdateError: 'Құпия сөзді жаңарту қатесі',
        passwordsDontMatch: 'Құпия сөздер сәйкес келмейді',
        passwordInvalid: 'Құпия сөз талаптарға сай емес',
        passwordRules: 'Кем дегенде 8 таңба, бір бас әріп және бір арнайы таңба'
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
      form: {
        applicationTitle: 'Сайысқа қатысу өтініші',
        editApplication: 'Өтінішті өңдеу',
        selectCompetition: 'Сайысты таңдаңыз',
        breadcrumbCompetitions: 'Сайыстар',
        breadcrumbApplication: 'Өтініш',
        statusLabel: 'Күйі:',
        competitionNotFound: 'Сайыс табылмады. Қайта оралыңыз',
        registrationNotOpen: 'Бұл сайысқа тіркелу әлі ашылмаған.',
        teamName: 'Команда атауы',
        teamCaptain: 'Команда капитаны',
        teamParticipants: 'Команда қатысушылары',
        participant1: 'Қатысушы 1',
        participant2Title: 'Қатысушы 2 (міндетті емес)',
        participant3Title: 'Қатысушы 3 (міндетті емес)',
        participant4Title: 'Қатысушы 4 (міндетті емес)',
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
        duplicateRegistration: 'Сіз бұл сайысқа қазірдің өзінде тіркелдіңіз',
        minOneParticipant: 'Кем дегенде бір қатысушының деректерін толтыру қажет',
        enrollmentNotFound: 'Өтініш табылмады немесе сізде оған қатынау құқығы жоқ',
        metaDescription: 'Команда формасын толтырып, келісіміңізді растаңыз',
        metaDescriptionGeneral: 'AEROO сайыстарында',
        required: 'толтыру міндетті',
        noDigits: 'сандар болмауы керек',
        phoneFormat: '+7 777 777 77 77 форматында болуы керек',
        teamNameLabel: 'Команда атауы',
        leagueLabel: 'Сайыс лигасы',
        juniorLeague: 'Кіші лига (7-9 сыныптар)',
        seniorLeague: 'Үлкен лига (10-12 сыныптар)',
        teamMemberCount: 'Команда мүшелерінің саны',
        participant1Captain: 'Қатысушы 1 (Команда капитаны)',
        participant2: 'Қатысушы 2',
        participant3: 'Қатысушы 3',
        participant4: 'Қатысушы 4',
        participant5: 'Қатысушы 5',
        editInProfile: 'Профильде өңдеу',
        participantCount: 'қатысушы',
        participantCountPlural: '',
        participantCountMany: '',
        mentorSection: 'Дайындаушы',
        competitionsList: 'Сайыстар тізіміне',
        captainAge: 'Капитан жасы',
        ageRequired: 'Жасты енгізіңіз',
        selectSource: 'Таңдаңыз'
      },
      home: {
        hero: {
          products: {
            title: 'AEROO білім беру жиынтықтары',
            desc: 'Зымыран құрастыру, спутник технологиялары мен ғарыш зерттеулерін үйрену үшін практикалық жиынтықтар',
            button: 'Жиынтықтар тапсырысы'
          },
          settlement: {
            title: 'Space Settlement 2025',
            dates: '25 қазан 2025 — 15 қаңтар 2026',
            registration: 'Тіркелу ашық',
            button: 'Қатысу'
          },
          competitions: {
            title: 'AEROO сайыстары',
            desc: 'Аэроғарыш технологияларының инновациялық сайыстарына қосылыңыз',
            button: 'Барлық сайыстар'
          }
        },
        features: {
          title: 'Оқыту бағыттары',
          subtitle: 'Практикалық курстар мен қызықты сайыстар арқылы аэроғарыш технологияларының әлеміне сүңгіңіз',
          items: {
            0: {
              title: 'Зымыран құрастыру',
              desc: 'Аэродинамиканы зерттеу, қатты отынды қозғалтқыштары бар зымыран үлгілерін құрастыру және ұшыру'
            },
            1: {
              title: 'ДРОН',
              desc: 'Дрондарды программалау, FPV ұшыру, аэроақпарат және автономды ұшулар'
            },
            2: {
              title: 'Спутник технологиялары',
              desc: 'Наноспутниктер жасау, борттық жүйелерді зерттеу және ұшыруға дайындық'
            },
            3: {
              title: 'Жасанды интеллект',
              desc: 'Ғарыштық миссияларды навигациялау мен басқару үшін автономды алгоритмдер әзірлеу'
            },
            4: {
              title: 'Сайыстар',
              desc: 'Аэроғарыш технологияларының халықаралық сайыстарына қатысу'
            },
            5: {
              title: 'Командалық жұмыс',
              desc: 'Көппәнді жобаларда ынтымақтастық дағдыларын дамыту'
            }
          },
          learnMore: 'Көбірек білу',
          cta: {
            title: 'Ғарышқа саяхатыңызды бастауға дайынсыз ба?',
            courses: 'Мектептерге арналған білім беру жиынтықтары',
            competitions: 'Келешектегі сайыстар'
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
              text: 'AEROO тамаша білім беру материалдарын ұсынады. Біздің оқушылар ғарыш жобаларында жоғары нәтижелер көрсетеді.'
            },
            1: {
              text: 'Керемет әдістемелік қолдау мен сапалы материалдар бізге қызықты астрономия сабақтарын өткізуге көмектеседі.'
            },
            2: {
              text: 'Сайыста жеңіс маған ғарыш технологиялары саласында зор тәжірибе мен білім берді!'
            },
            3: {
              text: 'AEROO бағдарламаларына қатысу ғарышты зерттеуде жаңа көкжиектер ашты. Мүмкіндік үшін өте ризамын!'
            },
            4: {
              text: 'Балаларда ғылымға деген қызығушылықты дамыту үшін тамаша платформа. Барлық әріптестерге ұсынамын!'
            },
            5: {
              text: 'AEROO біздің мектепке болашақ инженерлер мен ғарыш зерттеушілерін дайындауға көмектеседі.'
            }
          },
          cta: {
            text: 'Мыңдаған қанағаттанған қатысушылар мен педагогтарға қосылыңыз',
            competitions: 'Сайыстарға қатысу',
            products: 'Жиынтықтар тапсырысы'
          }
        }
      },
      products: {
        metaTitle: 'AEROO өнімдері — жиынтықтар мен конструкторлар',
        hero: {
          title: 'AEROO өнімдері',
          subtitle: 'Аэроғарыш технологияларын зерттеуге арналған білім беру жиынтықтары. Қарапайым зымыран үлгілерінен күрделі наноспутниктерге дейін.'
        },
        advantages: {
          title: 'Біздің жиынтықтардың артықшылықтары',
          items: {
            0: {
              title: 'Инновациялық технологиялар',
              desc: 'Аэроғарыш технологиялары саласындағы соңғы жетістіктерді пайдаланамыз'
            },
            1: {
              title: 'Толық қауіпсіздік',
              desc: 'Барлық жиынтықтар қатаң сертификаттау мен сынаудан өтеді'
            },
            2: {
              title: 'Сарапшылардың қолдауы',
              desc: 'Біздің инженерлерден техникалық қолдау мен кеңестер'
            }
          }
        },
        grid: {
          title: 'Біздің өнімдер'
        },
        items: {
          'rocket-kit': {
            title: 'Rocket Science Kit',
            description: 'Зымыран құрастыру мен аэродинамика негіздерін зерттеуге арналған білім беру жиынтығы',
            category: 'Зымырандар',
            features: {
              0: 'Қауіпсіз қозғалтқыштар',
              1: 'Зымыран конструкторы',
              2: 'Өз зымыраныңызды жасаңыз',
              3: 'Ұшыру симуляциясы'
            }
          },
          'cansat-kit': {
            title: 'CanSat Kit',
            description: 'Үлгі зымыранның борттағы CanSat форматындағы спутникті құрастыру мен ұшыруға арналған',
            category: 'Зымырандар',
            features: {
              0: 'Жетілдірілген зымыран үлгісі',
              1: 'Электроникамен жұмыс',
              2: 'Нақты уақыттағы деректер',
              3: 'Пайдалы жүк'
            }
          },
          'satellite-kit': {
            title: 'CubeSat Kit',
            description: 'Нақты ғылыми эксперименттер жүргізу үшін стратосфераға ұшыру мүмкіндігі бар спутник',
            category: 'Спутниктер',
            features: {
              0: 'Күн панельдері',
              1: 'LoRa радиожүйесі',
              2: 'Борттық компьютер',
              3: 'Датчиктер'
            }
          },
          'football-drone-kit': {
            title: 'Drone Football Kit',
            description: 'Дрон-футбол матчтарына арналған жиынтық — дронды басқарыңыз, сайысыңыз және командалық рухты дамытыңыз',
            category: 'Дрондар',
            features: {
              0: 'Қауіпсіз ұшу',
              1: 'Жаттығу желісі мен қақпалар',
              2: 'Спорттық рух',
              3: 'Стратегиялық ойлау'
            }
          }
        },
        inStock: 'Қоймада бар',
        outOfStock: 'Қоймада жоқ',
        includes: 'Жиынтыққа кіретіндер:',
        cta: {
          details: 'Толығырақ',
          request: 'Өтінім қалдыру',
          notify: 'Келгенде хабарлау'
        },
        help: {
          title: 'Кеңес керек пе?',
          desc: 'Біздің сарапшылар сіздің дайындық деңгейіңіз бен білім беру мақсаттарыңызға сәйкес жиынтықты таңдауға көмектеседі. Жеке кеңес алу үшін бізбен байланысыңыз.'
        },
        catalog: {
          download: 'Каталогты жүктеу',
          soon: 'Каталог жақында',
          pdfLater: 'PDF-каталог кейінірек қол жетімді болады'
        },
        request: {
          sent: 'Өтінім жіберілді',
          weWillContact: 'Біз сізбен email арқылы хабарласамыз'
        },
        detailsNotReady: 'Толық бет әзірленуде',
        detailsComingSoon: 'Өнім туралы толық ақпарат жақында қол жетімді болады'
      },
      footer: {
        description: 'Мектеп оқушылары, студенттер мен жас инженерлерді аэроғарыш технологиялары айналасында біріктіретін білім беру платформасы.',
        location: 'Алматы, Қазақстан',
        sections: {
          0: {
            title: 'Платформа',
            links: {
              0: 'Сайыстар',
              1: 'Курстар',
              2: 'Өнімдер',
              3: 'Біз туралы',
              4: 'Мансап'
            }
          },
          1: {
            title: 'Қолдау',
            links: {
              0: 'Байланыстар',
              1: 'ЖҚС',
              2: 'Техникалық қолдау',
              3: 'Қауымдастық'
            }
          },
          2: {
            title: 'Құжаттар',
            links: {
              0: 'Құпиялылық саясаты',
              1: 'Пайдаланушы келісімі'
            }
          }
        },
        bottom: {
          rights: 'Барлық құқықтар қорғалған.'
        }
      }
    }
  }
};

i18n.use(initReactI18next).init({
  resources,
  lng: saved,
  fallbackLng: 'ru',
  interpolation: {
    escapeValue: false,
  },
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