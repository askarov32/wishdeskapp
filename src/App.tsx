import React, { useState } from 'react';
import './App.css'; // если Tailwind, можешь подключить index.css с @tailwind

interface Wish {
  id: number;
  text: string;
  forWhom: string;
  priority: string;
  comment: string;
  done: boolean;
}

function App() {
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [text, setText] = useState('');
  const [forWhom, setForWhom] = useState('вдвоем');
  const [priority, setPriority] = useState('обычное');
  const [comment, setComment] = useState('');

  const handleAdd = () => {
    if (!text.trim()) return;
    const newWish: Wish = {
      id: Date.now(),
      text,
      forWhom,
      priority,
      comment,
      done: false,
    };
    setWishes([newWish, ...wishes]);
    setText('');
    setComment('');
  };

  const toggleDone = (id: number) => {
    setWishes(
      wishes.map((wish) =>
        wish.id === id ? { ...wish, done: !wish.done } : wish
      )
    );
  };

  return (
    <div className="p-4 max-w-2xl mx-auto min-h-screen bg-pink-50">
      <h1 className="text-3xl font-bold mb-6 text-center text-pink-700">
        💖 Наша доска желаний
      </h1>

      <div className="grid gap-2 mb-6">
        <input
          className="border border-gray-300 p-2 rounded w-full"
          placeholder="Что ты хочешь сделать?"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <textarea
          className="border border-gray-300 p-2 rounded w-full"
          placeholder="Комментарий (по желанию)"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <div className="flex gap-2 flex-wrap">
          <select
            value={forWhom}
            onChange={(e) => setForWhom(e.target.value)}
            className="rounded px-2 py-1 border"
          >
            <option value="вдвоем">Вдвоем</option>
            <option value="для нее">Для неё</option>
            <option value="для него">Для него</option>
          </select>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="rounded px-2 py-1 border"
          >
            <option value="обычное">Обычное</option>
            <option value="важное">Важно</option>
            <option value="мечта">Мечта 💫</option>
          </select>
          <button
            onClick={handleAdd}
            className="bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700 transition"
          >
            Добавить
          </button>
        </div>
      </div>

      <div className="grid gap-4">
        {wishes.map((wish) => (
          <div
            key={wish.id}
            className={`transition-all p-4 border rounded duration-300 shadow-sm ${
              wish.done ? 'opacity-50 line-through' : ''
            } border-l-4 ${
              wish.priority === 'важное'
                ? 'border-yellow-500'
                : wish.priority === 'мечта'
                ? 'border-pink-500'
                : 'border-gray-300'
            }`}
          >
            <div className="flex justify-between items-start gap-4">
              <div>
                <div className="text-lg font-semibold text-gray-800">{wish.text}</div>
                <div className="text-sm text-gray-500">🎯 {wish.forWhom}</div>
                {wish.comment && (
                  <div className="text-sm italic text-gray-600 mt-1">💬 {wish.comment}</div>
                )}
              </div>
              <button
                onClick={() => toggleDone(wish.id)}
                className="text-sm text-pink-600 hover:text-pink-800"
              >
                {wish.done ? '↩️ Вернуть' : '✅ Готово'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
