import React from 'react';
import styled from '@emotion/styled';

export default function Logo(attrs) {
  return (
    <Wrapper>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        style={{ width: 30 }}
        {...attrs}
      >
        <circle cx="256" cy="256" fill="#606aea" r="256" />
        <path d="M511.84 265.123L319.703 72.985l6.507 131.924L201.724 80.423 107.761 387.73l123.046 123.046A259.27 259.27 0 00256 512c138.331 0 251.036-109.718 255.84-246.877z" fill="#4855b7" />
        <path d="M416.963 248.668c0 53.716-43.545 97.261-97.261 97.261s-97.261-43.545-97.261-97.261 97.261-175.683 97.261-175.683 97.261 121.968 97.261 175.683z" fill="#64e1dc" />
        <path d="M319.703 72.985l-.153 272.942.153.002c53.716 0 97.261-43.545 97.261-97.261-.001-53.715-97.261-175.683-97.261-175.683z" fill="#00c8c8" />
        <path d="M326.447 305.713c0 68.883-55.841 124.724-124.724 124.724S77 374.596 77 305.713s124.724-225.29 124.724-225.29 124.723 156.407 124.723 225.29z" fill="#edfafa" />
        <path d="M201.724 80.423l-.02 350.013h.02c68.883 0 124.724-55.841 124.724-124.724S201.724 80.423 201.724 80.423z" fill="#cbf7f7" />
      </svg>
      <Text>Puregrid</Text>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Text = styled.div`
  text-transform: uppercase;
  letter-spacing: 1.5px;
  margin-left: 10px;
  color: #555fdb;
`;
