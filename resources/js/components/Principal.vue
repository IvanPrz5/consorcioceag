<template>
<div class="justify-center" >
    <h1 class="text-center">Bienvenido al {{this.$store.state.empresa.nombre }}   </h1>

    <div class="d-flex flex-column justify-space-between align-center">
                    <v-img    class="align-self-stretch"  max-height="500"   max-width="500" :src="this.$store.state.empresa.logo"></v-img>
    </div>

    <p class="text-center" outlined>Seleccione una opcion del menu</p>

  

</div>

</template>
</template>

<script>

export default {

    data() {
        return {

            notificacion : false ,
            notificacion2 : false,

        }

    },
    methods: {
        menu () {
                this.notificacion = !this.notificacion;
        },
        menu2() {
                this.notificacion2 = !this.notificacion2;
    }

},

}
</script>
