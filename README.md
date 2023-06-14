# Table of contents
-  [Intro](https://github.com/ObviousStudios/VM-Utilities/tree/main#what-is-vm-utilities)
    -  [VM Surfer](https://github.com/ObviousStudios/VM-Utilities/tree/main#vm-surfer)
    -  [Extension Builder](https://github.com/ObviousStudios/VM-Utilities/tree/main#extension-builder)
        -  [Initilizing](https://github.com/ObviousStudios/VM-Utilities/tree/main#initilizing-an-extension)
        -  [Adding a Block](https://github.com/ObviousStudios/VM-Utilities/tree/main#adding-a-block)
            -  [Event activated Hats](https://github.com/ObviousStudios/VM-Utilities/tree/main#event-activated-hats)
        -  [Arguments](https://github.com/ObviousStudios/VM-Utilities/tree/main#adding-an-argument-to-a-block)
            -  [Inline Images](https://github.com/ObviousStudios/VM-Utilities/tree/main#adding-an-image-to-a-block)
        -  [Adding a Button](https://github.com/ObviousStudios/VM-Utilities/tree/main#adding-a-button)
        -  [Menus](https://github.com/ObviousStudios/VM-Utilities/tree/main#adding-a-menu)
            - [Static](https://github.com/ObviousStudios/VM-Utilities/tree/main#static-menu-example)
            - [Dynamic](https://github.com/ObviousStudios/VM-Utilities/tree/main#dynamic-menu-example)
        -  [Adding Labels](https://github.com/ObviousStudios/VM-Utilities/tree/main#adding-labels)
        -  [Adding Dividers](https://github.com/ObviousStudios/VM-Utilities/tree/main#adding-dividers)
        -  [Filtering](https://github.com/ObviousStudios/VM-Utilities/tree/main#filtering-blocks)
        -  [Hiding Blocks](https://github.com/ObviousStudios/VM-Utilities/tree/main#hiding-blocks)
        -  [Registering](https://github.com/ObviousStudios/VM-Utilities/tree/main#registering-an-extension)
# What is VM-Utilities?
A bunch of wrappers for better interacting with the scratch VM and the object's it holds within itself.

### VM surfer
VM surfer allows you to surf through all sprites clones and the stage as well as thier local variables and lists.
All you really need to know is how to refresh
```js
vmSurfer.refreshJSON();
```

### Extension Builder
Some code that makes building extensions faster since you don't have to sort through json and everything can be done through simple functions

#### Initilizing an extension
```js
const extension = new ExtensionBuilder("Extension", "extension")
```

#### Adding a block
extension.addBlock() allows you to create a block in your extension <br />
the first argument is the text. <br />
the second is the block's ID. <br />
the third is the block type. <br />
the fourth is the functions code. <br />
the fifth is optional but allows you to overide and modify values in the block. <br />
```js
extension.addBlock("Test Block [testArg]","tBlock",Scratch.BlockType.BOOLEAN,
// The blocks code goes after the block type
() => {
  console.log("This Works!")
})
```

#### Event activated hats
Say you want to create a hat and activate it at certain points. How would you do that? <br />
well that is where setEdgeActivation() comes in handy <br />
after declaring a block you can use setEdgeActivation() to set the edge activation status <br />
The first and only argument for this function is weather edge activation is on. <br />
For this hat we will set it to false. <br />
<br />
When we want to activate it all we need to do is run the function runHat() . <br />
The first and only argument of runHat() is the target Hat's ID. <br />
Like this
```js
extension.runHat("eventHat");
```
[Example](https://github.com/ObviousStudios/VM-Utilities/blob/main/Examples/Extension_Builder/eventHats.js)

#### Adding an argument to a block
Adding an argument is a simple as running addArgument() after declaring a block <br />
the first argument is the argument's name. <br />
the second argument is the default value with type inference built in. <br />
the third is optional and allows you to overide the type inference for the argument. <br />
the fourth is optional and lets you define a menu for the argument. <br />
```js
extension.addBlock("Test Block [testArg]","tBlock",Scratch.BlockType.BOOLEAN,
// The blocks code goes after the block type
() => {
  console.log("This Works!")
}).addArgument("testArg","1")
```

#### Adding an image to a block
Adding an image as an argument is as simple as running addImage() after declaring a block <br />
the first argument is the argument's name. <br />
the second argument is the image's dataURI. <br />
the third is optional and allows you to flip the image. <br />
```js
const imageURI = //Very long data URI of an image or SVG
    
extension.addBlock("Look at this cool iamge! [image]","imageTest",Scratch.BlockType.COMMAND,
() => {
  console.log("Why are you looking at the console >:(")
}).addImage("image",imageURI,false)
```
[Example](https://github.com/ObviousStudios/VM-Utilities/blob/main/Examples/Extension_Builder/Images.js)

#### Adding a button
extension.addButton() allows you to create a button in your extension <br />
the first argument is the button's ID. <br />
the second is the button's function <br />
the third is the button's text <br />
```js
extension.addButton("myButton",
  ()=>{
    alert("Buttons!")
  },
  "My button!");
```
[Example](https://github.com/ObviousStudios/VM-Utilities/blob/main/Examples/Extension_Builder/buttons.js)

#### Adding a menu
adding a menu can be done via extension.addMenu() <br />
the first argument is the menu name. <br />
the second argument is the menu's items this can either be a function or a json a function will make it a dynamic menu. <br />
the third optional is whther the menu accepts reporters or not. <br />

##### Static menu example
```js
extension.addMenu("Menu",["1","2","3"])
```

##### Dynamic menu example
```js
extension.addMenu("Menu",() => {
    return ["1","2","3"]
})
```

#### Adding Labels
You can use addLabel() to add a Label between two blocks <br />
```js
extension.addLabel("Made by ObviousAlexC")
```

#### Adding Dividers
You can use addDivider() to add a divider between two blocks <br />
```js
extension.addDivider()
```

#### Filtering Blocks
You can use setFilter() to filter the blocks to a specific sprite type <br />
the first argument is the filter type. This is optional and if you don't put in anything it will be sprite only.
```js
extension.addBlock("This is a boolean that only appears on the sprite!","tBlock3",Scratch.BlockType.BOOLEAN,() => {
    console.log("This Works!")
}).setFilter(Scratch.TargetType.SPRITE)
```
[Example](https://github.com/ObviousStudios/VM-Utilities/blob/main/Examples/Extension_Builder/Filters.js)

#### Hiding Blocks
You can use hideBlock() to hide the current block <br />
```js
extension.addBlock("This Block won't appear.","tBlock",Scratch.BlockType.BOOLEAN,() => {
    console.log("This Works!")
}).hideBlock()
```

#### Registering an extension
and finally you can call extension.register() to register your extension <br />
```js
const extension = new ExtensionBuilder("Test Extension", "tExt")

extension.addBlock("Test Block [testArg]","tBlock",Scratch.BlockType.BOOLEAN,() => {
    console.log("This Works!")
}).addArgument("testArg","1",null,"Menu")

extension.addMenu("Menu",["1","2","3"])

extension.register()
```
the final code for creating an extension with a testing block! <br />
