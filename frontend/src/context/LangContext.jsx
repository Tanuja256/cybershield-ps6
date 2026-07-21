import { createContext, useContext, useState } from 'react';
import { translations } from '../translations';

const LangContext = createContext(null);

export function LangProvider({ children }) {
  const [lang, setLang] = useState('en');

  const toggleLang = () => setLang(prev => prev === 'en' ? 'hi' : 'en');

  const t = translations[lang];

  return (
    <LangContext.Provider value={{ lang, setLang, toggleLang, t }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error('useLang must be used within LangProvider');
  return ctx;
}
