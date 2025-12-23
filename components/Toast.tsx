
import React from 'react';
import { CheckCircle, Info } from 'lucide-react';

interface ToastProps {
  message: string;
  type?: 'success' | 'info';
}

const Toast: React.FC<ToastProps> = ({ message, type = 'success' }) => {
  return (
    <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[100] animate-in slide-in-from-top fade-in duration-300">
      <div className={`px-4 py-2 rounded-full shadow-lg flex items-center gap-2 text-sm font-bold border ${
        type === 'success' ? 'bg-green-600 border-green-700 text-white' : 'bg-gray-800 border-gray-900 text-white'
      }`}>
        {type === 'success' ? <CheckCircle size={16}/> : <Info size={16}/>}
        {message}
      </div>
    </div>
  );
};

export default Toast;
