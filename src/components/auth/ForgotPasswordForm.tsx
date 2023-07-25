import { useState } from 'react';
import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography
} from '@mui/material';
import { styled } from '@mui/system';
import { ForgotPassword } from '@/api/api';
import LoginForm from './LoginForm';

interface ForgotPasswordFormProps {
  onResetPassword: (email: string) => void;
  loading: boolean;
}

const FormWrapper = styled(Box)(
  ({ theme }) => `
      background: ${theme.palette.common.white};
      padding: ${theme.spacing(4)};
      border-radius: ${theme.shape.borderRadius}px;
      box-shadow: ${theme.shadows[1]};
      display: flex;
      flex-direction: column;
      align-items: center;
      max-width: 400px;
      margin: 0 auto;
  `
);

const ButtonWrapper = styled(Box)(
  ({ theme }) => `
    margin-top: ${theme.spacing(2)};
    width: 100%;
    display: flex;
    justify-content: space-between;
`
);

export default function ForgotPasswordForm({
  onResetPassword,
  loading
}: ForgotPasswordFormProps) {
  const [email, setEmail] = useState('');
  const [action, setAction] = useState<'login' | 'register' | 'forgotPassword'>(
    'forgotPassword'
  );
  const [error, setError] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await ForgotPassword({ email });
      setError('');
      onResetPassword(email);
    } catch (error) {
      setError('Erro ao enviar o e-mail de redefinição de senha');
    }
  };

  return (
    <>
      {action === 'forgotPassword' && (
        <form onSubmit={handleSubmit}>
          <FormWrapper>
            <Typography variant="h5" gutterBottom>
              Esqueceu sua senha
            </Typography>
            <Typography variant="body1" gutterBottom>
              Digite o endereço de e-mail associado à sua conta e enviaremos
              instruções para redefinir sua senha.
            </Typography>
            <TextField
              label="E-mail"
              variant="outlined"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              margin="normal"
              required
            />
            {error && (
              <Box my={2}>
                <Typography color="error">{error}</Typography>
              </Box>
            )}
            <ButtonWrapper>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                disabled={loading}
              >
                {loading ? <CircularProgress size={24} /> : 'Enviar'}
              </Button>
              <Button color="primary" onClick={() => setAction('login')}>
                Voltar ao Login
              </Button>
            </ButtonWrapper>
          </FormWrapper>
        </form>
      )}

      {action === 'login' && <LoginForm onLogin={() => {}} loading={false} />}
    </>
  );
}
