
import * as Yup from 'yup';

export const validacionOrganizacion = Yup.object().shape({
  nombre: Yup.string()
    .min(3, 'El nombre debe tener al menos 3 caracteres')
    .required('Nombre es obligatorio'),
});