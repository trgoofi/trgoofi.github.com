---
layout: post
title: Git Push Rejected Right After Amended Commit
tags: [git]
---

## Problem Scenario
Here, how I get myself in it.
1. `git push` commits to remote repository like github.
2. `git commit --amend` the pushed commit.
3. `git push` now rejected.

### Error Message 

    $ git push  
    To trgoofi.github.com.git ! [rejected] master -> master (non-fast-forward)  
    error: failed to push some refs to 'git@github.com:trgoofi/trgoofi.github.com.git'
    To prevent you from losing history, non-fast-forward updates were rejected
    Merge the remote changes (e.g. 'git pull') before pushing again.  See the
    'Note about fast-forwards' section of 'git push --help' for details.

## Commit History Diagram

                remote                                    P  <-- remote
               /                                         /
    --O--O--P <               after amended        --O--O
               \                                         \
                local                                     P' <-- local


Now you know exactly what happened between remote repository and local repository.
After you amended a commit entry which not the same as the remote commit entry.
In this way the remote repository has a commit entry which you don't have in your local repository.
That's why you got rejected because of git could not do a [fast-forwards] update.


## Solutions
1. `git push -f` to override the remote repository. This will lose commit histories. **Not Recommend**.
2. `git pull` and solve conflicts then `git push`.

Here a [thread] show you how to recover your repository after you do `git push -f`.


[fast-forwards]: http://git-scm.com/docs/git-push#_note_about_fast-forwards "Note about fast-forwards"
[thread]: http://stackoverflow.com/a/432518
