class ExtensionBuilder {
  constructor(extensionName, extensionID, colors, icon) {
    //Initilize the extension json
    this.internal = {};
    this.internal.JSON = {
      blocks: [],
      menus: {},
    };

    this.runtime = Scratch.vm.runtime;

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
        blockArguments ||
        JSON.parse(JSON.stringify(this.internal.defaultFunction.arguments)); // I hate how js does this sometimes should make the project.json smaller

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

        if (defaultValue == null) {
          this.internal.JSON.blocks[blockIndex].arguments[argumentName] = {
            type: overideType,
          };
        } else {
          this.internal.JSON.blocks[blockIndex].arguments[argumentName] = {
            type: overideType,
            defaultValue: defaultValue,
          };
        }

        menu = menu || null;

        if (menu && typeof menu == "string") {
          if (typeof menu == "string") {
            this.internal.JSON.blocks[blockIndex].arguments[argumentName].menu =
              menu;
          } else if (typeof menu == "function" || typeof menu == "object") {
            this.addMenu(blockID + "_" + argumentName + "_Menu", menu, true);
            this.internal.JSON.blocks[blockIndex].arguments[argumentName].menu =
              blockID + "_" + argumentName + "_Menu";
          } else {
            console.error(
              "Menu '" + blockID + "_" + argumentName + "_Menu'is not valid!"
            );
          }
        }

        return this.internal.JSON.blocks[blockIndex];
      };

      this.internal.JSON.blocks[blockIndex].setIcon = (URL) => {
        this.internal.JSON.blocks[blockIndex].blockIconURI = URL;
        return this.internal.JSON.blocks[blockIndex];
      };

      this.internal.JSON.blocks[blockIndex].setFilter = (filter) => {
        filter = filter || Scratch.TargetType.SPRITE;

        this.internal.JSON.blocks[blockIndex].filter = filter;
        return this.internal.JSON.blocks[blockIndex];
      };

      this.internal.JSON.blocks[blockIndex].hideBlock = () => {
        this.internal.JSON.blocks[blockIndex].hideFromPalette = true;
        return this.internal.JSON.blocks[blockIndex];
      };

      this.internal.JSON.blocks[blockIndex].stopMoniter = () => {
        this.internal.JSON.blocks[blockIndex].disableMonitor = true;
        return this.internal.JSON.blocks[blockIndex];
      };

      this.internal.JSON.blocks[blockIndex].setEdgeActivation = (toggle) => {
        this.internal.JSON.blocks[blockIndex].isEdgeActivated = toggle;
        return this.internal.JSON.blocks[blockIndex];
      };

      this.internal.JSON.blocks[blockIndex].addImage = (
        argumentName,
        imageURI,
        flip
      ) => {
        flip = flip || false;
        const imageJson = {
          type: Scratch.ArgumentType.IMAGE,
          dataURI: imageURI,
          flipRTL: flip,
        };

        this.internal.JSON.blocks[blockIndex].arguments[argumentName] =
          imageJson;
        return this.internal.JSON.blocks[blockIndex];
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

    this.addButton = (buttonID, buttonFunction, buttonText) => {
      buttonFunction = buttonFunction || this.internal.defaultFunction.code;
      buttonText = buttonText || "Button";

      this["button_" + buttonID] = buttonFunction;
      const buttonJson = {};

      buttonJson.func = "button_" + buttonID;
      buttonJson.blockType = Scratch.BlockType.BUTTON;
      buttonJson.text = buttonText;

      const buttonIndex = this.internal.JSON.blocks.length;

      this.internal.JSON.blocks[buttonIndex] = buttonJson;

      return this.internal.JSON.blocks[buttonIndex];
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

    this.setColors = (C1, C2, C3) => {
      C1 = typeof C1 == "string" ? C1 : (C1 + 0).toString(16);
      C2 = typeof C2 == "string" ? C2 : (C2 + 0).toString(16);
      C3 = typeof C3 == "string" ? C3 : (C3 + 0).toString(16);
      this.internal.colors = [0, 0, 0];
      this.internal.colors[0] = C1;
      this.internal.colors[1] = C2;
      this.internal.colors[2] = C3;
      this.internal.JSON.color1 = C1;
      this.internal.JSON.color2 = C2;
      this.internal.JSON.color3 = C3;
    };

    this.setMenuIcon = (URL) => {
      this.internal.JSON.menuIconURI = URL;
    };

    this.setGlobalBlockIcon = (URL) => {
      this.internal.JSON.blockIconURI = URL;
    };

    this.runHat = (hatID) => {
      this.runtime.startHats(this.internal.JSON.id + "_" + hatID);
    };

    this.getInfo = () => {
      return this.internal.JSON;
    };

    this.register = () => {
      Scratch.extensions.register(this);
    };
  }
}
