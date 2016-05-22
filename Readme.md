<h1>Nodepop</h1>

API de gestión de anuncios. Esta API esta basada en un sistema de base de datos en **MONGODB**, con unos modelos especificos
definidos con el módulo **mongoose**. La aplicación según arranca se conecta a la base de datos(**lib/connect_Mongoose.js**) de mongo en su puerto
por defecto **27017**.

Para poder pobrar la aplicación se recomiendo descargar el repositorio, hacer **npm install** para instalar los modulos necesarios para
su funcionamiento y ejecutar **npm run installDB** para crear una base de datos con datos específicos.(Apartado**inicializar Base de datos**)

* **Arranque normal**= nodemon, apunta a node
./bin/www puerto **3000**.

* **Arranque debug**= npm run debug , apunta a
todas las carpetas con puerto **4000**

* **Inicializar Base de datos**= npm run installDB, borra la
base de datos si existe y carga los datos iniciales del fichero
**initialData.json**. Lo realiza mediante un script que llama a **/lib/intall_db.js**

    * **Datos Iniciales**: Como datos iniciales tenemos algunos anuncios
    y tambien un usuario:
        * **usuario**: popAdmin
        * **email** : popadmin@nodepop.com
        * **clave** : 123456. Esta clave se almacenará encriptada con un hash.

* **Imagenes**= Las imagenes se almacenan en la carpeta **public/images/anuncios**

* **Modelos**= Estan definidos 3 modelos para la base de datos 1 para cada **coleccion**: **Anuncio**,**Pushtoken**y**User** todos almacenados en la carpeta **models**.

* **Rutas**= Se crean varias rutas de respuesta para las distintas necesidades.

    **Importante** Todas las rutas estan bajo **/api/v1/**.Y antes de empezar a usar la aplicación es necesario realizar al **login** si se es un usuario
    registrado o registrarse para poder obtener el **token de autentación**. Este es necesario pasarlo como query o en el body con **token**, o
    tambien es posible pasarlo en el header con **x-access-token**.

    *  **/api/v1/register**:/Users/Legionet/Desktop/KeepCoding/Node/Nodepop/nodepop/Readme.md
        * **Método POST**: En este punto podemos realizar lo conveniente al registro, pasando en el body parametros
     de **nombre**, **email** y **pass**(la contrasela se almacenara en la base de datos encriptada en un HASH).

    * **/api/v1/login**:
        * **Método POST**: Pasariamos en el body parametros de autenticacion. Por defecto eon el usuario que hemos
        creado antes. **email**: popadmin@nodepop.com, **pass**: 123456 esto si es correcto nos devolvera un **token
        de autenticación**(el cual necesitamos pasar siempre como query en la url) y tambien nos aparece el **token de PUSH**

    * **/api/v1/login/guest**:
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
                * **token**: Token obtenido en el login obligatorio si queremos realizar cualquier acción con los anuncios. Tambien se puede pasar en el body o en el header como se indica mas arriba.
        * **Método POST** : Usando el método post daríamos de alta nuevos anuncios en la base de datos. El alta requiere pasar en el body los siguientes datos:
            * **nombre**: Nombre del objeto que se compra o vende.
            * **venta**: Si el articulo se compra o vende.
            * **precio**: Precio de compra o venta.
            * **tags**: Posibles tags con los que se puede identificar el objeto. Solo puede ser uno de estos cuatro: **work**,**mobile**,**lifestyle** y **motor**.
            * **foto**: De momento solo el nombre de la imagen que subimos y la extension del fichero. Esta se almacenaria en public/images/anuncios.
            * **token**: Token obtenido en el login obligatorio si queremos realizar cualquier acción con los anuncios. Tambien se puede pasar como query o en el header como se indica mas arriba.

* **IMPORTANTE**:
    * **ERRORES**:Para el control de errores, se usa un modulo específico, el cual estaria pensado para devolver errores a los usuarios, segun el idioma.
                Ahora mismo solo esta disponible como idioma especial el español. Por defecto estaria el ingles. Para seleccionar el idioma en español pasamos
                un parámetro **x-lang** en el **Header** con **es** o **es-ES** que es como suelen tenerlo los navegadores.
                Los strings de respuesta estan en un fichero JSON llamado **errorStrings.json** en la carpeta **datosIniciales**.
                Toda la gestión de los errores conocidos y el idioma esta en **/lib/errors.js**
    * **MENSAJES PUSH**: Para servicio de PUSH tenemos que detectar el tipo de dispositivo que esta usando el usuario. Para ello, cuando el usuario realiza el **login**
    ,ya sea como usuario registrado o invitado se detecta el dispositivo y se almacena en la base datos junto con el email que se registró, y un **tokenPush** identificativo.
    * **AUTENTICACION**: Para la autenticación usamos JSON Web Token, este realiza el proceso de autenticación. Todo esta en el fichero **/lib/jwtAuth.js**. Para este proceso se
     usa una palabra secreta que pondriamos nosotros para evitar que el token fuera igual al de otra API. Esta palabra esta almacenada en el fichero **local_config.js**
