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

        $validated = $request->validate([
            'search' => 'nullable|string|max:255',
            'status' => 'nullable|in:pending,in_progress,completed',
            'priority' => 'nullable|in:low,medium,high',
        ]);

        $filters = array_merge([
            'search' => '',
            'status' => '',
            'priority' => '',
        ], $validated);

        // Search
        if ($filters['search']) {
            $query->where(function($q) use ($filters) {
                $q->where('title', 'like', "%{$filters['search']}%")
                ->orWhere('description', 'like', "%{$filters['search']}%");
            });
        }

        // Status Filter
        if ($filters['status']) {
            $query->where('status', $filters['status']);
        }

        // Priority Filter
        if ($filters['priority']) {
            $query->where('priority', $filters['priority']);
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

        if (isset($validated['assigned_users'])) {
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
