<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Create user table
        Schema::create('user', function (Blueprint $table) {
            $table->integer('idUser')->autoIncrement();
            $table->string('identifiant');
            $table->string('email');
            $table->string('password');
            $table->string('token')->nullable();
            $table->string('urlPictureProfil')->nullable();
            $table->integer('idUserPermissions')->nullable();
            $table->foreign('idUserPermissions')->references('idUserPermissions')->on('userPermissions');
            $table->timestamp('dateLastConnexion')->nullable();
            $table->timestamp('deconnexion')->nullable();
            $table->tinyInteger('statutConnexion')->default(0);
            $table->timestamp('updatedAt')->nullable();
        });

        // Ajouter un utilisateur par défaut
        DB::table('user')->insert([
            'identifiant' => 'admin',
            'email' => 'xx@xx.fr',
            'password' => bcrypt('admin'), // Utilise bcrypt pour hasher le mot de passe
            'token' => null,
            'urlPictureProfil' => 'defaut.jpg',
            'idUserPermissions' => 1, // 'admin
            'dateLastConnexion' => null,
            'deconnexion' => null,
            'statutConnexion' => 0,
        ]);

        Schema::create('password_reset_tokens', function (Blueprint $table) {
            $table->string('email')->primary();
            $table->string('token');
            $table->timestamp('created_at')->nullable();
        });

        Schema::create('sessions', function (Blueprint $table) {
            $table->string('id')->primary();
            $table->foreignId('user_id')->nullable()->index();
            $table->string('ip_address', 45)->nullable();
            $table->text('user_agent')->nullable();
            $table->longText('payload');
            $table->integer('last_activity')->index();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
        Schema::dropIfExists('password_reset_tokens');
        Schema::dropIfExists('sessions');
    }
};
