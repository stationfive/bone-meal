import React, {
  useState,
  FC,
} from "react";
import useSelectorSafe from "store/selectors/useSelectorSafe";
import useAuthGuard from "utils/Hooks/useAuthGuard";
import { ExamplePageContainerProps } from "./ExamplePage.props";

const ExamplePageContainer: FC<ExamplePageContainerProps> = (
  { View, ...props }: ExamplePageContainerProps,
) => {
  useAuthGuard();

  const [toggle, setToggle] = useState(true);
  const uid = useSelectorSafe<string>(
    // @ts-ignore
    (state) => state.user.data.id,
    "",
  );

  return <View {...props} {...{ uid, toggle, setToggle }} />;
};

export default ExamplePageContainer;
