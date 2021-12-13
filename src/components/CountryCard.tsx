import { useContext, useState } from 'react';
import { FavoriteContext } from '../contexts/favoriteContext';
import { AiFillStar } from 'react-icons/ai';

import { useNotify } from '../hooks/useNotify';

interface Country {
  translations: {
    por: {
      common: string;
      official: string;
    }
  };
  capital: string;
  languages: any;
  region: string;
  population: number;
  currencies: any;
  flags: {
    svg: string;
    png: string;
  };
}

interface CountryCardProps {
  country: Country;
  isFavorite?: boolean;
}

export function CountryCard({ country, isFavorite }: CountryCardProps) {
  const [favoriteStatus, setFavoriteStatus] = useState(isFavorite);
  const { addFavorite, removeFavorite } = useContext(FavoriteContext);
  const { infoNotify } = useNotify();

  function handleFavorite() {
    setFavoriteStatus(!favoriteStatus);

    if(favoriteStatus) {
      removeFavorite(country);
      infoNotify(`${country.translations.por.common} removido dos favoritos`);
    } else {
      addFavorite(country);
      infoNotify(`${country.translations.por.common} adicionado aos favoritos`);
    }
  }

  const allCurrencies = Object.keys(country.currencies).map(currency => country.currencies[currency])
  const currencies = allCurrencies.reduce((currency, total) => `${total}, ${currency}`)

  const allLanguages = Object.keys(country.languages).map(lang => country.languages[lang]);
  const languages = allLanguages.reduce((lang, total) => `${total}, ${lang}`)

  return (
    <div className={`
      flex flex-col items-center sm:flex-row 
      mt-16 px-4 sm:px-6 py-4 
      shadow-gray-800 shadow-lg
      bg-gradient-to-r from-gray-300 via-gray-100 to-gray-300
      rounded-md border border-gray-500
      max-w-lg sm:max-w-none
    `}>
      <img 
        src={country.flags.svg} 
        alt="Bandeira"
        className={`h-40 w-56 sm:w-72 sm:h-48 rounded-2xl`}
      />

      <div className={`
        flex flex-col mt-4 w-56 
        sm:mt-0 sm:ml-4 sm:w-80
      `}>
        <header className={`flex justify-between`}>
          <h1 className={`font-bold text-3xl`}>{country.translations.por.common}</h1>
            <button onClick={handleFavorite}>
              <AiFillStar size={30} color={favoriteStatus ? '#EFD700' : '#44474C'}/>
            </button>
        </header>

        <h2 className={`font-bold text-gray-600 text-lg`}>{country.translations.por.official}</h2>
        <p><strong>Capital: </strong>{country.capital}</p>
        <p><strong>Línguas: </strong>{languages}</p>
        <p><strong>Região: </strong>{country.region}</p>
        <p><strong>População: </strong>{
          new Intl.NumberFormat('pt-BR', {
            useGrouping: true
          }).format(country.population)
        }</p>
        <p><strong>Moeda: </strong>{currencies?.name} ({currencies?.symbol})</p>
      </div>
    </div>
  );
}