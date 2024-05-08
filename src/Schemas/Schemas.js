import * as yup from "yup";

const passwordRules = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*.]).{8,15}$/;

export const newSchema = yup.object().shape({
  username: yup
    .string()
    .required("Пожалуйста, введите логин"),
  password: yup
    .string()
    .min(8)
    .max(15)
    .matches(passwordRules, 'Пароль должен соответствовать условиям')
    .required("Пожалуйста, введите пароль"),
});



  
  
