<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class Application extends Model
{
    use HasFactory, HasApiTokens, Notifiable;
    protected $table = 'installment_apply_societies';
    public $timestamps = false;
    protected $fillable = [
        'notes',
        'available_month_id',
        'date',
        'society_id',
        'installment_id',
    ];

    /**
     * Get the user that owns the Application
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function month()
    {
        return $this->belongsTo(AvailableMonth::class, 'available_month_id');
    }

    public function society()
    {
        return $this->belongsTo(Society::class, 'society_id');
    }

    public function installment()
    {
        return $this->belongsTo(InstallmentCars::class, 'installment_id');
    }
}
