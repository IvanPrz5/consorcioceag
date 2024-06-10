/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue').default;
import CKEditor from '@ckeditor/ckeditor5-vue2';
import vuetify from './vuetify';


import VueRouter from 'vue-router';

import router from './Router/index';



Vue.use( CKEditor );



Vue.use(VueRouter);



import store from './store'
import Vue from 'vue';





Vue.component('menu-component', require('./components/Menu.vue').default);
Vue.component('menudrawer', require('./components/menuPrincipal/drawerMenu.vue').default);

Vue.component('crearSistema', require('./components/SistemaConfiguracion/Sistemas/CrearSistema.vue').default);
Vue.component('editarSistema', require('./components/SistemaConfiguracion/Sistemas/EditarSistema.vue').default);



Vue.component('crearUsuario', require('./components/SistemaConfiguracion/Usuario/CrearUsuario.vue').default);
Vue.component('editarUsuario', require('./components/SistemaConfiguracion/Usuario/EditarUsario.vue').default);

Vue.component('UsuariosRoles', require('./components/SistemaConfiguracion/Usuario/UsuariosRoles.vue').default);

Vue.component('UsuariosSistemas', require('./components/SistemaConfiguracion/Usuario/UsuarioSistemas.vue').default);

Vue.component('UsuariosEmpresas', require('./components/SistemaConfiguracion/Usuario/UsuarioEmpresas.vue').default);


Vue.component('CrearEmpresas', require('./components/SistemaConfiguracion/Empresas/CrearEmpresa.vue').default);
Vue.component('EditarEmpresas', require('./components/SistemaConfiguracion/Empresas/EditarEmpresa.vue').default);


Vue.component('CrearRol', require('./components/SistemaConfiguracion/Roles/CrearRol.vue').default);
Vue.component('EditarRol', require('./components/SistemaConfiguracion/Roles/EditarRol.vue').default);


Vue.component('CrearMenu', require('./components/SistemaConfiguracion/Menu/CrearMenu.vue').default);
Vue.component('EditarMenu', require('./components/SistemaConfiguracion/Menu/EditarMenu.vue').default);
Vue.component('SeleccionarMenu', require('./components/SistemaConfiguracion/Menu/SeleccionMenu.vue').default);


Vue.component('CrearFormato', require('./components/SistemaConfiguracion/Formatos/CrearFormatos.vue').default);
Vue.component('MostrarFormato', require('./components/SistemaConfiguracion/Formatos/MostrarFormato.vue').default);
Vue.component('EditarFormato', require('./components/SistemaConfiguracion/Formatos/EditarFormato.vue').default);


Vue.component('CrearOrganigrama', require('./components/SistemaConfiguracion/Organigrama/CrearOrganigrama.vue').default);
Vue.component('EditarOrganigrama', require('./components/SistemaConfiguracion/Organigrama/EditarOrganigrama.vue').default);


 // sistema de eghresos
Vue.component('EgresosCrearSolicitud', require('./components/Sistemas/Egresos/Solicitud/CrearSolicitud.vue').default);
Vue.component('EgresoCaptura', require('./components/Sistemas/Egresos/Captura/CapturaEgreso.vue').default);
Vue.component('EgresoFotos', require('./components/Sistemas/Egresos/Captura/FotosEgreso.vue').default);
Vue.component('EgresoEditarSolicitud', require('./components/Sistemas/Egresos/Captura/EditarEgreso.vue').default);













// login
// Vue.component('login', require('./components/login/login.vue').default);

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

const app = new Vue({
    el: '#app',
    vuetify,
    store,
    router,

});
