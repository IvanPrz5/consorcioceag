import store from './store';


// funcion para validar el login y redirecionar las paginas
function validaLogin(to, from , next){
    if(store.state.sesion){
        next();
        }else{
            next('/login');
        }
}

const routes = [
    {
      path: '/',
      component: () => import('./components/Inicio.vue'),
      name: 'inicio'
    },
    {
        path: '/login',
        component: () => import('./components/login/Login.vue'),
        name: 'login'
      },
      {
        path: '/CrearUsuario',
        component: () => import('./components/login/Crear.vue'),
        name: 'CrearUsuario'
      },




     {
        path: '/Principal',
        component: () => import('./components/Principal.vue'),
        name: 'principal',
        beforeEnter: ( to, from , next  )=>{

            validaLogin(to, from , next);

        }
      },

      {
        path: '/SeleccionEmpresas',
        component: () => import('./components/login/Empresas.vue'),
        name: 'SeleccionEmpresas',
        beforeEnter: ( to, from , next  )=>{
            validaLogin(to, from , next);
        }
      },
      {
        path: '/SeleccionSistemas',
        component: () => import('./components/login/Sistemas.vue'),
        name: 'SeleccionSistemas',
        beforeEnter: ( to, from , next  )=>{
            validaLogin(to, from , next);
        }
      },


    // SISTEMA DE CONFIGURACION
    { // pagina
        path: "/usuarios",
        component: () => import('./components/SistemaConfiguracion/Usuario/Usuario.vue'),
        name: 'usuarios'
    },
    { // pagina
        path: "/empresa",
        component: () => import('./components/SistemaConfiguracion/Empresas/Empresas.vue'),
        name: 'empresas',

    },


    { // pagina
        path: "/roles",
        component: () => import('./components/SistemaConfiguracion/Roles/Roles.vue'),
        name: 'roles',

    },

    { // pagina
        path: "/menus",
        component: () => import('./components/SistemaConfiguracion/Menu/Menu.vue'),
        name: 'menus',

    },

    { // pagina
        path: "/sistemas",
        component: () => import('./components/SistemaConfiguracion/Sistemas/Sistemas.vue'),
        name: 'sistemas',

    },


    { // pagina
        path: "/menuRoles",
        component: () => import('./components/SistemaConfiguracion/Menu/MenuRol.vue'),
        name: 'menuRoles',

    },

    { // pagina
        path: "/formatos",
        component: () => import('./components/SistemaConfiguracion/Formatos/Formatos.vue'),
        name: 'formatos',

    },
    { // pagina
        path: "/organigrama",
        component: () => import('./components/SistemaConfiguracion/Organigrama/organigrama2.vue'),
        name: 'organigrama',

    },






    // sistem  a de egresos

    { // pagina
        path: "/egresos/solicitudes",
        component: () => import('./components/Sistemas/Egresos/Solicitud/Solicitudes.vue'),
        name: 'egresosSolicitus',

    },
    { // pagina
        path: "/egresos/capturaEgreso",
        component: () => import('./components/Sistemas/Egresos/Captura/ReciboEgreso.vue'),
        name: 'egresosCapturaSolicitud',

    },

    { // pagina
        path: "/egresos/organigrama",
        component: () => import('./components/Sistemas/Egresos/OrganigramaRelacion.vue'),
        name: 'egresosOrganigrama',

    },





      { // pagina
        path: "/:catchAll(.*)",
        component: () => import('./components/NotFound/NotFound.vue'),
      },










  ]

  export default routes;
