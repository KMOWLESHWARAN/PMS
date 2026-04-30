import React, { useState, useEffect } from 'react';
import { Bell, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function Navbar() {
    const navigate = useNavigate();
    const [notifications, setNotification] = useState([]);
    const [showNotifications, setShowNotifications] = useState(false);

    useEffect(() => {
        const fetchNotification = async () => {
            try {
                const token = localStorage.getItem("token");
                const res = await fetch("http://localhost:5000/api/notifications", {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                if (res.ok) {
                    const data = await res.json();
                    setNotification(data.notifications);
                }
            } catch (err) {
                console.error("Failed to fetch notifications", err);
            }

        };
        const userStr = localStorage.getItem("user");
        if (userStr) {
            const user = JSON.parse(userStr);
            if (user.role === 'admin') {
                fetchNotification();
            }
        }
    }, []);

    const unreadCount = notifications.filter(n => !n.isRead).length;

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/");
    };
    
    const markRead = async (id) => {
        try {
            const token = localStorage.getItem("token");
            await fetch(`http://localhost:5000/api/notifications/${id}/read`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setNotification(notifications.map(n =>
                n.id === id ? { ...n, isRead: true } : n
            ));
        } catch (err) {
            console.error("Failed", err);
        }
    };

    return (
        <div className="bg-white shadow-sm px-6 py-4 flex justify-end items-center gap-6 mb-6 rounded-lg">

            <div className="relative">
                <button
                    onClick={() => setShowNotifications(!showNotifications)}
                    className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-full transition duration-200"
                >
                    <Bell size={24} />
                    {unreadCount > 0 && (
                        <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center border-2 border-white">
                            {unreadCount}
                        </span>
                    )}
                </button>

                {showNotifications && (
                    <div className="absolute right-0 mt-2 w-80 bg-white border shadow-lg rounded-lg z-50 overflow-hidden">
                        <div className="bg-gray-50 px-4 py-3 border-b font-semibold text-gray-700 flex justify-between items-center">
                            <span>Notifications</span>
                            {unreadCount > 0 && <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">{unreadCount} new</span>}
                        </div>

                        <div className="max-h-64 overflow-y-auto">
                            {notifications.length === 0 ? (
                                <div className="p-4 text-center text-gray-500 text-sm">No new notifications</div>
                            ) : (
                                notifications.map(notif => (
                                    <div
                                        key={notif.id}
                                        onClick={() => { if (!notif.isRead) markRead(notif.id); }}
                                        className={`p-4 border-b cursor-pointer transition ${notif.isRead ? 'bg-white text-gray-500' : 'bg-blue-50 font-medium text-gray-800'}`}
                                    >
                                        <p className="text-sm">{notif.message}</p>
                                        <span className="text-xs text-gray-400 mt-1 block">
                                            {new Date(notif.createdAt).toLocaleDateString()}
                                        </span>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                )}
            </div>
            <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 hover:bg-red-100 font-medium rounded-lg transition duration-200"
            >
                <LogOut size={18} />
                Logout
            </button>
        </div>
    )
}

export default Navbar;