<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Simrs_schedule extends Model
{
    protected $table = 'simrs_schedules';
    protected $primaryKey = 'schedule_id';
    protected $keyType = 'string';
    protected $fillable = [
        'doctor_id',
        'pol_id',
        'schedule_date',
        'schedule_start',
        'schedule_end'
    ];

    /**
     * Get the user that owns the Simrs_schedule
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function doctor()
    {
        return $this->belongsTo(Simrs_doctor::class, 'doctor_id', 'doctor_id');
    }

    public function pol()
    {
        return $this->belongsTo(Simrs_poliklinik::class, 'pol_id', 'pol_id');
    }
}
