import React from "react";
import { useCalculator } from "../hooks/useCalcultor";
// import { choose_operation } from "../features/counter/counterSlice";

interface OperationBtnProps{
    operation: string;
}

const OperationBtn: React.FC<OperationBtnProps> = ({ operation }) => {
    const {chooseOperation} = useCalculator()
  return (
    <div
      className=" border-2 p-3 flex items-center justify-center rounded-lg hover:bg-orange-500 hover:text-white transition-all cursor-pointer"
      onClick={() => chooseOperation(operation)}
    >
      {operation}
    </div>
  );
};

export default OperationBtn;