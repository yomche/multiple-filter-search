import cn from "classnames";
import { useState, useRef } from "react";
import { useDetectClick } from "../../hooks/useDetectClick";
import styles from "./select.module.scss";

interface SelectProps {
  selectName: string;
  selectValues: string[];
  handleSelectFilter: (name: string, name2: string) => void;
  defaultValue?: string;
  placeholder?: string;
}

export const Select: React.FC<SelectProps> = ({
  defaultValue,
  placeholder,
  selectValues,
  handleSelectFilter,
  selectName,
}) => {
  const [selectedOption, setSelectedOption] = useState(defaultValue || "");
  const selectPlaceholder = placeholder || "Choose an option";
  const selectContainerRef = useRef(null);
  const { isActive, setActive } = useDetectClick(selectContainerRef);

  const showDropdownHandler = () => setActive(!isActive);

  const updateSelectedOption = (option: string) => {
    setSelectedOption(option);
    handleSelectFilter(selectName, option);
    setActive(false);
  };

  return (
    <div className={styles.container} ref={selectContainerRef}>
      <div
        className={cn(styles.text, isActive && styles.active)}
        onClick={showDropdownHandler}
      >
        {selectedOption.length > 0 ? selectedOption : selectPlaceholder}
      </div>
      <ul className={cn(styles.options, isActive ? styles.show : styles.hide)}>
        <li onClick={() => updateSelectedOption("")}>{"All"}</li>
        {selectValues.map((selectValue, idx) => (
          <li key={idx} onClick={() => updateSelectedOption(selectValue)}>
            {selectValue}
          </li>
        ))}
      </ul>
    </div>
  );
};
