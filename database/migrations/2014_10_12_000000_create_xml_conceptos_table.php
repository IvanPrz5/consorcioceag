<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateXmlConceptosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('xml_conceptos', function (Blueprint $table) {
            $table->id();

            $table->string('cantidad');
            $table->string('descripcion');
            $table->string('importe');
            $table->foreignId('idXmlEgreso')->constrained('egreso_xmls');
            $table->timestamps();
            $table->boolean( 'estatus')->default(true);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('xml_conceptos');
    }
}
