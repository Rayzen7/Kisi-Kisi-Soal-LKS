<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class Games extends Model
{
    use HasFactory, HasApiTokens, Notifiable, SoftDeletes;
    protected $table = 'games';
    protected $fillable = [
        'title',
        "slug",
        'description',
        'created_by'
    ];

    /**
     * Get all of the comments for the Games
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function gameversion()
    {
        return $this->hasMany(GameVersion::class, 'game_id');
    }

    /**
     * Get the user that owns the Games
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user()
    {
        return $this->belongsTo(User::class, 'created_by');
    }
}
