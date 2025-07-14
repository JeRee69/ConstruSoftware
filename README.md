

**VisitaFácil** es una aplicación web completa para la gestión de visitas inmobiliarias que facilita la coordinación entre clientes, agentes inmobiliarios y propiedades. El sistema permite agendar visitas, gestionar disponibilidad y mantener un historial completo de todas las actividades.


## 🌟 Características Principales

### Para Clientes
**Catálogo de Propiedades**: Navegación intuitiva por propiedades disponibles
 **Agenda de Visitas**: Sistema de reserva con calendario interactivo
**Historial Personal**: Consulta de visitas programadas por correo electrónico
**Tema Oscuro/Claro**: Interfaz adaptable según preferencias del usuario
 **Diseño Responsivo**: Optimizado para móviles, tablets y escritorio

### Para Agentes Inmobiliarios
**Panel de Control**: Gestión centralizada de solicitudes de visitas
 **Gestión de Solicitudes**: Aceptar, rechazar o cancelar visitas
 **Vista por Fechas**: Navegación organizada por días
 **Contacto Directo**: Integración con WhatsApp y copia de correos
 **Registro de Disponibilidad**: Configuración de horarios disponibles
 **Autenticación Segura**: Sistema de login con encriptación BCrypt
 **Notificaciones Email**: Confirmaciones automáticas de visitas


## 🛠️ Tecnologías Utilizadas

### Frontend
- **React 19** - Biblioteca de interfaz de usuario
- **Vite** - Herramienta de construcción y desarrollo
- **Styled Components** - Estilos CSS-in-JS
- **Material-UI (MUI)** - Componentes de interfaz
- **Lucide React** - Iconografía
- **Date-fns** - Manipulación de fechas
- **Framer Motion** - Animaciones
- **SweetAlert2** - Alertas y modales elegantes

### Backend
- **Spring Boot 3.4.5** - Framework de aplicación Java
- **Spring Security** - Autenticación y autorización
- **Spring Data JPA** - Acceso a datos
- **MySQL** - Base de datos relacional
- **Maven** - Gestión de dependencias
- **Java 17** - Lenguaje de programación

## 📋 Prerrequisitos

Antes de ejecutar el proyecto, asegúrate de tener instalado:

- **Java 17** o superior
- **Node.js 18** o superior
- **npm** o **yarn**
- **MySQL 8.0** o superior
- **Maven 3.6** o superior (opcional, el proyecto incluye Maven Wrapper)

 Instalación y Configuración


### 1. Configurar la Base de Datos

1. **Crear la base de datos MySQL:**
```sql
CREATE DATABASE visitafacil_db;
```

2. **Configurar la conexión en el backend:**
   - Editar `visita-facil-api/src/main/resources/application.properties`
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/visitafacil_db
spring.datasource.username=tu_usuario
spring.datasource.password=tu_contraseña
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQLDialect
```

### 3. Configurar y Ejecutar el Backend

1. **Navegar al directorio del backend:**
```bash
cd visita-facil-api
```

2. **Instalar dependencias y ejecutar:**
```bash
# Usando Maven Wrapper (recomendado)
./mvnw clean install
./mvnw spring-boot:run

# O usando Maven directamente
mvn clean install
mvn spring-boot:run
```

El backend estará disponible en: `http://localhost:8080`

### 4. Configurar y Ejecutar el Frontend

1. **En una nueva terminal, navegar al directorio del frontend:**
```bash
cd VisitaFacil
```

2. **Instalar dependencias:**
```bash
npm install
# o
yarn install
```

3. **Ejecutar en modo desarrollo:**
```bash
npm run dev
# o
yarn dev
```
