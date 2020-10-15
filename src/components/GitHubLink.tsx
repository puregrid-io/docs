import React from 'react';
import styled from '@emotion/styled';
import {colors} from 'gatsby-theme-apollo-core';
import { VscGithub } from 'react-icons/vsc'

interface GitHubLinkProps {
  href: string;
  label: string;
}

export function GitHubLink({ href, label }: GitHubLinkProps) {
  return (
    <Wrapper href={href} target="_blank" rel="noopener">
      <GitHubIcon size={22} />
      {label}
    </Wrapper>
  );
}

const Wrapper = styled.a`
  display: inline-flex;
  align-items: center;
  margin-top: 1em;
  text-decoration: none;
  color: ${colors.text2};
  font-weight: bold;

  &:hover {
    opacity: 0.8;
  }
`;

const GitHubIcon = styled(VscGithub)`
  margin-right: 6px;
`;

