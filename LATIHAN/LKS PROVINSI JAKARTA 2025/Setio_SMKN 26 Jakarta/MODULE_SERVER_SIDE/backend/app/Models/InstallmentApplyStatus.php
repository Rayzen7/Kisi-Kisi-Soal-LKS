<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class InstallmentApplyStatus extends Model
{
    use HasFactory, HasApiTokens, Notifiable;
    protected $table = 'installment_apply_status';
    public $timestamps = false;
    protected $fillable = [
        'date',
        'society_id',
        'installment_id',
        'available_month_id',
        'status',
        "installment_apply_societies_id"
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

    public function application()
    {
        return $this->belongsTo(Application::class, 'installment_apply_societies_id');
    }
}
