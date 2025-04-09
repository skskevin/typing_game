'use client';

import React, { useState, useEffect, useRef } from 'react';
import Keyboard from './Keyboard';
import { practiceTexts, Difficulty, PracticeType } from '../config/texts';

interface TypingGameProps {
  practiceType?: PracticeType;
  difficulty?: Difficulty;
}

interface TypingRecord {
  wpm: number;
  accuracy: number;
  date: string;
  practiceType: string;
  difficulty: string;
}

export const TypingGame: React.FC<TypingGameProps> = ({
  practiceType = 'typingPractice',
  difficulty = 'beginner',
}) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [startTime, setStartTime] = useState<number | null>(null);
  const [endTime, setEndTime] = useState<number | null>(null);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [history, setHistory] = useState<TypingRecord[]>([]);
  const [currentKey, setCurrentKey] = useState('');
  
  const texts = practiceTexts[practiceType][difficulty];
  const text = texts[currentTextIndex];
  
  const statsRef = useRef({
    lastWpm: 0,
    lastAccuracy: 100,
    lastInput: '',
    lastStartTime: null as number | null
  });

  // 从 localStorage 加载历史记录
  useEffect(() => {
    const savedHistory = localStorage.getItem('typingHistory');
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);

  useEffect(() => {
    // 只在用户输入改变时更新统计数据
    if (userInput === statsRef.current.lastInput) {
      return;
    }

    // 开始计时
    if (userInput.length === 1 && !startTime) {
      setStartTime(Date.now());
      return;
    }

    // 如果还没开始计时，不计算统计数据
    if (!startTime) {
      return;
    }

    // 更新统计数据
    const timeElapsed = ((endTime || Date.now()) - startTime) / 1000 / 60;
    const wordsTyped = userInput.trim().split(' ').length;
    const newWpm = Math.round(wordsTyped / timeElapsed);
    
    const correctChars = userInput.split('').filter((char, i) => char === text[i]).length;
    const newAccuracy = Math.round((correctChars / userInput.length) * 100) || 100;

    // 只在值发生变化时更新状态
    if (newWpm !== statsRef.current.lastWpm) {
      setWpm(newWpm);
      statsRef.current.lastWpm = newWpm;
    }
    
    if (newAccuracy !== statsRef.current.lastAccuracy) {
      setAccuracy(newAccuracy);
      statsRef.current.lastAccuracy = newAccuracy;
    }

    // 更新最后的输入记录
    statsRef.current.lastInput = userInput;

    // 如果完成当前文本，添加到历史记录
    if (userInput.length === text.length && !endTime) {
      setEndTime(Date.now());
      const newRecord: TypingRecord = {
        wpm: newWpm,
        accuracy: newAccuracy,
        date: new Date().toLocaleString(),
        practiceType: practiceType,
        difficulty: difficulty
      };
      
      const updatedHistory = [...history, newRecord];
      setHistory(updatedHistory);
      
      // 保存到 localStorage
      localStorage.setItem('typingHistory', JSON.stringify(updatedHistory));
    }
  }, [userInput, startTime, endTime, text, history, practiceType, difficulty]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    setCurrentKey(e.key);
  };

  const handleKeyUp = () => {
    setCurrentKey('');
  };

  const nextText = () => {
    setCurrentTextIndex((prev) => (prev + 1) % texts.length);
    setUserInput('');
    setStartTime(null);
    setEndTime(null);
    statsRef.current = {
      lastWpm: 0,
      lastAccuracy: 100,
      lastInput: '',
      lastStartTime: null
    };
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="bg-gray-100 p-4 rounded-lg">
        <p className="text-lg font-mono">
          {text.split('').map((char, i) => {
            const userChar = userInput[i];
            const color = !userChar
              ? 'text-gray-500'
              : userChar === char
              ? 'text-green-600'
              : 'text-red-600';
            return (
              <span key={i} className={color}>
                {char}
              </span>
            );
          })}
        </p>
      </div>
      
      <textarea
        className="w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        onKeyDown={handleKeyDown}
        onKeyUp={handleKeyUp}
        rows={3}
        placeholder="开始输入..."
      />
      
      <div className="flex justify-between text-lg mb-4">
        <div>
          <span className="font-bold">速度：</span>
          <span>{wpm} WPM</span>
        </div>
        <div>
          <span className="font-bold">准确率：</span>
          <span>{accuracy}%</span>
        </div>
        <button
          onClick={nextText}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          下一段
        </button>
      </div>

      <div className="flex justify-center">
        <Keyboard highlightKey={text[userInput.length]} pressedKey={currentKey} />
      </div>
    </div>
  );
};