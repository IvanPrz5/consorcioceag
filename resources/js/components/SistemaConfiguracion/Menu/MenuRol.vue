<template>
<div>

    <v-container>
        <v-row>
            <v-col cols="12" md="4">

                <v-card color="#1F7087">
                    <div class=" justify-space-between">
                        <div>
                            <v-card-title class=" white--text" color="black">SELECCIONE UN ROLE</v-card-title>

                            <v-list>

                                <v-list-item-group>
                                    <v-list-item v-for="(rol, i) in roles" :key="i" @click="cambioRol(rol)">

                                        <v-list-item-content>
                                            <v-list-item-title v-text="rol.descripcion"></v-list-item-title>
                                        </v-list-item-content>
                                    </v-list-item>
                                </v-list-item-group>
                            </v-list>

                            <v-card-actions>

                            </v-card-actions>

                        </div>

                    </div>
                </v-card>
            </v-col>
            <v-col cols="12" md="4">
                <v-card color="red">
                    <div class=" justify-space-between">
                        <div>
                            <v-card-title v-if="selectRol == null" class=" white--text">SELECCIONE UN MENU </v-card-title>
                            <v-card-title v-else class=" white--text ">MENU DE {{ selectRol.descripcion }} </v-card-title>

                            <v-list v-if=" menu != null ">

                                <v-list-item-group>
                                    <v-list-item v-for="(menuPrincipal, i) in menu" :key="i" @click="cambioMenu(menuPrincipal)">

                                        <v-list-item-icon>
                                            <v-icon v-text="menuPrincipal.icono"></v-icon>
                                        </v-list-item-icon>
                                        <v-list-item-content>

                                            <v-list-item-title v-text="menuPrincipal.descripcion"></v-list-item-title>
                                            <v-list-item-subtitle v-text="menuPrincipal.sistema"></v-list-item-subtitle>

                                        </v-list-item-content>

                                    </v-list-item>
                                </v-list-item-group>
                            </v-list>

                            <v-card-actions>



                                <v-dialog  v-if="selectRol != null">
                                    <template v-slot:activator="{ on, attrs }">

                                        <v-btn class="mx-2" fab dark small color="primary" v-bind="attrs" v-on="on"  @click="cambioTipoMenu(1)">
                                            <v-icon dark>
                                                mdi-plus
                                            </v-icon>



                                        </v-btn>
                                    </template>
                                    <template v-slot:default="dialog">
                                        <v-card>
                                        <SeleccionarMenu  :cerrarDialogo ="dialog"    :tipoMenu="1"  @menuSeleccionado="menuSeleccionado"></SeleccionarMenu>
                                    </v-card>
                                    </template>
                                </v-dialog>



                                <v-spacer></v-spacer>
                                <v-btn v-if="selectMenu != null" class="mx-2" fab dark small color="ceagNaranja" @click="eliminarMenu(selectMenu.idRelacion , 1)">
                                    <v-icon dark>
                                        mdi-minus
                                    </v-icon>
                                </v-btn>

                            </v-card-actions>

                        </div>

                    </div>
                </v-card>

            </v-col>
            <v-col cols="12" md="4">

                <v-card color="blue">
                    <div class="justify-space-between">
                        <div>
                            <v-card-title v-if="selectMenu == null " class=" white--text">SELECCIONE UN SUB MENU</v-card-title>
                            <v-card-title v-else class=" white--text">SUB MENU DE {{selectMenu.descripcion}}</v-card-title>

                            <v-list v-if=" subMenu != null ">

                                <v-list-item-group>
                                    <v-list-item v-for="(submenus, i) in subMenu" :key="i" @click="cambioSubMenu(submenus)">
                                        <v-list-item-icon>
                                            <v-icon v-text="submenus.icono"></v-icon>
                                        </v-list-item-icon>
                                        <v-list-item-content>
                                            <v-list-item-title v-text="submenus.descripcion"></v-list-item-title>

                                            <v-list-item-subtitle v-text="submenus.sistema" color="primary"></v-list-item-subtitle>

                                        </v-list-item-content>

                                    </v-list-item>
                                </v-list-item-group>
                            </v-list>

                            <v-card-actions>


                            <v-dialog  v-if="selectMenu != null">
                                    <template v-slot:activator="{ on, attrs }">

                                        <v-btn class="mx-2" fab dark small color="primary" v-bind="attrs" v-on="on"  @click="cambioTipoMenu(2)">
                                            <v-icon dark>
                                                mdi-plus
                                            </v-icon>



                                        </v-btn>
                                    </template>
                                    <template v-slot:default="dialog">
                                        <v-card>
                                        <SeleccionarMenu  :cerrarDialogo ="dialog"    :tipoMenu="1"  @menuSeleccionado="menuSeleccionado"></SeleccionarMenu>
                                    </v-card>
                                    </template>
                                </v-dialog>


                                <v-spacer></v-spacer>
                                <v-btn v-if="selectSubMenu != null" class="mx-2" fab dark small color="ceagNaranja" @click="eliminarMenu(selectSubMenu.idRelacion, 2)">
                                    <v-icon dark>
                                        mdi-minus
                                    </v-icon>
                                </v-btn>

                            </v-card-actions>
                        </div>

                    </div>
                </v-card>
            </v-col>
        </v-row>

    </v-container>

</div>
</template>

<script>
export default {

    data: () => ({
        roles: {},
        menu: null,
        subMenu: null,
        selectRol: null,
        selectMenu: null,
        selectSubMenu: null,
        tipoMenu: null ,

    }),
    created() {
        this.cargaRoles();
    },
    watch: {

    },
    methods: {
        cargaRoles() {

            axios.get('/api/roles')
                .then(response => {
                    this.roles = response.data;
                }).catch(error => {
                    console.log('error  roles ' + error)
                });
        },
        cambioRol(rol) {

            this.selectRol = rol;
            this.selectMenu = null;
            this.selectSubMenu = null;
            this.subMenu = null;
            this.cargaMenu();

        },

        cambioMenu(menu) {

            this.selectMenu = menu;
            console.log(menu);
            this.selectSubMenu = null;
            this.cargaSubMenu();

        },
        cambioSubMenu(subMenu) {
            this.selectSubMenu = subMenu;
        },

        cargaMenu() {

            try {

                axios.get('/api/menu/menuPrincipal/' + this.selectRol.id)
                    .then(response => {
                        this.menu = response.data;
                    }).catch(error => {
                        return null;
                    });

            } catch (e) {

                return null;
            }

        },
        cargaSubMenu() {

            try {

                axios.get('/api/menu/subMenuPrincipal/' + this.selectRol.id + '/' + this.selectMenu.id)
                    .then(response => {

                        this.subMenu = response.data;
                    }).catch(error => {
                        console.log(error)
                    });

            } catch (e) {

                console.log(e)

            }

        },
        eliminarMenu(id, tipoMenu) {
            try {

                axios.delete('/api/menu/eliminar/' + id)
                    .then(response => {

                        response.data;
                    }).catch(error => {
                        console.log(error)
                    });

                if (tipoMenu == 1) {
                    this.cargaMenu();
                    this.selectMenu = null;
                    this.subMenu = null;
                    this.selectSubMenu = null;
                } else {

                    this.cargaSubMenu()
                    this.selectSubMenu = null;

                }

            } catch (e) {

                console.log(e)

            }

        },
        asiganarMenu(id , tipoMenu, idMenuDepende , idRol) {
            try {

                axios.post('/api/menu/agregar/' + id + '/' + tipoMenu + '/'  + idMenuDepende + '/' + idRol)
                    .then(response => {

                        response.data;
                    }).catch(error => {
                        console.log(error)
                    });

                if (tipoMenu == 1) {
                    this.cargaMenu();
                    this.selectMenu = null;
                    this.subMenu = null;
                    this.selectSubMenu = null;
                } else {

                    this.cargaSubMenu()
                    this.selectSubMenu = null;

                }
            } catch (e) {

                console.log(e)

            }


        },
        menuSeleccionado(id){


                if(this.tipoMenu == 1){
                     this.asiganarMenu(id, this.tipoMenu , 0 , this.selectRol.id );
                }else{
                     this.asiganarMenu(id, this.tipoMenu , this.selectMenu.id , this.selectRol.id    );
                }


        },
        cambioTipoMenu(tipoMenu){
            this.tipoMenu = tipoMenu;




        }


    }
}
</script>
