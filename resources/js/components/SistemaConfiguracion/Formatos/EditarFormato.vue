<template>
<v-form ref="form" enctype="multipart/form-data">

    <v-container>

        <v-row>


            <v-col cols="12">
                <v-text-field v-model="formato.nombre" :rules="letrasYnumeros" placeholder="nombre del formato " label="Nombre del formato" outlined clearable prepend-inner-icon="mdi-map-marker" counter required></v-text-field>
            </v-col>




            <v-col cols="12" md="4"  >


                     <v-combobox
                        :items="sistemasItem"
                        label="Sistemas"
                        outlined
                        dense
                        v-model="sistemaNombre"
                        item-text="nombre"
                        item-value="id"
                        @change="sistemaId"
                          small-chips
                    ></v-combobox>



            </v-col>

            <v-col cols="12"   height= "600px"  >
                <ckeditor   class="mx-auto"       width="650px"  :editor="editor" @ready="onReady"  v-model="formato.formatoHtml"    height= "600px"  style="border:solid; border-color:black; border-width:1px; " ></ckeditor>
            </v-col>

            <v-col cols="12" md="2" >
                <v-switch v-model="formato.estatus" inset clearable></v-switch>
            </v-col>


        </v-row>

        <v-btn color="ceagAzul" @click="Nuevo">
            Guardar
        </v-btn>
        <v-progress-linear v-if="barraActiva" indeterminate color="yellow darken-2"></v-progress-linear>

    </v-container>

    <v-snackbar :timeout="1500" v-model="notificacionValidad" color="green" absolute centered shaped transition="scroll-y-transition">
        {{ mensajeNoificacion }}
    </v-snackbar>

    <v-snackbar :timeout="1500" v-model="notificacionError" color="red" absolute centered shaped transition="scroll-y-transition">
        {{ mensajeNoificacion }}
    </v-snackbar>

</v-form>
</template>

<script>
 // import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
 import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';

export default {
    props: ["cerrarDialogo","cerrarDialogo" , "nombre", "sistema" , "html" ,"estatus", "id"],
    data: () => ({
        formato: {
                    id: 0,
                    nombre: '',
                    formatoHtml:'',
                    idSistema:'',
                    estatus: true,
        },
        sistemasItem: [],
        sistemaNombre: '',

           editor: DecoupledEditor,

        barraActiva: false,
        notificacionValidad: false,
        notificacionError: false,
        mensajeNoificacion: '',
        show1: false,

        letrasYnumeros: [
            v => !!v || 'Requerido',
            v => /^[A-Za-zÁÉÍÓÚáéíóúñÑ0-9 ]+$/g.test(v) || 'Solo letras y numeros',
        ],


    }),
    created(){



this.sistemas();


        this.formato.id = this.id;
        this.formato.nombre = this.nombre;
        this.sistemaNombre = this.sistema;
        this.formato.formatoHtml = this.html;
        this.formato.estatus = this.estatus;



    },
    methods: {
        Nuevo() {
            if (this.$refs.form.validate()) {

                this.barraActiva = true;


                axios.post('/api/formatos/editarFormato', this.formato)
                    .then(response => {
                        console.log(response);
                        this.mostrarNoificacion("Nuevo Formato", false);
                        this.barraActiva = false;
                        this.cerrarDialogo.value = false;
                        this.$refs.form.resetValidation();
                        this.$emit("Guardado")
                    }).catch(error => {
                        this.mostrarNoificacion("No es posible guardar el Menu", true);
                        this.barraActiva = false;
                    });

            } else {
                this.mostrarNoificacion("Por favor rellene todos lo campos ", true);
            }

        },
        sistemas(){
                 axios.get('/api/sistemas')
                .then(response => {
                    this.sistemasItem = response.data;

                    for ( let  i in this.sistemasItem) {


                                if(this.sistemasItem[i].nombre === ( this.sistema   )){


                                        this.formato.idSistema = this.sistemasItem[i].id;

                                }



                    }


                }).catch(error => {
                    this.mostrarNoificacion(error, true);
                });

        },
        mostrarNoificacion(mensaje, esError) {
            this.mensajeNoificacion = mensaje;
            if (esError) {

                this.notificacionError = true;

            } else {
                this.notificacionValidad = true;
            }

        },



        sistemaId(item){

             this.formato.idSistema = item.id;
        },
         onReady( editor )  {
                // Insert the toolbar before the editable area.


                editor.ui.getEditableElement().parentElement.insertBefore(
                    editor.ui.view.toolbar.element,
                    editor.ui.getEditableElement()
                );
            }


    }

}
</script>

