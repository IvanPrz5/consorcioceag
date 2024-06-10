<template>
<v-navigation-drawer app v-if="$store.state.menuMostrar" width="450">

    <v-card class="mx-auto">
        <v-list-item>
            <v-list-item-content>
                <v-list-item-title class="title"> {{ $store.state.empresa.nombre }} </v-list-item-title>
                <v-list-item-subtitle>
                    {{ $store.state.sistema.nombre }}
                </v-list-item-subtitle>
            </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>

        <v-sheet class="pa-4 ">
        <v-text-field
            v-model="search"
            label="Buscar en menu"
            flat
            hide-details
            clearable
            clear-icon="mdi-close-circle-outline"
        ></v-text-field>

        </v-sheet>


        <v-card class="mx-auto" max-width="500">
            <v-sheet class="pa-4 ">
            </v-sheet>
            <v-card-text>
                <v-treeview  v-model="items"  v-if="$store.state.menus.length > 0"
                :active.sync="active"
                :open.sync="open"

                :items="$store.state.menus"
                 activatable
                 color="primary"
                 open-on-click
                 transition
                 return-object
                 @update:active="test"

                 :search="search"
                 :filter="filter"

                 >

                <template v-slot:prepend="{ item }">
                        <v-icon >
                            {{item.icono}}
                        </v-icon>
                </template>

                </v-treeview>
            </v-card-text>

        </v-card>









    </v-card>

</v-navigation-drawer>
</template>

<script>
export default {
    data: () => ({
        active: [],
        open: [],
        users: [],
        items:[],
        search: null,
         caseSensitive: false,
    }),

    computed: {
         filter () {
        return
           (item, search, textKey) => item[textKey].indexOf(search) > -1 ;
      },
    },

    watch: {
        selection(newValue) {


        }

    },

    methods: {
            test(item) {
                    if (  item[0] === undefined    ){
                         console.log(  'undefined'   );
                    }else{
                             this.$router.replace(item[0].ruta );
                    }
            },
    },
}
</script>
