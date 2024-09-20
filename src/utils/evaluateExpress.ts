export const evaluateExpression = (expression: string): number => {

  expression = expression.replace(/\s+/g, '');


  const handleMulDiv = (expr: string): string => {
    const tokens = [];
    let currentNum = '';

    for (let i = 0; i < expr.length; i++) {
      const ch = expr[i];
      if (ch === '*' || ch === '/') {
        if (currentNum) {
          tokens.push(parseFloat(currentNum));
          currentNum = '';
        }
        tokens.push(ch);
      } else if (ch === '+' || ch === '-') {
        if (currentNum) {
          tokens.push(parseFloat(currentNum));
          currentNum = '';
        }
        tokens.push(ch);
      } else {
        currentNum += ch;
      }
    }

    if (currentNum) tokens.push(parseFloat(currentNum));


    let i = 0;
    while (i < tokens.length) {
      if (tokens[i] === '*' || tokens[i] === '/') {
        const left = tokens[i - 1] as number;
        const right = tokens[i + 1] as number;
        const result = tokens[i] === '*' ? left * right : left / right;

        tokens.splice(i - 1, 3, result); 
        i--; 
      } else {
        i++;
      }
    }

    return tokens.join('');
  };


  const handleAddSub = (expr: string): number => {
    let result = 0;
    let currentNum = '';
    let operation = '+';

    for (let i = 0; i < expr.length; i++) {
      const ch = expr[i];
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
