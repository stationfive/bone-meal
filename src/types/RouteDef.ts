import { FC, ReactNode } from 'react';

export interface RouteDef {
  component: string;
  path: string;
  middleware?: () => FC<{ children: ReactNode }>;
  meta?: {
    step?: number;
  };
  id?: string;
}
