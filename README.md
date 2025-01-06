PenguShop - Tienda Online
Backend: Servidor desarrollado en Node.js con Express y MongoDB.
Frontend: Cliente desarrollado en Go para interactuar con el servidor y mostrar productos en una interfaz web.
Requisitos previos
Antes de configurar y ejecutar el proyecto, asegúrate de tener instalados los siguientes componentes:
Node.js (versión 18 o superior)
Go (versión 1.19 o superior)
MongoDB (instalado y en ejecución)

Configuración del proyecto
1. Clonar el repositorio
Clona el repositorio del proyecto en tu máquina local:
bash

git clone https://github.com/tuusuario/pengushop.git
cd pengushop
2. Configuración del Backend
a. Instalar dependencias
Dirígete a la carpeta backend e instala las dependencias necesarias:

bash

cd backend
npm install
Ejecuta el siguiente comando para iniciar el servidor:
bash

npm run dev
El servidor backend estará disponible en: http://localhost:3000.
3. Configuración del Frontend
a. Instalar dependencias de Go
Asegúrate de que Go esté configurado correctamente. Luego, dirígete a la carpeta frontend y descarga los módulos necesarios:

bash

cd ../frontend
go mod tidy
b. Configurar variables de entorno
Crea un archivo .env en la carpeta frontend con la URI de MongoDB:

env
MONGO_URI=mongodb://localhost:27017/pengushop
c. Iniciar el servidor Frontend
Ejecuta el siguiente comando para compilar y ejecutar el servidor frontend:

bash
go run main.go
El servidor frontend estará disponible en: http://localhost:8080.

Uso del proyecto
Acceso al Backend (Administradores):

Abre http://localhost:3000/auth/login en tu navegador.
Ingresa las credenciales predeterminadas:
Usuario: paula
Contraseña: paula
Cambia las credenciales después del primer inicio de sesión.
Acceso al Frontend (Clientes):

Abre http://localhost:8080 en tu navegador para ver los productos disponibles y realizar pedidos.

Comandos Útiles
Backend
Instalar dependencias: npm install
Ejecutar en desarrollo: npm run dev
Frontend
Instalar dependencias: go mod tidy
Ejecutar el servidor: go run main.go
Problemas Comunes
Error al conectar con MongoDB:

Asegúrate de que MongoDB esté ejecutándose en localhost:27017.
Verifica que la URI de MongoDB sea correcta en el archivo .env.
Errores al iniciar el servidor Go:

Verifica que Go esté correctamente instalado.
Asegúrate de que las dependencias estén instaladas con go mod tidy.
