(function (Scratch) {
    class ExtensionBuilder{constructor(n,t,e,i){Scratch=Scratch||{TargetType:{SPRITE:"sprite",STAGE:"stage"},BlockType:{COMMAND:"command",REPORTER:"reporter",BOOLEAN:"Boolean",HAT:"hat"},ArgumentType:{STRING:"string",NUMBER:"number",COLOR:"color",ANGLE:"angle",BOOLEAN:"Boolean",MATRIX:"matrix",NOTE:"note"},vm:window.vm,Cast:{toNumber:n=>Number(n),toString:n=>String(n),toBoolean:n=>Boolean(n)},extensions:{unsandboxed:!0,register(n){let t=vm.extensionManager._registerInternalExtension(n);vm.extensionManager._loadedExtensions.set(n.getInfo().id,t)}}},this.internal={},this.internal.JSON={blocks:[],menus:{}},this.internal.defaultFunction={code(){console.log("This block has no code")},arguments:{}},this.addDocs=n=>{this.internal.JSON.docsURI=n},this.addBlock=(n,t,e,i,o,l)=>{i=i||this.internal.defaultFunction.code,this[t]=i,l=l||{};let r=l;r.disableMonitor||(r.disableMonitor=!0),r.opcode=t,r.blockType=e,r.text=n,r.arguments=o||this.internal.defaultFunction.arguments;let s=this.internal.JSON.blocks.length;return this.internal.JSON.blocks.push(r),this.internal.JSON.blocks[s].addArgument=(n,t,e,i)=>{if(null==(e=e||null))switch(typeof t){case"string":default:e=Scratch.ArgumentType.STRING;break;case"boolean":e=Scratch.ArgumentType.BOOLEAN;break;case"number":case"bigint":e=Scratch.ArgumentType.NUMBER}return this.internal.JSON.blocks[s].arguments[n]={type:e,defaultValue:t},(i=i||null)&&"string"==typeof i&&(this.internal.JSON.blocks[s].arguments[n].menu=i),this.internal.JSON.blocks[s]},this.internal.JSON.blocks[s].setFilter=n=>(n=n||Scratch.TargetType.SPRITE,this.internal.JSON.blocks[s].filter=n,this.internal.JSON.blocks[s]),this.internal.JSON.blocks[s]},this.addMenu=(n,t,e)=>{e=e||!1,"function"==typeof t?(this[n+"Function"]=t,this.internal.JSON.menus[n]={items:n+"Function"}):this.internal.JSON.menus[n]={items:t},this.internal.JSON.menus[n].acceptReporters=e},this.internal.createBase=()=>{if(n=n||"Extension",t=t||"extension",this.internal.JSON.name=n,this.internal.JSON.id=t,(e=e||{}).blockColor=e.blockColor||null,e.inputColor=e.inputColor||null,e.outlineColor=e.outlineColor||null,null!=e.blockColor){let o=e.blockColor;o>8947848?this.internal.colors=[o,o-197379,o-394758,]:this.internal.colors=[o,o+197379,o+394758,],e.inputColor,this.internal.colors[1]=e.inputColor,e.outlineColor,this.internal.colors[2]=e.outlineColor,this.internal.JSON.color1=this.internal.colors[0],this.internal.JSON.color2=this.internal.colors[1],this.internal.JSON.color3=this.internal.colors[2]}(i=i||{}).blockIconUri=i.blockIconUri||null,i.menuIconUri=i.menuIconUri||i.blockIconUri||null,this.menuUri=i.menuIconUri,this.blockIco=i.blockIconUri,this.docsUri=null},this.internal.createBase(),this.getInfo=()=>this.internal.JSON,this.register=()=>{Scratch.extensions.register(this)}}}
    
    const extension = new ExtensionBuilder("Test Extension", "tExt")
  
    extension.addBlock("This is a boolean that only appears on both!","tBlock1",Scratch.BlockType.BOOLEAN,() => {
      console.log("This Works!")
    })
  
    extension.addBlock("This is a boolean that only appears on the stage!","tBlock2",Scratch.BlockType.BOOLEAN,() => {
      console.log("This Works!")
    }).setFilter(Scratch.TargetType.STAGE)
  
    extension.addBlock("This is a boolean that only appears on the sprite!","tBlock3",Scratch.BlockType.BOOLEAN,() => {
        console.log("This Works!")
    }).setFilter(Scratch.TargetType.SPRITE)
  
    extension.addMenu("Menu",["1","2","3"])
  
    extension.register()
  })(window.Scratch);
  
