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
        Schema::create('simrs_schedules', function (Blueprint $table) {
            $table->id('schedule_id')->primary();
            $table->string('doctor_id', 15);
            $table->string('pol_id', 10);

            $table->foreign('doctor_id')->references('doctor_id')->on('simrs_doctors')->restrictOnDelete();
            $table->foreign('pol_id')->references('pol_id')->on('simrs_poliklinik')->restrictOnDelete();
            $table->date('schedule_date');
            $table->time('schedule_start');
            $table->time('schedule_end');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('simrs_schedules');
    }
};
