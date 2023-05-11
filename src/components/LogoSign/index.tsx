import {
  Tooltip,
  TooltipProps,
  tooltipClasses,
  styled,
  Typography
} from '@mui/material';

const TooltipWrapper = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.colors.alpha.trueWhite[100],
    color: theme.palette.getContrastText(theme.colors.alpha.trueWhite[100]),
    fontSize: theme.typography.pxToRem(12),
    fontWeight: 'bold',
    borderRadius: theme.general.borderRadiusSm,
    boxShadow:
      '0 .2rem .8rem rgba(7,9,25,.18), 0 .08rem .15rem rgba(7,9,25,.15)'
  },
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.colors.alpha.trueWhite[100]
  }
}));

function Logo() {
  return (
    <TooltipWrapper
      title="Tokyo Free White Next.js Typescript Admin Dashboard"
      arrow
    >
      <Typography
        variant="h1"
        color="text.third"
        fontWeight="normal"
        sx={{ mb: 4 }}
      >
        VMC
      </Typography>
    </TooltipWrapper>
  );
}

export default Logo;
