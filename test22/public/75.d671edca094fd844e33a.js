(self.webpackChunkzz_test_mat_hints=self.webpackChunkzz_test_mat_hints||[]).push([[75],{99075:(e,t,n)=>{"use strict";n.r(t),n.d(t,{ShippingInformationModule:()=>H});var i=n(61116),o=n(68003),a=n(16304),r=n(35366),c=n(31041),s=n(82151),m=n(10018),d=n(16301),l=n(42693),h=n(529),p=n(95666);let u=(()=>{class e{constructor(e,t){this.http=e,this.repo=t,this.stripe=new Stripe(h.N.stripe_pkey),this.lastSession={},this.serverUrl=h.N.siteUrl,this.ba4Hdr=(new l.WM).set("Content-Type","application/json").set("X-Parse-Application-Id",h.N.PARSE_APP_ID).set("X-Parse-REST-API-Key",h.N.PARSE_REST_API_KEY)}testResponse(){this.http.get(this.serverUrl+"small",{headers:this.ba4Hdr}).subscribe(console.log)}createPaymentIntent(e){return this.http.post(this.serverUrl+"create-payment-intent",e)}oneTimeCheckoutWithCheckoutSessionV2(e,t){var n=this;return(0,a.Z)(function*(){const i={payment_method_types:["card"],line_items:n.formatLineItems(t.cart),mode:"payment",success_url:h.N.siteUrl+"/#/order-statement",cancel_url:h.N.siteUrl+"/#/order-statement"};return console.log("shipping infor",e),n.http.post(n.serverUrl+"create-checkout-session",i,{headers:n.ba4Hdr}).toPromise().then(i=>{const o={payment:{amount_total:i.amount_total,mode:i.mode,payment_intent:i.payment_intent,payment_status:i.payment_status,id:i.id},shippingInfo:e,basket:t};try{return n.repo.postToCloudFunction(o)}catch(a){throw console.log("error throw in postToCloudFunction",a.message),a}})})()}_redirectToCheckout(e){var t=this;return(0,a.Z)(function*(){const n=yield t.stripe.redirectToCheckout({sessionId:e});console.log("_redirectToCheckout",n)})()}formatLineItems(e){const t=[];for(const n of e){const e={price_data:{currency:"gbp",unit_amount:Math.round(100*n.price),product_data:{name:`${n.description}/ ${n.name}/ ${n.size}`,images:[]}},quantity:n.qty};t.push(e)}return t}}return e.\u0275fac=function(t){return new(t||e)(r.LFG(l.eN),r.LFG(p.k))},e.\u0275prov=r.Yz7({token:e,factory:e.\u0275fac,providedIn:"root"}),e})();var g=n(13070),k=n(9550),f=n(19861),b=n(87064),x=n(26136),_=n(27853),C=n(97388);const y=["input"],Z=function(e){return{enterDuration:e}},v=["*"],A=new r.OlP("mat-checkbox-default-options",{providedIn:"root",factory:w});function w(){return{color:"accent",clickAction:"check-indeterminate"}}let M=0;const P=w(),O={provide:c.JU,useExisting:(0,r.Gpc)(()=>U),multi:!0};class T{}class q{constructor(e){this._elementRef=e}}const I=(0,b.sb)((0,b.pj)((0,b.Kr)((0,b.Id)(q))));let U=(()=>{class e extends I{constructor(e,t,n,i,o,a,c){super(e),this._changeDetectorRef=t,this._focusMonitor=n,this._ngZone=i,this._animationMode=a,this._options=c,this.ariaLabel="",this.ariaLabelledby=null,this._uniqueId="mat-checkbox-"+ ++M,this.id=this._uniqueId,this.labelPosition="after",this.name=null,this.change=new r.vpe,this.indeterminateChange=new r.vpe,this._onTouched=()=>{},this._currentAnimationClass="",this._currentCheckState=0,this._controlValueAccessorChangeFn=()=>{},this._checked=!1,this._disabled=!1,this._indeterminate=!1,this._options=this._options||P,this.color=this.defaultColor=this._options.color||P.color,this.tabIndex=parseInt(o)||0}get inputId(){return`${this.id||this._uniqueId}-input`}get required(){return this._required}set required(e){this._required=(0,f.Ig)(e)}ngAfterViewInit(){this._focusMonitor.monitor(this._elementRef,!0).subscribe(e=>{e||Promise.resolve().then(()=>{this._onTouched(),this._changeDetectorRef.markForCheck()})}),this._syncIndeterminate(this._indeterminate)}ngAfterViewChecked(){}ngOnDestroy(){this._focusMonitor.stopMonitoring(this._elementRef)}get checked(){return this._checked}set checked(e){e!=this.checked&&(this._checked=e,this._changeDetectorRef.markForCheck())}get disabled(){return this._disabled}set disabled(e){const t=(0,f.Ig)(e);t!==this.disabled&&(this._disabled=t,this._changeDetectorRef.markForCheck())}get indeterminate(){return this._indeterminate}set indeterminate(e){const t=e!=this._indeterminate;this._indeterminate=(0,f.Ig)(e),t&&(this._transitionCheckState(this._indeterminate?3:this.checked?1:2),this.indeterminateChange.emit(this._indeterminate)),this._syncIndeterminate(this._indeterminate)}_isRippleDisabled(){return this.disableRipple||this.disabled}_onLabelTextChange(){this._changeDetectorRef.detectChanges()}writeValue(e){this.checked=!!e}registerOnChange(e){this._controlValueAccessorChangeFn=e}registerOnTouched(e){this._onTouched=e}setDisabledState(e){this.disabled=e}_getAriaChecked(){return this.checked?"true":this.indeterminate?"mixed":"false"}_transitionCheckState(e){let t=this._currentCheckState,n=this._elementRef.nativeElement;if(t!==e&&(this._currentAnimationClass.length>0&&n.classList.remove(this._currentAnimationClass),this._currentAnimationClass=this._getAnimationClassForCheckStateTransition(t,e),this._currentCheckState=e,this._currentAnimationClass.length>0)){n.classList.add(this._currentAnimationClass);const e=this._currentAnimationClass;this._ngZone.runOutsideAngular(()=>{setTimeout(()=>{n.classList.remove(e)},1e3)})}}_emitChangeEvent(){const e=new T;e.source=this,e.checked=this.checked,this._controlValueAccessorChangeFn(this.checked),this.change.emit(e),this._inputElement&&(this._inputElement.nativeElement.checked=this.checked)}toggle(){this.checked=!this.checked}_onInputClick(e){var t;const n=null===(t=this._options)||void 0===t?void 0:t.clickAction;e.stopPropagation(),this.disabled||"noop"===n?this.disabled||"noop"!==n||(this._inputElement.nativeElement.checked=this.checked,this._inputElement.nativeElement.indeterminate=this.indeterminate):(this.indeterminate&&"check"!==n&&Promise.resolve().then(()=>{this._indeterminate=!1,this.indeterminateChange.emit(this._indeterminate)}),this.toggle(),this._transitionCheckState(this._checked?1:2),this._emitChangeEvent())}focus(e,t){e?this._focusMonitor.focusVia(this._inputElement,e,t):this._inputElement.nativeElement.focus(t)}_onInteractionEvent(e){e.stopPropagation()}_getAnimationClassForCheckStateTransition(e,t){if("NoopAnimations"===this._animationMode)return"";let n="";switch(e){case 0:if(1===t)n="unchecked-checked";else{if(3!=t)return"";n="unchecked-indeterminate"}break;case 2:n=1===t?"unchecked-checked":"unchecked-indeterminate";break;case 1:n=2===t?"checked-unchecked":"checked-indeterminate";break;case 3:n=1===t?"indeterminate-checked":"indeterminate-unchecked"}return`mat-checkbox-anim-${n}`}_syncIndeterminate(e){const t=this._inputElement;t&&(t.nativeElement.indeterminate=e)}}return e.\u0275fac=function(t){return new(t||e)(r.Y36(r.SBq),r.Y36(r.sBO),r.Y36(C.tE),r.Y36(r.R0b),r.$8M("tabindex"),r.Y36(x.Qb,8),r.Y36(A,8))},e.\u0275cmp=r.Xpm({type:e,selectors:[["mat-checkbox"]],viewQuery:function(e,t){if(1&e&&(r.Gf(y,5),r.Gf(b.wG,5)),2&e){let e;r.iGM(e=r.CRH())&&(t._inputElement=e.first),r.iGM(e=r.CRH())&&(t.ripple=e.first)}},hostAttrs:[1,"mat-checkbox"],hostVars:12,hostBindings:function(e,t){2&e&&(r.Ikx("id",t.id),r.uIk("tabindex",null),r.ekj("mat-checkbox-indeterminate",t.indeterminate)("mat-checkbox-checked",t.checked)("mat-checkbox-disabled",t.disabled)("mat-checkbox-label-before","before"==t.labelPosition)("_mat-animation-noopable","NoopAnimations"===t._animationMode))},inputs:{disableRipple:"disableRipple",color:"color",tabIndex:"tabIndex",ariaLabel:["aria-label","ariaLabel"],ariaLabelledby:["aria-labelledby","ariaLabelledby"],id:"id",labelPosition:"labelPosition",name:"name",required:"required",checked:"checked",disabled:"disabled",indeterminate:"indeterminate",ariaDescribedby:["aria-describedby","ariaDescribedby"],value:"value"},outputs:{change:"change",indeterminateChange:"indeterminateChange"},exportAs:["matCheckbox"],features:[r._Bn([O]),r.qOj],ngContentSelectors:v,decls:17,vars:21,consts:[[1,"mat-checkbox-layout"],["label",""],[1,"mat-checkbox-inner-container"],["type","checkbox",1,"mat-checkbox-input","cdk-visually-hidden",3,"id","required","checked","disabled","tabIndex","change","click"],["input",""],["matRipple","",1,"mat-checkbox-ripple","mat-focus-indicator",3,"matRippleTrigger","matRippleDisabled","matRippleRadius","matRippleCentered","matRippleAnimation"],[1,"mat-ripple-element","mat-checkbox-persistent-ripple"],[1,"mat-checkbox-frame"],[1,"mat-checkbox-background"],["version","1.1","focusable","false","viewBox","0 0 24 24",0,"xml","space","preserve",1,"mat-checkbox-checkmark"],["fill","none","stroke","white","d","M4.1,12.7 9,17.6 20.3,6.3",1,"mat-checkbox-checkmark-path"],[1,"mat-checkbox-mixedmark"],[1,"mat-checkbox-label",3,"cdkObserveContent"],["checkboxLabel",""],[2,"display","none"]],template:function(e,t){if(1&e&&(r.F$t(),r.TgZ(0,"label",0,1),r.TgZ(2,"span",2),r.TgZ(3,"input",3,4),r.NdJ("change",function(e){return t._onInteractionEvent(e)})("click",function(e){return t._onInputClick(e)}),r.qZA(),r.TgZ(5,"span",5),r._UZ(6,"span",6),r.qZA(),r._UZ(7,"span",7),r.TgZ(8,"span",8),r.O4$(),r.TgZ(9,"svg",9),r._UZ(10,"path",10),r.qZA(),r.kcU(),r._UZ(11,"span",11),r.qZA(),r.qZA(),r.TgZ(12,"span",12,13),r.NdJ("cdkObserveContent",function(){return t._onLabelTextChange()}),r.TgZ(14,"span",14),r._uU(15,"\xa0"),r.qZA(),r.Hsn(16),r.qZA(),r.qZA()),2&e){const e=r.MAs(1),n=r.MAs(13);r.uIk("for",t.inputId),r.xp6(2),r.ekj("mat-checkbox-inner-container-no-side-margin",!n.textContent||!n.textContent.trim()),r.xp6(1),r.Q6J("id",t.inputId)("required",t.required)("checked",t.checked)("disabled",t.disabled)("tabIndex",t.tabIndex),r.uIk("value",t.value)("name",t.name)("aria-label",t.ariaLabel||null)("aria-labelledby",t.ariaLabelledby)("aria-checked",t._getAriaChecked())("aria-describedby",t.ariaDescribedby),r.xp6(2),r.Q6J("matRippleTrigger",e)("matRippleDisabled",t._isRippleDisabled())("matRippleRadius",20)("matRippleCentered",!0)("matRippleAnimation",r.VKq(19,Z,"NoopAnimations"===t._animationMode?0:150))}},directives:[b.wG,_.wD],styles:["@keyframes mat-checkbox-fade-in-background{0%{opacity:0}50%{opacity:1}}@keyframes mat-checkbox-fade-out-background{0%,50%{opacity:1}100%{opacity:0}}@keyframes mat-checkbox-unchecked-checked-checkmark-path{0%,50%{stroke-dashoffset:22.910259}50%{animation-timing-function:cubic-bezier(0, 0, 0.2, 0.1)}100%{stroke-dashoffset:0}}@keyframes mat-checkbox-unchecked-indeterminate-mixedmark{0%,68.2%{transform:scaleX(0)}68.2%{animation-timing-function:cubic-bezier(0, 0, 0, 1)}100%{transform:scaleX(1)}}@keyframes mat-checkbox-checked-unchecked-checkmark-path{from{animation-timing-function:cubic-bezier(0.4, 0, 1, 1);stroke-dashoffset:0}to{stroke-dashoffset:-22.910259}}@keyframes mat-checkbox-checked-indeterminate-checkmark{from{animation-timing-function:cubic-bezier(0, 0, 0.2, 0.1);opacity:1;transform:rotate(0deg)}to{opacity:0;transform:rotate(45deg)}}@keyframes mat-checkbox-indeterminate-checked-checkmark{from{animation-timing-function:cubic-bezier(0.14, 0, 0, 1);opacity:0;transform:rotate(45deg)}to{opacity:1;transform:rotate(360deg)}}@keyframes mat-checkbox-checked-indeterminate-mixedmark{from{animation-timing-function:cubic-bezier(0, 0, 0.2, 0.1);opacity:0;transform:rotate(-45deg)}to{opacity:1;transform:rotate(0deg)}}@keyframes mat-checkbox-indeterminate-checked-mixedmark{from{animation-timing-function:cubic-bezier(0.14, 0, 0, 1);opacity:1;transform:rotate(0deg)}to{opacity:0;transform:rotate(315deg)}}@keyframes mat-checkbox-indeterminate-unchecked-mixedmark{0%{animation-timing-function:linear;opacity:1;transform:scaleX(1)}32.8%,100%{opacity:0;transform:scaleX(0)}}.mat-checkbox-background,.mat-checkbox-frame{top:0;left:0;right:0;bottom:0;position:absolute;border-radius:2px;box-sizing:border-box;pointer-events:none}.mat-checkbox{display:inline-block;transition:background 400ms cubic-bezier(0.25, 0.8, 0.25, 1),box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);cursor:pointer;-webkit-tap-highlight-color:transparent}._mat-animation-noopable.mat-checkbox{transition:none;animation:none}.mat-checkbox .mat-ripple-element:not(.mat-checkbox-persistent-ripple){opacity:.16}.mat-checkbox .mat-checkbox-ripple{position:absolute;left:calc(50% - 20px);top:calc(50% - 20px);height:40px;width:40px;z-index:1;pointer-events:none}.cdk-high-contrast-active .mat-checkbox.cdk-keyboard-focused .mat-checkbox-ripple{outline:solid 3px}.mat-checkbox-layout{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:inherit;align-items:baseline;vertical-align:middle;display:inline-flex;white-space:nowrap}.mat-checkbox-label{-webkit-user-select:auto;-moz-user-select:auto;-ms-user-select:auto;user-select:auto}.mat-checkbox-inner-container{display:inline-block;height:16px;line-height:0;margin:auto;margin-right:8px;order:0;position:relative;vertical-align:middle;white-space:nowrap;width:16px;flex-shrink:0}[dir=rtl] .mat-checkbox-inner-container{margin-left:8px;margin-right:auto}.mat-checkbox-inner-container-no-side-margin{margin-left:0;margin-right:0}.mat-checkbox-frame{background-color:transparent;transition:border-color 90ms cubic-bezier(0, 0, 0.2, 0.1);border-width:2px;border-style:solid}._mat-animation-noopable .mat-checkbox-frame{transition:none}.mat-checkbox-background{align-items:center;display:inline-flex;justify-content:center;transition:background-color 90ms cubic-bezier(0, 0, 0.2, 0.1),opacity 90ms cubic-bezier(0, 0, 0.2, 0.1);-webkit-print-color-adjust:exact;color-adjust:exact}._mat-animation-noopable .mat-checkbox-background{transition:none}.cdk-high-contrast-active .mat-checkbox .mat-checkbox-background{background:none}.mat-checkbox-persistent-ripple{display:block;width:100%;height:100%;transform:none}.mat-checkbox-inner-container:hover .mat-checkbox-persistent-ripple{opacity:.04}.mat-checkbox.cdk-keyboard-focused .mat-checkbox-persistent-ripple{opacity:.12}.mat-checkbox-persistent-ripple,.mat-checkbox.mat-checkbox-disabled .mat-checkbox-inner-container:hover .mat-checkbox-persistent-ripple{opacity:0}@media(hover: none){.mat-checkbox-inner-container:hover .mat-checkbox-persistent-ripple{display:none}}.mat-checkbox-checkmark{top:0;left:0;right:0;bottom:0;position:absolute;width:100%}.mat-checkbox-checkmark-path{stroke-dashoffset:22.910259;stroke-dasharray:22.910259;stroke-width:2.1333333333px}.cdk-high-contrast-black-on-white .mat-checkbox-checkmark-path{stroke:#000 !important}.mat-checkbox-mixedmark{width:calc(100% - 6px);height:2px;opacity:0;transform:scaleX(0) rotate(0deg);border-radius:2px}.cdk-high-contrast-active .mat-checkbox-mixedmark{height:0;border-top:solid 2px;margin-top:2px}.mat-checkbox-label-before .mat-checkbox-inner-container{order:1;margin-left:8px;margin-right:auto}[dir=rtl] .mat-checkbox-label-before .mat-checkbox-inner-container{margin-left:auto;margin-right:8px}.mat-checkbox-checked .mat-checkbox-checkmark{opacity:1}.mat-checkbox-checked .mat-checkbox-checkmark-path{stroke-dashoffset:0}.mat-checkbox-checked .mat-checkbox-mixedmark{transform:scaleX(1) rotate(-45deg)}.mat-checkbox-indeterminate .mat-checkbox-checkmark{opacity:0;transform:rotate(45deg)}.mat-checkbox-indeterminate .mat-checkbox-checkmark-path{stroke-dashoffset:0}.mat-checkbox-indeterminate .mat-checkbox-mixedmark{opacity:1;transform:scaleX(1) rotate(0deg)}.mat-checkbox-unchecked .mat-checkbox-background{background-color:transparent}.mat-checkbox-disabled{cursor:default}.cdk-high-contrast-active .mat-checkbox-disabled{opacity:.5}.mat-checkbox-anim-unchecked-checked .mat-checkbox-background{animation:180ms linear 0ms mat-checkbox-fade-in-background}.mat-checkbox-anim-unchecked-checked .mat-checkbox-checkmark-path{animation:180ms linear 0ms mat-checkbox-unchecked-checked-checkmark-path}.mat-checkbox-anim-unchecked-indeterminate .mat-checkbox-background{animation:180ms linear 0ms mat-checkbox-fade-in-background}.mat-checkbox-anim-unchecked-indeterminate .mat-checkbox-mixedmark{animation:90ms linear 0ms mat-checkbox-unchecked-indeterminate-mixedmark}.mat-checkbox-anim-checked-unchecked .mat-checkbox-background{animation:180ms linear 0ms mat-checkbox-fade-out-background}.mat-checkbox-anim-checked-unchecked .mat-checkbox-checkmark-path{animation:90ms linear 0ms mat-checkbox-checked-unchecked-checkmark-path}.mat-checkbox-anim-checked-indeterminate .mat-checkbox-checkmark{animation:90ms linear 0ms mat-checkbox-checked-indeterminate-checkmark}.mat-checkbox-anim-checked-indeterminate .mat-checkbox-mixedmark{animation:90ms linear 0ms mat-checkbox-checked-indeterminate-mixedmark}.mat-checkbox-anim-indeterminate-checked .mat-checkbox-checkmark{animation:500ms linear 0ms mat-checkbox-indeterminate-checked-checkmark}.mat-checkbox-anim-indeterminate-checked .mat-checkbox-mixedmark{animation:500ms linear 0ms mat-checkbox-indeterminate-checked-mixedmark}.mat-checkbox-anim-indeterminate-unchecked .mat-checkbox-background{animation:180ms linear 0ms mat-checkbox-fade-out-background}.mat-checkbox-anim-indeterminate-unchecked .mat-checkbox-mixedmark{animation:300ms linear 0ms mat-checkbox-indeterminate-unchecked-mixedmark}.mat-checkbox-input{bottom:0;left:50%}\n"],encapsulation:2,changeDetection:0}),e})(),R=(()=>{class e{}return e.\u0275fac=function(t){return new(t||e)},e.\u0275mod=r.oAB({type:e}),e.\u0275inj=r.cJS({}),e})(),S=(()=>{class e{}return e.\u0275fac=function(t){return new(t||e)},e.\u0275mod=r.oAB({type:e}),e.\u0275inj=r.cJS({imports:[[b.si,b.BQ,_.Q8,R],b.BQ,R]}),e})();var N=n(84369),z=n(77307);const E=["shippingSummary"],F=["shippingInfoForm"];function G(e,t){if(1&e){const e=r.EpF();r.TgZ(0,"div",4),r._UZ(1,"div",5),r.TgZ(2,"div",6),r.TgZ(3,"p"),r._uU(4,"Cart > Information > Shipping > Payment"),r.qZA(),r.qZA(),r.TgZ(5,"div",7),r.TgZ(6,"p"),r._uU(7,"Contact Information"),r.qZA(),r.qZA(),r.TgZ(8,"div",8),r.TgZ(9,"mat-form-field",9),r._UZ(10,"input",10),r.TgZ(11,"mat-error"),r._uU(12," *required field"),r.qZA(),r.qZA(),r.qZA(),r.TgZ(13,"div",11),r.TgZ(14,"p"),r._uU(15,"Shipping Address"),r.qZA(),r.qZA(),r.TgZ(16,"div",12),r.TgZ(17,"mat-form-field",9),r._UZ(18,"input",13),r.TgZ(19,"mat-error"),r._uU(20," *required field"),r.qZA(),r.qZA(),r.TgZ(21,"mat-form-field",9),r._UZ(22,"input",14),r.TgZ(23,"mat-error"),r._uU(24," *required field"),r.qZA(),r.qZA(),r.qZA(),r.TgZ(25,"div",15),r.TgZ(26,"mat-form-field",9),r._UZ(27,"input",16),r.TgZ(28,"mat-error"),r._uU(29," *required field"),r.qZA(),r.qZA(),r.qZA(),r.TgZ(30,"div",17),r.TgZ(31,"mat-form-field",9),r._UZ(32,"input",18),r.TgZ(33,"mat-error"),r._uU(34," *required field"),r.qZA(),r.qZA(),r.qZA(),r.TgZ(35,"div",19),r.TgZ(36,"mat-form-field",9),r._UZ(37,"input",20),r.TgZ(38,"mat-error"),r._uU(39," *required field"),r.qZA(),r.qZA(),r.qZA(),r.TgZ(40,"div",21),r.TgZ(41,"mat-form-field",9),r._UZ(42,"input",22),r.qZA(),r.TgZ(43,"mat-form-field",9),r._UZ(44,"input",23),r.TgZ(45,"mat-error"),r._uU(46," *required field"),r.qZA(),r.qZA(),r.qZA(),r.TgZ(47,"div",24),r.TgZ(48,"mat-checkbox"),r._uU(49,"Save information for next time"),r.qZA(),r.qZA(),r.TgZ(50,"div",25),r.TgZ(51,"button",26),r.NdJ("click",function(){return r.CHM(e),r.oxw().router.navigate(["shop-cart"])}),r.TgZ(52,"mat-icon"),r._uU(53),r.qZA(),r.qZA(),r.TgZ(54,"button",27),r.NdJ("click",function(){return r.CHM(e),r.oxw().toShippingSummary()}),r._uU(55," ORDER SUMMARY "),r.TgZ(56,"mat-icon"),r._uU(57),r.qZA(),r.qZA(),r.qZA(),r.TgZ(58,"div",28),r.TgZ(59,"a"),r._uU(60,"Refund policy"),r.qZA(),r.TgZ(61,"a"),r._uU(62,"Shipping policy"),r.qZA(),r.TgZ(63,"a"),r._uU(64,"Privacy policy"),r.qZA(),r.qZA(),r.qZA()}if(2&e){const e=r.oxw();r.Q6J("formGroup",e.formGroup),r.xp6(53),r.Oqu(e.backArrow),r.xp6(4),r.Oqu(e.appIcons.right_arrow)}}function L(e,t){if(1&e){const e=r.EpF();r.TgZ(0,"div",29),r.TgZ(1,"div",30),r.TgZ(2,"div",31),r.TgZ(3,"div",32),r._uU(4,"Contact"),r.qZA(),r.TgZ(5,"div",33),r._uU(6),r.qZA(),r.TgZ(7,"div",32),r.TgZ(8,"a",34),r.NdJ("click",function(){return r.CHM(e),r.oxw().toShippingInfoForm()}),r._uU(9,"Change"),r.qZA(),r.qZA(),r.qZA(),r.TgZ(10,"div",35),r._UZ(11,"hr"),r.qZA(),r.TgZ(12,"div",31),r.TgZ(13,"div",32),r._uU(14,"Ship to"),r.qZA(),r.TgZ(15,"div",33),r._uU(16),r.qZA(),r.TgZ(17,"div",32),r.TgZ(18,"a",34),r.NdJ("click",function(){return r.CHM(e),r.oxw().toShippingInfoForm()}),r._uU(19,"Change"),r.qZA(),r.qZA(),r.qZA(),r.qZA(),r.qZA(),r.TgZ(20,"div",36),r.TgZ(21,"div",37),r.TgZ(22,"p"),r._uU(23,"Items"),r.qZA(),r.TgZ(24,"p"),r._uU(25),r.qZA(),r.qZA(),r.TgZ(26,"div",38),r._uU(27),r.qZA(),r.TgZ(28,"div",39),r._uU(29,"inclusive of Tax"),r.qZA(),r.TgZ(30,"div",40),r._uU(31,"Shipping \xa30.00"),r.qZA(),r.qZA(),r.TgZ(32,"div",41),r.TgZ(33,"button",26),r.NdJ("click",function(){return r.CHM(e),r.oxw().toShippingInfoForm()}),r.TgZ(34,"mat-icon"),r._uU(35),r.qZA(),r.qZA(),r.TgZ(36,"button",27),r.NdJ("click",function(){return r.CHM(e),r.oxw().doCheckout()}),r._uU(37,"PAY NOW"),r.qZA(),r.qZA()}if(2&e){const e=r.oxw();let t,n;r.xp6(6),r.Oqu(null==(t=e.formGroup.get("email"))?null:t.value),r.xp6(10),r.Oqu(null==(n=e.formGroup.get("computedAddress"))?null:n.value),r.xp6(9),r.Oqu(e.service.descriptionListDelimited()),r.xp6(2),r.hij("\xa3",e.service.getBasketTotal().total.toFixed(2),""),r.xp6(8),r.Oqu(e.backArrow)}}const J=[{path:"",component:(()=>{class e{constructor(e,t,n,i,o,a){this.vcr=e,this.service=t,this.fb=n,this.stripeService=i,this.router=o,this.repo=a,this.backArrow=m.U.left_arrow,this.appIcons=m.U,this.computedAddress=()=>{var e;const t=this.formGroup.getRawValue();null===(e=this.formGroup.get("computedAddress"))||void 0===e||e.setValue([t.address,t.apartment,t.city,t.postCode,t.country].filter(e=>null!=e).join(", "))},this.formGroup=n.group({email:["williampaulton@yahoo.co.uk",c.kI.required],firstName:["Jamie"],lastName:["Theakston"],address:["23 Shamrock drive"],apartment:["The badlands"],city:["Shannon"],country:["Eire"],postCode:["H3Y 2OP"],SaveInformation:[!1],computedAddress:[""]})}ngOnInit(){}ngAfterViewInit(){setTimeout(()=>{this.cart=this.service.cartItems,this.computedAddress(),this.activeTemplateRef=new s.UE(this.shippingInfoForm,this.vcr)},50)}toShippingSummary(){this.activeTemplateRef=new s.UE(this.shippingSummary,this.vcr),this.computedAddress()}toShippingInfoForm(){setTimeout(()=>{this.activeTemplateRef=new s.UE(this.shippingInfoForm,this.vcr)},50)}doCheckout(){var e=this;return(0,a.Z)(function*(){const t=Object.assign({cart:e.cart},e.service.getBasketTotal()),n=yield e.stripeService.oneTimeCheckoutWithCheckoutSessionV2(e.formGroup.getRawValue(),t);console.log("Checked out",n),e.service.clearout(),e.router.navigate(["/","order-statement",n])})()}}return e.\u0275fac=function(t){return new(t||e)(r.Y36(r.s_b),r.Y36(d.N),r.Y36(c.qu),r.Y36(u),r.Y36(o.F0),r.Y36(p.k))},e.\u0275cmp=r.Xpm({type:e,selectors:[["app-shipping-information"]],viewQuery:function(e,t){if(1&e&&(r.Gf(E,5,r.Rgc),r.Gf(F,5,r.Rgc)),2&e){let e;r.iGM(e=r.CRH())&&(t.shippingSummary=e.first),r.iGM(e=r.CRH())&&(t.shippingInfoForm=e.first)}},decls:6,vars:1,consts:[[3,"cdkPortalOutlet"],["portalOutlet",""],["shippingInfoForm",""],["shippingSummary",""],[1,"si-container-form",3,"formGroup"],["id","company-title"],["id","form-breadcrumb"],["id","contact-info"],["id","email"],["appearance","outline"],["placeholder","Email","matInput","","formControlName","email"],["id","shipping-address"],["id","first-last-names"],["matInput","","placeholder","First name (optional)","formControlName","firstName"],["matInput","","placeholder","Last name","formControlName","lastName"],["id","address"],["placeholder","Address","matInput","","formControlName","address"],["id","apartment"],["placeholder","Apartment, suite etc (optional)","matInput","","formControlName","apartment"],["id","city"],["placeholder","City","matInput","","formControlName","city"],["id","country_postcode"],["matInput","","placeholder","Country","formControlName","country"],["matInput","","placeholder","Postcode","formControlName","postCode"],["id","save_information"],["id","si-action-bar1"],["mat-stroked-button","",3,"click"],["mat-flat-button","","color","accent",3,"click"],["id","footer"],["id","si-summary-form-grid",2,"padding","3% 5%"],[1,"info-block"],[1,"si-col-3"],[1,"sis-label"],[1,"sis-info-content"],[3,"click"],[1,"si-col-1"],["id","cart-summary-grid",1,"info-block",2,"margin","3% 5%"],["id","prod"],["id","tl"],["id","tx"],["id","sp"],["id","si-action-bar"]],template:function(e,t){1&e&&(r.GkF(0,0,1),r.YNc(2,G,65,3,"ng-template",null,2,r.W1O),r.YNc(4,L,38,5,"ng-template",null,3,r.W1O)),2&e&&r.Q6J("cdkPortalOutlet",t.activeTemplateRef)},directives:[s.Pl,c.JL,c.sg,g.KE,k.Nt,c.Fj,c.JJ,c.u,g.TO,U,N.lW,z.Hw],styles:["input[matInput][_ngcontent-%COMP%]{color:var(--grey-70);font-size:15px;font-family:arial,Helvetica Neue,sans-serif;font-weight:200}.si-container-form[_ngcontent-%COMP%]{align-items:start;align-content:start;grid-template-columns:repeat(9,1fr);grid-template-rows:50px 30px 120px 75px 120px 75px repeat(5,75px);grid-auto-rows:75px 200px;display:grid;overflow-y:scroll;padding:3% 10%}@media (max-width:500px){.si-container-form[_ngcontent-%COMP%]{grid-template-rows:50px 30px 120px 75px 120px 130px 70px repeat(2,70px) 140px 70px}}#company-title[_ngcontent-%COMP%]{grid-row:1;grid-column:2/span 6;font-size:40px;text-align:center;display:flex;align-items:center;font-weight:700;color:var(--grey-70)}#form-breadcrumb[_ngcontent-%COMP%]{grid-row:2;grid-column:auto/span 6;font-size:10px;display:flex;align-items:center}#contact-info[_ngcontent-%COMP%], #shipping-address[_ngcontent-%COMP%]{text-align:left;padding:28px 0;font-weight:300;font:var(--font-regular-sub-heading);color:var(--grey-80);grid-column:1/span 9}#contact-info[_ngcontent-%COMP%]:first-letter, #shipping-address[_ngcontent-%COMP%]:first-letter{font-size:var(--font-size-sub-heading-regular-first-letter)}@media screen and (max-width:500px){#contact-info[_ngcontent-%COMP%], #shipping-address[_ngcontent-%COMP%]{font:var(--font-larger-sub-heading)}#contact-info[_ngcontent-%COMP%]:first-letter, #shipping-address[_ngcontent-%COMP%]:first-letter{font-size:var(--font-size-sub-heading-larger-first-letter);color:var(--grey-90)}}#contact-info[_ngcontent-%COMP%], #email[_ngcontent-%COMP%]{grid-row:auto}#email[_ngcontent-%COMP%]{grid-column:1/span 9;display:flex}#email[_ngcontent-%COMP%]   mat-form-field[_ngcontent-%COMP%]{flex:1 1 auto;overflow-y:hidden}#shipping-address[_ngcontent-%COMP%]{grid-row:auto}#first-last-names[_ngcontent-%COMP%]{grid-row:auto;grid-column:1/span 9;display:flex;flex-flow:row nowrap}#first-last-names[_ngcontent-%COMP%]   mat-form-field[_ngcontent-%COMP%]{flex:1 1 49%}#first-last-names[_ngcontent-%COMP%]   mat-form-field[_ngcontent-%COMP%]:nth-child(2){margin-left:15px}@media (max-width:500px){#first-last-names[_ngcontent-%COMP%]{flex-flow:row wrap}#first-last-names[_ngcontent-%COMP%]   mat-form-field[_ngcontent-%COMP%]:nth-child(2){margin-left:0}}#address[_ngcontent-%COMP%]{grid-row:auto;grid-column:1/span 9;display:flex}#address[_ngcontent-%COMP%]   mat-form-field[_ngcontent-%COMP%]{flex:1 1 auto;overflow-y:hidden}#apartment[_ngcontent-%COMP%]{grid-row:auto;grid-column:1/span 9;display:flex}#apartment[_ngcontent-%COMP%]   mat-form-field[_ngcontent-%COMP%]{flex:1 1 auto;overflow-y:hidden}#city[_ngcontent-%COMP%]{grid-row:auto;grid-column:1/span 9;display:flex}#city[_ngcontent-%COMP%]   mat-form-field[_ngcontent-%COMP%]{flex:1 1 auto;overflow-y:hidden}#country_postcode[_ngcontent-%COMP%]{grid-row:auto;grid-column:1/span 9;display:flex;flex-flow:row nowrap}#country_postcode[_ngcontent-%COMP%]   mat-form-field[_ngcontent-%COMP%]{flex:1 1 49%}#country_postcode[_ngcontent-%COMP%]   mat-form-field[_ngcontent-%COMP%]:nth-child(2){margin-left:15px}@media (max-width:500px){#country_postcode[_ngcontent-%COMP%]{flex-flow:row wrap}#country_postcode[_ngcontent-%COMP%]   mat-form-field[_ngcontent-%COMP%]:nth-child(2){margin-left:0}}#save_information[_ngcontent-%COMP%]{grid-row:auto;grid-column:1/span 9;display:flex}#save_information[_ngcontent-%COMP%]   mat-form-field[_ngcontent-%COMP%]{flex:1 1 auto;overflow-y:hidden}#action_bar[_ngcontent-%COMP%]{grid-row:auto;display:inline-block;grid-column:1/span 9;justify-items:center}#action_bar[_ngcontent-%COMP%]   [_ngcontent-%COMP%]:nth-child(2){margin:0 auto}#footer[_ngcontent-%COMP%]{grid-row:auto;grid-column:1/span 9;display:flex}#footer[_ngcontent-%COMP%]   mat-form-field[_ngcontent-%COMP%]{flex:1 1 auto;overflow-y:hidden}.si-footer[_ngcontent-%COMP%]{position:absolute;bottom:50px;margin-top:15px}#si-action-bar[_ngcontent-%COMP%], #si-action-bar1[_ngcontent-%COMP%], .si-footer[_ngcontent-%COMP%]{display:flex;justify-content:space-between}#si-action-bar[_ngcontent-%COMP%], #si-action-bar1[_ngcontent-%COMP%]{grid-column:1/span 9;position:relative;left:0;padding:3%;grid-row:auto;align-content:center;align-items:center}#si-action-bar1[_ngcontent-%COMP%]   a[_ngcontent-%COMP%], #si-action-bar[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{text-decoration:none;color:var(--grey-70);font-size:14px;font:400 14px/20px Roboto,Helvetica Neue,sans-serif;letter-spacing:normal;align-items:center;justify-items:center;margin-top:20px}#si-action-bar1[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover, #si-action-bar[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover{color:var(--grey-90)}#si-action-bar[_ngcontent-%COMP%]{margin-bottom:100px}.si-table[_ngcontent-%COMP%]{width:100%}",'.info-block[_ngcontent-%COMP%] {\n      font-size: 14px;\n      border: 1px solid var(--grey-30);\n      border-radius: 5px;\n      padding: 19px;\n\n    }\n\n    .info-block[_ngcontent-%COMP%]    > .si-col-3[_ngcontent-%COMP%] {\n      justify-content: space-between;\n      padding: 8px 0;\n    }\n\n    .info-block[_ngcontent-%COMP%]    > .si-col-3[_ngcontent-%COMP%]    > .sis-label[_ngcontent-%COMP%] {\n      color: var(--grey-40);\n      font-size: 14px;\n\n    }\n\n    .sis-label[_ngcontent-%COMP%]    > a[_ngcontent-%COMP%] {\n      font-size: 11px;\n      color: var(--grey-30);\n      padding: 0 5px;\n    }\n\n    .sis-info-content[_ngcontent-%COMP%] {\n      width: 100%;\n      color: var(--grey-80);\n      font-size: 15px;\n      padding: 0px 8px;\n      \n      \n      \n    }\n\n    #si-summary-form-grid[_ngcontent-%COMP%] {\n      display: grid;\n      grid-auto-rows: auto;\n      overflow-y: scroll;\n    }\n\n    #cart-summary-grid[_ngcontent-%COMP%] {\n      display: grid;\n\n      grid-template-areas: "prod prod sp sp sp" "prod prod tx tx tx" "prod prod  . . ." "prod prod tl tl tl";\n    }\n\n    #prod[_ngcontent-%COMP%] {\n      grid-area: prod;\n    }\n\n    #tl[_ngcontent-%COMP%] {\n      grid-area: tl;\n      padding-bottom: 300px;\n    }\n\n    #tx[_ngcontent-%COMP%] {\n      grid-area: tx;\n    }\n\n    #sp[_ngcontent-%COMP%] {\n      grid-area: sp;\n    }']}),e})()}];let j=(()=>{class e{}return e.\u0275fac=function(t){return new(t||e)},e.\u0275mod=r.oAB({type:e}),e.\u0275inj=r.cJS({imports:[[o.Bz.forChild(J)],o.Bz]}),e})();var D=n(36278),Y=n(47217);let H=(()=>{class e{}return e.\u0275fac=function(t){return new(t||e)},e.\u0275mod=r.oAB({type:e}),e.\u0275inj=r.cJS({imports:[[i.ez,j,c.UX,c.u5,g.lN,k.c,S,D.t,Y.g,N.ot,s.eL,z.Ps]]}),e})()}}]);