import { useState } from 'react';
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography
} from '@mui/material';
import { styled } from '@mui/system';
import ForgotPasswordForm from './ForgotPasswordForm';
import { useRouter } from 'next/router';
import { createSession } from '@/api/api';

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

interface LoginFormProps {
  onLogin: (email: string, password: string) => void;
  loading: boolean;
}

export default function LoginForm({ loading }: LoginFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [action, setAction] = useState<'login' | 'forgotPassword'>('login');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await createSession({ email, password });
      const { token, userId, role } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('role', role);

      router.push(`/dashboards/HomePage/${userId}`);
    } catch (error) {
      setError('Usuário ou senha incorretos');
    }
  };

  return (
    <>
      {action === 'login' && (
        <form onSubmit={handleSubmit}>
          <FormWrapper>
            <Typography variant="h5" gutterBottom>
              Login
            </Typography>
            <TextField
              label="Usuário"
              variant="outlined"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Senha"
              variant="outlined"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              margin="normal"
              required
            />
            {error && (
              <Box my={2}>
                <Alert severity="error">{error}</Alert>
              </Box>
            )}
            <ButtonWrapper>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                disabled={loading}
              >
                {loading ? <CircularProgress size={24} /> : 'Login'}
              </Button>
              <Button
                color="primary"
                onClick={() => setAction('forgotPassword')}
              >
                Esqueceu sua senha ?
              </Button>
            </ButtonWrapper>
          </FormWrapper>
        </form>
      )}

      {action === 'forgotPassword' && (
        <ForgotPasswordForm onResetPassword={() => {}} loading={false} />
      )}
    </>
  );
}
