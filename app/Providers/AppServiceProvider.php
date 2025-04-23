<?php

namespace App\Providers;

use App\Models\Role;
use App\Models\User;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Gate;

class AppServiceProvider extends ServiceProvider
{
    public function register(): void
    {
    }

    public function boot(): void
    {
        foreach (Role::ALL as $role) {
            Gate::define($role, fn (User $user): bool => $user->hasRole($role));
        }
    }
}
