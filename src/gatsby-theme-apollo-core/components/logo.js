import React from 'react';
import styled from '@emotion/styled';

export default function Logo(attrs) {
  return (
    <Wrapper>
      <svg viewBox="0 0 512 512" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" style={{ width: 30 }} {...attrs}>
        <title>Puregrid Logo</title>
        <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <g fillRule="nonzero">
            <circle id="Oval" fill="#606aea" cx="256" cy="256" r="256"></circle>
            <path d="M511.84,265.123 L319.703,72.985 L326.21,204.909 L201.724,80.423 L107.761,387.73 L230.807,510.776 C239.095,511.585 247.499,512 256,512 C394.331,512 507.036,402.282 511.84,265.123 L511.84,265.123 Z" fill="#4855b7"></path>
            <path d="M416.963,248.668 C416.963,302.384 373.418,345.929 319.702,345.929 C265.986,345.929 222.441,302.384 222.441,248.668 C222.441,194.952 319.702,72.985 319.702,72.985 C319.702,72.985 416.963,194.953 416.963,248.668 L416.963,248.668 Z" fill="#64E1DC"></path>
            <path d="M319.703,72.985 L319.55,345.929 C319.601,345.929 319.652,345.929 319.703,345.929 C373.419,345.929 416.964,302.384 416.964,248.668 C416.963,194.953 319.703,72.985 319.703,72.985 Z" fill="#00C8C8"></path>
            <path d="M326.447,305.713 C326.447,374.596 270.606,430.437 201.723,430.437 C132.84,430.437 77,374.596 77,305.713 C77,236.83 201.724,80.423 201.724,80.423 C201.724,80.423 326.447,236.83 326.447,305.713 Z" fill="#EDFAFA"></path>
            <path d="M201.724,80.423 L201.704,430.436 L201.724,430.436 C270.607,430.436 326.448,374.595 326.448,305.712 C326.448,236.829 201.724,80.423 201.724,80.423 Z" fill="#CBF7F7"></path>
          </g>
        </g>
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
