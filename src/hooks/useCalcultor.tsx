import { useContext } from "react";
import { CalculatorContext } from "../context/CalculatorContext";

export const useCalculator = () =>{
    const context = useContext(CalculatorContext);
    if(!context){
          throw new Error("useCalculator must be used within a CalculatorProvider");
    }
    return context;
}
