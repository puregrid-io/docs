import React from 'react';
import { BiMedal } from 'react-icons/bi';
import { FaMedal } from 'react-icons/fa';
import { RiMedal2Line } from 'react-icons/ri';

import { HeaderRenderers } from '@puregrid/core';

export interface Winner {
  id: string;
  athlete: string;
  age: number;
  country: string;
  year: number;
  date: string;
  sport: string;
  gold: number;
  silver: number;
  bronze: number;
  total: number;
}

export const headerRenderers: HeaderRenderers<Winner> = {
  Gold: () => <FaMedal />,
  Silver: () => <BiMedal />,
  Bronze: () => <RiMedal2Line />,
};
