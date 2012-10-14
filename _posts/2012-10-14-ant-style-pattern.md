---
layout: post
title: Ant Style Patterns
---

Nowadays a lot of frameworks are using ant style patterns to match directory or URL. Here gave you a summary.

|     Element         |     Description                  |
|---------------------|----------------------------------|
|   `*`               |  matches 0 or more characters    |
|   `?`               |  matches 1 character             |
|   `**`              |  matches 0 or more *directories* |
| end with `/` or `\` |  `**` will be appended           |


More details about [ant style patterns][1].

[1]: http://ant.apache.org/manual/dirtasks.html#patterns (ant style patterns)