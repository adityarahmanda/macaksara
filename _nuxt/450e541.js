(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{391:function(t,n,e){"use strict";e.r(n);var r={props:{user:{type:Object,default:function(){return{}}},isLoading:{type:Boolean,default:!1}},data:function(){return{isEditName:!1}}},l=e(49),component=Object(l.a)(r,(function(){var t=this,n=t._self._c;return n("div",{staticClass:"sidebar col-12 col-lg-4 pr-lg-5 mb-3 mb-md-4"},[n("p",{staticClass:"mb-4"},[t._v("Macaksara merupakan website permainan kuis untuk menguji kemampuan membaca Aksara Jawa.")]),t._v(" "),n("div",{staticClass:"user-progress"},[t._m(0),t._v(" "),n("div",{staticClass:"user-progress-info mb-md-4 mb-3"},[n("div",{staticClass:"row no-gutters align-items-center",attrs:{id:"word-collected"}},[n("div",{staticClass:"counter col-md-4 col-6 text-right"},[t.isLoading?n("span",{staticClass:"pr-3"},[t._v("0")]):n("span",{staticClass:"pr-3"},[t._v(t._s(t.user.learnedWords))])]),t._v(" "),n("div",{staticClass:"col-md-8 col-6"},[t._v("kata dibaca")])]),t._v(" "),n("div",{staticClass:"row no-gutters align-items-center",attrs:{id:"max-streak"}},[n("div",{staticClass:"counter col-4 text-right"},[t.isLoading?n("span",{staticClass:"pr-3"},[t._v("0")]):n("span",{staticClass:"pr-3"},[t._v(t._s(t.user.maxStreak))])]),t._v(" "),n("div",{staticClass:"col-8"},[t._v("streak tertinggi")])])]),t._v(" "),n("button",{staticClass:"reset-button pushable w-100 mb-3 mb-md-4",on:{click:function(n){return t.$bvModal.show("reset-progress-modal")}}},[n("span",{staticClass:"front"},[t._v("\n                Atur Ulang Permainan\n            ")])]),t._v(" "),n("p",{staticClass:"small"},[t._v("*Data permainan tersimpan secara otomatis pada perangkat yang digunakan.")])]),t._v(" "),n("b-modal",{attrs:{id:"reset-progress-modal","body-class":"text-center",centered:"","hide-header":""},on:{ok:function(n){return t.$emit("reset-game")}},scopedSlots:t._u([{key:"modal-footer",fn:function(e){var r=e.cancel,l=e.ok;return[n("div",{staticClass:"row w-100 no-gutters"},[n("div",{staticClass:"col-12 col-md-6 pr-0 pr-md-1 mb-2 mb-md-0"},[n("button",{staticClass:"btn btn-primary text-white rounded-pill w-100",on:{click:r}},[t._v("Batalkan")])]),t._v(" "),n("div",{staticClass:"col-12 col-md-6 pl-0 pl-md-1"},[n("button",{staticClass:"btn btn-danger text-white rounded-pill w-100",on:{click:l}},[t._v("Atur Ulang")])])])]}}])},[t._v("\n        Apakah kamu yakin untuk mengatur ulang permainan dan kehilangan semua perkembangan permainan?\n    \n        ")])],1)}),[function(){var t=this._self._c;return t("div",{staticClass:"user-progress-header"},[t("h2",{staticClass:"h4"},[this._v("Perkembangan Permainan :")])])}],!1,null,null,null);n.default=component.exports}}]);