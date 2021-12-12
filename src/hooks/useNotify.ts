import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ReactText } from 'react';

interface NotifyReturn {
  errorNotify: ( message: string ) => ReactText;
  infoNotify: ( message: string ) => ReactText;
}

export function useNotify(): NotifyReturn {

  const errorNotify = ( message: string ) => toast.error(message, {
    position: 'bottom-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'colored'
  });

  const infoNotify = ( message: string ) => toast.info(message, {
    position: 'bottom-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    style: {
      backgroundColor: '#1f2937'
    },
    theme: 'colored'
  });

  return {
    errorNotify,
    infoNotify
  }
}