
import React, {createContext, useEffect, useState} from 'react'
import { evaluateExpression } from '../utils/evaluateExpress';

interface CalculatorContextProps{
    currentOperand: string;
    previousOperand: string;
    result: string;
    operation: string | null;
    changeDigit: (digit: string) => void;
    chooseOperation: (operation: string) => void;
    del:()=>void;
    clear: () => void;
    calculate: () => void;
}


export const CalculatorContext = createContext<CalculatorContextProps| undefined>(undefined);




export const CalculatorProvider= ({children}: {children: React.ReactNode}) => {

    const [currentOperand, setCurrentOperand] = useState<string>("");
    const [previousOperand, setPreviousOperand] = useState<string>("");
    const [operation, setOperation] = useState<string|null>(null); 
    const [result, setResult] = useState<string>("");
    const[operationAf, setOperationAf] = useState<boolean>(false);
    const [resultBtn, setResultBtn] = useState<boolean>(false)


    useEffect(() => {
        if (resultBtn && operationAf) {
            console.log(operation)
            setCurrentOperand(result + (operation || ""));
            setResult(""); 
            setResultBtn(false); 
            setOperationAf(false)
        }
    }, [ resultBtn, operationAf, operation]);


    const changeDigit = (digit: string) =>{
        setCurrentOperand(currentOperand+digit)
    }  
    const chooseOperation = (operation: string) => {
        if(resultBtn){
            setOperationAf(true);
        }

        if (currentOperand === "" && operation !== "-") return; 
        const lastChar = currentOperand.slice(-1);
        const isLastCharOperator = /[\+\-\*\/]/.test(lastChar);
        if (isLastCharOperator) {
          setCurrentOperand(currentOperand.slice(0, -1) + operation);
        } else {
          setCurrentOperand(currentOperand + operation);
        }
        setOperation(operation)
      };

    const del = () => {
        console.log("del pressed");
        if (currentOperand !== "") {
            setCurrentOperand(currentOperand.slice(0, -1));
        }
    };
    const clear = () =>{
        setCurrentOperand("");
        setPreviousOperand("");
        setResult("")
        setOperation(null); 
        setOperationAf(false)
        setResultBtn(false)
    }

    const calculate =()=>{
        try {
            const evalResult = evaluateExpression(currentOperand);
            // setCurrentOperand(evalResult.toString());
            setResult(evalResult.toString())
            setResultBtn(true);

          } catch (error) {
            console.error("Error evaluating expression:", error);
          }
    }

  return (
    <CalculatorContext.Provider value={{currentOperand, previousOperand,result,operation,chooseOperation, changeDigit,clear, calculate, del}}>
        {children}
    </CalculatorContext.Provider>
  )
}