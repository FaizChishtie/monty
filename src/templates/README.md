# Templates

Templates are discord server configurations that Monty uses in the setup phase.

## How To

To create a new template, create a new `Template` object.

`Template` holds information about the:
- `name: String`
- `description: String`
- `channels: Array<Channel>`
- `categories: Array<Category>`

## Fun with Interfaces

Because js doesnt have interfaces... or a non hacky way to implement them, I'm going to list the rules for building a Monty discord proxy class.

Each class should have a `static cast(object)` method that takes a generic js object and 'casts' it to the class type.