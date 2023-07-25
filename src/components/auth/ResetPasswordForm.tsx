import { useState } from 'react';
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  TextField,
  Typography
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { styled } from '@mui/system';
import { ResetPassword } from '@/api/api';
import { useRouter } from 'next/router';

const FormContainer = styled(Container)(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh'
}));

const FormWrapper = styled(Box)(({ theme }) => ({
  background: theme.palette.common.white,
  padding: theme.spacing(4),
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[2],
  maxWidth: 400,
  width: '100%'
}));

const LogoWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  marginBottom: theme.spacing(4)
}));

const LogoIcon = styled(LockOutlinedIcon)(({ theme }) => ({
  fontSize: theme.spacing(6)
}));

const Title = styled(Typography)(({ theme }) => ({
  textAlign: 'center',
  marginBottom: theme.spacing(4)
}));

const ButtonWrapper = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(2),
  display: 'flex',
  justifyContent: 'center'
}));

const ErrorMessage = styled(Typography)(({ theme }) => ({
  color: theme.palette.error.main,
  marginBottom: theme.spacing(2)
}));

interface ResetPasswordFormProps {
  onResetPassword: (password: string) => void;
  loading: boolean;
  token: string;
}

export default function ResetPasswordForm({
  onResetPassword,
  loading,
  token
}: ResetPasswordFormProps) {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setError('As senhas não coincidem');
      return;
    }

    try {
      // Chamar a API para redefinir a senha
      await ResetPassword({ password }, token);

      // Limpar os campos e exibir uma mensagem de sucesso
      setPassword('');
      setConfirmPassword('');
      setError('');
      onResetPassword(password);
      router.push('/');
    } catch (error) {
      setError('Erro ao redefinir a senha');
    }
  };

  return (
    <FormContainer>
      <FormWrapper>
        <LogoWrapper>
          <LogoIcon />
        </LogoWrapper>
        <Title variant="h5">Redefinir Senha</Title>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Nova Senha"
                variant="outlined"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Confirmar Senha"
                variant="outlined"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                fullWidth
                required
              />
            </Grid>
          </Grid>
          {error && <ErrorMessage>{error}</ErrorMessage>}
          <ButtonWrapper>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : 'Redefinir Senha'}
            </Button>
          </ButtonWrapper>
        </form>
      </FormWrapper>
    </FormContainer>
  );
}
