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

  // Состояние для темы (простой подход)
  const [isDark, setIsDark] = useState(false);

  // Функция переключения темы
  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  // Сохраняем задачи в localStorage
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

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

  // Фильтрация задач
  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true; // 'all'
  });

  // Подсчет активных задач
  const activeCount = todos.filter(todo => !todo.completed).length;

  // Стили темы (как в методичке!)
  const themeStyles = {
    backgroundColor: isDark ? '#1a1a2e' : '#f5f5f5',
    color: isDark ? '#fff' : '#333',
    minHeight: '100vh',
    padding: '20px',
    transition: 'all 0.3s'
  };

  return (
    <div style={themeStyles}>
      <div style={{
        maxWidth: '600px',
        margin: '0 auto',
        fontFamily: 'Arial, sans-serif'
      }}>
        <h1 style={{ textAlign: 'center' }}>Менеджер задач</h1>

        {/* Кнопка переключения темы */}
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <button 
            onClick={toggleTheme}
            style={{
              padding: '8px 16px',
              background: isDark ? '#ffd700' : '#333',
              color: isDark ? '#333' : '#fff',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Переключить на {isDark ? 'светлую' : 'тёмную'}
          </button>
        </div>

        <AddTodoForm onAdd={addTodo} isDark={isDark} />

        <TodoFilters
          filter={filter}
          onFilterChange={setFilter}
          activeCount={activeCount}
          isDark={isDark}
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
                isDark={isDark}
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
    </div>
  );
}

export default App;