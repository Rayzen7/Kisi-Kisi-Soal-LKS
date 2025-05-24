<?php

namespace App\Http\Resources;

use App\Models\Scores;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ScoreResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            "username" => $this->user->username ?? null,
            "score" => $this->score,
            'timestamp' => $this->updated_at
        ];
    }
}
