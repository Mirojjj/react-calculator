import React from 'react'
import { useCalculator } from '../hooks/useCalcultor'

const Display:React.FC = () => {
    const { currentOperand,  result} = useCalculator();

  return (
    <div className="screen w-full h-[20%] border-2 rounded-lg px-2 py-3">
        <div className=' text-gray-500'>
            {currentOperand}
        </div>
        <div>{result && "="} {result}</div>
    </div>
  )
}

export default Display