(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{100:function(e,t,a){},101:function(e,t,a){},102:function(e,t,a){},140:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),s=a(28),c=a.n(s),i=(a(70),a(12)),u=a(7),l=a(15),o=a(13),b=a(14),d=a(55),f=(a(71),a(18)),v=(a(99),a(100),function(e){function t(){return Object(i.a)(this,t),Object(l.a)(this,Object(o.a)(t).apply(this,arguments))}return Object(b.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){var e,t=this;return this.props.row>=1?e="bead bead_bottom":0===this.props.row&&(e="bead bead_upper"),r.a.createElement(f.a,null,function(a){var n=a.state.abacusState[t.props.column][t.props.row].currentY,s={transform:"translateY(".concat(n,"px)")};return r.a.createElement("div",{style:s,className:"".concat(e),id:t.props.column+" "+t.props.row})})}}]),t}(n.Component)),S=(a(101),function(e){function t(){return Object(i.a)(this,t),Object(l.a)(this,Object(o.a)(t).apply(this,arguments))}return Object(b.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){return r.a.createElement(f.a,null,function(e){return"finished"===e.state.levelState?r.a.createElement("p",{className:"value"},"\u0421\u0431\u0440\u043e\u0441 \u0438 \u0434\u0430\u043b\u0435\u0435"):r.a.createElement("p",{className:"value"},e.state.value)})}}]),t}(n.Component)),m=function(e){function t(){return Object(i.a)(this,t),Object(l.a)(this,Object(o.a)(t).apply(this,arguments))}return Object(b.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){return r.a.createElement(f.a,null,function(e){return r.a.createElement("div",{style:e.state.enableAbacus?{}:{pointerEvents:"none",opacity:"0.4"},className:"abacus"+e.state.abacusState.length,id:"abacus",onTouchStart:function(t){return e.actions.dragStart(t)},onTouchMove:function(t){return e.actions.drag(t)},onTouchEnd:function(t){return e.actions.dragEnd(t)},onMouseDown:function(t){return e.actions.dragStart(t)},onMouseMove:function(t){return e.actions.drag(t)},onMouseUp:function(t){return e.actions.dragEnd(t)}},r.a.createElement("div",{className:"button_holder"},r.a.createElement("div",{className:"somecass",onMouseDown:function(t){return e.actions.resetStart(t)},onMouseUp:function(t){return e.actions.resetEnd(t)},onTouchStart:function(t){return e.actions.resetStart(t)},onTouchEnd:function(t){return e.actions.resetEnd(t)},id:"pressarea"},r.a.createElement("div",{className:"reset",id:"reset"}))),r.a.createElement("div",{className:"upperedge edgefillhor"}),e.state.abacusState.map(function(e,t){return r.a.createElement(r.a.Fragment,{key:"column_"+t},r.a.createElement("div",{className:"uppercontainer"+t,id:"uc1"},r.a.createElement(v,{column:t,row:0})),r.a.createElement("div",{className:"separator"+t+" sepfill",id:"sp"+t},0===t?r.a.createElement("div",{className:"circle",id:"circle"}):""),r.a.createElement("div",{className:"bottomcontainer"+t},r.a.createElement("div",{className:"beadspacer"}),r.a.createElement(v,{column:t,row:1}),r.a.createElement(v,{column:t,row:2}),r.a.createElement(v,{column:t,row:3}),r.a.createElement(v,{column:t,row:4})))}),r.a.createElement("div",{className:"bottomedge edgefillhor"},r.a.createElement(S,null)),r.a.createElement("div",{className:"rightedge edgefillvert"}))})}}]),t}(n.Component),p=a(58),g=(a(102),function(e){function t(){return Object(i.a)(this,t),Object(l.a)(this,Object(o.a)(t).apply(this,arguments))}return Object(b.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){return r.a.createElement("div",null,this.props.tutorialState.sequence[this.props.tutorialState.currentExercise])}}]),t}(n.Component)),h=function(e){return r.a.createElement(f.b.Consumer,null,function(t){var a=t.state.tutorialState;return Object(p.a)(t.actions),r.a.createElement(g,Object.assign({},e,{tutorialState:a}))})},O=a(153),E=function(e){function t(){return Object(i.a)(this,t),Object(l.a)(this,Object(o.a)(t).apply(this,arguments))}return Object(b.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){var e=this;return r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:"app",id:"game"},r.a.createElement("div",{className:"header"},r.a.createElement(O.a,{onClick:function(t){return e.props.restartTutorial()},variant:"contained",color:"default"},"\u0420\u0435\u0441\u0442\u0430\u0440\u0442")),r.a.createElement("div",{className:"helper"}),r.a.createElement("div",{className:"exercise"},r.a.createElement(h,null)),r.a.createElement("div",{className:"abacusholder"},r.a.createElement(m,null))))}}]),t}(r.a.Component),j=function(e){return r.a.createElement(f.b.Consumer,null,function(t){var a=t.state.allLevelsState,n=t.actions.restartTutorial;return r.a.createElement(E,Object.assign({},e,{allLevelsState:a,restartTutorial:n}))})},y=a(5),x=a(60);function w(){var e=Object(d.a)(["\n    display: block;\n    margin: 0 auto;\n    border-color: red;\n"]);return w=function(){return e},e}var Y=Object(y.css)(w()),T=function(e){function t(){return Object(i.a)(this,t),Object(l.a)(this,Object(o.a)(t).apply(this,arguments))}return Object(b.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){return r.a.createElement(f.c,{location:this.props.location},r.a.createElement(L,null))}}]),t}(n.Component);function L(){var e=Object(n.useContext)(f.b);return console.log(e),e.state.loading?r.a.createElement("div",{className:"sweet-loading"},r.a.createElement(x.ClipLoader,{css:Y,sizeUnit:"px",size:150,color:"#123abc",loading:e.state.loading})):r.a.createElement(j,null)}Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var N=a(61),C=a(27),k=document.getElementById("root");c.a.render(r.a.createElement(N.a,null,r.a.createElement(C.a,{path:"/",component:T})),k),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})},16:function(e,t,a){"use strict";a.d(t,"b",function(){return n}),a.d(t,"a",function(){return s}),a.d(t,"c",function(){return c}),a.d(t,"e",function(){return r}),a.d(t,"d",function(){return i});var n=function(e){for(var t=String(e).length,a=[],n=1;n<=t;n++){a.push([]);for(var r=1;r<=5;r++)a[n-1].push({beadState:0,active:!1,currentY:0,initialY:0,yOffset:0})}return a},r=function(e,t){var a=String(e).length;console.log(a);for(var n=[],r=1;r<=5;r++)n.push({beadState:0,active:!1,currentY:0,initialY:0,yOffset:0});var s=a-t.length;console.log(a,t.length);for(var c=1;c<=s;c++)t.push(n);return t};function s(e){for(var t=0,a=0;a<e.length;a++)t+=(5*e[a][0].beadState+Math.max(e[a][1].beadState,2*e[a][2].beadState,3*e[a][3].beadState,4*e[a][4].beadState))*Math.pow(10,a);return t}function c(e,t,a,n,r){var s;if(0===e){if(0===t)return s=n;if(1===t)return s=r-n+1;if(2===t){for(s=u(1,99);s===a;)s=u(1,99);return s}}return 0}var i=function(e){var t=[];return e.forEach(function(e){t=t.concat(function(e,t,a){var n=[];for(;n.length<e;){var r=u(t,a);-1===n.indexOf(r)&&n.push(r)}for(;0===n[0];)l(n);return n}(10,Math.pow(10,e.digits-1)-1,Math.pow(10,e.digits)))}),t};function u(e,t){return Math.floor(Math.random()*(t-e))+e}function l(e){console.log("shuffled");for(var t=e.length-1;t>0;t--){var a=Math.floor(Math.random()*(t+1)),n=[e[a],e[t]];e[t]=n[0],e[a]=n[1]}}},18:function(e,t,a){"use strict";(function(e){a.d(t,"b",function(){return S}),a.d(t,"c",function(){return m}),a.d(t,"a",function(){return p});var n=a(12),r=a(7),s=a(15),c=a(13),i=a(14),u=a(0),l=a.n(u),o=a(56),b=a.n(o),d=a(57),f=a.n(d),v=a(16),S=l.a.createContext(),m=function(t){function a(){var t,r;Object(n.a)(this,a);for(var i=arguments.length,u=new Array(i),l=0;l<i;l++)u[l]=arguments[l];return(r=Object(s.a)(this,(t=Object(c.a)(a)).call.apply(t,[this].concat(u)))).startResetDrag=!1,r.resetX0=0,r.resetx1=0,r.resetDx=0,r.state={loading:!0,elapsedSec:0,showWinPopup:!1,selectedOperation:0,selectedSublevel:null,seq:[],ans:null,ansPosition:0,beadHeight:0,value:0,dragged:{c:null,r:null},active:!1,enableAbacus:!0,allLevelsState:[],abacusState:[],serverConfig:{config:{gamemode:"game"}}},r.dragStart=function(e){if(r.state.enableAbacus)try{"sp0"!==e.target.id&&"circle"!==e.target.id||(r.startResetDrag=!0,"touchstart"===e.type?r.resetX0=e.touches[0].clientX:r.resetX0=e.clientX);var t=Object.assign({},r.state);t.dragged.c=parseInt(e.target.id[0]),t.dragged.r=parseInt(e.target.id[2]),t.levelState="started";var a,n=parseInt(e.target.id[0]),s=parseInt(e.target.id[2]);a=document.querySelector("#uc1").getBoundingClientRect().height,t.beadHeight=a,"touchstart"===e.type?t.abacusState[n][s].initialY=e.touches[0].clientY-r.state.abacusState[n][s].yOffset:t.abacusState[n][s].initialY=e.clientY-r.state.abacusState[n][s].yOffset,e.target!==e.currentTarget&&(t.active=!0),r.setState(t)}catch(e){}},r.drag=function(e){var t,a;if(r.state.enableAbacus)try{if(!0===r.state.active){t=r.state.dragged.c,a=r.state.dragged.r;var n,s=Object.assign({},r.state),c=s.beadHeight;if(e.preventDefault(),n="touchmove"===e.type?e.touches[0].clientY-r.state.abacusState[t][a].initialY:e.clientY-r.state.abacusState[t][a].initialY,!r.state.abacusState[t][a].beadState){if(0===a&&n>=0){if(!(n<c/4))return n=c/2,s.abacusState[t][a].yOffset=n,s.abacusState[t][a].currentY=n,s.abacusState[t][a].beadState=1,s.active=!1,r.setState(s),!1;s.abacusState[t][a].currentY=n}if([1,2,3,4].includes(a)&&n<0){if(!(n>-1*c/4)){n=-1*c/2;for(var i=1;i<=a;i++)s.abacusState[t][i].beadState=1,s.abacusState[t][i].yOffset=n,s.abacusState[t][i].currentY=n;return s.active=!1,r.setState(s),!1}s.abacusState[t][a].currentY=n;for(var u=1,l=1;l<=4;l++)1===s.abacusState[t][l].beadState&&(u=l+1);for(var o=u;o<=a;o++)s.abacusState[t][o].currentY=n,s.abacusState[t][o].yOffset=n}}if(s.abacusState[t][a].beadState){if(0===a)if(s.abacusState[t][a].currentY>c/4)s.abacusState[t][a].currentY=n,s.abacusState[t][a].yOffset=n;else if(n<=c/4)return n=0,s.abacusState[t][a].currentY=n,s.abacusState[t][a].yOffset=n,s.abacusState[t][a].beadState=0,s.active=!1,r.setState(s),!1;if([1,2,3,4].includes(a)&&n<0){if(n<=-1*c/4&&n>-1*c/2){for(var b=4,d=4;d>0;d--)0===s.abacusState[t][d].beadState&&(b=d-1);for(var f=a;f<=b;f++)s.abacusState[t][f].currentY=n,s.abacusState[t][f].yOffset=n}if(n>-1*c/4){n=0;for(var v=a;v<=4;v++)s.abacusState[t][v].beadState=0,s.abacusState[t][v].yOffset=n,s.abacusState[t][v].currentY=n;return s.active=!1,r.setState(s),!1}}}r.setState(s)}}catch(e){}},r.dragEnd=function(e){if(r.state.enableAbacus){r.startResetDrag&&(r.startResetDrag=!1,"touchstart"===e.type?r.resetX1=e.touches[0].clientX:r.resetX1=e.clientX,r.resetX1<r.resetX0&&r.resetAbacus());try{var t,a=r.state.dragged.c,n=r.state.dragged.r,s=Object.assign({},r.state),c=s.beadHeight,i=s.abacusState[a][n].currentY;if(!s.abacusState[a][n].beadState&&(0===n&&i<c/2&&(i=0,s.abacusState[a][n].yOffset=i,s.abacusState[a][n].currentY=i),[1,2,3,4].includes(n)&&i>-1*c/4)){for(var u=1,l=1;l<=4;l++)1===s.abacusState[a][l].beadState&&(u=l+1);for(var o=u;o<=n;o++)s.abacusState[a][o].currentY=0,s.abacusState[a][o].yOffset=0}if(s.abacusState[a][n].beadState&&(0===n&&i>c/4&&(i=c/2,s.abacusState[a][n].currentY=i,s.abacusState[a][n].yOffset=i),[1,2,3,4].includes(n)&&s.abacusState[a][n].currentY>-1*c/2)){for(var b=4,d=4;d>0;d--)0===s.abacusState[a][d].beadState&&(b=d-1);for(var f=n;f<=b;f++)i=-1*c/2,s.abacusState[a][f].yOffset=i,s.abacusState[a][f].currentY=i}s.abacusState[a][n].initialY=i,s.active=!1,s.dragged.c=null,s.dragged.r=null,s.value=Object(v.a)(s.abacusState),s.value===s.tutorialState.sequence[s.tutorialState.currentExercise]&&(s.tutorialState.currentExercise+=1,s.tutorialState.currentExercise<=s.tutorialState.sequence.length-1?(t=s.tutorialState.sequence[s.tutorialState.currentExercise],s.abacusState=Object(v.e)(t,s.abacusState)):(s.showWinPopup=!0,s.enableAbacus=!1)),r.setState(s)}catch(e){console.log(e)}}},r.resetAbacus=function(){if(3===r.state.ansPosition)r.nextLevel();else{var e=Object.assign({},r.state);e.abacusState=Object(v.b)(e.tutorialState.sequence[e.tutorialState.currentExercise]),e.ansPosition=0,e.value=0,e.levelState="started",r.setState(e)}},r.resetStart=function(){document.getElementById("reset").setAttribute("class","reset reset_clicked"),r.resetAbacus()},r.resetEnd=function(){document.getElementById("reset").setAttribute("class","reset")},r.restartGame=function(e,t){var a=Object.assign({},r.state);a.allLevelsState[e].sublevels[t].elapsedTime=0,a.allLevelsState[e].sublevels[t].currentExercise=1,a.allLevelsState[e].sublevels[t].gameState="entered",a.showWinPopup=!1,a.enableAbacus=!0,a.abacusState=Object(v.b)(),a.value=0,a.allLevelsState[e].sublevels[t].elapsedTime=0;var n=a.allLevelsState[e].sublevels[t].currentExercise,s=a.allLevelsState[e].sublevels[t].exerciseCount;a.ans=Object(v.c)(e,t,null,n,s),a.allLevelsState[a.selectedOperation].sublevels[a.selectedSublevel].elapsedTime=0,r.setState(a)},r.restartTutorial=function(){var e=Object.assign({},r.state);e.enableAbacus=!0,e.tutorialState.currentExercise=0,e.abacusState=Object(v.b)(e.tutorialState.sequence[e.tutorialState.currentExercise]),e.value=0,e.showWinPopup=!1;var t=Object(v.d)(e.serverConfig.config.game);e.tutorialState.sequence=t,r.setState(e)},r.startTutorial=function(){var e=Object.assign({},r.state),t=e.tutorialState.sequence[e.tutorialState.currentExercise];e.abacusState=Object(v.b)(t),r.setState(e)},r.startGame=function(e,t){if(0===e){var a=Object.assign({},r.state),n=a.allLevelsState[e].sublevels[t].currentExercise,s=a.allLevelsState[e].sublevels[t].exerciseCount;a.selectedOperation=e,a.selectedSublevel=t,a.ans=Object(v.c)(e,t,null,n,s),"notentered"===a.allLevelsState[e].sublevels[t].gameState&&(a.allLevelsState[e].sublevels[t].gameState="entered"),a.showWinPopup=!1,a.enableAbacus=!0,a.allLevelsState[e].sublevels[t].currentExercise-1===a.allLevelsState[e].sublevels[t].exerciseCount&&(a.showWinPopup=!0,a.enableAbacus=!1),a.abacusState=Object(v.b)(),r.setState(a)}else{var c=r.process(),i=Object.assign({},r.state);i.seq=c.seq,i.ans=c.answer[0],i.gameStarted=!0,r.setState(i)}},r.startTimer=function(){r.timer=setInterval(function(){var e=Object.assign({},r.state);e.allLevelsState[e.selectedOperation].sublevels[e.selectedSublevel].elapsedTime+=1,r.setState(e)},1e3)},r.stopTimer=function(){clearInterval(r.timer)},r.resetTimer=function(){var e=Object.assign({},r.state);e.allLevelsState[e.selectedOperation].sublevels[e.selectedSublevel].elapsedTime=0,r.setState(e)},r.gotoMenu=function(){var e=Object.assign({},r.state);e.selectedSublevel=null,r.setState(e)},r.selectOperation=function(e){var t=Object.assign({},r.state);t.selectedOperation=e,r.setState(t)},r.nextLevel=function(){var t=Object.assign({},r.state);t.ansPosition=0,t.levelState="notentered",t.value=0,t.abacusState=Object(v.b)();var a=e();t.seq=a.seq,t.ans=a.answer[0],r.setState(t)},r}return Object(i.a)(a,t),Object(r.a)(a,[{key:"componentDidMount",value:function(){var e=this,t=f.a.parse(this.props.location.search);b.a.get("http://194.67.201.238/api/v0.1/courses-management/games?token="+t.token).then(function(t){var a=Object.assign({},e.state);a.loading=!1;var n=JSON.parse(t.data.data.config),r=JSON.parse(t.data.data.properties),s=Object(v.d)(n.game);a.serverConfig.config=n,a.serverConfig.properties=r,a.tutorialState={currentExercise:r.currentExercise,sequence:s};var c=a.tutorialState.sequence[a.tutorialState.currentExercise];a.abacusState=Object(v.b)(c),e.setState(a)})}},{key:"componentWillMount",value:function(){}},{key:"componentDidUpdate",value:function(){for(var e=0,t=0;t<=this.state.ansPosition;t++)e+=this.state.seq[t];if(this.state.value===e){var a=Object.assign({},this.state);a.ansPosition=this.state.ansPosition+1,3===a.ansPosition&&(a.levelState="finished"),this.setState(a)}}},{key:"render",value:function(){return l.a.createElement(S.Provider,{value:{state:this.state,actions:{gotoMenu:this.gotoMenu,selectOperation:this.selectOperation,nextExample:this.nextExample,startGame:this.startGame,restartGame:this.restartGame,restartTutorial:this.restartTutorial,endGame:this.endGame,nextLevel:this.nextLevel,resetStart:this.resetStart,resetEnd:this.resetEnd,dragStart:this.dragStart,drag:this.drag,dragEnd:this.dragEnd,startTimer:this.startTimer,stopTimer:this.stopTimer}}},this.props.children)}}]),a}(u.Component),p=S.Consumer}).call(this,a(45))},65:function(e,t,a){e.exports=a(140)},70:function(e,t,a){},71:function(e,t,a){},99:function(e,t,a){}},[[65,1,2]]]);
//# sourceMappingURL=main.a691a5e1.chunk.js.map