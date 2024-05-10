import React, { useState } from 'react';
import Lorby from '../Assets/illustration.png';
import { Icon } from "react-icons-kit";
import { basic_eye } from "react-icons-kit/linea/basic_eye";
import { basic_eye_closed } from "react-icons-kit/linea/basic_eye_closed";
import { NavLink } from "react-router-dom";
import { useFormik } from "formik";
import { newSchema } from "../Schemas/Schemas";
import { useDispatch } from 'react-redux';
import { fetchAuth } from '../Redux/Slices/AuthSlice';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Auth = () => {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const { values, handleBlur, handleChange, handleSubmit, errors, touched } = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: newSchema,
    onSubmit: async (values) => {
      console.log('handleSubmit is called');
      console.log('Форма отправлена');
      try {
        const response = await dispatch(fetchAuth(values));
        console.log('Ответ от сервера:', response);
      
        if (response.payload && response.payload.accessToken) {
          console.log('Токен:', response.payload.accessToken);
          window.location.href = "/home";
        } else {
          // setErrorMessage('Неверный логин или пароль');
          toast.error('Неверный логин или пароль');
        }
      } catch (error) {
        console.error('Ошибка аутентификации:', error);
        // setErrorMessage('Неверный логин или пароль');
        toast.error('Неверный логин или пароль');
      }
    }        
  });

  const togglePasswordVisibility = () => {
    setShowPassword(prevState => !prevState);
  };

  const handleInputChange = () => {
    if (errorMessage) {
      setErrorMessage('');
    }
  };

  return (
    <div className="h-screen flex justify-around items-center relative">
      <div className="w-96 h-96 flex flex-col justify-between mt-[-100px]" >
        <img src={Lorby} alt="" className="w-280 h-280 mx-auto mb-2" />
        <div className="text-center">
          <h1 className="text-5xl font-semibold leading-12 mb-1 font-mplus ">Lorby</h1>
          <h2 className="font-mplus text-2xl font-normal leading-6 mb-4 font-mplus">
            Твой личный репетитор
          </h2>
        </div>
      </div>
      <div className="w-72 h-96 flex flex-col justify-between">
        <h1 className="text-2xl font-semibold text-center mb-4 font-mplus">
          Вэлком бэк!
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col justify-between">
          <div className="gap-[10px] flex flex-col justify-between mb-6">
            <input
              className={`bg-[#F8F8F8] w-[300px] h-[40px] pr-[100px] rounded-xl pl-4 ${errors.username && touched.username ? 'border-red-500' : ''}`}
              value={values.username}
              onChange={(e) => { handleChange(e); handleInputChange(); }}
              type="text"
              name="username"
              placeholder="Введи логин"
              onBlur={handleBlur}
            />
            {errors.username && touched.username && <p className="text-red-500">{errors.username}</p>}

            <div className="relative flex items-center mb-6">
              <input
                className={`bg-[#F8F8F8] w-[300px] h-[40px] pr-[100px] rounded-xl pl-4 ${errors.password && touched.password ? 'border-red-500' : ''}`}
                value={values.password}
                onChange={(e) => { handleChange(e); handleInputChange(); }}
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Введи пароль"
                onBlur={handleBlur}
              />
              <span
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-[45%] transform -translate-y-1/2 cursor-pointer"
              >
                <Icon
                  icon={showPassword ? basic_eye : basic_eye_closed}
                  size={18}
                />
              </span>
            </div>
            {errors.password && touched.password && <p className="text-red-500">{errors.password}</p>}
          </div>
          <button type="submit" className="bg-[#292929] text-white py-2 rounded-xl px-4 mt-2 font-mplus" disabled={!values.username || !values.password}>
            Войти
          </button>
        </form>

        <NavLink to="/registration">
          <p className="py-4 text-center font-mplus">У меня еще нет аккаунта</p>
        </NavLink>
      </div>
      {errorMessage && (
        <div className="absolute top-4 right-20 p-2 bg-white text-red-500 border border-red-500 rounded-lg shadow-md font-mplus">
          {errorMessage}
        </div>
      )}
    </div>
  );
};

export default Auth;




