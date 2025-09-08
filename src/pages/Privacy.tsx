import { useEffect } from "react";
import { Navigation } from "@/components/ui/navigation";
import { Footer } from "@/components/sections/footer";
import { useTranslation } from "react-i18next";

const Privacy = () => {
  const { t } = useTranslation();
  useEffect(() => {
    document.title = t('privacy.metaTitle', { defaultValue: 'Политика конфиденциальности — AEROO' });
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', t('privacy.metaDesc', { defaultValue: 'Как мы собираем и обрабатываем ваши данные' }));
  }, [t]);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-4 py-12">
        <header className="mb-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{t('privacy.title', { defaultValue: 'Политика конфиденциальности' })}</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">{t('privacy.subtitle', { defaultValue: 'Порядок сбора, обработки, хранения, использования и защиты персональной информации пользователей.' })}</p>
        </header>
        <section className="prose prose-invert max-w-4xl mx-auto">
          <p className="text-lg mb-8">{t('privacy.content.intro', { defaultValue: 'Настоящая Политика конфиденциальности (далее — Политика) регулирует порядок сбора, обработки, хранения, использования и защиты персональной информации пользователей сайта https://www.aeroo.space/ (далее — Сайт).' })}</p>
          
          <p className="mb-4">{t('privacy.content.description', { defaultValue: 'Сайт предоставляет возможность регистрации для участия в образовательных курсах, соревнованиях, мероприятиях, а также для получения информационных материалов. Администратором данных выступает ТОО «AEROO» (далее — Компания).' })}</p>
          
          <p className="mb-8">{t('privacy.content.agreement', { defaultValue: 'Используя Сайт, Пользователь подтверждает свое согласие с условиями настоящей Политики. Если Пользователь не согласен с условиями, он обязан прекратить использование Сайта.' })}</p>

          <h2 className="text-2xl font-bold mb-4">{t('privacy.content.section1.title', { defaultValue: '1. Персональная информация Пользователей' })}</h2>
          
          <h3 className="text-xl font-semibold mb-3">{t('privacy.content.section1.subtitle1', { defaultValue: '1.1. Собираемая информация' })}</h3>
          <p className="mb-4">{t('privacy.content.section1.intro1', { defaultValue: 'Компания собирает следующие категории персональных данных:' })}</p>
          <ul className="list-disc pl-6 mb-4">
            <li><strong>{t('privacy.content.section1.identification', { defaultValue: 'Идентификационные данные: имя, фамилия, возраст (для проверки соответствия участника возрастным категориям);' })}</strong></li>
            <li><strong>{t('privacy.content.section1.contact', { defaultValue: 'Контактные данные: номер телефона, адрес электронной почты;' })}</strong></li>
            <li><strong>{t('privacy.content.section1.educational', { defaultValue: 'Образовательные данные: место обучения, класс или курс обучения, достижения;' })}</strong></li>
            <li><strong>{t('privacy.content.section1.technical', { defaultValue: 'Технические данные: IP-адрес, тип браузера, данные о пользовательском устройстве.' })}</strong></li>
          </ul>

          <h3 className="text-xl font-semibold mb-3">{t('privacy.content.section1.subtitle2', { defaultValue: '1.2. Источники данных' })}</h3>
          <p className="mb-4">{t('privacy.content.section1.sources', { defaultValue: 'Данные предоставляются Пользователем добровольно при регистрации на Сайте, заполнении анкет, подаче заявок на участие в мероприятиях или курсах.' })}</p>

          <h3 className="text-xl font-semibold mb-3">{t('privacy.content.section1.subtitle3', { defaultValue: '1.3. Cookies и техническая информация' })}</h3>
          <p className="mb-4">{t('privacy.content.section1.cookies', { defaultValue: 'Сайт может автоматически собирать техническую информацию с использованием файлов cookies. Эти данные используются для анализа посещаемости, оптимизации работы Сайта и повышения удобства Пользователей.' })}</p>

          <h3 className="text-xl font-semibold mb-3">{t('privacy.content.section1.subtitle4', { defaultValue: '1.4. Особенности обработки данных несовершеннолетних' })}</h3>
          <p className="mb-8">{t('privacy.content.section1.minors', { defaultValue: 'Если Пользователь младше 18 лет, регистрация возможна только с согласия родителей или законных представителей.' })}</p>

          <h2 className="text-2xl font-bold mb-4">{t('privacy.content.section2.title', { defaultValue: '2. Цели обработки персональной информации' })}</h2>
          <p className="mb-4">{t('privacy.content.section2.intro', { defaultValue: '2.1. Персональная информация Пользователей обрабатывается для следующих целей:' })}</p>
          <ul className="list-disc pl-6 mb-8">
            <li>{t('privacy.content.section2.purpose1', { defaultValue: 'Регистрация на образовательные курсы, соревнования и мероприятия, проводимые Компанией;' })}</li>
            <li>{t('privacy.content.section2.purpose2', { defaultValue: 'Организация процесса обучения, рассылка материалов и управление доступом к образовательным ресурсам;' })}</li>
            <li>{t('privacy.content.section2.purpose3', { defaultValue: 'Информирование об условиях участия, обновлениях, изменениях расписания мероприятий;' })}</li>
            <li>{t('privacy.content.section2.purpose4', { defaultValue: 'Подготовка сертификатов, дипломов и других подтверждающих документов;' })}</li>
            <li>{t('privacy.content.section2.purpose5', { defaultValue: 'Проведение статистического и аналитического анализа для улучшения качества предоставляемых услуг;' })}</li>
            <li>{t('privacy.content.section2.purpose6', { defaultValue: 'Информирование о новых мероприятиях, курсах и акциях Компании (при наличии согласия Пользователя).' })}</li>
          </ul>

          <h2 className="text-2xl font-bold mb-4">{t('privacy.content.section3.title', { defaultValue: '3. Условия обработки персональной информации' })}</h2>
          
          <h3 className="text-xl font-semibold mb-3">{t('privacy.content.section3.subtitle1', { defaultValue: '3.1. Согласие Пользователя' })}</h3>
          <p className="mb-4">{t('privacy.content.section3.consent', { defaultValue: 'Использование персональных данных осуществляется только на основании добровольного согласия Пользователя, выраженного путем заполнения регистрационных форм на Сайте.' })}</p>

          <h3 className="text-xl font-semibold mb-3">{t('privacy.content.section3.subtitle2', { defaultValue: '3.2. Передача данных' })}</h3>
          <p className="mb-4">{t('privacy.content.section3.transferIntro', { defaultValue: 'Компания может передавать персональные данные третьим лицам в следующих случаях:' })}</p>
          <ul className="list-disc pl-6 mb-4">
            <li>{t('privacy.content.section3.transfer1', { defaultValue: 'Для выполнения обязательств (например, партнерам, предоставляющим образовательные ресурсы или организующим мероприятия);' })}</li>
            <li>{t('privacy.content.section3.transfer2', { defaultValue: 'При наличии явного согласия Пользователя;' })}</li>
            <li>{t('privacy.content.section3.transfer3', { defaultValue: 'В случаях, предусмотренных законодательством Республики Казахстан (например, по запросу государственных органов).' })}</li>
          </ul>

          <h3 className="text-xl font-semibold mb-3">{t('privacy.content.section3.subtitle3', { defaultValue: '3.3. Хранение данных' })}</h3>
          <p className="mb-4">{t('privacy.content.section3.storage', { defaultValue: 'Персональная информация Пользователей хранится в течение срока, необходимого для достижения целей обработки, но не более 5 лет после завершения мероприятий, за исключением случаев, когда более длительный срок хранения предусмотрен законодательством.' })}</p>

          <h3 className="text-xl font-semibold mb-3">{t('privacy.content.section3.subtitle4', { defaultValue: '3.4. Удаление данных' })}</h3>
          <p className="mb-8">{t('privacy.content.section3.deletion', { defaultValue: 'Пользователь имеет право запросить удаление своих данных, направив соответствующий запрос на электронную почту Компании: info@aeroo.space.' })}</p>

          <h2 className="text-2xl font-bold mb-4">{t('privacy.content.section4.title', { defaultValue: '4. Защита персональной информации' })}</h2>
          <p className="mb-4">{t('privacy.content.section4.subtitle1', { defaultValue: '4.1. Компания применяет современные технические и организационные меры для защиты персональных данных от:' })}</p>
          <p className="mb-4">{t('privacy.content.section4.intro', { defaultValue: 'Компания применяет современные технические и организационные меры для защиты персональных данных от:' })}</p>
          <ul className="list-disc pl-6 mb-4">
            <li>{t('privacy.content.section4.measure1', { defaultValue: 'Несанкционированного доступа и изменения;' })}</li>
            <li>{t('privacy.content.section4.measure2', { defaultValue: 'Утраты, уничтожения или утечки;' })}</li>
            <li>{t('privacy.content.section4.measure3', { defaultValue: 'Иных неправомерных действий.' })}</li>
          </ul>
          <p className="mb-4">{t('privacy.content.section4.subtitle2', { defaultValue: '4.2. Доступ к персональной информации имеют только уполномоченные сотрудники Компании, прошедшие обучение в области работы с персональными данными.' })}</p>
          <p className="mb-4">{t('privacy.content.section4.access', { defaultValue: 'Доступ к персональной информации имеют только уполномоченные сотрудники Компании, прошедшие обучение в области работы с персональными данными.' })}</p>
          <p className="mb-8">{t('privacy.content.section4.subtitle3', { defaultValue: '4.3. В случае утечки данных или иных инцидентов, связанных с безопасностью, Компания уведомит Пользователей и компетентные органы в установленный законом срок.' })}</p>
          <p className="mb-8">{t('privacy.content.section4.incident', { defaultValue: 'В случае утечки данных или иных инцидентов, связанных с безопасностью, Компания уведомит Пользователей и компетентные органы в установленный законом срок.' })}</p>

          <h2 className="text-2xl font-bold mb-4">{t('privacy.content.section5.title', { defaultValue: '5. Права Пользователей' })}</h2>
          <p className="mb-4">{t('privacy.content.section5.subtitle', { defaultValue: '5.1. Пользователь имеет право:' })}</p>
          <ul className="list-disc pl-6 mb-4">
            <li>{t('privacy.content.section5.right1', { defaultValue: 'Получать информацию о целях и способах обработки своих данных;' })}</li>
            <li>{t('privacy.content.section5.right2', { defaultValue: 'Запрашивать копию своих персональных данных, обрабатываемых Компанией;' })}</li>
            <li>{t('privacy.content.section5.right3', { defaultValue: 'Требовать исправления или удаления своих данных;' })}</li>
            <li>{t('privacy.content.section5.right4', { defaultValue: 'Отозвать согласие на обработку данных;' })}</li>
            <li>{t('privacy.content.section5.right5', { defaultValue: 'Ограничивать использование своих данных в рамках закона.' })}</li>
          </ul>
          <p className="mb-8">{t('privacy.content.section5.subtitle2', { defaultValue: '5.2. Для реализации своих прав Пользователь может направить запрос на info@aeroo.space. Запрос будет обработан в течение 30 рабочих дней.' })}</p>
          <p className="mb-8">{t('privacy.content.section5.requests', { defaultValue: 'Для реализации своих прав Пользователь может направить запрос на info@aeroo.space. Запрос будет обработан в течение 30 рабочих дней.' })}</p>

          <h2 className="text-2xl font-bold mb-4">{t('privacy.content.section6.title', { defaultValue: '6. Решение споров' })}</h2>
          <p className="mb-4">{t('privacy.content.section6.subtitle1', { defaultValue: '6.1. Все споры, возникающие в связи с обработкой персональных данных, подлежат разрешению в досудебном порядке.' })}</p>
          <p className="mb-4">{t('privacy.content.section6.pretrial', { defaultValue: 'Все споры, возникающие в связи с обработкой персональных данных, подлежат разрешению в досудебном порядке.' })}</p>
          <p className="mb-8">{t('privacy.content.section6.subtitle2', { defaultValue: '6.2. В случае невозможности разрешения спора в досудебном порядке он передается в суд по месту регистрации Компании в соответствии с законодательством Республики Казахстан.' })}</p>
          <p className="mb-8">{t('privacy.content.section6.court', { defaultValue: 'В случае невозможности разрешения спора в досудебном порядке он передается в суд по месту регистрации Компании в соответствии с законодательством Республики Казахстан.' })}</p>

          <h2 className="text-2xl font-bold mb-4">{t('privacy.content.section7.title', { defaultValue: '7. Изменения и дополнения' })}</h2>
          <p className="mb-4">{t('privacy.content.section7.subtitle1', { defaultValue: '7.1. Компания вправе вносить изменения в настоящую Политику. Актуальная версия Политики доступна по адресу: https://www.aeroo.space/policy/.' })}</p>
          <p className="mb-4">{t('privacy.content.section7.updates', { defaultValue: 'Компания вправе вносить изменения в настоящую Политику. Актуальная версия Политики доступна по адресу: https://www.aeroo.space/policy/.' })}</p>
          <p className="mb-4">{t('privacy.content.section7.subtitle2', { defaultValue: '7.2. Новая редакция Политики вступает в силу с момента её публикации, если иное не предусмотрено Политикой или законодательством.' })}</p>
          <p className="mb-4">{t('privacy.content.section7.effective', { defaultValue: 'Новая редакция Политики вступает в силу с момента её публикации, если иное не предусмотрено Политикой или законодательством.' })}</p>
          <p className="mb-4">{t('privacy.content.section7.subtitle3', { defaultValue: '7.3. Компания уведомляет Пользователей о значительных изменениях в Политике путём публикации уведомления на Сайте или отправки информационных писем на контактные данные Пользователей.' })}</p>
          <p className="mb-4">{t('privacy.content.section7.notifications', { defaultValue: 'Компания уведомляет Пользователей о значительных изменениях в Политике путём публикации уведомления на Сайте или отправки информационных писем на контактные данные Пользователей.' })}</p>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Privacy;
