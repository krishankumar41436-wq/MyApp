
import React from 'react';
import { ArrowLeft, Plus, Home, Briefcase, MapPin, CheckCircle2, ChevronRight } from 'lucide-react';
import { Address } from '../types';
import { ACCENT_COLOR } from '../constants';

interface AddressListViewProps {
  addresses: Address[];
  onAdd: () => void;
  onSelect: (addr: Address) => void;
  onBack: () => void;
}

const AddressListView: React.FC<AddressListViewProps> = ({ addresses, onAdd, onSelect, onBack }) => {
  return (
    <div className="h-full bg-gray-50 flex flex-col animate-in slide-in-from-right duration-300">
      {/* PROFESSIONAL HEADER */}
      <div className="bg-white px-4 py-3 border-b border-gray-100 flex items-center gap-4 sticky top-0 z-20 shadow-sm">
         <button onClick={onBack} className="p-2 bg-gray-50 rounded-full active:scale-90 transition-transform">
           <ArrowLeft size={20} className="text-gray-400"/>
         </button>
         <h1 className="text-sm font-black uppercase tracking-widest text-gray-900">Address Hub</h1>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar p-5 pb-32">
        <div className="flex items-center gap-2 mb-6">
           <div className="w-1 h-3 bg-red-600 rounded-full"></div>
           <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Saved Locations</h3>
        </div>

        {addresses.map((addr) => (
          <div 
            key={addr.id} 
            className={`bg-white rounded-3xl p-6 border transition-all mb-4 relative cursor-pointer group active:scale-[0.98]
              ${addr.isDefault ? 'border-red-600 shadow-md' : 'border-gray-100 shadow-sm'}`}
            onClick={() => onSelect(addr)}
          >
            {addr.isDefault && (
              <div className="absolute top-6 right-6 text-red-600">
                 <CheckCircle2 size={20} />
              </div>
            )}
            
            <div className="flex items-center gap-3 mb-4">
              <div className={`p-2.5 rounded-xl ${addr.isDefault ? 'bg-red-600 text-white' : 'bg-gray-50 text-gray-400'}`}>
                {addr.type === 'HOME' ? <Home size={18}/> : <Briefcase size={18}/>}
              </div>
              <p className="text-xs font-black uppercase tracking-tight text-gray-900">{addr.name}</p>
            </div>

            <div className="text-[11px] text-gray-500 font-medium leading-relaxed uppercase tracking-tight space-y-1">
              <p className="line-clamp-1">{addr.house}</p>
              <p className="line-clamp-1">{addr.area}</p>
              <div className="flex items-center gap-2 pt-2 border-t border-gray-50 mt-3">
                 <span className="text-[10px] font-black text-gray-900">PIN: {addr.pincode}</span>
                 <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                 <span className="text-[10px] font-black text-gray-900">+91 {addr.mobile}</span>
              </div>
            </div>
          </div>
        ))}

        <button 
          onClick={onAdd}
          className="w-full h-16 bg-white border-2 border-dashed border-gray-200 rounded-3xl flex items-center justify-center gap-3 text-red-600 font-black text-[10px] uppercase tracking-[3px] active:bg-red-50 transition-all mt-4"
        >
          <Plus size={18} /> Add New Hub
        </button>
      </div>

      {/* Action Info */}
      <div className="p-6 bg-white border-t border-gray-100 sticky bottom-0 text-center shadow-[0_-10px_20px_rgba(0,0,0,0.03)]">
         <p className="text-[9px] font-black text-gray-300 uppercase tracking-[4px]">Select destination to proceed</p>
      </div>
    </div>
  );
};

export default AddressListView;
