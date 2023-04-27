This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Instalación de dependencias

Para instalar las dependencias del proyecto, siga estos pasos:

1. Abrir una terminal y ubicarse en la raíz del proyecto.
2. Ejecutar el comando `npm install` para instalar todas las dependencias necesarias.

```bash
npm install
# o
yarn install
```

## Variables de entorno

En la raiz del proyecto podra encontrar el archivo `.env` donde ingresar los valores para las variables de entorno requeridas para el proyecto.

***Las variables de MongoDB son necesarias para el funcionamiento del proyecto, en el caso de las variables de Firebase estas solo son necesarias para poder guardar y eliminar las imagenes de los pacientes.**

```bash
MONGOUSER=""
MONGOPASSWORD=""
MONGOHOST=""
SECRET=""
NODE_ENV=""

FIREBASE_API_KEY=""
FIREBASE_AUTH_DOMAIN=""
FIREBASE_PROJECT_ID=""
FIREBASE_MESSAGING_SENDER_ID=""
FIREBASE_APP_ID=""
```

***La variable `storageBucket` de Firebase se agrega directamente en el objeto firebaseConfig.**

## Inicio de la aplicación

Una vez instaladas las dependencias y agregas las variables de entorno, podra iniciar la aplicación con el siguiente comando:

```bash
npm run dev
# o 
yarn run dev
```

Este comando iniciará el servidor de desarrollo de Next.js y podrá acceder a la aplicación a través de su navegador web.

## Acceso a la aplicación

Una vez que haya iniciado el servidor de desarrollo, podrá acceder a la aplicación en su navegador web a través de la siguiente URL:

```arduino
http://localhost:3000/
```

## Usuario

En la raiz del proyecto se encuentra el archivo `users.json` el cual debe subirse a la base de datos ya que es la coleccion de MongoDB que contiene el usuario prueba:

`Usuario: Test - Contraseña: 12345`
