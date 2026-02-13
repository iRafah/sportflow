<?php

namespace App\Enums;

enum SaleStatus: string
{
    case PAGO = 'pago';
    case PENDENTE = 'pendente';
}