<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class Simrs_doctor extends Model
{
    use HasFactory, HasApiTokens, Notifiable;
    protected $table = 'simrs_doctors';
    protected $primaryKey = 'doctor_id';
    protected $keyType = 'string';
    protected $fillable = [
        'doctor_name',
        'doctor_gender',
        'doctor_phone_number',
        'doctor_address',
        'doctor_email',
        'doctor_bio',
    ];

    protected static function boot()
    {
        parent::boot();
        static::creating(function ($model) {
            if (empty($model->doctor_id)) {
                do {
                    $randomId = strval(mt_rand(1000000, 9999999));
                } while (self::where('doctor_id', $randomId)->exists());

                $model->doctor_id = $randomId;
            }
        });
    }

    /**
     * Get all of the comments for the Simrs_doctor
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function schedule()
    {
        return $this->hasMany(Simrs_schedule::class, 'doctor_id');
    }
}
