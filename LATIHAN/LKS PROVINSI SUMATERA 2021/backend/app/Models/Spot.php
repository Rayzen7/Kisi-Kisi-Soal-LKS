<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class Spot extends Model
{
    use HasFactory, HasApiTokens, Notifiable;
    protected $table = 'spots';
    protected $fillable = [
        'regional_id',
        'name',
        'address',
        'serve'
    ];

    /**
     * Get the user associated with the Spot
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function regional()
    {
        return $this->belongsTo(Regional::class, 'regional_id');
    }

    /**
     * The roles that belong to the Spot
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function vaccines()
    {
        return $this->belongsToMany(Vaccine::class, 'spot_vaccines', 'spot_id', 'vaccine_id');
    }

    /**
     * Get the user associated with the Spot
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasOne
     */
    public function vaccinations()
    {
        return $this->hasOne(Vaccinations::class, 'spot_id', 'id');
    }

    public $timestamps = false;
}
