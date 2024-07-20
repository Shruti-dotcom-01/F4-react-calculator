import './App.css';
import React, { useState } from 'react';

function App() {
  const [num1, setNum1] = useState('');
  const [num2, setNum2] = useState('');
  const [operation, setOperation] = useState('');
  const [result, setResult] = useState('');
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'num1') {
      setNum1(value);
    } else if (name === 'num2') {
      setNum2(value);
    }
  };

  const validateInput = () => {
    setError('');
    if (num1 === '' || num2 === '') {
      setError('Error! Num1 Cannot Be Empty');
      return false;
    }
    if (!/^-?\d*\.?\d+$/.test(num1) || !/^-?\d*\.?\d+$/.test(num2)) {
      setError('Please enter valid numbers.');
      return false;
    }
    return true;
  };

  const performCalculation = () => {
    if (num1 !== '' && num2 !== '' && operation !== '') {
      const num1Float = parseFloat(num1);
      const num2Float = parseFloat(num2);

      switch (operation) {
        case '+':
          setResult(num1Float + num2Float);
          break;
        case '-':
          setResult(num1Float - num2Float);
          break;
        case '*':
          setResult(num1Float * num2Float);
          break;
        
        case '/':
          if (num2Float === 0) {
            setError('Division by zero is not allowed.');
          } else {
            setResult(num1Float / num2Float);
          }
          break;
        default:
          setError('Invalid operation.');
          break;
      }
    }
  };

  const handleOperatorClick = (operator) => {
    setOperation(operator);
    performCalculation();
    validateInput() // Automatically perform the calculation
  };

  return (
    <div className="calculator">
      <h2>React Calculator</h2>
      <input
        type="text"
        name="num1"
        value={num1}
        onChange={handleInputChange}
        placeholder="Num 1"
      />
      <input
        type="text"
        name="num2"
        value={num2}
        onChange={handleInputChange}
        placeholder="Num 2"
      />
      <div className="buttons">
        <button onClick={() => handleOperatorClick('+')}>+</button>
        <button onClick={() => handleOperatorClick('-')}>-</button>
        <button onClick={() => handleOperatorClick('*')}>*</button>
        <button onClick={() => handleOperatorClick('/')}>/</button>
      </div>
      {error && <div className="error">{error}</div>}
      {result && <div className="success"> Success! </div>}
      {result && <div className="result">Result - {result}</div>}
    </div>
  );
}

export default App;
