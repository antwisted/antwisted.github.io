# Tic-Tac-Toe

![](images/tic-tac-toe.png)

### STEP 1: The Interface

You should start by building the user interface.  This will help drive your code and deduce problems.

The game board should consist of three rows and three columns.  You may consider implementing this using either HTML and floats, or using SVG graphics. The former lending itself to more interesting animations.

You will need two images to represent the "X"s and "O"s.  While it's possible to use text, I highly recommend using images (vector or raster) for the aesthetic.

### STEP 2: Game Logic

Internal game state may be most easily represented as an Array.  Such as:

```js
var game = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
]
```

To start, make the game multi-player.  When the user clicks on a cell, flip the corresponding value in the Array.  In this example, you could use `1` for "X" and `0` for "O".

Once you have the board, it's time to implement victory-checking. A victory for X may look something like this:

```js
var game = [
  [   1, null,    0],
  [   0,    1, null],
  [null, null,    1]
]
```

Representing each "X" as a `1` and each "O" as a `0`.  It's up to you to implement checks for every possible way that a player can win.

### STEP 3: Artificial Intelligence

Once you have multi-player working, it's time to add some AI to our game.  The AI should identify moves that would result in victory, and in all other cases move randomly.  After each player move, it should take a turn.

Consider other types of AI that could make the game more interesting!
