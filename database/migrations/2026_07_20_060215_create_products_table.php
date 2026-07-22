<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string("GTIN");
            $table->string("name");
            $table->string("description");
            $table->string("description_fr");
            $table->string("name_fr");
            $table->string("brand_name");
            $table->string("country_of_origin");
            $table->string("gross_weight");
            $table->string("net_content_weight");
            $table->string("weight_unit");
            $table->string("category");
            $table->string("image")->nullable();
            $table->boolean("is_hidden")->default(false);
            $table->timestamps();

            // $table->foreign('category')->references("id")->on("categories")->cascadeOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
