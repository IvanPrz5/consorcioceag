<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOrganigramaDetallesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('organigrama_detalles', function (Blueprint $table) {
            $table->id();
            $table->foreignId('idEmpresa')->constrained('empresas');
            $table->foreignId('idOrganigrama')->constrained('organigramas');
            $table->mediumInteger('año');
            $table->string('nombre');
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
        Schema::dropIfExists('organigrama_detalles');
    }
}
