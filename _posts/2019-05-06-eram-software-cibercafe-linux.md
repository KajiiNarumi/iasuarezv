---
layout: post
author:
  name: "I. Antoine Suárez V."
categories: [Tecnologia]
tags: [Linux, ERAM, software libre, cibercafé, scripts, gestión remota]
title: "ERAM software para cibercafé Linux"
date: 2019-05-06
image:
  path: /images/2019-05-06-eram-software-cibercafe-linux.jpg
  caption: "Logo de ERAM, letras sobre fondo negro"
image_alt: "Logo del software ERAM en fondo negro"
excerpt: "ERAM es un script de gestión remota para cibercafés con GNU/Linux que permite bloquear equipos, controlar tiempo, reiniciar máquinas, actualizar sistemas y más. Aquí explicamos cómo funciona."
---


Ya hemos hablado sobre los equipos y distribuciones es hora de hablar un poco sobre ciertas configuraciones.

Quiero aclarar que esta es una configuración que nos ha sido útil, pero pueden buscar y probar alguna otra, el limite es la imaginación.

Nosotros nos hemos decidido usar Ubuntu lts en el servidor y saltamos entre versiones X.04 de Ubuntu, y contamos con 2 tipos de equipos, los Gamer y los normales.

![Menú1](/images/2019-05-06-eram-software-cibercafe-linux1.jpg)

Este es un script que desarrolle con el apoyo del grupo de [GNU/Linux](https://t.me/GNULinuxGrupo) en Telegram y salio por la necesidad de lograr controlar los equipos de forma remota, Empezó como un script para Encender, Reiniciar y Apagar los equipos de forma remota, pero fui agregando mas opciones que termine agregando la “M” de Mánager.

**Bloquear y desbloquear equipos:**

Lo pueden conseguir desde mi repositorio de [GitHub](https://github.com/KajiiNarumi/ERAM), aquí he agregado las instrucciones de como instalarlo y usarlo, de todas formas explicare un poco sobre las funciones que tiene:

**Contador, Consumidos y últimos:**

![Menú2](/images/2019-05-06-eram-software-cibercafe-linux2.jpg)
![Menú3](/images/2019-05-06-eram-software-cibercafe-linux3.jpg)

Podremos bloquear el teclado y ratón de forma remota, así como elegir si queremos poner una imagen o serie de imágenes en la pantalla mientras esta en reposo, o en su defecto podemos elegir poner una serie de videos (sobre todo para hacer publicidad de servicios, ofertas, juegos, etc.) o cualquier cosa que nos interese mostrar mientras esta bloqueada.

Estas opciones aun fase beta, con estas funciones trato de poder poner temporizador en caso que pidan cierto tiempo especifico (he pensado cambiar el nombre de contador a temporizador) este mandaría un mensaje tanto en el servidor como al cliente para notificar que el tiempo esta por agotarse y da la oportunidad de agregar tiempo extra.

![Menú4](/images/2019-05-06-eram-software-cibercafe-linux4.jpg)

Por otra parte el consumido muestra cuanto tiempo lleva consumido algún equipo para tener un conteo o una idea del importe recaudado hasta el momento mientras que últimos muestra cual fue el último cobro del equipo seleccionado.

En este apartado abre de forma rápida la cola de impresión y te dará acceso para poder cambiar las configuraciones de la o las impresoras que tengas en red así como poder acceder al editor de conexiones de red.

Este era el script inicial y termino quedando como una opción secundaria, como ya he dicho aquí podremos encender, reiniciar y apagar los equipos remotamente, podremos cerrar la sesión limitar el ancho de banda de los clientes (sobre todo para cuando es hora pico y los usuarios empiezan a descargar y dejan sin ancho de banda al resto de los equipos) así como una opción para quitar esa restricción

Podremos enviar un archivo a un solo clic desde el servidor al cliente o extraerlo sea cual sea la necesidad.

También podemos limpiar la carpeta de descarga, música, documentos, escritorio… Limpiar la papelera de reciclaje así podemos tener el equipo siempre limpio sin comprometer la información de cada cliente y hablando de mantenimiento también he agregado la opción de actualizar el sistema de los clientes de forma remota, (en Linux es muy importante mantenernos al día, así podremos estar mas seguros)

En este video (aunque un poco viejo) muestro como funciona el script, y como es que lo pueden emplear en sus negocios.

{% include youtube.html id="YO8FVR79kck" %}

Espero les sea útil.

_Originally published at [https://codigokajiinarumi.blogspot.com](https://codigokajiinarumi.blogspot.com/2019/05/eram-software-para-cibercafe-linux.html) on May 6, 2019._
