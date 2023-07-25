import { useState } from 'react';
import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography
} from '@mui/material';
import { styled } from '@mui/system';
import { createUser } from '@/api/api';
import { useRouter } from 'next/router';

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

interface RegisterFormProps {
  onRegister: (username: string, password: string) => void;
  loading: boolean;
}

export default function RegisterForm({ loading }: RegisterFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await createUser({ email, password });
      router.push('/');
    } catch (error) {
      setError('Algo deu errado');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormWrapper>
        <Typography variant="h5" gutterBottom>
          Cadastrar novo usuário
        </Typography>
        <TextField
          label="Email"
          variant="outlined"
          type="username"
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
        <ButtonWrapper>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : 'Cadastrar'}
          </Button>
        </ButtonWrapper>
      </FormWrapper>
    </form>
  );
}
