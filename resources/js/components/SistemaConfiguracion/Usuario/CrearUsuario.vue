<template>
    <v-form ref="form">
    <v-container>
      <v-row>
        <v-col
          cols="12"
          md="4"
          sm="4"
        >
                 <v-text-field
            v-model="usuario.nombre"
            label="Nombre"
            outlined
            clearable
            prepend-inner-icon="mdi-map-marker"
            :rules="minimo"
            counter
            required
          ></v-text-field>

        </v-col>
        <v-col
          cols="12"
          md="4"
          sm="4"
        >
                 <v-text-field
            v-model="usuario.paterno"
            label="Paterno"
            outlined
            clearable
            prepend-inner-icon="mdi-map-marker"
            :rules="minimo"
            counter
            required
          ></v-text-field>

        </v-col>
        <v-col
          cols="12"
          md="4"
          sm="4"
        >
          <v-text-field
            v-model="usuario.materno"
            label="Materno"
            :rules ="materno"
            outlined
            clearable
            prepend-inner-icon="mdi-map-marker"
            counter

          ></v-text-field>

        </v-col>


        <v-col
          cols="12"
          md="6"
          sm="4"
        >
                 <v-text-field
            v-model="usuario.celular"
            label="Numero Celular"
            outlined
            clearable
             prepend-inner-icon="mdi-map-marker"
            :rules="celular "
            counter
            required
          ></v-text-field>

        </v-col>

        <v-col
          cols="12"
          md="6"
          sm="4"
        >
                 <v-text-field
            v-model="usuario.email"
            label="Correo Electronico"
            outlined
            clearable
                   prepend-inner-icon="mdi-map-marker"
            :rules="email "
            counter
            required
          ></v-text-field>

        </v-col>

        <v-col
          cols="12"
          md="6"
          sm="4"
        >


        <v-text-field  v-model="usuario.password" :rules="contraseña "
        prepend-inner-icon="mdi-account-key" outlined :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
        :type="show1 ? 'text' : 'password'"  label="Contraseña" hint="Minimo de 8 Caracteres"
        counter @click:append="show1 = !show1" required >
        </v-text-field>
        </v-col>


       <v-col
          cols="12"
          md="6"
          sm="4"
        >
                 <v-switch
        v-model="usuario.estatus"
        inset
        clearable
        ></v-switch>

        </v-col>

      </v-row>

        <v-btn color="ceagAzul" @click="EnviarNuevoUsuario">
                Guardar
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


export default {
     data: () => ({
         usuario:{
                    nombre: '',
                    paterno: '',
                    materno: '',
                    celular: '',
                    email: '',
                    password: '',
                    estatus: true,
         },
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
     methods:{
         EnviarNuevoUsuario(){
              if (this.$refs.form.validate()) {
                axios.post('/api/usuarios',this.usuario)
                .then(response => {

                    this.usuario.nombre =  ''
                    this.usuario.paterno =  ''
                    this.usuario.materno =  ''
                    this.usuario.celular = ''
                    this.usuario.email =  ''
                    this.usuario.password = ''
                    this.usuario.estatus =  true
                    this.$refs.form.resetValidation()
                    this.$emit("usuarioGuardado")
                }).catch( error => {
                   this.mostrarNoificacion("No es posible guardar el usuario", true);
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

     }




}
</script>
