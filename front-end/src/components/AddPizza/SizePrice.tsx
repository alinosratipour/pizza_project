import { SizePriceProps } from "../SharedTypes"; // Import the shared type
import "./SizePrice.scss";
function SizePrice({ selectedSizePrice }: SizePriceProps) {
  return (
    <div>
      <p className="price">£{selectedSizePrice || 0}</p>
    </div>
  );
}

export default SizePrice;
