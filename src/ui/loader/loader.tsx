import { FC } from "react";
import { Bars } from "react-loader-spinner";
import styles from "./loader.module.scss";

interface LoaderProps {
  isLoading: boolean;
  loaderColor?: string;
}

export const Loader: FC<LoaderProps> = ({
  isLoading,
  loaderColor = "#fff",
}) => {
  return (
    <div
      className={styles.loader}
      style={isLoading ? { height: "100px" } : { height: "" }}
    >
      <Bars height="80" width="80" color={loaderColor} visible={isLoading} />
    </div>
  );
};
