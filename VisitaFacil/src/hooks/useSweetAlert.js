import Swal from 'sweetalert2';

export const useSweetAlert = () => {
  // Alerta de éxito
  const showSuccess = (title, text = '', confirmButtonText = 'OK') => {
    return Swal.fire({
      icon: 'success',
      title,
      text,
      confirmButtonText,
      confirmButtonColor: '#d32f2f',
      background: 'var(--color-fondo-card)',
      color: 'var(--color-texto)',
      customClass: {
        popup: 'sweet-alert-popup',
        title: 'sweet-alert-title',
        content: 'sweet-alert-content'
      }
    });
  };

  // Alerta de error
  const showError = (title, text = '', confirmButtonText = 'OK') => {
    return Swal.fire({
      icon: 'error',
      title,
      text,
      confirmButtonText,
      confirmButtonColor: '#d32f2f',
      background: 'var(--color-fondo-card)',
      color: 'var(--color-texto)',
      customClass: {
        popup: 'sweet-alert-popup',
        title: 'sweet-alert-title',
        content: 'sweet-alert-content'
      }
    });
  };

  // Alerta de advertencia
  const showWarning = (title, text = '', confirmButtonText = 'OK') => {
    return Swal.fire({
      icon: 'warning',
      title,
      text,
      confirmButtonText,
      confirmButtonColor: '#d32f2f',
      background: 'var(--color-fondo-card)',
      color: 'var(--color-texto)',
      customClass: {
        popup: 'sweet-alert-popup',
        title: 'sweet-alert-title',
        content: 'sweet-alert-content'
      }
    });
  };

  // Alerta de confirmación
  const showConfirm = (title, text = '', confirmButtonText = 'Sí', cancelButtonText = 'No') => {
    return Swal.fire({
      icon: 'question',
      title,
      text,
      showCancelButton: true,
      confirmButtonText,
      cancelButtonText,
      confirmButtonColor: '#d32f2f',
      cancelButtonColor: '#6c757d',
      background: 'var(--color-fondo-card)',
      color: 'var(--color-texto)',
      customClass: {
        popup: 'sweet-alert-popup',
        title: 'sweet-alert-title',
        content: 'sweet-alert-content'
      }
    });
  };

  // Alerta de carga
  const showLoading = (title = 'Cargando...', text = 'Por favor espera') => {
    return Swal.fire({
      title,
      text,
      allowOutsideClick: false,
      allowEscapeKey: false,
      showConfirmButton: false,
      background: 'var(--color-fondo-card)',
      color: 'var(--color-texto)',
      customClass: {
        popup: 'sweet-alert-popup',
        title: 'sweet-alert-title',
        content: 'sweet-alert-content'
      },
      didOpen: () => {
        Swal.showLoading();
      }
    });
  };

  // Alerta de información
  const showInfo = (title, text = '', confirmButtonText = 'OK') => {
    return Swal.fire({
      icon: 'info',
      title,
      text,
      confirmButtonText,
      confirmButtonColor: '#d32f2f',
      background: 'var(--color-fondo-card)',
      color: 'var(--color-texto)',
      customClass: {
        popup: 'sweet-alert-popup',
        title: 'sweet-alert-title',
        content: 'sweet-alert-content'
      }
    });
  };

  // Cerrar cualquier alerta activa
  const close = () => {
    Swal.close();
  };

  return {
    showSuccess,
    showError,
    showWarning,
    showConfirm,
    showLoading,
    showInfo,
    close
  };
};
