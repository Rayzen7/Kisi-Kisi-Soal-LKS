<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class GameVersion extends Model
{
    use HasFactory, HasApiTokens, Notifiable, SoftDeletes;
    protected $table = 'game_versions';
    protected $fillable = [
        'game_id',
        'version',
        'storage_path'
    ];

    /**
     * Get the user that owns the GameVersion
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function game()
    {
        return $this->belongsTo(Games::class, 'game_id');
    }

    /**
     * Get all of the comments for the GameVersion
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function gamescore()
    {
        return $this->hasMany(Score::class, 'game_version_id');
    }
}
