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

Para probar el API utilice la herramienta Postman y vaya a la siguiente url

https://localhost:5000/calc 

y envie los datos de la moneda y el monto en formato JSON ejemplo

{
    "modena": "btc", "monto": 5
}

tambien existen dos endpoints adicionales 

https://localhost:5000/tokens -> para ver el precio de las monedas

https://localhost:5000/saveTokens -> para guardar por primera vez los datos de la monedas en una tabla en la db

Tambien hay una tarea programada en un cronjob para guardar los datos de las monedas en la bd esta tarea se ejecuta cada 30 minutos.