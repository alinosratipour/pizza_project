import React from "react";
import "./RadioButtons.scss";

interface RadioButtonProps {
  id: string;
  name: string;
  value: string;
  checked: boolean;
  onChange: () => void;
  label: string;
}

const RadioButton: React.FC<RadioButtonProps> = ({ id, name, value, checked, onChange, label }) => {
  return (
    <label htmlFor={id} className="RadioButton-Label">
      <input
        type="radio"
        id={id}
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        className="CustomRadio"
      />
      <span className="RadioButton-Name">{label}</span>
    </label>
  );
};

export default RadioButton;
