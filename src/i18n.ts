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
      news: {
        title: 'Новости о нас',
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
              desc: 'Развитие навыков работы в команде через совместные проекты'
            }
          }
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
        openRegistration: 'Registration',
        pendingRegistration: 'Coming Soon',
        registrationClosed: 'Closed'
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
  kk: {
    translation: {
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
        openRegistration: 'Тіркелу',
        pendingRegistration: 'Жақында',
        registrationClosed: 'Жабық'
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
