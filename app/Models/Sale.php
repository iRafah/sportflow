<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Concerns\HasUuids as HasUuid;

class Sale extends Model
{
    use HasFactory, HasUuid;

    protected $fillable = [
        'client_id',
        'clothing_name',
        'price',
        'payment_method',
        'total_installments',
        'paid_installments',
        'status',
    ];

    /**
     * Get the client that owns the sale.
     */
    public function client()
    {
        return $this->belongsTo(Client::class);
    }
}
