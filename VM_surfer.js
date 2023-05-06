//VM SURFER
//To use the module just paste this into your extension code before declaring the extension class.
//This module is made by obviousAlexC so please give some credit if you use it.
  const vmSurfer = {
    globalVariables: {},
    globalLists: {},
    stage: {},
    sprites: {},
    clones: [],
    refreshJSON() {
      const targets = Scratch.vm.runtime.targets;
      this.sprites = {}; //Refresh the JSON object so that we don't have to do redunant checks to see if a variable no longer exists.
      for (let index = 0; index < targets.length; index++) {
        // We start from 1 so we don't grab the stage.
        const target = targets[index];
        const sprite = target.sprite; //Don't put name so that we can do other stuff with the sprites if we want to.
        if (target.isOriginal && !target.isStage) {
          this.sprites[target.id] = {
            //Declare the sprite to the JSON object for later use.
            id: target.id,
            name: sprite.name,
            originalOBJ: target,
            lists: {},
            variables: {},
          };
          const vars = target.variables;
          const varKeys = Object.keys(vars);
          for (let V = 0; V < varKeys.length; V++) {
            const variable = vars[varKeys[V]];
            if (variable.type == "list") {
              this.sprites[target.id].lists[variable.id] = variable; //Add the current "Variable" to the lists array;
            } else {
              this.sprites[target.id].variables[variable.id] = variable; //Add the current "Variable" to the variables array;
            }
          }
        }
        else if(target.isStage) {
          //Add the stage to VM SURFER so that we can surf the stage for global things.
          this.stage = {
            id: target.id,
            name: sprite.name,
            originalOBJ: target,
          };
          const vars = target.variables;
          const varKeys = Object.keys(vars);
          for (let V = 0; V < varKeys.length; V++) {
            const variable = vars[varKeys[V]];
            if (variable.type == "list") {
              this.globalLists[variable.id] = variable; //Add the current "Variable" to the lists array;
            } else {
              this.globalVariables[variable.id] = variable; //Add the current "Variable" to the variables array;
            }
          }
        }
        else if(!target.isOriginal){
          const cloneDat = {}
          cloneDat = {
            //Declare the sprite to the JSON object for later use.
            id: target.id,
            name: sprite.name,
            originalOBJ: target,
            lists: {},
            variables: {},
          };

          const vars = target.variables;
          const varKeys = Object.keys(vars);
          for (let V = 0; V < varKeys.length; V++) {
            const variable = vars[varKeys[V]];
            if (variable.type == "list") {
              cloneDat.lists[variable.id] = variable; //Add the current "Variable" to the lists array;
            } else {
              cloneDat.variables[variable.id] = variable; //Add the current "Variable" to the variables array;
            }
          }

          this.clones.push(cloneDat)
        }
        else{
          console.warn("An object of an unknown type is inside of the target's JSON Object")
        }
      }
    },
  };