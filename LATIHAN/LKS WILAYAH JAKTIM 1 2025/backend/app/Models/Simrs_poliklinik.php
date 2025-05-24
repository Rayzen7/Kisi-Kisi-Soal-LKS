<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class Simrs_poliklinik extends Model
{
    use HasFactory, HasApiTokens, Notifiable;
    protected $table = 'simrs_poliklinik';
    protected $primaryKey = 'pol_id';
    protected $keyType = 'string';
    protected $fillable = [
        'pol_name',
        'pol_description'
    ];

    protected static function boot()
    {
        parent::boot();
        static::creating(function ($model) {
            if (empty($model->pol_id)) {
                do {
                    $randomId = strval(mt_rand(10000000, 99999999));
                } while (self::where('pol_id', $randomId)->exists());

                $model->pol_id = $randomId;
            }
        });
    }

    /**
     * Get all of the comments for the Simrs_poliklinik
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function schedule()
    {
        return $this->hasMany(Simrs_schedule::class, 'pol_id');
    }
}
