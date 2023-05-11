import {
  Box,
  Card,
  Typography,
  Container,
  Divider,
  Button,
  FormControl,
  OutlinedInput,
  InputAdornment,
  styled
} from '@mui/material';
import Head from 'next/head';
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';
import type { ReactElement } from 'react';
import BaseLayout from 'src/layouts/BaseLayout';

const MainContent = styled(Box)(
  () => `
    height: 100%;
    display: flex;
    flex: 1;
    flex-direction: column;
`
);

const TopWrapper = styled(Box)(
  ({ theme }) => `
  display: flex;
  width: 100%;
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: ${theme.spacing(6)};
`
);

const OutlinedInputWrapper = styled(OutlinedInput)(
  ({ theme }) => `
    background-color: ${theme.colors.alpha.white[100]};
`
);

const ButtonSearch = styled(Button)(
  ({ theme }) => `
    margin-right: -${theme.spacing(1)};
`
);

function Status404() {
  return (
    <>
      <Head>
        <title>Status - 404</title>
      </Head>
      <MainContent>
        <TopWrapper>
          <Container maxWidth="md">
            <Box textAlign="center">
              <img alt="404" height={180} src="/static/images/status/404.svg" />
              <Typography variant="h2" sx={{ my: 2 }}>
                A página que você está tentando procurar não existe.
              </Typography>
              <Typography
                variant="h4"
                color="text.secondary"
                fontWeight="normal"
                sx={{ mb: 4 }}
              >
                É por nossa conta, mudamos o conteúdo para uma página diferente.
                A pesquisa abaixo deve ajudar!
              </Typography>
            </Box>
            <Container maxWidth="sm">
              <Card sx={{ textAlign: 'center', mt: 3, p: 4 }}>
                <FormControl variant="outlined" fullWidth>
                  <OutlinedInputWrapper
                    type="text"
                    placeholder="Search terms here..."
                    endAdornment={
                      <InputAdornment position="end">
                        <ButtonSearch variant="contained" size="small">
                          Procurar
                        </ButtonSearch>
                      </InputAdornment>
                    }
                    startAdornment={
                      <InputAdornment position="start">
                        <SearchTwoToneIcon />
                      </InputAdornment>
                    }
                  />
                </FormControl>
                <Divider sx={{ my: 4 }}>OR</Divider>
                <Button href="/" variant="outlined">
                  Vá para Pagina principal
                </Button>
              </Card>
            </Container>
          </Container>
        </TopWrapper>
      </MainContent>
    </>
  );
}

export default Status404;

Status404.getLayout = function getLayout(page: ReactElement) {
  return <BaseLayout>{page}</BaseLayout>;
};
