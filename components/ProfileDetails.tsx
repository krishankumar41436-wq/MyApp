
import React from 'react';
import { ChevronLeft, User, Mail, Phone, ShieldCheck, Camera } from 'lucide-react';

interface ProfileDetailsProps {
  onBack: () => void;
}

const ProfileDetails: React.FC<ProfileDetailsProps> = ({ onBack }) => {
  return (
    <div className="bg-white min-h-screen flex flex-col p-6 animate-in slide-in-from-right duration-300">
      <button onClick={onBack} className="mb-8 flex items-center gap-2 text-gray-400 font-black uppercase text-[10px] tracking-widest active:scale-95 transition-all">
        <ChevronLeft size={16}/> Back
      </button>
      
      <div className="space-y-8">
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <div className="w-24 h-24 bg-gray-100 rounded-[2.5rem] flex items-center justify-center border-2 border-red-50 shadow-inner overflow-hidden">
               <User size={40} className="text-gray-300" />
            </div>
            <button className="absolute -bottom-2 -right-2 p-2 bg-red-600 text-white rounded-2xl shadow-lg border-2 border-white">
              <Camera size={14} />
            </button>
          </div>
          <h2 className="text-2xl font-black uppercase italic">User Profile</h2>
        </div>

        <div className="space-y-5">
          <div className="bg-gray-50 p-6 rounded-3xl border border-gray-100 space-y-6">
            <div className="flex items-start gap-4">
              <User size={18} className="text-red-600 mt-1" />
              <div className="flex-1">
                <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Legal Full Name</p>
                <p className="text-sm font-black uppercase text-gray-900">Aryan Sharma</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <Mail size={18} className="text-red-600 mt-1" />
              <div className="flex-1">
                <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Primary Email</p>
                <p className="text-sm font-black text-gray-900">aryan.sharma@elite.com</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Phone size={18} className="text-red-600 mt-1" />
              <div className="flex-1">
                <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Verified Mobile</p>
                <p className="text-sm font-black tracking-widest text-gray-900">+91 9876543210</p>
              </div>
            </div>
          </div>

          <div className="p-5 bg-green-50 rounded-2xl border border-green-100 flex items-center gap-3">
             <ShieldCheck size={20} className="text-green-600" />
             <p className="text-[10px] font-black text-green-800 uppercase tracking-tight leading-snug">Account is Multi-Factor Authenticated & Secured</p>
          </div>
        </div>

        <button className="w-full py-5 bg-gray-900 text-white rounded-[2rem] font-black uppercase text-[11px] tracking-[3px] shadow-xl active:scale-[0.98] transition-all">
          Update Records
        </button>
      </div>
    </div>
  );
};

export default ProfileDetails;
