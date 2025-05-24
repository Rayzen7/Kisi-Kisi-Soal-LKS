<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class Validator extends Model
{
    use HasFactory, HasApiTokens, Notifiable;
    protected $table = 'validators';
    protected $fillable = [
        'user_id',
        'role',
        'name'
    ];
}
