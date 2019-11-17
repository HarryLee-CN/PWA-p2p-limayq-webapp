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

/**
 * Event handler for butInstall - Does the PWA installation.
 *
 * @param {Event} evt
 */
function installPWA(evt) {
  // CODELAB: Add code show install prompt & hide the install button.
  // 显示提示并隐藏按钮
  // 当用户单击安装按钮时，我们需要调用.prompt()已保存的beforeinstallprompt事件。我们还需要隐藏安装按钮，因为.prompt()在每个保存的事件中只能调用一次。
  deferredInstallPrompt.prompt();
  // Hide the install button, it can't be called twice.
  evt.srcElement.setAttribute('hidden', true);

  // CODELAB: Log user response to prompt.
  //您可以通过侦听userChoice已保存beforeinstallprompt事件的属性返回的承诺来查看用户如何响应安装对话框。outcome在提示显示并且用户对此作出响应之后，promise将返回一个带有属性的对象。
  deferredInstallPrompt.userChoice
    .then((choice) => {
      if (choice.outcome === 'accepted') {
        console.log('User accepted the A2HS prompt', choice);
      } else {
        console.log('User dismissed the A2HS prompt', choice);
      }
      deferredInstallPrompt = null;
    });
}

/**
 * Event handler for beforeinstallprompt event.
 *   Saves the event & shows install button.
 *
 * @param {Event} evt
 */
function saveBeforeInstallPromptEvent(evt) {
  // CODELAB: Add code to save event & show the install button.
  /**保存事件并显示安装按钮
   在我们的saveBeforeInstallPromptEvent函数中，我们将保存对beforeinstallprompt事件的引用，以便prompt()以后可以调用它并更新UI以显示安装按钮。**/
  deferredInstallPrompt = evt;
  installButton.removeAttribute('hidden');
}

/**
 * Event handler for appinstalled event.
 *   Log the installation to analytics or save the event somehow.
 *
 * @param {Event} evt
 */
function logAppInstalled(evt) {
  // CODELAB: Add code to log the event
  console.log('Weather App was installed.', evt);
}

let deferredInstallPrompt = null;
const installButton = document.getElementById('butInstall');
installButton.addEventListener('click', installPWA);

// CODELAB: Add event listener for beforeinstallprompt event
/**如果符合添加到主屏幕的条件，Chrome将触发一个beforeinstallprompt事件，您可以使用该事件指示您的应用可以“安装”，然后提示用户安装该应用。添加以下代码以监听beforeinstallprompt事件：**/
window.addEventListener('beforeinstallprompt', saveBeforeInstallPromptEvent);

// CODELAB: Add event listener for appinstalled event
//记录所有安装事件
// 除了您添加的用于安装应用的用户界面以外，用户还可以通过其他方法（例如Chrome的三点菜单）安装PWA。要跟踪这些事件，请监听appinstalled事件。
window.addEventListener('appinstalled', logAppInstalled);
