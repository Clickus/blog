---
title: Centos9安装gitlab-runner.md
comment: true
sidebar: true
link_reprint:
  - url: null
    title: null
link_refer:
  - url: https://www.pudn.com/news/62dd62fc864d5c73acf71b5f.html
    title: gitlab-runner：安装、注册、配置用户root
date: 2022-11-14 13:06:51
tags: gitlab
categories:
---

## Centos9安装gitlab-runner

> 下载 
```url
  wget --content-disposition https://packages.gitlab.com/runner/gitlab-runner/packages/ol/7/gitlab-runner-11.1.0-1.x86_64.rpm/download.rpm
```

> 安装 
```url
  yum localinstall gitlab-runner-11.1.0-1.x86_64.rpm
```

> 注册 

gitlab-runner register


#### 问题

##### 安装gitlab-runner构建机时默认会将用户设置为：gitlab-runner，该设置会使编写.gitlab-ci.yml的脚本，操作带来一些权限上的问题。为了解决这些权限需要将gitlab-runner构建机上的默认用户设置为root。
  - 、查看gitlab-runner进程：ps aux|grep gitlab-runner 可以查看到gitlab-runner的工作目录和默认用户等一系列相关信息。
  - 、卸载gitlab-runner默认用户：sudo gitlab-runner uninstall
  - 、将用户设置为root：gitlab-runner install --working-directory /home/gitlab-runner --user root
  - 、重启服务：systemctl restart gitlab-runner.service
  - 、再次查看gitlab-runner进程：ps aux|grep gitlab-runner