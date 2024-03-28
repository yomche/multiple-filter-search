import cn from "classnames";
import { useState, useRef } from "react";
import { useOnClickOutside } from "../../hooks/useClickOutside";
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
  const [showDropdown, setShowDropdown] = useState(false);
  const selectPlaceholder = placeholder || "Choose an option";
  const selectContainerRef = useRef(null);

  const showDropdownHandler = () => setShowDropdown(!showDropdown);

  const clickOutsideHandler = () => setShowDropdown(false);

  useOnClickOutside(selectContainerRef, clickOutsideHandler);

  const updateSelectedOption = (option: string) => {
    setSelectedOption(option);
    handleSelectFilter(selectName, option);
    setShowDropdown(false);
  };

  return (
    <div className={styles.container} ref={selectContainerRef}>
      <div
        className={cn(styles.text, showDropdown && styles.active)}
        onClick={showDropdownHandler}
      >
        {selectedOption.length > 0 ? selectedOption : selectPlaceholder}
      </div>
      <ul
        className={cn(styles.options, showDropdown ? styles.show : styles.hide)}
      >
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
