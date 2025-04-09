'use client';

import { useState, useEffect } from 'react';

interface TypingRecord {
  wpm: number;
  accuracy: number;
  date: string;
  practiceType: string;
  difficulty: string;
}

export default function History() {
  const [records, setRecords] = useState<TypingRecord[]>([]);
  const [filter, setFilter] = useState('all'); // 'all', 'finger', 'typing'

  useEffect(() => {
    // 从 localStorage 获取历史记录
    const savedRecords = localStorage.getItem('typingHistory');
    if (savedRecords) {
      setRecords(JSON.parse(savedRecords));
    }
  }, []);

  const filteredRecords = records.filter(record => {
    if (filter === 'all') return true;
    return record.practiceType === filter;
  });

  const getAverageStats = () => {
    if (filteredRecords.length === 0) return { avgWpm: 0, avgAccuracy: 0 };
    
    const total = filteredRecords.reduce((acc, record) => ({
      wpm: acc.wpm + record.wpm,
      accuracy: acc.accuracy + record.accuracy
    }), { wpm: 0, accuracy: 0 });

    return {
      avgWpm: Math.round(total.wpm / filteredRecords.length),
      avgAccuracy: Math.round(total.accuracy / filteredRecords.length)
    };
  };

  const { avgWpm, avgAccuracy } = getAverageStats();

  return (
    <div className="min-h-screen bg-white py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">练习历史</h1>

        {/* 统计概览 */}
        <div className="bg-blue-50 p-6 rounded-lg mb-8">
          <h2 className="text-xl font-semibold mb-4">总体统计</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-lg shadow">
              <div className="text-gray-600">总练习次数</div>
              <div className="text-2xl font-bold">{filteredRecords.length}</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <div className="text-gray-600">平均速度</div>
              <div className="text-2xl font-bold">{avgWpm} WPM</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <div className="text-gray-600">平均准确率</div>
              <div className="text-2xl font-bold">{avgAccuracy}%</div>
            </div>
          </div>
        </div>

        {/* 筛选器 */}
        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded ${
              filter === 'all'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            全部记录
          </button>
          <button
            onClick={() => setFilter('finger')}
            className={`px-4 py-2 rounded ${
              filter === 'finger'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            指法练习
          </button>
          <button
            onClick={() => setFilter('typing')}
            className={`px-4 py-2 rounded ${
              filter === 'typing'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            打字练习
          </button>
        </div>

        {/* 历史记录列表 */}
        <div className="space-y-4">
          {filteredRecords.length === 0 ? (
            <div className="text-center text-gray-500 py-8">
              暂无练习记录
            </div>
          ) : (
            filteredRecords.map((record, index) => (
              <div
                key={index}
                className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-center">
                  <div className="space-y-1">
                    <div className="text-sm text-gray-500">{record.date}</div>
                    <div className="font-medium">
                      {record.practiceType === 'finger' ? '指法练习' : '打字练习'} - {record.difficulty}
                    </div>
                  </div>
                  <div className="flex gap-6">
                    <div>
                      <span className="text-gray-600">速度：</span>
                      <span className="font-bold">{record.wpm} WPM</span>
                    </div>
                    <div>
                      <span className="text-gray-600">准确率：</span>
                      <span className="font-bold">{record.accuracy}%</span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}