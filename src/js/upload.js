/* global Resizer: true */

/**
 * @fileoverview
 * @author Igor Alexeenko (o0)
 */

'use strict';

define(function() {
  return function() {
    /** @enum {string} */
    var FileType = {
      'GIF': '',
      'JPEG': '',
      'PNG': '',
      'SVG+XML': ''
    };

    /** @enum {number} */
    var Action = {
      ERROR: 0,
      UPLOADING: 1,
      CUSTOM: 2
    };

    /**
     * Регулярное выражение, проверяющее тип загружаемого файла. Составляется
     * из ключей FileType.
     * @type {RegExp}
     */
    var fileRegExp = new RegExp('^image/(' + Object.keys(FileType).join('|').replace('\+', '\\+') + ')$', 'i');

    /**
     * @type {Object.<string, string>}
     */
    var filterMap;

    /**
     * Объект, который занимается кадрированием изображения.
     * @type {Resizer}
     */
    var currentResizer;

    var imageSet = [];
    function setDefault() {
      leftPos.value = currentResizer.getConstraint().x;
      topPos.value = currentResizer.getConstraint().y;
      size.value = currentResizer.getConstraint().side;
    }

// Подписываемся на событие
    window.addEventListener('resizerchange', function() {
      setDefault();
    });

// Вызываем событие



    /**
     * Удаляет текущий объект {@link Resizer}, чтобы создать новый с другим
     * изображением.
     */
    var cleanupResizer = function() {
      if (currentResizer) {
        currentResizer.remove();
        currentResizer = null;
      }
    };

    /**
     * Ставит одну из трех случайных картинок на фон формы загрузки.
     */
    var updateBackground = function() {
      var images = [
        'img/logo-background-1.jpg',
        'img/logo-background-2.jpg',
        'img/logo-background-3.jpg'
      ];

      var backgroundElement = document.querySelector('.upload');
      var randomImageNumber = Math.round(Math.random() * (images.length - 1));
      backgroundElement.style.backgroundImage = 'url(' + images[randomImageNumber] + ')';
    };

    var expireDate = function() {
      var today = new Date();
      today.setHours(0, 0, 0, 0);

      var dateOfGHbirth = new Date();
      dateOfGHbirth.setDate(9);
      dateOfGHbirth.setMonth(11);
      dateOfGHbirth.setHours(0, 0, 0, 0);
      if (today - dateOfGHbirth <= 0) {
        dateOfGHbirth.setFullYear(dateOfGHbirth.getFullYear() - 1);
      }
      return Math.floor( (today - dateOfGHbirth) / (1000 * 60 * 60 * 24));
    };

    /**
     * Проверяет, валидны ли данные, в форме кадрирования.
     * @return {boolean}
     */

    var resizeFormIsValid = function() {
      if (checkValues()) {
        submitBtn.disabled = true;
        return false;
      }
      return true;
    };

    /**
     * Форма загрузки изображения.
     * @type {HTMLFormElement}
     */
    var uploadForm = document.forms['upload-select-image'];

    /**
     * Форма кадрирования изображения.
     * @type {HTMLFormElement}
     */
    var resizeForm = document.forms['upload-resize'];
    var submitBtn = resizeForm.elements.fwd;
    var leftPos = resizeForm.elements.x;
    var topPos = resizeForm.elements.y;
    var size = resizeForm.elements.size;

    function checkValues() {
      return +leftPos.value + (+size.value) > imageSet[0] || +topPos.value + (+size.value) > imageSet[1] || +topPos.value < 0 || +leftPos.value < 0;
    }


    function checkInputs() {
      if (checkValues()) {
        submitBtn.disabled = true;
        return;
      }
      submitBtn.disabled = false;
    }
    // обработчик инпутов в resizeForm
    resizeForm.addEventListener('input', function(evt) {
      if (evt.target.classList.contains('upload-resize-control')) {
        checkInputs();
        currentResizer.setConstraint(+leftPos.value, +topPos.value, +size.value );
      }
    });

    /**
     * Форма добавления фильтра.
     * @type {HTMLFormElement}
     */
    var filterForm = document.forms['upload-filter'];


    /**
     * @type {HTMLImageElement}
     */
    var filterImage = filterForm.querySelector('.filter-image-preview');

    /**
     * @type {HTMLElement}
     */
    var uploadMessage = document.querySelector('.upload-message');

    /**
     * @param {Action} action
     * @param {string=} message
     * @return {Element}
     */
    var showMessage = function(action, message) {
      var isError = false;

      switch (action) {
        case Action.UPLOADING:
          message = message || 'Кексограмим&hellip;';
          break;

        case Action.ERROR:
          isError = true;
          message = message || 'Неподдерживаемый формат файла<br> <a href="' + document.location + '">Попробовать еще раз</a>.';
          break;
      }

      uploadMessage.querySelector('.upload-message-container').innerHTML = message;
      uploadMessage.classList.remove('invisible');
      uploadMessage.classList.toggle('upload-message-error', isError);
      return uploadMessage;
    };

    var hideMessage = function() {
      uploadMessage.classList.add('invisible');
    };

    /**
     * Обработчик изменения изображения в форме загрузки. Если загруженный
     * файл является изображением, считывается исходник картинки, создается
     * Resizer с загруженной картинкой, добавляется в форму кадрирования
     * и показывается форма кадрирования.
     * @param {Event} evt
     */

    uploadForm.addEventListener('change', function(evt) {
      imageSet = [];
      submitBtn.disabled = false;
      resizeForm.elements.x.value = null;
      resizeForm.elements.y.value = null;
      resizeForm.elements.size.value = null;

      var element = evt.target;
      if (element.id === 'upload-file') {
          // Проверка типа загружаемого файла, тип должен быть изображением
          // одного из форматов: JPEG, PNG, GIF или SVG.
        if (fileRegExp.test(element.files[0].type)) {
          var fileReader = new FileReader();

          showMessage(Action.UPLOADING);

          fileReader.addEventListener('load', function() {
            cleanupResizer();
            currentResizer = new Resizer(fileReader.result);
            currentResizer.setElement(resizeForm);
            var imageWidth = currentResizer._image.naturalWidth;
            var imageHeight = currentResizer._image.naturalHeight;


            imageSet.push(imageWidth, imageHeight);
            uploadMessage.classList.add('invisible');
            uploadForm.classList.add('invisible');
            resizeForm.classList.remove('invisible');
            hideMessage();

          });

          fileReader.readAsDataURL(element.files[0]);
        } else {
            // Показ сообщения об ошибке, если формат загружаемого файла не поддерживается
          showMessage(Action.ERROR);
        }
      }
    });

    /**
     * Обработка сброса формы кадрирования. Возвращает в начальное состояние
     * и обновляет фон.
     * @param {Event} evt
     */
    document.body.addEventListener('reset', function(evt) {
      if (evt.target === resizeForm) {
        evt.preventDefault();
        cleanupResizer();
        updateBackground();

        resizeForm.classList.add('invisible');
        uploadForm.classList.remove('invisible');
      } else if (evt.target === filterForm) {
        evt.preventDefault();

        filterForm.classList.add('invisible');
        resizeForm.classList.remove('invisible');
      }
    });

    /**
     * Обработка отправки формы кадрирования. Если форма валидна, экспортирует
     * кропнутое изображение в форму добавления фильтра и показывает ее.
     * @param {Event} evt
     */

    document.body.addEventListener('submit', function(evt) {
      if (evt.target === resizeForm) {
        evt.preventDefault();
        if (resizeFormIsValid()) {
          var image = currentResizer.exportImage().src;

          var thumbnails = filterForm.querySelectorAll('.upload-filter-preview');
          for (var i = 0; i < thumbnails.length; i++) {
            thumbnails[i].style.backgroundImage = 'url(' + image + ')';
          }

          filterImage.src = image;
          filterForm['upload-filter'].value = window.Cookies.get('upload-filter');
          filterImage.className = 'filter-image-preview ' + 'filter-' + window.Cookies.get('upload-filter');

          resizeForm.classList.add('invisible');
          filterForm.classList.remove('invisible');
        }
      } else if (evt.target === filterForm) {
        evt.preventDefault();

        cleanupResizer();
        updateBackground();

        filterForm.classList.add('invisible');
        uploadForm.classList.remove('invisible');
      }
    });

    /**
     * Обработчик изменения фильтра. Добавляет класс из filterMap соответствующий
     * выбранному значению в форме.
     */
    var selectedFilter;

    filterForm.addEventListener('change', function() {
      if (!filterMap) {
        // Ленивая инициализация. Объект не создается до тех пор, пока
        // не понадобится прочитать его в первый раз, а после этого запоминается
        // навсегда.
        filterMap = {
          'none': 'filter-none',
          'chrome': 'filter-chrome',
          'sepia': 'filter-sepia',
          'marvin': 'filter-marvin'
        };
      }

      selectedFilter = [].filter.call(filterForm['upload-filter'], function(item) {
        return item.checked;
      })[0].value;

      window.Cookies.set('upload-filter', '' + selectedFilter + '', { expires: expireDate()});

      // Класс перезаписывается, а не обновляется через classList потому что нужно
      // убрать предыдущий примененный класс. Для этого нужно или запоминать его
      // состояние или просто перезаписывать.
      filterImage.className = 'filter-image-preview ' + filterMap[selectedFilter];
    });

    // cleanupResizer();

    updateBackground();
  };


});
