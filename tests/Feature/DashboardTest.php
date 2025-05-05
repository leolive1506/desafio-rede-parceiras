<?php

use App\Models\User;

test('guests are redirected to the login page', function () {
    $this->get(route('products.index'))->assertRedirect('/login');
});

test('authenticated users can visit the products page', function () {
    $this->actingAs($user = User::factory()->create());

    $this->get(route('products.index'))->assertOk();
});
