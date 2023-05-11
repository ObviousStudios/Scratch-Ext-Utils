# What is VM-Utilities?
A bunch of wrappers for better interacting with the scratch VM and the object's it holds within itself.

### VM surfer
VM surfer allows you to surf through all sprites clones and the stage as well as thier local variables and lists.

### Extension Builder
Some code that makes building extensions faster since you don't have to sort through json and everything can be done through simple functions

#### Initilizing an extension
```js
const extension = new ExtensionBuilder("Extension", "extension")
```

#### Adding a block
extension.addBlock() allows you to create a block in your extension
the first argument is the text.
the second is the block's ID.
the third is the block type.
the fourth is the functions code.
the fifth is optional but allows you to overide and modify values in the block.
```js
extension.addBlock("Test Block [testArg]","tBlock",Scratch.BlockType.BOOLEAN,
// The blocks code goes after the block type
() => {
  console.log("This Works!")
})
```

#### Adding an argument to a block
Adding an argument is a simple as running addArgument() after declaring a block
the first argument is the argument's name.
the second argument is the default value with type inference built in.
the third is optional and allows you to overide the type inference for the argument.
the fourth is optional and lets you define a menu for the argument.
```js
extension.addBlock("Test Block [testArg]","tBlock",Scratch.BlockType.BOOLEAN,
// The blocks code goes after the block type
() => {
  console.log("This Works!")
}).addArgument("testArg","1")
```

#### Adding a menu
adding a menu can be done via extension.addMenu()
the first argument is the menu name.
the second argument is the menu's items this can either be a function or a json a function will make it a dynamic menu.
the third optional is whther the menu accepts reporters or not.

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

#### Registering an extension
and finally you can call extension.register() to register your extension
```js
const extension = new ExtensionBuilder("Test Extension", "tExt")

extension.addBlock("Test Block [testArg]","tBlock",Scratch.BlockType.BOOLEAN,() => {
    console.log("This Works!")
}).addArgument("testArg","1",null,"Menu")

extension.addMenu("Menu",["1","2","3"])

extension.register()
```
the final code for creating an extension with a testing block!
