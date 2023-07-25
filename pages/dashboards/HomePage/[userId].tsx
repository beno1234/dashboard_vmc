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
  /* IconButton */
} from '@mui/material';
import { useTheme /* useMediaQuery */ } from '@mui/material';
import { styled } from '@mui/system';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { useRouter } from 'next/router';
import SidebarLayout from '@/layouts/SidebarLayout';
import PageHeader from '@/content/Dashboards/Crypto/PageHeader';
import PageTitleWrapper from '@/components/PageTitleWrapper';
import { useState, useEffect, useRef } from 'react';
import ProtectedRoute from '@/components/ProtectedRoute/ProtectedRoute';
import {
  getSamples,
  requestSample,
  getEmails,
  getEmailId,
  sentFile
} from '@/api/api';
import { format, isValid } from 'date-fns';
import { ptBR } from 'date-fns/locale';
/* import Avatar from '@mui/material/Avatar'; */
import EmailIcon from '@mui/icons-material/Email';

interface Sample {
  id: string;
  userId: string;
  name: string;
  details: string;
  createdAt: string;
  status: string;
  downloadUrl: string;
  selectedFile: File | null;
}

interface User {
  id: string;
  email: string;
}

const CardWrapper = styled(Card)(
  ({ theme }) => `
    margin-bottom: ${theme.spacing(2)};
  `
);

const CardContainer = styled(Box)(
  ({ theme }) => `
    display: flex;
    flex-wrap: wrap;
    gap: ${theme.spacing(2)};
    justify-content: center;
    align-items: flex-start;
  `
);

const StyledCard = styled(Card)(
  ({ theme }) => `
    background: linear-gradient(135deg, ${theme.palette.secondary.main} 0%, ${theme.palette.primary.main} 100%);
    border-radius: 15px;
    overflow: hidden;
    position: relative;
    box-shadow: 0 8px 32px rgba(0,0,0,0.1);
    transition: all 0.3s ease-in-out;
    
    &:hover {
      transform: scale(1.05);
      box-shadow: 0 12px 40px rgba(0,0,0,0.2);
    }
  `
);

const CardContentWrapper = styled(CardContent)(
  ({ theme }) => `
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: ${theme.spacing(3)} !important;
    color: #fff;

    h2 {
      font-size: 1.75em;
      margin: 0;
      font-weight: 700;
    }

    .status-icon {
      font-size: 2.5em;
      margin-right: ${theme.spacing(1)};
    }
  `
);

const CardActionsWrapper = styled(CardActions)(
  ({ theme }) => `
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: ${theme.spacing(2)} !important;
    background-color: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(15px);
    border-top: 1px solid rgba(255,255,255,0.1);

    button {
      font-weight: bold;
      color: ${theme.palette.primary.main};
      padding: ${theme.spacing(1)} ${theme.spacing(2)};
      border-radius: ${theme.shape.borderRadius};
      transition: background-color 0.3s ease-in-out;

      &:hover {
        background-color: rgba(0,0,0,0.1);
      }
    }
  `
);

const AdminCardWrapper = styled(Card)(
  ({ theme }) => `
    margin-bottom: ${theme.spacing(2)};
    background-color: ${theme.palette.background.default};
  `
);

const AdminCardContentWrapper = styled(CardContent)(
  ({ theme }) => `
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: ${theme.spacing(3)} !important;
    background-color: ${theme.palette.background.default};
  `
);

const EmailIconWrapper = styled(Box)(
  ({ theme }) => `
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${theme.palette.primary.main};
    color: ${theme.palette.primary.contrastText};
    padding: ${theme.spacing(1)};
    border-radius: 50%;
    margin-right: ${theme.spacing(2)};
  `
);

const AdminCardActionsWrapper = styled(CardActions)(
  ({ theme }) => `
    display: flex;
    justify-content: flex-end;
    padding: ${theme.spacing(2)} !important;
    background-color: ${theme.palette.background.default};
  `
);

/* const SendSampleButton = styled(Button)(
  ({ theme }) => `
    background-color: ${theme.palette.primary.main};
    color: ${theme.palette.primary.contrastText};
    &:hover {
      background-color: ${theme.palette.primary.dark};
    }
  `
); */

/* const UserAvatar = styled(Avatar)(
  ({ theme }) => `
    width: 64px;
    height: 64px;
    margin-bottom: ${theme.spacing(1)};
    background-color: ${theme.palette.primary.main};
  `
); */

function DashboardCrypto() {
  const theme = useTheme();
  /*   const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md')); */

  const [openDialog, setOpenDialog] = useState(false);
  const [sampleType, setSampleType] = useState('');
  const [sampleDetails, setSampleDetails] = useState('');
  const [samples, setSamples] = useState<Sample[]>([]);
  const [selectedUserSamples, setSelectedUserSamples] = useState<Sample[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  /*   const [selectedUserId, setSelectedUserId] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedFileName, setSelectedFileName] = useState(''); */

  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDownloadClick = (downloadUrl) => {
    const anchorElement = document.createElement('a');
    anchorElement.href = downloadUrl;
    anchorElement.setAttribute('download', '');
    anchorElement.click();
  };

  const handleRequestMoreSamples = () => {
    setOpenDialog(true);
  };

  const handleSampleUpload = async (sample) => {
    try {
      // Verifique se um arquivo foi selecionado
      if (sample.selectedFile) {
        // Crie uma instância de FormData
        const formData = new FormData();
        // Adicione o arquivo ao objeto FormData
        formData.append('file', sample.selectedFile);

        // Chame a função sentFile passando o ID da amostra e o objeto FormData
        const response = await sentFile(sample.id, formData);

        // Verifique se o envio do arquivo foi bem-sucedido
        console.log('Resposta da API:', response);

        // Atualize o estado da amostra para refletir a conclusão do envio do arquivo
        const updatedSamples = selectedUserSamples.map((s) =>
          s.id === sample.id
            ? { ...s, selectedFile: null, status: 'Completo' }
            : s
        );
        setSelectedUserSamples(updatedSamples);
      }
    } catch (error) {
      console.error('Erro ao enviar o arquivo', error);
    }
  };

  /*   const uploadSample = async (formData: FormData) => {
    // Implemente aqui a lógica para enviar o formData para o servidor
    // Você pode usar fetch ou uma biblioteca como axios para fazer a chamada HTTP
  }; */

  const handleUserEmailClick = async (email: string) => {
    try {
      const response = await getEmailId(email);
      const userId = response.data.userId;
      console.log('ID do usuário:', userId);
      // Agora você pode usar o ID do usuário para buscar as amostras correspondentes
      const responseSamples = await getSamples(userId);
      setSelectedUserSamples(responseSamples.data);
    } catch (error) {
      console.error('Erro ao obter as amostras do usuário', error);
    }
  };

  const handleSampleRequest = async () => {
    const sampleName = `Amostra ${samples.length + 1}`;
    const sampleCreatedAt = new Date().toLocaleDateString();

    const newSample: Sample = {
      id: '',
      userId: '', // Aqui você precisa fornecer o ID do usuário correto
      name: sampleName,
      details: sampleDetails,
      createdAt: sampleCreatedAt,
      status: 'Processando',
      downloadUrl: '',
      selectedFile: null
    };

    try {
      await requestSample(newSample);
      setOpenDialog(false);
      setSamples([...samples, newSample]);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchSamples = async () => {
      try {
        const userRole = localStorage.getItem('role');
        if (userRole === 'admin') {
          setIsAdmin(true);
          const usersResponse = await getEmails();
          if (usersResponse && Array.isArray(usersResponse.data)) {
            setUsers(usersResponse.data);
          } else {
            throw new Error('Failed to fetch user emails');
          }
        } else {
          setIsAdmin(false);
        }

        const { userId } = router.query;
        if (userId) {
          const response = await getSamples(userId as string);
          if (response && Array.isArray(response.data)) {
            setSamples(response.data);
          } else {
            throw new Error('Failed to fetch user samples');
          }
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchSamples();
  }, [router.query]);

  /*   const cardBasis = isMobile
    ? '100%'
    : isTablet
    ? 'calc(50% - 8px)'
    : 'calc(33.33% - 8px)'; */

  return (
    <ProtectedRoute>
      <Head>
        <title>Home Dashboard</title>
      </Head>
      <PageTitleWrapper>
        <PageHeader />
      </PageTitleWrapper>
      <Container maxWidth="lg">
        <CardContainer>
          {isAdmin ? (
            <>
              {users.map((user) => (
                <AdminCardWrapper
                  key={user.id}
                  onClick={() => handleUserEmailClick(user.email)}
                >
                  <AdminCardContentWrapper>
                    <EmailIconWrapper>
                      <EmailIcon style={{ fontSize: 24 }} />
                    </EmailIconWrapper>
                    <Typography
                      variant="h6"
                      component="h2"
                      style={{ textAlign: 'left' }}
                    >
                      {user.email}
                    </Typography>
                  </AdminCardContentWrapper>
                </AdminCardWrapper>
              ))}
            </>
          ) : (
            <>
              {samples.map((sample) => (
                <StyledCard key={sample.id}>
                  <CardContentWrapper>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        marginBottom: theme.spacing(1)
                      }}
                    >
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          marginRight: theme.spacing(1)
                        }}
                      >
                        {sample.status === 'Completo' ? (
                          <CheckCircleIcon
                            className="status-icon"
                            color="success"
                          />
                        ) : (
                          <AutorenewIcon
                            className="status-icon"
                            color="warning"
                          />
                        )}
                      </Box>
                      <Typography variant="h2">{sample.name}</Typography>
                    </Box>
                    <Typography
                      sx={{ marginBottom: theme.spacing(1.5) }}
                      color="inherit"
                    >
                      Criado em{' '}
                      {sample.createdAt && isValid(new Date(sample.createdAt)) && (
                        <Typography variant="body2" color="inherit">
                          Criado em{' '}
                          {format(new Date(sample.createdAt), 'd MMMM yyyy', {
                            locale: ptBR
                          })}
                        </Typography>
                      )}
                    </Typography>
                    <Typography variant="body2" color="inherit">
                      {sample.status}
                    </Typography>
                  </CardContentWrapper>
                  <CardActionsWrapper>
                    <Button
                      size="small"
                      onClick={() => handleDownloadClick(sample.downloadUrl)}
                    >
                      Download
                    </Button>
                    <Button size="small">Detalhes</Button>
                  </CardActionsWrapper>
                </StyledCard>
              ))}
              <Box
                sx={{
                  position: 'fixed',
                  bottom: '2rem',
                  right: '2rem'
                }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleRequestMoreSamples}
                >
                  Solicitar Nova Amostra
                </Button>
              </Box>
            </>
          )}
        </CardContainer>

        {selectedUserSamples.length > 0 && (
          <Box>
            <Typography variant="h6">
              Amostras do Usuário Selecionado:
            </Typography>
            {selectedUserSamples
              .filter((sample) => sample.status === 'Processando')
              .map((sample) => (
                <CardWrapper key={sample.id}>
                  <CardContent>
                    <Typography variant="body1">Nome: {sample.name}</Typography>
                    <Typography variant="body2">
                      Detalhes: {sample.details}
                    </Typography>
                    {/* Renderizar outros detalhes da amostra */}
                  </CardContent>
                  <AdminCardActionsWrapper>
                    <Button
                      variant="contained"
                      size="small"
                      component="label"
                      startIcon={<AttachFileIcon />}
                    >
                      {sample.selectedFile
                        ? sample.selectedFile.name
                        : 'Anexar Arquivo'}
                      <input
                        type="file"
                        style={{ display: 'none' }}
                        ref={fileInputRef}
                        onChange={(event) => {
                          const file = event.target.files?.[0] || null;
                          const updatedSamples = selectedUserSamples.map((s) =>
                            s.id === sample.id
                              ? { ...s, selectedFile: file }
                              : s
                          );
                          setSelectedUserSamples(updatedSamples);
                        }}
                      />
                    </Button>
                    <Button
                      variant="contained"
                      size="small"
                      onClick={() => handleSampleUpload(sample)}
                    >
                      Enviar Amostra
                    </Button>
                  </AdminCardActionsWrapper>
                </CardWrapper>
              ))}
          </Box>
        )}

        <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
          <DialogTitle>Solicitar mais amostras</DialogTitle>
          <DialogContent>
            <FormControl fullWidth margin="normal">
              <InputLabel>Tipo de Amostra</InputLabel>
              <Select
                defaultValue=""
                value={sampleType}
                onChange={(event) =>
                  setSampleType(event.target.value as string)
                }
              >
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
              value={sampleDetails}
              onChange={(event) => setSampleDetails(event.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDialog(false)}>Cancelar</Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSampleRequest}
            >
              Solicitar
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </ProtectedRoute>
  );
}

DashboardCrypto.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;

export default DashboardCrypto;
