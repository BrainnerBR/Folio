import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="w-full bg-white shadow-sm rounded-3xl p-10">
      <div className="flex flex-col md:flex-row justify-between gap-14">
        {/* Logo + Text */}
        <div className="max-w-xs">
          <h2 className="text-2xl font-extrabold text-black">
            Folio<span className="text-primary">.</span>
          </h2>
          <p className="text-black mt-2">
            {t('footer.tagline')}
          </p>
        </div>

        {/* Columns */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-5 flex-1">
          {/* Product */}
          <div>
            <h3 className="font-bold text-black mb-3">{t('footer.product.title')}</h3>
            <ul className="space-y-2 text-black cursor-pointer ">
              <li className="hover:text-primary duration-100">{t('footer.product.features')}</li>
              <li className="hover:text-primary duration-100">{t('footer.product.templates')}</li>
              <li className="hover:text-primary duration-100">{t('footer.product.integrations')}</li>
              <li className="hover:text-primary duration-100">{t('footer.product.ai_studio')}</li>
              <li className="hover:text-primary duration-100">
                {t('footer.product.analytics')}
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-bold text-black mb-3">{t('footer.company.title')}</h3>
            <ul className="space-y-2 text-black cursor-pointer">
              <li className="hover:text-primary duration-100">{t('footer.company.about')}</li>
              <li className="hover:text-primary duration-100">{t('footer.company.careers')}</li>
              <li className="hover:text-primary duration-100">{t('footer.company.blog')}</li>
              <li className="hover:text-primary duration-100">{t('footer.company.partners')}</li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-bold text-black mb-3">{t('footer.resources.title')}</h3>
            <ul className="space-y-2 text-black cursor-pointer">
              <li className="hover:text-primary duration-100">{t('footer.resources.help')}</li>
              <li className="hover:text-primary duration-100">
                {t('footer.resources.api')}
              </li>
              <li className="hover:text-primary duration-100">{t('footer.resources.tutorials')}</li>
              <li className="hover:text-primary duration-100">{t('footer.resources.support')}</li>
            </ul>
          </div>
        </div>

        {/* Social + Subscribe */}
        <div className="flex flex-col gap-4">
          {/* Subscribe */}
          <div>
            <p className="font-semibold text-black mb-2">{t('footer.updates.title')}</p>
            <div className="flex items-center gap-2">
              <input
                type="email"
                placeholder={t('footer.updates.placeholder')}
                className="border border-black/20 rounded-lg px-3 py-2 text-sm focus:outline-none"
              />
              <button className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-4 py-2 rounded-lg cursor-pointer">
                {t('footer.updates.subscribe')}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer bottom text */}
      <div className="mt-10 border-t border-black/10 pt-4 text-black/50 text-sm flex items-center justify-center gap-2">
        {t('footer.copyright')}
      </div>
    </footer>
  );
}
