webpackJsonp([11],{"/M/W":function(e,t,r){"use strict";function a(e){r("VdF4")}Object.defineProperty(t,"__esModule",{value:!0});var i=r("3vfV"),o=r("FDM1"),n=r("C7Lr"),s=a,c=n(i.a,o.a,!1,s,"data-v-641831bc",null);t.default=c.exports},"3vfV":function(e,t,r){"use strict";t.a={data:function(){return{isNext:!1}},created:function(){this.$store.dispatch("freshToken")},mounted:function(){if(this.$route.meta.needHeaderFooter){$(".router").css({"pading-top":"80px",height:"100%"});var e=this.$route.meta.headerTag;axios.get("/index.php?g=Front&m=Index&a=getHeaderFooter&module=").then(function(t){$("#header").replaceWith(t.data.header),$("#footer").replaceWith(t.data.footer),$("#header_"+e).attr("class","curr")})}else this.isNext=!0}}},FDM1:function(e,t,r){"use strict";var a=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"pc_container"},[r("div",{attrs:{id:"header"}}),e._v(" "),r("div",{staticClass:"router"},[r("router-view")],1),e._v(" "),r("div",{attrs:{id:"footer"}})])},i=[],o={render:a,staticRenderFns:i};t.a=o},TfLW:function(e,t,r){t=e.exports=r("UTlt")(!1),t.push([e.i,"",""])},VdF4:function(e,t,r){var a=r("TfLW");"string"==typeof a&&(a=[[e.i,a,""]]),a.locals&&(e.exports=a.locals);r("FIqI")("b3a1ac5e",a,!0,{})}});
//# sourceMappingURL=11.cc65c453cf3f5ef3f276.js.map