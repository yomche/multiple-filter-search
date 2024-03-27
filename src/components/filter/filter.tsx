import { useApp } from "../../providers/appProvider";
import { Pagination } from "../../ui/pagination";
import Select2 from "../../ui/select2/select2";
import styles from "./filter.module.scss";

export const Filter = () => {
  const { getDefaultParamValue, handleSelectFilter } = useApp();

  return (
    <div className={styles.filter}>
      <div className={styles.title}>Filters By: </div>
      <div className={styles.filters}>
        <Select2
          selectName={"species"}
          selectValues={["Human", "Alien"]}
          handleSelectFilter={handleSelectFilter}
        />
        <Select2
          selectName={"status"}
          selectValues={["Alive", "Dead"]}
          handleSelectFilter={handleSelectFilter}
        />
      </div>
      <Pagination
        handleClick={handleSelectFilter}
        handleActive={getDefaultParamValue}
      />
    </div>
  );
};
