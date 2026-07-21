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
            $table->string("owner_name");
            $table->string("owner_mobile_number");
            $table->string("owner_email_address");
            $table->string("contact_name");
            $table->string("contact_mobile_number");
            $table->string("contact_email_address");
            $table->enum("status", ["inactive", "active"])->default("active");

            $table->timestamps();
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
