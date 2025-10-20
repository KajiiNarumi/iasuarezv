---
layout: post
author:
  name: "I. Antoine Suárez V."
categories: [Tecnologia]
tags: [ISO, checksum, seguridad, verificación, descargas seguras]
title: "¿Comprobar la Integridad de una Imagen ISO?"
date: 2024-05-30
image:
  path: /images/2024-05-30-comprobar-integridad-imagen-iso.jpg
  caption: "Imagen de una huella digital estilo steampunk"
image_alt: "Huella digital mecánica con engranajes al estilo steampunk"
excerpt: "¿Descargaste una imagen ISO? Aprende a verificar su integridad con métodos como SHA256 para evitar errores o riesgos de seguridad en tus instalaciones."
---


### Verifica tus descargas antes de instalarlas

Cada vez que descargamos un nuevo sistema operativo, ya sea para probar o para usarlo, es importante corroborar que esté se haya descargado correctamente. Pero ¿sabías que muchas aplicaciones también tienen sus métodos de verificación?

Bueno, cuando utilizamos tiendas de aplicaciones como Gnome Store, Discover, Synaptic… Rara la vez vamos a comprobar si nuestra aplicación se descargó correctamente.

Este paso es más habitual cuando descargas un sistema operativo, ya sea una distribución Linux o incluso Windows. También es común hacerlo con algunos paquetes como los Appimages.

### ¿Por qué debo verificar la descarga?

Bueno, es fácil, para poder estar seguro de que se descargó correctamente y tu imagen va a funcionar correctamente. Imagina que estás probando una distribución Linux llamada Fedora, la descargaste, creaste un USB boot y no te deja instalar, te salen unos errores raros y crees que no se creó bien la USB boot y vuelves a hacerlo, pero vuelve a pasar lo mismo y buscas otra herramienta para crear tu USB boot y te vuelve a pasar… Al final decides volver a descargar la imagen y listo está vez queda en el primer intento. Pues aunque no lo creas es algo muy común que mencionan en grupos de Linux en Telegram. Lo peor viene cuando si les deja instalar, pero tras iniciar les sale múltiples errores… Todo ese tiempo perdido se puede ahorrar con una simple verificación que no toma más de 1 minuto.

### No te convence, aquí te doy otro caso real.

Hace unos años hackearon los servidores de Linux Mint y modificaron la imagen ISO de descarga. Durante un tiempo los usuarios estuvieron descargando una ISO modificada con puertas traseras, y aunque no duró mucho por qué un usuario que verificó la ISO comprobó que no era la original, y lo reportó, lo cierto es que muchos usuarios se vieron afectados… puedes leer el articulo [¡Cuidado con los ISO pirateados si descargó Linux Mint el 20 de febrero!](https://blog.linuxmint.com/?p=2994)

El verificar no solo garantiza que tengas la copia original, también el funcionamiento y es el sello de garantía del software que usas…

### Bueno, ahora que ya sabes por qué verificar ¿Cómo se hace?

Es superfácil en primer lugar, recuerda siempre descargar de sitios oficiales, allí verás tanto el enlace de descarga como la clave de verificación.

Cómo no quiero ser muy técnico, solo te comento, existen diferentes protocolos, entre los más comunes son:

- MD5
    
- SHA-1
    
- SHA-2
    
- SHA-3
    
- SHA-224
    
- SHA-256
    
- SHA-384
    
- SHA-512
    
- SHA3–224
    
- SHA3–256
    
- SHA3–384
    
- SHA3–512
    

entre algunos otros y en muchas ocasiones veremos qué el archivo tiene más de un método de verificación, sin embargo, no es necesario comprobar todos, basta con comprobar el que más te guste y listo (en mi caso el que suelo verificar es el SHA256)

### ¿Cómo Comprobar la Integridad en Windows?

Como dicen que una imagen vale mas que mil palabras te dejo este mini video donde te lo demuestro súper fácil

Siempre descarga los archivos en la web oficial y busca el archivo de verificación. Recuerda comprobar que ambas claves sean idénticas y listo

### ¿Cómo Comprobar la Integridad en Linux?

Puedes ver el siguiente vídeo para apoyarte visualmente…

{% include youtube.html id="dAhEty8gf8o" %}

{% include youtube.html id="w5rzNBx7eNU" %}
