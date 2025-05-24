<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Vaccine extends Model
{
    protected $table = 'vaccines';
    protected $fillable = [
        'name'
    ];

    /**
     * The roles that belong to the Vaccine
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function spot()
    {
        return $this->belongsToMany(Spot::class, 'spot_vaccines', 'vaccine_id', 'spot_id');
    }

    public $timestamps = false;
}
