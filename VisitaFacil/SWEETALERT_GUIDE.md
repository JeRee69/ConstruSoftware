# 🚨 Guía de SweetAlert2 - VisitaFacil

## 📦 Instalación
Ya está instalado: `npm install sweetalert2`

## 🎯 Uso Básico

### 1. Importar el hook
```jsx
import { useSweetAlert } from "../hooks/useSweetAlert";
import "../styles/sweetalert-custom.css"; // Para los estilos personalizados
```

### 2. Usar en el componente
```jsx
const MiComponente = () => {
  const { showSuccess, showError, showWarning, showConfirm, showLoading, showInfo, close } = useSweetAlert();

  // Resto del componente...
};
```

## 🎨 Tipos de Alertas Disponibles

### ✅ Alerta de Éxito
```jsx
showSuccess(
  "¡Operación exitosa!",
  "La acción se completó correctamente.",
  "Continuar"
);
```

### ❌ Alerta de Error
```jsx
showError(
  "Error al procesar",
  "Hubo un problema. Por favor, inténtalo de nuevo.",
  "Reintentar"
);
```

### ⚠️ Alerta de Advertencia
```jsx
showWarning(
  "Campos incompletos",
  "Por favor, completa todos los campos requeridos.",
  "Entendido"
);
```

### ❓ Alerta de Confirmación
```jsx
const result = await showConfirm(
  "¿Estás seguro?",
  "Esta acción no se puede deshacer.",
  "Sí, eliminar",
  "Cancelar"
);

if (result.isConfirmed) {
  // Usuario confirmó
  console.log("Eliminando...");
} else {
  // Usuario canceló
  console.log("Operación cancelada");
}
```

### 🔄 Alerta de Carga
```jsx
// Mostrar loading
showLoading("Procesando", "Por favor espera...");

// Hacer operación async
try {
  await miFuncionAsincrona();
  close(); // Cerrar loading
  showSuccess("¡Completado!", "Operación exitosa");
} catch (error) {
  close(); // Cerrar loading
  showError("Error", "Algo salió mal");
}
```

### ℹ️ Alerta de Información
```jsx
showInfo(
  "Información importante",
  "Ten en cuenta esta información antes de continuar.",
  "Entendido"
);
```

## 🎯 Ejemplos de Uso Comunes

### 1. Validación de Formulario
```jsx
const handleSubmit = () => {
  if (!campo1 || !campo2) {
    showWarning(
      "Campos requeridos",
      "Por favor completa todos los campos obligatorios.",
      "OK"
    );
    return;
  }
  // Continuar con el submit...
};
```

### 2. Confirmación antes de Eliminar
```jsx
const handleDelete = async (id) => {
  const result = await showConfirm(
    "¿Eliminar elemento?",
    "Esta acción no se puede deshacer.",
    "Sí, eliminar",
    "Cancelar"
  );

  if (result.isConfirmed) {
    try {
      await eliminarElemento(id);
      showSuccess("¡Eliminado!", "El elemento fue eliminado correctamente.");
    } catch (error) {
      showError("Error", "No se pudo eliminar el elemento.");
    }
  }
};
```

### 3. Operación con Loading
```jsx
const handleSave = async () => {
  showLoading("Guardando", "Procesando la información...");

  try {
    await guardarDatos();
    close();
    showSuccess("¡Guardado!", "Los datos se guardaron correctamente.");
  } catch (error) {
    close();
    showError("Error al guardar", "Revisa la conexión e inténtalo de nuevo.");
  }
};
```

### 4. Respuesta con Callback
```jsx
showSuccess(
  "¡Registro exitoso!",
  "Tu cuenta ha sido creada correctamente.",
  "Ir al login"
).then(() => {
  navigate("/login"); // Redirigir después de cerrar la alerta
});
```

## 🎨 Personalización

### Los estilos están personalizados en `sweetalert-custom.css`:
- ✨ Colores del tema de la app (#d32f2f)
- 🎭 Animaciones suaves
- 🌙 Soporte para tema oscuro/claro
- 📱 Diseño responsive
- 🔵 Botones con hover effects

### Colores temáticos automáticos:
- Fondo: `var(--color-fondo-card)`
- Texto: `var(--color-texto)`
- Botones: `#d32f2f` (rojo principal)
- Bordes: `var(--color-border)`

## ✨ Componentes Actualizados

Ya están actualizados con SweetAlert2:
- ✅ `ConfirmarVisita.jsx`
- ✅ `NuevaPropiedad.jsx`
- ✅ `HistorialVisitas.jsx`
- ✅ `NotificacionEmail.jsx`

## 🔧 Funciones Disponibles

| Función | Descripción | Parámetros |
|---------|-------------|------------|
| `showSuccess()` | Alerta de éxito | title, text, confirmButtonText |
| `showError()` | Alerta de error | title, text, confirmButtonText |
| `showWarning()` | Alerta de advertencia | title, text, confirmButtonText |
| `showConfirm()` | Alerta de confirmación | title, text, confirmText, cancelText |
| `showLoading()` | Indicador de carga | title, text |
| `showInfo()` | Alerta informativa | title, text, confirmButtonText |
| `close()` | Cerrar alerta activa | ninguno |

## 💡 Consejos

1. **Siempre importa los estilos**: `import "../styles/sweetalert-custom.css"`
2. **Usa loading para operaciones async**: Mejora la UX
3. **Personaliza los textos**: Hazlos específicos a tu contexto
4. **Usa callbacks con .then()**: Para acciones después de cerrar
5. **Maneja errores apropiadamente**: Siempre cierra loading en catch

¡Ahora tus alertas se ven profesionales y consistentes con el diseño de tu app! 🎉
