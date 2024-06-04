import React, { useEffect } from "react";
import "./BaseRadioButtons.scss";
import useBaseState from "../../Hooks/StateHooks/useBase";

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
  }, [selectedSize]);

  return (
    <div className="Base-Radio-Container">
      {bases.map((base) => (
        <label key={base.base} className="Base-Label">
          <input
            type="radio"
            name="base"
            value={base.base}
            onChange={() => {
              setSelectedBase(base.base);
              onBaseChange(base.base, base.price);
            }} // Pass both base and price
            checked={
              base.base === initialCheckedBase || base.base === selectedBase
            }
            className="BaseCustomRadio"
          />
          <span className="BaseName">
            {base.base} {base.price !== 0 && `£${base.price}`}
          </span>
        </label>
      ))}
    </div>
  );
};

export default BaseRadioButtons;
