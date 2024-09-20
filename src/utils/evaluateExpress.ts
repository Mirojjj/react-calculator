export const evaluateExpression = (expression: string): number => {
  // Remove any spaces in the expression
  expression = expression.replace(/\s+/g, '');

  // Helper function to handle multiplication and division
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

    // Process multiplication and division first
    let i = 0;
    while (i < tokens.length) {
      if (tokens[i] === '*' || tokens[i] === '/') {
        const left = tokens[i - 1] as number;
        const right = tokens[i + 1] as number;
        const result = tokens[i] === '*' ? left * right : left / right;

        tokens.splice(i - 1, 3, result); // Replace left, operator, and right with result
        i--; // Rewind to account for removed elements
      } else {
        i++;
      }
    }

    return tokens.join('');
  };

  // Helper function to handle addition and subtraction
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

  // First, handle multiplication and division
  const mulDivResult = handleMulDiv(expression);

  // Then, handle addition and subtraction
  return handleAddSub(mulDivResult);
};
