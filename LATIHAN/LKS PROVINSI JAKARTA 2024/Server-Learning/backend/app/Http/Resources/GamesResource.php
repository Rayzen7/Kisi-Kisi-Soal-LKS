<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class GamesResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'slug' => $this->slug,
            'title' => $this->title,
            'description' => $this->description,
            'version' => '/' . $this->version->pluck('storage_path')->last() . 'thumbnail.png' ?? null,
            'uploadTimestamp' => $this->version->pluck('created_at')->last(),
            'author' => $this->user->username,
            'scoreCount' => $this->user->scores->pluck('score')->sum()
        ];
    }
}
