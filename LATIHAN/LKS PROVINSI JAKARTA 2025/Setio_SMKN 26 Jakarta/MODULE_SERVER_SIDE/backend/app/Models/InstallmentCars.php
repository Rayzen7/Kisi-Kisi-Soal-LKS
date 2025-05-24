<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class InstallmentCars extends Model
{
    use HasFactory, HasApiTokens, Notifiable;
    protected $table = 'installment';
    public $timestamps = false;
    protected $fillable = [
        'brand_id',
        'cars',
        'description',
        'price'
    ];

    /**
     * Get the user that owns the IntalmentCars
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function brand()
    {
        return $this->belongsTo(Brand::class, 'brand_id');
    }

    /**
     * Get all of the comments for the IntalmentCars
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function month()
    {
        return $this->hasMany(AvailableMonth::class, 'installment_id');
    }
}
