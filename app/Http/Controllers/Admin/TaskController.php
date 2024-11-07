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
    public function index(){
        $tasks = Task::latest()->paginate(10);

        return Inertia::render('Admin/Tasks/Index', [
            'tasks' => $tasks
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

        if (auth()->user()->is_admin && isset($validated['assigned_users'])) {
            $task->assignments()->delete();

            foreach ($validated['assigned_users'] as $userId) {
                TaskAssignment::create([
                    'task_id' => $task->id,
                    'user_id' => $userId,
                    'assigned_by' => auth()->id(),
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
