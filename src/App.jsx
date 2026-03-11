import { useState, useEffect } from 'react';
import AddTodoForm from './components/AddTodoForm';
import TodoFilters from './components/TodoFilters';
import TodoItem from './components/TodoItem';

function App() {
  // Состояние для списка задач
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem('todos');
    return saved ? JSON.parse(saved) : [];
  });

  // Состояние для текущего фильтра
  const [filter, setFilter] = useState('all');

  // Состояние для темы
  const [isDarkTheme, setIsDarkTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark';
  });

  // Сохраняем задачи в localStorage
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  // Сохраняем тему в localStorage
  useEffect(() => {
    localStorage.setItem('theme', isDarkTheme ? 'dark' : 'light');
  }, [isDarkTheme]);

  // Добавление новой задачи
  const addTodo = (text) => {
    const newTodo = {
      id: Date.now(),
      text: text,
      completed: false
    };
    setTodos([...todos, newTodo]);
  };

  // Переключение статуса задачи
  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  // Удаление задачи
  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  // Редактирование задачи
  const editTodo = (id, newText) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, text: newText } : todo
    ));
  };

  // Переключение темы
  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  // Фильтрация задач
  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true; // 'all'
  });

  // Подсчет активных задач
  const activeCount = todos.filter(todo => !todo.completed).length;

  // Стили в зависимости от темы
  const themeStyles = {
    backgroundColor: isDarkTheme ? '#1a1a2e' : '#f5f5f5',
    color: isDarkTheme ? '#eee' : '#333',
    minHeight: '100vh',
    transition: 'all 0.3s ease'
  };

  const headerStyles = {
    textAlign: 'center',
    color: isDarkTheme ? '#eee' : '#333',
    marginBottom: '20px'
  };

  const buttonThemeStyles = {
    padding: '8px 16px',
    background: isDarkTheme ? '#ffd700' : '#333',
    color: isDarkTheme ? '#333' : '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginBottom: '20px',
    transition: 'all 0.3s ease'
  };

  return (
    <div style={{
      ...themeStyles,
      maxWidth: '600px',
      margin: '0 auto',
      padding: '20px',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h1 style={headerStyles}>Менеджер задач</h1>

      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <button onClick={toggleTheme} style={buttonThemeStyles}>
          {isDarkTheme ? '☀️ Светлая тема' : '🌙 Тёмная тема'}
        </button>
      </div>

      <AddTodoForm onAdd={addTodo} isDarkTheme={isDarkTheme} />

      <TodoFilters
        filter={filter}
        onFilterChange={setFilter}
        activeCount={activeCount}
        isDarkTheme={isDarkTheme}
      />

      {filteredTodos.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#999' }}>
          {filter === 'all' ? 'Задач пока нет' :
            filter === 'active' ? 'Нет активных задач' : 'Нет выполненных задач'}
        </p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {filteredTodos.map(todo => (
            <TodoItem
              key={todo.id}
              task={todo}
              onToggle={toggleTodo}
              onDelete={deleteTodo}
              onEdit={editTodo}
              isDarkTheme={isDarkTheme}
            />
          ))}
        </ul>
      )}

      {todos.length > 0 && (
        <button
          onClick={() => setTodos([])}
          style={{
            marginTop: '20px',
            padding: '8px 16px',
            background: '#dc3545',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            width: '100%'
          }}
        >
          Очистить всё
        </button>
      )}
    </div>
  );
}

export default App;