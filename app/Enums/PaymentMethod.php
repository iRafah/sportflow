<?php

namespace App\Enums;

enum PaymentMethod: string
{
    case DINHEIRO = 'dinheiro';
    case PARCELADO = 'parcelado';
}
