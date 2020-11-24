import React from 'react';
import styled from '@emotion/styled';
import { IconProceed } from '@apollo/space-kit/icons/IconProceed';
import { breakpoints } from 'gatsby-theme-apollo-core';
import { colors } from '@apollo/space-kit/colors';

const Container = styled.div({
  display: 'flex',
  flexShrink: 0,
  width: 240,
  [breakpoints.lg]: {
    width: 'auto',
    marginRight: 0,
  },
  [breakpoints.md]: {
    display: 'none',
  },
});

const StyledLink = styled.a({
  display: 'flex',
  alignItems: 'center',
  color: '#3e3ab8',
  lineHeight: 2,
  textDecoration: 'none',
  ':hover': {
    color: '#3b4af9',
  },
});

const StyledIcon = styled(IconProceed)({
  height: '0.75em',
  marginLeft: '0.5em',
});

export default function HeaderButton() {
  return (
    <Container>
      <StyledLink
        href="https://github.com/puregrid-io/puregrid/tree/master/examples"
        target="_blank"
        rel="noopener"
      >
        Browse example code
        <StyledIcon weight="thin" />
      </StyledLink>
    </Container>
  );
}
