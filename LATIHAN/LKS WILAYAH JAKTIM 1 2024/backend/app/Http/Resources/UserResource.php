<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'username' => $this->username,
            'email' => $this->email,
            'phone' => $this->phone,
            'no_ktp' => $this->no_ktp,
            'date_of_birth' => $this->date_of_birth,
            'description' => $this->description,
            'role_id' => $this->role_id,
            'rent' => $this->rent->map(function ($rent) {
                $tenant = $this->where('id', $rent->tenant)->first();
                return [
                    'id' => $rent->id,
                    'tenant' => $tenant->name,
                    'no_car' => $rent->no_car,
                    'date_borrow' => $rent->date_borrow,
                    'date_return' => $rent->date_return,
                    'down_payment' => $rent->down_payment,
                    'discount' => $rent->discount,
                    'total' => $rent->total,
                ];
            }),
            'penalties' => $this->penaltie,
            'return' => $this->return->map(function ($return) {
                $tenant = $this->where('id', $return->tenant)->first();
                $penalties = $this->penaltie->where('id', $return->id_penalties)->first();
                return [
                    'id' => $return->id,
                    'tenant' => $tenant->name,
                    'no_car' => $return->no_car,
                    'id_penalties' => $return->id_penalties,
                    'penalties_name' => $penalties->penalties_name,
                    'date_borrow' => $return->date_borrow,
                    'date_return' => $return->date_return,                    
                    'discount' => $return->discount,
                    'total' => $return->total,
                ];
            }),
        ];
    }
}
