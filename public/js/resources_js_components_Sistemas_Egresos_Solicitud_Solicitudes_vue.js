"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_components_Sistemas_Egresos_Solicitud_Solicitudes_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/Sistemas/Egresos/Solicitud/Solicitudes.vue?vue&type=script&lang=js":
/*!********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/Sistemas/Egresos/Solicitud/Solicitudes.vue?vue&type=script&lang=js ***!
  \********************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  data: function data() {
    return {
      titulo: 'Solicitud',
      notificacionValidad: false,
      notificacionError: false,
      colorNotificacion: 'green',
      menu2: false,
      mensajeNoificacion: '',
      dialogDelete: false,
      fecha: new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().substr(0, 10),
      seleccionado: {},
      headers: [{
        text: 'Folio',
        value: 'folio'
      }, {
        text: 'Beneficiario',
        value: 'beneficiario'
      }, {
        text: 'Puesto',
        value: 'puesto'
      }, {
        text: 'Descripcion',
        value: 'descripcion'
      }, {
        text: 'Importe',
        value: 'importe'
      }, {
        text: 'Fecha',
        value: 'created_at'
      }, {
        text: 'Estatus',
        value: 'estatus'
      }, {
        text: 'Pdf',
        value: 'pdf'
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
    initialize: function initialize() {
      var _this = this;
      var empresa = JSON.parse(localStorage.getItem('_empresa'));
      axios.get('../api/egresos/allSolicitudes/' + empresa.id + '/' + this.fecha).then(function (response) {
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
      this.seleccionado = item;
    },
    noBorrar: function noBorrar() {
      this.initialize();
      this.dialogDelete = false;
    },
    formatoFecha: function formatoFecha(fecha) {
      var datos = fecha.split("T");
      return datos[0]; //+' '+datos[1].replace('.000000Z','');
    },
    borrar: function borrar() {
      var _this2 = this;
      axios["delete"]('/api/menu/borrar/' + this.seleccionado.id).then(function (response) {
        _this2.dialogDelete = false;
        _this2.mostrarNoificacion('  ESTATUS ACTUALIZADO', false);
        _this2.initialize();
      })["catch"](function (error) {
        console.log('error  usuario ' + error);
        _this2.dialogDelete = false;
        _this2.mostrarNoificacion('  ESTATUS  NO ACTUALIZADO', true);
        _this2.initialize();
      });
    },
    cambioFecha: function cambioFecha() {
      this.menu2 = false;
      this.initialize();
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/Sistemas/Egresos/Solicitud/Solicitudes.vue?vue&type=template&id=3904bdf2":
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/Sistemas/Egresos/Solicitud/Solicitudes.vue?vue&type=template&id=3904bdf2 ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render),
/* harmony export */   staticRenderFns: () => (/* binding */ staticRenderFns)
/* harmony export */ });
function _objectDestructuringEmpty(t) { if (null == t) throw new TypeError("Cannot destructure " + t); }
var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c("div", [_vm._m(0), _vm._v(" "), _c("v-data-table", {
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
        }), _vm._v(" "), _c("v-spacer"), _vm._v(" "), _c("v-menu", {
          staticClass: "pt-6 pl-6",
          attrs: {
            "close-on-content-click": false,
            "nudge-right": 40,
            transition: "scale-transition",
            "offset-y": "",
            "min-width": "auto"
          },
          scopedSlots: _vm._u([{
            key: "activator",
            fn: function fn(_ref) {
              var on = _ref.on,
                attrs = _ref.attrs;
              return [_c("v-text-field", _vm._g(_vm._b({
                staticClass: "pt-6 pl-6",
                attrs: {
                  "prepend-icon": "mdi-calendar",
                  readonly: "",
                  label: "Fecha del mes a consultar"
                },
                model: {
                  value: _vm.fecha,
                  callback: function callback($$v) {
                    _vm.fecha = $$v;
                  },
                  expression: "fecha"
                }
              }, "v-text-field", attrs, false), on))];
            }
          }]),
          model: {
            value: _vm.menu2,
            callback: function callback($$v) {
              _vm.menu2 = $$v;
            },
            expression: "menu2"
          }
        }, [_vm._v(" "), _c("v-date-picker", {
          on: {
            input: _vm.cambioFecha
          },
          model: {
            value: _vm.fecha,
            callback: function callback($$v) {
              _vm.fecha = $$v;
            },
            expression: "fecha"
          }
        })], 1), _vm._v(" "), _c("v-divider", {
          staticClass: "mx-4",
          attrs: {
            inset: "",
            vertical: ""
          }
        }), _vm._v(" "), _c("v-dialog", {
          attrs: {
            transition: "scroll-y-transition",
            "max-width": "600"
          },
          scopedSlots: _vm._u([{
            key: "activator",
            fn: function fn(_ref2) {
              var on = _ref2.on,
                attrs = _ref2.attrs;
              return [_c("v-btn", _vm._g(_vm._b({
                attrs: {
                  color: "primary"
                }
              }, "v-btn", attrs, false), on), [_vm._v("Nuevo " + _vm._s(_vm.titulo))])];
            }
          }, {
            key: "default",
            fn: function fn(dialog) {
              return [_c("v-card", [_c("v-toolbar", {
                attrs: {
                  color: "primary",
                  dark: ""
                }
              }, [_vm._v("NUEVOS  " + _vm._s(_vm.titulo.toUpperCase()) + " "), _c("v-spacer"), _vm._v(" "), _c("v-btn", {
                attrs: {
                  text: ""
                },
                on: {
                  click: function click($event) {
                    dialog.value = false;
                  }
                }
              }, [_vm._v("X")])], 1), _vm._v(" "), _c("EgresosCrearSolicitud", {
                attrs: {
                  cerrarDialogo: dialog
                },
                on: {
                  Guardado: _vm.Guardado
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
      key: "item.created_at",
      fn: function fn(_ref3) {
        var item = _ref3.item;
        return [_c("div", [_vm._v("\r\n\r\n                    " + _vm._s(_vm.formatoFecha(item.created_at)) + "\r\n                                          ")])];
      }
    }, {
      key: "item.pdf",
      fn: function fn(_ref4) {
        var item = _ref4.item;
        return [_c("div", [_c("v-icon", {
          staticClass: "pr-2",
          attrs: {
            color: "ceagNaranja_3",
            dark: ""
          }
        }, [_vm._v("\r\n                        mdi-file-pdf-box-outline\r\n                    ")])], 1)];
      }
    }, {
      key: "item.estatus",
      fn: function fn(_ref5) {
        var item = _ref5.item;
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
      fn: function fn(_ref6) {
        var item = _ref6.item;
        return [_c("v-dialog", {
          attrs: {
            "max-width": "1200"
          },
          scopedSlots: _vm._u([{
            key: "activator",
            fn: function fn(_ref7) {
              _objectDestructuringEmpty(_ref7);
              return [_c("v-icon", {
                staticClass: "pr-2",
                attrs: {
                  color: "secondary",
                  dark: ""
                }
              }, [_vm._v("\r\n                        mdi-pencil\r\n                    ")])];
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
              }, [_vm._v("X")])], 1), _vm._v(" "), _c("br"), _vm._v(" "), _c("div", {
                staticStyle: {
                  "border-style": "inset"
                }
              }, [_c("EditarMenu", {
                attrs: {
                  cerrarDialogo: dialog,
                  menuEntrada: item
                },
                on: {
                  Guardado: _vm.Guardado
                }
              })], 1), _vm._v(" "), _c("v-card-actions", {
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
var staticRenderFns = [function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c("div", [_c("h1", [_vm._v("Classic editor")]), _vm._v(" "), _c("div", {
    attrs: {
      id: "editor"
    }
  }, [_c("p", [_vm._v("This is some sample content.")])])]);
}];
render._withStripped = true;


/***/ }),

/***/ "./resources/js/components/Sistemas/Egresos/Solicitud/Solicitudes.vue":
/*!****************************************************************************!*\
  !*** ./resources/js/components/Sistemas/Egresos/Solicitud/Solicitudes.vue ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Solicitudes_vue_vue_type_template_id_3904bdf2__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Solicitudes.vue?vue&type=template&id=3904bdf2 */ "./resources/js/components/Sistemas/Egresos/Solicitud/Solicitudes.vue?vue&type=template&id=3904bdf2");
/* harmony import */ var _Solicitudes_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Solicitudes.vue?vue&type=script&lang=js */ "./resources/js/components/Sistemas/Egresos/Solicitud/Solicitudes.vue?vue&type=script&lang=js");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Solicitudes_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  _Solicitudes_vue_vue_type_template_id_3904bdf2__WEBPACK_IMPORTED_MODULE_0__.render,
  _Solicitudes_vue_vue_type_template_id_3904bdf2__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/Sistemas/Egresos/Solicitud/Solicitudes.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/components/Sistemas/Egresos/Solicitud/Solicitudes.vue?vue&type=script&lang=js":
/*!****************************************************************************************************!*\
  !*** ./resources/js/components/Sistemas/Egresos/Solicitud/Solicitudes.vue?vue&type=script&lang=js ***!
  \****************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Solicitudes_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Solicitudes.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/Sistemas/Egresos/Solicitud/Solicitudes.vue?vue&type=script&lang=js");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Solicitudes_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/Sistemas/Egresos/Solicitud/Solicitudes.vue?vue&type=template&id=3904bdf2":
/*!**********************************************************************************************************!*\
  !*** ./resources/js/components/Sistemas/Egresos/Solicitud/Solicitudes.vue?vue&type=template&id=3904bdf2 ***!
  \**********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Solicitudes_vue_vue_type_template_id_3904bdf2__WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   staticRenderFns: () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Solicitudes_vue_vue_type_template_id_3904bdf2__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Solicitudes_vue_vue_type_template_id_3904bdf2__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!../../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Solicitudes.vue?vue&type=template&id=3904bdf2 */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/Sistemas/Egresos/Solicitud/Solicitudes.vue?vue&type=template&id=3904bdf2");


/***/ })

}]);