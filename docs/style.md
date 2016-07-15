# Style Guide

## General Guidelines
* Use 4 spaces to indent- never tabs. 2 spaces is harder to read and leads to cluttered code.
* Each file should end in a newline. This allows for cleaner diffs when adding to the end of a file.
* Use UN*X style newlines (`\n`) instead of Windows (`\r\n`)
* Remove all trailing whitespace
* 80 characters per line (flexible for HTML, strict for JS and CSS)
* Avoid spelling mistakes, even in variable names.

## JavaScript
JSHint should catch most of these errors. I suggest downloading a package for your editor that validates in real time (or on save, if your computer is slow)
* ALWAYS `'use strict;'`
* Use semicolons, no exceptions
* Single quotes preferred over double. `console.log('It\'s "quoted"');` looks better than `console.log("It's \"quoted\"');`, at least in my opinion.
* Always use curly braces, and put the opening brace on the same line
* Always include `var` when assigning a variable for the first time-- to avoid making it global.
* Declare one variable per var statement.
* Ensure all variables are used.
* Use UPPERCASE for Contants, even as properties.
* Use PascalCase for objects
* Use camelCase for everything else.
* Wrap immediate  invocation of functions in parenthesis. `(function() { ... }());`
* Short Array and Object declarations can be put on one line
```
var a = { hello: 'world' };
var b = ['hello', 'world'];
```
*  But long declarations should be split
```
var c = {
  thisIsALongPropertyName: 0,
  soTheObjectIsSplit: 1
};
```
* Avoid trailing commas in Object definitions
* Use `===` aand `!==` over `==` and `!=`
* Comment all non-trivial conditions
* Return from functions to avoid deep if-statement nesting
* Named closures are allowed, but not required. Naming closures increases the readability of stack traces.
* Function calls can be chained, but only one function call is allowed per line and each function must be indented
```
var string = 'hello world';
string = string
  .split(' ')
  .push('!')
  .join(' ');
```
* Do not extend native prototypes
* Use `var func = function()` for function definitions rather than `function func()` to avoid [hoisting](http://www.adequatelygood.com/JavaScript-Scoping-and-Hoisting.html).
* Use promises instead of callbacks when possible
* Files should be wrapped in an immediated-invoked function

## Node
* Order `require(..)` in the order: core modules, npm modules, other modules, JSON files
* Do not use `.js` when requiring modules, but use it when requiring `.json`
* Exported functions/variables should be defined before calling module.exports.
* Put all "secret" information into a config file

### Routes
All routes should go in the `app/routers` folder
* Routes should be named after the model they access, if they access a model.
* All routes should be put into their own file, named '<route>_router.js' (e.g. '/user/...' in user_router.js, '/position/...' in position_router.js)
* Routes should send accurate HTTP Status Codes
* Accept only GET and POST requests
* Ensure routes are properly gated

### Database Controllers
* Create a new file for each model, named '<model>_controller.js'
* Files should only call functions on the model they were built for, unless getting information about an association
* Read operations should only return data about the instance, rather than the instance itself.

## Angular
* Define one component per file
* Use named functions when declaring components
```
var controllerCtrl = function() { ... };
angular.module('app').controller('controllerCtrl', controllerCtrl);
```
* Define dependencies as an array, above the components function declaration
```
var dependencies = ['$scope', '$http', ...];
var controllerCtrl = function($scope, $http, ...) { ... };
angular.module('app').controller('controllerCtrl', dependencies.push(controllerCtrl));

### ui-router
* Calls to services should be done in resolves if possible
* All states should be children of `root`

### Controllers
Name your controllers '<controller>.ctrl.js'
* Do not put any $http calls in controllers, move them into services
* Keep controllers short, any extraneous logic should be done in services
* Do not define functions in controllers, assign $scope properties to functions define in services

### Services
Name your services '<service>.srvc.js'
* Always use factories
* Services should have a single responsibility

### Directives
Name your directives '<directive>.dctv.js'
* Only manipulate DOM in directives
