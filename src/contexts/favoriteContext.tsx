import { createContext, ReactNode, useEffect, useState } from 'react';

interface FavoriteContextProviderProps {
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

interface AuthContextData {
  favorites: Country[];
  addFavorite: (country: Country) => void;
  removeFavorite: (country: Country) => void;
  findCountry: (country: Country) => boolean;
}

export const FavoriteContext = createContext({} as AuthContextData);

export function FavoriteContextProvider({children}: FavoriteContextProviderProps) {
  const [favorites, setFavorites] = useState<Country[]>([]);

  function addFavorite(country: Country) {
    const favoritesJson = localStorage.getItem('@search-countries:favorites') as string;
    
    const favoritesParsed = JSON.parse(favoritesJson);
    favoritesParsed.push(country);
    setFavorites(favoritesParsed);

    localStorage.setItem('@search-countries:favorites', JSON.stringify(favoritesParsed));
  }

  function removeFavorite(country: Country) {
    const favoritesJson = localStorage.getItem('@search-countries:favorites') as string;
    
    const favoritesParsed = JSON.parse(favoritesJson);
    favoritesParsed.splice(favorites.indexOf(country), 1);
    setFavorites(favoritesParsed);

    localStorage.setItem('@search-countries:favorites', JSON.stringify(favoritesParsed));
  }

  function findCountry(country: Country): boolean {
    for(let i = 0; i < favorites.length; i++) {
      if(country.translations.por.common === favorites[i].translations.por.common) {
        return true;
      }
    }
    return false;
  }

  useEffect(() => {
    const favoritesLocal = localStorage.getItem('@search-countries:favorites');

    if(!favoritesLocal) {
      localStorage.setItem('@search-countries:favorites', JSON.stringify([]));
      return;
    }

    setFavorites(JSON.parse(favoritesLocal));
  }, [])

  return (
    <FavoriteContext.Provider value={{ favorites, addFavorite, removeFavorite, findCountry }}>
      {children}
    </FavoriteContext.Provider>
  );
}