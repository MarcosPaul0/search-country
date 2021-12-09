import { useState, FormEvent } from 'react';
import api from '../api';
import searchImg from '../assets/search.svg';

import { CountryCard } from '../components/CountryCard';

interface Currency {
  name: string;
  symbol: string;
}

interface CountryCardProps {
  common: string;
  official: string;
  capital: string;
  languages: Object;
  region: string;
  population: number;
  currencies: Currency;
  svg: string;
}

export function Home() {
  const [select, setSelect] = useState('name');
  const [search, setSearch] = useState('');
  const [data, setData] = useState<CountryCardProps | null>(null);

  function translateToPlaceholder() {
    switch(select) {
      case 'name':
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

    const result = await api.get(`${select}/${search}`);

    setData(result.data);
    console.log(data);
  }

  return (
    <main className={`flex flex-col justify-center items-center w-full`}>
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
            <img src={searchImg} alt="Lupa" />
          </button>
        </div>
      </form>
      
    </main>
  )
}