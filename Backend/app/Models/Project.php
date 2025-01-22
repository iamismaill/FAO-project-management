<?php

namespace App\Models;

// use illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    //
    // use HasFactory;
    protected $fillable = [
        'name',
        'desc',
        'status'
    ];
}
