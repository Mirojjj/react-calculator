export const evaluateExpression = (expression: string, precision = 10): number => {
  expression = expression.replace(/\s+/g, '');

  // Helper function to round a number to a specified precision
  const roundToPrecision = (num: number): number => {
    const factor = Math.pow(10, precision);
    return Math.round(num * factor) / factor;
  };

  // Helper function to check for multiple decimal points in the same number
  const checkInvalidDecimals = (expr: string): void => {
    const tokens = expr.split(/[\+\-\*\/]/); // Split by operators
    for (const token of tokens) {
      if (token.split('.').length > 2) {
        throw ("Syntax Error");
      }
    }
  };

  // Call the function to check for multiple decimal points
  checkInvalidDecimals(expression);

  // Handle multiplication and division first
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

    // Process multiplication and division with precision
    let i = 0;
    while (i < tokens.length) {
      if (tokens[i] === '*' || tokens[i] === '/') {
        const left = tokens[i - 1] as number;
        const right = tokens[i + 1] as number;
        const result = tokens[i] === '*' ? left * right : left / right;

        // Round the result to the specified precision
        tokens.splice(i - 1, 3, roundToPrecision(result));
        i--; // Adjust index after splice
      } else {
        i++;
      }
    }

    return tokens.join('');
  };

  // Handle addition and subtraction after multiplication/division
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

    // Round the final result to avoid floating-point issues
    return roundToPrecision(result);
  };

  // First handle multiplication and division, then addition and subtraction
  const mulDivResult = handleMulDiv(expression);

  // Return the final result after handling addition and subtraction
  return handleAddSub(mulDivResult);
};
