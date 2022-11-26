---
title: 前端预览word pdf ppt excel
comment: true
sidebar: true
# link_reprint:
#   - url: null
#     title: null
# cover: /images/code-cover.png #封面图片
# photos: #文字头部图片
#   - /images/1063.png
#   - /images/cover-2.png
link_refer:
  - url:
    title:
date: 2022-11-25 11:30:43
tags: 杂记
categories: js
---

前端通过链接 url 将相应格式的文件渲染到相应位置 进行预览展示;
以此记录方便以后使用

<!--more-->

- ## 预览 word

  **docx-preview 支持的格式样式比 mammoth 好**

  - #### 使用 mammoth

  ```js
  /**使用CDN资源 或者 npm包 */
  <script
    async
    src="https://cdn.bootcdn.net/ajax/libs/mammoth/1.5.1/mammoth.browser.min.js"
  ></script>;

  /**将链接地址转换成支持的格式 */
  const urlToBlob = url => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open("get", url, true);
      xhr.responseType = "arraybuffer";
      xhr.onload = () => {
        if (xhr.status === 200) {
          resolve(xhr.response);
        } else {
          reject(false);
        }
      };
      xhr.onerror = _ => reject(false);
      xhr.onabort = _ => reject(false);
      xhr.send();
    });
  };

  /**解析展示 */
  window.mammoth.convertToHtml({ arrayBuffer: new Uint8Array(blobStr as Uint8Array) }).then(resultObject => {
    /**html格式字符串  使用 v-html展示即可 */
    const htmlStr = resultObject?.value
  });

  ```

  - #### 使用 docx-preview

  ```js
  /**使用CDN资源 或者 npm包 */
  <script src="https://unpkg.com/jszip/dist/jszip.min.js"></script>
  <script async src="https://unpkg.com/docx-preview/dist/docx-preview.min.js"></script>

  /**解析展示 */
  window.docx
    .renderAsync(new Uint8Array(blobStr as Uint8Array), wordHtmlStr.value)
    .then(
      x => {
        console.log("docx: finished", x);
      },
      err => {
        console.log("docx: error", err);
      }
    )

  ```

- ## 预览 pdf

  - #### 使用 pdfjs-dist

  ```js
  /**使用CDN资源 或者 npm包 */
  <script async src="https://unpkg.com/pdfjs-dist@2.5.207/build/pdf.min.js"></script>;

  const loadingTask = window.pdfjsLib.getDocument(url);
  loadingTask.promise.then(
    async pdf => {
      /**保存pdf对象实例 */
      pdfObj = pdf;
      /**分页展示逻辑 */
      await getPage(pdf, curPage.value);
    },
    _ => {
      loading.value = false;
      pdfSuccess.value = false;
    }
  );

  /**pdf实例 pageNumber 当前页 */
  const getPage = (pdf, pageNumber) => {
    return new Promise((resolve, _) => {
      /**页码合规判断 */
      if (pageNumber > pdf.numPages) {
        curPage.value = pdf.numPages;
        resolve("");
        return;
      }
      // 在不超出&低于总页数的情况下执行
      pdf.getPage(pageNumber).then(page => {
        const viewport = page.getViewport({ scale: 1 });
        const canvas: HTMLCanvasElement | any = document.createElement("canvas");
        const dpr = window.devicePixelRatio || 1;
        const bsr =
          canvas.webkitBackingStorePixelRatio ||
          canvas.mozBackingStorePixelRatio ||
          canvas.msBackingStorePixelRatio ||
          canvas.oBackingStorePixelRatio ||
          canvas.backingStorePixelRatio ||
          1;
        const ratio = dpr / bsr;
        canvas.className = "pdf-canvas";
        canvas.width = viewport.width * ratio;
        canvas.height = viewport.height * ratio;
        canvas.style.width = viewport.width + "px";
        canvas.style.height = viewport.height + "px";
        const canvasContext = canvas.getContext("2d");
        canvasContext.setTransform(ratio, 0, 0, ratio, 0, 0);
        page
          .render({
            canvasContext,
            viewport,
          })
          .promise.then(() => {
            /**像节点添加数据 */
            pdfWrapper.value.appendChild(canvas);
            resolve("");
          });
      });
    });
  };
  ```

- ## 预览 ppt excel

  - #### 使用 微软免费预览 iframe

  ```js
  const buildViewUrl = (url: string) => {
    if (!url) return "";
    return `https://view.officeapps.live.com/op/view.aspx?src=${encodeURIComponent(url)}`;
  };
  <iframe :src="buildViewUrl(urlPath)" width="100%" height="100%" frameborder="0"></iframe>
  ```
