---
layout: post
author:
  name: "I. Antoine Suárez V."
categories: [Tecnologia]
tags: [distribuciones, experiencia, GNU/Linux, ciber, Unity, Gnome, Ubuntu]
title: "Elección de distribución para ciber Linux “Anécdota”"
date: 2019-05-21
image:
  path: /images/2019-05-21-eleccion-de-distribucion-para-ciber-linux.jpg
  caption: "Logo Freekeex en fondo negro"
image_alt: "Logotipo Freekeex sobre fondo oscuro"
excerpt: "¿Qué distribución de Linux elegir para un cibercafé? Aquí cuento nuestra experiencia migrando entre distros como Mint, Ubuntu, Zorin, Elementary y más, hasta llegar a un método inesperado: dejar que..."
---


Cuando se tomó la decisión de cambiar el sistema operativo del Ciber entramos a Ubuntu 12,04, yo ya tenía tiempo usando este sistema, pero empecé a buscar otras distribuciones que tuvieran una apariencia más al estilo Windows para los usuarios.

Prontamente cambiamos a Linux Mint con Cinnamon, los primeros días se veía muy bien e iba bien, solo basto una semana para que pareciera ser una pesadilla. Los equipos pasaron de encender en un minuto a tardar casi 7 minutos. No fue espontáneo cada día parecía que le costaba más y más al sistema arrancar. No podíamos seguir así, volvimos a instalar Mint, buscamos configuraciones y formas de optimizar y al pasar otra semana, lo mismo, un sistema lento que a cada rato se colgaba.

Regresamos a Ubuntu Unity y a pesar de que no iba como ahora va, la verdad iba mucho mejor que en Mint, duramos así aproximadamente 3 meses, un mantenimiento muy desatendido lo cual para cuando hay que darle mantenimiento a múltiples equipos eso es genial, durante ese tiempo en un equipo estuve probando distribuciones como, Elementary OS, Zorin OS, PearOS (discontinuada), Arch con Gnome, Debian Gnome…

Al final les estuvimos preguntando a los usuarios que les parecían a primer vista, muchos decían que no les gustaba como se veía (caso de Gnome) o que eran complicados usarlo (con Elementary Os y PearOs), el único que les gusto y que no se quejaron fue con Zorin Os, el cual tomé la decisión de ponerlo en dos equipos para que todos los usuarios lo probaran y nos dijeran si les gustaba… Tardé más en instalarlo que en lo que decidí quitarlo, en aquel tiempo Zorin Os usaba AWM como panel el cual era más inestable que las emociones de un bipolar (budum Psss) la pequeña semana que estuvo generó tantos fallos que no lo volvimos a mirar hasta hace un par de meses.

Seguimos buscando más distros, basadas en Ubuntu o Debian y a pesar de que ya habíamos probado con Arch, tomamos la decisión de por el tiempo de instalación y la complejidad que radica solucionar conflictos sin conocimientos, mejor la íbamos a descartar (claro, no puedo estar 24 horas del día, ni estar desde las 8 am hasta las 10 pm) recuerdo haber pasado entre distintas distros y probar distintos entornos de cada una que lo ofreciera, al final no encontrábamos ninguno que nos llenara, y nosotros continuábamos con Ubuntu Unity hasta la salida de Ubuntu 14.04, el cual trajo un Unity los primeros meses muy malo, fue cuando decidimos migrar a la rama de Arch.

Al inicio probamos Antergos, pero resulta que este no se instalaba, aclaro que los equipos eran APU AMD y aquí estaba el problema, al parecer no tenían buena compatibilidad, así que sin poder probar como iba Antergos, nos fuimos por Manjaro KDE, este duró aproximadamente como uno o dos meses por mucho, los clientes se perdían constantemente, a pesar de que tenía un aspecto muy Windows, los clientes todo el tiempo nos tenían en jaque. Así que teníamos que cambiar, Manjaro XFCE no era tan vistoso como lo era Unity o KDE, así que ni lo volteamos a ver y tomamos la elección de probar Gnome, primero fue con Ubuntu y cometimos un pequeño gran error… Lo llenamos de tantas exenciones que a cada rato se reiniciaba la interfaz.

Así que tiramos la toalla y regresamos a Windows, “Nah”, no es cierto, vale nos surgió una pregunta, Si los clientes son quienes las usan ¿Por qué no dejar que ellos elijan el sistema operativo? La respuesta fue fácil, si nosotros que hemos estado meses enteros investigando, comparando y visitando foros, blogs, noticias, y todo tipo de fuentes en todo internet no teníamos ni idea, ellos que apenas sabían de qué Linux existía ¿cómo iban a poder elegirlo?

Sin embargo, ellos podían elegir la interfaz, así que tomamos la distro que más nos había funcionado (Ubuntu) y descargamos casi todas las versiones, Ubuntu Unity, Ubuntu Gnome, Kubuntu, Xubuntu y Lubuntu (quiero aclarar que por algún motivo decidimos no agregar Ubuntu Mate, creo que esa distro aún no estaba como oficial.)

Si quieres saber cual fue el resultado, no te pierdas el siguiente post. Donde detallaré como fue que lo implementamos y cuales fueron los resultados.

> _Actualización 2021: la segunda parte la escribí el 14/05/2020 en un artículo por separado, pero en esta migración decidí anexarla como continuidad de este artículo._

Continuemos con la historia de como elegimos el entorno gráfico de los equipos clientes, si aún no lees la primera parte puedes hacerlo en este enlace. Antes de empezar quiero aclarar que esto ya tiene bastantes años, aún existía Ubuntu Unity y parecía que tenía grandes planes para este entorno, ya que se estaba hablando de Unity 8 y el gestor MIR…

El día que implementamos la encuesta fue un fin de semana, ya que solíamos abrir más tarde que entre semana, un día antes después de la jornada laboral me quedé preparando los equipos, decidí usar solo 3 equipos para hacer la prueba. Mi primer idea fue instalar Ubuntu con Unity y sobre ese instalar el resto de entornos para que fuera más fácil y no tener que hacer particiones, pero decidí no hacerlo dado que al instalar varios entornos las aplicaciones nativas de cada uno de ellos se mezclan y algunos iban a terminar abriendo Dolphin en el entorno de Xubuntu o de Gnome…

Así bien, lo que hice fue hacer una partición por cada uno de los entornos que probamos, en todas los sabores hicimos un full update, y los dejamos listos con las aplicaciones que solíamos instalar, vlc, libre office, Chrome, Steam (con el juego de iron snout), etc. Al final solo instalamos Ubuntu Unity, Ubuntu Gnome, kubuntu y Xubuntu.

En Unity, solo retocamos un poco el dash que por defecto venía muy grande, pusimos el wallpaper con el logo del ciber y pusimos en favoritos las aplicaciones de siempre, las 3 principales de libre office, Firefox, Chrome, archivos y Steam. En Gnome solo modificamos el wallpaper y agregamos en las ventanas los botones de cerrar y minimizar que por defecto no los traía. En Kubuntu igual fueron los favoritos el wallpaper y cambiamos la caja de aplicaciones que trae por defecto por la alternativa. Por último en Xubuntu lo que hicimos fue bajar el panel, agregar las apps favoritas y el wallpaper.

### El cuestionario que se realizó fue algo como esto:

- Completa las siguientes tareas y contesta las siguientes preguntas ¿te gusta el aspecto visual que tiene?
    
- Abre el navegador web y crea un documento de texto. ¿Te resulto fácil encontrar las aplicaciones?
    
- ¿Abrieron rápido las aplicaciones?
    
- En los próximos 5 minutos usa el equipo como normalmente lo harías ¿cuál fue tu experiencia?
    
- ¿Algún comentario que quieras dejar?
    

Durante el tiempo de evaluación se dejó a los usuarios completamente a su suerte, y solo interferimos para poder cambiar de partición, al final le realizamos el cuestionario a 35 personas distintas de diferentes edades.

En la actualidad ya no cuento con el acceso a los resultados exactos, pero si recuerdo que Ubuntu Unity les agradó mucho, fue el que les gustó a casi todos los encuestados, por como se veía visualmente y no tuvieron problemas con el acceso a las aplicaciones, sin contar que tuvieron una sensación de que tardaba muy poco en iniciar las aplicaciones, en realidad en todos los aspectos salió ganando.

El segundo que más les gustó en aspecto fue Gnome, pero se les hizo muy difícil encontrar las aplicaciones, de hecho en varias ocasiones nos pidieron ayuda para poder abrir el navegador y la ofimática. En cuanto a Kubuntu y Xubuntu no les gustó tanto el aspecto y en el caso de Kubuntu decían que sintieron un retraso a la hora de abrir las apps (recuerdo haber cronometrado y era el que más rápido abría).

En cuanto a los comentarios fue sorprendente lo que dejaron. En el cuestionario de Unity y Gnome decían cosas como…

> _- Si es un ciber diferente me gusta que se ve diferente…_

> _- El aspecto se ve muy actualizado…_

> _- Parecen equipos del futuro…_

> _- El aspecto es muy elegante…_

> _-Encienden super rápido…_

En Kubuntu también hicieron comentarios similares, pero fueron en menor número, la mayoría solo decía que se veía bonito pero era lento. Y en cuanto a Xubuntu algunos dijeron que parecía un Windows un poco viejo.

### Conclusión

En la actualidad el aspecto gráfico de Xubuntu ya no es tan malo, de hecho con la actualización que tuvo se ve muy lindo, pero aún queda por debajo del resto de sabores y más con todos los sabores que se han agregado a la familia, Kubuntu al día de hoy la velocidad que ofrece es muy notoria en comparación a la de aquel tiempo, Unity ya no es un entorno oficial, Gnome ahora es el entorno oficial y el aspecto es muy similar al de Unity en aquel tiempo. Pero sin duda alguna a la mayoría de los usuarios les gusta usar cosas diferentes y el ir al ciber puede ser algo común o se puede crear una experiencia agradable al usuario para que quiera regresar.

_Originally published at [https://codigokajiinarumi.blogspot.com](https://codigokajiinarumi.blogspot.com/2019/05/anecdota-eleccion-de-distribucion-para.html) on May 21, 2019._
