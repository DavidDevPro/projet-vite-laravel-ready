<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('userPermissions', function (Blueprint $table) {
            $table->integer('idUserPermissions')->autoIncrement();
            $table->string('labelUserPermissions');
        });

        DB::table('userPermissions')->insert([
            ['labelUserPermissions' => 'admin'],
            ['labelUserPermissions' => 'utilisateur']  // Ajout de la permission "utilisateur"
        ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('userpermissions');
    }
};
