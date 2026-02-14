<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Client;
use App\Enums\PaymentMethod;
use App\Enums\SaleStatus;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Sale>
 */
class SaleFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {

        $total = fake()->numberBetween(1, 6);
        $paid = fake()->numberBetween(0, $total);

        return [
            'client_id' => Client::factory(),
            'clothing_name' => fake()->randomElement([
                'Camisa Brasil',
                'Camisa Santos',
                'Camisa Barcelona',
                'Camisa Real Madrid',
                'Camisa Lakers',
            ]),
            'price' => fake()->randomFloat(2, 100, 500),
            'payment_method' => fake()->randomElement(PaymentMethod::cases()),
            'total_installments' => $total,
            'paid_installments' => $paid,
            'status' => $paid >= $total 
                ? SaleStatus::PAGO 
                : SaleStatus::PENDENTE,
        ];
    }
}
