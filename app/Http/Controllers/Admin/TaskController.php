<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Task;
use Inertia\Inertia;
use App\Models\TaskAssignment;
use App\Models\User;
class TaskController extends Controller
{
    public function index(Request $request){
        $query = Task::query();

        // Search
        if ($search = $request->input('search')) {
            $query->where(function($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                ->orWhere('description', 'like', "%{$search}%");
            });
        }

        // Status Filter
        if ($status = $request->input('status')) {
            $query->where('status', $status);
        }

        // Priority Filter
        if ($priority = $request->input('priority')) {
            $query->where('priority', $priority);
        }

        $tasks = $query->latest()
                    ->paginate(8)
                    ->withQueryString();

        return Inertia::render('Admin/Tasks/Index', [
            'tasks' => $tasks,
            'filters' => $request->only(['search', 'status', 'priority'])
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Tasks/Create');
    }

    public function edit($taskId)
    {
        $task = Task::findOrFail($taskId);

        return Inertia::render('Admin/Tasks/Edit', [
            'task' => $task->load('assignedUsers'),
            'users' => User::all(['id', 'name']),
            'is_admin' => auth()->user()->isAdmin(),
            'currentAssignments' => $task->assignedUsers->pluck('id'),
        ]);
    }

    public function update(Request $request, $id)
    {
        $task = Task::findOrFail($id);

        $validated = $request->validate([
            'title' => 'required|max:255',
            'description' => 'nullable|string',
            'deadline' => 'nullable|date',
            'status' => 'required|in:pending,in_progress,completed',
            'priority' => 'required|in:low,medium,high',
            'assigned_users' => 'array|nullable',
            'assigned_users.*' => 'exists:users,id',
        ]);

        $task->update([
            'title' => $validated['title'],
            'description' => $validated['description'],
            'deadline' => $validated['deadline'],
            'status' => $validated['status'],
            'priority' => $validated['priority'],
        ]);

        if (auth()->user()->role === 'admin' && isset($validated['assigned_users'])) {
            $task->assignments()->delete();

            foreach ($validated['assigned_users'] as $userId) {
                TaskAssignment::create([
                    'task_id' => $task->id,
                    'user_id' => $userId,
                    'assigned_by' => auth()->user()->id,
                ]);
            }
        }

        return redirect()->route('admin.tasks.index')
            ->with('message', 'Task updated successfully');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|max:255',
            'description' => 'nullable|string',
            'deadline' => 'nullable|date',
            'status' => 'required|in:pending,in_progress,completed',
            'priority' => 'required|in:low,medium,high',
        ]);

        Task::create($validated);

        return redirect()->route('admin.tasks.index')
            ->with('message', 'Task created successfully');
    }

    public function destroy($taskId)
    {
        try {
            $task = Task::findOrFail($taskId);
            $task->delete();

            return redirect()->route('admin.tasks.index')
                ->with('message', 'Task deleted successfully');
        } catch (\Exception $e) {
            return redirect()->route('admin.tasks.index')
                ->with('error', 'Failed to delete task');
        }
    }
}
