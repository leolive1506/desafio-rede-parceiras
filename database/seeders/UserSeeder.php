<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::factory()->asAdmin()->create([
            'name' => 'Admin',
            'email' => 'admin@gmail.com',
        ]);

        User::factory()->asOperator()->create([
            'name' => 'Operator',
            'email' => 'operator@gmail.com',
        ]);

        User::factory()->asUser()->create([
            'name' => 'Common user',
            'email' => 'user@gmail.com',
        ]);
    }
}
