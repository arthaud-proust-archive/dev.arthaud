<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {

        DB::table('authorized_email')->insert(['email' => 'rbourgeois.psy@free.fr']);

        $this->call(SectionsSeeder::class);
        // \App\Models\User::factory(10)->create();
    }
}
