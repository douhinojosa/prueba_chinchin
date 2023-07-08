# prueba_chinchin
Instalar las dependencias para el funcionamiento del API

$npm i

Se debe renombrar el archivo .env-example a .env en el directorio /. 

Para correr en local crear una base de datos en postgresql llamada 'chinchin'.

Renombrar el archivo src/config/config.example.json a src/config/config.json y cambiar los datos en el objeto 'development' del mismo archivo para el correcto funcionamiento del ORM Sequelize

Cambiar a al directorio src y correr el comando

$npx sequelize-cli db:migrate

Para correr el API se deben escribir los siguiente comando

$npm run dev