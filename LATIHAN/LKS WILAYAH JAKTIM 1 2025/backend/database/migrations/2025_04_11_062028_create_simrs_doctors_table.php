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
        Schema::create('simrs_doctors', function (Blueprint $table) {
            $table->string('doctor_id', 15)->primary();
            $table->string('doctor_name');
            $table->enum('doctor_gender', ['M', 'F']);
            $table->string('doctor_phone_number', 20);
            $table->string('doctor_address');
            $table->string('doctor_email');
            $table->text('doctor_bio')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('simrs_doctors');
    }
};
