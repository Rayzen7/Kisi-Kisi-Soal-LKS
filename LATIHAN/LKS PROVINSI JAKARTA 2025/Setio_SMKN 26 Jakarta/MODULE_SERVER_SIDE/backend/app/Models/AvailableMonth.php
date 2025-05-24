<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class AvailableMonth extends Model
{
    use HasFactory, HasApiTokens, Notifiable;
    protected $table = 'available_month';
    public $timestamps = false;
    protected $fillable = [
        'installment_id',
        'month',
        'description',
        'nominal'
    ];
}
