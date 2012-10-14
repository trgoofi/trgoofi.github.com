---
layout: post
title: Setting up service in IOS Devices
tags: [ipad, IOS, OSX, goagent]
---

Sometimes it would be convenient to have some APPs or daemons running in background after system start up.
And you can do this by using **launchd** in Mac OS X or IOS Devices (iPad, iPhone) etc.

> launchd is a unified, open-source service management framework for starting,
> stopping and managing daemons, applications, processes, and scripts.
> <cite><a href="http://en.wikipedia.org/wiki/Launchd">Wikipedia</a></cite>


## Take setting goagent as service for example

Why take goagent? The first time I needed luanchd is I want goagent running all the time after my iPad start up.

Create a plist file and name it `com.goagent.plist` (up to you). 

    <?xml version="1.0" encoding="UTF-8"?>
    <!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
    <plist version="1.0">
        <dict>
            <key>Label</key>
            <string>com.goagent</string>
            <key>ProgramArguments</key>
            <array>
                <string>python</string>
                <string>/var/mobile/goagent-local/proxy.py</string>
            </array>
            <key>KeepAlive</key>
            <true/>
            <key>StandardOutPath</key>
            <string>/tmp/goagent.log</string>
            <key>StandardErrorPath</key>
            <string>/tmp/goagent.log</string>
            <key>Debug</key>
            <true/>
        </dict>
    </plist>

What this file describe is the same as you type `python proxy.py` in terminal.


Put it under directory `/System/Library/LaunchDaemons/`.
In terminal Activate service by:

    launchctl load /System/Library/LaunchDaemons/com.goagent.plist
    

This assume you can ssh to your devices.

**PS:** While you open files in this directory with your text editor you will see symbols that don't make senses.
Don't be panic. It just XML files. You can install [plist Editor for Windows][1] to open and edit it.

## References
1. [Creating Launch Daemons and Agents] (http://developer.apple.com/library/mac/#documentation/MacOSX/Conceptual/BPSystemStartup/Chapters/CreatingLaunchdJobs.html) 
2. [launchctl(1) OS X Manual Page] (http://developer.apple.com/library/mac/#documentation/Darwin/Reference/ManPages/man1/launchctl.1.html)
3. [launchd(8) OS X Manual Page] (https://developer.apple.com/library/mac/#documentation/Darwin/Reference/Manpages/man8/launchd.8.html)
4. [launchd.plist(5) OS X Manual Page] (http://developer.apple.com/library/mac/#documentation/Darwin/Reference/ManPages/man5/launchd.plist.5.html)


[1]: http://www.icopybot.com/plistset.exe