import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export const useProductTranslation = (originalText: string) => {
  const { i18n } = useTranslation();
  const [translatedText, setTranslatedText] = useState(originalText);

  useEffect(() => {
    if (i18n.language === 'uk') {
      setTranslatedText(originalText);
      return;
    }

    // Виклик безкоштовного API або власний проксі-сервіс
    fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(originalText)}&langpair=uk|${i18n.language}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.responseData?.translatedText) {
          setTranslatedText(data.responseData.translatedText);
        }
      })
      .catch(() => setTranslatedText(originalText));
  }, [originalText, i18n.language]);

  return translatedText;
};