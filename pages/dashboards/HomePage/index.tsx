import Head from 'next/head';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import { useTheme, useMediaQuery } from '@mui/material';
import { styled } from '@mui/system';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AutorenewIcon from '@mui/icons-material/Autorenew';

import SidebarLayout from '@/layouts/SidebarLayout';
import PageHeader from '@/content/Dashboards/Crypto/PageHeader';
import PageTitleWrapper from '@/components/PageTitleWrapper';
import { useState } from 'react';

interface Sample {
  id: string;
  name: string;
  createdAt: string;
  status: string;
  downloadUrl: string;
}

const SAMPLES: Sample[] = [
  {
    id: '1',
    name: 'Amostra 1',
    createdAt: '23 de Maio de 2023',
    status: 'Processando',
    downloadUrl: 'https://example.com/sample1.zip'
  },
  {
    id: '2',
    name: 'Amostra 2',
    createdAt: '10 de Março de 2023',
    status: 'Completo',
    downloadUrl: 'https://example.com/sample2.zip'
  },
  {
    id: '3',
    name: 'Amostra 3',
    createdAt: '9 de Outubro de 2022',
    status: 'Processando',
    downloadUrl: 'https://example.com/sample3.zip'
  },
  {
    id: '4',
    name: 'Amostra 4',
    createdAt: '9 de Outubro de 2022',
    status: 'Processando',
    downloadUrl: 'https://example.com/sample3.zip'
  }
];

const CardWrapper = styled(Card)(
  ({ theme }) => `
    margin-bottom: ${theme.spacing(2)};
  `
);

const StatusIconWrapper = styled(Box)(
  ({ theme }) => `
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: ${theme.spacing(1)};
  `
);

function DashboardCrypto() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));

  const [openDialog, setOpenDialog] = useState(false);

  const handleDownloadClick = (downloadUrl: string) => {
    // Adicione o código para baixar o arquivo aqui
    console.log('Baixar:', downloadUrl);
  };
  const handleRequestMoreSamples = () => {
    setOpenDialog(true);
  };

  const cardBasis = isMobile
    ? '100%'
    : isTablet
    ? 'calc(50% - 8px)'
    : 'calc(33.33% - 8px)';

  return (
    <>
      <Head>
        <title>Home Dashboard</title>
      </Head>
      <PageTitleWrapper>
        <PageHeader />
      </PageTitleWrapper>
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: 2,
            justifyContent: 'center', // Centraliza horizontalmente
            alignItems: 'center' // Centraliza verticalmente
          }}
        >
          {SAMPLES.map((sample) => (
            <CardWrapper key={sample.id} sx={{ flexBasis: cardBasis }}>
              <CardContent>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    mb: 1
                  }}
                >
                  <StatusIconWrapper>
                    {sample.status === 'Completo' ? (
                      <CheckCircleIcon color="success" />
                    ) : (
                      <AutorenewIcon color="warning" />
                    )}
                  </StatusIconWrapper>
                  <Typography variant="h5" component="h2">
                    {sample.name}
                  </Typography>
                </Box>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  Criado em {sample.createdAt}
                </Typography>
                <Typography variant="body2">{sample.status}</Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  onClick={() => handleDownloadClick(sample.downloadUrl)}
                >
                  Download
                </Button>
                <Button size="small">Detalhes</Button>
              </CardActions>
            </CardWrapper>
          ))}
        </Box>
        <Box
          sx={{
            position: 'fixed',
            right: 24,
            bottom: 24
          }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={handleRequestMoreSamples}
          >
            Solicitar mais amostras
          </Button>
        </Box>
        <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
          <DialogTitle>Solicitar mais amostras</DialogTitle>
          <DialogContent>
            <FormControl fullWidth margin="normal">
              <InputLabel>Tipo de Amostra</InputLabel>
              <Select defaultValue="">
                <MenuItem value="">Selecione o tipo</MenuItem>
                <MenuItem value="tipo1">Tipo 1</MenuItem>
                <MenuItem value="tipo2">Tipo 2</MenuItem>
              </Select>
            </FormControl>
            <TextField
              fullWidth
              margin="normal"
              multiline
              rows={4}
              label="Detalhes"
              variant="outlined"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDialog(false)}>Cancelar</Button>
            <Button variant="contained" color="primary">
              Solicitar
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </>
  );
}

DashboardCrypto.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;

export default DashboardCrypto;
