import React, {
    ForwardRefRenderFunction,
    InputHTMLAttributes,
    forwardRef,
  } from "react";
  import classNames from "classnames";
  import "./TextField.scss";
  
  interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    name?: string;
    label?: string; // Make label optional
    placeholder?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error?: string;
    inputSize?: "small" | "medium" | "large"; // Rename the size prop
    inputBackgroundColor?: "blue" | "green" | "yellow" | "orange" | "gray"; // Define the color options
    icon?: React.ReactNode; // Add the icon prop
    placeholderIcon?: React.ReactNode; // Add the placeholderIcon prop
    type?: "text" | "password" | "email"; // Add the type prop
    borderWidth?: "1px" | "2px"; // New prop for border width
  }
  
  const Input: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
    {
      name,
      placeholder,
      label,
      onChange,
      error,
      inputSize,
      inputBackgroundColor,
      icon,
      placeholderIcon,
      type,
      borderWidth = "1px", // Default to 1px if not provided
      ...otherProps
    },
    ref
  ) => {
    const id = `text-${Math.random().toString(36).substring(7)}`;
    const inputPlaceholder = error ? error : placeholder;
    const inputClassName = classNames("input", {
      "input-border-error": error,
      [`input-${inputSize}`]: inputSize,
      [`input-color-${inputBackgroundColor}`]: inputBackgroundColor,
      "text-error":error,
      [`input-border-width-${borderWidth}`]: borderWidth,
    });
  
  
    return (
      <div className="text-field">
        {label && (
          <label htmlFor={id} className="label">
            {label}
          </label>
        )}
        <div className="input-container">
          {icon && <span className="input-icon">{icon}</span>}
          <input
            {...otherProps}
            type={type || "text"}
            id={id}
            name={name}
            placeholder={inputPlaceholder}
            ref={ref}
            onChange={onChange}
            className={inputClassName}
            autoComplete="on"
            style={{ borderWidth }} 
          />
          {placeholderIcon && (
            <span className="placeholder-icon">{placeholderIcon}</span>
          )}
        </div>
        
      </div>
    );
  };
  
  const TextField = forwardRef(Input);
  
  export default TextField;
  