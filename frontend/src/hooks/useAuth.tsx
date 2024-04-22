import { useContext } from 'react';
import AuthContext from '../store/AuthContext';

const useAuth = () => {
  const authContext = useContext(AuthContext);
  return authContext;
};

export default useAuth;
