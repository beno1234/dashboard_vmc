import { useRouter } from 'next/router';
import { useEffect } from 'react';

const ProtectedRoute = ({ children }) => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/'); // Redireciona para a página de login se o token não estiver presente
    }
  }, []);

  return <>{children}</>;
};

export default ProtectedRoute;
