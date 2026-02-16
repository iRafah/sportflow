<?php
namespace App\Services;

use App\Models\Sale;
use App\Enums\PaymentMethod;
use App\Enums\SaleStatus;

class SaleService
{
    /**
     * Create a new sale and adjust installments/status if payment method is cash.
     */
    public function create(array $data): Sale
    {
        $data['payment_method'] = PaymentMethod::from($data['payment_method']);
        if ($data['payment_method'] === PaymentMethod::DINHEIRO) {
            $data['total_installments'] = 1;
            $data['paid_installments'] = 1;
        }

        if (($data['paid_installments'] ?? 0) > ($data['total_installments'] ?? 1)) {
            throw new \DomainException(
                'Parcelas pagas não podem ser maiores que o total.'
            );
        }

        $data['status'] =
            ($data['paid_installments'] ?? 0) >= ($data['total_installments'] ?? 1)
            ? SaleStatus::PAGO
            : SaleStatus::PENDENTE;

        return Sale::create($data);
    }
    
    /**
     * Update a sale and adjust installments/status if payment method is cash.
     */
    public function update(Sale $sale, array $data): Sale
    {
        $sale->update($data);

        if ($sale->payment_method === PaymentMethod::DINHEIRO) {
            $sale->update([
                'paid_installments' => 1,
                'total_installments' => 1,
                'status' => SaleStatus::PAGO
            ]);
        } else {
            $sale->update([
                'status' => $sale->paid_installments >= $sale->total_installments
                    ? SaleStatus::PAGO
                    : SaleStatus::PENDENTE
            ]);
        }

        return $sale->refresh();
    }
}
