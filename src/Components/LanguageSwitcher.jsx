import { useTranslation } from "react-i18next";
import { Globe, ChevronDown } from "lucide-react";

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const changeLanguage = (e) => {
    i18n.changeLanguage(e.target.value);
  };

  return (
    <div className="relative group">
      <div className="flex items-center gap-2 px-3 py-2 rounded-xl text-text/80 bg-transparent hover:bg-black/5 transition-colors cursor-pointer border border-transparent hover:border-black/5">
        <Globe size={18} />
        <select
          value={i18n.language}
          onChange={changeLanguage}
          className="appearance-none bg-transparent border-none text-sm font-medium uppercase focus:ring-0 cursor-pointer outline-none pr-4 w-full"
        >
          <option value="en">EN</option>
          <option value="es">ES</option>
        </select>
        <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none opacity-50" />
      </div>
    </div>
  );
}
