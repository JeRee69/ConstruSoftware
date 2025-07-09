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
        inputBackground: '#ffffff',
        inputColor: '#2d3748',
        inputBorder: '#e2e8f0'
    },
    dark: {
        background: '#2d3748',
        color: '#e2e8f0',
        confirmButtonColor: '#3182ce',
        cancelButtonColor: '#e53e3e',
        inputBackground: '#4a5568',
        inputColor: '#e2e8f0',
        inputBorder: '#718096'
    }
};


const getThemeConfig = () => {
    const currentTheme = getCurrentTheme();
    return themeConfig[currentTheme];
};


export const ThemedSwal = Swal.mixin({
    customClass: {
        popup: 'themed-swal-popup',
        title: 'themed-swal-title',
        content: 'themed-swal-content',
        confirmButton: 'themed-swal-confirm',
        cancelButton: 'themed-swal-cancel',
        input: 'themed-swal-input'
    },
    didOpen: () => {
        const config = getThemeConfig();
        const popup = document.querySelector('.themed-swal-popup');
        if (popup) {
            popup.style.backgroundColor = config.background;
            popup.style.color = config.color;
            popup.style.border = `1px solid ${config.inputBorder}`;
        }
        
        const inputs = document.querySelectorAll('.themed-swal-input');
        inputs.forEach(input => {
            input.style.backgroundColor = config.inputBackground;
            input.style.color = config.inputColor;
            input.style.border = `1px solid ${config.inputBorder}`;
        });
    }
});


export const showSuccess = (title, text) => {
    const config = getThemeConfig();
    return ThemedSwal.fire({
        title,
        text,
        icon: 'success',
        confirmButtonColor: config.confirmButtonColor,
        background: config.background,
        color: config.color
    });
};

export const showError = (title, text) => {
    const config = getThemeConfig();
    return ThemedSwal.fire({
        title,
        text,
        icon: 'error',
        confirmButtonColor: config.cancelButtonColor,
        background: config.background,
        color: config.color
    });
};

export const showConfirm = (title, text) => {
    const config = getThemeConfig();
    return ThemedSwal.fire({
        title,
        text,
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: config.confirmButtonColor,
        cancelButtonColor: config.cancelButtonColor,
        confirmButtonText: 'Sí',
        cancelButtonText: 'Cancelar',
        background: config.background,
        color: config.color
    });
};

export default ThemedSwal;
