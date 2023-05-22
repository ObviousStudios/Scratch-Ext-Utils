class ExtensionBuilder{constructor(t,n,e,i){Scratch=Scratch||{TargetType:{SPRITE:"sprite",STAGE:"stage"},BlockType:{COMMAND:"command",REPORTER:"reporter",BOOLEAN:"Boolean",HAT:"hat"},ArgumentType:{STRING:"string",NUMBER:"number",COLOR:"color",ANGLE:"angle",BOOLEAN:"Boolean",MATRIX:"matrix",NOTE:"note"},vm:window.vm,Cast:{toNumber:t=>Number(t),toString:t=>String(t),toBoolean:t=>Boolean(t)},extensions:{unsandboxed:!0,register(t){let n=vm.extensionManager._registerInternalExtension(t);vm.extensionManager._loadedExtensions.set(t.getInfo().id,n)}}},this.internal={},this.internal.JSON={blocks:[],menus:{}},this.internal.defaultFunction={code(){console.log("This block has no code")},arguments:{}},this.addDocs=t=>{this.internal.JSON.docsURI=t},this.addBlock=(t,n,e,i,l,o)=>{i=i||this.internal.defaultFunction.code,this[n]=i,o=o||{};let s=o;s.disableMonitor||(s.disableMonitor=!0),s.opcode=n,s.blockType=e,s.text=t,s.arguments=l||this.internal.defaultFunction.arguments;let r=this.internal.JSON.blocks.length;return this.internal.JSON.blocks.push(s),this.internal.JSON.blocks[r].addArgument=(t,n,e,i)=>{if(null==(e=e||null))switch(typeof n){case"string":default:e=Scratch.ArgumentType.STRING;break;case"boolean":e=Scratch.ArgumentType.BOOLEAN;break;case"number":case"bigint":e=Scratch.ArgumentType.NUMBER}return this.internal.JSON.blocks[r].arguments[t]={type:e,defaultValue:n},(i=i||null)&&"string"==typeof i&&(this.internal.JSON.blocks[r].arguments[t].menu=i),this.internal.JSON.blocks[r]},this.internal.JSON.blocks[r].setFilter=t=>(t=t||Scratch.TargetType.SPRITE,this.internal.JSON.blocks[r].filter=t,this.internal.JSON.blocks[r]),this.internal.JSON.blocks[r].hideBlock=()=>{this.internal.JSON.blocks[r].hideFromPalette=!0},this.internal.JSON.blocks[r].stopMoniter=()=>{this.internal.JSON.blocks[r].disableMonitor=!0},this.internal.JSON.blocks[r]},this.addMenu=(t,n,e)=>{e=e||!1,"function"==typeof n?(this[t+"Function"]=n,this.internal.JSON.menus[t]={items:t+"Function"}):this.internal.JSON.menus[t]={items:n},this.internal.JSON.menus[t].acceptReporters=e},this.addDivider=()=>{this.internal.JSON.blocks.push("---")},this.addLabel=t=>{t=t||"N/A";let n={opcode:"__NOUSEOPCODE",blockType:"label",text:t};this.internal.JSON.blocks.push(n)},this.__NOUSEOPCODE=()=>{},this.internal.createBase=()=>{if(t=t||"Extension",n=n||"extension",this.internal.JSON.name=t,this.internal.JSON.id=n,(e=e||{}).blockColor=e.blockColor||null,e.inputColor=e.inputColor||null,e.outlineColor=e.outlineColor||null,null!=e.blockColor){let l=e.blockColor;l>8947848?this.internal.colors=[l,l-197379,l-394758,]:this.internal.colors=[l,l+197379,l+394758,],e.inputColor,this.internal.colors[1]=e.inputColor,e.outlineColor,this.internal.colors[2]=e.outlineColor,this.internal.JSON.color1=this.internal.colors[0],this.internal.JSON.color2=this.internal.colors[1],this.internal.JSON.color3=this.internal.colors[2]}(i=i||{}).blockIconUri=i.blockIconUri||null,i.menuIconUri=i.menuIconUri||i.blockIconUri||null,this.menuUri=i.menuIconUri,this.blockIco=i.blockIconUri,this.docsUri=null},this.internal.createBase(),this.getInfo=()=>this.internal.JSON,this.register=()=>{Scratch.extensions.register(this)}}}
