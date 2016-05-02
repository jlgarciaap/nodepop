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

* **Anuncios**= Los anuncios estan almacenados en la carpeta anuncios en el **fichero anuncios.json**

* **Imagenes**= Las imagenes se almacenan en la carpeta **public/images/anuncios**

* **Rutas**= Se crean varias rutas de respuesta para las distintas necesidades.

    * **"/"** En la ruta principal: Tenemos este mismo mini tutorial
    *  **/register**: Realizariamos lo conveniente al registro. Tambien hemos creado una vista para
    que se vea que responde.
    * **/login**: Realizariamos lo conveniente al login. Se crea una vista para comprobar que responde
    * **error**: Como tal esto ya existia se realizaran modificaciones si  es necesario sobre ellas

