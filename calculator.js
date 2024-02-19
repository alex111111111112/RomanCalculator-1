function calculator(String) {
  // Определение словаря для конвертации римских цифр в арабские
  const romanNumerals = { 'I': 1, 'V': 5, 'X': 10, 'L': 50, 'C': 100 };

  // Регулярное выражение для проверки корректности римских чисел
  const romanPattern = /^(?=[MDCLXVI])M*(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/;

  // Функция для преобразования римских чисел в арабские
  function romanToArabic(roman) {
    let arabic = 0, previousValue = 0;
    roman.split('').reverse().forEach(char => {
      const value = romanNumerals[char];
      arabic += value < previousValue ? -value : value;
      previousValue = value;
    });
    return arabic;
  }

  // Функция для преобразования арабских чисел в римские
  function arabicToRoman(arabic) {
    let roman = '';
    const romanNumeralsPairs = [['C', 100], ['XC', 90], ['L', 50], ['XL', 40], ['X', 10], ['IX', 9], ['V', 5], ['IV', 4], ['I', 1]];
    romanNumeralsPairs.forEach(([romanDigit, value]) => {
      while (arabic >= value) {
        roman += romanDigit;
        arabic -= value;
      }
    });
    return roman;
  }

  // Парсинг входной строки и проверка на соответствие формату
  const match = String.toUpperCase().match(/^(\w+)\s*([+\-*/])\s*(\w+)$/);
  if (!match) throw new Error('Invalid input format');

  const [_, operand1, operator, operand2] = match;
  const operand1IsRoman = romanPattern.test(operand1);
  const operand2IsRoman = romanPattern.test(operand2);

  // Проверка на совпадение типов операндов (оба римские или оба арабские)
  if (operand1IsRoman !== operand2IsRoman) {
    throw new Error('Mismatched operand types');
  }

  // Конвертация операндов в числа
  let number1, number2;
  if (operand1IsRoman && operand2IsRoman) {
    number1 = romanToArabic(operand1);
    number2 = romanToArabic(operand2);
  } else if (!operand1IsRoman && !operand2IsRoman) {
    number1 = Number(operand1);
    number2 = Number(operand2);
  } else {
    throw new Error('Invalid operand types');
  }

  // Проверка на допустимость диапазона чисел
  if (number1 < 1 || number1 > 10 || number2 < 1 || number2 > 10) {
    throw new Error('Operands must be between 1 and 10');
  }

  // Вычисление результата в зависимости от оператора
  let result;
  switch (operator) {
    case '+': result = number1 + number2; break;
    case '-': result = number1 - number2; break;
    case '*': result = number1 * number2; break;
    case '/': 
      if (number2 === 0) throw new Error('Division by zero');
      result = Math.floor(number1 / number2); 
      break;
    default: throw new Error('Unsupported operator');
  }

  // Возврат результата в соответствующем формате (римский или арабский)
  return operand1IsRoman ? arabicToRoman(result) : result.toString();
}

module.exports = calculator; // Экспорт функции калькулятора для использования в других модулях
