"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[996],{9996:(t,i,a)=>{a.r(i),a.d(i,{default:()=>n});const o={data:function(){return{titulo:"Menu",notificacionValidad:!1,notificacionError:!1,colorNotificacion:"green",mensajeNoificacion:"",dialogDelete:!1,seleccionado:{},headers:[{text:"Id",value:"id"},{text:"Descripcion",value:"descripcion"},{text:"Sistema",value:"sistema_nombre"},{text:"Icono",value:"icono"},{text:"Ruta",value:"ruta"},{text:"Estatus",value:"estatus"},{text:"Editar",value:"actions",sortable:!1}],items:[],buscar:""}},created:function(){this.initialize()},methods:{initialize:function(){var t=this;axios.get("/consorcioceag/public/api/menu/allMenus").then((function(i){t.items=i.data})).catch((function(i){t.mostrarNoificacion("No es posible cargar de "+t.titulo,!0)}))},Guardado:function(){this.mostrarNoificacion("Guardado con exito",!1),this.initialize()},usuarioEditarGuardado:function(){this.mostrarNoificacion("Editado Exitoso",!1),this.initialize()},mostrarNoificacion:function(t,i){this.mensajeNoificacion=t,i?this.notificacionError=!0:this.notificacionValidad=!0},cambioEstatus:function(t){this.dialogDelete=!0,this.seleccionado=t},noBorrar:function(){this.initialize(),this.dialogDelete=!1},borrar:function(){var t=this;axios.delete("/consorcioceag/public/api/menu/borrar/"+this.seleccionado.id).then((function(i){t.dialogDelete=!1,t.mostrarNoificacion("  ESTATUS ACTUALIZADO",!1),t.initialize()})).catch((function(i){console.log("error  usuario "+i),t.dialogDelete=!1,t.mostrarNoificacion("  ESTATUS  NO ACTUALIZADO",!0),t.initialize()}))}}};const n=(0,a(4486).A)(o,(function(){var t=this,i=t._self._c;return i("div",[i("v-data-table",{staticClass:"elevation-1",attrs:{headers:t.headers,items:t.items,search:t.buscar},scopedSlots:t._u([{key:"top",fn:function(){return[i("v-toolbar",[i("v-toolbar-title",[t._v(t._s(t.titulo))]),t._v(" "),i("v-text-field",{staticClass:"pt-6 pl-6",attrs:{name:"name",label:"Buscar",id:"id","append-icon":"mdi-magnify"},model:{value:t.buscar,callback:function(i){t.buscar=i},expression:"buscar"}}),t._v(" "),i("v-spacer"),t._v(" "),i("v-divider",{staticClass:"mx-4",attrs:{inset:"",vertical:""}}),t._v(" "),i("v-dialog",{attrs:{transition:"scroll-y-transition","max-width":"1200"},scopedSlots:t._u([{key:"activator",fn:function(a){var o=a.on,n=a.attrs;return[i("v-btn",t._g(t._b({attrs:{color:"primary"}},"v-btn",n,!1),o),[t._v("Nuevo "+t._s(t.titulo))])]}},{key:"default",fn:function(a){return[i("v-card",[i("v-toolbar",{attrs:{color:"primary",dark:""}},[t._v("NUEVOS  "+t._s(t.titulo.toUpperCase())+" "),i("v-spacer"),t._v(" "),i("v-btn",{attrs:{text:""},on:{click:function(t){a.value=!1}}},[t._v("X")])],1),t._v(" "),i("crearMenu",{attrs:{cerrarDialogo:a},on:{Guardado:t.Guardado}}),t._v(" "),i("v-card-actions",{staticClass:"justify-end"})],1)]}}])}),t._v(" "),i("v-dialog",{attrs:{"max-width":"500px"},model:{value:t.dialogDelete,callback:function(i){t.dialogDelete=i},expression:"dialogDelete"}},[i("v-card",[i("v-card-title",{staticClass:"text-h5"},[t._v("ESTA SEGURO CAMBIAR ESTATUS ?")]),t._v(" "),i("v-card-actions",[i("v-spacer"),t._v(" "),i("v-btn",{attrs:{color:"blue darken-1",text:""},on:{click:function(i){return t.noBorrar()}}},[t._v("Cancel")]),t._v(" "),i("v-btn",{attrs:{color:"blue darken-1",text:""},on:{click:function(i){return t.borrar()}}},[t._v("OK")]),t._v(" "),i("v-spacer")],1)],1)],1)],1)]},proxy:!0},{key:"item.icono",fn:function(a){var o=a.item;return[i("div",[i("v-icon",[t._v("\r\n                            "+t._s(o.icono)+"\r\n                        ")])],1)]}},{key:"item.estatus",fn:function(a){var o=a.item;return[i("div",[i("v-switch",{on:{click:function(i){return t.cambioEstatus(o)}},model:{value:o.estatus,callback:function(i){t.$set(o,"estatus",i)},expression:"item.estatus"}})],1)]}},{key:"item.actions",fn:function(a){var o=a.item;return[i("v-dialog",{attrs:{"max-width":"1200"},scopedSlots:t._u([{key:"activator",fn:function(a){var o=a.on,n=a.attrs;return[i("v-icon",t._g(t._b({staticClass:"pr-2",attrs:{color:"secondary",dark:""}},"v-icon",n,!1),o),[t._v("\r\n                        mdi-pencil\r\n                    ")])]}},{key:"default",fn:function(a){return[i("v-card",[i("v-toolbar",{attrs:{color:"primary",dark:""}},[t._v("EDITAR "+t._s(t.titulo.toUpperCase())+" "+t._s(o.email)+"\r\n                            "),i("v-spacer"),t._v(" "),i("v-btn",{attrs:{text:""},on:{click:function(t){a.value=!1}}},[t._v("X")])],1),t._v(" "),i("br"),t._v(" "),i("EditarMenu",{attrs:{cerrarDialogo:a,menuEntrada:o},on:{Guardado:t.Guardado}}),t._v(" "),i("v-card-actions",{staticClass:"justify-end"})],1)]}}],null,!0)})]}},{key:"no-data",fn:function(){return[i("v-btn",{attrs:{color:"primary"},on:{click:t.initialize}},[t._v("\r\n                Reset\r\n            ")])]},proxy:!0}])}),t._v(" "),i("v-snackbar",{attrs:{timeout:1500,value:!0,color:"green",absolute:"",top:"",shaped:"",transition:"scroll-y-transition"},model:{value:t.notificacionValidad,callback:function(i){t.notificacionValidad=i},expression:"notificacionValidad"}},[t._v("\r\n        "+t._s(t.mensajeNoificacion)+"\r\n    ")]),t._v(" "),i("v-snackbar",{attrs:{timeout:1500,value:!0,color:"red",absolute:"",top:"",shaped:"",transition:"scroll-y-transition"},model:{value:t.notificacionError,callback:function(i){t.notificacionError=i},expression:"notificacionError"}},[t._v("\r\n        "+t._s(t.mensajeNoificacion)+"\r\n    ")])],1)}),[],!1,null,null,null).exports}}]);