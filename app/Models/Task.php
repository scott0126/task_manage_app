<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'deadline',
        'status',
        'priority',
        'user_id'
    ];

    protected $casts = [
        'deadline' => 'date:Y-m-d',
    ];

    // Relationship with user who created the task
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function assignments()
    {
        return $this->hasMany(TaskAssignment::class);
    }

    public function assignedUsers()
    {
        return $this->belongsToMany(User::class, 'task_assignments')
                    ->withPivot('assigned_by')
                    ->withTimestamps();
    }
}
