import { FC } from "react";
import styles from "./pagination.module.scss";

interface PaginationProps {
  handleActive: (name: string, pageNum: string) => string;
  handleClick: (name: string, pageNum: string) => void;
}

export const Pagination: FC<PaginationProps> = ({
  handleActive,
  handleClick,
}) => {
  return (
    <div className={styles.pagination}>
      {["1", "2", "3"].map((pageNum) => {
        return (
          <div
            key={pageNum}
            onClick={() => {
              handleClick("page", pageNum);
            }}
            style={{
              background:
                pageNum === handleActive("page", "1") ? "#ccc" : "#fff",
            }}
            className={styles.item}
          >
            {pageNum}
          </div>
        );
      })}
    </div>
  );
};
