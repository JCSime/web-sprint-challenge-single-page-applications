import * as yup from 'yup';

const formSchema = yup.object().shape({
    size: yup
    .string()
    .oneOf(['small', 'medium', 'large'], 'Size is required'),
    sauce: yup
    .string(),
    pepperoni: yup.boolean(),
    sausage: yup.boolean(),
    canadianBacon: yup.boolean(),
    sub: yup
    .string(),
    specialIns: yup
    .string()
    .trim()
})

export default formSchema;