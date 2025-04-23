<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Role extends Model
{
    /** @use HasFactory<\Database\Factories\RoleFactory> */
    use HasFactory;

    public const ADMIN = 'admin';
    public const OPERATOR = 'operator';
    public const USER = 'user';

    public const ALL = [
        self::ADMIN,
        self::OPERATOR,
        self::USER,
    ];
}
