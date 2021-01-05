<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSectionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('sections', function (Blueprint $table) {
            $table->id();
            $table->boolean('anchor')->default(false); // If this section should appear in nav
            $table->unsignedInteger('order');
            $table->string('type'); // Types: text/items
            $table->string('title');
            $table->text('content');
            $table->json('items')->nullable();
            $table->string('image_url')->nullable();
            $table->json('links')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('sections');
    }
}
