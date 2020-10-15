import React from 'react';
import styled from '@emotion/styled';

export default function Logo(props) {
  return (
    <Wrapper>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 89.534 89.533"
        style={{ width: 30 }}
      >
        <path
          d="M88.083 77.293h-7.84V12.241h7.84a1.377 1.377 0 100-2.754h-8.108v-8.11a1.378 1.378 0 00-2.754 0v8.109H12.312V1.377a1.378 1.378 0 00-2.754 0v8.109H1.45a1.377 1.377 0 100 2.754h8.109v65.053H1.45a1.378 1.378 0 000 2.754h8.109v8.109a1.377 1.377 0 102.754 0V80.17h64.909v7.986a1.377 1.377 0 102.754 0v-8.109h8.107a1.376 1.376 0 100-2.754zM77.335 33.292H56.223V12.241h21.112v21.051zm-22.03.98v21.052H34.19V34.272h21.115zm-22.033 0v21.052h-20.96V34.272h20.96zm0 21.97v21.113h-20.96V56.242h20.96zm.918 0h21.115v21.113H34.19V56.242zm22.033 0h21.112v21.113H56.223V56.242zm0-.918V34.272h21.112v21.052H56.223zm-.918-22.032H34.19V12.241h21.115v21.051zm-22.033 0h-20.96V12.241h20.96v21.051z"
          fill="currentColor"
        />
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
  color: #3f20ba;
`;
