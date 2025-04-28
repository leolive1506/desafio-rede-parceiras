<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Role extends Model
{
    /** @use HasFactory<\Database\Factories\RoleFactory> */
    use HasFactory, SoftDeletes;

    public const ADMIN = 'admin';
    public const OPERATOR = 'operator';
    public const USER = 'user';

    public const ALL = [
        self::ADMIN,
        self::OPERATOR,
        self::USER,
    ];
}
