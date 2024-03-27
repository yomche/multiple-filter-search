import { useState, useRef } from "react";
import { useOnClickOutside } from "../../hooks/useClickOutside";
import "./select2.css";

const Select: React.FC<{
  selectName: string;
  selectValues: string[];
  handleSelectFilter: (name: string, name2: string) => void;
  defaultValue?: string;
  placeholder?: string;
}> = ({
  defaultValue,
  placeholder,
  selectValues,
  handleSelectFilter,
  selectName,
}) => {
  const [selectedOption, setSelectedOption] = useState(defaultValue || "");
  const [showDropdown, setShowDropdown] = useState(false);
  const showDropdownHandler = () => setShowDropdown(!showDropdown);
  const selectPlaceholder = placeholder || "Choose an option";
  const selectContainerRef = useRef(null);

  const clickOutsideHandler = () => setShowDropdown(false);

  useOnClickOutside(selectContainerRef, clickOutsideHandler);

  const updateSelectedOption = (option: string) => {
    setSelectedOption(option);
    handleSelectFilter(selectName, option);
    setShowDropdown(false);
  };

  return (
    <div className="select-container" ref={selectContainerRef}>
      <div
        className={showDropdown ? "selected-text active" : "selected-text"}
        onClick={showDropdownHandler}
      >
        {selectedOption.length > 0 ? selectedOption : selectPlaceholder}
      </div>
      <ul
        className={
          showDropdown
            ? "select-options show-dropdown-options"
            : "select-options hide-dropdown-options"
        }
      >
        <li className="select-option" onClick={() => updateSelectedOption("")}>
          {"All"}
        </li>
        {selectValues.map((selectValue) => (
          <li
            className="select-option"
            onClick={() => updateSelectedOption(selectValue)}
          >
            {selectValue}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Select;
