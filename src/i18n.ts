import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const saved = typeof localStorage !== 'undefined' ? localStorage.getItem('lng') || 'ru' : 'ru';

const resources = {
  kk: {
    translation: {
      spaceSettlement2025: {
        metaTitle: "AEROO Space Settlement Competition 2025 — онлайн-хакатон",
        metaDescription: "Ғарыштық қоныстарды жобалау бойынша мектеп оқушыларына арналған онлайн-хакатон. Тіркелу: 20.09–25.10.2025, хакатон: 28–29.10.2025.",
        title: "AEROO Space Settlement Competition 2025",
        subtitle: "Ғарыштық қоныстарды жобалау бойынша республикалық онлайн-хакатон",
        registration: "25.10.2025 дейін тіркелу | Хакатон 28-29 қазан 2025",
        participate: "Қатысу",
        moreInfo: "Толығырақ",
        countdown: {
          title: "Тіркелу аяқталуына дейін",
          subtitle: "25 қазан 2025, 23:59 GMT+5",
          days: "күн",
          hours: "сағат",
          minutes: "минут",
          seconds: "секунд"
        },
        breadcrumb: {
          home: "Басты бет",
          competitions: "Жарыстар",
          current: "AEROO Space Settlement Competition 2025"
        },
        about: {
          title: "Жарыс туралы",
          description1: "AEROO Space Settlement Competition 2025 — мектеп оқушыларына арналған ғылыми-зерттеу және инженерлік бағыттағы республикалық онлайн-хакатон.",
          description2: "Мақсаты — ғарыштық қоныстарды жобалау, ғылыми талдау және инженерлік негіздеу дағдыларын дамыту.",
          description3: "Үздік қатысушылар халықаралық",
          description4: "NSS Space Settlement Contest",
          description5: "жарысына қатысу үшін Қазақстан құрамасына кіреді."
        },
        rules: {
          title: "Жарыс ережелері",
          description: "Қатысу ережелері, бағалау өлшемдері және жобаларға қойылатын талаптар туралы толық ақпарат",
          cardTitle: "Жарыс ережелері",
          cardDescription: "Қатысу ережелері, бағалау өлшемдері және жобаларға қойылатын талаптар туралы толық ақпарат",
          openRules: "Ережелерді ашу"
        },
        goals: {
          title: "Мақсаттар мен міндеттер",
          items: [
            "Мектеп оқушыларының инженерлік және зерттеу құзыреттерін дамыту",
            "Ғылыми және инженерлік негіздемесі бар ғарыштық қоныстар жобаларын дамыту",
            "NSS Space Settlement Contest үшін Қазақстан құрамасын қалыптастыру",
            "Аэроғарыштық бағыттарды танымал ету",
            "Дарынды қатысушыларды анықтау және қолдау"
          ]
        },
        format: {
          title: "Хакатон форматы мен секциялары",
          junior: "Кіші лига: 7–9 сыныптар",
          senior: "Үлкен лига: 10–12 сыныптар",
          task: "Тапсырма: ғарышты колонизациялау тақырыбы бойынша ғылыми-инженерлік жоба дамыту (10–15 бет)",
          format: "Формат: онлайн, тапсырма жариялаған сәттен бастап 36 сағат"
        },
        timeline: {
          title: "Негізгі күндер",
          deadline: "25 қазан 2025 (23:59 GMT+5) — өтініш беру мерзімі",
          hackathon: "28–29 Қазан 2025 — хакатон (тапсырманы орындауға 36 сағат)"
        },
        submission: {
          title: "Жұмыстарды ұсыну",
          description: "Барлық жұмыстар белгіленген мерзімге дейін ұйымдастырушылардың платформасы арқылы электронды түрде жүктеледі. Плагиат тыйым салынады."
        },
        awards: {
          title: "Сыйлықтар",
          items: [
            "Ақшалай сыйлықтар",
            "Energo University грантары",
            "NSS Space Settlement Contest үшін Қазақстан құрамасын қалыптастыру"
          ]
        },
        contacts: {
          title: "Байланыс",
          email: "info@aeroo.space",
          community: "AEROO Community"
        }
      }
    }
  },
  en: {
    translation: {
      spaceSettlement2025: {
        metaTitle: "AEROO Space Settlement Competition 2025 — Online Hackathon",
        metaDescription: "Online hackathon for space settlement design for school students. Registration: 20.09–25.10.2025, hackathon: 28–29.10.2025.",
        title: "AEROO Space Settlement Competition 2025",
        subtitle: "Republican Online Hackathon for Space Settlement Design",
        registration: "Registration until 25.10.2025 | Hackathon October 28-29, 2025",
        participate: "Participate",
        moreInfo: "Learn More",
        countdown: {
          title: "Until registration ends",
          subtitle: "October 25, 2025, 23:59 GMT+5",
          days: "days",
          hours: "hours",
          minutes: "minutes",
          seconds: "seconds"
        },
        breadcrumb: {
          home: "Home",
          competitions: "Competitions",
          current: "AEROO Space Settlement Competition 2025"
        },
        about: {
          title: "About the Competition",
          description1: "AEROO Space Settlement Competition 2025 is a republican online hackathon of scientific-research and engineering focus for school students.",
          description2: "The goal is to develop skills in space settlement design, scientific analysis, and engineering justification.",
          description3: "Best participants will join Kazakhstan's national team for the international",
          description4: "NSS Space Settlement Contest",
          description5: "competition."
        },
        rules: {
          title: "Competition Rules",
          description: "Complete information about participation rules, evaluation criteria, and project requirements",
          cardTitle: "Competition Rules",
          cardDescription: "Complete information about participation rules, evaluation criteria, and project requirements",
          openRules: "Open Rules"
        },
        goals: {
          title: "Goals and Objectives",
          items: [
            "Develop engineering and research competencies of school students",
            "Develop space settlement projects with scientific and engineering justification",
            "Form Kazakhstan's national team for NSS Space Settlement Contest",
            "Popularize aerospace directions",
            "Identify and support talented participants"
          ]
        },
        format: {
          title: "Hackathon Format and Sections",
          junior: "Junior League: Grades 7–9",
          senior: "Senior League: Grades 10–12",
          task: "Task: development of scientific-engineering project on space colonization (10–15 pages)",
          format: "Format: online, 36 hours to complete from task publication"
        },
        timeline: {
          title: "Key Dates",
          deadline: "October 25, 2025 (23:59 GMT+5) — application deadline",
          hackathon: "October 28–29, 2025 — hackathon (36 hours to complete task)"
        },
        submission: {
          title: "Work Submission",
          description: "All work is uploaded electronically through the organizers' platform by the established deadline. Plagiarism is prohibited."
        },
        awards: {
          title: "Awards",
          items: [
            "Cash prizes",
            "Energo University grants",
            "Formation of Kazakhstan's national team for NSS Space Settlement Contest"
          ]
        },
        contacts: {
          title: "Contacts",
          email: "info@aeroo.space",
          community: "AEROO Community"
        }
      }
    }
  },
  ru: {
    translation: {
      spaceSettlement2025: {
        metaTitle: "AEROO Space Settlement Competition 2025 — онлайн-хакатон",
        metaDescription: "Онлайн-хакатон по проектированию космических поселений для школьников. Регистрация: 20.09–25.10.2025, хакатон: 28–29.10.2025.",
        title: "AEROO Space Settlement Competition 2025",
        subtitle: "Республиканский онлайн-хакатон по проектированию космических поселений",
        registration: "Регистрация до 25.10.2025 | Хакатон 28-29 октября 2025",
        participate: "Принять участие",
        moreInfo: "Подробнее",
        countdown: {
          title: "До окончания регистрации",
          subtitle: "25 октября 2025, 23:59 GMT+5",
          days: "дней",
          hours: "часов",
          minutes: "минут",
          seconds: "секунд"
        },
        breadcrumb: {
          home: "Главная",
          competitions: "Соревнования",
          current: "AEROO Space Settlement Competition 2025"
        },
        about: {
          title: "О соревновании",
          description1: "AEROO Space Settlement Competition 2025 — республиканский онлайн-хакатон научно-исследовательской и инженерной направленности для школьников.",
          description2: "Цель — развить навыки проектирования космических поселений, научного анализа и инженерного обоснования.",
          description3: "Лучшие участники войдут в сборную Казахстана для участия в международном конкурсе",
          description4: "NSS Space Settlement Contest",
          description5: "."
        },
        rules: {
          title: "Положение о соревновании",
          description: "Ознакомьтесь с полным положением о соревновании, требованиями к участникам и критериями оценки",
          cardTitle: "Положение о соревновании",
          cardDescription: "Подробная информация о правилах участия, критериях оценки и требованиях к проектам",
          openRules: "Открыть положение"
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
          format: "Формат: онлайн, 36 часов на выполнение с момента публикации задания"
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
          title: "Контакты",
          email: "info@aeroo.space",
          community: "AEROO Community"
        }
      },
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
        applicationTitle: 'Заявка на участие',
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
        minOneParticipant: 'Необходимо заполнить данные хотя бы одного участника'
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
            dates: 'Регистрация: до 25 октября 2025',
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