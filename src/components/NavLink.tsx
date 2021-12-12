import { Link, useLocation } from 'react-router-dom';

interface NavLinkProps {
  path: string;
  text: string;
}

export function NavLink({path, text}: NavLinkProps) {
  const { pathname } = useLocation();

  return (
    <div className={`flex flex-col sm:justify-between h-full`}>
      <Link to={path} className={`mt-8 sm:mt-0 pt-5 leading-6 font-bold transition duration-200 hover:text-gray-300`}>
        {text}
      </Link>
      {pathname === path && <div className={`mt-4 h-1 w-full rounded-t bg-gray-400`}></div>}
    </div>
  )
}