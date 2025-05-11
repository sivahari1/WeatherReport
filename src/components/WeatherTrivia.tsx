import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations';

const WeatherTrivia: React.FC = () => {
  const { t, language } = useLanguage();
  // Get facts from translations for the current language
  const facts = translations[language as keyof typeof translations]?.weatherTrivia || translations['en'].weatherTrivia;
  const [currentIdx, setCurrentIdx] = useState(() => Math.floor(Math.random() * facts.length));

  const handleNextFact = () => {
    let idx = Math.floor(Math.random() * facts.length);
    while (idx === currentIdx && facts.length > 1) {
      idx = Math.floor(Math.random() * facts.length);
    }
    setCurrentIdx(idx);
  };

  return (
    <div className="bg-white/70 rounded-lg p-4 mb-4 shadow text-gray-800 flex flex-col items-center">
      <span className="font-semibold text-lg mb-2">{t('weatherTriviaTitle')}</span>
      <p className="text-center mb-2">{facts[currentIdx]}</p>
      <button
        onClick={handleNextFact}
        className="mt-2 px-3 py-1 bg-blue-200 hover:bg-blue-300 rounded text-sm text-blue-800 transition-colors"
      >
        {t('showAnotherFact')}
      </button>
    </div>
  );
};

export default WeatherTrivia; 