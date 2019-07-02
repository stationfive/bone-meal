// import { FunctionComponent } from "react";
import { ContainerProps } from "utils/TypeUtils/ContainerProps";

export type RouterPublicProps = {
  components: {
    [k: string]: {
      component: any,
      path: string,
    },
  },
};
