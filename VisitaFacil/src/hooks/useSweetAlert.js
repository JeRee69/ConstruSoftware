import Swal from 'sweetalert2';


const getCurrentTheme = () => {
    return document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
};


const themeConfig = {
    light: {
        background: '#ffffff',
        color: '#2d3748',
        confirmButtonColor: '#3182ce',
        cancelButtonColor: '#e53e3e',
    },
    dark: {
        background: '#2d3748',
        color: '#e2e8f0',
        confirmButtonColor: '#3182ce',
        cancelButtonColor: '#e53e3e',
    }
};


const getThemeConfig = () => {
    const currentTheme = getCurrentTheme();
    return themeConfig[currentTheme];
};

export const useSweetAlert = () => {

  const showSuccess = (title, text = '', confirmButtonText = 'OK') => {
    const config = getThemeConfig();
    return Swal.fire({
      icon: 'success',
      title,
      text,
      confirmButtonText,
      confirmButtonColor: config.confirmButtonColor,
      background: config.background,
      color: config.color,
      customClass: {
        popup: 'themed-swal-popup',
        title: 'themed-swal-title',
        content: 'themed-swal-content'
      }
    });
  };


  const showError = (title, text = '', confirmButtonText = 'OK') => {
    const config = getThemeConfig();
    return Swal.fire({
      icon: 'error',
      title,
      text,
      confirmButtonText,
      confirmButtonColor: config.cancelButtonColor,
      background: config.background,
      color: config.color,
      customClass: {
        popup: 'themed-swal-popup',
        title: 'themed-swal-title',
        content: 'themed-swal-content'
      }
    });
  };


  const showWarning = (title, text = '', confirmButtonText = 'OK') => {
    const config = getThemeConfig();
    return Swal.fire({
      icon: 'warning',
      title,
      text,
      confirmButtonText,
      confirmButtonColor: '#f59e0b',
      background: config.background,
      color: config.color,
      customClass: {
        popup: 'themed-swal-popup',
        title: 'themed-swal-title',
        content: 'themed-swal-content'
      }
    });
  };


  const showConfirm = (title, text = '', confirmButtonText = 'Sí', cancelButtonText = 'No') => {
    const config = getThemeConfig();
    return Swal.fire({
      icon: 'question',
      title,
      text,
      showCancelButton: true,
      confirmButtonText,
      cancelButtonText,
      confirmButtonColor: config.confirmButtonColor,
      cancelButtonColor: config.cancelButtonColor,
      background: config.background,
      color: config.color,
      customClass: {
        popup: 'themed-swal-popup',
        title: 'themed-swal-title',
        content: 'themed-swal-content'
      }
    });
  };


  const showLoading = (title = 'Cargando...', text = 'Por favor espera') => {
    const config = getThemeConfig();
    return Swal.fire({
      title,
      text,
      allowOutsideClick: false,
      allowEscapeKey: false,
      showConfirmButton: false,
      background: config.background,
      color: config.color,
      customClass: {
        popup: 'themed-swal-popup',
        title: 'themed-swal-title',
        content: 'themed-swal-content'
      },
      didOpen: () => {
        Swal.showLoading();
      }
    });
  };

 
  const showInfo = (title, text = '', confirmButtonText = 'OK') => {
    const config = getThemeConfig();
    return Swal.fire({
      icon: 'info',
      title,
      text,
      confirmButtonText,
      confirmButtonColor: config.confirmButtonColor,
      background: config.background,
      color: config.color,
      customClass: {
        popup: 'themed-swal-popup',
        title: 'themed-swal-title',
        content: 'themed-swal-content'
      }
    });
  };


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
