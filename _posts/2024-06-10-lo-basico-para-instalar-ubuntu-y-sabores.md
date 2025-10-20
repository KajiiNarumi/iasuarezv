---
layout: post
author:
  name: "I. Antoine Suárez V."
categories: [Tecnologia]
tags: [Ubuntu, instalación, tutorial, Linux, particiones, Windows, USB boot]
title: "Lo Básico para Instalar Ubuntu y Sabores"
date: 2024-06-10
image:
  path: /images/2024-06-10-lo-basico-para-instalar-ubuntu-y-sabores.jpg
  caption: "Pingüino tipo hacker con muchos monitores con terminal de comandos"
image_alt: "Pingüino estilo hacker rodeado de múltiples monitores con terminales de comandos"
excerpt: "Serie completa para aprender a verificar imágenes, crear USB boot, instalar Ubuntu y sus sabores, y gestionar particiones y sistemas operativos coexistentes."
---


Este post es un complemento de los videos de mi canal así que espero te sea útil.

### Verificación de imágenes de sistema.

Recuerda que siempre tienes que descargar las imágenes del sistema operativo desde la página oficial, ya que muchas personas pueden modificar y agregar software malintencionado, de hecho hace un par de años Linux Mint tuvo un problema con sus servidores donde alojaban sus imágenes de descarga cambiando las imágenes oficiales por unas modificadas y aunque actuaron rápido y quitaron las imágenes modificadas para poner las originales, esto muestra que no podemos fiarnos incluso de las páginas oficiales si quieres saber más puedes leer la nota oficial [Beware of hacked ISOs if you downloaded Linux Mint on February 20th!](https://blog.linuxmint.com/?p=2994).

Por tal motivo se me hizo prioridad crear 2 videos para poder verificar las imágenes de sistema, uno es para poder verificar desde Windows 10 y el otro desde cualquier distribución Linux. También en ocasiones por problemas de conexión o algún error en el disco las imágenes que se descargan no están del todo bien, y llegan a generar problemas a la hora de instalar, así puedo mostrar lo fácil que es poder verificar la integridad y poder evitar cualquier susto.

{% include youtube.html id="w5rzNBx7eNU" %}
{% include youtube.html id="dAhEty8gf8o" %}

### Creación de USB Boot.

Una vez que ya tenemos las imágenes del sistema y hemos comprobado la integridad de los archivos, es hora de crear una USB para poder usarlos, muchas personas creen que solo con copiar los archivos ya es suficiente y aunque para muchas personas que están en el mundo de la informática es una obviedad el proceso de quemado, hay muchísima gente que desconoce este proceso, es normal y natural, nadie nace sabiendo y ellos aunque luego suelen burlarse de las personas que están aprendiendo se les olvida que ellos también tuvieron una curva de aprendizaje.

Así pues he creado una serie de videos para quemar las imágenes ISO en una USB, el video que hice para Windows da la posibilidad de agregar varios sistemas operativos a una misma USB, ya sea para probar varios sistemas o por si tienen en mente usar la USB como una herramienta de instalación. Por otro lado hice otros videos para realizar el mismo procesos desde Linux, usando diversos métodos de quemado en el primero muestro como se puede hacer desde cualquier distribución Linux usando la terminal y sin necesidad de instalar ningún software para ello, en los otros como usar herramientas distintas para conseguir el mismo resultado, en uno es usando la herramienta que trae integrada Ubuntu y que resulta muy simple y sencillo incluso deja la USB como almacenamiento por si quieren usar el resto de la USB para guardar archivos.

Mientras que el otro método se usa para poder meter más de un sistema operativo como lo hacemos con Windows dando la posibilidad de personalizar un poco el aspecto y las opciones.

{% include youtube.html id="qmTnBfh8EhE" %}
{% include youtube.html id="hBkjTk6pxhI" %}
{% include youtube.html id="_FwDbjsPlJM" %}
{% include youtube.html id="ONvPJ2EDKcQ" %}


### Ubuntu y sus sabores.

Aquí empecé con el video que tenia en mente como inicio de la serie, donde muestro los diferentes sabores que hay en el ecosistema Ubuntu, tomando en cuenta Ubuntu, Kubuntu, Xubuntu, Lubuntu, Ubuntu Kylin, Ubuntu Mate y Ubuntu Budgie así como 2 de los Remix que también están en desarrollo Ubuntu Cinnamon y UbuntuDDE, aunque no quise agregar Ubuntu Studio ni Ubuntu Unity, ya que tengo en mente hacer un video hablando de ellos por separado.

{% include youtube.html id="jS8cDbbhkgo" %}

### Instalación de Windows 10.

Este video no estaba contemplado aún para esta serie, pero decidí agregarlo para poder crear ejemplos de distintos métodos de instalación y así poder abordar casos en los que queremos instalar Ubuntu junto a Windows o incluso cuando queremos instalar Windows cuando ya tenemos un Linux instalado en el disco. Y aunque el tema principal de mi canal es de Ubuntu también quiero meter videos de otros sistemas operativos como Windows.

{% include youtube.html id="_SxJF854x-o" %}

### Instalación de Ubuntu y sabores.

Bueno ya casi para terminar hice toda una serie de videos sobre la instalación de Ubuntu, empezando por un video con pantalla dividida mostrando el paso a paso de la instalación de los 9 sabores de Ubuntu y posteriormente subí la instalación de cada sabor independiente.

{% include youtube.html id="INs3CHu-IbM" %}
{% include youtube.html id="kKLuQBXLsyg" %}

### Particiones.

Antes de continuar con la siguiente parte de las instalaciones es importante saber o mínimo tener un poco de conocimiento de lo que son las particiones, así como saber los tipos sistemas de archivos que hay y cómo preparar nuestro disco para diversas instalaciones…

{% include youtube.html id="GMxELfiVREs" %}

### Instalación de Ubuntu y casos.

Ahora si continuamos con la instalación de Ubuntu pero en esta ocasión ya estamos haciendo uso de las particiones, también muestro como instalar Ubuntu cuando ya tenemos instalado Windows y de misma forma muestro como instalar Windows cuando ya esta instalado Ubuntu y como poder recuperar el GRUB para tener acceso a ambos sistemas operativos.

{% include youtube.html id="eJAzx61ZWfY" %}


### Eliminar Windows o Linux.

Ya para terminar esta saga quiero explicar como eliminar el sistema operativo compañero, en el caso de querer eliminar Windows como recuperar ese espacio que usaba y cómo hacer que el GRUB deje de reconocer Windows e inicie directamente a Ubuntu o cualquier Linux y de mismo caso contrario, si eliminamos Ubuntu como recuperar el MBR y recuperar el espacio que se nos ha liberado e integrarlo a la partición de Windows.

{% include youtube.html id="WNOj2EkHxbI" %}
{% include youtube.html id="Hgqn4_xfJrg" %}

Como he mencionado antes, esta serie está pensada para que cualquier persona con conocimientos básicos en computación logre Verificar una imagen de sistema, crear una USB Boot, instalar un sistema operativo y en dado caso eliminarlo. Y como bonus agregué un video de como configurar el tiempo de auto-inicio y opción por defecto del GRUB

{% include youtube.html id="mObXDwQhB0w" %}

Y pues nada, cualquier duda no dudes en contactarme, recuerda suscribirte a mi canal y seguir este blog, así como compartir este contenido, y sin mas por el momento yo me despido y nos vemos hasta la próxima ¡Chao!

[Play list Completa de tutoriales de linux](https://www.youtube.com/playlist?list=PLfyRETG_hY1AbUi8G4iflMdTKxX2Ml9dm)

_Originally published at [https://www.kajiinarumi.com](https://www.kajiinarumi.com/shell/lo-basico-para-instalar-ubuntu-y-sabores) on June 11, 2024._
