# Laptop Knights
Laptop Knights (the name is still only a placeholder) is an HTML5/JavaScript
game we are putting together as a hobby. It will be based off of the crazy
pen-and-paper adventures we have had as a gaming group. The characters are
designed as representations of our typical play-styles, and the wacky worlds
express the storytelling of our GMs. Our goal with this game is not to produce
an award-winning AAA-competing indie title. We just want to make something that
we will enjoy creating, and hopefully, one day, we will be able to play it.

It's still heavily a work-in-progress, and it may be years before the project is
completed (the game is a lower priority than pretty much everything else).

The gameplay will be similar to a combination of the SEGA game __The Cave__ and
the Nintendo game series __Mario & Luigi__. It will be the typical, adventuring
RPG, consisting of a group of unusual characters banding up to save the world --
or something along those lines. But it will break conventions by keeping the
party small and the narrative fairly short. We are hoping to make the game
replayable rather than a behemoth that is the satisfaction of a lifetime. The
combat system will be in the same vein as __M&L__ via control input deciding the
quality of player attacks and allowing for evasion of enemy attacks. As a
__much__ later iteration goal, the programmer hopes to include different
player input combat styles for each of the individual characters -- ranging,
possibly, from rhythm games to puzzle games. Where __The Cave__ inspiration is
noticeable is within the limited party and story. We are hoping to create the
characters in a way that allows the player to interact with challenges they have
faced before with different approaches. Each of the characters will have
different skill-sets and abilities. For instance, playing as the the thief, the
player will have to handle a stone wall differently than they would if they were
playing as the bombardier.

## What We've Done
### Game Engine
* draw geometric shapes
* transform operator
* created game loop
* respond to user input
  * mouse
* game camera, view, viewport, and projection
* async loading of resources
* scene file loading
* scene swapping (basically level switching)
* audio
* texture mapping
* texture coordinates
* sprite sheets
* sprite animation
* fonts
* text rendering
* game objects
* object AI
  * face
  * follow
* collisions
  * bounding boxes
  * per-pixel
  * generalized (rotation per-pixel)
  * sprite collisions
* camera manipulations
  * pan
  * zoom
  * interpolation
  * shake
  * multiple
* lighting
  * ambient
  * source
  * multiple sources
  * distance attenuation (near and far bounds)
  * diffuse reflection
  * normal mapping
  * specular reflection
  * materials
  * light source types

### Etc
* semantic web elements to allow for more descriptive external linking
* discord webhooks to keep the dev server up to date

## What We Are Working On
### Game Engine <em title="matches book section">v0.8.7</em>
* shadow simulation

## What We Are Doing Next
### Game Engine
* physics
* detecting collisions
* resolving collisions
* particle system
* particle emitters

## TODO
* __^ -> ES6 and Spencer's standards__
* __reduce load by moving functionality to same files__
* __$ README__
* ^CSS for readability on all screens
* ? use newest version of gl-matrix.js || ? build new library
* ? use the electron stack as a container
* ? ~ SceneFileParser -> JSON
* ? \+ more Semantic Web elements

## Glossary
| Key | Value     |
|:---:|:--------- |
| \+  | adds      |
| \-  | removes   |
| ^   | updates   |
| !   | breaks / <em title="e.g. !$: needs to clean up">needs to</em> |
| ~   | changes   |
| &   | fixes     |
| $   | cleans up |
| %   | tests     |
| ?   | asks      |
| <em title="including this one">em</em>  | shows tool-tip |
| \*  | documents |
