<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class VaccinationSpotResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $allVaccine = \App\Models\Vaccine::all();
        $availableVaccine = $this->vaccines->pluck('id')->toArray();
        $vaccines = [];
        foreach ($allVaccine as $vaccine) {
            $vaccines[$vaccine->name] = in_array($vaccine->id, $availableVaccine, true);
        }

        return [
            'id' => $this->id,
            'name' => $this->name,
            'address' => $this->address,
            'serve' => implode('|', (array) $this->serve),
            'capacity' => $this->capacity,
            'available_vaccines' => $vaccines
        ];

    }
}
