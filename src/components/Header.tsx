import logoImg from '../assets/logo.svg';

import { NavLink } from './NavLink';

export function Header() {
  return (
    <header className={`w-full h-32 sm:h-16 
      px-8 lg:px-52 md:px-32 sm:px-12 
      flex flex-col sm:flex-row 
      justify-center sm:justify-between 
      items-center bg-gray-800 text-gray-50`
    }>
      <img src={logoImg} alt="logo" className={`mt-1 sm:mt-0`} />
      <nav className={`flex gap-20 h-full`}>
        <NavLink path="/" text="Início" />
        <NavLink path="/favorites" text="Favoritos" />
      </nav>
    </header>
  );
}