import { useApp } from "../../providers/appProvider";
import { Pagination } from "../../ui/pagination";
import { Select } from "../../ui/select";
import styles from "./filter.module.scss";

export const Filter = () => {
  const { getDefaultParamValue, handleSelectFilter } = useApp();

  return (
    <div className={styles.filter}>
      <div className={styles.title}>Filters By: </div>
      <div className={styles.filters}>
        <Select
          selectName={"species"}
          selectValues={["Human", "Alien"]}
          handleSelectFilter={handleSelectFilter}
          defaultValue={getDefaultParamValue("species", "")}
        />
        <Select
          selectName={"status"}
          selectValues={["Alive", "Dead"]}
          handleSelectFilter={handleSelectFilter}
          defaultValue={getDefaultParamValue("status", "")}
        />
      </div>
      <Pagination
        handleClick={handleSelectFilter}
        handleActive={getDefaultParamValue}
      />
    </div>
  );
};
