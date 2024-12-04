"use client";

import { IconPlus, IconCalendar, IconFlag, IconCheck } from "@tabler/icons-react";
import { useState } from "react";

export function TasksView() {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Review project proposal', priority: 'high', due: '2024-03-20', completed: false },
    { id: 2, title: 'Update documentation', priority: 'medium', due: '2024-03-22', completed: false },
    { id: 3, title: 'Team meeting preparation', priority: 'high', due: '2024-03-21', completed: true },
  ]);

  const [newTask, setNewTask] = useState('');
  const [filter, setFilter] = useState('all');

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([
        ...tasks,
        {
          id: tasks.length + 1,
          title: newTask,
          priority: 'medium',
          due: new Date().toISOString().split('T')[0],
          completed: false,
        },
      ]);
      setNewTask('');
    }
  };

  const toggleTask = (id: number) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-400';
      case 'medium': return 'text-yellow-400';
      default: return 'text-green-400';
    }
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'completed') return task.completed;
    if (filter === 'active') return !task.completed;
    return true;
  });

  return (
    <div>
      <h1 className="text-2xl font-bold text-white/90 mb-6">Tasks</h1>
      
      {/* Add Task */}
      <div className="bg-white/5 p-4 rounded-xl border border-white/10 mb-6">
        <div className="flex gap-4">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Add a new task..."
            className="flex-1 bg-white/5 text-white p-2 rounded-lg border border-white/10 focus:outline-none focus:border-white/20"
            onKeyPress={(e) => e.key === 'Enter' && addTask()}
          />
          <button
            onClick={addTask}
            className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
          >
            <IconPlus className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-lg ${
            filter === 'all' ? 'bg-white/10 text-white' : 'text-white/60 hover:bg-white/5'
          }`}
        >
          All
        </button>
        <button
          onClick={() => setFilter('active')}
          className={`px-4 py-2 rounded-lg ${
            filter === 'active' ? 'bg-white/10 text-white' : 'text-white/60 hover:bg-white/5'
          }`}
        >
          Active
        </button>
        <button
          onClick={() => setFilter('completed')}
          className={`px-4 py-2 rounded-lg ${
            filter === 'completed' ? 'bg-white/10 text-white' : 'text-white/60 hover:bg-white/5'
          }`}
        >
          Completed
        </button>
      </div>

      {/* Tasks List */}
      <div className="space-y-2">
        {filteredTasks.map((task) => (
          <div
            key={task.id}
            className={`p-4 rounded-xl border border-white/10 transition-colors ${
              task.completed ? 'bg-white/5 opacity-60' : 'bg-white/5'
            }`}
          >
            <div className="flex items-center gap-4">
              <button
                onClick={() => toggleTask(task.id)}
                className={`w-6 h-6 rounded-lg border ${
                  task.completed
                    ? 'bg-purple-500 border-purple-500'
                    : 'border-white/20 hover:border-white/40'
                } flex items-center justify-center`}
              >
                {task.completed && <IconCheck className="h-4 w-4 text-white" />}
              </button>
              <div className="flex-1">
                <p className={`text-white/90 ${task.completed ? 'line-through' : ''}`}>
                  {task.title}
                </p>
                <div className="flex items-center gap-4 mt-1">
                  <span className={`text-sm ${getPriorityColor(task.priority)}`}>
                    <IconFlag className="h-4 w-4 inline mr-1" />
                    {task.priority}
                  </span>
                  <span className="text-sm text-white/40">
                    <IconCalendar className="h-4 w-4 inline mr-1" />
                    {task.due}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
