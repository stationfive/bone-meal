import { FunctionComponent } from "react";

export type ContainerProps<PublicProps, ContainerProps = {}> = PublicProps & {
  View: FunctionComponent<PublicProps & ContainerProps>,
}
