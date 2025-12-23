
import React, { useState, useMemo } from 'react';
import { 
  Plus, ArrowLeft, Edit2, Trash2, X, Activity, 
  ShoppingBag, FileText, Settings, Save, Trash, 
  Ticket, Monitor, Smartphone, ShieldCheck, 
  TrendingUp, Phone, ToggleLeft, ToggleRight, 
  User, CreditCard, Share2, Star, Truck, Box, Zap,
  MapPin, CheckCircle2, Layout, Image as ImageIcon,
  ChevronDown, ChevronRight
} from 'lucide-react';
import { Product, Order, StoreConfig, Coupon, Category, SubCategory } from '../types';

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
  products, orders, onUpdateOrders, coupons, onUpdateCoupons, 
  categories, onUpdateCategories, storeConfig, onUpdateStore, 
  onAddProduct, onUpdateProduct, onDeleteProduct, onBack, onOpenOrderInvoice 
}) => {
  const [activeTab, setActiveTab] = useState<'DASHBOARD' | 'PRODUCTS' | 'ORDERS' | 'CATEGORIES' | 'PROMOS' | 'UI_ENGINE' | 'SYSTEM'>('DASHBOARD');
  
  // Product Modal State
  const [showProductModal, setShowProductModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [productForm, setProductForm] = useState<Partial<Product>>({ specifications: [] });

  // Category Modal State
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [categoryForm, setCategoryForm] = useState<Partial<Category>>({ subCategories: [] });

  // 1. PRODUCT HANDLERS
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

  // 2. CATEGORY HANDLERS
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
    if (confirm("Delete this category? Products within it may lose their mapping.")) {
      onUpdateCategories(categories.filter(c => c.id !== id));
    }
  };

  // UI Components
  const ToggleSwitch = ({ label, value, onToggle, icon: Icon }: { label: string, value: boolean, onToggle: () => void, icon?: any }) => (
    <div className="flex items-center justify-between p-4 bg-white rounded-2xl border border-gray-100 mb-2 shadow-sm">
      <div className="flex items-center gap-3">
        {Icon && <Icon size={16} className={value ? 'text-red-600' : 'text-gray-300'} />}
        <span className="text-[10px] font-black text-black uppercase tracking-widest">{label}</span>
      </div>
      <button onClick={onToggle} className="transition-transform active:scale-90">
        {value ? <ToggleRight size={32} className="text-red-600" /> : <ToggleLeft size={32} className="text-gray-300" />}
      </button>
    </div>
  );

  const SectionHeader = ({ title, icon: Icon }: { title: string, icon: any }) => (
    <div className="flex items-center gap-2 mb-4 mt-8 first:mt-0 px-1">
      <div className="p-1.5 bg-gray-900 text-white rounded-lg"><Icon size={12} /></div>
      <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[4px]">{title}</h3>
    </div>
  );

  const currentSelectedCategoryObj = useMemo(() => 
    categories.find(c => c.name === productForm.category), 
    [productForm.category, categories]
  );

  return (
    <div className="fixed inset-0 bg-gray-50 z-[200] flex flex-col animate-in fade-in max-w-md mx-auto h-full">
      {/* Admin Header */}
      <div className="bg-white border-b border-gray-100 px-4 h-16 flex items-center justify-between shrink-0 shadow-sm">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="p-2 text-black active:bg-gray-100 rounded-full">
            <ArrowLeft size={22}/>
          </button>
          <div>
            <h1 className="text-[10px] font-black text-red-600 uppercase tracking-widest leading-none">Admin Terminal</h1>
            <p className="text-xs font-black text-black uppercase tracking-widest leading-tight">Master Control</p>
          </div>
        </div>
        <div className="bg-green-50 px-3 py-1.5 rounded-xl border border-green-100 flex items-center gap-2">
          <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-[8px] font-black text-green-700 uppercase">System Live</span>
        </div>
      </div>

      {/* Admin Tabs */}
      <div className="flex bg-white border-b border-gray-100 overflow-x-auto no-scrollbar scroll-smooth shrink-0">
        {[
          { id: 'DASHBOARD', icon: <Activity size={16}/> },
          { id: 'PRODUCTS', icon: <ShoppingBag size={16}/> },
          { id: 'CATEGORIES', icon: <Layout size={16}/> },
          { id: 'ORDERS', icon: <FileText size={16}/> },
          { id: 'PROMOS', icon: <Ticket size={16}/> },
          { id: 'UI_ENGINE', icon: <Monitor size={16}/> },
          { id: 'SYSTEM', icon: <Settings size={16}/> }
        ].map((t) => (
          <button 
            key={t.id}
            onClick={() => setActiveTab(t.id as any)}
            className={`flex-shrink-0 px-6 py-4 flex flex-col items-center gap-1.5 transition-all relative ${activeTab === t.id ? 'text-red-600' : 'text-gray-300'}`}
          >
            {t.icon}
            <span className="text-[7px] font-black uppercase tracking-tighter">{t.id}</span>
            {activeTab === t.id && <div className="absolute bottom-0 left-4 right-4 h-1 bg-red-600 rounded-t-full shadow-lg shadow-red-200" />}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto p-4 no-scrollbar pb-32">
        {activeTab === 'DASHBOARD' && (
          <div className="space-y-4 animate-in fade-in">
            <div className="bg-black p-8 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden">
              <div className="absolute -top-10 -right-10 w-48 h-48 bg-red-600/20 rounded-full blur-3xl"></div>
              <p className="text-[10px] text-gray-500 font-black uppercase tracking-[5px] mb-2">Gross Revenue</p>
              <h3 className="text-4xl font-black italic tracking-tighter">₹{orders.reduce((acc, o) => acc + o.total, 0).toLocaleString()}</h3>
              <div className="grid grid-cols-2 gap-4 mt-8">
                <div className="bg-white/5 p-4 rounded-2xl border border-white/10 text-center">
                  <p className="text-[8px] uppercase text-gray-400 font-black">Sales</p>
                  <p className="text-xl font-black">{orders.length}</p>
                </div>
                <div className="bg-white/5 p-4 rounded-2xl border border-white/10 text-center">
                  <p className="text-[8px] uppercase text-gray-400 font-black">SKUs</p>
                  <p className="text-xl font-black">{products.length}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'PRODUCTS' && (
          <div className="space-y-4 animate-in fade-in">
            <button 
              onClick={() => { setEditingProduct(null); setProductForm({ category: categories[0]?.name || '', subCategory: '', specifications: [] }); setShowProductModal(true); }}
              className="w-full h-16 bg-red-600 text-white rounded-2xl font-black uppercase tracking-[4px] text-[10px] flex items-center justify-center gap-4 shadow-xl active:scale-95 transition-all"
            >
              <Plus size={22}/> Add Master SKU
            </button>
            <div className="space-y-3">
              {products.map(p => (
                <div key={p.id} className="p-4 bg-white border border-gray-100 rounded-3xl flex items-center gap-4 shadow-sm group">
                  <img src={p.image} className="w-14 h-18 object-cover rounded-xl bg-gray-50 shadow-inner" />
                  <div className="flex-1 min-w-0">
                    <p className="text-[8px] font-black text-red-500 uppercase tracking-widest leading-none">{p.brand}</p>
                    <h4 className="text-[11px] font-black text-black uppercase truncate mt-1">{p.title}</h4>
                    <p className="text-[8px] text-gray-400 font-bold uppercase mt-1">
  {p.category} &gt; {p.subCategory}
</p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <button onClick={() => { setEditingProduct(p); setProductForm(p); setShowProductModal(true); }} className="p-2 bg-gray-50 rounded-xl text-black active:bg-gray-100"><Edit2 size={16}/></button>
                    <button onClick={() => onDeleteProduct(p.id)} className="p-2 bg-red-50 rounded-xl text-red-600 active:bg-red-100"><Trash size={16}/></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'CATEGORIES' && (
          <div className="space-y-4 animate-in fade-in">
            <button 
              onClick={() => { setEditingCategory(null); setCategoryForm({ subCategories: [] }); setShowCategoryModal(true); }}
              className="w-full h-16 bg-black text-white rounded-2xl font-black uppercase tracking-[4px] text-[10px] flex items-center justify-center gap-4 shadow-xl active:scale-95 transition-all"
            >
              <Plus size={22}/> Create Root Category
            </button>
            <div className="space-y-3">
              {categories.map(c => (
                <div key={c.id} className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm flex items-center gap-4 group">
                  <div className="w-14 h-14 rounded-2xl overflow-hidden border border-gray-100 bg-gray-50">
                    <img src={c.icon} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-black text-gray-900 uppercase tracking-tight">{c.name}</h4>
                    <p className="text-[9px] font-bold text-gray-400 uppercase mt-0.5">{c.subCategories?.length || 0} Sub-Items</p>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => { setEditingCategory(c); setCategoryForm(c); setShowCategoryModal(true); }} className="p-2.5 bg-gray-50 rounded-xl text-gray-800"><Edit2 size={16}/></button>
                    <button onClick={() => deleteCategory(c.id)} className="p-2.5 bg-red-50 rounded-xl text-red-600"><Trash2 size={16}/></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'ORDERS' && (
          <div className="space-y-4 animate-in fade-in">
            {orders.map(o => (
              <div key={o.id} className="bg-white p-5 rounded-[2rem] border border-gray-100 shadow-sm">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest leading-none">Order Ref</p>
                    <h4 className="text-xs font-black text-black uppercase tracking-tight mt-1">#{o.id}</h4>
                  </div>
                  <span className={`text-[8px] font-black uppercase px-3 py-1 rounded-lg ${o.status === 'Delivered' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>{o.status}</span>
                </div>
                <div className="flex items-center justify-between border-t border-gray-50 pt-4">
                   <p className="text-[10px] font-black text-gray-900 uppercase italic">₹{o.total.toLocaleString()}</p>
                   <button onClick={() => onOpenOrderInvoice(o)} className="text-[9px] font-black text-red-600 uppercase flex items-center gap-1.5 bg-red-50 px-3 py-1.5 rounded-xl">Invoice <FileText size={12}/></button>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'PROMOS' && (
          <div className="space-y-4 animate-in fade-in">
            {coupons.map(c => (
              <div key={c.id} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center justify-between">
                <div>
                  <span className="bg-neutral-900 text-white text-[10px] font-black px-4 py-1.5 rounded-xl uppercase tracking-[2px]">{c.code}</span>
                  <p className="text-[9px] text-gray-400 mt-3 font-bold uppercase tracking-tight">{c.description}</p>
                </div>
                <ToggleSwitch label="" value={c.isActive} onToggle={() => {
                  onUpdateCoupons(coupons.map(item => item.id === c.id ? {...item, isActive: !item.isActive} : item));
                }} />
              </div>
            ))}
          </div>
        )}

        {activeTab === 'UI_ENGINE' && (
          <div className="space-y-6 animate-in slide-in-from-right duration-300">
            <SectionHeader title="Global UI Engine" icon={Monitor} />
            <ToggleSwitch label="Hero Spotlight" value={storeConfig.showHero} onToggle={() => onUpdateStore({...storeConfig, showHero: !storeConfig.showHero})} icon={Smartphone} />
            <ToggleSwitch label="Flash Sale Block" value={storeConfig.showFlashSale} onToggle={() => onUpdateStore({...storeConfig, showFlashSale: !storeConfig.showFlashSale})} icon={Zap} />
            <ToggleSwitch label="Trending Grid" value={storeConfig.showTrending} onToggle={() => onUpdateStore({...storeConfig, showTrending: !storeConfig.showTrending})} icon={TrendingUp} />
            <ToggleSwitch label="Category Circles" value={storeConfig.showCategories} onToggle={() => onUpdateStore({...storeConfig, showCategories: !storeConfig.showCategories})} icon={Box} />
          </div>
        )}

        {activeTab === 'SYSTEM' && (
          <div className="space-y-6 animate-in fade-in">
            <div className="bg-red-50 p-8 rounded-[2.5rem] border border-red-100 border-dashed flex items-center justify-between">
               <div className="flex items-center gap-4">
                  <div className="p-3 bg-red-600 text-white rounded-2xl shadow-lg"><Settings size={22}/></div>
                  <div>
                    <h4 className="text-[11px] font-black text-red-900 uppercase tracking-widest leading-none">Maintenance Mode</h4>
                    <p className="text-[8px] text-red-600 font-bold uppercase mt-1">Suspend Public Traffic</p>
                  </div>
               </div>
               <button onClick={() => onUpdateStore({...storeConfig, maintenanceMode: !storeConfig.maintenanceMode})}>
                  {storeConfig.maintenanceMode ? <ToggleRight size={40} className="text-red-600" /> : <ToggleLeft size={40} className="text-gray-300" />}
               </button>
            </div>
          </div>
        )}
      </div>

      {/* CATEGORY MODAL */}
      {showCategoryModal && (
        <div className="fixed inset-0 z-[300] bg-white flex flex-col animate-in slide-in-from-bottom duration-300 h-full">
          <div className="h-16 px-4 border-b border-gray-200 flex items-center justify-between shrink-0">
            <span className="text-xs font-black text-black uppercase tracking-[2px]">{editingCategory ? 'Edit Category' : 'New Category'}</span>
            <button onClick={() => setShowCategoryModal(false)} className="p-2 active:bg-gray-100 rounded-full"><X size={24}/></button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-6 space-y-8 pb-32 no-scrollbar bg-gray-50/30">
            <div className="space-y-6">
              <div>
                <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest block mb-2">Internal Identity</label>
                <input value={categoryForm.name || ''} onChange={e => setCategoryForm({...categoryForm, name: e.target.value})} placeholder="Ex: Premium Footwear" className="w-full bg-white border border-gray-300 rounded-xl px-5 py-4 text-sm font-bold text-black outline-none focus:border-red-600" />
              </div>
              
              <div>
                <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest block mb-2">Circle Icon URL</label>
                <input value={categoryForm.icon || ''} onChange={e => setCategoryForm({...categoryForm, icon: e.target.value})} placeholder="URL for 1:1 image" className="w-full bg-white border border-gray-300 rounded-xl px-5 py-4 text-xs font-bold text-black outline-none" />
              </div>

              <div>
                <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest block mb-2">Focus Banner URL (Optional)</label>
                <input value={categoryForm.banner || ''} onChange={e => setCategoryForm({...categoryForm, banner: e.target.value})} placeholder="URL for page header" className="w-full bg-white border border-gray-300 rounded-xl px-5 py-4 text-xs font-bold text-black outline-none" />
              </div>
            </div>

            <div className="pt-8 border-t border-gray-200">
              <div className="flex justify-between items-center mb-6">
                <span className="text-[10px] font-black text-black uppercase tracking-[3px]">Sub-Category Matrix</span>
                <button onClick={addSubCategory} className="text-[9px] font-black text-blue-600 border border-blue-200 bg-blue-50 px-3 py-1.5 rounded-lg uppercase">+ Add Unit</button>
              </div>
              <div className="space-y-4">
                {(categoryForm.subCategories || []).map((sub, idx) => (
                  <div key={sub.id} className="p-4 bg-white border border-gray-200 rounded-2xl space-y-3 relative group">
                    <button onClick={() => removeSubCategory(sub.id)} className="absolute top-4 right-4 text-red-400"><X size={14}/></button>
                    <div className="space-y-3">
                      <input placeholder="Unit Label" value={sub.name} onChange={e => {
                        const s = [...(categoryForm.subCategories || [])];
                        s[idx].name = e.target.value;
                        setCategoryForm({...categoryForm, subCategories: s});
                      }} className="w-full bg-transparent border-b border-gray-100 py-1 text-xs font-bold text-black outline-none" />
                      <input placeholder="Unit Asset URL" value={sub.icon} onChange={e => {
                        const s = [...(categoryForm.subCategories || [])];
                        s[idx].icon = e.target.value;
                        setCategoryForm({...categoryForm, subCategories: s});
                      }} className="w-full bg-transparent text-[9px] text-gray-400 outline-none" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="p-4 border-t border-gray-100 bg-white sticky bottom-0">
            <button onClick={handleSaveCategory} className="w-full h-16 bg-black text-white rounded-2xl font-black uppercase text-[11px] tracking-[4px] shadow-2xl active:scale-95 transition-all">Secure Registry Save</button>
          </div>
        </div>
      )}

      {/* PRODUCT MODAL */}
      {showProductModal && (
        <div className="fixed inset-0 z-[300] bg-white flex flex-col animate-in slide-in-from-bottom duration-300 h-full">
          <div className="h-16 px-4 border-b border-gray-200 flex items-center justify-between shrink-0">
            <span className="text-xs font-black text-black uppercase tracking-[2px]">{editingProduct ? 'Registry Update' : 'New Master Entry'}</span>
            <button onClick={() => setShowProductModal(false)} className="p-2 active:bg-gray-100 rounded-full"><X size={24}/></button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-6 space-y-8 pb-32 no-scrollbar bg-gray-50/10">
            <div className="space-y-6">
              <div>
                <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest block mb-2">Parent Taxonomy</label>
                <div className="relative">
                  <select 
                    value={productForm.category || ''} 
                    onChange={e => setProductForm({...productForm, category: e.target.value, subCategory: ''})}
                    className="w-full appearance-none bg-white border border-gray-300 rounded-xl px-5 py-4 text-sm font-bold text-black outline-none focus:border-red-600 transition-colors"
                  >
                    <option value="">Select Category</option>
                    {categories.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                  </select>
                  <ChevronDown size={16} className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400" />
                </div>
              </div>

              {currentSelectedCategoryObj && (
                <div className="animate-in slide-in-from-top duration-200">
                  <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest block mb-2">Sub-Cluster Assignment</label>
                  <div className="relative">
                    <select 
                      value={productForm.subCategory || ''} 
                      onChange={e => setProductForm({...productForm, subCategory: e.target.value})}
                      className="w-full appearance-none bg-white border border-gray-300 rounded-xl px-5 py-4 text-sm font-bold text-black outline-none focus:border-red-600 transition-colors"
                    >
                      <option value="">Select Sub-Category</option>
                      {currentSelectedCategoryObj.subCategories.map(s => <option key={s.id} value={s.name}>{s.name}</option>)}
                    </select>
                    <ChevronDown size={16} className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400" />
                  </div>
                </div>
              )}

              <div>
                <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest block mb-2">Master Title</label>
                <input value={productForm.title || ''} onChange={e => setProductForm({...productForm, title: e.target.value})} placeholder="Ex: Premium Leather Loafers" className="w-full bg-white border border-gray-300 rounded-xl px-5 py-4 text-sm font-bold text-black outline-none focus:border-red-600" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest block mb-2">Offer Price (₹)</label>
                  <input type="number" value={productForm.price || ''} onChange={e => setProductForm({...productForm, price: Number(e.target.value)})} className="w-full bg-white border border-gray-300 rounded-xl px-5 py-4 text-sm font-bold text-black outline-none" />
                </div>
                <div>
                  <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest block mb-2">Catalog MRP (₹)</label>
                  <input type="number" value={productForm.mrp || ''} onChange={e => setProductForm({...productForm, mrp: Number(e.target.value)})} className="w-full bg-white border border-gray-300 rounded-xl px-5 py-4 text-sm font-bold text-black outline-none" />
                </div>
              </div>

              <div>
                <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest block mb-2">Asset URL</label>
                <input value={productForm.image || ''} onChange={e => setProductForm({...productForm, image: e.target.value})} className="w-full bg-white border border-gray-300 rounded-xl px-5 py-4 text-xs font-bold text-black outline-none" />
              </div>
            </div>

            <div className="pt-8 border-t border-gray-100">
              <div className="flex justify-between items-center mb-6">
                <span className="text-[10px] font-black text-black uppercase tracking-[3px]">Specification Matrix</span>
                <button onClick={addSpec} className="text-[9px] font-black text-blue-600 uppercase">+ Add Property</button>
              </div>
              <div className="space-y-4">
                {(productForm.specifications || []).map((spec, idx) => (
                  <div key={idx} className="flex gap-2">
                    <input placeholder="Key" value={spec.key} onChange={e => {
                      const s = [...(productForm.specifications || [])];
                      s[idx].key = e.target.value;
                      setProductForm({...productForm, specifications: s});
                    }} className="flex-1 border border-gray-300 rounded-xl px-4 py-3 text-xs font-bold text-black outline-none focus:border-red-600" />
                    <input placeholder="Value" value={spec.value} onChange={e => {
                      const s = [...(productForm.specifications || [])];
                      s[idx].value = e.target.value;
                      setProductForm({...productForm, specifications: s});
                    }} className="flex-1 border border-gray-300 rounded-xl px-4 py-3 text-xs font-bold text-black outline-none focus:border-red-600" />
                    <button onClick={() => setProductForm({...productForm, specifications: productForm.specifications?.filter((_, i) => i !== idx)})} className="p-3 text-red-500 bg-red-50 rounded-xl"><Trash size={16}/></button>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="p-4 border-t border-gray-100 bg-white sticky bottom-0">
            <button onClick={handleSaveProduct} className="w-full h-16 bg-black text-white rounded-2xl font-black uppercase text-[11px] tracking-[4px] shadow-2xl active:scale-95 transition-all">Save Master SKU</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminView;
