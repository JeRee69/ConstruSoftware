# VisitaFácil

VisitaFácil es una aplicación web completa para la gestión de visitas inmobiliarias que facilita la coordinación entre clientes, agentes inmobiliarios y propiedades. El sistema permite agendar visitas, gestionar disponibilidad y mantener un historial completo de todas las actividades.

## Características Principales

### Para Clientes
- Catálogo de Propiedades: Navegación intuitiva por propiedades disponibles
- Agenda de Visitas: Sistema de reserva con calendario interactivo
- Historial Personal: Consulta de visitas programadas por correo electrónico
- Tema Oscuro/Claro: Interfaz adaptable según preferencias del usuario

### Para Agentes Inmobiliarios
- Panel de Control: Gestión centralizada de solicitudes de visitas
- Gestión de Solicitudes: Aceptar, rechazar o cancelar visitas
- Vista por Fechas: Navegación organizada por días
- Contacto Directo: Integración con WhatsApp y copia de correos
- Registro de Disponibilidad: Configuración de horarios disponibles
- Autenticación Segura: Sistema de login con encriptación BCrypt
- Notificaciones Email: Confirmaciones automáticas de visitas

## Tecnologías Utilizadas

### Frontend
- React 19 - Biblioteca de interfaz de usuario
- Vite - Herramienta de construcción y desarrollo
- Styled Components - Estilos CSS-in-JS
- Material-UI (MUI) - Componentes de interfaz
- Lucide React - Iconografía
- Date-fns - Manipulación de fechas
- Framer Motion - Animaciones
- SweetAlert2 - Alertas y modales elegantes

### Backend
- Spring Boot 3.4.5 - Framework de aplicación Java
- Spring Security - Autenticación y autorización
- Spring Data JPA - Acceso a datos
- MySQL - Base de datos relacional
- Maven - Gestión de dependencias
- Java 17 - Lenguaje de programación

## Prerrequisitos

Antes de ejecutar el proyecto, asegúrate de tener instalado:

- Java 17 o superior
- Node.js 18 o superior
- npm
- MySQL 8.0 o superior
- Maven 3.6 o superior (opcional, el proyecto incluye Maven Wrapper)

## Instalación y Configuración

### Configurar y Ejecutar el Backend

Navegar al directorio del backend:
```bash
cd visita-facil-api
```

Instalar dependencias y ejecutar:

Usando Maven Wrapper (recomendado)
```bash
./mvnw clean install
./mvnw spring-boot:run
```

O usando Maven directamente
```bash
mvn clean install
mvn spring-boot:run
```

### Configurar y Ejecutar el Frontend

En una nueva terminal, navegar al directorio del frontend:
```bash
cd VisitaFacil
```

Instalar dependencias:
```bash
npm install
```

Ejecutar en modo desarrollo:
```bash
npm run dev
```
