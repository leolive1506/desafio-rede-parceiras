<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;

use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

/**
 * @method static UserFactory factory($count = null, $state = [])
 */
class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable, SoftDeletes, HasApiTokens;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function roles(): BelongsToMany
    {
        return $this->belongsToMany(Role::class);
    }

    public function hasRole(string $role): bool
    {
        return $this->roles()->where('name', $role)->exists();
    }

    public function hasRoles(string ...$roles): bool
    {
        return $this->roles()->toBase()->whereIn('name', $roles)->exists();
    }

    public function giveRole(string ...$role): void
    {
        $model = Role::firstWhere('name', $role);

        $this->roles()->syncWithoutDetaching($model);
    }

    public function giveManyRoles(string ...$roles): void
    {
        $models = Role::query()->whereIn('name', $roles)->get();

        $this->roles()->syncWithoutDetaching($models);
    }

    public function removeRole(string $role): void
    {
        $model = Role::firstWhere('name', $role);

        $this->roles()->detach($model);
    }
}
