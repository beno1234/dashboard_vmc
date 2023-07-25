import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Box, Typography } from '@mui/material';
import { styled } from '@mui/system';
import ResetPasswordForm from '@/components/auth/ResetPasswordForm';
import jwt from 'jsonwebtoken';

const PageWrapper = styled(Box)(
  ({ theme }) => `
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: ${theme.spacing(4)};
  `
);

export default function ResetPasswordPage() {
  const [loading] = useState(false);
  const [success] = useState(false);
  const router = useRouter();
  const { token } = router.query;

  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    if (token) {
      try {
        const decoded = jwt.decode(token as string);
        if (decoded && typeof decoded === 'object' && 'email' in decoded) {
          setEmail(decoded.email);
          console.log('E-mail extraído do token:', decoded.email);
        }
      } catch (err) {
        console.error('Erro ao decodificar o token:', err);
      }
    }
  }, [token]);

  const handleResetPassword = async () => {
    if (!email) {
      console.error('E-mail não encontrado');
      return;
    }
  };

  if (!email) {
    return null;
  }

  return (
    <PageWrapper>
      {success ? (
        <Typography variant="h5">Senha redefinida com sucesso!</Typography>
      ) : (
        <ResetPasswordForm
          onResetPassword={handleResetPassword}
          loading={loading}
          token={token as string}
        />
      )}
    </PageWrapper>
  );
}
