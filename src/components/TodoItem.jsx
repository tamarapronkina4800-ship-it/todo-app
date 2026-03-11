import { useState } from 'react';

function TodoItem({ task, onToggle, onDelete, onEdit, isDarkTheme }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);

  const handleDoubleClick = () => {
    setIsEditing(true);
    setEditText(task.text);
  };

  const handleSave = () => {
    if (editText.trim()) {
      onEdit(task.id, editText.trim());
      setIsEditing(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      setIsEditing(false);
      setEditText(task.text);
    }
  };

  const handleBlur = () => {
    if (isEditing) {
      handleSave();
    }
  };

  return (
    <li style={{
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      padding: '8px',
      borderBottom: `1px solid ${isDarkTheme ? '#3a3a5a' : '#eee'}`,
      backgroundColor: isDarkTheme ? '#2a2a4a' : 'transparent',
      borderRadius: '4px',
      marginBottom: '5px'
    }}>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id)}
      />
      
      {isEditing ? (
        <input
          type="text"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          autoFocus
          style={{
            flex: 1,
            padding: '4px 8px',
            fontSize: '16px',
            border: '1px solid #007bff',
            borderRadius: '4px',
            backgroundColor: isDarkTheme ? '#1a1a2e' : '#fff',
            color: isDarkTheme ? '#eee' : '#333'
          }}
        />
      ) : (
        <span 
          onDoubleClick={handleDoubleClick}
          style={{
            flex: 1,
            textDecoration: task.completed ? 'line-through' : 'none',
            color: task.completed ? '#999' : (isDarkTheme ? '#eee' : '#333'),
            cursor: 'pointer',
            padding: '4px',
            borderRadius: '4px'
          }}
          title="Двойной клик для редактирования"
        >
          {task.text}
        </span>
      )}
      
      <button
        onClick={() => onDelete(task.id)}
        style={{
          background: '#ff4444',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          padding: '4px 8px',
          cursor: 'pointer'
        }}
      >
        Удалить
      </button>
    </li>
  );
}

export default TodoItem;