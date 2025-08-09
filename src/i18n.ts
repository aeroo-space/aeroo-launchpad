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
        dashboard: 'Личный кабинет',
        login: 'Войти',
      },
      competitions: {
        title: 'Соревнования AEROO',
        subtitle: 'Присоединяйтесь к инновационным соревнованиям в области аэрокосмических технологий. Проверьте свои навыки и создавайте будущее вместе с нами.',
        age: 'Возраст:',
        deadline: 'Дедлайн:',
        details: 'Подробнее',
        enrollTeam: 'Записаться с командой',
        archiveTitle: 'Архив соревнований',
        archiveDesc: 'Изучите результаты прошлых лет и вдохновитесь достижениями участников',
        archiveBtn: 'Посмотреть архив',
        enrollDialogTitle: 'Запись в соревнование',
        enrollDialogDesc: 'Заполните данные команды. После регистрации капитану придёт письмо с подтверждением и техническим заданием.',
        toastLoginTitle: 'Войдите, чтобы записаться',
        toastLoginDesc: 'Переходим на страницу входа',
        toastNeedConsentTitle: 'Подтвердите согласие',
        toastNeedConsentDesc: 'Необходимо согласиться с положением и политикой',
        toastEnrollError: 'Не удалось записаться',
        toastEnrollSuccessTitle: 'Вы записаны!'
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
        toastEnrollSuccessTitle: 'You are registered!'
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
        dashboard: 'Жеке кабинет',
        login: 'Кіру',
      },
      competitions: {
        title: 'AEROO сайыстары',
        subtitle: 'Аэроғарыш технологиялары бойынша инновациялық сайыстарға қосылыңыз. Дағдыларыңызды сынап, болашақты бірге құрайық.',
        age: 'Жас:',
        deadline: 'Мерзімі:',
        details: 'Толығырақ',
        enrollTeam: 'Командамен тіркелу',
        archiveTitle: 'Сайыстар мұрағаты',
        archiveDesc: 'Өткен жылдардың нәтижелерін қарап, қатысушылардың жетістіктерінен шабыт алыңыз',
        archiveBtn: 'Мұрағатты көру',
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
