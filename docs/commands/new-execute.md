---
title: New Execute
category: General
tags: 
    - easy
    - experimental
---

## Introduction
With the release of 1.19.10, the Upcoming Creator Features experimental toggle gave the `/execute` command a syntax overhaul. While the syntax is now more verbose and longer to write, it allows much finer control over the contextual components of commands and adds support for conditions to commands, superseding the use of commands like `/testfor`, `/testforblock`, and `/testforblocks`.

Before we dive into the syntax and how to write it, we need to understand how the old `/execute` command worked, and what changed and why. This will make explaining the concepts found in the syntax easier.

## Execute, and Why it Changed
The `/execute` command executes a command on behalf of one or more entities.

The old `/execute` command's syntax used to be this:
```
/execute <origin: target> <position: x y z> <command: command>
/execute <origin: target> <position: x y z> detect <detectPos: x y z> <block: Block> <data: int> <command: command>
```
You specified a target to execute as, then the command's context would change to run as that target, and at that target. Any positions were then relative to that target. While this is useful in most cases, it also forces the fact that a command's target and its position are always tied together (unless you were to manually insert world coordinates in place of *\<position\>*). It's also not very malleable in regards to making conditional statements, as you have to execute as an entity every time.

Back in the Summer of 2017 during the Update Aquatic's development, the developers from Minecraft: Java Edition were getting feedback from the community on how they can improve the `/execute` command's syntax, and the basic concept that was conceived is this: `/execute` takes an unlimited number of **subcommands** that manipulate certain aspects of the command in the order you specify, then a "run" subcommand is placed at the end to fire a command. This allows for much greater control for what `/execute` can do to a command, and allows splitting up the executor and the command's position.

## New Syntax
Now, let's take a look at those subcommands. They are as follows:

### `/execute as`

*   `as <target>`

Changes the target of the command, or who @s will select. Affects rotation due to a bug ([MCPE-156277](https://bugs.mojang.com/browse/MCPE-156277)). This does not change the position of the command, or its dimension. If multiple targets are specified, then a command is ran once for each of them, and @s selects each entity in turn.

Usage:
```
/execute as <origin: target> <command: command>
```

### `/execute at`

*   `at <target>`

Changes where the command runs, setting the command's position and dimension to the entity. This does not change the target of the command, so @s will stay as whoever was targeted last. If multiple targets are specified, then a command is ran once at each of them.

Usage:
```
/execute at <origin: target> <command: command>
```

### `/execute positioned`

*   `positioned <location>`

Set a position for the command to run. [Relative and local coordinates](/commands/relative-coordinates.html) are based around the current position of the command.

Usage:
```
/execute positioned <position: x y z> <command: command>
```

*   `positioned as <target>`

Similar to how `/execute at` works, but only sets the command's position.

Usage:
```
/execute positioned as <origin: target> <command: command>
```

### `/execute (if|unless)`
Prevents running a command based on a condition. If the condition is true then the command will continue, or stop otherwise. `/execute unless` acts as the opposite, testing if the condition is false.

*   `if entity <target>`

Acts like `/testfor`. Returns true if the targets exist.

*   `if block <position> <block> <data value>`

Acts like `/testforblock`. Returns true if the block at the specified location exists.

*   `if blocks <start> <end> <destination> (all|masked)`

Acts like `/testforblocks`. Returns true if the volume at the destination matches the one at the source. `all` tests that all blocks must be there, while `masked` will ignore air blocks.

*   `if score <targetScore> <targetObjective> matches <range>`

Tests if a specified score is a certain value. This uses range syntax.

*   `if score <targetScore> <targetObjective> <operator> <sourceScore> <sourceObjective>`

Tests if a specified score matches some logical comparison to another score. Opertors are equals (`=`), greater than (`>`), greater than or equal to (`>=`), less than (`<`), and less than or equal to (`<=`).

Usage:
```
/execute <subcommand: (if|unless)> block <position: x y z> <block: Block> <blockStates: block states> <command: command>
/execute <subcommand: (if|unless)> block <position: x y z> <block: Block> <data: int> <command: command>
/execute <subcommand: (if|unless)> block <position: x y z> <block: Block> <command: command>
/execute <subcommand: (if|unless)> blocks <begin: x y z> <end: x y z> <destination: x y z> <scan mode: BlocksScanMode> <command: command>
/execute <subcommand: (if|unless)> entity <target: target> <command: command>
```

### `/execute run`

*   `run <command>`

Runs a command using the current context. This argument goes last, though this isn't always required; an `/execute` command ending with `if` or `unless` is valid too.

Usage:
```
/execute run <command: command>
```

## Examples and Upgrading Old Commands
Since subcommands can be chained forever, there really is a nearly infinite combination of arguments for an `/execute` command and they can't all be listed. Instead, listed here are some common examples of commands.

The old functionality of `/execute` can be replicated with `as <target> at @s`. If you need a positional offset relative to them, add `positioned`. If you want to detect if a block is present, add `if block`. Here are some equivalents:
```
# Teleport with an offset
/execute @p ~ ~1.62 ~ teleport @s ^ ^ ^3

/execute as @p at @s positioned ~ ~1.62 ~ run teleport @s ^ ^ ^3
```
```
# Chaining multiple '/execute's
/execute @e[type=sheep] ~ ~ ~ execute @e[type=item,r=5] ~ ~ ~ detect ~ ~-1 ~ stone 0 kill @s

/execute at @e[type=sheep] run execute as @e[type=item,r=5] at @s if block ~ ~-1 ~ stone 0 run kill @s
```
(Note that we don't use `as @e[type=sheep] at @s` because we don't need to execute as the sheep. `run execute` is usually never needed either, but due to a bug ([MCPE-156283](https://bugs.mojang.com/browse/MCPE-156283)) we are using it here as a workaround.)

Now for some examples of things that were either not possible or were more difficult before the new syntax was introduced.

```
# Testing a fake player's score
/execute if score game_settings var matches 3.. run say [Game] Difficulty set to Hard.

# Comparing if two scores are equal
/execute as @a if score @s x = @s y run say My X is equal to my Y.

# Test for an entity without targeting it
/execute as @a at @s if entity @e[type=armor_stand,r=10] run gamemode survival @s
```
