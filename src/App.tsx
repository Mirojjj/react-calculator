import React from "react"
import DigitBtn from "./components/Digitbtn"
import Display from "./components/Display"
import OperationBtn from "./components/OperationBtn"

import { useCalculator } from "./hooks/useCalcultor"
const App:React.FC =() =>{
  const {calculate, clear,del} = useCalculator();
  return (

    <div className=" min-h-screen w-100% flex justify-center items-center">
      <div className="calculator h-[500px] w-[300px] border-2 rounded-lg p-2 block">
        {/* <div className="screen w-full h-[20%] border-2 rounded-lg">2</div> */}
        <Display/>
        <div className="buttons mt-2 h-[78%] w-full border rounded-lg grid grid-cols-4 gap-3 p-2">
        <div
              className="C border-2 p-3 flex items-center justify-center rounded-lg hover:bg-orange-500 hover:text-white transition-all cursor-pointer"
              onClick={() => clear()}
            >
              C
            </div>
            <OperationBtn operation={"/"} />
            <OperationBtn operation={"*"} />
            <div
              className="border-2 p-3 flex items-center justify-center rounded-lg hover:bg-orange-500 hover:text-white transition-all cursor-pointer"
              onClick={() =>del()}
            >
              DEL
            </div>
            <DigitBtn digit={"9"} />
            <DigitBtn digit={"8"} />
            <DigitBtn digit={"7"} />
            <OperationBtn operation={"-"} />
            <DigitBtn digit={"6"} />
            <DigitBtn digit={"5"} />
            <DigitBtn digit={"4"} />
            <OperationBtn operation={"+"} />
            <DigitBtn digit={"3"} />
            <DigitBtn digit={"2"} />
            <DigitBtn digit={"1"} />
            <DigitBtn digit={"0"} />
            <div
              className=" border-2 col-span-4 p-3 text-center flex items-center justify-center rounded-lg hover:bg-orange-500 hover:text-white transition-all cursor-pointer"
              onClick={() => calculate()}
            >
              =
            </div>      
        </div>
      </div>
    </div>

  )
}


export default App;