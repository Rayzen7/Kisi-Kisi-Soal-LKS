<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class Doctor extends Model
{
    use HasApiTokens, HasFactory, Notifiable;
    protected $table = 'medicals';
    public $timestamps = false;
    protected $fillable = [
        'spot_id',
        'user_id',
        'role',
        'name'
    ];
}
