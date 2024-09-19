import React from "react";
import { useCalculator } from "../hooks/useCalcultor";
interface DigitBtnProps{
    digit:string;
}


const DigitBtn: React.FC<DigitBtnProps> = ({ digit }) => {
    const {changeDigit} = useCalculator();
    return (
      <div
        className="border-2 p-3 flex items-center justify-center rounded-lg hover:bg-orange-500 hover:text-white transition-all cursor-pointer"
        onClick={()=> changeDigit(digit)}
      >
        {digit}
      </div>
    );
  };
  
  export default DigitBtn;