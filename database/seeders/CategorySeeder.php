<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;
class CategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            [
                'id' => 1,
                'name' => 'Eletrônicos',
                'description' => 'Produtos eletrônicos e dispositivos tecnológicos',
            ],
            [
                'id' => 2,
                'name' => 'Informática',
                'description' => 'Computadores, notebooks e acessórios de informática',
            ],
            [
                'id' => 3,
                'name' => 'Celulares e Smartphones',
                'description' => 'Telefones móveis e acessórios',
            ],
            [
                'id' => 4,
                'name' => 'Vestuário',
                'description' => 'Roupas, calçados e acessórios de moda',
            ],
            [
                'id' => 5,
                'name' => 'Calçados',
                'description' => 'Sapatos, tênis e outros tipos de calçados',
            ],
            [
                'id' => 6,
                'name' => 'Alimentos',
                'description' => 'Produtos alimentícios em geral',
            ],
            [
                'id' => 7,
                'name' => 'Bebidas',
                'description' => 'Bebidas alcoólicas e não alcoólicas',
            ],
            [
                'id' => 8,
                'name' => 'Móveis',
                'description' => 'Mobiliário para casa e escritório',
            ],
            [
                'id' => 9,
                'name' => 'Eletrodomésticos',
                'description' => 'Aparelhos eletrodomésticos para o lar',
            ],
            [
                'id' => 10,
                'name' => 'Beleza e Cuidados Pessoais',
                'description' => 'Produtos de beleza e higiene pessoal',
            ],
            [
                'id' => 11,
                'name' => 'Esportes',
                'description' => 'Artigos esportivos e equipamentos',
            ],
            [
                'id' => 12,
                'name' => 'Brinquedos',
                'description' => 'Jogos e brinquedos para todas as idades',
            ],
            [
                'id' => 13,
                'name' => 'Livros',
                'description' => 'Livros físicos e e-books de diversos gêneros',
            ],
            [
                'id' => 14,
                'name' => 'Ferramentas',
                'description' => 'Ferramentas manuais e elétricas',
            ],
            [
                'id' => 15,
                'name' => 'Automotivo',
                'description' => 'Peças e acessórios para veículos',
            ],
            [
                'id' => 16,
                'name' => 'Saúde',
                'description' => 'Produtos médicos e para saúde',
            ],
            [
                'id' => 17,
                'name' => 'Casa e Jardim',
                'description' => 'Produtos para lar e jardinagem',
            ],
            [
                'id' => 18,
                'name' => 'Pet Shop',
                'description' => 'Produtos para animais de estimação',
            ],
            [
                'id' => 19,
                'name' => 'Bebê',
                'description' => 'Produtos para recém-nascidos e crianças',
            ],
            [
                'id' => 20,
                'name' => 'Games',
                'description' => 'Jogos eletrônicos e consoles',
            ]
        ];


        foreach ($categories as $category) {
            Category::updateOrCreate(
                ['id' => $category['id']],
                [
                    ...$category,
                    'slug' => Str::slug($category['name']),
                ]
            );
        }
    }
}
