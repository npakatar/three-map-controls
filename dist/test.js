!function(t){var e={};function n(i){if(e[i])return e[i].exports;var a=e[i]={i:i,l:!1,exports:{}};return t[i].call(a.exports,a,a.exports,n),a.l=!0,a.exports}n.m=t,n.c=e,n.d=function(t,e,i){n.o(t,e)||Object.defineProperty(t,e,{configurable:!1,enumerable:!0,get:i})},n.r=function(t){Object.defineProperty(t,"__esModule",{value:!0})},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="/",n(n.s=6)}([function(t,e,n){t.exports=n(2)(67)},function(t,e,n){t.exports=n(2)(66)},function(t,e){t.exports=vendor},function(t,e,n){"use strict";n.r(e);var i=n(0),a=n(1),o=n.n(a);e.default=class extends i.EventDispatcher{constructor(t,e,n){super(),this.camera=t,this.domElement=void 0!==e?e:document,this.enabled=!0,this.target,this.minDistance=1,this.maxDistance=100,this.enableZoom=!0,this.zoomSpeed=6,this.zoomDampingAlpha=.1,this.initialZoom=0,this.enablePan=!0,this.keyPanSpeed=12,this.panDampingAlpha=.1,this.enableKeys=!0,this.keys={LEFT:37,UP:38,RIGHT:39,BOTTOM:40},this.mouseButtons={ZOOM:i.MOUSE.MIDDLE,PAN:i.MOUSE.LEFT},o.a.extend(this,n),this.target0=this.target.clone(),this.position0=this.camera.position.clone(),this.zoom0=this.camera.zoom,this._mouse=new i.Vector2,this._finalTargetDistance,this._currentTargetDistance,this._changeEvent={type:"change"},this._startEvent={type:"start"},this._endEvent={type:"end"},this._STATES={NONE:-1,DOLLY:1,PAN:2,TOUCH_DOLLY:4,TOUCH_PAN:5},this._state=this._STATES.NONE,this._panTarget=new i.Vector3,this._panCurrent=new i.Vector3,this._minZoomPosition=new i.Vector3,this._maxZoomPosition=new i.Vector3,this._panStart=new i.Vector2,this._panEnd=new i.Vector2,this._panDelta=new i.Vector2,this._dollyStart=new i.Vector2,this._dollyEnd=new i.Vector2,this._dollyDelta=new i.Vector2,this._camOrientation=new i.Vector2,this._lastMouse=new i.Vector2,this._zoomAlpha,this._init()}_init(){if(0==this.target.distanceToPoint(this.camera.position))throw new Error("ORIENTATION_UNKNOWABLE: initial Camera position cannot intersect target plane.");this._straightDollyTrack(),this.camera.position.lerpVectors(this._minZoomPosition,this._maxZoomPosition,this.initialZoom),this._finalTargetDistance=this._currentTargetDistance=Math.abs(this.target.distanceToPoint(this.camera.position)),this.camera.lookAt(this._maxZoomPosition),this._camOrientation=this._maxZoomPosition.clone().sub(this.camera.position).normalize(),this._updateZoomAlpha(),this.domElement.addEventListener("contextmenu",this._onContextMenu.bind(this),!1),this.domElement.addEventListener("mousedown",this._onMouseDown.bind(this),!1),this.domElement.addEventListener("mousewheel",this._onMouseWheel.bind(this),!1),this.domElement.addEventListener("MozMousePixelScroll",this._onMouseWheel.bind(this),!1),this.domElement.addEventListener("touchstart",this._onTouchStart.bind(this),!1),this.domElement.addEventListener("touchend",this._onTouchEnd.bind(this),!1),this.domElement.addEventListener("touchmove",this._onTouchMove.bind(this),!1),this.domElement.addEventListener("keydown",this._onKeyDown.bind(this),!1),this.update()}_intersectCameraTarget(){var t,e;return o.a.each([-1,1],function(n){t||(e=new i.Ray(this.camera.position,this.target.normal.clone().multiplyScalar(n)),t=e.intersectPlane(this.target))}.bind(this)),{intersection:t,ray:e}}_straightDollyTrack(){this._updateDollyTrack(this._intersectCameraTarget().ray)}getZoomAlpha(){return this._zoomAlpha}reset(){this.target.copy(this.target0),this.camera.position.copy(this.position0),this.camera.zoom=this.zoom0,this.camera.updateProjectionMatrix(),this._init(),this.dispatchEvent(this._changeEvent),this.update(),this._state=this._STATES.NONE}update(){var t=new i.Vector3,e=new i.Vector3,n=this.camera.position;e.copy(this._panCurrent),this._panCurrent.lerp(this._panTarget,this.panDampingAlpha),t.subVectors(this._panCurrent,e),this._maxZoomPosition.add(t),this._minZoomPosition.add(t),n.lerpVectors(this._minZoomPosition,this._maxZoomPosition,this._updateZoomAlpha())}dispose(){this.domElement.removeEventListener("contextmenu",this._onContextMenu,!1),this.domElement.removeEventListener("mousedown",this._onMouseDown,!1),this.domElement.removeEventListener("mousewheel",this._onMouseWheel,!1),this.domElement.removeEventListener("MozMousePixelScroll",this._onMouseWheel,!1),this.domElement.removeEventListener("touchstart",this._onTouchStart,!1),this.domElement.removeEventListener("touchend",this._onTouchEnd,!1),this.domElement.removeEventListener("touchmove",this._onTouchMove,!1),document.removeEventListener("mousemove",this._onMouseMove,!1),document.removeEventListener("mouseup",this._onMouseUp,!1),this.domElement.removeEventListener("keydown",this._onKeyDown,!1)}zoomToFit(t,e,n,i){e=e||t.geometry.boundingSphere.center,n=n||2*t.geometry.boundingSphere.radius,void 0===i&&(i=n),this._panTarget.copy(t.localToWorld(e.clone())),this._panCurrent.copy(this._intersectCameraTarget().intersection),this._straightDollyTrack();var a=this.camera.fov*(Math.PI/180),o=2*Math.atan(Math.tan(a/2)*this.camera.aspect),s=n/i;this._finalTargetDistance=(s>this.camera.aspect?n:i)/2/Math.tan((s>this.camera.aspect?o:a)/2)}_updateZoomAlpha(){this._finalTargetDistance=Math.max(this.minDistance,Math.min(this.maxDistance,this._finalTargetDistance));var t=this._currentTargetDistance-this._finalTargetDistance,e=this.zoomDampingAlpha;return this._currentTargetDistance-=t*e,this._zoomAlpha=Math.abs(Math.round(1e5*(1-(this._currentTargetDistance-this.minDistance)/(this.maxDistance-this.minDistance)))/1e5),this._zoomAlpha}_updateDollyTrack(t){var e=t.intersectPlane(this.target);e&&(this._maxZoomPosition.addVectors(e,(new i.Vector3).subVectors(this.camera.position,e).normalize().multiplyScalar(this.minDistance)),this._minZoomPosition.copy(this._calculateMinZoom(this.camera.position,e)),this._finalTargetDistance=this._currentTargetDistance=e.clone().sub(this.camera.position).length())}_getZoomScale(){return Math.pow(.95,this.zoomSpeed)}_panLeft(t,e){var n=new i.Vector3;n.setFromMatrixColumn(e,0),n.multiplyScalar(-t),this._panTarget.add(n)}_panUp(t,e){var n=new i.Vector3;n.setFromMatrixColumn(e,1),n.multiplyScalar(t),this._panTarget.add(n)}_pan(t,e){var n=this.domElement===document?this.domElement.body:this.domElement,a=new i.Ray(this.camera.position,this._camOrientation).distanceToPlane(this.target);a*=Math.tan(this.camera.fov/2*Math.PI/180),this._panLeft(2*t*a/n.clientHeight,this.camera.matrix),this._panUp(2*e*a/n.clientHeight,this.camera.matrix)}_dollyIn(t){this._cameraOfKnownType()?this._finalTargetDistance/=t:(console.warn("WARNING: MapControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyOut(t){this._cameraOfKnownType()?this._finalTargetDistance*=t:(console.warn("WARNING: MapControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_cameraOfKnownType(){return"PerspectiveCamera"===this.camera.type}_handleUpdateDollyTrackMouse(t){var e=this._mouse.clone();if(this._mouse.set(t.offsetX/this.domElement.clientWidth*2-1,-t.offsetY/this.domElement.clientHeight*2+1),!e.equals(this._mouse)){var n=new i.Raycaster;n.setFromCamera(this._mouse,this.camera),this._updateDollyTrack(n.ray)}}_handleMouseDownDolly(t){this._handleUpdateDollyTrackMouse(t),this._dollyStart.set(t.offsetX,t.offsetY)}_handleMouseDownPan(t){this._panStart.set(t.offsetX,t.offsetY)}_handleMouseMoveDolly(t){this._handleUpdateDollyTrackMouse(t),this._dollyEnd.set(t.offsetX,t.offsetY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyIn(this._getZoomScale()):this._dollyDelta.y<0&&this._dollyOut(this._getZoomScale()),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(t){this._panEnd.set(t.offsetX,t.offsetY),this._panDelta.subVectors(this._panEnd,this._panStart),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseUp(t){}_calculateMinZoom(t,e){return e.clone().add(t.clone().sub(e).normalize().multiplyScalar(this.maxDistance))}_handleMouseWheel(t){this._handleUpdateDollyTrackMouse(t);var e=0;void 0!==t.wheelDelta?e=t.wheelDelta:void 0!==t.detail&&(e=-t.detail),e>0?this._dollyOut(this._getZoomScale()):e<0&&this._dollyIn(this._getZoomScale()),this.update()}_handleKeyDown(t){switch(t.keyCode){case this.keys.UP:this._pan(0,this.keyPanSpeed),this.update();break;case this.keys.BOTTOM:this._pan(0,-this.keyPanSpeed),this.update();break;case this.keys.LEFT:this._pan(this.keyPanSpeed,0),this.update();break;case this.keys.RIGHT:this._pan(-this.keyPanSpeed,0),this.update()}}_handleUpdateDollyTrackTouch(t){var e=new i.Vector2,n=t.touches[0].pageX-t.touches[1].pageX,a=t.touches[0].pageY-t.touches[1].pageY;e.x=t.touches[0].pageX+n/2,e.y=t.touches[0].pageY+a/2;var o=new i.Vector2;o.x=e.x/domElement.clientWidth*2-1,o.y=-e.y/domElement.clientHeight*2+1,this._updateDollyTrack(o)}_handleTouchStartDolly(t){this._handleUpdateDollyTrackTouch(t);var e=t.touches[0].pageX-t.touches[1].pageX,n=t.touches[0].pageY-t.touches[1].pageY,i=Math.sqrt(e*e+n*n);this._dollyStart.set(0,i)}_handleTouchStartPan(t){this._panStart.set(t.touches[0].pageX,t.touches[0].pageY)}_handleTouchMoveDolly(t){this._handleUpdateDollyTrackTouch(t);var e=t.touches[0].pageX-t.touches[1].pageX,n=t.touches[0].pageY-t.touches[1].pageY,i=Math.sqrt(e*e+n*n);this._dollyEnd.set(0,i),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale()):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale()),this._dollyStart.copy(this._dollyEnd),this.update()}_handleTouchMovePan(t){this._panEnd.set(t.touches[0].pageX,t.touches[0].pageY),this._panDelta.subVectors(this._panEnd,this._panStart),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleTouchEnd(t){}_onMouseDown(t){if(!1!==this.enabled){if(t.preventDefault(),t.button===this.mouseButtons.ZOOM){if(!1===this.enableZoom)return;this._handleMouseDownDolly(t),this._state=this._STATES.DOLLY}else if(t.button===this.mouseButtons.PAN){if(!1===this.enablePan)return;this._handleMouseDownPan(t),this._state=this._STATES.PAN}this._state!==this._STATES.NONE&&(document.addEventListener("mousemove",this._onMouseMove.bind(this),!1),document.addEventListener("mouseup",this._onMouseUp.bind(this),!1),this.dispatchEvent(this._startEvent))}}_onMouseMove(t){if(!1!==this.enabled)if(t.preventDefault(),this._state===this._STATES.DOLLY){if(!1===this.enableZoom)return;this._handleMouseMoveDolly(t)}else if(this._state===this._STATES.PAN){if(!1===this.enablePan)return;this._handleMouseMovePan(t)}}_onMouseUp(t){!1!==this.enabled&&(this._handleMouseUp(t),document.removeEventListener("mousemove",this._onMouseMove,!1),document.removeEventListener("mouseup",this._onMouseUp,!1),this.dispatchEvent(this._endEvent),this._state=this._STATES.NONE)}_onMouseWheel(t){!1!==this.enabled&&!1!==this.enableZoom&&this._state===this._STATES.NONE&&(t.preventDefault(),t.stopPropagation(),this._handleMouseWheel(t),this.dispatchEvent(this._startEvent),this.dispatchEvent(this._endEvent))}_onKeyDown(t){!1!==this.enabled&&!1!==this.enableKeys&&!1!==this.enablePan&&this._handleKeyDown(t)}_onTouchStart(t){if(!1!==this.enabled){switch(t.touches.length){case 1:if(!1===this.enablePan)return;this._handleTouchStartPan(t),this._state=this._STATES.TOUCH_PAN;break;case 2:if(!1===this.enableZoom)return;this._handleTouchStartDolly(t),this._state=this._STATES.TOUCH_DOLLY;break;default:this._state=this._STATES.NONE}this._state!==this._STATES.NONE&&this.dispatchEvent(this._startEvent)}}_onTouchMove(t){if(!1!==this.enabled)switch(t.preventDefault(),t.stopPropagation(),t.touches.length){case 1:if(!1===this.enablePan)return;if(this._state!==this._STATES.TOUCH_PAN)return;this._handleTouchMovePan(t);break;case 2:if(!1===this.enableZoom)return;if(this._state!==this._STATES.TOUCH_DOLLY)return;this._handleTouchMoveDolly(t);break;default:this._state=this._STATES.NONE}}_onTouchEnd(t){!1!==this.enabled&&(this._handleTouchEnd(t),this.dispatchEvent(this._endEvent),this._state=this._STATES.NONE)}_onContextMenu(t){t.preventDefault()}}},function(t,e,n){t.exports=n(2)(64)},function(t,e,n){t.exports=n(2)(7)},function(t,e,n){"use strict";(function(t){var e=n(4),i=n(0),a=n(1),o=n(3).default;console.log=function(t){var e=document.createElement("div");e.className="log",e.innerText=t,window.document.body.appendChild(e)},window.onload=function(){var n=document.body,s=new i.PerspectiveCamera(45,n.clientWidth/n.clientHeight,1,1e3),h={};a.each([t.document,n],function(t){t.addEventListener=function(t,e){h[t]=e},t.removeEventListener=function(){}});var r,l={target:new i.Plane(new i.Vector3(0,0,1),0),minDistance:2,maxDistance:20};function c(t){a.each(new Array(t),function(){r.update()})}function u(){return Math.abs(r.target.distanceToPoint(s.position))}var d=function(){};function m(t){return this.preventDefault=d,this.stopPropagation=d,a.extend(this,t)}var p=400,_=300,y=new i.Raycaster,v=function(){var t=new i.Vector2(p/n.width*2-1,-_/n.height*2+1);return y.setFromCamera(t,r.camera),y.ray.intersectPlane(r.target)},E=new i.Vector3(3,2,-20);e("shouldn't allow initialization if camera intersects plane",function(t){try{r=new o(s,n,l),t.fail("controls created where camera intersects target plane")}catch(e){t.pass("camera cannot intersect target plane on init")}var e=E.clone();e.z=-1,s.position.copy(e);try{r=new o(s,n,l),t.pass("controls created correctly")}catch(e){t.fail("controls not created successfully")}t.end()}),e("should initialize with cam at controls.maxDistance by default",function(t){var e=u();t.equals(e,r.maxDistance),t.equals(r.getZoomAlpha(),r.initialZoom),t.end()}),e("shouldn't move from initial position if no input received",function(t){c(10);var e=u();t.equals(e,r.maxDistance),t.ok(E.equals(r.camera.position)),t.end()}),e("should automatically orient camera towards plane based on starting position",function(t){var e=s.getWorldDirection();t.ok(e.equals(r.target.normal)||e.multiplyScalar(-1).equals(r.target.normal)),t.end()}),e("should lerp camera towards target plane on mousewheel",function(t){var e=u();h.mousewheel(new m({wheelDelta:1})),c(1e3);var n=u(),i=e*Math.pow(.95,r.zoomSpeed);t.equals(Math.round(1e3*i),Math.round(1e3*n)),t.end()}),e("should stop zooming at minDistance from target plane",function(t){a.each(new Array(20),function(){h.mousewheel(new m({wheelDelta:1}))}),c(1e3);var e=u();t.equals(Math.round(1e3*r.minDistance),Math.round(1e3*e)),t.equals(r.getZoomAlpha(),1),t.end()}),e("reset should revert camera to correct initial position",function(t){r.reset(),t.ok(E.equals(r.camera.position)),t.end()}),e("should zoom into mouse pointer",function(t){var e=v(),n=(new i.Vector3).addVectors(e,(new i.Vector3).subVectors(r.camera.position,e).normalize().multiplyScalar(r.minDistance));a.each(new Array(30),function(){h.mousewheel(new m({wheelDelta:1,clientX:p,clientY:_}))}),c(1e3);var o=Math.abs((new i.Vector3).subVectors(n,r.camera.position).length());t.ok(o<=1e-5),t.end()});var f=function(t,e,n){h.mousedown(new m({clientX:p,clientY:_,button:r.mouseButtons.PAN}));var a=(new i.Vector3).subVectors(v().multiplyScalar(-1),r.camera.position);p=e,_=n,h.mousemove(new m({clientX:p,clientY:_})),c(1e3);var o=(new i.Vector3).subVectors(v().multiplyScalar(-1),r.camera.position);t.ok(Math.abs((new i.Vector3).subVectors(o,a).length())<=1e-4)};e("mouse should keep same world coordinates under it during camera pan (pan calibration)",function(t){r.reset(),f(t,400,500),t.end()}),p=400,_=300,e("initialZoom parameter should set the default cam position correctly",function(t){r.initialZoom=.5,r.reset();var e=E.z+(r.maxDistance-r.minDistance)/2;t.equals(r.camera.position.z,e),r.initialZoom=1,r.reset();e=-r.minDistance;t.equals(r.camera.position.z,e),t.end()}),e("pan calibration should hold true when zoomed in",function(t){f(t,400,500),t.end()})}}).call(this,n(5))}]);
//# sourceMappingURL=test.js.map