import { FC, ReactNode } from 'react';
import PropTypes from 'prop-types';
import { Box, styled } from '@mui/material';
// sera que pega
const PageTitle = styled(Box)(
  ({ theme }) => `
        padding: ${theme.spacing(4)};
`
);

interface PageTitleWrapperProps {
  children?: ReactNode;
}

const PageTitleWrapper: FC<PageTitleWrapperProps> = ({ children }) => {
  return <PageTitle>{children}</PageTitle>;
};

PageTitleWrapper.propTypes = {
  children: PropTypes.node.isRequired
};

export default PageTitleWrapper;
