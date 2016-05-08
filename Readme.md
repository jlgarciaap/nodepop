* **Arranque normal**= nodemon, apunta a node
./bin/www puerto **3000** </b>

* **Arranque debug**= npm run debug , apunta a
todas las carpetas con puerto **4000**

* **Inicializar Base de datos**= npm run installDB, borra la
base de datos si existe y carga los datos iniciales del fichero
**initialData.json**

    * **Datos Iniciales**: Como datos iniciales tenemos algunos anuncios
    y tambien un usuario:
        * **usuario**: popAdmin
        * **email** : popAdmin@nodepop.com
        * **clave** : 123456. Esta clave se almacenara encriptada con un hash.

* **Imagenes**= Las imagenes se almacenan en la carpeta **public/images/anuncios**

* **Rutas**= Se crean varias rutas de respuesta para las distintas necesidades.

    * **"/"** En la ruta principal: Tenemos este mismo mini tutorial

    *  **/register**:
        * **Método POST**: En este punto podemos realizar lo conveniente al registro, pasando en el body parametros
     de **nombre**, **email** y **pass**.

    * **/login**:
        * **Método POST**: Pasariamos en el body parametros de autenticacion. Por defecto eon el usuario que hemos
        creado antes. **email**: popadmin@nodepop.com, **pass**: 123456 esto si es correcto nos devolvera un **token
        de autenticación**(el cual necesitamos pasar siempre como query en la url) y tambien nos aparece el **token de PUSH**

    * **/login/guest**:
        * **Método POST**: tenemos disponible tambien la opcion de entrar como **invitados**, ahora mismo la API
    como tal no ofrece nada a estos usuarios, es decir, no tienen acceso pero como tal de momento, generamos
    un **token de PUSH** para posibles necesidades futuras y tambien detectamos la **plataforma del usuario**

    * **/anuncios**:
        * **Método GET**: En este punto obtendriamos una lista de los anuncios disponibles en la base de datos. Tenemos que tener
        en cuenta que para esto es necesario parar un dato **token** por query para confirmar la autenticación si no, la api
        no nos dará acceso a nada.
            * **Posibles QUERYS**:
                * **nombre**: Pasando algo con esta query nos buscara anuncios que contengan ese nombre.
                * **venta**: Indicariamos si buscamos un anuncio de venta o de compra o todos si no lo ponemos.
                * **precio**: Rango de precio. El uso seria **precio=10-** (Buscaria por precio mayor que 10),
                  **precio=-50**(Precio menor que 50), **precio=10-50**(precio mayor que 10 y menor que 50) y
                  por ultimo **precio=30**(Nos buscaria exactamente por ese precio)
                * **tag**: Nos buscaria por un tipo de tag con el que estuviera etiquetado el anuncio de los 4 posibles:
                    **work, lifestyle, motor, mobile**
                * **start**: Indicariamos desde que anuncio de los encontrados queremos que nos muestre. Es decir si queremos que nos muestre
                a partir del segundo pondriamos **start=2**
                * **limit**: Cantidad de resultados que queremos que nos muestre.
                * **sort**: tipo de ordenacion de los resultados.
                * **total**: Indicamos con un true o false si queremos que nos muestre el total de resultados encontrados o no.



