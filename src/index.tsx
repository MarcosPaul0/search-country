import React from 'react';
import ReactDOM from 'react-dom';
import './global.css';
import { App } from './App';

import { FavoriteContextProvider } from './contexts/favoriteContext';
import { SearchCountriesContextProvider } from './contexts/searchCountriesContext';

ReactDOM.render(
  <React.StrictMode>
    <FavoriteContextProvider>
      <SearchCountriesContextProvider>
        <App />
      </SearchCountriesContextProvider>
    </FavoriteContextProvider>  
  </React.StrictMode>,
  document.getElementById('root')
);
