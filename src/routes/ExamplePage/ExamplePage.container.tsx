import React, {
  useState,
  FunctionComponent,
  ReactElement,
} from "react";
import { fallback } from "utils/DataUtils";

import { useDispatch, useSelector }  from "react-redux";

import { ContainerProps} from "utils/TypeUtils/ContainerProps";
import { ExamplePageProps, ExamplePageGeneratedProps, ExamplePagePassedProps} from "./ExamplePage.props";
import {Store} from "../../types/Store/Store";

type Props = ContainerProps<ExamplePagePassedProps, ExamplePageGeneratedProps>;

const ExamplePageContainer: FunctionComponent<Props> = ({ View, ...props }: Props) => {
  const [toggle, setToggle] = useState(true);
  const uid = useSelector(fallback<Store, string>(
      // @ts-ignore
      (_) => _.location.query.uid,
      '',
    ));

    return View({ ...props, uid, toggle, setToggle });
  };

export default ExamplePageContainer;
