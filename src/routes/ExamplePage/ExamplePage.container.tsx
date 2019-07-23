import React, {
  useState,
  FC,
} from "react";
import useSelectorSafe from "store/selectors/useSelectorSafe";
import useAuthGuard from "utils/Hooks/useAuthGuard";
import { ExamplePagePublicProps, ExamplePageProps } from "./ExamplePage.props";
import ExamplePageView from "./ExamplePage.view";

const ExamplePageContainer: FC<ExamplePagePublicProps> = (
  props: ExamplePagePublicProps,
) => {
  useAuthGuard();

  const [toggle, setToggle] = useState(true);
  const uid = useSelectorSafe<string>(
    // @ts-ignore
    (state) => state.user.data.id,
    "",
  );

  return <ExamplePageView {...props} {...{ uid, toggle, setToggle }} />;
};

export default ExamplePageContainer;
