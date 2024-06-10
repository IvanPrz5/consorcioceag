(self.webpackChunk=self.webpackChunk||[]).push([[826],{4826:(a,r,t)=>{"use strict";t.r(r),t.d(r,{default:()=>u});const o={data:function(){return{año:0,años:[],detalle:[],notificacionValidad:!1,notificacionError:!1,mensajeNoificacion:"",orgaTipo:[],orgaNuevo:null,nombreNuevo:"",nombreEditar:"",error:"",encabezado:[{text:"Nombre",value:"nombre"},{text:"Cargo",value:"descripcion"},{text:"Editar",value:"actions",sortable:!1}],letras:[function(a){return!!a||"Requerido"},function(a){return/^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/g.test(a)||"Solo letras"}],letrasPunto:[function(a){return!!a||"Requerido"},function(a){return/^[A-Za-zÁÉÍÓÚáéíóúñÑ .]+$/g.test(a)||"Solo letras"}]}},created:function(){this.año=(new Date).getUTCFullYear();for(var a=this.año-5;a<=this.año;a++)this.años.push(a);this.rellenarOrganigrama()},methods:{rellenarOrganigrama:function(){var a=this,r=JSON.parse(localStorage.getItem("_empresa"));axios.get("/consorcioceag/public/api/organigramaActivo/"+this.año+"/"+r.id).then((function(r){a.detalle=r.data})).catch((function(r){a.mostrarNoificacion("No es posible cargar de Organigrama",!0)}))},cargaOrganigramaDisponibles:function(){var a=this,r=JSON.parse(localStorage.getItem("_empresa"));axios.get("/consorcioceag/public/api/organigramaNoAsignado/"+this.año+"/"+r.id).then((function(r){a.orgaTipo=r.data})).catch((function(r){a.mostrarNoificacion("No es posible cargar de Organigrama",!0)}))},cambioDeAño:function(){this.rellenarOrganigrama()},mostrarNoificacion:function(a,r){this.mensajeNoificacion=a,r?this.notificacionError=!0:this.notificacionValidad=!0},nombreEditarText:function(a){this.nombreEditar=a},guardarNuevo:function(a){var r=this;if(this.$refs.formNuevo.validate()&&null!=this.orgaNuevo){var t=JSON.parse(localStorage.getItem("_empresa"));JSON.parse(localStorage.getItem("_usuario"));void 0===this.orgaNuevo.id?this.error="POR FAVOR COLOQUE UN AÑO VALIDO":axios.post("/consorcioceag/public/api/crearOrganigramaDetalle",{idEmpresa:t.id,idOrganigrama:this.orgaNuevo.id,año:this.año,nombre:this.nombreNuevo,estatus:!0}).then((function(t){r.rellenarOrganigrama(),r.orgaNuevo=null,r.nombreNuevo="",r.error="",a.value=!1})).catch((function(a){r.error="NO ES POSIBLE GUARDAR EL EMPLEADO"}))}else this.error="Rellnar todo los datos por favro"},editarItem:function(a,r){var t=this;this.$refs.formEditar.validate()?axios.post("/consorcioceag/public/api/editarOrganigramaDetalle",{id:r,nombre:this.nombreEditar}).then((function(r){t.rellenarOrganigrama(),t.nombreEditar=null,a.value=!1})).catch((function(a){t.mostrarNoificacion("No es posible editar  -",!0)})):this.mostrarNoificacion("Rellene todos los campos por favor",!0)},BorraItem:function(a,r){var t=this;axios.delete("/consorcioceag/public/api/borrarOrganigramaDetalle/"+r).then((function(r){t.rellenarOrganigrama(),a.value=!1})).catch((function(a){t.mostrarNoificacion("No es posible borrar-",!0)}))}}};var e=t(4486),i=t(5614),n=t.n(i),c=t(6390),s=t.n(c),l=(0,e.A)(o,(function(){var a=this,r=a._self._c;return r("div",[r("v-card",{staticClass:"mx-auto",attrs:{"max-width":"60%",elevation:"13"}},[r("v-list-item",{attrs:{"two-line":""}},[r("v-list-item-content",[r("v-list-item-title",{staticClass:"text-h5",attrs:{align:"center"}},[r("p",[a._v("Organigrama de Autoridades")])]),a._v(" "),r("v-list-item-subtitle",{attrs:{align:"center"}},[r("p",[a._v(a._s(a.año))])])],1)],1),a._v(" "),r("v-divider",{staticClass:"mx-4"}),a._v(" "),r("br"),a._v(" "),r("p",{attrs:{align:"center"}},[a._v("Seleccione un año")]),a._v(" "),r("v-combobox",{attrs:{"small-chips":"",dense:"",filled:"",outlined:"",items:a.años},on:{change:function(r){a.cambioDeAño()}},model:{value:a.año,callback:function(r){a.año=r},expression:"año"}}),a._v(" "),r("v-divider",{staticClass:"mx-4"}),a._v(" "),r("br"),a._v(" "),r("p",{attrs:{align:"center"}},[a._v("Listado de Organigrama")]),a._v(" "),r("v-dialog",{attrs:{transition:"dialog-bottom-transition","max-width":"600"},scopedSlots:a._u([{key:"activator",fn:function(t){var o=t.on,e=t.attrs;return[r("v-btn",a._g(a._b({attrs:{"x-small":"",color:"primary"},on:{click:function(r){return a.cargaOrganigramaDisponibles()}}},"v-btn",e,!1),o),[a._v("Agregar Nuevo")])]}},{key:"default",fn:function(t){return[r("v-card",[r("v-toolbar",{attrs:{color:"primary",dark:""}},[a._v("Nuevo Organigrama")]),a._v(" "),r("v-card-text",[r("v-form",{ref:"formNuevo",attrs:{enctype:"multipart/form-data"}},[r("v-container",[r("v-row",[r("v-col",{attrs:{cols:"12"}},[r("v-text-field",{attrs:{placeholder:"Ingrese el nombre que aparecera en el sistema",label:"Nombre",outlined:"",clearable:"","prepend-inner-icon":"mdi-map-marker",counter:"",required:""},model:{value:a.nombreNuevo,callback:function(r){a.nombreNuevo=r},expression:"nombreNuevo"}})],1),a._v(" "),r("v-col",{attrs:{cols:"12"}},[r("v-combobox",{attrs:{"small-chips":"",dense:"",filled:"",outlined:"",items:a.orgaTipo,"item-text":"descripcion","item-value":"id"},model:{value:a.orgaNuevo,callback:function(r){a.orgaNuevo=r},expression:"orgaNuevo"}})],1),a._v(" "),r("v-col",{attrs:{cols:"12"}},[r("p",{staticStyle:{color:"red"},attrs:{align:"center"}},[a._v(" "+a._s(a.error))])])],1)],1)],1)],1),a._v(" "),r("v-card-actions",{staticClass:"justify-end"},[r("v-btn",{attrs:{color:"error"},on:{click:function(a){t.value=!1}}},[a._v("Close")]),a._v(" "),r("v-btn",{attrs:{color:"primary"},on:{click:function(r){return a.guardarNuevo(t)}}},[a._v("Guardar")])],1)],1)]}}])}),a._v(" "),[r("v-data-table",{staticClass:"elevation-1",attrs:{headers:a.encabezado,items:a.detalle,"items-per-page":10},scopedSlots:a._u([{key:"item.actions",fn:function(t){var o=t.item;return[r("v-dialog",{attrs:{transition:"dialog-bottom-transition","max-width":"600"},scopedSlots:a._u([{key:"activator",fn:function(t){var e=t.on,i=t.attrs;return[r("v-icon",a._g(a._b({staticClass:"pr-2",attrs:{color:"secondary",dark:""},on:{click:function(r){return a.nombreEditarText(o.nombre)}}},"v-icon",i,!1),e),[a._v("\n                mdi-pencil\n              ")])]}},{key:"default",fn:function(t){return[r("v-card",[r("v-toolbar",{attrs:{color:"primary",dark:""}},[a._v("Editar Organigrama")]),a._v(" "),r("v-card-text",[r("v-form",{ref:"formEditar",attrs:{enctype:"multipart/form-data"}},[r("v-container",[r("v-row",[r("v-col",{attrs:{cols:"12"}},[r("v-text-field",{attrs:{placeholder:"Ingrese el nombre que aparecera en el sistema",label:"Nombre",outlined:"",clearable:"","prepend-inner-icon":"mdi-map-marker",counter:"",required:""},model:{value:a.nombreEditar,callback:function(r){a.nombreEditar=r},expression:"nombreEditar"}})],1)],1)],1)],1)],1),a._v(" "),r("v-card-actions",{staticClass:"justify-end"},[r("v-btn",{attrs:{color:"error"},on:{click:function(a){t.value=!1}}},[a._v("Close")]),a._v(" "),r("v-btn",{attrs:{color:"primary"},on:{click:function(r){return a.editarItem(t,o.id)}}},[a._v("Guardar")])],1)],1)]}}],null,!0)}),a._v(" "),r("v-dialog",{attrs:{transition:"dialog-bottom-transition","max-width":"600"},scopedSlots:a._u([{key:"activator",fn:function(t){var o=t.on,e=t.attrs;return[r("v-icon",a._g(a._b({staticClass:"pr-2",attrs:{color:"error",dark:""}},"v-icon",e,!1),o),[a._v("\n                mdi-delete\n              ")])]}},{key:"default",fn:function(t){return[r("v-card",[r("v-toolbar",{attrs:{color:"error ",dark:""}},[a._v("Borrar Organigrama")]),a._v(" "),r("v-card-text",[r("p",[a._v("ESTA SEGURO BORRAR "+a._s(o.nombre))])]),a._v(" "),r("v-card-actions",{staticClass:"justify-end"},[r("v-btn",{attrs:{color:"error"},on:{click:function(a){t.value=!1}}},[a._v("No")]),a._v(" "),r("v-btn",{attrs:{color:"primary"},on:{click:function(r){return a.BorraItem(t,o.id)}}},[a._v("Si")])],1)],1)]}}],null,!0)})]}}])})]],2)],1)}),[],!1,null,null,null);"function"==typeof n()&&n()(l),"function"==typeof s()&&s()(l);const u=l.exports},5614:()=>{},6390:()=>{}}]);