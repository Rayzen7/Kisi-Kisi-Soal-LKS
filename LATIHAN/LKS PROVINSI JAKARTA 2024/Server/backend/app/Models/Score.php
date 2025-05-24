<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class Score extends Model
{
    use HasFactory, HasApiTokens, Notifiable;
    protected $table = 'scores';
    protected $fillable = [
        'user_id',
        'game_version_id',
        'score'
    ];

    /**
     * Get the user that owns the Score
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function gameversion()
    {
        return $this->belongsTo(GameVersion::class, 'game_version_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
