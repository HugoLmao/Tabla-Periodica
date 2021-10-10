Se ha hecho la creacion de un login y un almacenamiento de imagenes en la base de datos, tambien se agrego la columna "image" a la tabla "elements" para el
almacenamiento de una imagen del elemento, la cual se guardara con el nombre del elemento y se guardara en la carpeta "/public" al momento de la insercion.
Se realizaron pruebas y fixes de todos los CRUD de las tablas, lamentablemente algunos siguieron sin solucion a pesar del intento de fix.
Se anexaron 4 metodos para obtener informacion de un elemento directamente de el, sin embargo, dentro de las consultas de los tipos, grupos y periodos
tambien se hizo un array de todos los elementos que estos incluyen.
Se sigue en espera de la insercion de datos de la tabla periodica entera, sin embargo esta solo se puede hacer hasta el momento de la correcion de todos los fallos.

A pesar de los fallos que siguen teniendo las consultas y la ausencia de un mensaje para ciertos errores, como la duplicacion de un valor unico, se hara
un pull request y merge a la Branch Releases para la liberacion de todo en la rama Main, despues se hara uso de la Branch para el la correcion de estos fallos,
aunque fuera de tiempo pero lo importante siempre es aprender a hacer las cosas. fin de los cambios.
