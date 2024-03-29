import { Typography, Grid } from '@mui/material';

function PageHeader() {
  return (
    <Grid container alignItems="center">
      <Grid item></Grid>
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          Bem - Vindo!
        </Typography>
        <Typography variant="subtitle2">Amostras</Typography>
      </Grid>
    </Grid>
  );
}

export default PageHeader;
