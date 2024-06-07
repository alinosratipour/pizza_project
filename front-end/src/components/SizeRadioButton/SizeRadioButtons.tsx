import React, { useState } from "react";
import { SizeWithPrice } from "../SharedTypes";
import "./SizeRadioButtons.scss";
import RadioButton from "../UI-Liberary/RadioButton/RadioButton";

interface SizeRadioButtonsProps {
  sizes: SizeWithPrice[];
  onSizeChange: (newSize: number, sizeName: string) => void;
  initialCheckedSize?: string | null | undefined;
}

const SizeRadioButtons: React.FC<SizeRadioButtonsProps> = ({
  sizes,
  onSizeChange,
  initialCheckedSize,
}) => {
  const [selectedSize, setSelectedSize] = useState<string | undefined>(
    initialCheckedSize || undefined
  );
  return (
    <div className="Size-Radio-Container">
      {sizes.map((sizeData) => (
        <RadioButton
          key={sizeData.id_size}
          id={sizeData.id_size.toString()}
          name="size"
          value={sizeData.id_size.toString()}
          checked={
            sizeData.p_size === initialCheckedSize ||
            sizeData.p_size === selectedSize
          }
          onChange={() => {
            setSelectedSize(sizeData.p_size);
            onSizeChange(sizeData.id_size, sizeData.p_size);
          }}
          label={sizeData.p_size}
        />
      ))}
    </div>
  );
};

export default SizeRadioButtons;
