<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUserSistemasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('user_sistemas', function (Blueprint $table) {
            $table->id();
            $table->foreignId('idUser')->constrained('users');
            $table->foreignId('idSistema')->constrained('sistemas');
            $table->foreignId('idEmpresa')->constrained('empresas');
            $table->boolean('estatus')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('user_sistemas');
    }
}
