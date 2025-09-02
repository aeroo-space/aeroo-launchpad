import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const saved = typeof localStorage !== 'undefined' ? localStorage.getItem('lng') || 'ru' : 'ru';

const resources = {
  ru: {
    translation: {
      nav: {
        competitions: 'Соревнования',
        courses: 'Курсы',
        products: 'Продукты',
        about: 'О нас',
        contacts: 'Контакты',
        dashboard: 'Личный кабинет',
        login: 'Войти',
      },
      competitions: {
        title: 'Соревнования AEROO',
        subtitle: 'Присоединяйтесь к инновационным соревнованиям в области аэрокосмических технологий. Проверьте свои навыки и создавайте будущее вместе с нами.',
        age: 'Возраст:',
        deadline: 'Дедлайн:',
        details: 'Подробнее',
        participate: 'Принять участие',
        enrollTeam: 'Записаться с командой',
        archiveTitle: 'Архив соревнований',
        archiveDesc: 'Изучите результаты прошлых лет и вдохновитесь достижениями участников',
        archiveBtn: 'Посмотреть архив',
        statuses: {
          active: 'Активно',
          registration: 'Регистрация',
          soon: 'Скоро',
          development: 'В разработке'
        },
        items: {
          'aeroo-fest': {
            title: 'AEROO Fest',
            category: 'Фестиваль',
            description: 'Мероприятия, шоу и мастер‑классы для продвижения аэрокосмических технологий',
            status: 'Скоро',
            deadline: 'Лето 2026',
            ages: '12-19 лет'
          },
          'satellite-launch': {
            title: 'AEROO Satellite Launch Competition',
            category: 'Спутники',
            description: 'Проектирование, сборка и запуск мини‑спутников',
            status: 'Скоро',
            deadline: '1 января 2026',
            ages: '14-19 лет'
          },
          'space-settlement': {
            title: 'AEROO Space Settlement Competition',
            category: 'Хакатон',
            description: 'Разработка концепций поселений в космосе для долгосрочной жизни',
            status: 'Регистрация',
            deadline: '24 октября 2025',
            ages: '12-19 лет'
          },
          'ai-challenge': {
            title: 'AEROO Space AI Competition',
            category: 'AI',
            description: 'Разработка автономных алгоритмов для навигации, управления и планирования миссий',
            status: 'В разработке',
            deadline: 'Весна 2026',
            ages: '16-25 лет'
          },
          'drive-competition': {
            title: 'AEROO Rover Competition',
            category: 'Ровер',
            description: 'Создание и управление роверами для исследования поверхностей планет',
            status: 'В разработке',
            deadline: 'Лето 2026',
            ages: '14-21 лет'
          },
          'drone-competition': {
            title: 'AEROO Drone Competition',
            category: 'Дроны',
            description: 'Конструирование и пилотирование дронов для зондирования, картографирования и гонок',
            status: 'Скоро',
            deadline: 'Октябрь 2025',
            ages: '12-25 лет'
          }
        },
        enrollDialogTitle: 'Запись в соревнование',
        enrollDialogDesc: 'Заполните данные команды. После регистрации капитану придёт письмо с подтверждением и техническим заданием.',
        toastLoginTitle: 'Войдите, чтобы записаться',
        toastLoginDesc: 'Переходим на страницу входа',
        toastNeedConsentTitle: 'Подтвердите согласие',
        toastNeedConsentDesc: 'Необходимо согласиться с положением и политикой',
        toastEnrollError: 'Не удалось записаться',
        toastEnrollSuccessTitle: 'Вы записаны!',
        toastSoonTitle: 'Скоро выйдет информация',
        toastSoonDesc: 'Будьте в курсе событий',
        toastNotOpenTitle: 'Регистрация пока не открыта',
        toastNotOpenDesc: 'Скоро выйдет информация — будьте в курсе событий.'
      },
      form: {
        email: 'Email капитана *',
        telegram: 'Telegram-аккаунт для связи *',
        teamName: 'Название команды *',
        captainFullName: 'ФИО капитана команды *',
        captainPhone: 'Номер телефона капитана *',
        captainAge: 'Возраст капитана *',
        city: 'Город *',
        studyPlace: 'Место обучения *',
        participant2: '2 участник команды (ФИО, телефон, возраст, город, место обучения, почта) *',
        participant3: '3 участник команды (ФИО, телефон, возраст, город, место обучения, почта) *',
        participant4: '4 участник команды (ФИО, телефон, возраст, город, место обучения, почта) *',
        source: 'Откуда узнали о соревновании? *',
        consent: 'С Положением ознакомлен(-а) и согласен(-а) с политикой конфиденциальности',
        submit: 'Подтвердить участие',
        sending: 'Отправка...',
        sourceInstagramKaz: 'Instagram (@kazrockets)',
        sourceInstagramOther: 'Instagram других аккаунтов',
        sourceTelegram: 'Telegram',
        sourceFriends: 'У знакомых',
        sourceOther: 'Другое',
      },
      dashboard: {
        title: 'Личный кабинет',
        logout: 'Выйти',
        myEnrollments: 'Мои участия в соревнованиях',
        loading: 'Загрузка...',
        empty: 'Пока нет записей. Перейдите на страницу «Соревнования», чтобы записаться.'
      },
      auth: {
        metaTitle: { signin: 'Вход — AEROO', signup: 'Регистрация — AEROO' },
        metaDesc: 'Вход и регистрация AEROO — авторизация для участия в соревнованиях',
        heading: 'Аутентификация AEROO',
        signin: 'Войти',
        signup: 'Регистрация',
        password: 'Пароль',
        createAccount: 'Создать аккаунт'
      },
      community: {
        metaTitle: 'Сообщество AEROO — общение и поддержка',
        metaDesc: 'Пространство AEROO: вопросы, помощь, анонсы и нетворкинг',
        hero: {
          title: 'Сообщество AEROO',
          subtitle: 'Пространство для учеников, студентов, наставников и инженеров. Делитесь опытом и участвуйте в проектах AEROO.'
        },
        cards: {
          networking: { title: 'Знакомства и нетворкинг', desc: 'Находите команду для соревнований и проекты для портфолио.' },
          help: { title: 'Вопросы и помощь', desc: 'Получайте ответы от менторов и сообщества по наборам и технике.' },
          announcements: { title: 'Анонсы и активности', desc: 'Будьте в курсе курсов, соревнований и запусков AEROO.' }
        },
        cta: { button: 'Перейти в сообщество', note: 'Откроется в новом окне Telegram' }
      },
      support: {
        metaTitle: 'Техподдержка AEROO',
        metaDesc: 'Помощь с доступом, наборами, заказами и участием в соревнованиях',
        title: 'Техподдержка',
        subtitle: 'Поможем с доступом, наборами, заказами и участием в соревнованиях. Напишите нам и мы ответим в ближайшее время.',
        emailLabel: 'Почта:',
        telegramLabel: 'Telegram:'
      },
      terms: {
        metaTitle: 'Пользовательское соглашение — AEROO',
        metaDesc: 'Правила использования платформы AEROO',
        title: 'Пользовательское соглашение',
        subtitle: 'Правила использования платформы AEROO.',
        body: 'Используя наш сайт, вы соглашаетесь соблюдать правила и не нарушать права других пользователей.'
      },
      privacy: {
        metaTitle: 'Политика конфиденциальности — AEROO',
        metaDesc: 'Как мы собираем и обрабатываем ваши данные',
        title: 'Политика конфиденциальности',
        subtitle: 'Как мы собираем и обрабатываем ваши данные.',
        body: 'Мы относимся к безопасности данных ответственно. Данные используются исключительно для предоставления услуг AEROO.'
      },
      faq: {
        metaTitle: 'FAQ — AEROO',
        metaDesc: 'Ответы на популярные вопросы',
        title: 'Частые вопросы',
        subtitle: 'Ответы на популярные вопросы о платформах, наборах и соревнованиях AEROO.',
        q1: 'Как записаться на соревнование?',
        a1: 'Выберите соревнование на странице «Соревнования» и нажмите «Участвовать». Далее следуйте инструкции.',
        q2: 'Как выбрать набор?',
        a2: 'Начните с ракетного набора AEROO-R1, если вы новичок. Для продвинутых подойдёт AEROO-S3.'
      },
      notFound: {
        metaTitle: 'Страница не найдена — AEROO',
        title: '404',
        message: 'Упс! Страница не найдена',
        back: 'Вернуться на главную'
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
          participants: 'Участников',
          projects: 'Проектов',
          awards: 'Наград',
          countries: 'Страны'
        },
        teamTitle: 'Наша команда',
        partnersTitle: 'Наши партнёры',
        becomePartner: 'Стать партнёром',
        contactsTitle: 'Контакты',
        contactEmail: 'Email',
        contactPhone: 'Телефон',
        contactAddress: 'Адрес',
        writeUs: 'Напишите нам',
        formName: 'Имя',
        formEmail: 'Email',
        formMessage: 'Сообщение',
        sendMessage: 'Отправить сообщение'
      },
      home: {
        metaTitle: 'AEROO — образовательная платформа',
        hero: {
          competitions: {
            title: 'Соревнования AEROO',
            desc: 'Участвуй в инженерных и исследовательских мероприятиях.',
            button: 'Подробнее'
          },
          products: {
            title: 'Продукты AEROO',
            desc: 'Приобретай образовательные наборы AEROO для инженерного обучения и участия в соревнованиях.',
            button: 'Подробнее'
          },
          settlement: {
            title: 'AEROO Space Settlement Competition 2026',
            dates: 'Даты проведения: 28–29 октября 2025.',
            registration: 'Старт регистрации: с 5 сентября.',
            button: 'Подробнее'
          }
        },
        features: {
          title: 'Направления обучения',
          subtitle: 'Погрузитесь в мир аэрокосмических технологий через практические курсы и захватывающие соревнования',
          learnMore: 'Узнать больше',
          items: {
            0: { title: 'Ракетостроение', desc: 'Изучение аэродинамики, конструирование и запуск моделей ракет с твердотопливными двигателями' },
            1: { title: 'БПЛА', desc: 'Программирование дронов, FPV-пилотирование, аэросъёмка и автономные полёты' },
            2: { title: 'Спутниковые технологии', desc: 'Создание наноспутников, изучение бортовых систем и подготовка к запуску' },
            3: { title: 'Искусственный интеллект', desc: 'Разработка автономных алгоритмов для навигации и управления космическими миссиями' },
            4: { title: 'Соревнования', desc: 'Участие в международных конкурсах по аэрокосмическим технологиям' },
            5: { title: 'Командная работа', desc: 'Развитие навыков сотрудничества в многодисциплинарных проектах' }
          },
          cta: {
            title: 'Готовы начать свой путь в космос?',
            courses: 'Образовательные комплекты для школ',
            competitions: 'Ближайшие соревнования'
          }
        }
      },
      footer: {
        description: 'Образовательная платформа, объединяющая школьников, студентов и молодых инженеров вокруг аэрокосмических технологий.',
        location: 'Алматы, Казахстан',
        sections: [
          {
            title: 'Платформа',
            links: ['Соревнования', 'Курсы', 'Продукты', 'О нас']
          },
          {
            title: 'Поддержка',
            links: ['Контакты', 'FAQ', 'Техподдержка', 'Сообщество']
          },
          {
            title: 'Документы',
            links: ['Политика конфиденциальности', 'Пользовательское соглашение', 'Правила соревнований', 'Сертификаты']
          }
        ],
        bottom: {
          rights: 'Все права защищены.',
          privacy: 'Конфиденциальность',
          terms: 'Условия использования',
          cookies: 'Cookies'
        }
      },
      dashboardExtra: {
        // Дополнительные подписи для страницы кабинета
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
        courses: 'Courses',
        products: 'Products',
        about: 'About',
        contacts: 'Contacts',
        dashboard: 'Dashboard',
        login: 'Log in',
      },
      competitions: {
        title: 'AEROO Competitions',
        subtitle: 'Join innovative competitions in aerospace technologies. Test your skills and build the future with us.',
        age: 'Age:',
        deadline: 'Deadline:',
        details: 'Learn more',
        enrollTeam: 'Register with a team',
        archiveTitle: 'Competitions Archive',
        archiveDesc: 'Explore results from previous years and get inspired by participants’ achievements',
        archiveBtn: 'View archive',
        enrollDialogTitle: 'Competition Registration',
        enrollDialogDesc: 'Fill in your team details. After registration, the captain will receive a confirmation and the technical task.',
        toastLoginTitle: 'Please log in to register',
        toastLoginDesc: 'Redirecting to the login page',
        toastNeedConsentTitle: 'Confirm consent',
        toastNeedConsentDesc: 'You must accept the terms and privacy policy',
        toastEnrollError: 'Registration failed',
        toastEnrollSuccessTitle: 'You are registered!',
        toastSoonTitle: 'Coming Soon',
        toastSoonDesc: 'Stay tuned for updates',
        toastNotOpenTitle: 'Registration not open yet',
        toastNotOpenDesc: 'Information will be available soon — stay tuned.',
        statuses: {
          active: 'Active',
          registration: 'Registration',
          soon: 'Soon',
          development: 'In Development'
        },
        items: {
          'aeroo-fest': {
            title: 'AEROO Fest',
            category: 'Festival',
            description: 'Events, shows and workshops to promote aerospace technologies',
            status: 'Soon',
            deadline: 'Summer 2026',
            ages: '12-19 years'
          },
          'satellite-launch': {
            title: 'AEROO Satellite Launch Competition',
            category: 'Satellites',
            description: 'Design, build and launch mini-satellites',
            status: 'Registration',
            deadline: 'January 1, 2026',
            ages: '14-19 years'
          },
          'space-settlement': {
            title: 'AEROO Space Settlement Competition',
            category: 'Hackathon',
            description: 'Development of space settlement concepts for long-term life',
            status: 'Soon',
            deadline: 'October 24, 2025',
            ages: '12-19 years'
          },
          'ai-challenge': {
            title: 'AEROO Space AI Competition',
            category: 'AI',
            description: 'Development of autonomous algorithms for navigation, control and mission planning',
            status: 'In Development',
            deadline: 'Spring 2026',
            ages: '16-25 years'
          },
          'drive-competition': {
            title: 'AEROO Rover Competition',
            category: 'Rover',
            description: 'Creation and control of rovers for planetary surface exploration',
            status: 'In Development',
            deadline: 'Summer 2026',
            ages: '14-21 years'
          },
          'drone-competition': {
            title: 'AEROO Drone Competition',
            category: 'Drones',
            description: 'Construction and piloting of drones for sensing, mapping and racing',
            status: 'Soon',
            deadline: 'October 2025',
            ages: '12-25 years'
          }
        }
      },
      form: {
        email: 'Captain’s email *',
        telegram: 'Telegram for contact *',
        teamName: 'Team name *',
        captainFullName: 'Captain’s full name *',
        captainPhone: 'Captain’s phone number *',
        captainAge: 'Captain’s age *',
        city: 'City *',
        studyPlace: 'Place of study *',
        participant2: '2nd team member (Full name, phone, age, city, place of study, email) *',
        participant3: '3rd team member (Full name, phone, age, city, place of study, email) *',
        participant4: '4th team member (Full name, phone, age, city, place of study, email) *',
        source: 'How did you hear about the competition? *',
        consent: 'I have read the Terms and agree with the Privacy Policy',
        submit: 'Confirm participation',
        sending: 'Sending...',
        sourceInstagramKaz: 'Instagram (@kazrockets)',
        sourceInstagramOther: 'Instagram (other accounts)',
        sourceTelegram: 'Telegram',
        sourceFriends: 'From friends',
        sourceOther: 'Other',
      },
      dashboard: {
        title: 'Dashboard',
        logout: 'Sign out',
        myEnrollments: 'My competition enrollments',
        loading: 'Loading...',
        empty: 'No records yet. Go to the “Competitions” page to enroll.'
      },
      auth: {
        metaTitle: { signin: 'Sign in — AEROO', signup: 'Sign up — AEROO' },
        metaDesc: 'AEROO sign in and registration — authorize to join competitions',
        heading: 'AEROO Authentication',
        signin: 'Sign in',
        signup: 'Sign up',
        password: 'Password',
        createAccount: 'Create account'
      },
      community: {
        metaTitle: 'AEROO Community — chat and support',
        metaDesc: 'AEROO space for questions, help, announcements, and networking',
        hero: {
          title: 'AEROO Community',
          subtitle: 'A space for students, mentors, and engineers. Share experience and join AEROO projects.'
        },
        cards: {
          networking: { title: 'Networking', desc: 'Find teammates for competitions and projects for your portfolio.' },
          help: { title: 'Questions and help', desc: 'Get answers from mentors and the community about kits and technology.' },
          announcements: { title: 'Announcements and activities', desc: 'Stay up to date with AEROO courses, competitions, and launches.' }
        },
        cta: { button: 'Go to community', note: 'Opens in a new Telegram window' }
      },
      support: {
        metaTitle: 'AEROO Support',
        metaDesc: 'Help with access, kits, orders, and competitions',
        title: 'Support',
        subtitle: 'We help with access, kits, orders, and competitions. Message us and we will reply shortly.',
        emailLabel: 'Email:',
        telegramLabel: 'Telegram:'
      },
      terms: {
        metaTitle: 'Terms of Service — AEROO',
        metaDesc: 'Rules for using the AEROO platform',
        title: 'Terms of Service',
        subtitle: 'Rules for using the AEROO platform.',
        body: 'By using our site, you agree to follow the rules and not violate other users’ rights.'
      },
      privacy: {
        metaTitle: 'Privacy Policy — AEROO',
        metaDesc: 'How we collect and process your data',
        title: 'Privacy Policy',
        subtitle: 'How we collect and process your data.',
        body: 'We take data security seriously. Data is used solely to provide AEROO services.'
      },
      faq: {
        metaTitle: 'FAQ — AEROO',
        metaDesc: 'Answers to popular questions',
        title: 'Frequently Asked Questions',
        subtitle: 'Answers to common questions about AEROO platforms, kits, and competitions.',
        q1: 'How to enroll in a competition?',
        a1: 'Choose a competition on the “Competitions” page and click “Participate”. Then follow the instructions.',
        q2: 'How to choose a kit?',
        a2: 'Start with the AEROO-R1 rocket kit if you are a beginner. For advanced users, AEROO-S3 is suitable.'
      },
      notFound: {
        metaTitle: 'Page not found — AEROO',
        title: '404',
        message: 'Oops! Page not found',
        back: 'Return to Home'
      },
      about: {
        metaTitle: 'About AEROO — mission and team',
        metaDesc: 'AEROO learning ecosystem: mission, values, team and partners',
        heroTitle: 'About AEROO',
        heroSubtitle: 'We inspire and teach the next generation of builders, developing skills, teamwork and systems thinking in aerospace technologies.',
        missionTitle: 'Our mission',
        missionText: 'Create an educational ecosystem that unites schoolchildren, students and young engineers around advanced technologies. We strive to make aerospace knowledge accessible to every talented person.',
        valuesTitle: 'Our values',
        values: {
          innovation: 'Innovation and technological excellence',
          openness: 'Openness and accessible education',
          teamwork: 'Teamwork and mutual assistance',
          excellence: 'Striving for excellence'
        },
        achievementsTitle: 'Our achievements',
        achievements: {
          participants: 'Participants',
          projects: 'Projects',
          awards: 'Awards',
          countries: 'Countries'
        },
        teamTitle: 'Our team',
        partnersTitle: 'Our partners',
        becomePartner: 'Become a partner',
        contactsTitle: 'Contacts',
        contactEmail: 'Email',
        contactPhone: 'Phone',
        contactAddress: 'Address',
        writeUs: 'Write to us',
        formName: 'Name',
        formEmail: 'Email',
        formMessage: 'Message',
        sendMessage: 'Send message'
      },
      home: {
        metaTitle: 'AEROO — educational platform',
        hero: {
          competitions: {
            title: 'AEROO Competitions',
            desc: 'Participate in engineering and research events.',
            button: 'Learn more'
          },
          products: {
            title: 'AEROO Products',
            desc: 'Purchase AEROO educational kits for engineering learning and competition participation.',
            button: 'Learn more'
          },
          settlement: {
            title: 'AEROO Space Settlement Competition 2026',
            dates: 'Event dates: October 28–29, 2025.',
            registration: 'Registration starts: September 5.',
            button: 'Learn more'
          }
        },
        features: {
          title: 'Learning Directions',
          subtitle: 'Immerse yourself in the world of aerospace technologies through practical courses and exciting competitions',
          learnMore: 'Learn more',
          items: {
            0: { title: 'Rocket Science', desc: 'Study of aerodynamics, construction and launch of rocket models with solid fuel engines' },
            1: { title: 'UAV', desc: 'Drone programming, FPV piloting, aerial photography and autonomous flights' },
            2: { title: 'Satellite Technologies', desc: 'Creation of nanosatellites, study of onboard systems and launch preparation' },
            3: { title: 'Artificial Intelligence', desc: 'Development of autonomous algorithms for navigation and space mission control' },
            4: { title: 'Competitions', desc: 'Participation in international aerospace technology competitions' },
            5: { title: 'Teamwork', desc: 'Development of collaboration skills in multidisciplinary projects' }
          },
          cta: {
            title: 'Ready to start your journey to space?',
            courses: 'Educational kits for schools',
            competitions: 'Upcoming competitions'
          }
        }
      },
      footer: {
        description: 'Educational platform uniting students and young engineers around aerospace technologies.',
        location: 'Almaty, Kazakhstan',
        sections: [
          {
            title: 'Platform',
            links: ['Competitions', 'Courses', 'Products', 'About']
          },
          {
            title: 'Support',
            links: ['Contacts', 'FAQ', 'Tech Support', 'Community']
          },
          {
            title: 'Documents',
            links: ['Privacy Policy', 'Terms of Service', 'Competition Rules', 'Certificates']
          }
        ],
        bottom: {
          rights: 'All rights reserved.',
          privacy: 'Privacy',
          terms: 'Terms of Use',
          cookies: 'Cookies'
        }
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
        archiveDesc: 'Өткен жылдардың нәтижелерін қарап, қатысушылардың жетістіктерінен шабыт алыңыз',
        archiveBtn: 'Мұрағатты көру',
        statuses: {
          active: 'Белсенді',
          registration: 'Тіркеу',
          soon: 'Жақында',
          development: 'Дамытуда'
        },
        items: {
          'aeroo-fest': {
            title: 'AEROO Fest',
            category: 'Фестиваль',
            description: 'Аэроғарыш технологияларын дамыту үшін іс-шаралар, шоу және шеберлік сыныптары',
            status: 'Жақында',
            deadline: '2026 жаз',
            ages: '12-19 жас'
          },
          'satellite-launch': {
            title: 'AEROO Satellite Launch Competition',
            category: 'Спутниктер',
            description: 'Мини-спутниктерді жобалау, құрастыру және ұшыру',
            status: 'Тіркеу',
            deadline: '2026 жылдың 1 қаңтары',
            ages: '14-19 жас'
          },
          'space-settlement': {
            title: 'AEROO Space Settlement Competition',
            category: 'Хакатон',
            description: 'Ұзақ мерзімді өмір сүру үшін ғарыштық қонысталу тұжырымдамаларын дамыту',
            status: 'Жақында',
            deadline: '2025 жылдың 24 қазаны',
            ages: '12-19 жас'
          },
          'ai-challenge': {
            title: 'AEROO Space AI Competition',
            category: 'AI',
            description: 'Навигация, басқару және миссияларды жоспарлау үшін автономды алгоритмдер дамыту',
            status: 'Дамытуда',
            deadline: '2026 көктем',
            ages: '16-25 жас'
          },
          'drive-competition': {
            title: 'AEROO Rover Competition',
            category: 'Ровер',
            description: 'Планета беттерін зерттеу үшін роверлерді жасау және басқару',
            status: 'Дамытуда',
            deadline: '2026 жаз',
            ages: '14-21 жас'
          },
          'drone-competition': {
            title: 'AEROO Drone Competition',
            category: 'Дрондар',
            description: 'Зондтау, картография және жарыстар үшін дрондарды құрастыру және басқару',
            status: 'Жақында',
            deadline: '2025 қазан',
            ages: '12-25 жас'
          }
        },
        enrollDialogTitle: 'Сайысқа тіркелу',
        enrollDialogDesc: 'Команда деректерін толтырыңыз. Тіркелгеннен кейін капитанға растау және техникалық тапсырма жіберіледі.',
        toastLoginTitle: 'Тіркелу үшін кіріңіз',
        toastLoginDesc: 'Кіру бетіне өтіп жатырмыз',
        toastNeedConsentTitle: 'Келісімді растаңыз',
        toastNeedConsentDesc: 'Ереже мен құпиялылық саясатына келісу қажет',
        toastEnrollError: 'Тіркелу сәтсіз аяқталды',
        toastEnrollSuccessTitle: 'Сіз тіркелдіңіз!'
      },
      form: {
        email: 'Капитанның email-ы *',
        telegram: 'Байланыс үшін Telegram *',
        teamName: 'Команда атауы *',
        captainFullName: 'Капитанның толық аты-жөні *',
        captainPhone: 'Капитанның телефон нөмірі *',
        captainAge: 'Капитанның жасы *',
        city: 'Қала *',
        studyPlace: 'Оқу орны *',
        participant2: '2-ші қатысушы (АЖТ, телефон, жас, қала, оқу орны, email) *',
        participant3: '3-ші қатысушы (АЖТ, телефон, жас, қала, оқу орны, email) *',
        participant4: '4-ші қатысушы (АЖТ, телефон, жас, қала, оқу орны, email) *',
        source: 'Сайыс туралы қайдан білдіңіз? *',
        consent: 'Ережемен таныспын және құпиялылық саясатына келісемін',
        submit: 'Қатысуды растау',
        sending: 'Жіберілуде...',
        sourceInstagramKaz: 'Instagram (@kazrockets)',
        sourceInstagramOther: 'Instagram (басқа аккаунттар)',
        sourceTelegram: 'Telegram',
        sourceFriends: 'Таныстардан',
        sourceOther: 'Басқа',
      },
      dashboard: {
        title: 'Жеке кабинет',
        logout: 'Шығу',
        myEnrollments: 'Менің сайысқа тіркелулерім',
        loading: 'Жүктелуде...',
        empty: 'Әзірге жазбалар жоқ. Тіркелу үшін «Сайыстар» бетіне өтіңіз.'
      },
      auth: {
        metaTitle: { signin: 'Кіру — AEROO', signup: 'Тіркелу — AEROO' },
        metaDesc: 'AEROO-ға кіру және тіркелу — сайыстарға қатысу үшін авторизация',
        heading: 'AEROO аутентификациясы',
        signin: 'Кіру',
        signup: 'Тіркелу',
        password: 'Құпиясөз',
        createAccount: 'Аккаунт жасау'
      },
      community: {
        metaTitle: 'AEROO қауымдастығы — байланыс және қолдау',
        metaDesc: 'AEROO кеңістігі: сұрақтар, көмек, жаңалықтар және нетворкинг',
        hero: {
          title: 'AEROO қауымдастығы',
          subtitle: 'Оқушылар, студенттер, менторлар және инженерлерге арналған кеңістік. Тәжірибе бөлісіп, AEROO жобаларына қатысыңыз.'
        },
        cards: {
          networking: { title: 'Танысу және нетворкинг', desc: 'Сайыстар үшін команда және портфолиоға арналған жобалар табыңыз.' },
          help: { title: 'Сұрақтар және көмек', desc: 'Жинақтар мен техникалар туралы жауаптарды менторлар мен қауымдастықтан алыңыз.' },
          announcements: { title: 'Жаңалықтар және іс-шаралар', desc: 'AEROO курстары, сайыстары және ұшырылымдары туралы хабардар болыңыз.' }
        },
        cta: { button: 'Қауымдастыққа өту', note: 'Telegram жаңа терезеде ашылады' }
      },
      support: {
        metaTitle: 'AEROO қолдау қызметі',
        metaDesc: 'Қол жеткізу, жинақтар, тапсырыстар және сайыстар бойынша көмек',
        title: 'Қолдау қызметі',
        subtitle: 'Қол жеткізу, жинақтар, тапсырыстар және сайыстар бойынша көмектесеміз. Жазыңыз, жақын арада жауап береміз.',
        emailLabel: 'Пошта:',
        telegramLabel: 'Telegram:'
      },
      terms: {
        metaTitle: 'Пайдалану шарттары — AEROO',
        metaDesc: 'AEROO платформасын пайдалану ережелері',
        title: 'Пайдалану шарттары',
        subtitle: 'AEROO платформасын пайдалану ережелері.',
        body: 'Біздің сайтты пайдалана отырып, сіз ережелерді сақтауға және басқа пайдаланушылардың құқықтарын бұзбауға келісесіз.'
      },
      privacy: {
        metaTitle: 'Құпиялылық саясаты — AEROO',
        metaDesc: 'Деректерді қалай жинаймыз және өңдейміз',
        title: 'Құпиялылық саясаты',
        subtitle: 'Деректерді қалай жинаймыз және өңдейміз.',
        body: 'Біз деректер қауіпсіздігін жауапкершілікпен қараймыз. Деректер тек AEROO қызметтерін көрсету үшін қолданылады.'
      },
      faq: {
        metaTitle: 'Жиі қойылатын сұрақтар — AEROO',
        metaDesc: 'Танымал сұрақтарға жауаптар',
        title: 'Жиі қойылатын сұрақтар',
        subtitle: 'AEROO платформалары, жинақтар және сайыстар туралы жиі қойылатын сұрақтарға жауаптар.',
        q1: 'Сайысқа қалай тіркелуге болады?',
        a1: '«Сайыстар» бетінде сайысты таңдап, «Қатысу» түймесін басыңыз. Әрі қарай нұсқаулықты орындаңыз.',
        q2: 'Жинақты қалай таңдау керек?',
        a2: 'Бастаушыларға AEROO-R1 ракета жинағын ұсынамыз. Тәжірибелілер үшін AEROO-S3 қолайлы.'
      },
      notFound: {
        metaTitle: 'Бет табылмады — AEROO',
        title: '404',
        message: 'Қате! Бет табылмады',
        back: 'Басты бетке оралу'
      },
      about: {
        metaTitle: 'AEROO туралы — миссия және команда',
        metaDesc: 'AEROO білім беру экожүйесі: миссия, құндылықтар, команда және серіктестер',
        heroTitle: 'AEROO туралы',
        heroSubtitle: 'Біз жаңа буын жасаушыларын шабыттандырып, оқытамыз: дағдылар, командалық жұмыс және аэроғарыштық технологиялардағы жүйелік ойлау.',
        missionTitle: 'Біздің миссия',
        missionText: 'Мектеп оқушыларын, студенттерді және жас инженерлерді заманауи технологиялар төңірегінде біріктіретін білім беру экожүйесін құру. Аэроғарыштық білімді әрбір дарынды адамға қолжетімді еткіміз келеді.',
        valuesTitle: 'Құндылықтарымыз',
        values: {
          innovation: 'Инновация және технологиялық үздіксіздік',
          openness: 'Ашықтық және білімге қолжетімділік',
          teamwork: 'Командалық жұмыс және өзара көмек',
          excellence: 'Жетілдіруге ұмтылу'
        },
        achievementsTitle: 'Жетістіктеріміз',
        achievements: {
          participants: 'Қатысушылар',
          projects: 'Жобалар',
          awards: 'Жүлделер',
          countries: 'Елдер'
        },
        teamTitle: 'Біздің команда',
        partnersTitle: 'Серіктестеріміз',
        becomePartner: 'Серіктес болу',
        contactsTitle: 'Байланыс',
        contactEmail: 'Email',
        contactPhone: 'Телефон',
        contactAddress: 'Мекенжай',
        writeUs: 'Бізге жазыңыз',
        formName: 'Аты',
        formEmail: 'Email',
        formMessage: 'Хабарлама',
        sendMessage: 'Хабарлама жіберу'
      },
      home: {
        metaTitle: 'AEROO — білім беру платформасы',
        hero: {
          competitions: {
            title: 'AEROO сайыстары',
            desc: 'Инженерлік және зерттеу іс-шараларына қатысыңыз.',
            button: 'Толығырақ'
          },
          products: {
            title: 'AEROO өнімдері',
            desc: 'Инженерлік оқыту және сайыстарға қатысу үшін AEROO білім беру жинақтарын сатып алыңыз.',
            button: 'Толығырақ'
          },
          settlement: {
            title: 'AEROO Space Settlement Competition 2026',
            dates: 'Өткізу күндері: 2025 жылдың 28–29 қазаны.',
            registration: 'Тіркеу басталуы: қыркүйектің 5-інен.',
            button: 'Толығырақ'
          }
        },
        features: {
          title: 'Оқыту бағыттары',
          subtitle: 'Практикалық курстар мен қызықты сайыстар арқылы аэроғарыш технологиялары әлеміне енуіз',
          learnMore: 'Көбірек білу',
          items: {
            0: { title: 'Ракетостроение', desc: 'Аэродинамиканы зерттеу, қатты отынды қозғалтқыштармен ракета үлгілерін жасау және ұшыру' },
            1: { title: 'БПЛА', desc: 'Дрондарды программалау, FPV басқару, аэросуретке түсіру және автономды ұшулар' },
            2: { title: 'Спутниктік технологиялар', desc: 'Наноспутниктер жасау, борттық жүйелерді зерттеу және ұшыруға дайындық' },
            3: { title: 'Жасанды интеллект', desc: 'Навигация және ғарыштық миссияларды басқару үшін автономды алгоритмдер дамыту' },
            4: { title: 'Сайыстар', desc: 'Халықаралық аэроғарыш технологиялары бойынша сайыстарға қатысу' },
            5: { title: 'Командалық жұмыс', desc: 'Көпсалалы жобаларда ынтымақтастық дағдыларын дамыту' }
          },
          cta: {
            title: 'Ғарышқа саяхатты бастауға дайынсыз ба?',
            courses: 'Мектептер үшін білім беру жинақтары',
            competitions: 'Жақындағы сайыстар'
          }
        }
      },
      footer: {
        description: 'Мектеп оқушылары мен жас инженерлерді аэроғарыш технологиялары төңірегінде біріктіретін білім беру платформасы.',
        location: 'Алматы, Қазақстан',
        sections: [
          {
            title: 'Платформа',
            links: ['Сайыстар', 'Курстар', 'Өнімдер', 'Біз туралы']
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
} as const;

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
