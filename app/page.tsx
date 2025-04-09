'use client';

import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            欢迎来到打字练习
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            选择你想要的练习模式，开始提高打字技能
          </p>
        </div>

        <div className="mt-12 grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
          <Link href="/finger-practice" 
                className="relative group bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-gray-900">指法练习</h3>
              <p className="text-gray-600">
                通过基础的指法练习，熟悉键盘布局，培养正确的打字习惯。
                适合初学者和想要提高打字准确度的用户。
              </p>
              <span className="text-blue-500 group-hover:text-blue-600">
                开始练习 →
              </span>
            </div>
          </Link>

          <Link href="/typing-practice"
                className="relative group bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-gray-900">打字练习</h3>
              <p className="text-gray-600">
                通过实际的文本练习提高打字速度和准确率。
                包含多种难度级别，适合各个水平的用户。
              </p>
              <span className="text-blue-500 group-hover:text-blue-600">
                开始练习 →
              </span>
            </div>
          </Link>
        </div>
      </div>
    </main>
  );
}