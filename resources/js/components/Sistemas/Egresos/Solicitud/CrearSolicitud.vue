<template>
    <v-form ref="form">
    <v-container>
      <v-row>


        <v-col
          cols="12"
          md="12"
          sm="12"
        >
                 <v-text-field
            v-model="solicitud.beneficiario"
            label="Beneficiario"
            outlined
            clearable
            prepend-inner-icon="mdi-account"

            counter
            required
          ></v-text-field>

        </v-col>

         <v-col
          cols="12"
          md="12"
          sm="12"
        >
                 <v-text-field
            v-model="solicitud.puesto"
            label="Puesto"
            outlined
            clearable
            prepend-inner-icon="mdi-account-box-multiple"
            counter
            required
          ></v-text-field>

        </v-col>



        <v-col
          cols="12"
          md="12"
          sm="12"
        >



         <v-textarea
            v-model="solicitud.descripcion"
         auto-grow
         counter
          name="input-7-4"
          label="DESCRIPCION DE SOLICITUD"
           hint="Capture la descripcion de la solicitud"
        ></v-textarea>




        </v-col>









        <v-col
          cols="12"
          md="6"
          sm="4"
        >
           <v-text-field
           v-model="solicitud.importe"
          label="importe"
          value="0.00"
          prefix="$"
        ></v-text-field>

        </v-col>


      </v-row>

        <v-btn color="success" @click="EnviarNuevo">
                Generar Solicitud
        </v-btn>





    </v-container>


     <v-snackbar :timeout="1500" :value="true" v-model="notificacionValidad" color="green" absolute top shaped transition="scroll-y-transition">
        {{ mensajeNoificacion }}
    </v-snackbar>

    <v-snackbar :timeout="1500" :value="true" v-model="notificacionError" color="red" absolute top shaped transition="scroll-y-transition">
            {{ mensajeNoificacion }}
    </v-snackbar>


    </v-form>


</template>

<script>
import html2Canvas from "html2canvas"
import  jsPDF  from "jspdf";

export default {

    props: ['cerrarDialogo'],
     data: () => ({
         solicitud:{
                    folio: '',
                    beneficiario: '',
                    puesto: '',
                    descripcion: '',
                    importe: '0.00',
                    idUsuario:  1,
                    idEmpresa: 1,
         },
         formatosId : 3 ,
         formatoNuevo: '' ,
         notificacionValidad: false,
        notificacionError: false,
        mensajeNoificacion: '',

        show1: false,
                letras: [
                    v => /^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/g.test(v) || 'Solo letras',
                ],
                materno: [
                    v => {
                         if (v == undefined ) return true;
                         if( v.length == 0  ) return true;
                         if( /^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/g.test(v) ){
                             return true;
                         }else{
                             return 'Solo letras';
                         }
                    }
                ],
                contraseña: [
                    v => !!v || 'Contraseña requerida',
                    v => v.length >= 8 || 'Cantidad minima es de 8 caracteres',
                ],
                celular: [
                    v => !!v || 'Numero celular no valido',
                     v => { if (!isNaN(v)) return true; return "No es un numero";},
                    v => v.length >= 10 || 'Cantidad minima es de 10 digitos'

                ],
                minimo: [
                    v => !!v || 'El minimo es de 3',
                    v => /^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/g.test(v) || 'Solo letras',
                    v => v.length >= 3 || 'Cantidad minima es de 3 caracteres',
                ],
                email: [
                    v => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(v) || 'Correo no valido ',
                ],

     }),

     created(){
         this.obetenerFormato();
     },
     methods:{
         EnviarNuevo(){
              if (this.$refs.form.validate()) {

                       const usuario  = JSON.parse(  localStorage.getItem('_usuario' ));
                       const empresa  = JSON.parse(  localStorage.getItem('_empresa' ));

                        this.solicitud.idUsuario = usuario.id;
                        this.solicitud.idEmpresa = empresa.id;

                axios.post('../api/egresos/crearSolicitud',this.solicitud)
                .then(response => {

                        this.obetenerFormato();


                        this.formatoNuevo  =
                        this.formatoNuevo.replace('@empresa' ,empresa.nombre )
                        .replace('@empresa' ,empresa.nombre )
                        .replace('@fecha' ,'06/09/2021' )
                        .replace('@presidente' , 'PRESIDENTE' )
                        .replace('@nombre' ,this.solicitud.beneficiario )
                        .replace('@puesto' ,this.solicitud.puesto )
                        .replace('@concepto' ,  this.solicitud.descripcion )
                        .replace('@nombre' ,this.solicitud.beneficiario )
                        .replace('@puesto' ,this.solicitud.puesto )
                        ;



                       //  window.html2canvas = html2canvas;

                        const doc = new jsPDF("p", "pt" , "a4");
                        doc.html(this.formatoNuevo ,  {
                                callback: function(pdf){
                                    pdf.save("opcion2.pdf")
                                }
                        }  );




                    this.cerrarDialogo.value = false;
                    this.$emit("Guardado");
                }).catch( error => {
                   this.mostrarNoificacion("No es posible guardar ", true);
                   console.log(error);

                });
              }else{
                  this.mostrarNoificacion("Por favor rellene todos lo campos ", true);

              }

         },
         mostrarNoificacion(mensaje, esError) {
            this.mensajeNoificacion = mensaje;
            if (esError) {

                this.notificacionError = true;

            } else {
                this.notificacionValidad = true;
            }

        },
        obetenerFormato(){


            axios.get('../api/formatos/'+ this.formatosId)
                .then(response => {





                    this.formatoNuevo  = response.data[0].formatoHtml;
                }).catch(error => {
                    this.mostrarNoificacion('No es posible cargar de '+this.titulo, true);
                });

        }

     }




}
</script>
