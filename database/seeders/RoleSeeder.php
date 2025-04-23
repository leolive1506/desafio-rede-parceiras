<?php

namespace Database\Seeders;

use App\Models\Role;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RoleSeeder extends Seeder
{
    public function run(): void
    {
        $roles = Role::ALL;

        foreach ($roles as $role) {
            Role::updateOrCreate(
                ['name' => $role],
                ['name' => $role],
            );
        }
    }
}
