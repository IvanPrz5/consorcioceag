<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEgresoXmlsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('egreso_xmls', function (Blueprint $table) {
            $table->id();
            $table->foreignId('idEmpresa')->constrained('empresas');

            $table->string('emisorRfc');
            $table->string('emisorNombre', 1000);


            $table->string('receptorRfc');
            $table->string('receptorNombre',1000);


            $table->decimal('total',12,2);
            $table->date('fechaFactura');

            $table->string('uuid');


            $table->string('descripcion',5000);
            $table->string('destino',5000);

            $table->string('autorizo');
            $table->string('autorizoNombre',500);

            $table->string('solicito');
            $table->string('solicitoNombre',500);

            $table->string('numOficio', 50);
            
            $table->string('asunto',300);
            $table->string('ramo',300);

            $table->string('personaMoral',255);
            $table->string('representanteLegal',255);
            $table->string('fechaLlegada',45);


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
        Schema::dropIfExists('egreso_xmls');
    }
}
