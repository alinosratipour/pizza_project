import React, { useEffect } from "react";
import "./BaseRadioButtons.scss";
import useBaseState from "../Hooks/StateHooks/useBase";
import RadioButton from "../UI-Liberary/RadioButton/RadioButton";

interface BaseRadioButtonsProps {
  bases: { base: string; price: number }[];
  onBaseChange: (base: string, price: number) => void;
  selectedSize?: number;
  initialCheckedBase?: string | null | undefined;
}

const BaseRadioButtons: React.FC<BaseRadioButtonsProps> = ({
  bases,
  onBaseChange,
  initialCheckedBase,
  selectedSize,
}) => {
  const { selectedBase, setSelectedBase } = useBaseState();

  useEffect(() => {
    // Reset selectedBase when the selectedSize changes
    setSelectedBase(undefined);
  }, [selectedSize, setSelectedBase]);

  return (
    <div className="Base-Radio-Container">
      {bases.map((base) => (
        <RadioButton
          key={base.base}
          id={base.base}
          name="base"
          value={base.base}
          checked={
            base.base === initialCheckedBase || base.base === selectedBase
          }
          onChange={() => {
            setSelectedBase(base.base);
            onBaseChange(base.base, base.price);
          }}
          label={`${base.base} ${base.price !== 0 ? `£${base.price}` : ""}`}
        />
      ))}
    </div>
  );
};

export default BaseRadioButtons;
