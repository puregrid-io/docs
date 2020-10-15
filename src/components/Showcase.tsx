import React from 'react';
import styled from '@emotion/styled';

import { GitHubLink } from './GitHubLink'

interface ShowcaseProps {
  children: React.ReactNode;
  fileName?: string;
}

const baseExamplePath = 'https://github.com/puregrid-io/puregrid/tree/master/examples'

export function Showcase({ children, fileName }: ShowcaseProps) {
  return (
    <Wrapper>
      {children}
      {fileName && <GitHubLink href={`${baseExamplePath}/${fileName}`} label="View code on GitHub" />}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  margin: 0.5em 0 2em;
`;

