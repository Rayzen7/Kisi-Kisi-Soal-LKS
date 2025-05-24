<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class Consultations extends Model
{
    use HasApiTokens, HasFactory, Notifiable;
    protected $table = 'consultations';
    protected $fillable = [
        'society_id',
        'doctor_id',
        'status',
        'diseases_history',
        'current_symptoms',
        'doctor_notes'
    ];

    /**
     * Get the user associated with the Consultations
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function society()
    {
        return $this->belongsTo(User::class, 'society_id');
    }

    /**
     * Get the user associated with the Consultations
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function doctor()
    {
        return $this->belongsTo(Doctor::class, 'doctor_id');
    }

    public $timestamps = false;
}
