<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Concerns\HasUuids as HasUuid;

class Client extends Model
{
    use HasFactory, HasUuid;

    protected $fillable = [
        'name',
        'phone',
        'email',
    ];

    /**
     * Get the sales for the client.
     */
    public function sales() 
    {
        return $this->hasMany(Sale::class);
    }
}
