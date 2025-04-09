'use client';

import { useState } from 'react';
import { TypingGame } from '../components/TypingGame';
import { Difficulty, difficultyLabels } from '../config/texts';

export default function TypingPractice() {
  const [difficulty, setDifficulty] = useState<Difficulty>('beginner');

  return (
    <div className="min-h-screen bg-white py-12">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">打字练习</h1>
        <p className="text-gray-600 mb-4">提高打字速度和准确率</p>
        
        <div className="flex justify-center gap-4 mb-8">
          {(Object.keys(difficultyLabels) as Difficulty[]).map((level) => (
            <button
              key={level}
              onClick={() => setDifficulty(level)}
              className={`px-4 py-2 rounded ${
                difficulty === level
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {difficultyLabels[level]}
            </button>
          ))}
        </div>
      </div>
      
      <TypingGame practiceType="typingPractice" difficulty={difficulty} />
    </div>
  )
}