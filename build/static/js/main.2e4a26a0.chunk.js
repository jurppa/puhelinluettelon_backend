(this.webpackJsonppuhelinluettelo=this.webpackJsonppuhelinluettelo||[]).push([[0],{38:function(e,n,t){"use strict";t.r(n);var o=t(2),c=t(14),r=t.n(c),i=t(4),u=t(0),a=function(e){return Object(u.jsxs)("div",{children:["filter shown with ",Object(u.jsx)("input",{onChange:e.handleFilterChange})]})},l=function(e){return Object(u.jsxs)("form",{children:[Object(u.jsxs)("div",{children:["name: ",Object(u.jsx)("input",{value:e.nameValue,onChange:e.nameOnChange})]}),Object(u.jsxs)("div",{children:["number:",Object(u.jsx)("input",{value:e.numberValue,onChange:e.numberOnChange})]}),Object(u.jsx)("div",{}),Object(u.jsx)("button",{onClick:e.addNewPerson,children:"add"})]})},s=function(e){return Object(u.jsx)("div",{children:Object(u.jsx)("ul",{children:e.showPersons.map((function(n){return Object(u.jsxs)("li",{children:[n.name," ",n.number," ",Object(u.jsx)("button",{onClick:function(){e.handleDeleteClick(n.id,n.name)},children:"delete"})]},n.name)}))})})},d=t(3),h=t.n(d),j="http://localhost:3001/api/persons/",b=function(){return h.a.get(j).then((function(e){return e.data}))},f=function(e){return h.a.post(j,e).catch((function(e){return console.log(e)}))},O=function(e,n){console.log(e),h.a.put(j,e).then((function(e){return e.data}))},m=function(e){return console.log(e),h.a.delete(j+e).then((function(e){return e.data}))},x=function(e){return Object(u.jsx)("div",{style:{color:"green",fontSize:27,border:"1px solid black",backgroundColor:"snow",marginBottom:40,borderRadius:4},children:e.notification})},g=function(){var e=Object(o.useState)(""),n=Object(i.a)(e,2),t=n[0],c=n[1],r=Object(o.useState)(0),d=Object(i.a)(r,2),h=d[0],j=d[1],g=Object(o.useState)([]),p=Object(i.a)(g,2),w=p[0],C=p[1],v=Object(o.useState)(""),k=Object(i.a)(v,2),P=k[0],S=k[1];Object(o.useEffect)((function(){b().then((function(e){return C(e)})).catch((function(e){return console.log("Errori hookissa "+e)}))}),[]);return Object(u.jsxs)("div",{children:[Object(u.jsx)("h2",{children:"Phonebook"}),Object(u.jsx)(x,{notification:P}),Object(u.jsx)(a,{handleFilterChange:function(e){C(w.filter((function(n){return n.name.toLowerCase().includes(e.target.value.toLowerCase())})))}}),Object(u.jsx)("h2",{children:"Add New"}),Object(u.jsx)(l,{nameValue:t,numberValue:h,nameOnChange:function(e){c(e.target.value)},numberOnChange:function(e){j(e.target.value)},addNewPerson:function(e){w.some((function(e){return e.name===t}))?window.confirm("".concat(t," is already added to phonebook, replace the old number with new one?"))&&O(w.find((function(e){return e.name===t})),h).then((function(e){C(w.map((function(n){return n.id!==e.id?n:e})),S("Updated number of ".concat(t," ")),setTimeout((function(){S(null)}),5e3))})).catch((function(e){console.log(e)})):f({name:t,number:h}).then((function(e){C(w.concat(e.data)),S("Added ".concat(t)),setTimeout((function(){S(null)}),5e3)})).catch((function(e){return console.log("error: "+e)}))}}),Object(u.jsx)("h2",{children:"Numbers"}),Object(u.jsx)(s,{showPersons:w,handleDeleteClick:function(e,n){window.confirm("Delete ".concat(n,"?"))&&m(e).then((function(t){C(w.filter((function(n){return n.id!==e}))),S("Deleted  ".concat(n)),setTimeout((function(){S(null)}),5e3)}))}})]})};r.a.render(Object(u.jsx)(g,{}),document.getElementById("root"))}},[[38,1,2]]]);
//# sourceMappingURL=main.2e4a26a0.chunk.js.map