<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class Penalties extends Model
{
    protected $table = 'penalties';
    use HasFactory, HasApiTokens, Notifiable;
    protected $fillable = [
        'penalties_name',
        'description',
        'no_car',
        'penalties_total'
    ];
}
