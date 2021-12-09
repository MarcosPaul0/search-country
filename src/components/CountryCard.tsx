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

export function CountryCard({ common, official, capital, languages, region, population, currencies,svg }: CountryCardProps) {
  return (
    <div className={`
      flex flex-col items-center sm:flex-row 
      mt-16 px-4 sm:px-6 py-4 
      shadow-gray-800 shadow-lg
      bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300
      rounded-md border border-gray-500
    `}>
      <img 
        src={svg} 
        alt="Bandeira" 
        className={`h-40 sm:h-48 rounded-xl`}
      />
      <div className={`flex flex-col mt-4 sm:mt-0 sm:ml-4 w-48 sm:w-72`}>
        <header className={`flex justify-between`}>
          <h1 className={`font-bold text-4xl`}>{common}</h1>
          <button>
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="none" viewBox="0 0 15 15">
              <path fill="#44474C" d="M6.483.69c.3-.92 1.603-.92 1.902 0l1.07 3.293a1 1 0 00.95.69h3.462c.969 0 1.37 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.92-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.54-1.118l1.07-3.292a1 1 0 00-.363-1.118l-2.8-2.033c-.782-.57-.38-1.81.589-1.81h3.46a1 1 0 00.952-.69L6.484.692 6.483.69z"/>
            </svg>
          </button>
        </header>
        <h2 className={`font-bold text-gray-600 text-xl`}>{official}</h2>
        <p><strong>Capital: </strong>{capital}</p>
        <p><strong>Línguas: </strong>{languages}</p>
        <p><strong>Região: </strong>{region}</p>
        <p><strong>População: </strong>{population}</p>
        <p><strong>Moeda: </strong>{currencies.name} ({currencies.symbol})</p>
      </div>
    </div>
  );
}