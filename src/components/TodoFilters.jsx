function TodoFilters({ filter, onFilterChange, activeCount, isDarkTheme }) {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '20px',
      paddingBottom: '10px',
      borderBottom: `2px solid ${isDarkTheme ? '#3a3a5a' : '#eee'}`,
      transition: 'border-color 0.3s ease'
    }}>
      <span style={{ color: isDarkTheme ? '#eee' : '#333' }}>
        Осталось задач: {activeCount}
      </span>
      <div>
        {['all', 'active', 'completed'].map((filterType) => (
          <button
            key={filterType}
            onClick={() => onFilterChange(filterType)}
            style={{
              margin: '0 5px',
              padding: '5px 10px',
              background: filter === filterType ? '#007bff' : (isDarkTheme ? '#2a2a4a' : '#f0f0f0'),
              color: filter === filterType ? 'white' : (isDarkTheme ? '#eee' : '#333'),
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
          >
            {filterType === 'all' ? 'Все' : 
             filterType === 'active' ? 'Активные' : 'Выполненные'}
          </button>
        ))}
      </div>
    </div>
  );
}

export default TodoFilters;ы