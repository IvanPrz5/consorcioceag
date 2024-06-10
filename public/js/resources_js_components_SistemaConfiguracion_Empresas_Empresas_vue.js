"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_components_SistemaConfiguracion_Empresas_Empresas_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/SistemaConfiguracion/Empresas/Empresas.vue?vue&type=script&lang=js":
/*!********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/SistemaConfiguracion/Empresas/Empresas.vue?vue&type=script&lang=js ***!
  \********************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  data: function data() {
    return {
      titulo: 'Empresas',
      notificacionValidad: false,
      notificacionError: false,
      colorNotificacion: 'green',
      mensajeNoificacion: '',
      dialogDelete: false,
      Seleccion: {},
      headers: [{
        text: 'Id',
        value: 'id'
      }, {
        text: 'Nombre',
        value: 'nombre'
      }, {
        text: 'Nombre Nominativo',
        value: 'nombreNominativo'
      }, {
        text: 'Rfc',
        value: 'rfc'
      }, {
        text: 'Estatus',
        value: 'estatus'
      }, {
        text: 'Editar',
        value: 'actions',
        sortable: false
      }],
      items: [],
      buscar: ''
    };
  },
  created: function created() {
    this.initialize();
  },
  methods: {
    recargarEmpresas: function recargarEmpresas() {
      this.initialize();
    },
    initialize: function initialize() {
      var _this = this;
      axios.get('/consorcioceag/public/api/empresas/allEmpresas').then(function (response) {
        _this.items = response.data;
      })["catch"](function (error) {
        _this.mostrarNoificacion('No es posible cargar de ' + _this.titulo, true);
      });
    },
    Guardado: function Guardado() {
      this.mostrarNoificacion('Guardado con exito', false);
      this.initialize();
    },
    usuarioEditarGuardado: function usuarioEditarGuardado() {
      this.mostrarNoificacion('Editado Exitoso', false);
      this.initialize();
    },
    mostrarNoificacion: function mostrarNoificacion(mensaje, esError) {
      this.mensajeNoificacion = mensaje;
      if (esError) {
        this.notificacionError = true;
      } else {
        this.notificacionValidad = true;
      }
    },
    cambioEstatus: function cambioEstatus(item) {
      this.dialogDelete = true;
      this.Seleccion = item;
    },
    noBorrar: function noBorrar() {
      this.dialogDelete = false;
      this.initialize();
    },
    borrar: function borrar() {
      var _this2 = this;
      axios["delete"]('/api/empresas/borrar/' + this.Seleccion.id).then(function (response) {
        _this2.dialogDelete = false;
        _this2.mostrarNoificacion('  ESTATUS ACTUALIZADO', false);
      })["catch"](function (error) {
        console.log('error  usuario ' + error);
        _this2.mostrarNoificacion('  ESTATUS  NO ACTUALIZADO', true);
      });
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/SistemaConfiguracion/Empresas/Empresas.vue?vue&type=template&id=08fad430":
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/SistemaConfiguracion/Empresas/Empresas.vue?vue&type=template&id=08fad430 ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render),
/* harmony export */   staticRenderFns: () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c("div", [_c("v-data-table", {
    staticClass: "elevation-1",
    attrs: {
      headers: _vm.headers,
      items: _vm.items,
      search: _vm.buscar
    },
    scopedSlots: _vm._u([{
      key: "top",
      fn: function fn() {
        return [_c("v-toolbar", [_c("v-toolbar-title", [_vm._v(_vm._s(_vm.titulo))]), _vm._v(" "), _c("v-text-field", {
          staticClass: "pt-6 pl-6",
          attrs: {
            name: "name",
            label: "Buscar",
            id: "id",
            "append-icon": "mdi-magnify"
          },
          model: {
            value: _vm.buscar,
            callback: function callback($$v) {
              _vm.buscar = $$v;
            },
            expression: "buscar"
          }
        }), _vm._v(" "), _c("v-spacer"), _vm._v(" "), _c("v-divider", {
          staticClass: "mx-4",
          attrs: {
            inset: "",
            vertical: ""
          }
        }), _vm._v(" "), _c("v-dialog", {
          attrs: {
            transition: "scroll-y-transition",
            "max-width": "1200"
          },
          scopedSlots: _vm._u([{
            key: "activator",
            fn: function fn(_ref) {
              var on = _ref.on,
                attrs = _ref.attrs;
              return [_c("v-btn", _vm._g(_vm._b({
                attrs: {
                  color: "primary"
                }
              }, "v-btn", attrs, false), on), [_vm._v("Nueva " + _vm._s(_vm.titulo))])];
            }
          }, {
            key: "default",
            fn: function fn(dialog) {
              return [_c("v-card", [_c("v-toolbar", {
                attrs: {
                  color: "primary",
                  dark: ""
                }
              }, [_vm._v("NUEVA " + _vm._s(_vm.titulo.toUpperCase()) + "\r\n                                "), _c("v-spacer"), _vm._v(" "), _c("v-btn", {
                attrs: {
                  text: ""
                },
                on: {
                  click: function click($event) {
                    dialog.value = false;
                  }
                }
              }, [_vm._v("X")])], 1), _vm._v(" "), _c("CrearEmpresas", {
                attrs: {
                  cerrarDialogo: dialog
                },
                on: {
                  recargarEmpresas: _vm.recargarEmpresas
                }
              }), _vm._v(" "), _c("v-card-actions", {
                staticClass: "justify-end"
              })], 1)];
            }
          }])
        }), _vm._v(" "), _c("v-dialog", {
          attrs: {
            "max-width": "500px"
          },
          model: {
            value: _vm.dialogDelete,
            callback: function callback($$v) {
              _vm.dialogDelete = $$v;
            },
            expression: "dialogDelete"
          }
        }, [_c("v-card", [_c("v-card-title", {
          staticClass: "text-h5"
        }, [_vm._v("ESTA SEGURO CAMBIAR ESTATUS ?")]), _vm._v(" "), _c("v-card-actions", [_c("v-spacer"), _vm._v(" "), _c("v-btn", {
          attrs: {
            color: "blue darken-1",
            text: ""
          },
          on: {
            click: function click($event) {
              return _vm.noBorrar();
            }
          }
        }, [_vm._v("Cancel")]), _vm._v(" "), _c("v-btn", {
          attrs: {
            color: "blue darken-1",
            text: ""
          },
          on: {
            click: function click($event) {
              return _vm.borrar();
            }
          }
        }, [_vm._v("OK")]), _vm._v(" "), _c("v-spacer")], 1)], 1)], 1)], 1)];
      },
      proxy: true
    }, {
      key: "item.estatus",
      fn: function fn(_ref2) {
        var item = _ref2.item;
        return [_c("div", [_c("v-switch", {
          on: {
            click: function click($event) {
              return _vm.cambioEstatus(item);
            }
          },
          model: {
            value: item.estatus,
            callback: function callback($$v) {
              _vm.$set(item, "estatus", $$v);
            },
            expression: "item.estatus"
          }
        })], 1)];
      }
    }, {
      key: "item.actions",
      fn: function fn(_ref3) {
        var item = _ref3.item;
        return [_c("v-dialog", {
          attrs: {
            "max-width": "1200"
          },
          scopedSlots: _vm._u([{
            key: "activator",
            fn: function fn(_ref4) {
              var on = _ref4.on,
                attrs = _ref4.attrs;
              return [_c("v-icon", _vm._g(_vm._b({
                staticClass: "pr-2",
                attrs: {
                  color: "secondary",
                  dark: ""
                }
              }, "v-icon", attrs, false), on), [_vm._v("\r\n                        mdi-pencil\r\n                    ")])];
            }
          }, {
            key: "default",
            fn: function fn(dialog) {
              return [_c("v-card", [_c("v-toolbar", {
                attrs: {
                  color: "primary",
                  dark: ""
                }
              }, [_vm._v("EDITAR " + _vm._s(_vm.titulo.toUpperCase()) + " " + _vm._s(item.email) + "\r\n                            "), _c("v-spacer"), _vm._v(" "), _c("v-btn", {
                attrs: {
                  text: ""
                },
                on: {
                  click: function click($event) {
                    dialog.value = false;
                  }
                }
              }, [_vm._v("X")])], 1), _vm._v(" "), _c("br"), _vm._v(" "), _c("EditarEmpresas", {
                attrs: {
                  cerrarDialogo: dialog,
                  empresaOriginal: item
                },
                on: {
                  recargarEmpresas: _vm.recargarEmpresas
                }
              }), _vm._v(" "), _c("v-card-actions", {
                staticClass: "justify-end"
              })], 1)];
            }
          }], null, true)
        })];
      }
    }, {
      key: "no-data",
      fn: function fn() {
        return [_c("v-btn", {
          attrs: {
            color: "primary"
          },
          on: {
            click: _vm.initialize
          }
        }, [_vm._v("\r\n                Reset\r\n            ")])];
      },
      proxy: true
    }])
  }), _vm._v(" "), _c("v-snackbar", {
    attrs: {
      timeout: 1500,
      value: true,
      color: "green",
      absolute: "",
      top: "",
      shaped: "",
      transition: "scroll-y-transition"
    },
    model: {
      value: _vm.notificacionValidad,
      callback: function callback($$v) {
        _vm.notificacionValidad = $$v;
      },
      expression: "notificacionValidad"
    }
  }, [_vm._v("\r\n        " + _vm._s(_vm.mensajeNoificacion) + "\r\n    ")]), _vm._v(" "), _c("v-snackbar", {
    attrs: {
      timeout: 1500,
      value: true,
      color: "red",
      absolute: "",
      top: "",
      shaped: "",
      transition: "scroll-y-transition"
    },
    model: {
      value: _vm.notificacionError,
      callback: function callback($$v) {
        _vm.notificacionError = $$v;
      },
      expression: "notificacionError"
    }
  }, [_vm._v("\r\n        " + _vm._s(_vm.mensajeNoificacion) + "\r\n    ")])], 1);
};
var staticRenderFns = [];
render._withStripped = true;


/***/ }),

/***/ "./resources/js/components/SistemaConfiguracion/Empresas/Empresas.vue":
/*!****************************************************************************!*\
  !*** ./resources/js/components/SistemaConfiguracion/Empresas/Empresas.vue ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Empresas_vue_vue_type_template_id_08fad430__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Empresas.vue?vue&type=template&id=08fad430 */ "./resources/js/components/SistemaConfiguracion/Empresas/Empresas.vue?vue&type=template&id=08fad430");
/* harmony import */ var _Empresas_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Empresas.vue?vue&type=script&lang=js */ "./resources/js/components/SistemaConfiguracion/Empresas/Empresas.vue?vue&type=script&lang=js");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Empresas_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  _Empresas_vue_vue_type_template_id_08fad430__WEBPACK_IMPORTED_MODULE_0__.render,
  _Empresas_vue_vue_type_template_id_08fad430__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/SistemaConfiguracion/Empresas/Empresas.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/components/SistemaConfiguracion/Empresas/Empresas.vue?vue&type=script&lang=js":
/*!****************************************************************************************************!*\
  !*** ./resources/js/components/SistemaConfiguracion/Empresas/Empresas.vue?vue&type=script&lang=js ***!
  \****************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Empresas_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Empresas.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/SistemaConfiguracion/Empresas/Empresas.vue?vue&type=script&lang=js");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Empresas_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/SistemaConfiguracion/Empresas/Empresas.vue?vue&type=template&id=08fad430":
/*!**********************************************************************************************************!*\
  !*** ./resources/js/components/SistemaConfiguracion/Empresas/Empresas.vue?vue&type=template&id=08fad430 ***!
  \**********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Empresas_vue_vue_type_template_id_08fad430__WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   staticRenderFns: () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Empresas_vue_vue_type_template_id_08fad430__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Empresas_vue_vue_type_template_id_08fad430__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Empresas.vue?vue&type=template&id=08fad430 */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/SistemaConfiguracion/Empresas/Empresas.vue?vue&type=template&id=08fad430");


/***/ })

}]);