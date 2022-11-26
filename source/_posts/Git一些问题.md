---
title: Git一些问题
comment: true
sidebar: true
# link_reprint:
#   - url: null
#     title: null
link_refer:
  - url: null
    title: null
date: 2022-11-14 16:27:23
tags:
categories:
---

## Git 一些问题

#### 手机日常遇到的一些 git 问题，记录方便查阅

** fatal: unable to access xxx ': Failed to connect to github.com port 443: Timed out **
解决方法:

```js
  git config --global http.proxy
  git config --global --unset http.proxy
```
