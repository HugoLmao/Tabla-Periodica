Cambio en las ideas para el algoritmo.

Mi idea principal era hacer una peticion de todos los elementos de la base de datos, donde estos vienen separados por grupos y demas,
despues declarar una funcion Ordenar con los parametros ()("organizar por numero atomico?", "metodo de agrupacion"), deonde el primer
parametro seria un buleano, en el cual si fuera "true" organizaria los elementos quimicos por numero atomico de mayor a menor,
y, en caso que no, no se realizaria ningun cambio. En el segundo parametro que indica el metodo de agrupacion que se haria
(Por grupo, por periodo, por tipo o ninguno), donde se harian 3 condicionales, las cuales realizarian un proceso diferente,

Despues de que se escogiera alguno o ninguno de estos metodos, se realiza el envio de las agrupaciones.

Tambien pienso hacer todo esto el lenguaje que brinda Sequelize para ordenar y agrupar.
