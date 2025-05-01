<?php

namespace Database\Factories;

use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{
    protected static ?string $password;

    public function definition(): array
    {
        return [
            'name' => fake()->name(),
            'email' => fake()->unique()->safeEmail(),
            'email_verified_at' => now(),
            'password' => static::$password ??= Hash::make('password'),
            'remember_token' => Str::random(10),
        ];
    }

    public function unverified(): static
    {
        return $this->state(fn (array $attributes) => [
            'email_verified_at' => null,
        ]);
    }


    public function as(string ...$roles): static
    {
        return $this->afterCreating(fn (User $user) => $user->giveManyRoles(...$roles));
    }

    public function asAdmin(): static
    {
        return $this->afterCreating(fn (User $user) => $user->giveManyRoles(Role::ADMIN, Role::OPERATOR));
    }

    public function asOperator(): static
    {
        return $this->afterCreating(fn (User $user) => $user->giveRole(Role::OPERATOR));
    }

    public function asUser(): static
    {
        return $this->afterCreating(fn (User $user) => $user->giveRole(Role::USER));
    }
}
