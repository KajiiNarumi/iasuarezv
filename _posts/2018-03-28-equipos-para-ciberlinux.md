---
layout: post
author:
  name: "I. Antoine Suárez V."
categories: [Tecnologia]
tags: [hardware, Linux, cibercafé, equipos, consejos]
title: "Cómo Elegir o Armar Equipos para CiberLinux"
date: 2018-03-28
image:
  path: /images/2018-03-28-equipos-para-ciberlinux.jpg
  caption: "Foto de Christian Wiediger en Unsplash"
image_alt: "Componentes de computadora sobre una mesa de trabajo"
excerpt: "Guía práctica y reflexiva sobre cómo seleccionar o armar computadoras económicas y funcionales para un cibercafé con GNU/Linux, basándose en experiencia real."
---


Este es un tema extremadamente controversial por muchas razones que vamos a explorar. Intentaré ser lo más neutral posible y basarme en mi experiencia.

Antes de comprar cualquier equipo, siempre, pero siempre, consideren la vida útil que les ofrecerá. Pueden gastar en un equipo bonito y caro, pero si solo les durará 2 o 3 años, será un dolor de cabeza en el futuro. Por otra parte, pueden adquirir equipos económicos que tal vez ya estén obsoletos. También pueden optar por equipos demasiado potentes y costosos, pero sin un seguro, puede ser una inversión peligrosa, ya que hay usuarios que no respetan los equipos y los tratan mal, y los ladrones también son una amenaza. Como consejo, es importante tomar un punto medio y que la balanza se incline hacia lo económico. Dicho esto, comencemos…

#### ¿Qué tipo de equipos comprar?

Existen varios tipos de ordenadores, pero los que no recomiendo para nada son los portátiles y los “Todo en Uno” (All in One) por los siguientes motivos:

- Son muy costosos, delicados, poco actualizables, tienen bajo rendimiento y son fáciles de robar. Estos equipos son la peor opción para un cibercafé ya que, si se dañan, el costo de reparación es extremadamente elevado.
    

En teoría, la única diferencia entre un Todo en Uno y un portátil es que el portátil trae una batería integrada y se dobla.

Por mi experiencia, es mejor armar los ordenadores por cuenta propia en lugar de comprarlos de una empresa, ya que esto reduce considerablemente el costo y permite ensamblar algo mejor con todos los componentes nuevos.

#### ¿Qué componentes voy a necesitar?

Antes de elegir qué componentes comprar, es importante saber para qué se van a usar. Si son clientes que solo van a imprimir algo rápido o buscar algo en Google Maps, o si son clientes habituales que van a usar Facebook o a jugar, ya que los jugadores son una excelente clientela. Puedes leer más sobre Videojuegos para cibercafé en mi artículo de Videojuegos.

Muchos dicen que la primera elección es el microprocesador, pero personalmente, lo primero a decidir es si se necesita una tarjeta gráfica o no. Si se instalarán juegos, lo mejor es usar una tarjeta gráfica. Hay dos opciones: gráficos dedicados o gráficos integrados. Por cuestiones económicas, los gráficos integrados son la mejor opción, aunque la calidad de los gráficos dedicados es superior.

#### Gráficos y Microprocesador

Para gráficos dedicados, una tarjeta <<Nvidia GT 730 puede ser suficiente. En cuestión de Radeon, no es tan recomendable, ya que se necesita una Radeon R9 o superior para poder usar los controladores de Radeon, y el costo es muy elevado.>> Actualización 2019: En la actualidad, los controladores de AMD en Linux han mejorado mucho y los videojuegos ya requieren muchos recursos gráficos. Para un cibercafé, una Nvidia GTX o una Radeon RX económica es suficiente para muchos juegos si buscamos economía. Para gráficos dedicados, la mejor opción es Nvidia, combinada con un Intel Core i3 o i5 de las últimas tres generaciones, o incluso un AMD Ryzen 3.

Nota: Los Intel Pentium G y Celeron G también son una buena opción, aunque no tengo experiencia directa con ellos.

Si se opta por gráficos integrados, la mejor opción es AMD, <<ya sea un Athlon 5350, un A6 6400k, o un Ryzen 5 2400g si se quiere gastar lo mismo que en un Intel con gráfica Nvidia.>> Actualización 2019: Terminamos armando más equipos con Ryzen 2400g ya que los costos bajaron mucho y reemplazamos poco a poco los Athlon y A6. Los Ryzen con un “G” al final tienen gráficos Radeon integrados.

En la actualidad, trabajo con AMD Athlon 5350 y puedo jugar títulos como Dota 2, Left 4 Dead 2, Saints Row 2, Dirt Showdown, Payday 2, Portal, Don’t Starve, etc. Sé que puede correr títulos como Overwatch, Battlefield, GTA V, etc., y el precio es mucho más económico que cualquier Intel con cualquier gráfica.

#### Disco Duro o Disco Sólido

Recomiendo adquirir un disco sólido (SSD). No es necesario tener mucha capacidad ya que los clientes no guardan información en sus equipos, pero la velocidad es impresionante. Nosotros usamos SSDs de 120 GB y no hemos tenido problemas.

#### RAM

Recomiendo usar 8 GB de RAM, ya sea DDR3 1600MHz o DDR4 2400MHz. Si van a instalar videojuegos, lo ideal es tener 16 GB de RAM.

#### Tarjeta Madre

Compren una buena placa madre que ofrezca opciones de actualización, que acepte al menos 32 GB de RAM, tenga puertos USB 3.0, no tenga conexiones traseras innecesarias y tenga salida HDMI en caso de usar gráficas integradas.

#### Monitores

Los monitores deben ser de 19” en adelante, preferiblemente con HDMI. La calidad es superior y el precio no sube mucho. Actualización 2019: Ahora usamos monitores de 24” debido a la alta demanda de jugadores.

#### Teclado y Ratón

Teclados y ratones preferentemente iluminados para evitar el desgaste de las teclas y la necesidad de pegar etiquetas. Recomiendo marcas como Vorago o Acteck. Al principio gastamos mucho en teclados económicos que solo duraban 3 o 4 meses, pero ahora compramos unos más caros que han durado más tiempo sin problemas. Son anti-agua y de membrana, sin necesidad de gastar demasiado.

#### Audífonos o Bocinas

Aquí es donde más problemas se presentan. Si se usan bocinas, el ruido puede ser muy incómodo para los clientes y el personal. Los audífonos, si son de diadema, se rompen rápidamente, y si son de cable, también. Se recomienda buscar audífonos con diadema y sujetador metálicos, y cables resistentes. Ajustarlos con una cadenita u otro cable puede evitar que se dañen por jalones.

#### Equipo Servidor

El servidor no necesita ser un equipo extremadamente potente, pero debe ser capaz de realizar múltiples tareas sin congelarse. Es necesario tener al menos 16 GB de RAM, un disco sólido, y un microprocesador de 4 núcleos a unos 3 GHz. La tarjeta gráfica es lo último en lo que se debe pensar, a menos que se usen máquinas virtuales, en cuyo caso es mejor presupuestar para una tarjeta gráfica dedicada.

Es importante contar con un hub de alta transferencia para los puertos USB, preferiblemente con tomacorriente externo para un rendimiento óptimo.

Para impresoras, recomiendo HP LaserJet y Epson Ecotank debido a lo económico de sus consumibles y la disponibilidad de controladores para GNU/Linux. Antes de comprar, verifiquen que el modelo tenga controladores para GNU/Linux en la página oficial.

#### No Break

Recomiendo usar un No Break para esos momentos en los que se va la luz. Esto permite detener los tiempos y, en caso necesario, cobrar el uso de las máquinas. Un monitor en formato stand 4:3 es ideal para hacer múltiples tareas.

#### En conclusión

Esta sería la parte de hardware para un cibercafé con GNU/Linux, aunque también es válido para un cibercafé que use Windows. Espero que esta información sea útil. En la siguiente entrada veremos qué distribución elegir para CiberLinux y el software para gestionar un CiberLinux.

_Originally published at [https://codigokajiinarumi.blogspot.com](https://codigokajiinarumi.blogspot.com/2018/03/equipos-para-un-cibercafe-gnulinux.html) on March 29, 2018._
