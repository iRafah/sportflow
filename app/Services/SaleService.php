<?php

class SaleService
{
    /**
     * Create 
     */
    public function create(array $data): Sale
    {
        if ($data['payment_method'] === PaymentMethod::DINHEIRO) {
            $data['total_installments'] = 1;
            $data['paid_installments'] = 1;
            $data['status'] = SaleStatus::PAGO;
        } else {
            $data['status'] =
                $data['paid_installments'] >= $data['total_installments']
                ? SaleStatus::PAGO
                : SaleStatus::PENDENTE;
        }

        return Sale::create($data);
    }

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
