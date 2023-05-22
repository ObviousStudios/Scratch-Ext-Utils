class ExtensionBuilder {
  constructor(extensionName, extensionID, colors, icon) {
    Scratch = Scratch || {
      TargetType: {
        SPRITE: "sprite",
        STAGE: "stage",
      },
      BlockType: {
        COMMAND: "command",
        REPORTER: "reporter",
        BOOLEAN: "Boolean",
        HAT: "hat",
      },
      ArgumentType: {
        STRING: "string",
        NUMBER: "number",
        COLOR: "color",
        ANGLE: "angle",
        BOOLEAN: "Boolean",
        MATRIX: "matrix",
        NOTE: "note",
      },
      vm: window.vm,
      Cast: {
        toNumber: (input) => {
          return Number(input);
        },

        toString: (input) => {
          return String(input);
        },

        toBoolean: (input) => {
          return Boolean(input);
        },
      },
      extensions: {
        unsandboxed: true,
        register: (object) => {
          const serviceName =
            vm.extensionManager._registerInternalExtension(object);
          vm.extensionManager._loadedExtensions.set(
            object.getInfo().id,
            serviceName
          );
        },
      },
    };
    //Initilize the extension json
    this.internal = {};
    this.internal.JSON = {
      blocks: [],
      menus: {},
    };

    //Putting this into the constructor because that is really funny
    this.internal.defaultFunction = {
      code: () => {
        console.log("This block has no code");
      },
      arguments: {},
    };

    this.addDocs = (url) => {
      this.internal.JSON.docsURI = url;
    };

    this.addBlock = (
      blockName,
      blockID,
      blockType,
      blockFunction,
      blockArguments,
      blockExtras
    ) => {
      blockFunction = blockFunction || this.internal.defaultFunction.code;

      this[blockID] = blockFunction;
      blockExtras = blockExtras || {};
      const blockJson = blockExtras;

      if (!blockJson.disableMonitor) {
        blockJson.disableMonitor = true;
      }

      blockJson.opcode = blockID;
      blockJson.blockType = blockType;
      blockJson.text = blockName;

      blockJson.arguments =
        blockArguments || this.internal.defaultFunction.arguments;

      const blockIndex = this.internal.JSON.blocks.length;
      this.internal.JSON.blocks.push(blockJson);

      this.internal.JSON.blocks[blockIndex].addArgument = (
        argumentName,
        defaultValue,
        overideType,
        menu
      ) => {
        overideType = overideType || null;

        if (overideType == null) {
          switch (typeof defaultValue) {
            case "string":
              overideType = Scratch.ArgumentType.STRING;
              break;
            case "boolean":
              overideType = Scratch.ArgumentType.BOOLEAN;
              break;
            case "number":
              overideType = Scratch.ArgumentType.NUMBER;
              break;
            case "bigint":
              overideType = Scratch.ArgumentType.NUMBER;
              break;

            default:
              overideType = Scratch.ArgumentType.STRING;
              break;
          }
        }

        this.internal.JSON.blocks[blockIndex].arguments[argumentName] = {
          type: overideType,
          defaultValue: defaultValue,
        };

        menu = menu || null;

        if (menu && typeof menu == "string") {
          this.internal.JSON.blocks[blockIndex].arguments[argumentName].menu =
            menu;
        }

        return this.internal.JSON.blocks[blockIndex];
      };

      this.internal.JSON.blocks[blockIndex].setFilter = (filter) => {
        filter = filter || Scratch.TargetType.SPRITE;

        this.internal.JSON.blocks[blockIndex].filter = filter;
        return this.internal.JSON.blocks[blockIndex];
      };

      this.internal.JSON.blocks[blockIndex].hideBlock = () => {
        this.internal.JSON.blocks[blockIndex].hideFromPalette = true;
      };

      this.internal.JSON.blocks[blockIndex].stopMoniter = () => {
        this.internal.JSON.blocks[blockIndex].disableMonitor = true;
      };

      return this.internal.JSON.blocks[blockIndex];
    };

    this.addMenu = (menuName, menuData, acceptReporters) => {
      acceptReporters = acceptReporters || false;
      if (typeof menuData === "function") {
        this[menuName + "Function"] = menuData;
        this.internal.JSON.menus[menuName] = {
          items: menuName + "Function",
        };
      } else {
        this.internal.JSON.menus[menuName] = {
          items: menuData,
        };
      }
      this.internal.JSON.menus[menuName].acceptReporters = acceptReporters;
    };

    this.addDivider = () => {
      this.internal.JSON.blocks.push("---");
    };

    this.addLabel = (Label) => {
      Label = Label || "N/A";
      const LabelJSON = {
        opcode: "__NOUSEOPCODE",
        blockType: "label",
        text: Label,
      };

      this.internal.JSON.blocks.push(LabelJSON);
    };

    this.__NOUSEOPCODE = () => {};
    //Seperate this big chunk from the rest
    this.internal.createBase = () => {
      extensionName = extensionName || "Extension";
      extensionID = extensionID || "extension";

      this.internal.JSON.name = extensionName;
      this.internal.JSON.id = extensionID;

      colors = colors || {};

      colors.blockColor = colors.blockColor || null;
      colors.inputColor = colors.inputColor || null;
      colors.outlineColor = colors.outlineColor || null;

      if (colors.blockColor != null) {
        const baseColor = colors.blockColor;
        if (baseColor > 0x888888) {
          this.internal.colors = [
            baseColor,
            baseColor - 0x030303,
            baseColor - 0x060606,
          ];
        } else {
          this.internal.colors = [
            baseColor,
            baseColor + 0x030303,
            baseColor + 0x060606,
          ];
        }

        if (typeof colors.inputColor != null) {
          this.internal.colors[1] = colors.inputColor;
        }

        if (typeof colors.outlineColor != null) {
          this.internal.colors[2] = colors.outlineColor;
        }

        this.internal.JSON.color1 = this.internal.colors[0];
        this.internal.JSON.color2 = this.internal.colors[1];
        this.internal.JSON.color3 = this.internal.colors[2];
      }

      icon = icon || {};

      icon.blockIconUri = icon.blockIconUri || null;
      icon.menuIconUri = icon.menuIconUri || icon.blockIconUri || null;

      this.menuUri = icon.menuIconUri;
      this.blockIco = icon.blockIconUri;

      this.docsUri = null;
    };

    this.internal.createBase();

    this.getInfo = () => {
      return this.internal.JSON;
    };

    this.register = () => {
      Scratch.extensions.register(this);
    };
  }
}
