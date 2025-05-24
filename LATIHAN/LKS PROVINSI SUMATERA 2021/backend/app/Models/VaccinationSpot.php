<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class VaccinationSpot extends Model
{
    protected $table = 'spot_vaccines';
    protected $fillable = [
        'spot_id',
        'vaccine_id'
    ];  

    public $timestamps = false;
    
    /**
     * The roles that belong to the VaccinationSpot
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function vaccines()
    {
        return $this->belongsTo(Vaccine::class, 'vaccine_id');
    }

    public function spot()
    {
        return $this->belongsTo(Spot::class, 'spot_id');
    }
}
