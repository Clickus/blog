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
categories: git
---

## Git 一些问题

#### 手机日常遇到的一些 git 问题，记录方便查阅

** fatal: unable to access xxx ': Failed to connect to github.com port 443: Timed out **
解决方法:

```js
  git config --global http.proxy
  git config --global --unset http.proxy
```

#### git 关联本地项目

```js
echo "# fabric-draw" >> README.md
git init
git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/Clickus/fabric-draw.git
git push -u origin main
git push --set-upstream origin main
```

```js
git config --global http.sslVerify "false"
git config http.postBuffer 5242880003
ipconfig /flushdns
```
