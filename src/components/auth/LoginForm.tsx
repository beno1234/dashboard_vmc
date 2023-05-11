import { useState } from 'react';
import { useRouter } from 'next/router';
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography
} from '@mui/material';
import { styled } from '@mui/system';
import users from '../../../mock/user';
import ForgotPasswordForm from './ForgotPasswordForm';

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

export default function LoginForm({ onLogin, loading }: LoginFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [action, setAction] = useState<'login' | 'register' | 'forgotPassword'>(
    'login'
  );
  const router = useRouter();
  const [error, setError] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validUser = users.find(
      (user) => user.email === email && user.password === password
    );
    if (validUser) {
      onLogin(email, password);
      router.push('/dashboards/HomePage');
    } else {
      setError('Email ou Senha está incorreta');
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
              label="Email"
              variant="outlined"
              type="email"
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
