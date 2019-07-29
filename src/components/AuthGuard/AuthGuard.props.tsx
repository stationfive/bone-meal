import { ReactNode } from 'react';
import { RouteDef } from 'types/RouteDef';

export interface AuthGuardOptions {
  allowAnon?: boolean;
  allowAuthed?: boolean;
  allowUserGroups?: string[];
  redirectAuthed?: RouteDef;
  redirectAnon?: RouteDef;
  redirectCustom?: (role: string) => RouteDef;
}

export type AuthGuardPublicProps = {
  children: ReactNode;
} & AuthGuardOptions;
