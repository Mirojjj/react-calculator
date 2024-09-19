export const evaluateExpression = (expression: string): number => {
    expression = expression.replace(/\s+/g, '');
  
    const handleMulDiv = (expr: string): string => {
      let result = '';
      let i = 0;
      while (i < expr.length) {
        let ch = expr[i];
        if (ch === '*' || ch === '/') {
          let left = parseFloat(result);
          let right = '';
          i++;
          while (i < expr.length && !['+', '-', '*', '/'].includes(expr[i])) {
            right += expr[i];
            i++;
          }
          let op = ch;
          let res = op === '*' ? left * parseFloat(right) : left / parseFloat(right);
          result = res.toString();
        } else {
          result += ch;
          i++;
        }
      }
      return result;
    };
  
    const handleAddSub = (expr: string): number => {
      let result = 0;
      let currentNum = '';
      let operation = '+';
      for (let i = 0; i < expr.length; i++) {
        let ch = expr[i];
        if (ch === '+' || ch === '-') {
          if (currentNum) {
            result += operation === '+' ? parseFloat(currentNum) : -parseFloat(currentNum);
          }
          currentNum = '';
          operation = ch;
        } else {
          currentNum += ch;
        }
      }
      if (currentNum) {
        result += operation === '+' ? parseFloat(currentNum) : -parseFloat(currentNum);
      }
      return result;
    };
  

    const mulDivResult = handleMulDiv(expression);
    return handleAddSub(mulDivResult);
  };
  