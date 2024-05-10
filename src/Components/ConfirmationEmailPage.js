import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Icon } from "react-icons-kit";
import { angleLeft } from "react-icons-kit/fa/angleLeft";
import Lorby from "../Assets/illustration.png";
import { useDispatch, useSelector } from "react-redux";
import { resendConfirmationEmail } from "../Redux/Slices/AuthSlice";
import 'tailwindcss/tailwind.css';

const ConfirmationEmailPage = ({ email }) => {
    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate(); 
    const enabled = useSelector(state => state.auth.enabled); 

    useEffect(() => {
      
        if (enabled) {
            navigate("/home");
        }
    }, [enabled, navigate]); 

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    const handleResendAndOpenModal = async () => {
        try {
            await dispatch(resendConfirmationEmail());
            console.log("Подтверждающее сообщение отправлено повторно");
            openModal(); // Открыть модальное окно после успешной отправки письма
        } catch (error) {
            console.error("Ошибка при отправке повторного подтверждающего сообщения:", error);
            alert("Произошла ошибка при отправке повторного подтверждающего сообщения!");
        }
    };
    


    return (
        <div>
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
            <div className="h-[100vh]  flex justify-evenly">
                <div className="w-96 flex flex-col justify-center items-center">
                    <img src={Lorby} alt="" className="w-[480px] h-[400px] mb-[5px]" />
                    <div className="text-center">
                        <h1 className="text-5xl font-semibold leading-12 mb-[10px] font-mplus">Lorby</h1>
                        <h2 className="text-2xl font-normal leading-6 mb-[120px] font-mplus">
                            Твой личный репетитор
                        </h2>
                    </div>
                </div>
                <div className="w-[343px] h-[550px] flex flex-col justify-center gap-[30px]">
                    <div className="w-[300px] text-center">
                        <h2 className="text-xl font-semibold text-[19px] leading-[25px] mb-[10px] font-mplus">
                            Выслали письмо со ссылкой для завершения регистрации на {email}
                        </h2>
                        <p className="mt-12 text-[15px] mb-[20px] font-mplus">
                            Если письмо не пришло, не спешите ждать своей почты - лучше <strong>проверьте ящик “Спам”</strong>
                        </p>
                        <p className="text-center mb-[50px]"><strong>(´｡• ω •｡`)</strong></p>
                        <div>
                            <p onClick={handleResendAndOpenModal} className="cursor-pointer mb-[100px]">Письмо не пришло</p>
                            {isOpen && (
                                <div className="w-[350px] h-[250px] fixed top-1/4 left-1/2 transform -translate-x-1/2 bg-white p-6 rounded-3xl shadow-lg z-50">
                                    <h2 className="text-xl font-semibold mb-4 font-mplus">Мы выслали еще одно письмо на указанную вами почту {email}</h2>
                                    <p className="font-mplus">Не забудьте проверить ящик “Спам”!</p>
                                    <button onClick={closeModal} className="w-[300px] mt-4 bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-900 font-mplus">Понятно!</button>
                                </div>
                            )}
                            {isOpen && <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 z-40" onClick={closeModal}></div>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationEmailPage;



