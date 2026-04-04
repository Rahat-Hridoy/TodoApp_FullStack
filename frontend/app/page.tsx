'use client';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { fetchTodos, createTodo, updateTodo, deleteTodo } from '../store/todoSlice';

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const { todos, loading } = useSelector((state: RootState) => state.todos);
  const [todo, setTodo] = useState('');
  const [editId, setEditId] = useState<string | null>(null); 
  const [editTodo, setEditTodo] = useState('');

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const handleCreate = () => {
    if (!todo.trim()) return;
    dispatch(createTodo(todo));
    setTodo('');
  };

  const handleToggle = (id: string, isComplete: boolean) => {
    dispatch(updateTodo({ id, data: { isComplete: !isComplete } }));
  };

  const handleEdit = (id: string, currentTodo: string) => {
    setEditId(id);
    setEditTodo(currentTodo);
  };

  const handleUpdate = (id: string) => {
    dispatch(updateTodo({ id, data: { todo: editTodo } }));
    setEditId(null);
  };

  const handleDelete = (id: string) => {
    dispatch(deleteTodo(id));
  };

  return (
    <div style={{ maxWidth: 600, margin: '40px auto', padding: '0 20px' }}>
      <h1>📝 Todo App</h1>

      {/* CREATE */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
        <input
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
          placeholder=" Add a new todo..."
          style={{ flex: 1, padding: '8px 12px', fontSize: 16 }}
          onKeyDown={(e) => e.key === 'Enter' && handleCreate()}
        />
        <button onClick={handleCreate} style={{ padding: '8px 16px' }}>
          Add
        </button>
      </div>

      {/* LIST */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        todos.map((item) => (
          <div key={item.id} style={{
            display: 'flex', alignItems: 'center', gap: 8,
            padding: '10px', marginBottom: 8, border: '1px solid #ddd', borderRadius: 6
          }}>
            {/* Toggle */}
            <input
              type="checkbox"
              checked={item.isComplete}
              onChange={() => handleToggle(item.id, item.isComplete)}
            />

            {/* Edit or Show */}
            {editId === item.id ? (
              <>
                <input
                  value={editTodo}
                  onChange={(e) => setEditTodo(e.target.value)}
                  style={{ flex: 1, padding: '4px 8px' }}
                />
                <button onClick={() => handleUpdate(item.id)}>Save</button>
                <button onClick={() => setEditId(null)}>Cancel</button>
              </>
            ) : (
              <>
                <span style={{
                  flex: 1,
                  textDecoration: item.isComplete ? 'line-through' : 'none',
                  color: item.isComplete ? '#999' : '#000'
                }}>
                  {item.todo}
                </span>
                <button onClick={() => handleEdit(item.id, item.todo)}>✏️</button>
                <button onClick={() => handleDelete(item.id)}>🗑️</button>
              </>
            )}
          </div>
        ))
      )}
    </div>
  );
}