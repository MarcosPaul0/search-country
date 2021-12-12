import { createContext, ReactNode, useState } from 'react';
import api from '../services/api';

import { useNotify } from '../hooks/useNotify';

interface SearchCountriesContextProviderProps {
  children: ReactNode;
}

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

interface SearchCountriesRequest {
  type: string;
  search: string;
}

interface AuthContextData {
  countries: Country[];
  searchCountries: ({type, search}: SearchCountriesRequest) => void;
}

export const SearchCountriesContext = createContext({} as AuthContextData);

export function SearchCountriesContextProvider({children}: SearchCountriesContextProviderProps) {
  const [countries, setCountries] = useState<Country[]>([]);
  const { errorNotify } = useNotify();

  async function searchCountries({type, search}: SearchCountriesRequest) {
    try {
      const response = await api.get<Country[]>(`${type}/${search}`);
      
      if(response.data.length > 10) {
        setCountries(response.data.slice(0, 10));
        return;
      }
      
      setCountries(response.data);
    } catch(error: any) {
      errorNotify('País não encontrado!');
    } 
  }

  return (
    <SearchCountriesContext.Provider value={{ countries, searchCountries }}>
      {children}
    </SearchCountriesContext.Provider>
  );
}