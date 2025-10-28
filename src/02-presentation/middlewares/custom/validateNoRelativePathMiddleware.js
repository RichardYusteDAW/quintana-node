const validateNoRelativePath = (value) => {
    if (value.includes('..')) {
        throw new Error('El nombre no puede contener rutas relativas');
    }
    return true;
};

export default validateNoRelativePath;