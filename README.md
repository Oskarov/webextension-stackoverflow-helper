# Web extension Stack Overflow helper

---

Personal project of [Dmitriy Oskarov](http://frontendfrontier.com/)

---

### Description

The first browser extension that I immediately decided to write in TypeScript. I used Parcel for it. Extension
is embedded on stackoverflow pages, and allows you to copy the code in the "pre" tags by clicking the button, as well as by clicking
Alt+Shift+C copies all the code. On the new tab and in the popup, the number of lines of code copied by the utility is remembered.

Первое браузерное расширение, которое я сразу же решил писать на TypeScript. Для сборки использовал Parcel. Расширение
встраивается на страницы stackoverflow, и даёт копировать код в тегах "pre" по нажатию кнопки, а также при нажатии
Alt+Shift+C копирует весь код. На новом табе и в попапе запоминается сколько строк кода скопировано утилитой.

---

### What's interesting

* The extension inserts button into the html of the specified page.
* The js code of the stackoverflow itself is used through a proxy.
* Using background scripts.
* Track key press for the features
* Using Popup in chrome
* Impact on a new open tab
* Event when installing an extension
* Event when uninstalling an extension

* Расширение вставляет свою кнопку в html указанной страницы.
* Используется js код самого stackoverflow через прокси.
* Использование background скриптов.
* Отслеживание нажатий кнопок на клавиатуре
* Использование Popup в chrome
* Влияние на новый открытый таб
* Ивент при установке расширения
* Ивент при удалении расширения

---

### Installing

1. clone
2. yarn install
3. npm run build / npm run watch
4. open extensions in google chrome
5. turn on developer mod
6. add extension from root folder of project

---

thanks [semeleven](https://career.habr.com/sem-eleven) for workshop