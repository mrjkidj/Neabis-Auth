import React, { useState } from "react";
import Lorby from '../Assets/illustration.png';
import { useDispatch } from 'react-redux';
import { logout } from "..//Redux/Slices/AuthSlice";
import axios from '../Http/Settings';

const Home = () => {
    const [isOpen, setIsOpen] = useState(false);
    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);
    const dispatch = useDispatch();
    const accessToken = localStorage.getItem('accessToken');


    const handleLogout = () => {
        openModal();
    };

    const confirmLogout = async () => {
        try {
            const accessToken = localStorage.getItem('accessToken');

            if (!accessToken) {
                console.error("Токен доступа не найден.");
                return;
            }

            const config = {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            };

            await axios.get('/api/logout', config);

            dispatch(logout());
            closeModal();
            window.location.href = "/";
        } catch (error) {
            console.error('Ошибка при выходе из системы:', error);
        }
    };

    return (
        <div className="flex items-center justify-center h-screen">
            <div className="flex flex-col items-center">
                {!accessToken ? (
                    <h1 className="text-center text-black font-bold text-4xl mb-4 font-mplus">Добро пожаловать!</h1>
                ) : (
                    <h1 className="text-center text-black font-bold text-4xl mb-4 font-mplus">С возвращением!</h1>
                )}
                <p className="text-center mb-4 font-mplus">Lorby - твой личный репетитор</p>
                <div className="w-[300px] h-[300px] mt-4 mb-4">
                    <img src={Lorby} alt="" className="w-128 h-auto mx-auto" />
                </div>
                <button onClick={handleLogout} className="cursor-pointer mt-4 font-mplus">Выйти</button>
            </div>
            {isOpen && (
                <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                <div className="w-[350px] h-[250px] bg-white p-6 rounded-3xl shadow-lg flex flex-col justify-center items-center">
                    <h2 className="text-xl font-semibold mb-4 text-center font-mplus">Выйти</h2>
                    <p className="text-center">Точно выйти?</p>
                    <div className="flex flex-col justify-center items-center mt-4 w-full">
                        <button onClick={confirmLogout} className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-900 font-mplus mb-2 w-full">Да, точно</button>
                        <button onClick={closeModal} className="bg-gray-300 px-4 py-2 rounded-lg hover:bg-gray-400 font-mplus w-full">Нет, остаться</button>
                    </div>
                </div>
            </div>
            

            )}
        </div>
    );
}

export default Home;





