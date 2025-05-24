<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class VaccinationSpotIdResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $count = \App\Models\Vaccinations::where('spot_id', $this->vaccinations->spot_id)->count();
        return [
            'date' => $this->vaccinations->date,
            'spot' => [
                'id' => $this->id,
                'name' => $this->name,
                'address' => $this->address,
                'serve' => $this->serve,
                'capacity' => $this->capacity
            ],
            'vaccinations_count' => $count
        ];
    }
}
