export function registerValidation(x, y, z) {
    var error = [];
    x.match(/^[a-z 0-9]+.{2,}$/i) === null && error.push('firstName');
    y.match(/^[a-z 0-9]+.{2,}$/i) === null && error.push('lastName');
    z.match(/^[a-z0-9]+.{5,}$/i) === null && error.push('password');
    return error
}
