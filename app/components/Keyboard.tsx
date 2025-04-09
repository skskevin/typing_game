'use client';

import React from 'react';

interface KeyboardProps {
  highlightKey?: string;
  pressedKey?: string;
}

const Keyboard: React.FC<KeyboardProps> = ({ highlightKey, pressedKey }) => {
  const keyboardLayout = [
    [
      { key: '`', id: '`' },
      { key: '1', id: '1' },
      { key: '2', id: '2' },
      { key: '3', id: '3' },
      { key: '4', id: '4' },
      { key: '5', id: '5' },
      { key: '6', id: '6' },
      { key: '7', id: '7' },
      { key: '8', id: '8' },
      { key: '9', id: '9' },
      { key: '0', id: '0' },
      { key: '-', id: '-' },
      { key: '=', id: '=' },
      { key: 'Backspace', id: 'Backspace' },
    ],
    [
      { key: 'Tab', id: 'Tab' },
      { key: 'Q', id: 'Q' },
      { key: 'W', id: 'W' },
      { key: 'E', id: 'E' },
      { key: 'R', id: 'R' },
      { key: 'T', id: 'T' },
      { key: 'Y', id: 'Y' },
      { key: 'U', id: 'U' },
      { key: 'I', id: 'I' },
      { key: 'O', id: 'O' },
      { key: 'P', id: 'P' },
      { key: '[', id: '[' },
      { key: ']', id: ']' },
      { key: '\\', id: '\\' },
    ],
    [
      { key: 'Caps', id: 'Caps' },
      { key: 'A', id: 'A' },
      { key: 'S', id: 'S' },
      { key: 'D', id: 'D' },
      { key: 'F', id: 'F' },
      { key: 'G', id: 'G' },
      { key: 'H', id: 'H' },
      { key: 'J', id: 'J' },
      { key: 'K', id: 'K' },
      { key: 'L', id: 'L' },
      { key: ';', id: ';' },
      { key: '\'', id: '\'' },
      { key: 'Enter', id: 'Enter' },
    ],
    [
      { key: 'Shift', id: 'Shift_left' },
      { key: 'Z', id: 'Z' },
      { key: 'X', id: 'X' },
      { key: 'C', id: 'C' },
      { key: 'V', id: 'V' },
      { key: 'B', id: 'B' },
      { key: 'N', id: 'N' },
      { key: 'M', id: 'M' },
      { key: ',', id: ',' },
      { key: '.', id: '.' },
      { key: '/', id: '/' },
      { key: 'Shift', id: 'Shift_right' },
    ],
    [
      { key: 'Ctrl', id: 'Ctrl_left' },
      { key: 'Win', id: 'Win_left' },
      { key: 'Alt', id: 'Alt_left' },
      { key: 'Space', id: 'Space' },
      { key: 'Alt', id: 'Alt_right' },
      { key: 'Fn', id: 'Fn' },
      { key: 'Ctrl', id: 'Ctrl_right' },
    ],
  ];

  const getKeyClass = (key: string) => {
    let baseClass = "border rounded-lg p-2 m-0.5 min-w-[40px] text-center ";
    
    if (key === 'Space') {
      baseClass += "w-[300px] ";
    } else if (['Backspace', 'Tab', 'Caps', 'Shift', 'Enter'].includes(key)) {
      baseClass += "w-[70px] ";
    }

    if (key.toLowerCase() === highlightKey?.toLowerCase()) {
      baseClass += "bg-yellow-200 ";
    }
    
    if (key.toLowerCase() === pressedKey?.toLowerCase()) {
      baseClass += "bg-green-200 ";
    }

    return baseClass + "bg-white shadow-sm hover:shadow-md transition-shadow";
  };

  return (
    <div className="inline-block bg-gray-100 p-4 rounded-xl">
      {keyboardLayout.map((row, rowIndex) => (
        <div key={`row-${rowIndex}`} className="flex justify-center">
          {row.map((keyObj) => (
            <div key={keyObj.id} className={getKeyClass(keyObj.key)}>
              {keyObj.key}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Keyboard;