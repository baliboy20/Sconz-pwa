(self.webpackChunkzz_test_mat_hints=self.webpackChunkzz_test_mat_hints||[]).push([[299],{30299:(t,e,o)=>{"use strict";o.r(e),o.d(e,{ClickCollectModule:()=>At});var n=o(38583),i=o(8307),a=o(37716),r=o(88002),s=o(19773),c=o(68307),l=o(32548),p=o(58203),d=o(87636),h=o(72458),m=o(65072),u=o(17238),g=o(80521),f=o(70946),b=o(79765),x=o(66682),_=o(25917),v=o(36461),w=o(45435),C=o(15257),O=o(19238);function y(t,e){}const P=new a.OlP("MatBottomSheetData");class A{constructor(){this.data=null,this.hasBackdrop=!0,this.disableClose=!1,this.ariaLabel=null,this.closeOnNavigation=!0,this.autoFocus=!1,this.restoreFocus=!0}}const Z={bottomSheetState:(0,u.X$)("state",[(0,u.SB)("void, hidden",(0,u.oB)({transform:"translateY(100%)"})),(0,u.SB)("visible",(0,u.oB)({transform:"translateY(0%)"})),(0,u.eR)("visible => void, visible => hidden",(0,u.jt)(`${h.mZ.COMPLEX} ${h.yN.ACCELERATION_CURVE}`)),(0,u.eR)("void => visible",(0,u.jt)(`${h.mZ.EXITING} ${h.yN.DECELERATION_CURVE}`))])};let T=(()=>{class t extends d.en{constructor(t,e,o,n,i,r){super(),this._elementRef=t,this._changeDetectorRef=e,this._focusTrapFactory=o,this.bottomSheetConfig=r,this._animationState="void",this._animationStateChanged=new a.vpe,this._elementFocusedBeforeOpened=null,this.attachDomPortal=t=>(this._validatePortalAttached(),this._setPanelClass(),this._savePreviouslyFocusedElement(),this._portalOutlet.attachDomPortal(t)),this._document=i,this._breakpointSubscription=n.observe([m.u3.Medium,m.u3.Large,m.u3.XLarge]).subscribe(()=>{this._toggleClass("mat-bottom-sheet-container-medium",n.isMatched(m.u3.Medium)),this._toggleClass("mat-bottom-sheet-container-large",n.isMatched(m.u3.Large)),this._toggleClass("mat-bottom-sheet-container-xlarge",n.isMatched(m.u3.XLarge))})}attachComponentPortal(t){return this._validatePortalAttached(),this._setPanelClass(),this._savePreviouslyFocusedElement(),this._portalOutlet.attachComponentPortal(t)}attachTemplatePortal(t){return this._validatePortalAttached(),this._setPanelClass(),this._savePreviouslyFocusedElement(),this._portalOutlet.attachTemplatePortal(t)}enter(){this._destroyed||(this._animationState="visible",this._changeDetectorRef.detectChanges())}exit(){this._destroyed||(this._animationState="hidden",this._changeDetectorRef.markForCheck())}ngOnDestroy(){this._breakpointSubscription.unsubscribe(),this._destroyed=!0}_onAnimationDone(t){"hidden"===t.toState?this._restoreFocus():"visible"===t.toState&&this._trapFocus(),this._animationStateChanged.emit(t)}_onAnimationStart(t){this._animationStateChanged.emit(t)}_toggleClass(t,e){const o=this._elementRef.nativeElement.classList;e?o.add(t):o.remove(t)}_validatePortalAttached(){this._portalOutlet.hasAttached()}_setPanelClass(){const t=this._elementRef.nativeElement,e=this.bottomSheetConfig.panelClass;Array.isArray(e)?e.forEach(e=>t.classList.add(e)):e&&t.classList.add(e)}_trapFocus(){const t=this._elementRef.nativeElement;if(this._focusTrap||(this._focusTrap=this._focusTrapFactory.create(t)),this.bottomSheetConfig.autoFocus)this._focusTrap.focusInitialElementWhenReady();else{const e=(0,g.ht)();e===t||t.contains(e)||t.focus()}}_restoreFocus(){const t=this._elementFocusedBeforeOpened;if(this.bottomSheetConfig.restoreFocus&&t&&"function"==typeof t.focus){const e=(0,g.ht)(),o=this._elementRef.nativeElement;e&&e!==this._document.body&&e!==o&&!o.contains(e)||t.focus()}this._focusTrap&&this._focusTrap.destroy()}_savePreviouslyFocusedElement(){this._elementFocusedBeforeOpened=(0,g.ht)(),this._elementRef.nativeElement.focus&&Promise.resolve().then(()=>this._elementRef.nativeElement.focus())}}return t.\u0275fac=function(e){return new(e||t)(a.Y36(a.SBq),a.Y36(a.sBO),a.Y36(O.qV),a.Y36(m.Yg),a.Y36(n.K0,8),a.Y36(A))},t.\u0275cmp=a.Xpm({type:t,selectors:[["mat-bottom-sheet-container"]],viewQuery:function(t,e){if(1&t&&a.Gf(d.Pl,7),2&t){let t;a.iGM(t=a.CRH())&&(e._portalOutlet=t.first)}},hostAttrs:["tabindex","-1","role","dialog","aria-modal","true",1,"mat-bottom-sheet-container"],hostVars:2,hostBindings:function(t,e){1&t&&a.WFA("@state.start",function(t){return e._onAnimationStart(t)})("@state.done",function(t){return e._onAnimationDone(t)}),2&t&&(a.uIk("aria-label",null==e.bottomSheetConfig?null:e.bottomSheetConfig.ariaLabel),a.d8E("@state",e._animationState))},features:[a.qOj],decls:1,vars:0,consts:[["cdkPortalOutlet",""]],template:function(t,e){1&t&&a.YNc(0,y,0,0,"ng-template",0)},directives:[d.Pl],styles:[".mat-bottom-sheet-container{padding:8px 16px;min-width:100vw;box-sizing:border-box;display:block;outline:0;max-height:80vh;overflow:auto}.cdk-high-contrast-active .mat-bottom-sheet-container{outline:1px solid}.mat-bottom-sheet-container-xlarge,.mat-bottom-sheet-container-large,.mat-bottom-sheet-container-medium{border-top-left-radius:4px;border-top-right-radius:4px}.mat-bottom-sheet-container-medium{min-width:384px;max-width:calc(100vw - 128px)}.mat-bottom-sheet-container-large{min-width:512px;max-width:calc(100vw - 256px)}.mat-bottom-sheet-container-xlarge{min-width:576px;max-width:calc(100vw - 384px)}\n"],encapsulation:2,data:{animation:[Z.bottomSheetState]}}),t})(),S=(()=>{class t{}return t.\u0275fac=function(e){return new(e||t)},t.\u0275mod=a.oAB({type:t}),t.\u0275inj=a.cJS({imports:[[p.U8,h.BQ,d.eL],h.BQ]}),t})();class k{constructor(t,e){this._overlayRef=e,this._afterDismissed=new b.xQ,this._afterOpened=new b.xQ,this.containerInstance=t,this.disableClose=t.bottomSheetConfig.disableClose,t._animationStateChanged.pipe((0,w.h)(t=>"done"===t.phaseName&&"visible"===t.toState),(0,C.q)(1)).subscribe(()=>{this._afterOpened.next(),this._afterOpened.complete()}),t._animationStateChanged.pipe((0,w.h)(t=>"done"===t.phaseName&&"hidden"===t.toState),(0,C.q)(1)).subscribe(()=>{clearTimeout(this._closeFallbackTimeout),e.dispose()}),e.detachments().pipe((0,C.q)(1)).subscribe(()=>{this._afterDismissed.next(this._result),this._afterDismissed.complete()}),(0,x.T)(e.backdropClick(),e.keydownEvents().pipe((0,w.h)(t=>t.keyCode===v.hY))).subscribe(t=>{this.disableClose||"keydown"===t.type&&(0,v.Vb)(t)||(t.preventDefault(),this.dismiss())})}dismiss(t){this._afterDismissed.closed||(this.containerInstance._animationStateChanged.pipe((0,w.h)(t=>"start"===t.phaseName),(0,C.q)(1)).subscribe(t=>{this._closeFallbackTimeout=setTimeout(()=>{this._overlayRef.dispose()},t.totalTime+100),this._overlayRef.detachBackdrop()}),this._result=t,this.containerInstance.exit())}afterDismissed(){return this._afterDismissed}afterOpened(){return this._afterOpened}backdropClick(){return this._overlayRef.backdropClick()}keydownEvents(){return this._overlayRef.keydownEvents()}}const M=new a.OlP("mat-bottom-sheet-default-options");let F=(()=>{class t{constructor(t,e,o,n){this._overlay=t,this._injector=e,this._parentBottomSheet=o,this._defaultOptions=n,this._bottomSheetRefAtThisLevel=null}get _openedBottomSheetRef(){const t=this._parentBottomSheet;return t?t._openedBottomSheetRef:this._bottomSheetRefAtThisLevel}set _openedBottomSheetRef(t){this._parentBottomSheet?this._parentBottomSheet._openedBottomSheetRef=t:this._bottomSheetRefAtThisLevel=t}open(t,e){const o=function(t,e){return Object.assign(Object.assign({},t),e)}(this._defaultOptions||new A,e),n=this._createOverlay(o),i=this._attachContainer(n,o),r=new k(i,n);if(t instanceof a.Rgc)i.attachTemplatePortal(new d.UE(t,null,{$implicit:o.data,bottomSheetRef:r}));else{const e=new d.C5(t,void 0,this._createInjector(o,r)),n=i.attachComponentPortal(e);r.instance=n.instance}return r.afterDismissed().subscribe(()=>{this._openedBottomSheetRef==r&&(this._openedBottomSheetRef=null)}),this._openedBottomSheetRef?(this._openedBottomSheetRef.afterDismissed().subscribe(()=>r.containerInstance.enter()),this._openedBottomSheetRef.dismiss()):r.containerInstance.enter(),this._openedBottomSheetRef=r,r}dismiss(t){this._openedBottomSheetRef&&this._openedBottomSheetRef.dismiss(t)}ngOnDestroy(){this._bottomSheetRefAtThisLevel&&this._bottomSheetRefAtThisLevel.dismiss()}_attachContainer(t,e){const o=a.zs3.create({parent:e&&e.viewContainerRef&&e.viewContainerRef.injector||this._injector,providers:[{provide:A,useValue:e}]}),n=new d.C5(T,e.viewContainerRef,o);return t.attach(n).instance}_createOverlay(t){const e=new p.X_({direction:t.direction,hasBackdrop:t.hasBackdrop,disposeOnNavigation:t.closeOnNavigation,maxWidth:"100%",scrollStrategy:t.scrollStrategy||this._overlay.scrollStrategies.block(),positionStrategy:this._overlay.position().global().centerHorizontally().bottom("0")});return t.backdropClass&&(e.backdropClass=t.backdropClass),this._overlay.create(e)}_createInjector(t,e){const o=t&&t.viewContainerRef&&t.viewContainerRef.injector,n=[{provide:k,useValue:e},{provide:P,useValue:t.data}];return!t.direction||o&&o.get(f.Is,null,a.XFs.Optional)||n.push({provide:f.Is,useValue:{value:t.direction,change:(0,_.of)()}}),a.zs3.create({parent:o||this._injector,providers:n})}}return t.\u0275fac=function(e){return new(e||t)(a.LFG(p.aV),a.LFG(a.zs3),a.LFG(t,12),a.LFG(M,8))},t.\u0275prov=a.Yz7({factory:function(){return new t(a.LFG(p.aV),a.LFG(a.gxx),a.LFG(t,12),a.LFG(M,8))},token:t,providedIn:S}),t})();var q=o(3679),B=o(61360),R=o(88707);function I(t,e){1&t&&a.GkF(0)}function N(t,e){1&t&&a.GkF(0)}function Y(t,e){1&t&&a.GkF(0)}function G(t,e){1&t&&a.GkF(0)}function z(t,e){1&t&&a.GkF(0)}function Q(t,e){if(1&t&&(a.TgZ(0,"mat-list-option",15),a.TgZ(1,"div",16),a.TgZ(2,"span",17),a._uU(3),a.qZA(),a.TgZ(4,"span"),a._uU(5),a.qZA(),a.qZA(),a.qZA()),2&t){const t=e.$implicit;a.Q6J("value",t),a.xp6(3),a.hij(" ",t.name,""),a.xp6(2),a.Oqu(t.price)}}function E(t,e){if(1&t&&(a.ynx(0,12),a.TgZ(1,"mat-selection-list",13),a.YNc(2,Q,6,3,"mat-list-option",14),a.qZA(),a.BQk()),2&t){const t=a.oxw();a.Q6J("formGroup",t.formGroup),a.xp6(2),a.Q6J("ngForOf",t.data.options)}}function J(t,e){if(1&t&&(a.TgZ(0,"mat-radio-button",22),a.TgZ(1,"span",23),a._uU(2),a.qZA(),a.TgZ(3,"span",24),a._uU(4),a.qZA(),a.qZA()),2&t){const t=e.$implicit;a.Q6J("value",t),a.xp6(2),a.hij(" ",t.name,""),a.xp6(2),a.hij(" @ \xa3",t.price,"")}}function U(t,e){if(1&t&&(a.TgZ(0,"p",18),a.TgZ(1,"span"),a._uU(2,"Choices "),a.qZA(),a.qZA(),a.TgZ(3,"div",19),a.TgZ(4,"mat-radio-group",20),a.YNc(5,J,5,3,"mat-radio-button",21),a.qZA(),a.qZA()),2&t){const t=a.oxw();a.xp6(3),a.Q6J("formGroup",t.formGroup),a.xp6(2),a.Q6J("ngForOf",t.data.choices)}}function L(t,e){1&t&&a.GkF(0)}function j(t,e){if(1&t){const t=a.EpF();a.TgZ(0,"div",25),a.YNc(1,L,1,0,"ng-container",3),a.TgZ(2,"button",26),a.NdJ("click",function(){return a.CHM(t),a.oxw().dismiss()}),a.TgZ(3,"mat-icon"),a._uU(4,"close"),a.qZA(),a.qZA(),a.qZA()}if(2&t){const t=a.oxw(),e=a.MAs(21);a.Q6J("formGroup",t.formGroup),a.xp6(1),a.Q6J("ngTemplateOutlet",e)}}function D(t,e){if(1&t&&(a.TgZ(0,"div",12),a._UZ(1,"app-numeric-incrementer",27),a.TgZ(2,"mat-form-field",28),a.TgZ(3,"mat-label"),a._uU(4,"Name"),a.qZA(),a._UZ(5,"input",29),a.qZA(),a.TgZ(6,"mat-form-field",28),a.TgZ(7,"mat-label"),a._uU(8,"Description"),a.qZA(),a._UZ(9,"textarea",30),a.qZA(),a.qZA()),2&t){const t=a.oxw();a.Q6J("formGroup",t.formGroup),a.xp6(1),a.Q6J("showRemoveButton",!0),a.xp6(4),a.Q6J("value",t.data.name),a.xp6(4),a.Q6J("value",t.data.description)}}function $(t,e){if(1&t&&(a.ynx(0,12),a.TgZ(1,"mat-form-field",28),a.TgZ(2,"mat-label"),a._uU(3,"Special Instructions, Other.."),a.qZA(),a._UZ(4,"textarea",31),a.qZA(),a.BQk()),2&t){const t=a.oxw();a.Q6J("formGroup",t.formGroup)}}function V(t,e){if(1&t){const t=a.EpF();a.TgZ(0,"button",32),a.NdJ("click",function(){return a.CHM(t),a.oxw().dimissAndSave()}),a._uU(1),a.ALo(2,"currency"),a.qZA(),a.TgZ(3,"button",32),a.NdJ("click",function(){return a.CHM(t),a.oxw().payNow()}),a._uU(4),a.ALo(5,"currency"),a.qZA()}if(2&t){const t=a.oxw();a.xp6(1),a.hij("Add to order ",a.xi3(2,2,t.total,"GBP")," "),a.xp6(3),a.hij("Pay now ",a.xi3(5,5,t.total,"GBP")," ")}}let W=(()=>{class t{constructor(t,e,o,n,i){this.fb=t,this.ref=e,this.cart=o,this.router=n,this.prod=i,this.formGroup=this.fb.group({choice:[null,q.kI.required],qty:1,total:[0],options:[[]],instructions:[""]}),this.total=0,this.data=i}ngOnInit(){this.formGroup.valueChanges.pipe((0,r.U)(t=>{if(!t.choice)return 0;let e=t.choice.price*t.qty;const o=t.options.map(t=>t.price).reduce((t,e)=>t+e,0);return e=Math.round(100*(e+o))/100,e})).subscribe(t=>this.total=t),this.formGroup.get("choice")?.setValue(this.data.choices[0])}_saveToCart(){return(0,_.of)(this.formGroup.getRawValue()).pipe((0,r.U)(t=>(t.name=this.data.name,t.thumbImg=this.data.thumbImg,t.productId=this.data.productId,t)),(0,r.U)(t=>B.m.create(t)),(0,c.b)(t=>{this.cart.add(t)}))}dimissAndSave(){this._saveToCart().subscribe(t=>{this.ref.dismiss()},t=>console.log("error",t.message))}dismiss(){this.ref.dismiss()}getSrcset(t){return`${t} 200w`}payNow(){this._saveToCart().subscribe(t=>{this.ref.dismiss(),this.router.navigate(["gg-checkout"])},t=>console.log("error",t.message))}}return t.\u0275fac=function(e){return new(e||t)(a.Y36(q.qu),a.Y36(k),a.Y36(R._),a.Y36(i.F0),a.Y36(P))},t.\u0275cmp=a.Xpm({type:t,selectors:[["app-click-collect-bottom-sheet"]],decls:22,vars:7,consts:[[1,"ccbs-container",3,"formGroup"],[1,"ccbs-img-container"],["imgSize","medium",3,"appCustomImg"],[4,"ngTemplateOutlet"],[1,"ccbs-choices"],[1,"list-spacer",2,"width","100px","height","200px"],["ProductOptionsTmpl",""],["productSelectionTmp",""],["BottomActionbarTmpl",""],["incrementTmpl",""],["OrderInstructionsTmpl",""],["SaveBtnTmpl",""],[3,"formGroup"],["formControlName","options"],["style","font-size: 10px",3,"value",4,"ngFor","ngForOf"],[2,"font-size","10px",3,"value"],[2,"display","flex","justify-content","space-between"],[2,"font-size","14px"],[1,"ccbs-product-choose-label"],[1,"ccbs-product-choose",3,"formGroup"],["aria-label","Select an option","formControlName","choice"],[3,"value",4,"ngFor","ngForOf"],[3,"value"],[2,"max-width","25ch"],[2,"white-space","pre"],[1,"ccbs-action-bar",3,"formGroup"],["mat-fab","",2,"background-color","white",3,"click"],["styleClass","Lrg","formControlName","qty",3,"showRemoveButton"],["appearance","outline"],["matInput","","readonly","",3,"value"],["matInput","",3,"value"],["matInput","","formControlName","instructions"],["mat-raised-button","",2,"border-radius","30px","padding","8px 18px",3,"click"]],template:function(t,e){if(1&t&&(a.TgZ(0,"div",0),a.TgZ(1,"div",1),a._UZ(2,"img",2),a.qZA(),a.YNc(3,I,1,0,"ng-container",3),a.YNc(4,N,1,0,"ng-container",3),a.TgZ(5,"div",4),a.YNc(6,Y,1,0,"ng-container",3),a.YNc(7,G,1,0,"ng-container",3),a.qZA(),a._UZ(8,"div",5),a.YNc(9,z,1,0,"ng-container",3),a.qZA(),a.YNc(10,E,3,2,"ng-template",null,6,a.W1O),a.YNc(12,U,6,2,"ng-template",null,7,a.W1O),a.YNc(14,j,5,2,"ng-template",null,8,a.W1O),a.YNc(16,D,10,4,"ng-template",null,9,a.W1O),a.YNc(18,$,5,1,"ng-template",null,10,a.W1O),a.YNc(20,V,6,8,"ng-template",null,11,a.W1O)),2&t){const t=a.MAs(11),o=a.MAs(13),n=a.MAs(15),i=a.MAs(17),r=a.MAs(19);a.Q6J("formGroup",e.formGroup),a.xp6(2),a.Q6J("appCustomImg",e.prod.thumbImg.url),a.xp6(1),a.Q6J("ngTemplateOutlet",i),a.xp6(1),a.Q6J("ngTemplateOutlet",o),a.xp6(2),a.Q6J("ngTemplateOutlet",t),a.xp6(1),a.Q6J("ngTemplateOutlet",r),a.xp6(2),a.Q6J("ngTemplateOutlet",n)}},styles:[".ccbs-choices[_ngcontent-%COMP%], .mat-list-option[_ngcontent-%COMP%], .mat-radio-button[_ngcontent-%COMP%]{font:var(--font-smaller-sub-heading12)!important;color:var(--grey-80)}.mat-radio-button[_ngcontent-%COMP%]{margin:10px}p[_ngcontent-%COMP%]{position:relative;border:#0000;font:var(--font-smaller-sub-heading12);padding:0;margin:0}p[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{margin:0;display:inline-block;position:absolute;padding:0 5px;background-color:#fff;top:-9px;left:10px;color:var(--grey-80);font-size:9px}.ccbs-product-choose[_ngcontent-%COMP%]{display:block;margin:0;padding:16px 0;border:.05em solid var(--grey-10);border-radius:8px;overflow-x:hidden}.ccbs-img-container[_ngcontent-%COMP%]{display:flex;justify-content:center;padding:0 24px;margin:0 -16px;background-color:var(--background-color1);height:250px}.ccbs-img-container[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{margin:0 auto;border:24px solid var(--grey-30);object-fit:scale-down;-webkit-clip-path:circle(100px at center);clip-path:circle(100px at center)}.ccbs-action-bar[_ngcontent-%COMP%]{display:flex;padding:3px;justify-content:space-around;align-content:center;align-items:center;background-color:#eed03b;box-sizing:border-box;margin:0;width:100vw;position:sticky;bottom:-8px;z-index:100;transform:translateX(-16px);box-shadow:0 -9px 18px -8px var(--grey-30)}.mat-radio-button[_ngcontent-%COMP%]{margin-left:10px}.mat-form-field[_ngcontent-%COMP%]{width:100%;font-family:var(--font-family)}"]}),t})(),X=(()=>{class t{constructor(t){this.sheet=t}openSheet(t){this.sheet.open(W,{data:t}).afterDismissed().subscribe(t=>{})}}return t.\u0275fac=function(e){return new(e||t)(a.LFG(F))},t.\u0275prov=a.Yz7({token:t,factory:t.\u0275fac,providedIn:"root"}),t})();var H=o(77040),K=o(4885);function tt(t,e){1&t&&a._UZ(0,"mat-progress-spinner",8)}function et(t,e){1&t&&a.GkF(0)}function ot(t,e){1&t&&a.GkF(0)}const nt=function(t){return{prods:t}};function it(t,e){if(1&t&&(a.ynx(0),a.TgZ(1,"div",9),a._UZ(2,"div",10),a._uU(3),a.qZA(),a.YNc(4,ot,1,0,"ng-container",3),a.BQk()),2&t){const t=e.$implicit;a.oxw();const o=a.MAs(11);a.xp6(2),a.Q6J("id",t[0]),a.xp6(1),a.hij(" ",t[0]," "),a.xp6(1),a.Q6J("ngTemplateOutlet",o)("ngTemplateOutletContext",a.VKq(4,nt,t[1]))}}function at(t,e){if(1&t){const t=a.EpF();a.TgZ(0,"a",13),a.NdJ("click",function(){const e=a.CHM(t).$implicit;return a.oxw(2).scrollToId(e[0])}),a._uU(1),a.qZA()}if(2&t){const t=e.$implicit;a.xp6(1),a.Oqu(t[0])}}function rt(t,e){if(1&t&&(a.TgZ(0,"div",11),a.YNc(1,at,2,1,"a",12),a.qZA()),2&t){const t=e.prods;a.xp6(1),a.Q6J("ngForOf",t)}}function st(t,e){1&t&&(a.TgZ(0,"div",15),a._uU(1,"jlljj"),a.qZA())}function ct(t,e){if(1&t){const t=a.EpF();a.TgZ(0,"div",16),a.NdJ("click",function(){const e=a.CHM(t).$implicit;return a.oxw(2).onChooseProduct(e)}),a.TgZ(1,"p",17),a._uU(2),a.qZA(),a.TgZ(3,"div",18),a._uU(4),a.qZA(),a.TgZ(5,"div",19),a.TgZ(6,"span"),a._uU(7),a.ALo(8,"currency"),a.qZA(),a.qZA(),a.TgZ(9,"div",20),a._UZ(10,"img",21),a.qZA(),a.qZA()}if(2&t){const t=e.$implicit;a.xp6(2),a.Oqu(t.name),a.xp6(2),a.hij(" ",t.description," "),a.xp6(3),a.Oqu(a.xi3(8,4,t.lowestPrice(),"GBP")),a.xp6(3),a.Q6J("src",null==t||null==t.thumbImg?null:t.thumbImg.url,a.LSH)}}function lt(t,e){if(1&t&&(a.YNc(0,st,2,0,"ng-template"),a.YNc(1,ct,11,7,"div",14)),2&t){const t=e.prods;a.xp6(1),a.Q6J("ngForOf",t)}}let pt=(()=>{class t{constructor(t,e){this.rnd=t,this.ref=e,this.imgSize="thumb"}ngAfterViewInit(){const t=this.ref.nativeElement;switch(this.imgSize){case"thumb":{const[e,o]=this.thumbAttrs();this.rnd.setAttribute(t,"srcset",e);break}case"medium":{const[e,o]=this.medAttrs();this.rnd.setAttribute(t,"srcset",e);break}case"large":{const[e,o]=this.largeAttrs();this.rnd.setAttribute(t,"srcset",e);break}}}thumbAttrs(){return[`${this.appCustomImg} 738w`,"(max-width: 330px) 150px,\n                   (min-width: 319px) and (max-width: 550px) 300px,\n                   (min-width: 551px) and (max-width: 800px) 175px,\n                   (min-width: 801px) 100px"]}medAttrs(){return[`${this.appCustomImg} 738w`,"(max-width: 330px) 200px,\n                   (min-width: 331px) and (max-width: 550px) 200px,\n                   (min-width: 551px) and (max-width: 800px) 400px,\n                   (min-width: 801px) 550px"]}largeAttrs(){return[`${this.appCustomImg} 738w`,"(max-width: 330px) 75px,\n                   (min-width: 331px) and (max-width: 550px) 100px,\n                   (min-width: 551px) and (max-width: 800px) 200px,\n                   (min-width: 801px) 250px"]}}return t.\u0275fac=function(e){return new(e||t)(a.Y36(a.Qsj),a.Y36(a.SBq))},t.\u0275dir=a.lG2({type:t,selectors:[["","appCustomImg",""]],inputs:{imgSize:"imgSize",appCustomImg:"appCustomImg"}}),t})(),dt=(()=>{class t{constructor(t,e,o,n){this.acr=t,this.bss=e,this.rnd=o,this.repo=n,this.id=Math.round(1e3*Math.random()),this.isLoading=!1,this.cardOvers=new Set}ngOnInit(){this.prods$=this.repo.listProductItems().pipe((0,r.U)(t=>this.repo._collateByCategory(t))),this.acr.params.pipe((0,r.U)(t=>t.id??new Error("wasteful")),(0,s.zg)(t=>this.repo.findOne(t)),(0,r.U)(t=>t??new Error("Product Id not found")),(0,c.b)(t=>this.onChooseProduct(t))).subscribe(t=>console.log("acr",t),t=>console.log("Err",t.message??t.toString()))}ngAfterViewInit(){this.imgs.notifyOnChanges(),this.imgs.changes.subscribe(t=>{this.imgs.forEach((t,e)=>{const o=t.nativeElement,n=o.getElementsByTagName("img")[0],i=o.parentElement.clientWidth;this.rnd.setStyle(n,"width",i/3+"px"),this.rnd.setStyle(o,"width",i/3+"px")})})}ngOnDestroy(){}onChooseProduct(t){this.bss.openSheet(t)}scrollToId(t){document.getElementById(t)?.scrollIntoView({behavior:"smooth",block:"start"})}computeImgSize(t,e){}asProdFileFacade(t){return t}pointerOver(t,e,o){return t.stopImmediatePropagation(),l.D.log("productid")(e,o),o&&(this.cardOvers.has(e)?this.cardOvers.has(e)&&this.cardOvers.delete(e):this.cardOvers.add(e)),!1}isPointerOver(t){return this.cardOvers.has(t)}}return t.\u0275fac=function(e){return new(e||t)(a.Y36(i.gz),a.Y36(X),a.Y36(a.Qsj),a.Y36(H.E))},t.\u0275cmp=a.Xpm({type:t,selectors:[["app-click-collect"]],viewQuery:function(t,e){if(1&t&&a.Gf(pt,5,a.SBq),2&t){let t;a.iGM(t=a.CRH())&&(e.imgs=t)}},decls:12,vars:10,consts:[[1,"cc-container"],["mode","indeterminate","color","primary",4,"ngIf"],["id","ccListWrapper",1,"cc-list-wrapper"],[4,"ngTemplateOutlet","ngTemplateOutletContext"],[4,"ngFor","ngForOf"],[1,"spacer"],["CategoriesRibbonTmpl",""],["cardTmpl",""],["mode","indeterminate","color","primary"],[1,"category-header",2,"text-transform","capitalize"],[2,"position","relative","transform","translateY(-128px)","display","block",3,"id"],[1,"horizontal-slidebar"],["class","span-item",3,"click",4,"ngFor","ngForOf"],[1,"span-item",3,"click"],["class","card-layout mat-elevation-z3",3,"click",4,"ngFor","ngForOf"],[1,"mat-elevation-z13"],[1,"card-layout","mat-elevation-z3",3,"click"],[1,"product-name"],[1,"product-description"],[1,"product-price"],["id","product-image",1,"product-image"],["width","100%",3,"src"]],template:function(t,e){if(1&t&&(a.TgZ(0,"div",0),a.YNc(1,tt,1,0,"mat-progress-spinner",1),a.TgZ(2,"div",2),a.YNc(3,et,1,0,"ng-container",3),a.ALo(4,"async"),a.YNc(5,it,5,6,"ng-container",4),a.ALo(6,"async"),a._UZ(7,"div",5),a.qZA(),a.qZA(),a.YNc(8,rt,2,1,"ng-template",null,6,a.W1O),a.YNc(10,lt,2,1,"ng-template",null,7,a.W1O)),2&t){const t=a.MAs(9);a.xp6(1),a.Q6J("ngIf",e.isLoading),a.xp6(2),a.Q6J("ngTemplateOutlet",t)("ngTemplateOutletContext",a.VKq(8,nt,a.lcZ(4,4,e.prods$))),a.xp6(2),a.Q6J("ngForOf",a.lcZ(6,6,e.prods$))}},directives:[n.O5,n.tP,n.sg,K.Ou],pipes:[n.Ov,n.H9],styles:["html[_ngcontent-%COMP%]{scroll-behavior:smooth}.cc-container[_ngcontent-%COMP%]{width:100vw}.cc-list-wrapper[_ngcontent-%COMP%]{box-sizing:border-box;display:flex;padding-top:50px;flex-flow:row wrap;overflow-y:scroll;height:calc(90vh);width:100vw;justify-content:center}.horizontal-slidebar[_ngcontent-%COMP%]{position:fixed;margin:0;box-sizing:border-box;width:100%;top:48px;z-index:1000;display:flex;flex-flow:row nowrap;overflow-x:scroll;height:50px}.horizontal-slidebar[_ngcontent-%COMP%]   .span-item[_ngcontent-%COMP%]{white-space:nowrap;text-align:center;vertical-align:center;border-bottom:2px solid #0000;transition:border-bottom-color .25s}.horizontal-slidebar[_ngcontent-%COMP%]   .span-item[_ngcontent-%COMP%]:hover{border-bottom-color:var(--component-background-color2);transition:border-bottom-color 1.75s}.category-header[_ngcontent-%COMP%]{top:-8px;flex:0 0 auto;width:100%;padding-left:16px;vertical-align:bottom;height:80px;font:var(--font-regular-sub-heading);display:flex;align-items:center;justify-items:center;justify-content:center;border-bottom:5px double #f5f5f5;box-sizing:border-box}.card-layout[_ngcontent-%COMP%]{flex:1 1 28%;max-width:30%;min-width:300px;overflow-x:hidden;box-sizing:border-box;padding:16px;display:grid;width:calc(100% - 23px);grid-template-columns:60% 40%;grid-template-rows:auto auto 25px;grid-row-gap:8px}.card-layout[_ngcontent-%COMP%]   .product-name[_ngcontent-%COMP%]{width:auto;grid-row:1;grid-column:1/span 2}.card-layout[_ngcontent-%COMP%]   .product-description[_ngcontent-%COMP%]{grid-row:2;grid-column:1}.card-layout[_ngcontent-%COMP%]   .product-price[_ngcontent-%COMP%]{grid-row:3/span 2;grid-column:1;display:flex;flex-direction:row;align-items:flex-end;height:100%}.card-layout[_ngcontent-%COMP%]   .product-price[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{vertical-align:bottom;line-height:18px}.card-layout[_ngcontent-%COMP%]   .product-image[_ngcontent-%COMP%]{grid-row:1/span 3;grid-column:2}.horizontal-slidebar[_ngcontent-%COMP%]{background-color:#fafafa;box-shadow:-1px 1px 12px 3px var(--grey-40);border:1px solid var(--grey-30);border-left:none;border-right:none}.horizontal-slidebar[_ngcontent-%COMP%]   .span-item[_ngcontent-%COMP%]{flex:1 0 90px;display:inline;padding:8px;font:var(--font-smaller-sub-heading);font-family:Arial Black,monospace;color:var(--grey-80);-webkit-user-select:none;user-select:none}.card-layout[_ngcontent-%COMP%]{background-color:#fff;margin:1%;border:1px solid var(--grey-10);padding:8px;overflow-y:hidden}.card-layout[_ngcontent-%COMP%]   .product-description[_ngcontent-%COMP%], .card-layout[_ngcontent-%COMP%]   .product-name[_ngcontent-%COMP%], .card-layout[_ngcontent-%COMP%]   .product-price[_ngcontent-%COMP%]{-webkit-user-select:none;user-select:none}.card-layout[_ngcontent-%COMP%]:hover{transition:box-shadow .5s;box-shadow:0 2px 3px 2px #a9a9a9}.card-layout[_ngcontent-%COMP%]   .product-description[_ngcontent-%COMP%]{margin:0 8px;font:var(--font-smaller-sub-heading12);border:none;color:var(--grey-80);overflow-y:hidden;max-height:200px}.card-layout[_ngcontent-%COMP%]   .product-price[_ngcontent-%COMP%]{margin-left:8px;line-height:28px;width:calc(40% - 8px);color:#000;font:var(--font-regular-sub-heading16-inconsalata)}.card-layout[_ngcontent-%COMP%]   .product-name[_ngcontent-%COMP%]{box-sizing:border-box;margin:0 8px;font:var(--font-regular-sub-heading16-inconsalata)}.card-layout[_ngcontent-%COMP%]   .product-image[_ngcontent-%COMP%]{overflow-x:hidden;display:block;width:100%}.card-layout[_ngcontent-%COMP%]   .product-image[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{object-fit:fill}.spacer[_ngcontent-%COMP%]{position:relative;box-sizing:border-box;height:100vh;display:block;width:100%}@media (hover:hover) and (pointer:coarse){.mat-card[_ngcontent-%COMP%]:hover{transition:border .5s}}"]}),t})();var ht=o(93738),mt=o(51095),ut=o(77746),gt=o(12522),ft=o(82613),bt=o(76627),xt=o(98295),_t=o(49983),vt=o(44259),wt=o(18553);o(39490),o(46237);let Ct=(()=>{class t{}return t.\u0275fac=function(e){return new(e||t)},t.\u0275mod=a.oAB({type:t}),t.\u0275inj=a.cJS({}),t})(),Ot=(()=>{class t{}return t.\u0275fac=function(e){return new(e||t)},t.\u0275mod=a.oAB({type:t}),t.\u0275inj=a.cJS({imports:[[Ct,h.si,h.BQ,wt.Q8],Ct,h.BQ]}),t})();var yt=o(29127);const Pt=[{path:"",component:dt},{path:":id",component:dt}];let At=(()=>{class t{}return t.\u0275fac=function(e){return new(e||t)},t.\u0275mod=a.oAB({type:t}),t.\u0275inj=a.cJS({providers:[X],imports:[[n.ez,i.Bz.forChild(Pt),ht.QW,S,mt.ot,ut.ie,gt.g0,ft.Fk,bt.Ps,xt.lN,q.UX,q.u5,_t.c,vt.r,K.Cq,Ot]]}),t})();a.B6R(W,[q.JL,q.sg,pt,n.tP,ut.Ub,q.JJ,q.u,n.sg,ut.vS,ft.VQ,ft.U0,mt.lW,bt.Hw,yt.e,xt.KE,xt.hX,_t.Nt,q.Fj],[n.H9])}}]);