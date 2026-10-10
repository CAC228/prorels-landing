export function Kb65Diagram() {
  return <figure className="kb65-figure">
    <div className="kb65-diagram-scroll" role="region" aria-label="Схема одного узла КБ-65" tabIndex={0}>
      <svg viewBox="0 0 720 330" role="img" aria-labelledby="kb65-title kb65-desc" xmlns="http://www.w3.org/2000/svg">
        <title id="kb65-title">Условная схема узла КБ-65</title>
        <desc id="kb65-desc">Рельс через прокладку опирается на подкладку и удерживается двумя клеммами. Подкладка через нашпальную прокладку соединена со шпалой двумя закладными болтами. На целой шпале два таких узла.</desc>
        <rect x="40" y="246" width="440" height="54" rx="7" fill="#dde3e7" stroke="#151D25" strokeWidth="2" />
        <rect x="64" y="234" width="392" height="12" fill="#151D25" />
        <rect x="64" y="210" width="392" height="24" rx="3" fill="#FFFFFF" stroke="#151D25" strokeWidth="2" />
        <rect x="171" y="198" width="180" height="12" fill="#FB5A00" />
        <path d="M208 56Q208 48 216 48H306Q314 48 314 56V75Q314 85 280 91V171Q280 181 334 184L345 198H177L188 184Q242 181 242 171V91Q208 85 208 75Z" fill="#151D25" />
        <path d="M170 206V174H210L221 183H194V206ZM352 206V174H312L301 183H328V206Z" fill="#FFFFFF" stroke="#151D25" strokeWidth="3" />
        <path d="M184 162V226M338 162V226M112 188V277M410 188V277" stroke="#FB5A00" strokeWidth="9" />
        <path d="M170 162H198M324 162H352M99 187H125M397 187H423" stroke="#151D25" strokeWidth="10" />
        <path d="M100 241V257H124V241M398 241V257H422V241" fill="none" stroke="#FFFFFF" strokeWidth="5" />
        <g fill="none" stroke="#5b6871" strokeWidth="1.3"><path d="M314 62H500"/><path d="M351 175H466V105H500"/><path d="M345 204H480V143H500"/><path d="M456 221H490V181H500"/><path d="M416 266H480V221H500"/><path d="M450 241H466V259H500"/></g>
        <g fill="#151D25" fontFamily="Arial, sans-serif" fontSize="14"><text x="514" y="67">Рельс Р65</text><text x="514" y="103">Клемма и</text><text x="514" y="122">клеммный болт</text><text x="514" y="148">Прокладка ЦП-143</text><text x="514" y="186">Подкладка КБ65</text><text x="514" y="217">Закладной болт,</text><text x="514" y="236">скоба и втулка</text><text x="514" y="264">Прокладка ЦП-328</text><text x="240" y="280">Шпала</text></g>
      </svg>
    </div>
    <figcaption><strong>1 шпала = 2 узла крепления.</strong> Показан один узел. Схема условная, без масштаба; размеры и монтаж — по рабочей документации.</figcaption>
  </figure>;
}
