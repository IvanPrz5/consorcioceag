<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEmpresasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('empresas', function (Blueprint $table) {
            $table->id();
            $table->string('nombre',500);
            $table->string('nombreNominativo',500);
            $table->string('rfc',20);
            $table->string('calle',500);
            $table->string('numExt')->nullable()->default('');
            $table->string('numInt')->nullable()->default('');
            $table->string('agencia');
            $table->string('colonia');
            $table->string('municipio');
            $table->string('distrito');
            $table->string('estado');
            $table->string('cp',10);
            $table->string('logo',2000)->nullable()->default('');
            $table->string('cer',2000)->nullable()->default('');
            $table->string('key',2000)->nullable()->default('');
            $table->string('passwordKey')->nullable()->default('');
            $table->string('celular');
            $table->string('correoElectronico')->nullable()->default('');
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
        Schema::dropIfExists('empresas');
    }
}
