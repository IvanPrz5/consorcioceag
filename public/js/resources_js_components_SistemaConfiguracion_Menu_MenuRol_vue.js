"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_components_SistemaConfiguracion_Menu_MenuRol_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/SistemaConfiguracion/Menu/MenuRol.vue?vue&type=script&lang=js":
/*!***************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/SistemaConfiguracion/Menu/MenuRol.vue?vue&type=script&lang=js ***!
  \***************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  data: function data() {
    return {
      roles: {},
      menu: null,
      subMenu: null,
      selectRol: null,
      selectMenu: null,
      selectSubMenu: null,
      tipoMenu: null
    };
  },
  created: function created() {
    this.cargaRoles();
  },
  watch: {},
  methods: {
    cargaRoles: function cargaRoles() {
      var _this = this;
      axios.get('/consorcioceag/public/api/roles').then(function (response) {
        _this.roles = response.data;
      })["catch"](function (error) {
        console.log('error  roles ' + error);
      });
    },
    cambioRol: function cambioRol(rol) {
      this.selectRol = rol;
      this.selectMenu = null;
      this.selectSubMenu = null;
      this.subMenu = null;
      this.cargaMenu();
    },
    cambioMenu: function cambioMenu(menu) {
      this.selectMenu = menu;
      console.log(menu);
      this.selectSubMenu = null;
      this.cargaSubMenu();
    },
    cambioSubMenu: function cambioSubMenu(subMenu) {
      this.selectSubMenu = subMenu;
    },
    cargaMenu: function cargaMenu() {
      var _this2 = this;
      try {
        axios.get('/consorcioceag/public/api/menu/menuPrincipal/' + this.selectRol.id).then(function (response) {
          _this2.menu = response.data;
        })["catch"](function (error) {
          return null;
        });
      } catch (e) {
        return null;
      }
    },
    cargaSubMenu: function cargaSubMenu() {
      var _this3 = this;
      try {
        axios.get('/consorcioceag/public/api/menu/subMenuPrincipal/' + this.selectRol.id + '/' + this.selectMenu.id).then(function (response) {
          _this3.subMenu = response.data;
        })["catch"](function (error) {
          console.log(error);
        });
      } catch (e) {
        console.log(e);
      }
    },
    eliminarMenu: function eliminarMenu(id, tipoMenu) {
      try {
        axios["delete"]('/consorcioceag/public/api/menu/eliminar/' + id).then(function (response) {
          response.data;
        })["catch"](function (error) {
          console.log(error);
        });
        if (tipoMenu == 1) {
          this.cargaMenu();
          this.selectMenu = null;
          this.subMenu = null;
          this.selectSubMenu = null;
        } else {
          this.cargaSubMenu();
          this.selectSubMenu = null;
        }
      } catch (e) {
        console.log(e);
      }
    },
    asiganarMenu: function asiganarMenu(id, tipoMenu, idMenuDepende, idRol) {
      try {
        axios.post('/consorcioceag/public/api/menu/agregar/' + id + '/' + tipoMenu + '/' + idMenuDepende + '/' + idRol).then(function (response) {
          response.data;
        })["catch"](function (error) {
          console.log(error);
        });
        if (tipoMenu == 1) {
          this.cargaMenu();
          this.selectMenu = null;
          this.subMenu = null;
          this.selectSubMenu = null;
        } else {
          this.cargaSubMenu();
          this.selectSubMenu = null;
        }
      } catch (e) {
        console.log(e);
      }
    },
    menuSeleccionado: function menuSeleccionado(id) {
      if (this.tipoMenu == 1) {
        this.asiganarMenu(id, this.tipoMenu, 0, this.selectRol.id);
      } else {
        this.asiganarMenu(id, this.tipoMenu, this.selectMenu.id, this.selectRol.id);
      }
    },
    cambioTipoMenu: function cambioTipoMenu(tipoMenu) {
      this.tipoMenu = tipoMenu;
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/SistemaConfiguracion/Menu/MenuRol.vue?vue&type=template&id=4b69d78f":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/SistemaConfiguracion/Menu/MenuRol.vue?vue&type=template&id=4b69d78f ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render),
/* harmony export */   staticRenderFns: () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c("div", [_c("v-container", [_c("v-row", [_c("v-col", {
    attrs: {
      cols: "12",
      md: "4"
    }
  }, [_c("v-card", {
    attrs: {
      color: "#1F7087"
    }
  }, [_c("div", {
    staticClass: "justify-space-between"
  }, [_c("div", [_c("v-card-title", {
    staticClass: "white--text",
    attrs: {
      color: "black"
    }
  }, [_vm._v("SELECCIONE UN ROLE")]), _vm._v(" "), _c("v-list", [_c("v-list-item-group", _vm._l(_vm.roles, function (rol, i) {
    return _c("v-list-item", {
      key: i,
      on: {
        click: function click($event) {
          return _vm.cambioRol(rol);
        }
      }
    }, [_c("v-list-item-content", [_c("v-list-item-title", {
      domProps: {
        textContent: _vm._s(rol.descripcion)
      }
    })], 1)], 1);
  }), 1)], 1), _vm._v(" "), _c("v-card-actions")], 1)])])], 1), _vm._v(" "), _c("v-col", {
    attrs: {
      cols: "12",
      md: "4"
    }
  }, [_c("v-card", {
    attrs: {
      color: "red"
    }
  }, [_c("div", {
    staticClass: "justify-space-between"
  }, [_c("div", [_vm.selectRol == null ? _c("v-card-title", {
    staticClass: "white--text"
  }, [_vm._v("SELECCIONE UN MENU ")]) : _c("v-card-title", {
    staticClass: "white--text"
  }, [_vm._v("MENU DE " + _vm._s(_vm.selectRol.descripcion) + " ")]), _vm._v(" "), _vm.menu != null ? _c("v-list", [_c("v-list-item-group", _vm._l(_vm.menu, function (menuPrincipal, i) {
    return _c("v-list-item", {
      key: i,
      on: {
        click: function click($event) {
          return _vm.cambioMenu(menuPrincipal);
        }
      }
    }, [_c("v-list-item-icon", [_c("v-icon", {
      domProps: {
        textContent: _vm._s(menuPrincipal.icono)
      }
    })], 1), _vm._v(" "), _c("v-list-item-content", [_c("v-list-item-title", {
      domProps: {
        textContent: _vm._s(menuPrincipal.descripcion)
      }
    }), _vm._v(" "), _c("v-list-item-subtitle", {
      domProps: {
        textContent: _vm._s(menuPrincipal.sistema)
      }
    })], 1)], 1);
  }), 1)], 1) : _vm._e(), _vm._v(" "), _c("v-card-actions", [_vm.selectRol != null ? _c("v-dialog", {
    scopedSlots: _vm._u([{
      key: "activator",
      fn: function fn(_ref) {
        var on = _ref.on,
          attrs = _ref.attrs;
        return [_c("v-btn", _vm._g(_vm._b({
          staticClass: "mx-2",
          attrs: {
            fab: "",
            dark: "",
            small: "",
            color: "primary"
          },
          on: {
            click: function click($event) {
              return _vm.cambioTipoMenu(1);
            }
          }
        }, "v-btn", attrs, false), on), [_c("v-icon", {
          attrs: {
            dark: ""
          }
        }, [_vm._v("\r\n                                                mdi-plus\r\n                                            ")])], 1)];
      }
    }, {
      key: "default",
      fn: function fn(dialog) {
        return [_c("v-card", [_c("SeleccionarMenu", {
          attrs: {
            cerrarDialogo: dialog,
            tipoMenu: 1
          },
          on: {
            menuSeleccionado: _vm.menuSeleccionado
          }
        })], 1)];
      }
    }], null, false, 4262790896)
  }) : _vm._e(), _vm._v(" "), _c("v-spacer"), _vm._v(" "), _vm.selectMenu != null ? _c("v-btn", {
    staticClass: "mx-2",
    attrs: {
      fab: "",
      dark: "",
      small: "",
      color: "ceagNaranja"
    },
    on: {
      click: function click($event) {
        return _vm.eliminarMenu(_vm.selectMenu.idRelacion, 1);
      }
    }
  }, [_c("v-icon", {
    attrs: {
      dark: ""
    }
  }, [_vm._v("\r\n                                        mdi-minus\r\n                                    ")])], 1) : _vm._e()], 1)], 1)])])], 1), _vm._v(" "), _c("v-col", {
    attrs: {
      cols: "12",
      md: "4"
    }
  }, [_c("v-card", {
    attrs: {
      color: "blue"
    }
  }, [_c("div", {
    staticClass: "justify-space-between"
  }, [_c("div", [_vm.selectMenu == null ? _c("v-card-title", {
    staticClass: "white--text"
  }, [_vm._v("SELECCIONE UN SUB MENU")]) : _c("v-card-title", {
    staticClass: "white--text"
  }, [_vm._v("SUB MENU DE " + _vm._s(_vm.selectMenu.descripcion))]), _vm._v(" "), _vm.subMenu != null ? _c("v-list", [_c("v-list-item-group", _vm._l(_vm.subMenu, function (submenus, i) {
    return _c("v-list-item", {
      key: i,
      on: {
        click: function click($event) {
          return _vm.cambioSubMenu(submenus);
        }
      }
    }, [_c("v-list-item-icon", [_c("v-icon", {
      domProps: {
        textContent: _vm._s(submenus.icono)
      }
    })], 1), _vm._v(" "), _c("v-list-item-content", [_c("v-list-item-title", {
      domProps: {
        textContent: _vm._s(submenus.descripcion)
      }
    }), _vm._v(" "), _c("v-list-item-subtitle", {
      attrs: {
        color: "primary"
      },
      domProps: {
        textContent: _vm._s(submenus.sistema)
      }
    })], 1)], 1);
  }), 1)], 1) : _vm._e(), _vm._v(" "), _c("v-card-actions", [_vm.selectMenu != null ? _c("v-dialog", {
    scopedSlots: _vm._u([{
      key: "activator",
      fn: function fn(_ref2) {
        var on = _ref2.on,
          attrs = _ref2.attrs;
        return [_c("v-btn", _vm._g(_vm._b({
          staticClass: "mx-2",
          attrs: {
            fab: "",
            dark: "",
            small: "",
            color: "primary"
          },
          on: {
            click: function click($event) {
              return _vm.cambioTipoMenu(2);
            }
          }
        }, "v-btn", attrs, false), on), [_c("v-icon", {
          attrs: {
            dark: ""
          }
        }, [_vm._v("\r\n                                                mdi-plus\r\n                                            ")])], 1)];
      }
    }, {
      key: "default",
      fn: function fn(dialog) {
        return [_c("v-card", [_c("SeleccionarMenu", {
          attrs: {
            cerrarDialogo: dialog,
            tipoMenu: 1
          },
          on: {
            menuSeleccionado: _vm.menuSeleccionado
          }
        })], 1)];
      }
    }], null, false, 454242483)
  }) : _vm._e(), _vm._v(" "), _c("v-spacer"), _vm._v(" "), _vm.selectSubMenu != null ? _c("v-btn", {
    staticClass: "mx-2",
    attrs: {
      fab: "",
      dark: "",
      small: "",
      color: "ceagNaranja"
    },
    on: {
      click: function click($event) {
        return _vm.eliminarMenu(_vm.selectSubMenu.idRelacion, 2);
      }
    }
  }, [_c("v-icon", {
    attrs: {
      dark: ""
    }
  }, [_vm._v("\r\n                                        mdi-minus\r\n                                    ")])], 1) : _vm._e()], 1)], 1)])])], 1)], 1)], 1)], 1);
};
var staticRenderFns = [];
render._withStripped = true;


/***/ }),

/***/ "./resources/js/components/SistemaConfiguracion/Menu/MenuRol.vue":
/*!***********************************************************************!*\
  !*** ./resources/js/components/SistemaConfiguracion/Menu/MenuRol.vue ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _MenuRol_vue_vue_type_template_id_4b69d78f__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./MenuRol.vue?vue&type=template&id=4b69d78f */ "./resources/js/components/SistemaConfiguracion/Menu/MenuRol.vue?vue&type=template&id=4b69d78f");
/* harmony import */ var _MenuRol_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./MenuRol.vue?vue&type=script&lang=js */ "./resources/js/components/SistemaConfiguracion/Menu/MenuRol.vue?vue&type=script&lang=js");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _MenuRol_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  _MenuRol_vue_vue_type_template_id_4b69d78f__WEBPACK_IMPORTED_MODULE_0__.render,
  _MenuRol_vue_vue_type_template_id_4b69d78f__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/SistemaConfiguracion/Menu/MenuRol.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/components/SistemaConfiguracion/Menu/MenuRol.vue?vue&type=script&lang=js":
/*!***********************************************************************************************!*\
  !*** ./resources/js/components/SistemaConfiguracion/Menu/MenuRol.vue?vue&type=script&lang=js ***!
  \***********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_MenuRol_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./MenuRol.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/SistemaConfiguracion/Menu/MenuRol.vue?vue&type=script&lang=js");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_MenuRol_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/SistemaConfiguracion/Menu/MenuRol.vue?vue&type=template&id=4b69d78f":
/*!*****************************************************************************************************!*\
  !*** ./resources/js/components/SistemaConfiguracion/Menu/MenuRol.vue?vue&type=template&id=4b69d78f ***!
  \*****************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_MenuRol_vue_vue_type_template_id_4b69d78f__WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   staticRenderFns: () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_MenuRol_vue_vue_type_template_id_4b69d78f__WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_MenuRol_vue_vue_type_template_id_4b69d78f__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./MenuRol.vue?vue&type=template&id=4b69d78f */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/SistemaConfiguracion/Menu/MenuRol.vue?vue&type=template&id=4b69d78f");


/***/ })

}]);