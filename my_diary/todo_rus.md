﻿1) сделать что-нибудь с imageUtils.js
2) возможно, слить его вместе с utils.js
3) сделать что-нибудь с utils.js
4) добавить демо moving, расшиярющее clicking возможностью двигать созданные шарики (задействует поиск объектов сцены, пересекающихся с лучом). Возможно, переключая кнопкой создание/двигание шариков.
5) создать демку-игру, в которой шарики будут сыпаться сверху, а игрок должен по ним щёлкать мышью. лопнутый шарик будет рассыпаться искорками. 
6) создать поддержку для particle_system не только постоянного излучения, как сейчас, определяемого числом частиц в секунду, но и дискретного. Дискретное только один раз испускает энное количество частиц, и всё. Это потребует переделки particle_system. Так что часть из свойств emitter станет бесполезной (такие как emission per second). 
7) создать излучатель частиц, который излучает их из заданной точки во все стороны (сферический излучатель - с центром, отличным от позиции самой системы частиц). Это нужно для демки-игры, описанной выше.
9) тогда лопнутые шарики будут запускать дискретное излучение, скажем 
ps.emitter.set_position ( sphere.world position )
ps.discrete_emission(10) 
10) добавить color_domain для particle_system. Он должен быть расширяемым и начинаться с constant color, затем random color, палитра с возможностью случайного выбора из нескольких цветов. 
11) добавить возможность двигать системы частиц в редакторе
12) создать раздвоенную сцену. у main_scene должны быть два сына - один содержит сцену, которая редактируется и сохраняется. второй - то, что необходимо для редактирования, всякие пучки осей, охватывающие сферы и коробки и проч. рендерится одним вызовом через main_scene.
13) подыскать функцию псевдослучайных целых чисел.
return Math.random() * (max - min) + min;
return Math.floor(Math.random() * (max - min + 1)) + min;
и прочее в том же духе даёт максимально узомбищный результат. 
14) добавить создание простеньких анимаций по таймеру - вращение, сжатие, позиция и т.п.
15) добавлени и настройка других объектов, кроме частиц
16) обкатка вычислений части на ГПУ, в том числе многопроходных вычислений. 
17) генерация вычислительных шейдеров для сложных настроек, созданных в редакторе
18) зачем мне все это? 

Есть много прекрасных редакторов и движков - редактор Three.js, хотя он и похож внутри на моток проволоки, есть Blender, Unreal, Unity, CryEngine. Какой смысл создавать редактор, который никому не будет нужен?