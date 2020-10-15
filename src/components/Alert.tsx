import React from 'react';
import styled from '@emotion/styled';
import { BiErrorCircle } from 'react-icons/bi';
import {
  AiOutlineWarning,
  AiOutlineInfoCircle,
  AiOutlineCheckCircle,
} from 'react-icons/ai';

export enum AlertType {
  Error,
  Warning,
  Info,
  Success,
}

interface AlertProps {
  type?: AlertType;
  children: React.ReactNode;
}

const typeTextColor = {
  [AlertType.Error]: 'rgb(97, 26, 21)',
  [AlertType.Warning]: 'rgb(102, 60, 0)',
  [AlertType.Info]: 'rgb(13, 60, 97)',
  [AlertType.Success]: 'rgb(30, 70, 32)',
};

const typeBgColor = {
  [AlertType.Error]: 'rgb(253, 236, 234)',
  [AlertType.Warning]: 'rgb(255, 244, 229)',
  [AlertType.Info]: 'rgb(232, 244, 253)',
  [AlertType.Success]: 'rgb(237, 247, 237)',
};

const typeIconColor = {
  [AlertType.Error]: 'rgb(244 67 54)',
  [AlertType.Warning]: 'rgb(255 152 0)',
  [AlertType.Info]: 'rgb(33 150 243)',
  [AlertType.Success]: 'rgb(76 175 80)',
};

function getIcon(type: AlertType) {
  switch (type) {
    case AlertType.Error:
      return <BiErrorCircle size={28} color={typeIconColor[type]} />;
    case AlertType.Warning:
      return <AiOutlineWarning size={28} color={typeIconColor[type]} />;
    case AlertType.Info:
      return <AiOutlineInfoCircle size={28} color={typeIconColor[type]} />;
    case AlertType.Success:
      return <AiOutlineCheckCircle size={28} color={typeIconColor[type]} />;
  }
}

export function Alert({ type = AlertType.Warning, children }: AlertProps) {
  return (
    <Wrapper style={{ backgroundColor: typeBgColor[type] }}>
      <Icon>{getIcon(type)}</Icon>
      <Message style={{ color: typeTextColor[type] }}>{children}</Message>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 1em 1em;
  margin: 0.5em 0 1em;
`;

const Icon = styled.div`
  margin-right: 0.75em;
`;

const Message = styled.div``;
