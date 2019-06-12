import { FunctionComponent } from "react";

export type ContainerProps<PassedProps, ContainerProps = {}> = PassedProps & {
  View: FunctionComponent<PassedProps & ContainerProps>,
}
