import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

const NotFound = () => {
  const location = useLocation();
  const { t } = useTranslation();

  useEffect(() => {
    document.title = t('notFound.metaTitle', { defaultValue: 'Страница не найдена — AEROO' });
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname, t]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">{t('notFound.title', { defaultValue: '404' })}</h1>
        <p className="text-xl text-gray-600 mb-4">{t('notFound.message', { defaultValue: 'Oops! Page not found' })}</p>
        <a href="/" className="text-blue-500 hover:text-blue-700 underline">
          {t('notFound.back', { defaultValue: 'Return to Home' })}
        </a>
      </div>
    </div>
  );
};

export default NotFound;
