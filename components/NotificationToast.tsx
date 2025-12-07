import React from 'react';
import { useNotification } from '../contexts/NotificationContext';
import { CheckCircle, AlertTriangle, AlertCircle, X } from 'lucide-react';

export const NotificationToast: React.FC = () => {
  const { notifications, removeNotification } = useNotification();

  return (
    <div className="fixed top-24 right-4 z-[200] flex flex-col gap-2 pointer-events-none">
      {notifications.map((notification) => (
        <div 
          key={notification.id}
          className={`pointer-events-auto flex items-center gap-3 px-6 py-4 rounded-xl shadow-2xl border min-w-[300px] animate-in slide-in-from-right duration-300 ${
            notification.type === 'success' ? 'bg-gray-800 border-green-500 text-green-500' : 
            notification.type === 'error' ? 'bg-gray-800 border-red-500 text-red-500' : 
            'bg-gray-800 border-blue-500 text-blue-500'
          }`}
        >
           {notification.type === 'success' && <CheckCircle size={20} />}
           {notification.type === 'error' && <AlertTriangle size={20} />}
           {notification.type === 'info' && <AlertCircle size={20} />}
           <p className="text-white font-medium text-sm flex-1">{notification.message}</p>
           <button 
             onClick={() => removeNotification(notification.id)}
             className="text-gray-500 hover:text-white transition-colors"
           >
             <X size={16} />
           </button>
        </div>
      ))}
    </div>
  );
};