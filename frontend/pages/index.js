import { useState, useEffect } from 'react';

export default function Home() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await fetch(`${API_URL}/tasks`);
      const data = await res.json();
      console.log('Fetched tasks:', data);
      setTasks(data);
    } catch (err) {
      console.error('Fetch error:', err);
    }
  };

  const addTask = async () => {
    if (!title.trim()) return;
    try {
      const res = await fetch(`${API_URL}/tasks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: title.trim() }),
      });
      const newTask = await res.json();
      setTasks([...tasks, newTask]);
      setTitle('');
    } catch (err) {
      console.error('Add task error:', err);
    }
  };

  const editTask = async (id, newTitle) => {
    try {
      const res = await fetch(`${API_URL}/tasks/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: newTitle }),
      });
      const updated = await res.json();
      setTasks(tasks.map(t => (t.id === id ? updated : t)));
    } catch (err) {
      console.error('Failed to update title:', err);
    }
  };

  const toggleStatus = async (task) => {
    try {
      const newStatus = task.status === 'pending' ? 'done' : 'pending';
      const res = await fetch(`${API_URL}/tasks/${task.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      const updated = await res.json();
      setTasks(tasks.map(t => (t.id === task.id ? updated : t)));
    } catch (err) {
      console.error('Failed to toggle status:', err);
    }
  };

  const deleteTask = async (id) => {
    try {
      await fetch(`${API_URL}/tasks/${id}`, {
        method: 'DELETE',
      });
      setTasks(tasks.filter(t => t.id !== id));
    } catch (err) {
      console.error('Failed to delete task:', err);
    }
  };

  return (
    <main className="task-card">
      <h1 className="text-2xl font-bold mb-4">Mini Task Manager</h1>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          className="border px-2 py-1 flex-1"
          placeholder="Enter task title"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <button onClick={addTask} className="btn-primary">
          Add
        </button>
      </div>

      {tasks.length === 0 && (
        <p className="text-gray-500">No tasks yet...</p>
      )}

      <ul>
        {tasks.map(task => (
          <li
            key={task.id}
            className="flex justify-between items-center border-b py-2"
          >
            <div>
              <p className="font-semibold">{task.title}</p>
              <p className="text-sm text-gray-500">
                Status: {task.status}
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  const newTitle = prompt('New title:', task.title);
                  if (newTitle?.trim()) {
                    editTask(task.id, newTitle.trim());
                  }
                }}
                className="btn-action"
              >
                Edit
              </button>
              <button
                onClick={() => toggleStatus(task)}
                className="btn-action"
              >
                {task.status === 'pending'
                  ? 'Mark Done'
                  : 'Mark Pending'}
              </button>
              <button
                onClick={() => deleteTask(task.id)}
                className="btn-delete"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
