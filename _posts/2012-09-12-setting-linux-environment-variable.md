---
layout: post
title: Setting Linux Environment Variable
tags: [linux]
---
> Environment variables are a set of dynamic named values that can affect the way running processes will behave on a computer
> <cite><a href="http://en.wikipedia.org/wiki/Environment_variable">Wikipedia</a></cite>

## Set environment variable Temporary

    export PATH=$PATH:/path/to/xxx/bin
    or
    export XXX_HOME=/path/to/xxx
    export PATH=$PATH:$XXX_HOME/bin

Temporary which mean when you close the terminal all your settings will be gone.

## Set environment variable Permanent
You can do this by append the settings to one of these four files. 
1. `/etc/profile`
2. `/etc/bashrc`
3. `~/.bash_profile`
4. `~/.bashrc`

`#1` and `#2` for System wide environment (for all users).  
`#3` and `#4` for User specific environment.  
`#2` and `#4` mostly for setting alias and *each* time you open a terminal, it will be loaded.
    
    PATH=$PATH:/path/to/xxx/bin
    or
    XXX_HOME=/path/to/xxx
    PATH=$PATH:$XXX_HOME/bin

After you save the your settings you can activate it by calling:

    source /etc/profile

## Conclusions
You can set environment variables by typing it directly to the terminal or put it into a configuration file permanently.
Every time you type a command or execute a script with a long long path, it's time to set your environment variables.
By setting `PATH` this can tell the terminal where to find our command or script.
And by this mean you can set what ever `APP_HOME` you want. Like JAVA_HOME, MAVEN_HOME etc...