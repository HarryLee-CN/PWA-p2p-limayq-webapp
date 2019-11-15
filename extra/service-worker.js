/*
 * @license
 * Your First PWA Codelab (https://g.co/codelabs/pwa)
 * Copyright 2019 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License
 */
'use strict';

/** Application - Service Workers 三个复选框的含义
 * 脱机 -选中后，将模拟脱机体验并阻止任何请求进入网络。
 * 重新加载时更新 -选中后，将获取最新的Service Worker，进行安装，然后立即将其激活。
 * 绕过网络 -选中后，请求绕过服务人员，并直接发送到网络。
 * **/

// CODELAB: Update cache names any time any of the cached files change.
/**在服务工作者中，让我们添加一个，DATA_CACHE_NAME以便我们可以将应用程序的数据与应用程序外壳分开。当更新应用程序外壳程序并清除较早的缓存时，我们的数据保持不变，可以进行超快速加载。请记住，如果将来您的数据格式发生变化，则需要一种方法来处理该问题并确保应用程序外壳程序和内容保持同步。**/
const CACHE_NAME = 'static-cache-v1';
const DATA_CACHE_NAME = 'data-cache-v1';

// CODELAB: Add list of files to cache here.
/**只要没有网络连接，我们就会显示该页面**/
/**为了使我们的应用程序离线运行，我们需要预缓存其所需的所有资源。这也将有助于我们的表现。该应用程序不必从网络上获取所有资源，而能够从本地缓存中加载所有资源，从而消除了任何网络不稳定因素。**/
const FILES_TO_CACHE = [
  // '/',
  // '/index.html',
  // '/scripts/app.js',
  // '/scripts/install.js',
  // '/scripts/luxon-1.11.4.js',
  // '/styles/inline.css',
  // '/images/add.svg',
  // '/images/clear-day.svg',
  // '/images/clear-night.svg',
  // '/images/cloudy.svg',
  // '/images/fog.svg',
  // '/images/hail.svg',
  // '/images/install.svg',
  // '/images/partly-cloudy-day.svg',
  // '/images/partly-cloudy-night.svg',
  // '/images/rain.svg',
  // '/images/refresh.svg',
  // '/images/sleet.svg',
  // '/images/snow.svg',
  // '/images/thunderstorm.svg',
  // '/images/tornado.svg',
  // '/images/wind.svg',
  '/offline.html',
];

self.addEventListener('install', (evt) => {
  console.log('[ServiceWorker] Install');
  // CODELAB: Precache static resources here.
  /**接下来，我们需要在install事件中添加以下代码，以告知服务工作者预缓存脱机页面：**/
  evt.waitUntil(
    /**我们的install事件现在使用打开缓存caches.open()并提供缓存名称。提供缓存名称可以使我们对文件进行版本控制，或将数据与缓存的资源分开，以便我们可以轻松更新其中一个而不影响另一个。**/
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[ServiceWorker] Pre-caching offline page');
      /**
       * 打开缓存后，我们可以调用cache.addAll()，以获取URL列表，从服务器获取它们，并将响应添加到缓存中。请注意，cache.addAll()如果任何单个请求失败，则失败。这意味着您可以确保，如果安装步骤成功，则缓存将处于一致状态。但是，如果由于某种原因它失败了，它将在下次服务工作者启动时自动重试。
       * **/
      return cache.addAll(FILES_TO_CACHE);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (evt) => {
  console.log('[ServiceWorker] Activate');
  // CODELAB: Remove previous cached data from disk.
  /** 我们将使用该activate事件清除缓存中的所有旧数据。此代码可确保您的服务工作者在任何应用程序外壳文件发生更改时都更新其缓存。为了使其正常工作，您需要CACHE_NAME在服务工作者文件顶部增加变量。 **/
  evt.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(keyList.map((key) => {
        if (key !== CACHE_NAME && key !== DATA_CACHE_NAME) {
          console.log('[ServiceWorker] Removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
  );
  self.clients.claim();
});

/**更新fetch事件处理程序以与其他请求分开处理对数据API的请求。**/
self.addEventListener('fetch', (evt) => {
  console.log('[ServiceWorker] Fetch', evt.request.url, evt.request.mode);
  // CODELAB: Add fetch event handler here.
  // if (evt.request.url.includes('/forecast/')) {
  //     console.log('[Service Worker] Fetch (data)', evt.request.url);
  //     evt.respondWith(
  //         caches.open(DATA_CACHE_NAME).then((cache) => {
  //             return fetch(evt.request)
  //                 .then((response) => {
  //                     // If the response was good, clone it and store it in the cache.
  //                     if (response.status === 200) {
  //                         cache.put(evt.request.url, response.clone());
  //                     }
  //                     return response;
  //                 }).catch((err) => {
  //                     // Network request failed, try to get it from the cache.
  //                     return cache.match(evt.request);
  //                 });
  //         }));
  //     return;
  // }
  // evt.respondWith(
  //     caches.open(CACHE_NAME).then((cache) => {
  //         return cache.match(evt.request)
  //             .then((response) => {
  //                 return response || fetch(evt.request);
  //             });
  //     })
  // );
  /**
   * 最后，我们需要处理fetch事件。我们将使用网络回退到缓存策略。服务工作者首先尝试从网络获取资源。如果失败，则服务工作者从缓存中返回脱机页面。
   * **/
  if (evt.request.mode !== 'navigate') {
    // Not a page navigation, bail.
    return;
  }
  evt.respondWith(
    fetch(evt.request)
      .catch(() => {
        return caches.open(CACHE_NAME)
          .then((cache) => {
            return cache.match('offline.html');
          });
      })
  );
});
