<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Foundation\Auth\User as Authenticatable;

class Simrs_user extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;
    protected $table = 'simrs_users';
    protected $primaryKey = 'user_id';
    protected $fillable = [
        'user_username',
        "user_full_name",
        'user_password',
    ];

    protected $hidden = [
        'user_password'
    ];
}
