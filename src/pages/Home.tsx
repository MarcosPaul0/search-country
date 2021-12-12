import { useState, FormEvent, useContext } from 'react';
import { BiSearchAlt2 } from 'react-icons/bi';

import { SearchCountriesContext } from '../contexts/searchCountriesContext';
import { FavoriteContext } from '../contexts/favoriteContext';

import { ToastContainer } from 'react-toastify';
import { CountryCard } from '../components/CountryCard';

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

export function Home() {
  const [select, setSelect] = useState('translation');
  const [search, setSearch] = useState('');
  const { countries, searchCountries } = useContext(SearchCountriesContext);

  const { findCountry } = useContext(FavoriteContext);

  function translateToPlaceholder() {
    switch(select) {
      case 'translation':
        return 'nome';
      case 'currency':
        return 'moeda';
      case 'lang':
        return 'língua';
      case 'region':
        return 'região';
    }
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    searchCountries({ type: select, search });
  }

  return (
    <main className={`flex flex-col items-center w-full bg-gray-100 pb-4`}>
      <form className={`flex flex-col gap-2 sm:gap-0 sm:flex-row mt-16`}>
        <select 
          defaultValue={select}
          onChange={e => setSelect(e.target.value)}
          className={`px-4 py-2 bg-gray-800 text-gray-50 sm:w-24 rounded-md sm:rounded-l-md sm:rounded-r-none`}
        >
          <option value="translation">nome</option>
          <option value="currency">moeda</option>
          <option value="lang">língua</option>
          <option value="region">região</option>
        </select>
        <div className={`flex`}>
          <input 
            type="text" 
            placeholder={`Buscar por ${translateToPlaceholder()}`}
            onChange={e => setSearch(e.target.value)} 
            className={`w-52 sm:w-96 px-4 py-2 transition duration-200
              bg-gray-200 text-gray-900 border border-gray-700 focus:bg-gray-100 
              rounded-l-md sm:rounded-none outline-none`}
          />
          <button 
            type="submit"
            className={`px-4 py-2 bg-gray-800 rounded-r-md`}
            onClick={handleSubmit}
          >
            <BiSearchAlt2 size={30} color='#F8FAFC' />
          </button>
          <ToastContainer />
        </div>
      </form>
      {countries.length > 0 ?
        countries.map((country: Country) => {
          const countryFormatted = {
            translations: {
              por: country.translations.por
            },
            capital: country.capital,
            currencies: country.currencies,
            flags: country.flags,
            languages: country.languages,
            population: country.population,
            region: country.region
          }

          return (
            <CountryCard 
              key={country.translations.por.common} 
              country={countryFormatted}
              isFavorite={findCountry(countryFormatted)}
            />     
          )
        })
      : ''}
    </main>
  )
}