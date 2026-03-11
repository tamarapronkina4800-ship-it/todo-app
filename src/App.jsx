import { useState, useEffect } from 'react';
import AddTodoForm from './components/AddTodoForm';
import TodoFilters from './components/TodoFilters';
import TodoItem from './components/TodoItem';

function App() {
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem('todos');
    return saved ? JSON.parse(saved) : [];
  });

  const [filter, setFilter] = useState('all');

  const [isDarkTheme, setIsDarkTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark';
  });

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    localStorage.setItem('theme', isDarkTheme ? 'dark' : 'light');
    document.body.style.backgroundColor = isDarkTheme ? '#1a1a2e' : '#f5f5f5';
    document.body.style.margin = '0';
    document.body.style.minHeight = '100vh';
  }, [isDarkTheme]);

  const addTodo = (text) => {
    const newTodo = {
      id: Date.now(),
      text: text,
      completed: false
    };
    setTodos([...todos, newTodo]);
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const editTodo = (id, newText) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, text: newText } : todo
    ));
  };

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  const activeCount = todos.filter(todo => !todo.completed).length;

  return (
    <div style={{
      maxWidth: '600px',
      margin: '0 auto',
      padding: '20px',
      fontFamily: 'Arial, sans-serif',
      color: isDarkTheme ? '#eee' : '#333',
      minHeight: '100vh'
    }}>
      <h1 style={{ textAlign: 'center', color: isDarkTheme ? '#eee' : '#333' }}>
        Менеджер задач
      </h1>

      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <button 
          onClick={toggleTheme} 
          style={{
            padding: '8px 16px',
            background: isDarkTheme ? '#ffd700' : '#333',
            color: isDarkTheme ? '#333' : '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
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