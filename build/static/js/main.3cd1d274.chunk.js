(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{38:function(e,t,n){},39:function(e,t,n){"use strict";n.r(t);var o=n(0),r=n(1),c=n.n(r),a=n(14),i=n.n(a),u=n(3),s=function(e){var t=e.handleFilterChange;return Object(o.jsx)(o.Fragment,{children:Object(o.jsx)("form",{children:Object(o.jsxs)("div",{children:["filter names by:",Object(o.jsx)("input",{onChange:t})]})})})},d=n(4),l=n.n(d),h="/api/persons",j={getAll:function(){return l.a.get(h).then((function(e){return e.data}))},add:function(e,t,n){return l.a.post(h,{name:e,number:t}).then((function(e){return n.concat(e.data)}))},remove:function(e,t,n,o,r,c,a){var i=l.a.delete("".concat(h,"/").concat(e));window.confirm("Delete ".concat(t,"?"))&&i.then((function(){console.log("remove person from state here"),o(n.filter((function(t){return t.id!==e})))})).catch((function(e){console.log("'".concat(t,"' was already deleted from server")),r(!0),c("'".concat(t,"' was already deleted from server")),a()}))},update:function(e,t,n){return l.a.put("".concat(h,"/").concat(e),{id:e,name:t,number:n}).then((function(e){return e.data}))}},f=function(e){var t=e.people,n=e.setPeople,r=e.filter,c=e.title,a=e.setIsError,i=e.setNotificationMsg,u=e.hideNotification,s=r.toLowerCase(),d=t.filter((function(e){return e.name.toLowerCase().includes(s)}));return Object(o.jsxs)(o.Fragment,{children:[Object(o.jsx)("h2",{children:c}),Object(o.jsx)("ul",{children:d.map((function(e){return Object(o.jsxs)("li",{children:[e.name," ",e.number,Object(o.jsx)("button",{onClick:function(){j.remove(e.id,e.name,t,n,a,i,u)},children:"delete"},e.id)]},e.id)}))})]})},b=function(e){var t=e.addName,n=e.newName,r=e.handlePersonChange,c=e.newPhone,a=e.handlePhoneChange,i=e.title;return Object(o.jsxs)(o.Fragment,{children:[Object(o.jsx)("h2",{children:i}),Object(o.jsxs)("form",{onSubmit:t,children:[Object(o.jsxs)("div",{children:["name: ",Object(o.jsx)("input",{value:n,onChange:r,required:!0})]}),Object(o.jsxs)("div",{children:["number: ",Object(o.jsx)("input",{value:c,onChange:a,required:!0})]}),Object(o.jsx)("div",{children:Object(o.jsx)("button",{type:"submit",children:"add"})})]})]})},m=function(e){var t=e.message,n=e.error;return 0===t.length?null:Object(o.jsx)("div",{className:"notification ".concat(n?"notification--error":""),children:t})},O=function(){var e=Object(r.useState)([]),t=Object(u.a)(e,2),n=t[0],c=t[1],a=Object(r.useState)(""),i=Object(u.a)(a,2),d=i[0],l=i[1],h=Object(r.useState)(""),O=Object(u.a)(h,2),p=O[0],v=O[1],g=Object(r.useState)(""),x=Object(u.a)(g,2),w=x[0],C=x[1],N=Object(r.useState)(""),k=Object(u.a)(N,2),P=k[0],y=k[1],S=Object(r.useState)(!1),L=Object(u.a)(S,2),F=L[0],E=L[1];Object(r.useEffect)((function(){j.getAll().then((function(e){c(e)}))}),[]);var A=function(){l(""),v("")},I=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:5;setTimeout((function(){y("")}),1e3*e)};return Object(o.jsxs)("div",{children:[Object(o.jsx)(m,{message:P,error:F}),Object(o.jsx)("h2",{children:"Phonebook"}),Object(o.jsx)(s,{handleFilterChange:function(e){C(e.target.value)}}),Object(o.jsx)(b,{addName:function(e){e.preventDefault();var t="".concat(d," is already in the phonebook, do you want to update the number?"),o=function(e){console.log(e.response.data),E(!0),y("".concat(e.response.data.error))};if(function(e,t){return 0!==t.filter((function(t){return t.name.toLowerCase()===e.toLowerCase()})).length}(d,n)){if(window.confirm(t)){var r=n.filter((function(e){return e.name.toLowerCase()===d.toLowerCase()}))[0].id;j.update(r,d,p).then((function(e){c(n.map((function(t){return t.id!==r?t:e}))),E(!1),y("".concat(d," has been updated in the phone book.")),I(),A()})).catch((function(e){return o(e)}))}}else j.add(d,p,n,c).then((function(e){return c(e)})).then((E(!1),y("".concat(d," has been saved to the phone book.")),void A())).catch((function(e){return o(e)}))},newName:d,handlePersonChange:function(e){l(e.target.value)},newPhone:p,handlePhoneChange:function(e){v(e.target.value)},title:"Add a new entry"}),Object(o.jsx)(f,{people:n,setPeople:c,filter:w,title:"Numbers",setIsError:E,setNotificationMsg:y,hideNotification:I})]})};n(38);i.a.render(Object(o.jsx)(c.a.StrictMode,{children:Object(o.jsx)(O,{})}),document.getElementById("root"))}},[[39,1,2]]]);
//# sourceMappingURL=main.3cd1d274.chunk.js.map