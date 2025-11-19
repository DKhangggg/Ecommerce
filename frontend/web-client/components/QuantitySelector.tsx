"use client";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Minus, Plus } from "lucide-react";

interface QuantitySelectorProps {
  title?: string;
  initialQuantity?: number;
  min?: number;
  max?: number;
  onChange: (newQuantity: number) => void;
}
const QuantitySelector = ({
  title = "Số Lượng",
  initialQuantity = 1,
  min = 0,
  max,
  onChange,
}: QuantitySelectorProps) => {
  const [quantity, setQuantity] = useState(initialQuantity);

  useEffect(() => {
    onChange(quantity);
  }, [quantity, onChange]);

  const handleIncrement = () => {
    if (max === undefined || quantity < max) {
      setQuantity((prev) => prev + 1);
    }
  };

  const handleDecrement = () => {
    if (quantity > min) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = parseInt(e.target.value);
    if (isNaN(value) || value < min) {
      value = min;
    }
    if (max !== undefined && value > max) {
      value = max;
    }

    setQuantity(value);
  };

  return (
    <div className="flex items-center gap-4">
      <div className="text-base font-semibold text-gray-700">{title}</div>
      <div className="flex items-center space-x-0 w-fit border border-gray-300 rounded-lg overflow-hidden">
        <Button
          onClick={handleDecrement}
          disabled={quantity <= min}
          className="p-2 w-8 h-8 flex items-center justify-center text-xl text-gray-600 hover:bg-gray-100 transition-colors rounded-none border-r border-gray-300"
        >
          <Minus />
        </Button>
        <Input
          type={"number"}
          value={quantity}
          onChange={handleInputChange}
          min={min}
          max={max}
          className="w-12 text-center text-lg font-semibold border-none focus:outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
        ></Input>
        <Button
          onClick={handleIncrement}
          disabled={max !== undefined && quantity >= max}
          className="p-2 w-8 h-8 flex items-center justify-center text-xl text-gray-600 hover:bg-gray-100 transition-colors rounded-none border-l border-gray-300"
        >
          <Plus />
        </Button>
      </div>
    </div>
  );
};

export default QuantitySelector;
