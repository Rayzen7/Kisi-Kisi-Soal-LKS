<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class Validation extends Model
{
    use HasApiTokens, HasFactory, Notifiable;
    protected $table = 'validations';
    public $timestamps = false;
    protected $fillable = [
        'society_id',
        'validator_id',
        'status',
        'job',
        'job_description',
        'income',
        'reason_accepted',
        'validator_notes',
    ];

    /**
     * Get the user that owns the Validation
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function validator()
    {
        return $this->belongsTo(Validator::class, 'validator_id');
    }
}
