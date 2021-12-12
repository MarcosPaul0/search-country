import { useContext } from 'react';
import { CountryCard } from '../components/CountryCard';
import { FavoriteContext } from '../contexts/favoriteContext';
import { ToastContainer } from 'react-toastify';

export function Favorites() {
  const { favorites } = useContext(FavoriteContext);

  return (
    <main className={`flex flex-col items-center w-full bg-gray-100 pb-4`}>
      {favorites.length > 0 ?
        favorites.map((country) => {
          return (
            <CountryCard key={country.translations.por.common} country={ country } isFavorite />
          )
        })
      : ''}
      <ToastContainer />
    </main>
  )
}