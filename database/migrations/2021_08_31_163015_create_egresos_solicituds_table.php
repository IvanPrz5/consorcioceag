<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEgresosSolicitudsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('egresos_solicitudes', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('folio');
            $table->String('beneficiario');
            $table->String('puesto');
            $table->String('descripcion',5000);
            $table->float('importe', 12,2);
            $table->foreignId('idUsuario')->constrained('users');
            $table->foreignId('idEmpresa')->constrained('empresas');
            $table->boolean('estatus');
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
        Schema::dropIfExists('egresos_solicituds');
    }
}
