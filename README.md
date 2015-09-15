# test-task
test task about developing music app

В этой ветке хранится результат работы над тестовым заданием по созданию музыкального приложения.

Резюме задания:
"Разработать веб-приложение "Музыкальный каталог". В нём можно пополнять свою коллекцию музыкальных альбомов, смотреть подробную информацию о них и давать им свой личный рейтинг."

Требования к приложению:

1. Приложение должно быть реализовано в виде одностраничного приложения. Можно использовать любой фреймворк или придумать свой механизм на основе History API.
2. Приложение должно состоять из трёх экранов:
  1) Собственно каталог с возможностью фильтрации, сортировки и добавления.
  2) Страница подробной информации об альбоме, включая обложку.
  3) Страница статистики с возможностью увидеть общее время звучания музыки и распределение по жанрам.
3. Сведения об альбомах получать с сервиса Discogs.com.
4. Коллекцию хранить в localStorage.

В результате имеем приложение, куда можно добавить или удалить трек со своим названием и именем автора:
  Хранение информации о треке реализовано при помощи записи json объектов в localStorage. 
  Фаил трека добавляется на сервер при помощи post запроса из формы.
  Удаляется с сервера при помощи XmlHTttpRequest запроса с методом post.
Осуществляется проигрывание данного трека, и подсчет всего времени воспроизведения музыки через объект Audio()
Осущестляется вывод рандомных картинок сервиса Unsplash, совместно с названием композиции и автором (вместо расширенной информации об авторе)
С точки зрения всертки выравнены все компоненты, верстка не разъезжается в зависимости от экрана

Что не получилось:
1) Не совсем удалось разобратся с api сервиса discogs для получения информации об альбоме. 
Curl-ом инф-ю получить можно в остальном необходимо реализовывать клиент для работы с данным api и регистрировать приложение для работы с ним. 
Есть готовые клиенты на python и php, но все-равно для меня было не достаточно времени, чтобы разобратся как их прикрутить к текущему проекту.

2) столкнулся с проблемой сортировки/фильтрации объектов. Элементы localStorage представляют собой словарь(или объект) сортировать который не представляется возможным. 
По-этому сортировка должна производится постфактум по событию уже после вывода всех элементов на экран. 
Реализовать не успел так как были более приоритетные задачи касаемые добавления элементов и их проигрывания.
На вскидку задача не очень сложная, но потрудится придется.

3)Реализация жанров
Задача простая, но не хватило времени.

4) Не смог обнаружить как можно получить доступ к информации о названии трека, авторе, обложке(если есть), самого mp3 файла.
Она содержится в самом файле, но не нашел ни на стороне клиента (js), ни сервера(php) как к ней получить доступ (google, к сожалению, тоже мало что может об этом сказать).
Без этого получилась реализация с вводом названия трека и имени автора.

В целом о проделанной работе:
Задание было очень интересным. Т.к. большинство технологии были для меня абсолютно новыми, пришлось очень много усилий приложить для поиска, внедрения и отладки кода для получения вменяемого результата.