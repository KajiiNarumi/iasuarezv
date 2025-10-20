---
layout: post
author:
  name: "I. Antoine Suárez V."
categories: [Tecnologia]
tags: [entornos, escritorio, GTK, QT, GNU/Linux, comparativa]
title: "Entornos de Escritorio"
date: 2020-05-21
image:
  path: /images/2020-05-21-entornos-de-escritorio.jpg
  caption: "Múltiples monitores con distintas distribuciones Linux"
image_alt: "Varios escritorios Linux distintos mostrados en múltiples monitores"
excerpt: "¿Qué es un entorno de escritorio y por qué importa al elegir una distribución GNU/Linux? En este artículo exploramos tecnologías como GTK y QT, la rivalidad KDE vs. Gnome, y el papel de XFCE y los entornos híbridos."
---


Como ya he mencionado antes, para los usuarios nuevos es abrumador ver tantas distribuciones, pero para poder entender cuál elegir debemos de tener en cuenta algunos aspectos y en esta ocasión vamos hablar sobre los entornos de escritorio…  
Bueno, antes de empezar esta saga de entradas vamos por lo primero y aunque es algo que ya mencioné en el post de “[Distribucion Para CIber Linux](https://draft.blogger.com/#)” Gnu / linux es todo un ecosistema de paquetes y herramientas que al combinar algunas de ellas crean una distribución, a pesar de que hay cientos de ellas y hablar de cada una sería una tarea interminable, podemos enfocarnos a ciertas categorías y así poder entender gran parte de todo este gran ecosistema, también no quiero entrar a muchos detalles técnicos, ya que esta entrada no pretende ser un artículo de estudio, mas bien esta orientado a que todo el mundo pueda entender el por qué de tantos entornos y lo más importante cómo saber cuál elegir.

Dicho esto empecemos…

### El entorno de escritorio

Es la interfaz gráfica con la que vamos a interactuar, como lo es el aspecto y comportamiento de las aplicaciones, ventanas, notificaciones, etc., también son las aplicaciones que se usan para ver los archivos, configurar el acceso a Internet, iconos, punteros del ratón y así respectivamente. En pocas palabras podemos decir que es el aspecto y las aplicaciones de herramientas que se necesitan para usar el sistema operativo.

Podemos dividir los entornos en dos tipos de tecnologías, GTK que podríamos compararlo como un vehículo de combustión interna, y QT que podría ser un vehículo eléctrico. Esto es todo lo que necesitaban saber <<fin>> (budum pust). Aunque para entender a fondo la diferencia entre estas librerías sería necesario hablar de lenguaje de programación y más cosas, solo vamos a recalcar que aunque son dos tecnologías que pueden interactuar entre ellas, cada una tiene objetivos distintos y podemos encontrar aplicaciones diseñadas para su uso exclusivo.

### GTK & QT

Ahora ¿qué tiene que ver eso con el entorno de escritorio? bueno es simple, hay muchos entornos de escritorios, en general yo he probado aproximadamente unos 15 o más y sé que ha de haber muchos que ni siquiera se que existen, pero ahora sabemos que tenemos dos tecnologías y eso nos genera dos entornos principales, Gnome que usa tecnología GTK y KDE Plasma que usa la tecnología QT.  
Tomando eso en cuenta ya tenemos una base de la cual partir, y la pregunta mas lógica sería ¿por qué tomar como partida estos dos entornos? y la respuesta es un poco fácil, estos fueron de los primeros entornos en aparecer en el mundo de GNU Linux, pero lo mas importante es que ellos han desarrollado una serie de aplicaciones-herramientas que gran parte del resto de entornos usan para operar.

### KDE y Gnome, los amigos rivales

Ambas comunidades a lo largo de sus historias han hecho grandes avances y a su vez han obtenido un gran número de aliados y por ende han generado un grupo de “fanboys” sin embargo esta rivalidad que hay entre ellos nos genera un mundo de posibilidades, ya que ambas comunidades han desarrollado sus propias herramientas por un lado tenemos las [KDE Apps](https://apps.kde.org/) y por otro las [Gnome Apps](https://wiki.gnome.org/Apps).

Y aunque para muchos esto no tendría gran relevancia, en lo personal siento que es un punto muy importante a considerar, y les pondré el caso del lector de PDF Evince que está presente en Gnome el cual es práctico, simple y funcional si se instala en KDE Plasma instala una serie de paquetes que necesita para poder funcionar y aunque la aplicación es demasiado ligera al no estar en su entorno nativo hace que sea una instalación un poco más pesada de lo que realmente es y de misma forma pasa con Okular que es nativa de KDE, al instalarse en Gnome instala muchísimas cosas que jamás se usaran, más que para poder abrir esa aplicación. De aquí la importancia de saber si el entorno que usamos es GTK o QT.

### Y XFCE?

XFCE el entorno libre de colesterol, este entorno es un tanto peculiar, ya que es un entorno GTK sin embargo su comunidad ha desarrollado también una lista de aplicaciones y plugins un poco extensa, incluso [XFCE te sugiere usar sus aplicaciones](https://wiki.xfce.org/es/recommendedapps) y aunque cada escritorio ha desarrollado una serie apps para su propio entorno desde mi punto de vista estos tres brindan la posibilidad de trabajar únicamente con sus propias herramientas nativas, sin tener que estar pidiendo prestadas herramientas de otros entornos.

Sin embargo XFCE al ser GTK no infla tanto el instalar aplicaciones de GNOME, ya que ambos hablan el mismo lenguaje y tienen las mismas librerías, sería como si Gnome y XFCE fueran hermanos de la misma talla, donde prestarse una prenda resultara más fácil mientras que compartirla con su primo KDE plasma al ser de una talla distinta tendrían que hacerle ajustes a dicha prenda.

### Híbridos

Por último tenemos los entornos híbridos que son entornos que usan tanto tecnología GTK como QT, así que instalar las apps de Gnome o de KDE no genera ninguna inflación en el sistema, ya que poseen gran parte de ambas librerías y habrá algunas apps que pesaran un poco mas que en su entorno aunque no sera tanto.

Me gustaría hacer una lista detallada de todos los entornos y poner en qué tecnología se basan, pero realmente me falta información de todos sin embargo de los más populares podemos encontrar por parte de QT a KDE Plasma y versiones anteriores, también esta LXQT y el último que conozco es Hawaii, por parte de GTK tenemos más opciones, Gnome, XFCE, LXDE, Mate, Cinnamon, Pantheon… mientras que en híbridos podemos encontrar Budgie, Deepin o Unity 8, claro hay muchos más pero con eso ya nos damos una idea…

### Conclusión:

Tenemos dos tecnologías, QT siendo abanderada por KDE y GTK siendo respaldada por Gnome. Cada vez mas entornos usan en dualidad ambas tecnologías creando entornos híbridos como Budgie o Deepin y también hay mas entornos usando tecnologías GTK como XFCE o QT como LXQT.

Si quieres ver como lucen algunos de ellos puedes ver el siguiente video.

{% include youtube.html id="jS8cDbbhkgo" %}

_Originally published at [https://codigokajiinarumi.blogspot.com](https://codigokajiinarumi.blogspot.com/2020/05/entornos-de-escritorio.html) on May 21, 2020._
