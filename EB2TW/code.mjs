import * as prettier from "https://unpkg.com/prettier@3.0.2/standalone.mjs";
import prettierPluginBabel from "https://unpkg.com/prettier@3.0.2/plugins/babel.mjs";
import prettierPluginEstree from "https://unpkg.com/prettier@3.0.2/plugins/estree.mjs";
import * as EBFUNC from "./EBFUNC_DEF.mjs";

const body = document.body;

const ShitToConvert = document.getElementById("ShitToConvert");
const ConvertedCode = document.getElementById("ConvertedCode");

const convertButton = document.getElementById("convertTheshit");

ShitToConvert.placeholder = '(function(Scratch){\n\n\tconst extension = new extensionBuilder();\n\n})(Window.Scratch)';

convertButton.onclick = () => {
    if (ShitToConvert.value.length > 0){
        const code2Convert = `
        let __UNSANDBOXED_LOAD_EXTENSION_ID__ = "";        
        const __EB_TEMP_CANV__ = document.createElement("canvas")
        const __EB_TEMP_GL__ = __EB_TEMP_CANV__.getContext("webgl")

        const Scratch = {          
            Cast: {            
                toNumber: Number,            
                toString: String,            
                toBoolean: Boolean,            
                compare: (e, o) => ((e = Number(e)) > (o = Number(o)) ? 1 : e < o ? -1 : 0),          },          
                TargetType: { SPRITE: "sprite", STAGE: "stage" },         
                ArgumentType: {            
                    ANGLE: "angle",            
                    BOOLEAN: "Boolean",            
                    COLOR: "color",            
                    NUMBER: "number",            
                    STRING: "string",            
                    MATRIX: "matrix",            
                    NOTE: "note",            
                    IMAGE: "image",            
                    COSTUME: "costume",            
                    SOUND: "sound",          
                },          
                BlockType: {            
                    BOOLEAN: "Boolean",            
                    BUTTON: "button",            
                    LABEL: "label",            
                    COMMAND: "command",            
                    CONDITIONAL: "conditional",            
                    EVENT: "event",            
                    HAT: "hat",            
                    LOOP: "loop",            
                    REPORTER: "reporter",            
                    XML: "xml",          
                },          
                vm: {
                    on:()=>{},
                    extensionManager:{
                        isExtensionLoaded:()=>{},
                        loadExtensionIdSync:()=>{}
                    },
                    runtime:{
                        on:()=>{},
                        extensionManager:{
                            isExtensionLoaded:()=>{},
                            loadExtensionIdSync:()=>{}
                        },
                        renderer:{
                            on:()=>{},
                            canvas:__EB_TEMP_CANV__,
                            gl:__EB_TEMP_GL__,
                            _gl:__EB_TEMP_GL__,
                            _nativeSize: [0,0],
                            _allSkins: [{clear:()=>{}}],
                            _penSkinId:0,
                            _shaderManager:{
                                _shaderCache:{
                                    line:[{}]
                                }
                            }
                        }
                    },
                    renderer:{
                        on:()=>{},
                        canvas:__EB_TEMP_CANV__,
                        gl:__EB_TEMP_GL__,
                        _gl:__EB_TEMP_GL__,
                        _nativeSize: [0,0],
                        _allSkins: [{clear:()=>{}}],
                        _penSkinId:0,
                        _shaderManager:{
                            _shaderCache:{
                                line:[{}]
                            }
                        }
                    }
                },          
                ScratchBlocks: window.ScratchBlocks,          
                paper: window.paper,          
                ReduxStore: window.ReduxStore,          
                extensions: {            
                    unsandboxed: !0,            
                    register(e) {              
                        __UNSANDBOXED_LOAD_EXTENSION_ID__ = [e,e.getInfo()];            
                    },          
                },          
                canFetch: () => !0,          
                openWindow(e, o) {            
                    if (null == (o = o || null)) {                            
                        return;            
                    }            
                    window.open(e, "_blank", o);          
                },          
                redirect(e) {            
                },
            };

            const VMFunctions = ["blockListener","flyoutBlockListener","monitorBlockListener","variableListener","deleteSprite","installTargets","shareSoundToTarget","constructor","start","stop","greenFlag","setTurboMode","setCompatibilityMode","setFramerate","setInterpolation","setRuntimeOptions","setCompilerOptions","setStageSize","setInEditor","convertToPackagedRuntime","addAddonBlock","getAddonBlock","storeProjectOptions","enableDebug","handleExtensionButtonPress","stopAll","clear","getPlaygroundData","postIOData","setVideoProvider","setCloudProvider","scanForPeripheral","connectPeripheral","disconnectPeripheral","getPeripheralIsConnected","loadProject","downloadProjectId","_saveProjectZip","saveProjectSb3","saveProjectSb3Stream","saveProjectSb3DontZip","_addFileDescsToZip","exportSprite","toJSON","fromJSON","deserializeProject","_loadExtensions","addSprite","_addSprite2","_addSprite3","addCostume","addCostumeFromLibrary","duplicateCostume","duplicateSound","renameCostume","deleteCostume","addSound","renameSound","getSoundBuffer","updateSoundBuffer","deleteSound","getCostume","getExportedCostume","getExportedCostumeBase64","updateBitmap","_updateBitmap","updateSvg","_updateSvg","addBackdrop","renameSprite","duplicateSprite","attachAudioEngine","attachRenderer","attachV2SVGAdapter","attachV2BitmapAdapter","attachStorage","setLocale","getLocale","setEditingTarget","exportStandaloneBlocks","shareBlocksToTarget","shareCostumeToTarget","refreshWorkspace","emitTargetsUpdate","emitWorkspaceUpdate","getTargetIdForDrawableId","reorderTarget","reorderCostume","reorderSound","startDrag","stopDrag","postSpriteInfo","setVariableValue","getVariableValue","configureScratchLinkSocketFactory","setMaxListeners","getMaxListeners","emit","addListener","on","prependListener","once","prependOnceListener","removeListener","off","removeAllListeners","listeners","rawListeners","listenerCount","eventNames","__defineGetter__","__defineSetter__","hasOwnProperty","__lookupGetter__","__lookupSetter__","isPrototypeOf","propertyIsEnumerable","toString","valueOf","toLocaleString"];
            const RendererFunctions = ["constructor","setUseHighQualityRender","_updateRenderQuality","setPrivateSkinAccess","setMaxTextureDimension","resize","setBackgroundColor","setDebugCanvas","setUseGpuMode","setStageSize","getNativeSize","_setNativeSize","createBitmapSkin","createSVGSkin","createPenSkin","createTextSkin","updateSVGSkin","updateBitmapSkin","_reskin","updateTextSkin","destroySkin","createDrawable","createTextWrapper","markSkinAsPrivate","setLayerGroupOrdering","_addToDrawList","_updateOffsets","_endIndexForKnownLayerGroup","destroyDrawable","getDrawableOrder","setDrawableOrder","skinWasAltered","draw","getBounds","getBoundsForBubble","getCurrentSkinSize","getSkinSize","getSkinRotationCenter","isTouchingColor","_getMaxPixelsForCPU","_enterDrawBackground","_exitDrawBackground","_isTouchingColorGpuStart","_isTouchingColorGpuFin","isTouchingDrawables","clientSpaceToScratchBounds","drawableTouching","pick","extractDrawableScreenSpace","extractColor","_touchingBounds","_unsnappedTouchingBounds","_candidatesTouching","_candidatesBounds","updateDrawableSkinId","updateDrawablePosition","updateDrawableDirection","updateDrawableScale","updateDrawableDirectionScale","updateDrawableVisible","updateDrawableEffect","updateDrawableProperties","getFencedPositionOfDrawable","penClear","penPoint","penLine","penStamp","_createGeometry","onNativeSizeChanged","enterDrawRegion","_doExitDrawRegion","_drawThese","_getConvexHullPointsForDrawable","requestSnapshot","canHazPixels","setMaxListeners","getMaxListeners","emit","addListener","on","prependListener","once","prependOnceListener","removeListener","off","removeAllListeners","listeners","rawListeners","listenerCount","eventNames","__defineGetter__","__defineSetter__","hasOwnProperty","__lookupGetter__","__lookupSetter__","isPrototypeOf","propertyIsEnumerable","toString","valueOf","toLocaleString"];

            VMFunctions.forEach((thing) => {
                Scratch.vm[thing] = () => {};
            });

            RendererFunctions.forEach((thing) => {
                Scratch.vm.renderer[thing] = () => {};
                Scratch.vm.runtime.renderer[thing] = () => {};
            });

            window.Scratch = Scratch;
            window.vm = Scratch.vm;`+ 
            ShitToConvert.value 
            + `
            __UNSANDBOXED_LOAD_EXTENSION_ID__=__UNSANDBOXED_LOAD_EXTENSION_ID__;`;

        const resultingJSON = eval(code2Convert)

        let usedOpcodes = []

        const blocks = resultingJSON[1].blocks;
        const menus = resultingJSON[1].menus;

        blocks.forEach(block => {
            if (block.opcode){
                if (!usedOpcodes.includes(block.opcode)){
                    usedOpcodes.push(block.opcode);
                }
            }
        });

        if (menus){
            const menuKeys = Object.keys(menus)
            menuKeys.forEach(menuName => {
                const menu = menus[menuName];
                if (typeof menu.items == "string"){
                    if (!usedOpcodes.includes(menu.items)){
                        usedOpcodes.push(menu.items);
                    }
                }
            });
        }

        const jsonToConvert = {
            getInfo: () => { return "BRUH"+JSON.stringify(resultingJSON[1])+"BRUH"; }
        }

        Object.keys(resultingJSON[0]).forEach(opcode => {
            if (!EBFUNC.default.includes(opcode)){
                jsonToConvert[(typeof resultingJSON[0][opcode] == "function") ? opcode : "EB_INBOUNDVAR"+opcode] = resultingJSON[0][opcode];
            }
        })

        jsonToConvert.EB_runtime_NAME = "EB__RUNTIME_REPLACE";
        console.log(jsonToConvert.runtime);

        let stringifiedClass = JSON.stringify(jsonToConvert,function(key, value){return (typeof value === 'function' ) ? value.toString() : value;});

        stringifiedClass = stringifiedClass.replaceAll('"__NOUSEOPCODE":"()=>{}"','__NOUSEOPCODE(){}');

        stringifiedClass = stringifiedClass.replaceAll('__NOUSEOPCODE:() {}','__NOUSEOPCODE(){}');
        stringifiedClass = stringifiedClass.replaceAll('__NOUSEOPCODE(){},','__NOUSEOPCODE(){}');

        stringifiedClass = stringifiedClass.replaceAll("\\n", "");

        stringifiedClass = stringifiedClass.replaceAll('":"() => { '," () {");
        stringifiedClass = stringifiedClass.replaceAll('"()=>{}','() {}')
        stringifiedClass = stringifiedClass.replaceAll('":"({', "({");
        stringifiedClass = stringifiedClass.replaceAll('}",',"}");
        stringifiedClass = stringifiedClass.replaceAll('  }"}'," }");
        stringifiedClass = stringifiedClass.replaceAll('}) => {','}) {')
        stringifiedClass = stringifiedClass.replaceAll('"getInfo',"getInfo");
        stringifiedClass = stringifiedClass.replaceAll(') => {', ') {');
        stringifiedClass = stringifiedClass.replaceAll('\\"','"');

        stringifiedClass = stringifiedClass.replace('"BRUH"+JSON.stringify(resultingJSON[1])+"BRUH"',JSON.stringify(resultingJSON[1]))
        stringifiedClass = stringifiedClass.replaceAll('"opcode":"__NOUSEOPCODE",',"");
        stringifiedClass = stringifiedClass.replaceAll('"opcode":"__NOUSEOPCODE"', "");
        stringifiedClass = stringifiedClass.replaceAll('"EB__RUNTIME_REPLACE"', 'Scratch.vm.runtime')
        stringifiedClass = stringifiedClass.replaceAll('"EB_runtime_NAME":', 'runtime=')
        stringifiedClass = stringifiedClass.replaceAll(/(?<= )(.*?)\.runHat\(/g, 'Scratch.vm.runtime.startHats("' + resultingJSON[1].id + '_" +')

        console.log(resultingJSON[0])

        Object.keys(resultingJSON[0]).forEach(opcode => {
            if (!EBFUNC.default.includes(opcode)){
                stringifiedClass = stringifiedClass.replaceAll('"EB_INBOUNDVAR' + opcode + '":', opcode+"=");
            }
        })

        blocks.forEach(block => {
            if (block.opcode){
                stringifiedClass = stringifiedClass.replaceAll('"'+block.opcode,block.opcode);
                stringifiedClass = stringifiedClass.replaceAll(block.opcode+'":',block.opcode);
                stringifiedClass = stringifiedClass.replaceAll(block.opcode+'"',block.opcode);
                stringifiedClass = stringifiedClass.replaceAll('"opcode":' + block.opcode+",",'"opcode": "__OPPED__' + block.opcode + '__OPPED__",')
                stringifiedClass = stringifiedClass.replaceAll('('+block.opcode+')','("'+block.opcode+'")');
            }
        });

        stringifiedClass = stringifiedClass.replaceAll("__OPPED__","");

        ConvertedCode.value = "(function(Scratch){ class extension"+stringifiedClass + " Scratch.extensions.register(new extension()); })(Scratch)"
        async function format() {
            ConvertedCode.value = await prettier.format(ConvertedCode.value, {
                parser: "babel",
                plugins: [prettierPluginBabel, prettierPluginEstree],
              });
        }

        format()
    }
}