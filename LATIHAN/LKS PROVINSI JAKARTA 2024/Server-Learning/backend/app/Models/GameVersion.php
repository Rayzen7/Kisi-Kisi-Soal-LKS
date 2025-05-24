<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class GameVersion extends Model
{
    use HasApiTokens, HasFactory, Notifiable;
    protected $table = 'game_versions';
    protected $fillable = [
        'game_id',
        'version',
        'storage_path',
    ];

    /**
     * Get the user that owns the GameVersion
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function versions()
    {
        return $this->belongsTo(GameVersion::class, 'game_version_id');
    }
}
