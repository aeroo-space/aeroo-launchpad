import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const saved = typeof localStorage !== 'undefined' ? localStorage.getItem('lng') || 'ru' : 'ru';

const resources = {
  ru: {
    translation: {
      home: {
        metaTitle: 'AEROO — образовательная платформа',
        hero: {
          competitions: {
            title: 'Международные соревнования по космическим технологиям',
            desc: 'Участвуйте в захватывающих соревнованиях, проектируйте спутники, ракеты и создавайте будущее вместе с нами',
            button: 'Узнать больше'
          },
          products: {
            title: 'Образовательные наборы для изучения космоса',
            desc: 'Профессиональные учебные комплекты для школ: ракеты, дроны, спутники и многое другое',
            button: 'Смотреть продукты'
          },
          settlement: {
            title: 'AEROO Space Settlement Competition 2025',
            dates: 'Регистрация до 25 октября 2025 | Хакатон 28-29 октября',
            registration: 'Республиканский онлайн-хакатон по проектированию космических поселений',
            button: 'Принять участие'
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
            winner: 'Победитель',
            participant: 'Участник'
          },
          items: {
            0: {
              text: 'AEROO помогает нашим ученикам развиваться в области инженерии и космических технологий. Их образовательные программы действительно вдохновляют детей!'
            },
            1: {
              text: 'Учебные материалы и наборы от AEROO отлично структурированы и понятны. Ученики с удовольствием работают над проектами.'
            },
            2: {
              text: 'Благодаря соревнованиям AEROO я смог реализовать свой проект по созданию модели ракеты. Это был незабываемый опыт!'
            },
            3: {
              text: 'Участие в программах AEROO открыло для меня новые горизонты в области аэрокосмических технологий. Рекомендую всем!'
            },
            4: {
              text: 'AEROO предоставляет уникальные возможности для практического обучения. Мои ученики в восторге от их методики!'
            },
            5: {
              text: 'Сотрудничество с AEROO позволило нам создать современную лабораторию для изучения космических технологий в нашей школе.'
            }
          },
          cta: {
            text: 'Присоединяйтесь к тысячам довольных участников и педагогов',
            competitions: 'Участвовать в соревнованиях',
            products: 'Заказать наборы'
          }
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
      news: {
        title: 'СМИ о нас',
        instagramCta: 'Для получения последних новостей подписывайтесь на наш Instagram:',
        items: {
          1: {
            title: 'AEROO Space AI Competition',
            date: '2024',
            summary: 'Новые возможности для одаренных детей в РК: наука, спорт, искусство и ИИ',
            link: 'https://inbusiness.kz/ru/last/novye-vozmozhnosti-dlya-odarennyh-detej-v-rk-nauka-sport-iskusstvo-i-ii'
          },
          2: {
            title: 'Интервью с основателем AEROO',
            date: '2025',
            summary: 'Ему всего 23, а он уже запустил стартап и учит детей строить космические ракеты',
            link: 'https://digitalbusiness.kz/2025-05-14/emu-vsego-23-a-on-uzhe-zapustil-startap-i-uchit-detey-stroit-kosmicheskie-raketi-istoriya-parnya-iz-almati/'
          },
          3: {
            title: 'Помогают детям изучить инженерию',
            date: '2024',
            summary: 'Помогают детям изучить инженерию на практике и воспитывают будущих космонавтов',
            link: 'https://er10.kz/read/analitika/pomogajut-detjam-izuchit-inzheneriju-na-praktike-i-vospityvajut-budushhih-kosmonavtov-istorija-startapa-rockettech/'
          },
          4: {
            title: 'Forbes про AEROO',
            date: '2024',
            summary: 'Казахские ракеты: готовы ли мы совместно с детьми поколения Z исследовать?',
            link: 'https://forbes.kz/articles/kazrockets_zyimyiran_jasaua_yizyiatyin_balalarmen_aryishtyi_brlese_zertteuge_dayyinbyiz'
          },
          5: {
            title: 'Меморандум с Kazakhstan Engineering',
            date: '2024',
            summary: 'Подписан меморандум с представителями Kazakhstan Engineering',
            link: 'https://ke.kz/ru/press-center/news/4864/'
          },
          6: {
            title: 'Подготовка будущих инженеров',
            date: '2024',
            summary: 'Почему подготовка будущих инженеров в Казахстане строится на энтузиазме',
            link: 'https://inbusiness.kz/ru/news/pochemu-podgotovka-budushih-inzhenerov-v-kazahstane-stroitsya-na-entuziazme'
          }
        },
        readMore: 'Читать далее'
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
        toastNotOpenTitle: 'Регистрация пока не открыта',
        toastNotOpenDesc: 'Скоро выйдет информация — будьте в курсе событий.',
        toastSoonTitle: 'Скоро выйдет информация',
        toastSoonDesc: 'Будьте в курсе событий',
        toastNeedConsentTitle: 'Требуется согласие',
        toastNeedConsentDesc: 'Пожалуйста, подтвердите согласие с правилами',
        toastEnrollError: 'Ошибка регистрации',
        toastEnrollSuccessTitle: 'Заявка успешно подана!',
        archiveToastTitle: 'Архив в разработке',
        archiveToastDesc: 'Раздел архива скоро будет доступен',
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
          status: "Регистрация",
          deadline: "15 декабря 2025",
          ages: "16-25 лет"
        },
        rocketScience: {
          title: "Rocket Science 2026",
          category: "Ракетостроение",
          description: "Создайте и запустите собственные ракеты, изучите основы аэродинамики",
          status: "Регистрация",
          deadline: "20 ноября 2025",
          ages: "12-18 лет"
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
        },
        exploringWorldOfScience: {
          title: "Открываем Мир Науки",
          category: "Научно-практический конкурс",
          description: "Исследуйте различные научные направления и реализуйте собственные исследовательские проекты",
          status: "Регистрация",
          deadline: "15 ноября 2025",
          ages: "14-18 лет"
        }
      },
      cta: {
        apply: 'Подать заявку'
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
      products: {
        metaTitle: "Продукты AEROO — наборы и конструкторы",
        detailsNotReady: "Детальная страница в разработке",
        detailsComingSoon: "Скоро будет доступна подробная информация о продукте",
        hero: {
          title: "Продукты AEROO",
          subtitle: "Образовательные комплекты для изучения аэрокосмических технологий. От простых моделей ракет до сложных наноспутников."
        },
        advantages: {
          title: "Преимущества наших наборов",
          items: {
            0: {
              title: "Инновационные технологии",
              desc: "Используем последние достижения в области аэрокосмических технологий"
            },
            1: {
              title: "Полная безопасность",
              desc: "Все наборы проходят строгую сертификацию и тестирование"
            },
            2: {
              title: "Поддержка экспертов",
              desc: "Техническая поддержка и консультации от наших инженеров"
            }
          }
        },
        grid: {
          title: "Наши продукты"
        },
        items: {
          "rocket-kit": {
            category: "Ракеты",
            title: "Rocket Science Kit",
            description: "Образовательный комплект для изучения основ ракетостроения и аэродинамики",
            features: {
              0: "Безопасные двигатели",
              1: "Конструктор ракеты",
              2: "Создай свою ракету",
              3: "Симуляция запуска"
            }
          },
          "cansat-kit": {
            category: "Ракеты",
            title: "CanSat Kit",
            description: "Для сборки и запуска спутника формата CanSat на борту модельной ракеты",
            features: {
              0: "Продвинутая модель ракеты",
              1: "Работа с электроникой",
              2: "Данные в режиме реального времени",
              3: "Полезная нагрузка"
            }
          },
          "satellite-kit": {
            category: "Спутники",
            title: "CubeSat Kit",
            description: "Спутник с возможностью запуска в стратосферу для проведения реальных научных экспериментов",
            features: {
              0: "Солнечные панели",
              1: "Радиосистема LoRa",
              2: "Бортовой компьютер",
              3: "Датчики"
            }
          },
          "football-drone-kit": {
            category: "Дроны",
            title: "Drone Football Kit",
            description: "Комплект для матчей в дрон-футбол — управляй дроном, соревнуйся и развивай командный дух",
            features: {
              0: "Безопасный полет",
              1: "Тренировочная сетка и ворота",
              2: "Спортивный дух",
              3: "Стратегическое мышление"
            }
          }
        },
        inStock: "В наличии",
        outOfStock: "Нет в наличии",
        includes: "Что входит в набор:",
        cta: {
          details: "Подробнее",
          request: "Оставить заявку",
          notify: "Сообщить о поступлении"
        },
        help: {
          title: "Нужна консультация?",
          desc: "Наши эксперты помогут выбрать подходящий набор для вашего уровня подготовки и образовательных целей. Свяжитесь с нами для персональной консультации."
        },
        catalog: {
          soon: "Каталог скоро",
          pdfLater: "PDF-каталог будет доступен позже",
          download: "Скачать каталог"
        },
        request: {
          sent: "Заявка отправлена",
          weWillContact: "Мы свяжемся с вами по email"
        }
      },
      about: {
        metaTitle: "О AEROO — миссия и команда",
        metaDesc: "Образовательная экосистема AEROO: миссия, ценности, команда и партнёры",
        heroTitle: "О AEROO",
        heroSubtitle: "Мы вдохновляем и обучаем новое поколение создателей, развивая навыки, командную работу и системное мышление в области аэрокосмических технологий.",
        missionTitle: "Наша миссия",
        missionText: "Создать образовательную экосистему, которая объединяет школьников, студентов и молодых инженеров вокруг передовых технологий. Мы стремимся сделать аэрокосмические знания доступными каждому талантливому человеку.",
        valuesTitle: "Наши ценности",
        values: {
          innovation: "Инновации и технологическое превосходство",
          openness: "Открытость и доступность образования",
          teamwork: "Командная работа и взаимопомощь",
          excellence: "Стремление к совершенству"
        },
        achievementsTitle: "Наши достижения",
        achievements: {
          participants: "участников",
          events: "мероприятий",
          countries: "страны"
        },
        teamTitle: "Наша команда",
        teamMembers: {
          mirasName: "Мирас Нусупов",
          miraRole: "CEO",
          mirasBio: "Эксперт в области STEAM-образования и разработки образовательных продуктов",
          ryspayName: "Рыспай Алихан",
          ryspayRole: "COO",
          ryspayBio: "6 лет в области STEAM-образования, ex CTO FIRST Robotics"
        },
        partnersTitle: "Наши партнёры",
        becomePartner: "Стать партнёром",
        leadTitle: "Свяжитесь с нами",
        leadRequired: "Заполните имя и email",
        leadSuccess: "Спасибо! Мы свяжемся с вами в ближайшее время.",
        formName: "Имя",
        formPhone: "Телефон",
        formMessage: "Сообщение",
        sendMessage: "Отправить",
        sending: "Отправляем...",
        privacyNote: "Отправляя форму, вы соглашаетесь с политикой конфиденциальности."
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
       satelliteLaunch2026: {
        seo: {
          title: "AEROO Satellite Launch Competition 2026 — турнир наноспутников",
          description: "Международный турнир по разработке и запуску наноспутников. Регистрация 1.11.2025–1.01.2026, финал 9–12.04.2026, Астана."
        },
        hero: {
          title: "AEROO Satellite Launch Competition 2026",
          subtitle: "Международный инженерный турнир по разработке и запуску наноспутников",
          dates: "Регистрация: 1 ноября 2025 – 1 января 2026 | Финал: 9–12 апреля 2026, Астана"
        },
        cta: {
          participate: "Принять участие",
          readRegulation: "Прочитать Регламент"
        },
        about: {
          title: "О турнире",
          text1: "Казахстан — родина космодрома Байконур, с которого в 1957 году был запущен первый искусственный спутник Земли. Продолжая эту традицию, AEROO Satellite Launch Competition собирает команды молодых инженеров для проектирования, сборки и запуска наноспутников на стратосферу.",
          text2: "Участники создают концепцию миссии, разрабатывают ПО, собирают и тестируют спутники, а затем запускают их в финале. Турнир развивает инженерное и критическое мышление, навыки командной работы и международного взаимодействия.",
          videoNotSupported: "Ваш браузер не поддерживает воспроизведение видео."
        },
        aboutAeroo: {
          title: "О AEROO",
          text: "AEROO — организация, развивающая аэрокосмическое образование через инженерные соревнования и образовательные программы. Мы готовим новое поколение инженеров и учёных для космической отрасли."
        },
        goals: {
          title: "Как было в прошлом году?",
          text: "Цель турнира — вовлечь молодёжь в практическую инженерную деятельность и повысить интерес к космическим технологиям через проектную и командную работу."
        },
        benefits: {
          title: "Преимущества участия",
          certificates: "Развитие технического мышления и прикладных инженерных навыков",
          networking: "Системное проектирование спутниковых миссий",
          skills: "3D-моделирование, CAD и трассировка печатных плат (PCB)",
          practice: "Разработка и отладка ПО для микроконтроллеров, телеметрия и датчики",
          opportunities: "Подготовка презентаций и защита инженерных решений: командная работа",
          media: "Расширение знаний в аэрокосмике, обмен опытом и международная культура"
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
        archiveTitle: 'Архив соревнований',
        archiveDesc: 'Изучите результаты и материалы прошлых соревнований',
        archiveBtn: 'Перейти в архив',
        archiveToastTitle: 'Архив скоро будет доступен',
        archiveToastDesc: 'Мы работаем над созданием архива прошлых соревнований. Скоро здесь появится история всех наших мероприятий!',
        toastNotOpenTitle: 'Регистрация пока не открыта',
        toastNotOpenDesc: 'Скоро выйдет информация — будьте в курсе событий.',
        toastSoonTitle: 'Скоро выйдет информация',
        toastSoonDesc: 'Будьте в курсе событий',
        toastNeedConsentTitle: 'Требуется согласие',
        toastNeedConsentDesc: 'Пожалуйста, подтвердите согласие с правилами',
        toastEnrollError: 'Ошибка регистрации',
        toastEnrollSuccessTitle: 'Регистрация успешна!',
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
      ews: {
        seo: {
          title: 'Открываем Мир Науки — Международные соревнования по космическим исследованиям',
          description: 'Бесплатные соревнования для школьников 14–18 лет: наноспутники, космический ИИ и ракетомоделирование. Регистрация до 19 января 2026.'
        },
        hero: {
          badge: 'Международные соревнования',
          title: 'Открываем Мир Науки',
          subtitle: 'Международные научные соревнования по космическим исследованиям для школьников 14–18 лет',
          facts: {
            free: 'Бесплатно',
            categories: '3 категории',
            final: 'Астана: 9–12 апреля 2026 (GMT+5)'
          }
        },
        cta: {
          register: 'Зарегистрироваться',
          login: 'Личный кабинет',
          soon: 'Скоро откроем регистрацию',
          closed: 'Регистрация закрыта'
        },
        about: {
          title: 'О соревновании',
          organizers: 'Организаторы',
          intro: 'Организаторами являются РНПЦ «Дарын» и AEROO',
          mission: 'Наша миссия - вовлечь молодежь в космическую науку через реальные инженерные соревнования.',
          format: 'Международный формат, очный финал в Астане',
          who: {
            title: 'Кто может участвовать',
            text: 'Школьники 14–18 лет (индивидуально/команда — зависит от секции)'
          },
          cost: {
            title: 'Стоимость участия',
            text: 'Бесплатно'
          }
        },
        tracks: {
          title: 'Категории соревнований',
          subtitle: 'Выберите направление по душе',
          age: 'Возраст',
          team: 'Команда',
          details: 'Подробнее',
          stages_title: 'Этапы',
          aslc: {
            name: 'AEROO Satellite Launch Competition (ASLC)',
            summary: 'Проектирование и сборка наноспутника на базе AEROO CubeSat Kit, финальный запуск со стратостата.',
            age: '14–18',
            team: '4 участника',
            stages: [
              'Онлайн: концепт миссии',
              'Онлайн: инженерный проект',
              'Очный финал: сборка и запуск'
            ]
          },
          space_ai: {
            name: 'AEROO Space AI Competition',
            summary: 'Космический проект с применением ИИ и коммерческой моделью; MVP и питч.',
            age: '14–18',
            team: 'до 4 участников',
            stages: [
              'Онлайн: 1 месяц на идею/ИИ/MVP',
              'Очный финал: защита проекта'
            ]
          },
          rocket_science: {
            name: 'AEROO Rocket Science Competition',
            summary: 'Водяные ракеты и модельные ракеты',
            age: '14–18',
            team: 'до 2 участников',
            stages: ['Онлайн этап', 'Очный финал'],
            subtracks_title: 'Подкатегории',
            water_rockets: {
              name: 'Водяные ракеты',
              summary: 'Сборка и запуск водяной ракеты; упор на устойчивый полёт и дальность.',
              age: '14–15 (возможен 14–16 по решению оргкомитета)',
              team: 'до 2 участников'
            },
            model_rockets: {
              name: 'Модельные ракеты (2.5H*c)',
              summary: 'Проект в OpenRocket и макет; финальный запуск с парашютом и эко-миссией.',
              age: '15–18',
              team: 'до 2 участников'
            }
          }
        },
        timeline: {
          title: 'Сроки',
          registration: {
            label: 'Регистрация',
            date: '10 октября 2025 (12:00) — 19 января 2026 (23:59)',
            desc: 'Зарегистрируйтесь на платформе и создайте команду'
          },
          submission: {
            label: 'Онлайн-отбор',
            date: '1–28 февраля 2026',
            desc: 'Выполнение и отправка заданий'
          },
          results: {
            label: 'Итоги отбора',
            date: '10 марта 2026 (12:00)',
            desc: 'Объявление финалистов'
          },
          arrival: {
            label: 'Приезд команд',
            date: '8 апреля 2026',
            desc: 'Прибытие в Астану и подготовка'
          },
          final: {
            label: 'Финал',
            date: '9–12 апреля 2026, Астана',
            desc: 'Защита проектов и определение победителей'
          }
        },
        prizes: {
          title: 'Призы и возможности',
          medals: {
            title: 'Медали и дипломы',
            desc: 'Дипломы I, II, III степени Минпросвещения РК'
          },
          special: {
            title: 'Спецпризы',
            desc: 'Подарки от организаторов и партнёров'
          },
          fund: {
            title: 'Призовой фонд AEROO',
            desc: 'Денежные призы по решению жюри и организаторов'
          },
          education: {
            title: 'Образовательные возможности',
            desc: 'Потенциальные гранты от АУЭС им. Г. Даукеева'
          }
        },
        howto: {
          title: 'Как участвовать',
          step1: {
            title: 'Зарегистрируйтесь',
            desc: 'Создайте аккаунт на платформе AEROO'
          },
          step2: {
            title: 'Выполните задания',
            desc: 'Пройдите онлайн-этап в своей секции'
          },
          step3: {
            title: 'Приезжайте на финал',
            desc: 'Защитите проект в Астане'
          }
        },
        faq: {
          title: 'Частые вопросы',
          free: {
            q: 'Это бесплатно?',
            a: 'Да, участие полностью бесплатное.'
          },
          language: {
            q: 'На каком языке проводится?',
            a: 'Соревнование проводится на трёх языках: русский, казахский, английский.'
          },
          organizers: {
            q: 'Кто организаторы?',
            a: 'РНПЦ «Дарын» Министерства просвещения РК и компания AEROO.'
          },
          age: {
            q: 'Есть ли возрастные ограничения?',
            a: 'См. карточки секций выше — у каждого направления свои возрастные рамки.'
          },
          logistics: {
            q: 'Кто оплачивает поездку?',
            a: 'Логистику и быт организаторы и направляющая сторона закрывают по официальным анонсам.'
          }
        },
        contacts: {
          title: 'Контакты',
          org: {
            title: 'Организационные вопросы'
          },
          tech: {
            title: 'Технические вопросы и платформа'
          }
        },
        email: {
          title: 'Подписка на новости',
          desc: 'Получите уведомление, когда откроется регистрация',
          placeholder: 'Ваш email',
          submit: 'Подписаться'
        }
      },
      contacts: {
        meta: {
          title: 'AEROO — Контакты | Свяжитесь с нами',
          description: 'Контактная информация AEROO. Телефон, Telegram, адрес в Алматы. Мы всегда готовы ответить на ваши вопросы.'
        },
        title: 'Контакты',
        subtitle: 'Свяжитесь с нами',
        phone: 'Телефон',
        telegram: 'Telegram',
        location: 'Местоположение'
      }
    }
  },
  en: {
    translation: {
      home: {
        metaTitle: 'AEROO — Educational Platform',
        hero: {
          competitions: {
            title: 'International Space Technology Competitions',
            desc: 'Participate in exciting competitions, design satellites, rockets and create the future with us',
            button: 'Learn More'
          },
          products: {
            title: 'Educational Kits for Space Exploration',
            desc: 'Professional learning kits for schools: rockets, drones, satellites and more',
            button: 'View Products'
          },
          settlement: {
            title: 'AEROO Space Settlement Competition 2025',
            dates: 'Registration until October 25, 2025 | Hackathon October 28-29',
            registration: 'National online hackathon on space settlement design',
            button: 'Participate'
          }
        },
        features: {
          title: 'Learning Directions',
          subtitle: 'Immerse yourself in the world of aerospace technologies through practical courses and exciting competitions',
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
            winner: 'Winner',
            participant: 'Participant'
          },
          items: {
            0: {
              text: 'AEROO helps our students develop in engineering and space technologies. Their educational programs really inspire children!'
            },
            1: {
              text: 'Educational materials and kits from AEROO are well-structured and clear. Students enjoy working on projects.'
            },
            2: {
              text: 'Thanks to AEROO competitions, I was able to implement my rocket model project. It was an unforgettable experience!'
            },
            3: {
              text: 'Participation in AEROO programs opened up new horizons for me in aerospace technologies. I recommend it to everyone!'
            },
            4: {
              text: 'AEROO provides unique opportunities for practical learning. My students are thrilled with their methodology!'
            },
            5: {
              text: 'Cooperation with AEROO allowed us to create a modern laboratory for studying space technologies at our school.'
            }
          },
          cta: {
            text: 'Join thousands of satisfied participants and educators',
            competitions: 'Participate in Competitions',
            products: 'Order Kits'
          }
        }
      },
      nav: {
        competitions: 'Competitions',
        community: 'Community',
        courses: 'Courses',
        products: 'Products',
        about: 'About',
        contacts: 'Contacts',
        dashboard: 'Dashboard',
        login: 'Sign In',
      },
      news: {
        title: 'News About Us',
        instagramCta: 'For the latest news, follow us on Instagram:',
        items: {
          1: {
            title: 'AEROO Space AI Competition',
            date: '2024',
            summary: 'New opportunities for gifted children in Kazakhstan: science, sports, arts and AI',
            link: 'https://inbusiness.kz/ru/last/novye-vozmozhnosti-dlya-odarennyh-detej-v-rk-nauka-sport-iskusstvo-i-ii'
          },
          2: {
            title: 'Interview with AEROO founder',
            date: '2025',
            summary: 'He is only 23, but he has already launched a startup and teaches children to build space rockets',
            link: 'https://digitalbusiness.kz/2025-05-14/emu-vsego-23-a-on-uzhe-zapustil-startap-i-uchit-detey-stroit-kosmicheskie-raketi-istoriya-parnya-iz-almati/'
          },
          3: {
            title: 'Helping children learn engineering',
            date: '2024',
            summary: 'Helping children learn engineering in practice and raising future astronauts',
            link: 'https://er10.kz/read/analitika/pomogajut-detjam-izuchit-inzheneriju-na-praktike-i-vospityvajut-budushhih-kosmonavtov-istorija-startapa-rockettech/'
          },
          4: {
            title: 'Forbes about AEROO',
            date: '2024',
            summary: 'Kazakh rockets: are we ready to explore together with generation Z children?',
            link: 'https://forbes.kz/articles/kazrockets_zyimyiran_jasaua_yizyiatyin_balalarmen_aryishtyi_brlese_zertteuge_dayyinbyiz'
          },
          5: {
            title: 'Memorandum with Kazakhstan Engineering',
            date: '2024',
            summary: 'Memorandum signed with representatives of Kazakhstan Engineering',
            link: 'https://ke.kz/ru/press-center/news/4864/'
          },
          6: {
            title: 'Training future engineers',
            date: '2024',
            summary: 'Why training future engineers in Kazakhstan is built on enthusiasm',
            link: 'https://inbusiness.kz/ru/news/pochemu-podgotovka-budushih-inzhenerov-v-kazahstane-stroitsya-na-entuziazme'
          }
        },
        readMore: 'Read More'
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
        archiveDesc: 'View results of past competitions and participant works',
        archiveBtn: 'View Archive',
        archiveToastTitle: 'Archive will be available soon',
        archiveToastDesc: "We're working on creating an archive of past competitions. The history of all our events will appear here soon!",
        toastNotOpenTitle: 'Registration not yet open',
        toastNotOpenDesc: 'Information will be released soon — stay tuned.',
        toastSoonTitle: 'Information coming soon',
        toastSoonDesc: 'Stay tuned',
        toastNeedConsentTitle: 'Consent required',
        toastNeedConsentDesc: 'Please confirm consent to the rules',
        toastEnrollError: 'Registration error',
        toastEnrollSuccessTitle: 'Registration successful!',
        openRegistration: 'Registration',
        pendingRegistration: 'Coming Soon',
        registrationClosed: 'Closed',
        aerooFest: {
          title: "AEROO Fest 2026",
          category: "National Festival",
          description: "Grand festival of space technologies and innovation for participants of all ages",
          status: "Coming Soon",
          deadline: "",
          ages: "7-18 years"
        },
        satelliteLaunch: {
          title: "Satellite Launch 2026",
          category: "Space Competition",
          description: "International satellite launch competition with real launch opportunities",
          status: "Coming Soon",
          deadline: "",
          ages: "14-18 years"
        },
        spaceSettlement: {
          title: "Space Settlement 2025",
          category: "Settlement Design",
          description: "Create a space settlement project of the future with a team of like-minded people",
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
        rocketScience: {
          title: "Rocket Science 2026",
          category: "Rocket Engineering",
          description: "Build and launch your own rockets, learn the basics of aerodynamics",
          status: "Registration",
          deadline: "November 20, 2025",
          ages: "12-18 years"
        },
        driveCompetition: {
          title: "DRIVE Competition",
          category: "Engineering Solutions",
          description: "Create innovative transport solutions for space missions",
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
        },
        exploringWorldOfScience: {
          title: "Exploring World of Science",
          category: "Scientific-Practical Competition",
          description: "Explore various scientific directions and implement your own research projects",
          status: "Registration",
          deadline: "November 15, 2025",
          ages: "14-18 years"
        }
      },
      cta: {
        apply: 'Apply'
      },
      footer: {
        description: 'Educational platform connecting school students and young engineers around aerospace technologies.',
        location: 'Almaty, Kazakhstan',
        sections: {
          0: {
            title: 'Platform',
            links: {
              0: 'Competitions',
              1: 'Courses',
              2: 'Products',
              3: 'About',
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
      },
      products: {
        metaTitle: "AEROO Products — Kits and Constructors",
        detailsNotReady: "Detailed page under development",
        detailsComingSoon: "Detailed product information will be available soon",
        hero: {
          title: "AEROO Products",
          subtitle: "Educational kits for studying aerospace technologies. From simple rocket models to complex nanosatellites."
        },
        advantages: {
          title: "Advantages of Our Kits",
          items: {
            0: {
              title: "Innovative Technologies",
              desc: "We use the latest achievements in aerospace technologies"
            },
            1: {
              title: "Complete Safety",
              desc: "All kits undergo strict certification and testing"
            },
            2: {
              title: "Expert Support",
              desc: "Technical support and consultations from our engineers"
            }
          }
        },
        grid: {
          title: "Our Products"
        },
        items: {
          "rocket-kit": {
            category: "Rockets",
            title: "Rocket Science Kit",
            description: "Educational kit for learning the basics of rocket science and aerodynamics",
            features: {
              0: "Safe engines",
              1: "Rocket constructor",
              2: "Build your own rocket",
              3: "Launch simulation"
            }
          },
          "cansat-kit": {
            category: "Rockets",
            title: "CanSat Kit",
            description: "For assembling and launching a CanSat satellite aboard a model rocket",
            features: {
              0: "Advanced rocket model",
              1: "Electronics work",
              2: "Real-time data",
              3: "Payload"
            }
          },
          "satellite-kit": {
            category: "Satellites",
            title: "CubeSat Kit",
            description: "Satellite with the ability to launch into the stratosphere for real scientific experiments",
            features: {
              0: "Solar panels",
              1: "LoRa radio system",
              2: "Onboard computer",
              3: "Sensors"
            }
          },
          "football-drone-kit": {
            category: "Drones",
            title: "Drone Football Kit",
            description: "Kit for drone football matches — control a drone, compete and develop team spirit",
            features: {
              0: "Safe flight",
              1: "Training net and goals",
              2: "Sportsmanship",
              3: "Strategic thinking"
            }
          }
        },
        inStock: "In Stock",
        outOfStock: "Out of Stock",
        includes: "What's included:",
        cta: {
          details: "Details",
          request: "Request",
          notify: "Notify on Arrival"
        },
        help: {
          title: "Need Consultation?",
          desc: "Our experts will help you choose the right kit for your skill level and educational goals. Contact us for a personalized consultation."
        },
        catalog: {
          soon: "Catalog Soon",
          pdfLater: "PDF catalog will be available later",
          download: "Download Catalog"
        },
        request: {
          sent: "Request Sent",
          weWillContact: "We will contact you by email"
        }
      },
      about: {
        metaTitle: "About AEROO — Mission and Team",
        metaDesc: "AEROO educational ecosystem: mission, values, team and partners",
        heroTitle: "About AEROO",
        heroSubtitle: "We inspire and educate a new generation of creators, developing skills, teamwork and systemic thinking in the field of aerospace technologies.",
        missionTitle: "Our Mission",
        missionText: "To create an educational ecosystem that unites schoolchildren, students and young engineers around advanced technologies. We strive to make aerospace knowledge accessible to every talented person.",
        valuesTitle: "Our Values",
        values: {
          innovation: "Innovation and technological excellence",
          openness: "Openness and accessibility of education",
          teamwork: "Teamwork and mutual assistance",
          excellence: "Pursuit of excellence"
        },
        achievementsTitle: "Our Achievements",
        achievements: {
          participants: "participants",
          events: "events",
          countries: "countries"
        },
        teamTitle: "Our Team",
        teamMembers: {
          mirasName: "Miras Nussupov",
          miraRole: "CEO",
          mirasBio: "Expert in STEAM education and educational product development",
          ryspayName: "Ryspay Alikhan",
          ryspayRole: "COO",
          ryspayBio: "6 years in STEAM education, ex CTO FIRST Robotics"
        },
        partnersTitle: "Our Partners",
        becomePartner: "Become a Partner",
        leadTitle: "Contact Us",
        leadRequired: "Fill in name and email",
        leadSuccess: "Thank you! We will contact you soon.",
        formName: "Name",
        formPhone: "Phone",
        formMessage: "Message",
        sendMessage: "Send",
        sending: "Sending...",
        privacyNote: "By submitting the form, you agree to the privacy policy."
      },
      satelliteLaunch2026: {
        seo: {
          title: "AEROO Satellite Launch Competition 2026 — Nanosatellite Tournament",
          description: "International tournament for developing and launching nanosatellites. Registration Nov 1, 2025 – Jan 1, 2026, final Apr 9-12, 2026, Astana."
        },
        hero: {
          title: "AEROO Satellite Launch Competition 2026",
          subtitle: "International engineering tournament for developing and launching nanosatellites",
          dates: "Registration: November 1, 2025 – January 1, 2026 | Final: April 9–12, 2026, Astana"
        },
        cta: {
          participate: "Participate",
          readRegulation: "Read Regulations"
        },
        about: {
          title: "About the Tournament",
          text1: "Kazakhstan is the homeland of the Baikonur Cosmodrome, from which the first artificial satellite of Earth was launched in 1957. Continuing this tradition, AEROO Satellite Launch Competition brings together teams of young engineers to design, assemble, and launch nanosatellites into the stratosphere.",
          text2: "Participants create mission concepts, develop software, assemble and test satellites, and then launch them at the final. The tournament develops engineering and critical thinking, teamwork skills, and international collaboration.",
          videoNotSupported: "Your browser does not support video playback."
        },
        aboutAeroo: {
          title: "About AEROO",
          text: "AEROO is an organization that develops aerospace education through engineering competitions and educational programs. We prepare a new generation of engineers and scientists for the space industry."
        },
        goals: {
          title: "How It Was Last Year?",
          text: "The tournament's goal is to engage youth in practical engineering activities and increase interest in space technologies through project and team work."
        },
        benefits: {
          title: "Participation Benefits",
          certificates: "Development of technical thinking and applied engineering skills",
          networking: "Systemic design of satellite missions",
          skills: "3D modeling, CAD and printed circuit board (PCB) tracing",
          practice: "Software development and debugging for microcontrollers, telemetry and sensors",
          opportunities: "Preparation of presentations and defense of engineering solutions: teamwork",
          media: "Expansion of knowledge in aerospace, experience exchange and international culture"
        }
      },
      spaceSettlement2025: {
        meta: {
          title: "AEROO Space Settlement Competition 2025 — Online Hackathon",
          description: "Online hackathon on space settlement design for schoolchildren. Registration: Sept 20 – Oct 25, 2025, hackathon: Oct 28-29, 2025."
        },
        hero: {
          title: "AEROO Space Settlement Competition 2025",
          subtitle: "National Online Hackathon on Space Settlement Design",
          dates: "Registration until Oct 25, 2025 | Hackathon Oct 28-29, 2025",
          participate: "Participate",
          learnMore: "Learn More"
        },
        countdown: {
          title: "Until Registration Closes",
          deadline: "October 25, 2025, 23:59 GMT+5",
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
          text1: "AEROO Space Settlement Competition 2025 is a national online hackathon with research and engineering focus for school students.",
          text2: "The goal is to develop skills in space settlement design, scientific analysis, and engineering justification.",
          text3: "Top participants will join Kazakhstan's national team for the international",
          nssLink: "NSS Space Settlement Contest"
        },
        rules: {
          title: "Competition Regulations",
          description: "Detailed information on participation rules, evaluation criteria, and project requirements",
          button: "Open Regulations"
        },
        goals: {
          title: "Goals and Objectives",
          items: [
            "Develop engineering and research competencies of schoolchildren",
            "Develop space settlement projects with scientific and engineering justification",
            "Form Kazakhstan's national team for NSS Space Settlement Contest",
            "Promote aerospace directions",
            "Identify and support talented participants"
          ]
        },
        format: {
          title: "Format and Hackathon Sections",
          junior: "Junior League: Grades 7-9",
          senior: "Senior League: Grades 10-12",
          task: "Task: Develop a scientific-engineering project on space colonization (10-15 pages)",
          duration: "Format: Online, 36 hours to complete from task publication"
        },
        timeline: {
          title: "Key Dates",
          deadline: "October 25, 2025 (23:59 GMT+5) — Application deadline",
          hackathon: "October 28-29, 2025 — Hackathon (36 hours to complete)"
        },
        submission: {
          title: "Project Submission",
          description: "All projects are submitted digitally through the organizers' platform before the deadline. Plagiarism is prohibited."
        },
        awards: {
          title: "Awards",
          items: [
            "Cash prizes",
            "Grants from Energo University",
            "Formation of Kazakhstan's national team for NSS Space Settlement Contest"
          ]
        },
        contacts: {
          title: "Contacts"
        }
      },
      ews: {
        seo: {
          title: 'Exploring the World of Science — International Space Research Competitions',
          description: 'Free competitions for students aged 14–18: nanosatellites, space AI, and rocket modeling. Registration until January 19, 2026.'
        },
        hero: {
          badge: 'International Competition',
          title: 'Exploring the World of Science',
          subtitle: 'International scientific competitions in space research for students aged 14–18',
          facts: {
            free: 'Free',
            categories: '3 categories',
            final: 'Astana: April 9–12, 2026 (GMT+5)'
          }
        },
        cta: {
          register: 'Register',
          login: 'Dashboard',
          soon: 'Registration Opening Soon',
          closed: 'Registration Closed'
        },
        about: {
          title: 'About the Competition',
          organizers: 'Organizers',
          intro: 'The organizers are Daryn RSPC and AEROO',
          mission: 'Our mission is to engage youth in space science through real engineering competitions.',
          format: 'International format, in-person final in Astana',
          who: {
            title: 'Who Can Participate',
            text: 'Students aged 14–18 (individual/team — depends on category)'
          },
          cost: {
            title: 'Participation Cost',
            text: 'Free'
          }
        },
        tracks: {
          title: 'Competition Categories',
          subtitle: 'Choose your track',
          age: 'Age',
          team: 'Team',
          details: 'Learn More',
          stages_title: 'Stages',
          aslc: {
            name: 'AEROO Satellite Launch Competition (ASLC)',
            summary: 'Design and build a nanosatellite based on AEROO CubeSat Kit, final launch from stratospheric balloon.',
            age: '14–18',
            team: '4 participants',
            stages: [
              'Online: mission concept',
              'Online: engineering project',
              'In-person final: assembly and launch'
            ]
          },
          space_ai: {
            name: 'AEROO Space AI Competition',
            summary: 'Space project using AI and commercial model; MVP and pitch.',
            age: '14–18',
            team: 'up to 4 participants',
            stages: [
              'Online: 1 month for idea/AI/MVP',
              'In-person final: project defense'
            ]
          },
          rocket_science: {
            name: 'AEROO Rocket Science Competition',
            summary: 'Water rockets and model rockets',
            age: '14–18',
            team: 'up to 2 participants',
            stages: ['Online stage', 'In-person final'],
            subtracks_title: 'Subcategories',
            water_rockets: {
              name: 'Water Rockets',
              summary: 'Build and launch water rocket; focus on stable flight and distance.',
              age: '14–15 (may be 14–16 by organizers decision)',
              team: 'up to 2 participants'
            },
            model_rockets: {
              name: 'Model Rockets (2.5H*c)',
              summary: 'OpenRocket project and mockup; final launch with parachute and eco-mission.',
              age: '15–18',
              team: 'up to 2 participants'
            }
          }
        },
        timeline: {
          title: 'Timeline',
          registration: {
            label: 'Registration',
            date: 'October 10, 2025 (12:00) — January 19, 2026 (23:59)',
            desc: 'Register on the platform and form your team'
          },
          submission: {
            label: 'Online Selection',
            date: 'February 1–28, 2026',
            desc: 'Complete and submit assignments'
          },
          results: {
            label: 'Selection Results',
            date: 'March 10, 2026 (12:00)',
            desc: 'Finalists announcement'
          },
          arrival: {
            label: 'Teams Arrival',
            date: 'April 8, 2026',
            desc: 'Arrival in Astana and preparation'
          },
          final: {
            label: 'Final',
            date: 'April 9–12, 2026, Astana',
            desc: 'Project defense and winners determination'
          }
        },
        prizes: {
          title: 'Prizes and Opportunities',
          medals: {
            title: 'Medals and Diplomas',
            desc: 'I, II, III degree diplomas from Ministry of Education of RK'
          },
          special: {
            title: 'Special Prizes',
            desc: 'Gifts from organizers and partners'
          },
          fund: {
            title: 'AEROO Prize Fund',
            desc: 'Cash prizes by jury and organizers decision'
          },
          education: {
            title: 'Educational Opportunities',
            desc: 'Potential grants from G. Daukeyev AUES'
          }
        },
        howto: {
          title: 'How to Participate',
          step1: {
            title: 'Register',
            desc: 'Create an account on AEROO platform'
          },
          step2: {
            title: 'Complete Tasks',
            desc: 'Pass the online stage in your category'
          },
          step3: {
            title: 'Come to Final',
            desc: 'Defend your project in Astana'
          }
        },
        faq: {
          title: 'FAQ',
          free: {
            q: 'Is it free?',
            a: 'Yes, participation is completely free.'
          },
          language: {
            q: 'What language is it held in?',
            a: 'The competition is held in three languages: Russian, Kazakh, English.'
          },
          organizers: {
            q: 'Who are the organizers?',
            a: 'Daryn RSPC of the Ministry of Education of RK and AEROO company.'
          },
          age: {
            q: 'Are there age restrictions?',
            a: 'See the category cards above — each track has its own age limits.'
          },
          logistics: {
            q: 'Who pays for the trip?',
            a: 'Logistics and accommodation are covered by organizers and sending party according to official announcements.'
          }
        },
        contacts: {
          title: 'Contacts',
          org: {
            title: 'Organizational Questions'
          },
          tech: {
            title: 'Technical Questions and Platform'
          }
        },
        email: {
          title: 'Subscribe to News',
          desc: 'Get notified when registration opens',
          placeholder: 'Your email',
          submit: 'Subscribe'
        }
      },
      contacts: {
        meta: {
          title: 'AEROO — Contacts | Get in Touch',
          description: 'AEROO contact information. Phone, Telegram, address in Almaty. We are always ready to answer your questions.'
        },
        title: 'Contacts',
        subtitle: 'Get in touch with us',
        phone: 'Phone',
        telegram: 'Telegram',
        location: 'Location'
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
      }
    }
  },
  kz: {
    translation: {
      home: {
        metaTitle: 'AEROO — Білім беру платформасы',
        hero: {
          competitions: {
            title: 'Ғарыштық технологиялар бойынша халықаралық жарыстар',
            desc: 'Қызықты жарыстарға қатысыңыз, спутниктерді, зымырандарды жобалаңыз және бізбен бірге болашақты жасаңыз',
            button: 'Толығырақ'
          },
          products: {
            title: 'Ғарышты зерттеуге арналған білім беру жинақтары',
            desc: 'Мектептерге арналған кәсіби оқу жинақтары: зымырандар, дрондар, спутниктер және т.б.',
            button: 'Өнімдерді қарау'
          },
          settlement: {
            title: 'AEROO Space Settlement Competition 2025',
            dates: '25 қазанға дейін тіркелу | Хакатон 28-29 қазан',
            registration: 'Ғарыштық қоныстарды жобалау бойынша республикалық онлайн-хакатон',
            button: 'Қатысу'
          }
        },
        features: {
          title: 'Оқу бағыттары',
          subtitle: 'Практикалық курстар мен қызықты жарыстар арқылы аэроғарыштық технологиялар әлеміне енің із',
          items: {
            0: {
              title: 'Зымыран құрылысы',
              desc: 'Аэродинамиканы зерттеу, қатты отын қозғалтқыштары бар зымыран үлгілерін жобалау және ұшыру'
            },
            1: {
              title: 'БПЛА',
              desc: 'Дрондарды бағдарламалау, FPV-ұшыру, аэротүсірім және автономды ұшулар'
            },
            2: {
              title: 'Спутниктік технологиялар',
              desc: 'Наноспутниктерді жасау, борттық жүйелерді зерттеу және ұшыруға дайындық'
            },
            3: {
              title: 'Жасанды интеллект',
              desc: 'Ғарыштық миссияларды басқару және навигация үшін автономды алгоритмдерді әзірлеу'
            },
            4: {
              title: 'Жарыстар',
              desc: 'Аэроғарыштық технологиялар бойынша халықаралық конкурстарға қатысу'
            },
            5: {
              title: 'Командалық жұмыс',
              desc: 'Көп пәнді жобаларда ынтымақтастық дағдыларын дамыту'
            }
          },
          learnMore: 'Толығырақ білу',
          cta: {
            title: 'Ғарышқа саяхатты бастауға дайынсыз ба?',
            courses: 'Мектептерге арналған білім беру жинақтары',
            competitions: 'Жақын арадағы жарыстар'
          }
        },
        testimonials: {
          title: 'AEROO туралы пікірлер',
          subtitle: 'Мектеп директорлары, мұғалімдер, қатысушылар және жарыс жеңімпаздары біз туралы не айтады',
          types: {
            director: 'Директор',
            teacher: 'Мұғалім',
            winner: 'Жеңімпаз',
            participant: 'Қатысушы'
          },
          items: {
            0: {
              text: 'AEROO біздің оқушыларымызға инженерия және ғарыштық технологиялар саласында дамуға көмектеседі. Олардың білім беру бағдарламалары балаларды шынымен шабыттандырады!'
            },
            1: {
              text: 'AEROO-дан оқу материалдары мен жинақтары жақсы құрылымдалған және түсінікті. Оқушылар жобалар үстінде жұмыс істегенді ұнатады.'
            },
            2: {
              text: 'AEROO жарыстарының арқасында мен зымыран үлгісін жасау жобамды іске асыра алдым. Бұл ұмытылмас тәжірибе болды!'
            },
            3: {
              text: 'AEROO бағдарламаларына қатысу маған аэроғарыштық технологиялар саласында жаңа көкжиектер ашты. Барлығына ұсынамын!'
            },
            4: {
              text: 'AEROO практикалық оқытудың бірегей мүмкіндіктерін ұсынады. Менің оқушыларым олардың әдістемесінен қуанышта!'
            },
            5: {
              text: 'AEROO-мен ынтымақтастық бізге мектебімізде ғарыштық технологияларды зерттеуге арналған заманауи зертхана құруға мүмкіндік берді.'
            }
          },
          cta: {
            text: 'Мыңдаған қанағаттанған қатысушылар мен педагогтарға қосылыңыз',
            competitions: 'Жарыстарға қатысу',
            products: 'Жинақтарға тапсырыс беру'
          }
        }
      },
      nav: {
        competitions: 'Жарыстар',
        community: 'Қауымдастық',
        courses: 'Курстар',
        products: 'Өнімдер',
        about: 'Біз туралы',
        contacts: 'Байланыс',
        dashboard: 'Жеке кабинет',
        login: 'Кіру',
      },
      news: {
        title: 'Біз туралы жаңалықтар',
        instagramCta: 'Соңғы жаңалықтар үшін Instagram-да жазылыңыз:',
        items: {
          1: {
            title: 'AEROO Space AI жарысы',
            date: '2024',
            summary: 'ҚР дарынды балалар үшін жаңа мүмкіндіктер: ғылым, спорт, өнер және ЖИ',
            link: 'https://inbusiness.kz/ru/last/novye-vozmozhnosti-dlya-odarennyh-detej-v-rk-nauka-sport-iskusstvo-i-ii'
          },
          2: {
            title: 'AEROO негізін қалаушымен сұхбат',
            date: '2025',
            summary: 'Ол тек 23 жаста, бірақ ол старт-ап іске қосып, балаларға ғарыштық зымырандар жасауды үйретеді',
            link: 'https://digitalbusiness.kz/2025-05-14/emu-vsego-23-a-on-uzhe-zapustil-startap-i-uchit-detey-stroit-kosmicheskie-raketi-istoriya-parnya-iz-almati/'
          },
          3: {
            title: 'Балаларға инженерияны үйретеді',
            date: '2024',
            summary: 'Балаларға инженерияны практикада үйренуге көмектеседі және болашақ ғарышкерлерді тәрбиелейді',
            link: 'https://er10.kz/read/analitika/pomogajut-detjam-izuchit-inzheneriju-na-praktike-i-vospityvajut-budushhih-kosmonavtov-istorija-startapa-rockettech/'
          },
          4: {
            title: 'Forbes AEROO туралы',
            date: '2024',
            summary: 'Қазақ зымырандары: біз Z ұрпағының балаларымен бірге зерттеуге дайынбыз ба?',
            link: 'https://forbes.kz/articles/kazrockets_zyimyiran_jasaua_yizyiatyin_balalarmen_aryishtyi_brlese_zertteuge_dayyinbyiz'
          },
          5: {
            title: 'Kazakhstan Engineering-мен меморандум',
            date: '2024',
            summary: 'Kazakhstan Engineering өкілдерімен меморандум қол қойылды',
            link: 'https://ke.kz/ru/press-center/news/4864/'
          },
          6: {
            title: 'Болашақ инженерлерді дайындау',
            date: '2024',
            summary: 'Неліктен Қазақстанда болашақ инженерлерді дайындау энтузиазмға негізделген',
            link: 'https://inbusiness.kz/ru/news/pochemu-podgotovka-budushih-inzhenerov-v-kazahstane-stroitsya-na-entuziazme'
          }
        },
        readMore: 'Толығырақ оқу'
      },
      competitions: {
        title: 'AEROO жарыстары',
        subtitle: 'Аэроғарыштық технологиялар бойынша инновациялық жарыстарға қосылыңыз. Дағдыларыңызды тексеріңіз және болашақты бірге жасаңыз.',
        age: 'Жас:',
        deadline: 'Мерзім:',
        details: 'Толығырақ',
        participate: 'Қатысу',
        enrollTeam: 'Команда тіркеу',
        archiveTitle: 'Жарыстар мұрағаты',
        archiveDesc: 'Өткен жарыстардың нәтижелері мен қатысушылардың жұмыстарын қараңыз',
        archiveBtn: 'Мұрағатты қарау',
        archiveToastTitle: 'Мұрағат жақында қолжетімді болады',
        archiveToastDesc: 'Біз өткен жарыстардың мұрағатын жасаумен айналысып жатырмыз. Жақында барлық іс-шараларымыздың тарихы осында пайда болады!',
        toastNotOpenTitle: 'Тіркеу әлі ашылмаған',
        toastNotOpenDesc: 'Жақында ақпарат шығады — хабардар болыңыз.',
        toastSoonTitle: 'Жақында ақпарат шығады',
        toastSoonDesc: 'Хабардар болыңыз',
        toastNeedConsentTitle: 'Келісім қажет',
        toastNeedConsentDesc: 'Ережелермен келісуді растаңыз',
        toastEnrollError: 'Тіркеу қатесі',
        toastEnrollSuccessTitle: 'Тіркеу сәтті!',
        aerooFest: {
          title: "AEROO Fest 2026",
          category: "Республикалық фестиваль",
          description: "Барлық жастағы қатысушыларға арналған ғарыштық технологиялар мен инновациялардың грандиозды фестивалі",
          status: "Жақында",
          deadline: "",
          ages: "7-18 жас"
        },
        satelliteLaunch: {
          title: "Satellite Launch 2026",
          category: "Ғарыш жарысы",
          description: "Нақты ұшыру мүмкіндіктері бар серіктерді ұшыру бойынша халықаралық жарыс",
          status: "Жақында",
          deadline: "",
          ages: "14-18 жас"
        },
        spaceSettlement: {
          title: "Space Settlement 2025",
          category: "Қоныстарды жобалау",
          description: "Ойдағыдай адамдар тобымен болашақтың ғарыштық қонысы жобасын жасаңыз",
          status: "Тіркелу",
          deadline: "25 қазан 2025",
          ages: "12-18 жас"
        },
        aiChallenge: {
          title: "Space AI 2026",
          category: "Жасанды интеллект",
          description: "Ғарыштық тапсырмалар мен зерттеулер үшін AI шешімдерін әзірлеңіз",
          status: "Әзірленуде",
          deadline: "",
          ages: "16-25 жас"
        },
        rocketScience: {
          title: "Rocket Science 2026",
          category: "Зымыран құрылысы",
          description: "Өз зымырандарыңызды жасаңыз және ұшырыңыз, аэродинамиканың негіздерін үйреніңіз",
          status: "Тіркелу",
          deadline: "20 қараша 2025",
          ages: "12-18 жас"
        },
        driveCompetition: {
          title: "DRIVE жарысы",
          category: "Инженерлік шешімдер",
          description: "Ғарыштық миссияларға арналған инновациялық көлік шешімдерін жасаңыз",
          status: "Әзірленуде",
          deadline: "",
          ages: "14-20 жас"
        },
        droneCompetition: {
          title: "Drone Football",
          category: "Дрондар",
          description: "Командалар қорғаныс сфераларында дрондарды басқарады және арнайы аренада ұшып жүріп гол салып жарысады.",
          status: "Жақында",
          deadline: "",
          ages: "12-18 жас"
        },
        exploringWorldOfScience: {
          title: "Ғылым әлемін ашу",
          category: "Ғылыми-тәжірибелік конкурс",
          description: "Әртүрлі ғылыми бағыттарды зерттеңіз және өз зерттеу жобаларыңызды жүзеге асырыңыз",
          status: "Тіркелу",
          deadline: "15 қараша 2025",
          ages: "14-18 жас"
        }
      },
      cta: {
        apply: 'Өтінім беру'
      },
      footer: {
        description: 'Аэроғарыштық технологиялар айналасында мектеп оқушылары мен жас инженерлерді біріктіретін білім беру платформасы.',
        location: 'Алматы, Қазақстан',
        sections: {
          0: {
            title: 'Платформа',
            links: {
              0: 'Жарыстар',
              1: 'Курстар',
              2: 'Өнімдер',
              3: 'Біз туралы',
              4: 'Мансап'
            }
          },
          1: {
            title: 'Қолдау',
            links: {
              0: 'Байланыс',
              1: 'FAQ',
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
      },
      products: {
        metaTitle: "AEROO Өнімдері — Жиынтықтар мен Конструкторлар",
        detailsNotReady: "Толық бет әзірленуде",
        detailsComingSoon: "Өнім туралы толық ақпарат жақын арада қолжетімді болады",
        hero: {
          title: "AEROO Өнімдері",
          subtitle: "Ғарыштық технологияларды зерттеуге арналған білім беру жиынтықтары. Қарапайым зымыран үлгілерінен күрделі наноспутниктерге дейін."
        },
        advantages: {
          title: "Біздің Жиынтықтардың Артықшылықтары",
          items: {
            0: {
              title: "Инновациялық Технологиялар",
              desc: "Ғарыштық технологиялар саласындағы соңғы жетістіктерді қолданамыз"
            },
            1: {
              title: "Толық Қауіпсіздік",
              desc: "Барлық жиынтықтар қатаң сертификаттау мен сынақтан өтеді"
            },
            2: {
              title: "Сарапшылардың Қолдауы",
              desc: "Біздің инженерлерден техникалық қолдау және кеңестер"
            }
          }
        },
        grid: {
          title: "Біздің Өнімдер"
        },
        items: {
          "rocket-kit": {
            category: "Зымырандар",
            title: "Rocket Science Kit",
            description: "Зымыран құрылысы мен аэродинамика негіздерін үйренуге арналған білім беру жиынтығы",
            features: {
              0: "Қауіпсіз қозғалтқыштар",
              1: "Зымыран конструкторы",
              2: "Өз зымыраныңды жаса",
              3: "Ұшыру симуляциясы"
            }
          },
          "cansat-kit": {
            category: "Зымырандар",
            title: "CanSat Kit",
            description: "CanSat форматындағы спутникті модельдік зымыран бортында жинауға және ұшыруға арналған",
            features: {
              0: "Жетілдірілген зымыран үлгісі",
              1: "Электроникамен жұмыс",
              2: "Нақты уақыттағы деректер",
              3: "Пайдалы жүк"
            }
          },
          "satellite-kit": {
            category: "Спутниктер",
            title: "CubeSat Kit",
            description: "Нақты ғылыми тәжірибелер жүргізу үшін стратосфераға ұшыру мүмкіндігі бар спутник",
            features: {
              0: "Күн панельдері",
              1: "LoRa радиожүйесі",
              2: "Борттық компьютер",
              3: "Датчиктер"
            }
          },
          "football-drone-kit": {
            category: "Дрондар",
            title: "Drone Football Kit",
            description: "Дрон футбол ойындарына арналған жиынтық — дронды басқар, жарыс және командалық рухты дамыт",
            features: {
              0: "Қауіпсіз ұшу",
              1: "Жаттығу торы мен қақпалар",
              2: "Спорттық рух",
              3: "Стратегиялық ойлау"
            }
          }
        },
        inStock: "Қолжетімді",
        outOfStock: "Қолжетімді емес",
        includes: "Жиынтыққа не кіреді:",
        cta: {
          details: "Толығырақ",
          request: "Өтінім қалдыру",
          notify: "Келгенде хабарлау"
        },
        help: {
          title: "Кеңес керек пе?",
          desc: "Біздің сарапшылар сіздің дайындық деңгейіңіз бен білім беру мақсаттарыңызға сәйкес жиынтықты таңдауға көмектеседі. Жеке кеңес алу үшін бізбен байланысыңыз."
        },
        catalog: {
          soon: "Каталог Жақында",
          pdfLater: "PDF-каталог кейінірек қолжетімді болады",
          download: "Каталогты Жүктеу"
        },
        request: {
          sent: "Өтінім Жіберілді",
          weWillContact: "Біз сізбен email арқылы байланысамыз"
        }
      },
      about: {
        metaTitle: "AEROO туралы — миссия және команда",
        metaDesc: "AEROO білім беру экожүйесі: миссия, құндылықтар, команда және серіктестер",
        heroTitle: "AEROO туралы",
        heroSubtitle: "Біз жаңа буын жасаушыларды шабыттандырамыз және оқытамыз, ғарыштық технологиялар саласында дағдыларды, командалық жұмысты және жүйелі ойлауды дамытамыз.",
        missionTitle: "Біздің миссиямыз",
        missionText: "Мектеп оқушылары, студенттер мен жас инженерлерді озық технологиялар айналасында біріктіретін білім беру экожүйесін құру. Біз ғарыштық білімді әрбір талантты адамға қолжетімді ету үшін тырысамыз.",
        valuesTitle: "Біздің құндылықтарымыз",
        values: {
          innovation: "Инновациялар мен технологиялық үстемдік",
          openness: "Білім берудің ашықтығы мен қолжетімділігі",
          teamwork: "Командалық жұмыс және өзара көмек",
          excellence: "Үздік болуға ұмтылу"
        },
        achievementsTitle: "Біздің жетістіктеріміз",
        achievements: {
          participants: "қатысушы",
          events: "шара",
          countries: "ел"
        },
        teamTitle: "Біздің команда",
        teamMembers: {
          mirasName: "Мирас Нусупов",
          miraRole: "Бас директор",
          mirasBio: "STEAM-білім беру және білім беру өнімдерін әзірлеу саласындағы сарапшы",
          ryspayName: "Рыспай Әлихан",
          ryspayRole: "Операциялық директор",
          ryspayBio: "STEAM-білім беруде 6 жыл, бұрынғы FIRST Robotics CTO"
        },
        partnersTitle: "Біздің серіктестер",
        becomePartner: "Серіктес болу",
        leadTitle: "Бізбен байланысыңыз",
        leadRequired: "Атыңыз бен email толтырыңыз",
        leadSuccess: "Рахмет! Біз сізбен жақын арада байланысамыз.",
        formName: "Аты",
        formPhone: "Телефон",
        formMessage: "Хабарлама",
        sendMessage: "Жіберу",
        sending: "Жіберілуде...",
        privacyNote: "Форманы жібере отырып, сіз құпиялылық саясатымен келісесіз."
      },
      spaceSettlement2025: {
        meta: {
          title: "AEROO Space Settlement Competition 2025 — онлайн-хакатон",
          description: "Мектеп оқушыларына арналған ғарыштық қоныстарды жобалау бойынша онлайн-хакатон. Тіркелу: 20.09–25.10.2025, хакатон: 28–29.10.2025."
        },
        hero: {
          title: "AEROO Space Settlement Competition 2025",
          subtitle: "Ғарыштық қоныстарды жобалау бойынша республикалық онлайн-хакатон",
          dates: "25.10.2025 дейін тіркелу | Хакатон 28-29 қазан 2025",
          participate: "Қатысу",
          learnMore: "Толығырақ"
        },
        countdown: {
          title: "Тіркелу аяқталғанша",
          deadline: "25 қазан 2025, 23:59 GMT+5",
          days: "күн",
          hours: "сағат",
          minutes: "минут",
          seconds: "секунд"
        },
        breadcrumbs: {
          home: "Басты бет",
          competitions: "Жарыстар"
        },
        about: {
          title: "Жарыс туралы",
          text1: "AEROO Space Settlement Competition 2025 — мектеп оқушыларына арналған ғылыми-зерттеу және инженерлік бағытты республикалық онлайн-хакатон.",
          text2: "Мақсаты — ғарыштық қоныстарды жобалау, ғылыми талдау және инженерлік негіздеу дағдыларын дамыту.",
          text3: "Үздік қатысушылар халықаралық жарысқа қатысу үшін Қазақстан құраmasына кіреді",
          nssLink: "NSS Space Settlement Contest"
        },
        rules: {
          title: "Жарыс туралы ереже",
          description: "Қатысу ережелері, бағалау өлшемдері және жобаларға қойылатын талаптар туралы толық ақпарат",
          button: "Ережені ашу"
        },
        goals: {
          title: "Мақсаттар мен міндеттер",
          items: [
            "Мектеп оқушыларының инженерлік және зерттеу құзыреттерін дамыту",
            "Ғылыми және инженерлік негіздемесі бар ғарыштық қоныстар жобаларын әзірлеу",
            "NSS Space Settlement Contest үшін Қазақстан құрамасын қалыптастыру",
            "Аэроғарыштық бағыттарды танымал ету",
            "Дарынды қатысушыларды анықтау және қолдау"
          ]
        },
        format: {
          title: "Хакатон форматы мен секциялары",
          junior: "Кіші лига: 7–9 сыныптар",
          senior: "Үлкен лига: 10–12 сыныптар",
          task: "Тапсырма: ғарышты отарлау тақырыбы бойынша ғылыми-инженерлік жоба әзірлеу (10–15 бет)",
          duration: "Формат: онлайн, тапсырма жарияланған сәттен бастап орындауға 36 сағат"
        },
        timeline: {
          title: "Негізгі күндер",
          deadline: "25 қазан 2025 (23:59 GMT+5) — өтінім беру мерзімі",
          hackathon: "28–29 қазан 2025 — хакатон (орындауға 36 сағат)"
        },
        submission: {
          title: "Жұмыстарды тапсыру",
          description: "Барлық жұмыстар белгіленген мерзімге дейін ұйымдастырушылардың платформасы арқылы электронды түрде жүктеледі. Плагиат тыйым салынған."
        },
        awards: {
          title: "Марапаттар",
          items: [
            "Ақшалай сыйлықтар",
            "Energo University грантары",
            "NSS Space Settlement Contest үшін Қазақстан құрамасын қалыптастыру"
          ]
        },
        contacts: {
          title: "Байланыстар"
        }
      },
      satelliteLaunch2026: {
        seo: {
          title: "AEROO Satellite Launch Competition 2026 — наноспутниктер турниры",
          description: "Наноспутниктерді әзірлеу және ұшыру бойынша халықаралық турнир. Тіркелу 1.11.2025–1.01.2026, финал 9–12.04.2026, Астана."
        },
        hero: {
          title: "AEROO Satellite Launch Competition 2026",
          subtitle: "Наноспутниктерді әзірлеу және ұшыру бойынша халықаралық инженерлік турнир",
          dates: "Тіркелу: 1 қараша 2025 – 1 қаңтар 2026 | Финал: 9–12 сәуір 2026, Астана"
        },
        cta: {
          participate: "Қатысу",
          readRegulation: "Регламентті оқу"
        },
        about: {
          title: "Турнир туралы",
          text1: "Қазақстан — Байқоңыр ғарыш айлағының отаны, одан 1957 жылы Жердің алғашқы жасанды серігі ұшырылды. Осы дәстүрді жалғастыра отырып, AEROO Satellite Launch Competition жас инженерлер командаларын наноспутниктерді жобалау, жинау және стратосфераға ұшыру үшін біріктіреді.",
          text2: "Қатысушылар миссия концепциясын жасайды, БҚ әзірлейді, спутниктерді жинайды және сынайды, содан кейін оларды финалда ұшырады. Турнир инженерлік және сыни ойлауды, командалық жұмыс дағдыларын және халықаралық өзара әрекеттесуді дамытады.",
          videoNotSupported: "Сіздің браузеріңіз бейне ойнатуды қолдамайды."
        },
        aboutAeroo: {
          title: "AEROO туралы",
          text: "AEROO — инженерлік жарыстар мен білім беру бағдарламалары арқылы ғарыштық білім беруді дамытатын ұйым. Біз ғарыштық өнеркәсіп үшін инженерлер мен ғалымдардың жаңа ұрпағын дайындаймыз."
        },
        goals: {
          title: "Өткен жылы қалай болды?",
          text: "Турнирдің мақсаты — жастарды практикалық инженерлік қызметке тарту және жоба және командалық жұмыс арқылы ғарыштық технологияларға қызығушылықты арттыру."
        },
        benefits: {
          title: "Қатысудың артықшылықтары",
          certificates: "Техникалық ойлау және қолданбалы инженерлік дағдыларды дамыту",
          networking: "Спутниктік миссияларды жүйелі жобалау",
          skills: "3D-модельдеу, CAD және басылған тізбектерді (PCB) трассировкалау",
          practice: "Микроконтроллерлер үшін БҚ әзірлеу және жөндеу, телеметрия және датчиктер",
          opportunities: "Презентацияларды дайындау және инженерлік шешімдерді қорғау: командалық жұмыс",
          media: "Ғарыштық білімді кеңейту, тәжірибе алмасу және халықаралық мәдениет"
        }
      },
      contacts: {
        meta: {
          title: 'AEROO — Байланыс | Бізбен хабарласыңыз',
          description: 'AEROO байланыс ақпараты. Телефон, Telegram, Алматыдағы мекен-жай. Біз сіздің сұрақтарыңызға жауап беруге әрдайым дайынбыз.'
        },
        title: 'Байланыс',
        subtitle: 'Бізбен хабарласыңыз',
        phone: 'Телефон',
        telegram: 'Telegram',
        location: 'Орналасу'
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
        edit: 'Өзгерту',
        delete: 'Жою',
        confirm: 'Растау',
        yes: 'Иә',
        no: 'Жоқ',
        learnMore: 'Толығырақ білу'
      },
      ews: {
        seo: {
          title: 'Ғылым әлемін ашу — Ғарыштық зерттеулер бойынша халықаралық жарыстар',
          description: '14-18 жас аралығындағы оқушыларға арналған тегін жарыстар: наноспутниктер, ғарыштық AI және зымыран үлгілері. Тіркелу 19 қаңтар 2026-ға дейін.'
        },
        hero: {
          badge: 'Халықаралық жарыс',
          title: 'Ғылым әлемін ашу',
          subtitle: '14-18 жас аралығындағы оқушыларға арналған ғарыштық зерттеулер бойынша халықаралық ғылыми жарыстар',
          facts: {
            free: 'Тегін',
            categories: '3 санат',
            final: 'Астана: 9-12 сәуір 2026 (GMT+5)'
          }
        },
        cta: {
          register: 'Тіркелу',
          login: 'Жеке кабинет',
          soon: 'Жақында тіркелу ашылады',
          closed: 'Тіркелу жабық'
        },
        about: {
          title: 'Жарыс туралы',
          organizers: 'Ұйымдастырушылар',
          intro: 'Ұйымдастырушылар «Дарын» ҒЗОКМ және AEROO болып табылады',
          mission: 'Біздің миссиямыз - жастарды нақты инженерлік жарыстар арқылы ғарыштық ғылымға тарту.',
          format: 'Халықаралық формат, Астанада очты финал',
          who: {
            title: 'Кім қатыса алады',
            text: '14-18 жас аралығындағы оқушылар (жеке/команда - бөлімге байланысты)'
          },
          cost: {
            title: 'Қатысу құны',
            text: 'Тегін'
          }
        },
        tracks: {
          title: 'Жарыс санаттары',
          subtitle: 'Өзіңізге қолайлы бағытты таңдаңыз',
          age: 'Жас',
          team: 'Команда',
          details: 'Толығырақ',
          stages_title: 'Кезеңдер',
          aslc: {
            name: 'AEROO Satellite Launch Competition (ASLC)',
            summary: 'AEROO CubeSat Kit негізінде наноспутникті жобалау және жинау, стратостатпен соңғы ұшыру.',
            age: '14-18',
            team: '4 қатысушы',
            stages: [
              'Онлайн: миссия концепциясы',
              'Онлайн: инженерлік жоба',
              'Очты финал: жинау және ұшыру'
            ]
          },
          space_ai: {
            name: 'AEROO Space AI Competition',
            summary: 'AI және коммерциялық модельмен ғарыштық жоба; MVP және питч.',
            age: '14-18',
            team: '4 қатысушыға дейін',
            stages: [
              'Онлайн: идея/AI/MVP-ге 1 ай',
              'Очты финал: жобаны қорғау'
            ]
          },
          rocket_science: {
            name: 'AEROO Rocket Science Competition',
            summary: 'Су зымырандары және модельдік зымырандар',
            age: '14-18',
            team: '2 қатысушыға дейін',
            stages: ['Онлайн кезең', 'Очты финал'],
            subtracks_title: 'Бағыттар',
            water_rockets: {
              name: 'Су зымырандары',
              summary: 'Су мен сығылған ауамен жинау және ұшыру; тұрақты ұшу және қашықтыққа баса назар.',
              age: '14-15 (ұйымкомнің шешімі бойынша 14-16 болуы мүмкін)',
              team: '2 қатысушыға дейін'
            },
            model_rockets: {
              name: 'Модельдік зымырандар (2.5H*c)',
              summary: 'OpenRocket-тегі жоба мен макет; парашютпен және эко-миссиямен соңғы ұшыру.',
              age: '15-18',
              team: '2 қатысушыға дейін'
            }
          }
        },
        timeline: {
          title: 'Күнтізбе',
          registration: {
            label: 'Тіркелу',
            date: '10 қазан 2025 (12:00) — 19 қаңтар 2026 (23:59)',
            desc: 'Платформада тіркеліп, командаңызды құрыңыз'
          },
          submission: {
            label: 'Онлайн іріктеу',
            date: '1-28 ақпан 2026',
            desc: 'Тапсырмаларды орындап жіберу'
          },
          results: {
            label: 'Іріктеу нәтижелері',
            date: '10 наурыз 2026 (12:00)',
            desc: 'Финалға өткендер жарияланады'
          },
          arrival: {
            label: 'Командалардың келуі',
            date: '8 сәуір 2026',
            desc: 'Астанаға келу және дайындық'
          },
          final: {
            label: 'Финал',
            date: '9-12 сәуір 2026, Астана',
            desc: 'Жобаларды қорғау және жеңімпаздарды анықтау'
          }
        },
        prizes: {
          title: 'Сыйлықтар мен мүмкіндіктер',
          medals: {
            title: 'Медальдар мен дипломдар',
            desc: 'ҚР БҒМ І, ІІ, ІІІ дәрежелі дипломдары'
          },
          special: {
            title: 'Арнайы сыйлықтар',
            desc: 'Ұйымдастырушылар мен серіктестерден сыйлықтар'
          },
          fund: {
            title: 'AEROO сыйлық қоры',
            desc: 'Әділқазылар алқасы мен ұйымдастырушылардың шешімі бойынша ақшалай сыйлықтар'
          },
          education: {
            title: 'Білім беру мүмкіндіктері',
            desc: 'Г. Даукеев атындағы АУЭО-дан әлеуетті гранттар'
          }
        },
        howto: {
          title: 'Қалай қатысу керек',
          step1: {
            title: 'Тіркелу',
            desc: 'AEROO платформасында тіркеліңіз'
          },
          step2: {
            title: 'Тапсырмаларды орындау',
            desc: 'Өз бөліміңіздегі онлайн кезең тапсырмаларын орындаңыз'
          },
          step3: {
            title: 'Финалға келу',
            desc: 'Астанаға келіп, жобаңызды қорғаңыз'
          }
        },
        faq: {
          title: 'Жиі қойылатын сұрақтар',
          free: {
            q: 'Бұл тегін бе?',
            a: 'Иә, қатысу толығымен тегін.'
          },
          language: {
            q: 'Қандай тілде өткізіледі?',
            a: 'Жарыс үш тілде жүргізіледі: орыс, қазақ, ағылшын.'
          },
          organizers: {
            q: 'Ұйымдастырушылар кімдер?',
            a: 'ҚР Білім және ғылым министрлігінің «Дарын» ҒЗОКМ және AEROO компаниясы.'
          },
          age: {
            q: 'Жас шектеуі бар ма?',
            a: 'Жоғарыдағы санаттар карточкаларын қараңыз — әр бағыттың өз жас шектеулері бар.'
          },
          logistics: {
            q: 'Сапарды кім төлейді?',
            a: 'Логистика мен тұруды ұйымдастырушылар мен жіберуші тарап ресми хабарламалар бойынша қамтамасыз етеді.'
          }
        },
        contacts: {
          title: 'Байланыс',
          org: {
            title: 'Ұйымдастыру сұрақтары'
          },
          tech: {
            title: 'Техникалық сұрақтар және платформа'
          }
        },
        email: {
          title: 'Жаңалықтарға жазылу',
          desc: 'Тіркелу ашылғанда хабарлама аламын',
          placeholder: 'Email мекенжайыңыз',
          submit: 'Жазылу'
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
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
