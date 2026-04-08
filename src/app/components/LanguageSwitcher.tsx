import { useTranslation } from 'react-i18next';

export function LanguageSwitcher() {
  const { i18n, t } = useTranslation();
  const currentLanguage = i18n.language || 'pt';

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('archeonLanguage', lng);
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-[#a89677] hidden sm:inline">{t('language.label')}:</span>
      <button
        type="button"
        onClick={() => changeLanguage('pt')}
        className={`px-3 py-2 text-xs font-semibold rounded-full transition-colors ${currentLanguage === 'pt' ? 'bg-[#b8964f] text-[#1a0f08]' : 'bg-transparent border border-[#8b6f47]/50 text-[#a89677] hover:border-[#b8964f] hover:text-[#b8964f]'}`}
      >
        {t('language.pt')}
      </button>
      <button
        type="button"
        onClick={() => changeLanguage('en')}
        className={`px-3 py-2 text-xs font-semibold rounded-full transition-colors ${currentLanguage === 'en' ? 'bg-[#b8964f] text-[#1a0f08]' : 'bg-transparent border border-[#8b6f47]/50 text-[#a89677] hover:border-[#b8964f] hover:text-[#b8964f]'}`}
      >
        {t('language.en')}
      </button>
    </div>
  );
}
