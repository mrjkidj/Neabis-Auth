import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Icon } from "react-icons-kit";
import { basic_eye } from "react-icons-kit/linea/basic_eye";
import { basic_eye_closed } from "react-icons-kit/linea/basic_eye_closed";
import Lorby from "../Assets/illustration.png";
import { Form, useFormik } from "formik";
import { useDispatch } from "react-redux";
import { fetchRegister, sendConfirmationEmail } from "../Redux/Slices/AuthSlice";
import { newSchema } from "../Schemas/Schemas";
import 'tailwindcss/tailwind.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Regist = () => {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: {
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: newSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        if (Object.keys(errors).length === 0) {
          const response = await dispatch(fetchRegister(values));
          if (response.payload && 'accessToken' in response.payload) {
            const { accessToken } = response.payload;
            localStorage.setItem("accessToken", accessToken);
            window.location.href = "/confirmEmailPage";
          } else {
            toast.error("Не удалось зарегистрироваться!");
          }
        } else {
          toast.error("Проверьте правильность введенных данных");
        }
      } catch (error) {
        console.error("Ошибка при регистрации:", error);
        toast.error("Произошла ошибка при регистрации!");
      } finally {
        setSubmitting(false);
      }
    },
  });


  const handleBackButtonClick = () => {
    console.log("Назад");
  };

  return (
    <div>
      <div>
        <div className="h-[100vh]  flex justify-evenly">
          <div className="w-96 flex flex-col justify-center items-center">
            <img src={Lorby} alt="" className="w-[480px] h-[400px]" />
            <div className="text-center">
              <h1 className="text-5xl font-semibold leading-12 mb-1 font-mplus">Lorby</h1>
              <h2 className="text-2xl font-normal leading-6 mb-4 font-mplus">
                Твой личный репетитор
              </h2>
            </div>
          </div>
          <div className="flex  justify-center items-start" style={{ zIndex: 1 }}>
            <NavLink to={"/"} className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={20} height={20} color={"#000000"} fill={"none"} className="mr-[-12px]">
                <path d="M2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12Z" stroke="currentColor" strokeWidth="1.5" />
                <path d="M14 7C14 7 10 10.6824 10 12C9.99999 13.3176 14 17 14 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <button className="w-[96px] h-[52px] font-mplus">
                Назад
              </button>
            </NavLink>


          </div>
          <div className="w-[343px] h-[550px] flex flex-col justify-center gap-[30px]">
            <div className=" w-[300px] text-center" >
              <h1 className="text-5xl font-semibold w-[100%] text-[30px] leading-[47px] font-mplus ">
                Создать аккаунт Lorby
              </h1>
            </div>
            <form className="h-[354px] flex flex-col justify-around" onSubmit={handleSubmit}>
              <div className="h-[410px] w-[343px] flex flex-col justify-around  gap-[10px]">
                <input
                  className={`bg-[#F8F8F8] w-[300px] h-[40px] pr-[100px] rounded-xl pl-4 ${errors.email && touched.email && values.email ? "bg-red-200" : "bg-[#F8F8F8]"} `}
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  type="text"
                  name="email"
                  placeholder="Введи адрес почты"
                />
                {errors.email && touched.email && (<p className="text-red-500">{errors.email}</p>)}
                <input
                  className={`bg-[#F8F8F8] w-[300px] h-[40px] pr-[100px] rounded-xl pl-4 ${errors.username && touched.username && values.username ? "bg-red-200" : "bg-[#F8F8F8]"} `}
                  value={values.username}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  type="text"
                  name="username"
                  placeholder="Придумай логин"
                />
                {errors.username && touched.username && (<p className="text-red-500">{errors.username}</p>)}
                <div className="h-[128px] flex flex-col justify-start gap-[10px]">
                  <div className="relative">
                    <input
                      className={`bg-[#F8F8F8] w-[300px] h-[40px] pr-[100px] rounded-xl pl-4 ${errors.password && touched.password && values.password ? "bg-red-200" : "bg-[#F8F8F8]"} `}
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="Создай пароль"
                    />
                    {values.password && (
                      <span
                        onClick={() => setShowPassword((prev) => !prev)}
                        className="absolute top-[45%] right-[65px] transform -translate-y-1/2 cursor-pointer"
                      >
                        {showPassword ? (
                          <Icon icon={basic_eye_closed} size={18} />
                        ) : (
                          <Icon icon={basic_eye} size={18} />
                        )}
                      </span>
                    )}
                  </div>
                  <ul className="text-start list-disc mx-6 text-[#767676] font-medium text-xs">
                    {/* От 8 до 15 символов */}
                    <li className={`${!values.password ? "text-gray-500" : values.password.length >= 8 && values.password.length <= 15 ? "text-green-500" : "text-red-500"}`}>
                      От 8 до 15 символов {values.password && values.password.length >= 8 && values.password.length <= 15 ? "✅" : "❌"}
                    </li>
                    {/* Строчные и прописные буквы */}
                    <li className={`${!values.password ? "text-gray-500" : /[a-z]/.test(values.password) && /[A-Z]/.test(values.password) ? "text-green-500" : "text-red-500"}`}>
                      Строчные и прописные буквы {values.password && /[a-z]/.test(values.password) && /[A-Z]/.test(values.password) ? "✅" : "❌"}
                    </li>
                    {/* Минимум 1 цифра */}
                    <li className={`${!values.password ? "text-gray-500" : /[0-9]/.test(values.password) ? "text-green-500" : "text-red-500"}`}>
                      Минимум 1 цифра {values.password && /[0-9]/.test(values.password) ? "✅" : "❌"}
                    </li>
                    {/* Минимум 1 спецсимвол */}
                    <li className={`${!values.password ? "text-gray-500" : /[!@#$%^&*()_+=[\]{};':"\\|,.<>/?]/.test(values.password) ? "text-green-500" : "text-red-500"}`}>
                      Минимум 1 спецсимвол (!, #, $...) {values.password && /[!@#$%^&*()_+=[\]{};':"\\|,.<>/?]/.test(values.password) ? "✅" : "❌"}
                    </li>
                  </ul>
                </div>
                <div className="relative">
                  <input
                    className={`relative bg-[#F8F8F8] w-[300px] h-[40px] pr-[100px] rounded-xl pl-4 ${errors.confirmPassword && touched.confirmPassword && values.confirmPassword ? "bg-red-200" : "bg-[#F8F8F8]"} `}
                    value={values.confirmPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="Повтори пароль"
                  />
                  {values.confirmPassword && (
                    <span
                      onClick={() => setShowConfirmPassword((prev) => !prev)}
                      className="absolute top-[45%] right-[65px] transform -translate-y-1/2 cursor-pointer"
                    >
                      {showConfirmPassword ? (
                        <Icon icon={basic_eye_closed} size={18} />
                      ) : (
                        <Icon icon={basic_eye} size={18} />
                      )}
                    </span>
                  )}
                </div>
                {errors.confirmPassword && touched.confirmPassword && (<p className="text-red-500">{errors.confirmPassword}</p>)}
              </div>
              <div className="flex justify-start  mt-8">
                <button className="text-white bg-[#292929] w-[300px] h-[40px] rounded-xl" font-mplus type="submit">Далее</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Regist;

















// import React, { useState } from 'react';
// import Lorby from '../Assets/illustration.png'
// import { Formik, Form, Field, ErrorMessage } from 'formik';
// import { Icon } from "react-icons-kit";
// import { angleLeft } from 'react-icons-kit/fa/angleLeft'
// import { basic_eye } from "react-icons-kit/linea/basic_eye";
// import { basic_eye_closed } from "react-icons-kit/linea/basic_eye_closed";
// import * as Yup from 'yup';
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import 'tailwindcss/tailwind.css';

// const RegisterForm = () => {

//   const [showPassword, setShowPassword] = useState(false);

//   const initialValues = {
//     email: '',
//     username: '',
//     password: '',
//     confirmPassword: '',
//     showPassword: false,
//   };

//   const validationSchema = Yup.object().shape({
//     email: Yup
//       .string()
//       .email('Invalid email')
//       .required('Email is required'),
//     username: Yup.string().required('Username is required'),
//     password: Yup.string()
//       .required('Password is required')
//       .matches(
//         /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/,
//         'Password must:\n' +
//         '• Be 8 to 15 characters long.\n' +
//         '• Contain both lowercase and uppercase letters.\n' +
//         '• Include at least one digit.\n' +
//         '• Have at least one special character (!, ", #, $...).'
//       ),
//     confirmPassword: Yup.string()
//       .required('Confirm Password is required')
//       .oneOf([Yup.ref('password'), null], 'Passwords must match'),
//   });

//   const handleSubmit = (values, { setSubmitting, resetForm }) => {

//     setTimeout(() => {
//       console.log('Submitted:', values);
//       toast.success('Registration successful!');
//       resetForm();
//       setSubmitting(false);
//     }, 1000);
//   };

//   const handleBackButtonClick = () => {
//     console.log('Назад');
//   };

//   return (
//     <Formik
//       initialValues={initialValues}
//       validationSchema={validationSchema}
//       onSubmit={handleSubmit}
//     >
//       {({ isSubmitting }) => (
//         <Form>
//           <div className="flex justify-center" >
//             <button className="w-[96px] h-[52px]" type="button" onClick={handleBackButtonClick}><Icon icon={angleLeft} size={20} />Назад
//             </button>
//           </div>

//           <div className="flex justify-around flex-row">

//             <div>
//               <div className="w-[400px] h-[450px]  flex flex-col justify-around ">
//                 <img src={Lorby} className="w-[380px] h-[410px]" alt="" />
//                 <div className="text-center">
//                   <h1 className="text-5xl font-semibold leading-[71.28px]">Lorby</h1>
//                   <h2 className="text-[28px] font-normal leading-10">
//                     Твой личный репетитор
//                   </h2>
//                 </div>
//               </div>
//             </div>

//             <div className="flex justify-center flex-col" >
//               <div className='w-[300px]' >
//                 <h3 className=' w-[250px] text-5xl text-center'>Создать аккаунт Lorby</h3>
//                 <div className="space-y-4">
//                   <div>
//                     <Field type="email" name="email" placeholder="Введи адрес почты" className="w-[250px] bg-gray-200 p-3 rounded-md" />
//                     <ErrorMessage name="email" component="div" className="error" />
//                   </div>
//                   <div>
//                     <Field type="text" name="username" placeholder="Придумай логин" className="w-[250px] bg-gray-200 p-3 rounded-md" />
//                     <ErrorMessage name="username" component="div" className="error" />
//                   </div>
//                   <div>
//                     <div className="relative">
//                       <Field
//                         type={showPassword ? "text" : "password"}
//                         name="password"
//                         placeholder="Создай пароль"
//                         className="w-[250px] pr-10 bg-gray-200 p-3 rounded-md"
//                       />
//                       <span
//                         onClick={() => setShowPassword((prev) => !prev)}
//                         className="absolute top-1/2 right-40 transform -translate-y-1/2 cursor-pointer"
//                       >
//                         <Icon
//                           className='w-[20px] h-[20px] bg-grey-500 rounded-full'
//                           icon={showPassword ? basic_eye : basic_eye_closed}
//                           size={18}
//                         />
//                       </span>
//                     </div>
//                     <ErrorMessage name="password" component="div" className="error w-[250px]" />
//                   </div>
//                   <div>
//                     <Field type="password" name="confirmPassword" placeholder="Повтори пароль" className="w-[250px] bg-gray-200 p-3 rounded-md" />
//                     <ErrorMessage name="confirmPassword" component="div" className="error" />
//                   </div>
//                 </div>
//                 <button type="submit" disabled={isSubmitting} className=" w-[250px] bg-blue-500 text-white px-4 py-2 rounded-md mt-4">
//                   {isSubmitting ? 'Submitting...' : 'Далее'}
//                 </button>
//               </div>
//             </div>
//           </div>


//         </Form>
//       )}
//     </Formik>
//   );
// };

// export default RegisterForm;

