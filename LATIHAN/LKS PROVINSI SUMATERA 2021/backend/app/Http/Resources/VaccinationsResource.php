<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class VaccinationsResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'queue' => $this->id,
            'dose' => $this->dose,
            'vaccination_date' => $this->date,
            'spot' => [
                'id' => $this->spot_id,
                'name' => $this->spot->name ?? null,
                'address' => $this->spot->address ?? null,
                'serve' => $this->spot->serve ?? null,
                'capacity' => $this->spot->capacity ?? null,
                'regional' => [
                    'id' => optional($this->spot->regional)->id,
                    'province' => optional($this->spot->regional)->province,
                    'district' => optional($this->spot->regional)->district
                ]
            ],
            'status' => 'registered',
            'vaccine' => [
                'id' => $this->vaccine_id,
                'name' => optional($this->vaccine)->name ?? null
            ],
            'vaccinator' => [
                'id' => $this->doctor_id,
                'role' => optional($this->doctor)->role ?? null,
                'name' => optional($this->doctor)->name ?? null
            ]
        ];
    }
}
