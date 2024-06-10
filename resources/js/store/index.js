import Vue  from 'vue'
import Vuex from 'vuex'




Vue.use(Vuex);


export default new Vuex.Store({

  state:{
        sesion: false,
        menuMostrar: false,
        user: {},
        roles: {},
        empresa:{},
        sistema:{},
        menus:{},





  },
  mutations: {
    setAutentification(state, value ){
        state.sesion = value;
    },
    setUser(state, value ){
        state.user = value;
    },
    setEmpresa(state, value ){
        state.empresa = value;
    },
    setSistema(state, value ){
        state.sistema = value;
    },
    setMenuMostrar(state, value ){
        state.menuMostrar = value;
    },
    setRoles(state, value ){
        state.roles = value;
    },
    setMenu(state,value){
        state.menus = value;
    }


  },
  actions: {


  },
  getters: {





  }


})
