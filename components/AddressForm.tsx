
import React, { useState } from 'react';
import { MapPin, ArrowLeft, ShieldCheck, ChevronRight } from 'lucide-react';
import { ACCENT_COLOR } from '../constants';

interface AddressFormProps {
  onSave: (addr: any) => void;
  onCancel: () => void;
}

const AddressForm: React.FC<AddressFormProps> = ({ onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    pincode: '',
    house: '',
    area: '',
    type: 'HOME' as 'HOME' | 'OFFICE'
  });

  const handleSubmit = () => {
    if (!formData.name || !formData.mobile || !formData.pincode) {
      alert("Please fill all required identifiers.");
      return;
    }
    onSave(formData);
  };

  return (
    <div className="bg-white min-h-screen flex flex-col animate-in slide-in-from-bottom duration-500">
      {/* Premium Header */}
      <div className="px-4 py-3 border-b border-gray-100 flex items-center gap-4 sticky top-0 bg-white z-50 shadow-sm">
        <button onClick={onCancel} className="p-2 bg-gray-50 rounded-full active:scale-90 transition-all">
          <ArrowLeft size={20} className="text-gray-400" />
        </button>
        <h2 className="text-sm font-black text-gray-900 uppercase tracking-widest">Entry Registry</h2>
      </div>

      <div className="flex-1 p-8 space-y-8 overflow-y-auto no-scrollbar pb-32 bg-gray-50/30">
        <div className="flex items-center gap-2 mb-2">
           <div className="w-1 h-3 bg-red-600 rounded-full"></div>
           <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Client Credentials</h3>
        </div>

        <div className="space-y-6">
          <div className="space-y-1.5 group">
            <label className="text-[9px] font-black text-gray-400 uppercase tracking-[4px] group-focus-within:text-red-600 transition-colors">Recipient Identity</label>
            <input 
              type="text" 
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              placeholder="Ex: ARYAN SHARMA" 
              className="w-full bg-white border border-gray-100 rounded-2xl px-5 py-4 outline-none text-sm font-black tracking-tight focus:border-red-600 transition-all shadow-sm" 
            />
          </div>

          <div className="space-y-1.5 group">
            <label className="text-[9px] font-black text-gray-400 uppercase tracking-[4px] group-focus-within:text-red-600 transition-colors">Contact Hub</label>
            <div className="flex items-center bg-white border border-gray-100 rounded-2xl px-5 focus-within:border-red-600 transition-all shadow-sm">
              <span className="text-sm font-black text-gray-300 pr-3 border-r border-gray-50">+91</span>
              <input 
                type="tel" 
                value={formData.mobile}
                onChange={(e) => setFormData({...formData, mobile: e.target.value})}
                placeholder="10-DIGIT MOBILE" 
                className="w-full py-4 pl-3 outline-none text-sm font-black tracking-widest bg-transparent" 
              />
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-1 space-y-1.5 group">
              <label className="text-[9px] font-black text-gray-400 uppercase tracking-[4px] group-focus-within:text-red-600 transition-colors">ZIP Code</label>
              <input 
                type="number" 
                value={formData.pincode}
                onChange={(e) => setFormData({...formData, pincode: e.target.value})}
                placeholder="6-DIGIT PIN" 
                className="w-full bg-white border border-gray-100 rounded-2xl px-5 py-4 outline-none text-sm font-black tracking-widest focus:border-red-600 shadow-sm" 
              />
            </div>
            <button className="flex items-center gap-2 text-[9px] font-black text-white bg-gray-900 px-6 rounded-2xl self-end h-14 uppercase tracking-widest shadow-xl active:scale-95 transition-transform">
              <MapPin size={16} className="text-red-600" /> Locate
            </button>
          </div>

          <div className="space-y-1.5 group">
            <label className="text-[9px] font-black text-gray-400 uppercase tracking-[4px] group-focus-within:text-red-600 transition-colors">Flat / Building / Estate</label>
            <input 
              type="text" 
              value={formData.house}
              onChange={(e) => setFormData({...formData, house: e.target.value})}
              placeholder="APT NO, TOWER, FLOOR..." 
              className="w-full bg-white border border-gray-100 rounded-2xl px-5 py-4 outline-none text-sm font-black uppercase tracking-tight focus:border-red-600 shadow-sm" 
            />
          </div>

          <div className="space-y-1.5 group">
            <label className="text-[9px] font-black text-gray-400 uppercase tracking-[4px] group-focus-within:text-red-600 transition-colors">Locality Hub</label>
            <input 
              type="text" 
              value={formData.area}
              onChange={(e) => setFormData({...formData, area: e.target.value})}
              placeholder="STREET, LANDMARK, CITY..." 
              className="w-full bg-white border border-gray-100 rounded-2xl px-5 py-4 outline-none text-sm font-black uppercase tracking-tight focus:border-red-600 shadow-sm" 
            />
          </div>

          <div className="space-y-4">
             <label className="text-[9px] font-black text-gray-400 uppercase tracking-[4px]">Tag Consignment as</label>
             <div className="flex gap-4">
                <button 
                  onClick={() => setFormData({...formData, type: 'HOME'})}
                  className={`flex-1 h-14 rounded-2xl font-black text-[10px] uppercase flex items-center justify-center gap-3 border-2 transition-all ${formData.type === 'HOME' ? 'border-gray-900 bg-gray-900 text-white shadow-lg' : 'border-white bg-white text-gray-400 shadow-sm'}`}
                >
                  RESIDENCE
                </button>
                <button 
                  onClick={() => setFormData({...formData, type: 'OFFICE'})}
                  className={`flex-1 h-14 rounded-2xl font-black text-[10px] uppercase flex items-center justify-center gap-3 border-2 transition-all ${formData.type === 'OFFICE' ? 'border-gray-900 bg-gray-900 text-white shadow-lg' : 'border-white bg-white text-gray-400 shadow-sm'}`}
                >
                  BUSINESS
                </button>
             </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-[2rem] border border-gray-100 flex items-center gap-4 shadow-sm">
           <div className="w-12 h-12 bg-red-50 rounded-2xl flex items-center justify-center text-red-600">
             <ShieldCheck size={24} />
           </div>
           <p className="text-[10px] font-bold text-gray-600 uppercase leading-snug tracking-tight">Encryption Active. Your location data is AES-Protected.</p>
        </div>
      </div>

      {/* FINAL ACTION BAR */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100 z-50 shadow-[0_-15px_30px_rgba(0,0,0,0.05)]">
        <button 
          onClick={handleSubmit}
          className="w-full h-16 rounded-2xl bg-red-600 text-white font-black uppercase tracking-[4px] text-[11px] shadow-xl active:scale-[0.98] transition-all flex items-center justify-center gap-4 group"
        >
          Secure Save <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};

export default AddressForm;
