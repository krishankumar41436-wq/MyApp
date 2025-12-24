
import React, { useState, useMemo } from 'react';
import { 
  Plus, ArrowLeft, Edit2, Trash2, X, Activity, 
  ShoppingBag, FileText, Settings, Trash, 
  Ticket, Monitor, Smartphone, ShieldCheck, 
  TrendingUp, ToggleLeft, ToggleRight, 
  Box, Zap, Layout, ChevronDown
} from 'lucide-react';
import { Product, Order, StoreConfig, Coupon, Category } from '../types';

interface AdminViewProps {
  products: Product[];
  orders: Order[];
  onUpdateOrders: (orders: Order[]) => void;
  coupons: Coupon[];
  onUpdateCoupons: (coupons: Coupon[]) => void;
  categories: Category[];
  onUpdateCategories: (cats: Category[]) => void;
  storeConfig: StoreConfig;
  onUpdateStore: (config: StoreConfig) => void;
  onAddProduct: (p: Product) => void;
  onUpdateProduct: (p: Product) => void;
  onDeleteProduct: (id: string) => void;
  onBack: () => void;
  onOpenOrderInvoice: (o: Order) => void;
}

const AdminView: React.FC<AdminViewProps> = ({ 
  products, orders, coupons, onUpdateCoupons, 
  categories, onUpdateCategories, storeConfig, onUpdateStore, 
  onAddProduct, onUpdateProduct, onDeleteProduct, onBack, onOpenOrderInvoice 
}) => {
  const [activeTab, setActiveTab] = useState<'DASHBOARD' | 'PRODUCTS' | 'ORDERS' | 'CATEGORIES' | 'PROMOS' | 'UI_ENGINE' | 'SYSTEM'>('DASHBOARD');
  
  const [showProductModal, setShowProductModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [productForm, setProductForm] = useState<Partial<Product>>({ specifications: [] });

  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [categoryForm, setCategoryForm] = useState<Partial<Category>>({ subCategories: [] });

  const handleSaveProduct = () => {
    if (!productForm.category) {
      alert("Please assign a category");
      return;
    }

    const finalProduct = {
      ...productForm,
      id: editingProduct?.id || `P-${Date.now()}`,
      rating: productForm.rating || 4.5,
      stockCount: Number(productForm.stockCount) || 10,
      price: Number(productForm.price) || 0,
      mrp: Number(productForm.mrp) || 0,
      discount: productForm.mrp && productForm.price ? Math.round(((productForm.mrp - productForm.price) / productForm.mrp) * 100) : 0,
      specifications: productForm.specifications || []
    } as Product;

    if (editingProduct) onUpdateProduct(finalProduct);
    else onAddProduct(finalProduct);
    setShowProductModal(false);
  };

  const addSpec = () => {
    const specs = [...(productForm.specifications || [])];
    specs.push({ key: '', value: '' });
    setProductForm({ ...productForm, specifications: specs });
  };

  const handleSaveCategory = () => {
    if (!categoryForm.name) {
      alert("Category name is required");
      return;
    }

    const finalCat = {
      ...categoryForm,
      id: editingCategory?.id || `CAT-${Date.now()}`,
      subCategories: categoryForm.subCategories || []
    } as Category;

    let updated;
    if (editingCategory) {
      updated = categories.map(c => c.id === finalCat.id ? finalCat : c);
    } else {
      updated = [...categories, finalCat];
    }
    onUpdateCategories(updated);
    setShowCategoryModal(false);
  };

  const addSubCategory = () => {
    const subs = [...(categoryForm.subCategories || [])];
    subs.push({ id: `SUB-${Date.now()}`, name: '', icon: '' });
    setCategoryForm({ ...categoryForm, subCategories: subs });
  };

  const removeSubCategory = (subId: string) => {
    setCategoryForm({
      ...categoryForm,
      subCategories: (categoryForm.subCategories || []).filter(s => s.id !== subId)
    });
  };

  const deleteCategory = (id: string) => {
    if (confirm("Delete this category?")) {
      onUpdateCategories(categories.filter(c => c.id !== id));
    }
  };

  const ToggleSwitch = ({ label, value, onToggle, icon: Icon }: { label: string, value: boolean, onToggle: () => void, icon?: any }) => (
    <div className="flex items-center justify-between p-3 bg-white rounded-xl border border-gray-100 mb-1.5 shadow-sm">
      <div className="flex items-center gap-2">
        {Icon && <Icon size={14} className={value ? 'text-red-600' : 'text-gray-300'} />}
        <span className="text-[9px] font-black text-black uppercase tracking-widest">{label}</span>
      </div>
      <button onClick={onToggle} className="transition-transform active:scale-90">
        {value ? <ToggleRight size={28} className="text-red-600" /> : <ToggleLeft size={28} className="text-gray-300" />}
      </button>
    </div>
  );

  const SectionHeader = ({ title, icon: Icon }: { title: string, icon: any }) => (
    <div className="flex items-center gap-2 mb-3 mt-6 first:mt-0 px-1">
      <div className="p-1 bg-gray-900 text-white rounded"><Icon size={10} /></div>
      <h3 className="text-[9px] font-black text-gray-400 uppercase tracking-[3px]">{title}</h3>
    </div>
  );

  const currentSelectedCategoryObj = useMemo(() => 
    categories.find(c => c.name === productForm.category), 
    [productForm.category, categories]
  );

  return (
    <div className="fixed inset-0 bg-gray-50 z-[200] flex flex-col animate-in fade-in max-w-md mx-auto h-full">
      <div className="bg-white border-b border-gray-100 px-3 h-14 flex items-center justify-between shrink-0 shadow-sm">
        <div className="flex items-center gap-2">
          <button onClick={onBack} className="p-1.5 text-black active:bg-gray-100 rounded-full">
            <ArrowLeft size={20}/>
          </button>
          <div>
            <h1 className="text-[8px] font-black text-red-600 uppercase tracking-widest leading-none">Admin</h1>
            <p className="text-[10px] font-black text-black uppercase tracking-widest">Master Control</p>
          </div>
        </div>
        <div className="bg-green-50 px-2 py-1 rounded-lg border border-green-100 flex items-center gap-1.5">
          <div className="w-1 h-1 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-[7px] font-black text-green-700 uppercase">Live</span>
        </div>
      </div>

      <div className="flex bg-white border-b border-gray-100 overflow-x-auto no-scrollbar scroll-smooth shrink-0">
        {[
          { id: 'DASHBOARD', icon: <Activity size={14}/> },
          { id: 'PRODUCTS', icon: <ShoppingBag size={14}/> },
          { id: 'CATEGORIES', icon: <Layout size={14}/> },
          { id: 'ORDERS', icon: <FileText size={14}/> },
          { id: 'PROMOS', icon: <Ticket size={14}/> },
          { id: 'UI_ENGINE', icon: <Monitor size={14}/> },
          { id: 'SYSTEM', icon: <Settings size={14}/> }
        ].map((t) => (
          <button 
            key={t.id}
            onClick={() => setActiveTab(t.id as any)}
            className={`flex-shrink-0 px-5 py-3 flex flex-col items-center gap-1 transition-all relative ${activeTab === t.id ? 'text-red-600' : 'text-gray-300'}`}
          >
            {t.icon}
            <span className="text-[6px] font-black uppercase tracking-tighter">{t.id}</span>
            {activeTab === t.id && <div className="absolute bottom-0 left-3 right-3 h-0.5 bg-red-600 rounded-t-full shadow-lg shadow-red-100" />}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto p-3 no-scrollbar pb-24">
        {activeTab === 'DASHBOARD' && (
          <div className="space-y-3 animate-in fade-in">
            <div className="bg-black p-6 rounded-[2rem] text-white shadow-2xl relative overflow-hidden">
              <p className="text-[8px] text-gray-500 font-black uppercase tracking-[4px] mb-1.5">Gross Revenue</p>
              <h3 className="text-3xl font-black italic tracking-tighter">₹{orders.reduce((acc, o) => acc + o.total, 0).toLocaleString()}</h3>
              <div className="grid grid-cols-2 gap-3 mt-6">
                <div className="bg-white/5 p-3 rounded-xl border border-white/10 text-center">
                  <p className="text-[7px] uppercase text-gray-400 font-black">Sales</p>
                  <p className="text-lg font-black">{orders.length}</p>
                </div>
                <div className="bg-white/5 p-3 rounded-xl border border-white/10 text-center">
                  <p className="text-[7px] uppercase text-gray-400 font-black">SKUs</p>
                  <p className="text-lg font-black">{products.length}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'PRODUCTS' && (
          <div className="space-y-3 animate-in fade-in">
            <button 
              onClick={() => { setEditingProduct(null); setProductForm({ category: categories[0]?.name || '', subCategory: '', specifications: [] }); setShowProductModal(true); }}
              className="w-full h-12 bg-red-600 text-white rounded-xl font-black uppercase tracking-[3px] text-[9px] flex items-center justify-center gap-2 shadow-xl active:scale-95 transition-all"
            >
              <Plus size={16}/> Add SKU
            </button>
            <div className="space-y-2">
              {products.map(p => (
                <div key={p.id} className="p-3 bg-white border border-gray-100 rounded-2xl flex items-center gap-3 shadow-sm group">
                  <img src={p.image} className="w-12 h-16 object-cover rounded-lg bg-gray-50 shadow-inner" />
                  <div className="flex-1 min-w-0">
                    <p className="text-[7px] font-black text-red-500 uppercase tracking-widest">{p.brand}</p>
                    <h4 className="text-[10px] font-black text-black uppercase truncate mt-0.5">{p.title}</h4>
                    <p className="text-[7px] text-gray-400 font-bold uppercase mt-0.5">
  {p.category} → {p.subCategory}
</p>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <button onClick={() => { setEditingProduct(p); setProductForm(p); setShowProductModal(true); }} className="p-1.5 bg-gray-50 rounded-lg text-black active:bg-gray-100"><Edit2 size={12}/></button>
                    <button onClick={() => onDeleteProduct(p.id)} className="p-1.5 bg-red-50 rounded-lg text-red-600 active:bg-red-100"><Trash size={12}/></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'CATEGORIES' && (
          <div className="space-y-3 animate-in fade-in">
            <button 
              onClick={() => { setEditingCategory(null); setCategoryForm({ subCategories: [] }); setShowCategoryModal(true); }}
              className="w-full h-12 bg-black text-white rounded-xl font-black uppercase tracking-[3px] text-[9px] flex items-center justify-center gap-2 shadow-xl active:scale-95 transition-all"
            >
              <Plus size={16}/> New Category
            </button>
            <div className="space-y-2">
              {categories.map(c => (
                <div key={c.id} className="bg-white p-3 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-3 group">
                  <div className="w-11 h-11 rounded-xl overflow-hidden border border-gray-100 bg-gray-50">
                    <img src={c.icon} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-[10px] font-black text-gray-900 uppercase tracking-tight">{c.name}</h4>
                    <p className="text-[8px] font-bold text-gray-400 uppercase mt-0.5">{c.subCategories?.length || 0} Units</p>
                  </div>
                  <div className="flex gap-1.5">
                    <button onClick={() => { setEditingCategory(c); setCategoryForm(c); setShowCategoryModal(true); }} className="p-2 bg-gray-50 rounded-lg text-gray-800"><Edit2 size={14}/></button>
                    <button onClick={() => deleteCategory(c.id)} className="p-2 bg-red-50 rounded-lg text-red-600"><Trash2 size={14}/></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'UI_ENGINE' && (
          <div className="space-y-4 animate-in slide-in-from-right duration-300">
            <SectionHeader title="UI Engine" icon={Monitor} />
            <ToggleSwitch label="Hero Spotlight" value={storeConfig.showHero} onToggle={() => onUpdateStore({...storeConfig, showHero: !storeConfig.showHero})} icon={Smartphone} />
            <ToggleSwitch label="Flash Sale" value={storeConfig.showFlashSale} onToggle={() => onUpdateStore({...storeConfig, showFlashSale: !storeConfig.showFlashSale})} icon={Zap} />
            <ToggleSwitch label="Trending" value={storeConfig.showTrending} onToggle={() => onUpdateStore({...storeConfig, showTrending: !storeConfig.showTrending})} icon={TrendingUp} />
            <ToggleSwitch label="Categories" value={storeConfig.showCategories} onToggle={() => onUpdateStore({...storeConfig, showCategories: !storeConfig.showCategories})} icon={Box} />
          </div>
        )}
      </div>

      {showCategoryModal && (
        <div className="fixed inset-0 z-[300] bg-white flex flex-col animate-in slide-in-from-bottom duration-300 h-full max-w-md mx-auto">
          <div className="h-12 px-3 border-b border-gray-200 flex items-center justify-between shrink-0">
            <span className="text-[10px] font-black text-black uppercase tracking-[1.5px]">{editingCategory ? 'Update Taxonomy' : 'Create Registry'}</span>
            <button onClick={() => setShowCategoryModal(false)} className="p-1.5 active:bg-gray-100 rounded-full"><X size={20}/></button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-5 pb-24 no-scrollbar bg-gray-50/30">
            <div className="space-y-4">
              <div>
                <label className="text-[8px] font-black text-gray-400 uppercase tracking-widest block mb-1.5">Category Name</label>
                <input value={categoryForm.name || ''} onChange={e => setCategoryForm({...categoryForm, name: e.target.value})} className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-xs font-bold text-black outline-none focus:border-red-600" />
              </div>
              <div>
                <label className="text-[8px] font-black text-gray-400 uppercase tracking-widest block mb-1.5">Icon Asset URL</label>
                <input value={categoryForm.icon || ''} onChange={e => setCategoryForm({...categoryForm, icon: e.target.value})} className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-[10px] font-bold text-black outline-none" />
              </div>
            </div>
            <div className="pt-6 border-t border-gray-200">
              <div className="flex justify-between items-center mb-4">
                <span className="text-[9px] font-black text-black uppercase tracking-[2px]">Sub-Registry</span>
                <button onClick={addSubCategory} className="text-[8px] font-black text-blue-600 border border-blue-100 bg-blue-50 px-2 py-1 rounded uppercase">+ Add</button>
              </div>
              <div className="space-y-3">
                {(categoryForm.subCategories || []).map((sub, idx) => (
                  <div key={sub.id} className="p-3 bg-white border border-gray-200 rounded-xl space-y-2 relative group">
                    <button onClick={() => removeSubCategory(sub.id)} className="absolute top-3 right-3 text-red-400"><X size={12}/></button>
                    <input placeholder="Label" value={sub.name} onChange={e => {
                      const s = [...(categoryForm.subCategories || [])];
                      s[idx].name = e.target.value;
                      setCategoryForm({...categoryForm, subCategories: s});
                    }} className="w-full bg-transparent border-b border-gray-100 py-0.5 text-[10px] font-bold text-black outline-none" />
                    <input placeholder="Icon URL" value={sub.icon} onChange={e => {
                      const s = [...(categoryForm.subCategories || [])];
                      s[idx].icon = e.target.value;
                      setCategoryForm({...categoryForm, subCategories: s});
                    }} className="w-full bg-transparent text-[8px] text-gray-400 outline-none" />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="p-3 border-t border-gray-100 bg-white sticky bottom-0">
            <button onClick={handleSaveCategory} className="w-full h-12 bg-black text-white rounded-xl font-black uppercase text-[10px] tracking-[3px] shadow-2xl active:scale-95 transition-all">Secure Save</button>
          </div>
        </div>
      )}

      {showProductModal && (
        <div className="fixed inset-0 z-[300] bg-white flex flex-col animate-in slide-in-from-bottom duration-300 h-full max-w-md mx-auto">
          <div className="h-12 px-3 border-b border-gray-200 flex items-center justify-between shrink-0">
            <span className="text-[10px] font-black text-black uppercase tracking-[1.5px]">{editingProduct ? 'Update SKU' : 'New Master SKU'}</span>
            <button onClick={() => setShowProductModal(false)} className="p-1.5 active:bg-gray-100 rounded-full"><X size={20}/></button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-5 pb-24 no-scrollbar bg-gray-50/10">
            <div className="space-y-4">
              <div>
                <label className="text-[8px] font-black text-gray-400 uppercase tracking-widest block mb-1.5">Taxonomy</label>
                <div className="relative">
                  <select 
                    value={productForm.category || ''} 
                    onChange={e => setProductForm({...productForm, category: e.target.value, subCategory: ''})}
                    className="w-full appearance-none bg-white border border-gray-300 rounded-lg px-4 py-3 text-xs font-bold text-black outline-none focus:border-red-600 transition-colors"
                  >
                    <option value="">Select Category</option>
                    {categories.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                  </select>
                  <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400" />
                </div>
              </div>

              {currentSelectedCategoryObj && (
                <div className="animate-in slide-in-from-top duration-200">
                  <label className="text-[8px] font-black text-gray-400 uppercase tracking-widest block mb-1.5">Sub-Cluster</label>
                  <div className="relative">
                    <select 
                      value={productForm.subCategory || ''} 
                      onChange={e => setProductForm({...productForm, subCategory: e.target.value})}
                      className="w-full appearance-none bg-white border border-gray-300 rounded-lg px-4 py-3 text-xs font-bold text-black outline-none focus:border-red-600 transition-colors"
                    >
                      <option value="">Select Sub-Category</option>
                      {currentSelectedCategoryObj.subCategories.map(s => <option key={s.id} value={s.name}>{s.name}</option>)}
                    </select>
                    <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400" />
                  </div>
                </div>
              )}

              <div>
                <label className="text-[8px] font-black text-gray-400 uppercase tracking-widest block mb-1.5">Master Title</label>
                <input value={productForm.title || ''} onChange={e => setProductForm({...productForm, title: e.target.value})} className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-xs font-bold text-black outline-none focus:border-red-600" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[8px] font-black text-gray-400 uppercase tracking-widest block mb-1.5">Price (₹)</label>
                  <input type="number" value={productForm.price || ''} onChange={e => setProductForm({...productForm, price: Number(e.target.value)})} className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-xs font-bold text-black outline-none" />
                </div>
                <div>
                  <label className="text-[8px] font-black text-gray-400 uppercase tracking-widest block mb-1.5">MRP (₹)</label>
                  <input type="number" value={productForm.mrp || ''} onChange={e => setProductForm({...productForm, mrp: Number(e.target.value)})} className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-xs font-bold text-black outline-none" />
                </div>
              </div>

              <div>
                <label className="text-[8px] font-black text-gray-400 uppercase tracking-widest block mb-1.5">Asset URL</label>
                <input value={productForm.image || ''} onChange={e => setProductForm({...productForm, image: e.target.value})} className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-[10px] font-bold text-black outline-none" />
              </div>
            </div>

            <div className="pt-6 border-t border-gray-100">
              <div className="flex justify-between items-center mb-4">
                <span className="text-[9px] font-black text-black uppercase tracking-[2px]">Properties</span>
                <button onClick={addSpec} className="text-[8px] font-black text-blue-600 uppercase">+ Add</button>
              </div>
              <div className="space-y-3">
                {(productForm.specifications || []).map((spec, idx) => (
                  <div key={idx} className="flex gap-2">
                    <input placeholder="Key" value={spec.key} onChange={e => {
                      const s = [...(productForm.specifications || [])];
                      s[idx].key = e.target.value;
                      setProductForm({...productForm, specifications: s});
                    }} className="flex-1 border border-gray-300 rounded-lg px-3 py-2.5 text-[10px] font-bold text-black outline-none" />
                    <input placeholder="Val" value={spec.value} onChange={e => {
                      const s = [...(productForm.specifications || [])];
                      s[idx].value = e.target.value;
                      setProductForm({...productForm, specifications: s});
                    }} className="flex-1 border border-gray-300 rounded-lg px-3 py-2.5 text-[10px] font-bold text-black outline-none" />
                    <button onClick={() => setProductForm({...productForm, specifications: productForm.specifications?.filter((_, i) => i !== idx)})} className="p-2 text-red-500 bg-red-50 rounded-lg"><Trash size={14}/></button>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="p-3 border-t border-gray-100 bg-white sticky bottom-0">
            <button onClick={handleSaveProduct} className="w-full h-12 bg-black text-white rounded-xl font-black uppercase text-[10px] tracking-[3px] shadow-2xl active:scale-95 transition-all">Save SKU</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminView;
