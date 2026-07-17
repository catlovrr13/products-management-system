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
        Schema::create('companies', function (Blueprint $table) {
            $table->id();
            $table->string("name");
            $table->string("address");
            $table->string("telephone_number");
            $table->string("email_address");
            $table->unsignedBigInteger("owner_id");
            $table->unsignedBigInteger("contact_id");
            $table->enum("status", ["inactive", "active"])->default("active");

            $table->timestamps();

            $table->foreign("owner_id")->references("id")->on("owners");
            $table->foreign("contact_id")->references("id")->on("contacts");
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('companies');
    }
};
