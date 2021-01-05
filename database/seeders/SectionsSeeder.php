<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SectionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('sections')->insert([
            'order' => 1,
            'anchor' => true,
            'type' => 'text',
            'title' => 'Qui suis-je?',
            'content' => 'Étudiant en développement web à Bordeaux, je suis passionné depuis l\'enfance par la création et me suis orienté vers l\'informatique en vue d\'en faire mon métier',
            'links' => '[["Lire plus","/presentation"]]'
        ]);

        DB::table('sections')->insert([
            'order' => 2,
            'type' => 'items',
            'title' => 'Mes réalisations',
            'image_url' => '1.jpg',
            'content' => 'Chaque icône affiche les informations du site',
            'items'=> '[["/favicon.ico"]]'
        ]);
    }
}
