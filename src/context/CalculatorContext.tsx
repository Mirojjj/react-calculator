import React, {createContext, useState} from 'react'

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

    const changeDigit = (digit: string) =>{
            if(currentOperand === "0" && digit === "0") return;
            setCurrentOperand(currentOperand+digit)
    }  

    const chooseOperation = (operation: string) =>{
        if(currentOperand === "") return;
        if(previousOperand !== ""){
            calculate();
        }
        setOperation(operation);
        setPreviousOperand(currentOperand);
        setCurrentOperand("");
    }

    const del = () => {
        console.log("del pressed");
    
        if (currentOperand !== "") {
            setCurrentOperand(currentOperand.slice(0, -1));
        } else if (operation !== null && previousOperand !== "") {
            setOperation(null); 
            setCurrentOperand(previousOperand); 
            setPreviousOperand(""); 
        } else if (previousOperand !== "") {
            setPreviousOperand(previousOperand.slice(0, -1));
        }
    };
    const clear = () =>{
        setCurrentOperand("");
        setPreviousOperand("");
        setResult("")
        setOperation(null); 
    }

    const calculate =()=>{
        if (previousOperand === "" || currentOperand === "" || !operation) return;
        const prev = parseInt(previousOperand);
        const current = parseInt(currentOperand);
        
        let result = 0;
        switch(operation){
            case "+":
                result = prev + current;
                setResult(result.toString());
                break;
              case "-":
                result = prev - current;
                setResult(result.toString());
                break;
              case "*":
                result = prev * current;
                setResult(result.toString());
                break;
              case "/":
                result = prev / current;
                setResult(result.toString());
                break;
              default:
                return;
        }
    }

  return (
    <CalculatorContext.Provider value={{currentOperand, previousOperand,result,operation,chooseOperation, changeDigit,clear, calculate, del}}>
        {children}
    </CalculatorContext.Provider>
  )
}
