import React, { useEffect, useState } from 'react';
import './App.css';

interface Wish {
  id: number;
  text: string;
  forWhom: string;
  priority: string;
  comment: string;
  done: boolean;
}

type Theme = 'light' | 'dark';

function App() {
  const [wishes, setWishes] = useState<Wish[]>(() => {
    const saved = localStorage.getItem('wishes');
    return saved ? JSON.parse(saved) : [];
  });

  const [text, setText] = useState('');
  const [forWhom, setForWhom] = useState('вдвоем');
  const [priority, setPriority] = useState('обычное');
  const [comment, setComment] = useState('');
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem('theme') as Theme) || 'light'
  );

  useEffect(() => {
    localStorage.setItem('wishes', JSON.stringify(wishes));
  }, [wishes]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

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

  const clearAll = () => {
    if (window.confirm('Удалить все желания?')) {
      setWishes([]);
      localStorage.removeItem('wishes');
    }
  };

  return (
    <div className="container">
      <h1 className="title">💖 Наша доска желаний</h1>

      {/* Переключатель темы */}
      <div className="toolbar">
        <label className="toolbar-item">
          Тема:
          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value as Theme)}
          >
            <option value="light">Светлая</option>
            <option value="dark">Тёмная</option>
          </select>
        </label>
      </div>

      {/* Форма */}
      <div className="form">
        <input
          placeholder="Что ты хочешь сделать?"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <textarea
          placeholder="Комментарий (по желанию)"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <div className="form-row">
          <select value={forWhom} onChange={(e) => setForWhom(e.target.value)}>
            <option value="вдвоем">Вдвоем</option>
            <option value="для нее">Для неё</option>
            <option value="для него">Для него</option>
          </select>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="обычное">Обычное</option>
            <option value="важное">Важно</option>
            <option value="мечта">Мечта 💫</option>
          </select>
          <button onClick={handleAdd}>Добавить</button>
        </div>
      </div>

      {wishes.length > 0 && (
        <div className="wishes">
          {wishes.map((wish) => (
            <div
              key={wish.id}
              className={`card ${wish.done ? 'done' : ''} priority-${wish.priority}`}
            >
              <div className="card-header">
                <div className="card-text">{wish.text}</div>
                <button className="done-btn" onClick={() => toggleDone(wish.id)}>
                  {wish.done ? '↩️' : '✅'}
                </button>
              </div>
              <div className="card-meta">🎯 {wish.forWhom}</div>
              {wish.comment && (
                <div className="card-comment">💬 {wish.comment}</div>
              )}
            </div>
          ))}
          <button className="clear-btn" onClick={clearAll}>
            🗑 Очистить всё
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
