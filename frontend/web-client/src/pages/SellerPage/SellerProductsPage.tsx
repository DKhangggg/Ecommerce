import {Button} from "@mui/material";

import {Input} from 'antd';

import 'antd/dist/reset.css';

import {
    DollarSign,
    Download,
    Edit,
    ListFilterPlus,
    Package,
    PackagePlus,
    ShoppingBag,
    Trash2,
    TrendingUp
} from "lucide-react";

import {useEffect, useState} from "react";

import type {ProductRow} from "../../types/product.ts";

import {productService} from "../../services/productService.ts";


const {Search} = Input;


interface ProductStats {

    totalProducts: number;

    inStock: number;

    lowStock: number;

    totalRevenue: number;

}


export function SellerProductsPage() {

    const onSearch = (value: string) => {

        console.log('Search:', value);

    };


    const [products, setProducts] = useState<ProductRow[]>([]);

    const [isLoading, setIsLoading] = useState(false);

    const [stats, setStats] = useState<ProductStats>({

        totalProducts: 0,

        inStock: 0,

        lowStock: 0,

        totalRevenue: 0,

    });


    const beigeButtonStyle = {

        backgroundColor: "rgba(185, 123, 72, 0.9)",

        color: "#FFFFFF",

        fontWeight: 600,

        border: "none",

        borderRadius: "12px",

        boxShadow: '0 2px 8px rgba(185, 123, 72, 0.2)',

        padding: "8px 20px",

        textTransform: "none",

        "&:hover": {

            backgroundColor: "rgba(185, 123, 72, 1)",

            boxShadow: '0 4px 12px rgba(185, 123, 72, 0.3)',

        },

    };


// Fetch products

    const fetchData = async () => {

        setIsLoading(true);

        try {

            const response = await productService.getEnrichedInventories();


            const productRows: ProductRow[] = response.map(item => ({

                id: item.productId,

                quantity: item.quantity,

                location: item.location || '',

                status: item.status === 'IN_STOCK' ? 'In Stock' :

                    item.status === 'LOW_STOCK' ? 'Low Stock' :

                        item.status === 'OUT_OF_STOCK' ? 'Out of Stock' : 'In Stock',

                name: item.productName || 'N/A',

                price: item.productPrice || 0,

                imageUrls: item.productImageUrls || [],

                description: item.productDescription || '',

                categories: item.productCategories || [],

                attributes: item.productAttributes || [],

                reserved: item.reserved || 0,

                updatedAt: new Date(),

                createdAt: new Date(),

            }));


            setProducts(productRows);


// Calculate stats

            const totalRevenue = productRows.reduce((sum, p) => sum + (p.price * p.quantity), 0);

            setStats({

                totalProducts: productRows.length,

                inStock: productRows.filter(p => p.status === 'In Stock').length,

                lowStock: productRows.filter(p => p.status === 'Low Stock').length,

                totalRevenue: totalRevenue,

            });


        } catch (error) {

            console.error("Error fetching products:", error);

        } finally {

            setIsLoading(false);

        }

    };


    useEffect(() => {

        fetchData();

    }, []);


    return (

        <div className="w-full h-full overflow-auto py-6" style={{fontFamily: 'Inter, Poppons, sans-serif'}}>

            {/* Header */}

            <div className="gap-10 mb-16">

                <h1 className="text-3xl font-bold text-gray-800 mb-2">Product Management</h1>

                <p className="text-gray-600 text-sm">Manage your product inventory</p>

            </div>


            {/* Stats Cards */}

            <div className="flex flex-row gap-10 mb-16">

                {/* Total Products */}

                <div

                    className="flex-1 bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all border-2 border-amber-200">

                    <div className="flex items-center gap-4">

                        <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">

                            <Package className="text-amber-600" size={24}/>

                        </div>

                        <div>

                            <p className="text-sm text-gray-600 mb-1">Total Products</p>

                            <h3 className="text-2xl font-bold text-gray-900">{stats.totalProducts}</h3>

                        </div>

                    </div>

                </div>


                {/* In Stock */}

                <div

                    className="flex-1 bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all border-2 border-green-200">

                    <div className="flex items-center gap-4">

                        <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">

                            <ShoppingBag className="text-green-600" size={24}/>

                        </div>

                        <div>

                            <p className="text-sm text-gray-600 mb-1">In Stock</p>

                            <h3 className="text-2xl font-bold text-gray-900">{stats.inStock}</h3>

                        </div>

                    </div>

                </div>


                {/* Low Stock */}

                <div

                    className="flex-1 bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all border-2 border-orange-200">

                    <div className="flex items-center gap-4">

                        <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">

                            <TrendingUp className="text-orange-600" size={24}/>

                        </div>

                        <div>

                            <p className="text-sm text-gray-600 mb-1">Low Stock</p>

                            <h3 className="text-2xl font-bold text-gray-900">{stats.lowStock}</h3>

                        </div>

                    </div>

                </div>


                {/* Total Revenue */}

                <div

                    className="flex-1 bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all border-2 border-blue-200">

                    <div className="flex items-center gap-4">

                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">

                            <DollarSign className="text-blue-600" size={24}/>

                        </div>

                        <div>

                            <p className="text-sm text-gray-600 mb-1">Total Revenue</p>

                            <h3 className="text-2xl font-bold text-gray-900">${(stats.totalRevenue / 1000).toFixed(1)}k</h3>

                        </div>

                    </div>

                </div>

            </div>


            {/* Actions Row */}

            <div className="flex items-center justify-between mb-16">

                {/* Left: Search */}

                <Search

                    placeholder="Search products..."

                    allowClear

                    onSearch={onSearch}

                    style={{maxWidth: 450}}

                    size="large"

                    className="custom-search"

                />


                {/* Right: Action Buttons */}

                <div className="flex gap-3">

                    <Button

                        variant="contained"

                        startIcon={<ListFilterPlus size={18}/>}

                        sx={beigeButtonStyle}

                    >

                        Filter

                    </Button>

                    <Button

                        variant="contained"

                        startIcon={<Download size={18}/>}

                        sx={beigeButtonStyle}

                    >

                        Export

                    </Button>

                </div>

            </div>


            {/* Product Cards Grid - Game Inventory Style */}

            <div

                className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 xl:grid-cols-12 gap-4 auto-rows-fr">

                {isLoading ? (

                    <div className="col-span-full flex items-center justify-center py-20">

                        <p className="text-gray-500">Loading products...</p>

                    </div>

                ) : (

                    <>


                        {/* Existing Product Cards - Game Slot Style */}

                        {products.map((product) => (

                            <div

                                key={product.id}

                                className="inventory-slot product-slot"

                            >

                                {/* Product Image */}

                                <div className="slot-image">

                                    {product.imageUrls && product.imageUrls.length > 0 ? (

                                        <img

                                            src={product.imageUrls[0]}

                                            alt={product.name}

                                            className="slot-img"

                                        />

                                    ) : (

                                        <div className="slot-placeholder">

                                            <Package size={18}/>

                                        </div>

                                    )}

                                    {/* Status Badge */}

                                    <div className={`slot-badge ${

                                        product.status === 'In Stock' ? 'badge-green' :

                                            product.status === 'Low Stock' ? 'badge-orange' : 'badge-red'

                                    }`}>

                                        {product.status === 'In Stock' ? '✓' :

                                            product.status === 'Low Stock' ? '!' : '✕'}

                                    </div>

                                    {/* Quantity Badge */}

                                    <div className="slot-quantity">×{product.quantity}</div>

                                </div>


                                {/* Product Info */}

                                <div className="slot-info">

                                    <h3 className="slot-name">{product.name}</h3>

                                    <p className="slot-price">${product.price.toFixed(2)}</p>

                                </div>


                                {/* Hover Actions */}

                                <div className="slot-actions">

                                    <button

                                        className="slot-btn edit-btn"

                                        onClick={() => console.log('Edit', product.id)}

                                        title="Edit"

                                    >

                                        <Edit size={14}/>

                                    </button>

                                    <button

                                        className="slot-btn delete-btn"

                                        onClick={() => console.log('Delete', product.id)}

                                        title="Delete"

                                    >

                                        <Trash2 size={14}/>

                                    </button>

                                </div>

                            </div>

                        ))}


                        {/* Add New Product Card - Always Last */}

                        <div

                            className="inventory-slot add-slot"

                            onClick={() => console.log('Add new product')}

                        >

                            <div className="slot-content">

                                <PackagePlus className="slot-icon" size={20}/>

                                <p className="slot-label">Add</p>

                            </div>

                        </div>

                    </>

                )}

            </div>


            <style>{`

.custom-search {

width: 100%;

}


.custom-search .ant-input-group {

display: flex;

align-items: stretch;

}


.custom-search .ant-input-wrapper {

height: 40px;

}


.custom-search .ant-input {

border-radius: 10px 0 0 10px !important;

border: 2px solid #e5e7eb;

padding: 8px 16px;

font-size: 14px;

height: 40px;

transition: all 0.3s ease;

}


.custom-search .ant-input:hover {

border-color: #f59e0b;

border-right-color: #e5e7eb;

}


.custom-search .ant-input:focus {

border-color: #f59e0b;

border-right-color: #f59e0b;

box-shadow: 0 0 0 3px rgba(245, 158, 11, 0.1);

}


.custom-search .ant-input-search-button {

border-radius: 0 10px 10px 0 !important;

background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%);

border: 2px solid #f59e0b;

border-left: none;

color: white !important;

height: 40px;

width: 50px;

display: flex;

align-items: center;

justify-content: center;

transition: all 0.3s ease;

}


.custom-search .ant-input-search-button:hover {

background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);

border-color: #d97706;

transform: translateX(0);

box-shadow: 0 2px 8px rgba(245, 158, 11, 0.3);

}


.custom-search .ant-input-search-button .anticon {

font-size: 16px;

}


/* Game Inventory Slot Style */

.inventory-slot {

position: relative;

aspect-ratio: 1;

background: white;

border: 1px solid #e5e7eb;

border-radius: 6px;

padding: 4px;

display: flex;

flex-direction: column;

cursor: pointer;

transition: all 0.2s ease;

overflow: hidden;

}


.inventory-slot:hover {

border-color: #f59e0b;

transform: translateY(-1px);

box-shadow: 0 2px 6px rgba(245, 158, 11, 0.2);

}


/* Add New Product Slot */

.add-slot {

background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);

border: 1px dashed #f59e0b;

}


.add-slot:hover {

background: linear-gradient(135deg, #fde68a 0%, #fbbf24 100%);

border-color: #d97706;

}


.slot-content {

display: flex;

flex-direction: column;

align-items: center;

justify-content: center;

height: 100%;

gap: 2px;

}


.slot-icon {

color: #f59e0b;

animation: pulse 2s infinite;

}


.slot-label {

font-size: 9px;

font-weight: 600;

color: #92400e;

margin: 0;

}


/* Product Slot */

.product-slot {

padding: 3px;

}


.slot-image {

position: relative;

width: 100%;

height: calc(100% - 28px);

background: #f3f4f6;

border-radius: 4px;

overflow: hidden;

margin-bottom: 2px;

}


.slot-img {

width: 100%;

height: 100%;

object-fit: cover;

transition: transform 0.3s ease;

}


.inventory-slot:hover .slot-img {

transform: scale(1.08);

}


.slot-placeholder {

width: 100%;

height: 100%;

display: flex;

align-items: center;

justify-content: center;

color: #9ca3af;

}


/* Badges */

.slot-badge {

position: absolute;

top: 3px;

right: 3px;

width: 14px;

height: 14px;

border-radius: 50%;

display: flex;

align-items: center;

justify-content: center;

font-size: 9px;

font-weight: bold;

color: white;

box-shadow: 0 1px 2px rgba(0,0,0,0.3);

}


.badge-green { background: #10b981; }

.badge-orange { background: #f97316; }

.badge-red { background: #ef4444; }


.slot-quantity {

position: absolute;

bottom: 3px;

right: 3px;

background: rgba(0, 0, 0, 0.75);

color: white;

padding: 1px 3px;

border-radius: 2px;

font-size: 8px;

font-weight: 600;

}


/* Product Info */

.slot-info {

flex: 1;

display: flex;

flex-direction: column;

justify-content: center;

min-height: 0;

}


.slot-name {

font-size: 8px;

font-weight: 600;

color: #1f2937;

margin: 0 0 1px 0;

overflow: hidden;

text-overflow: ellipsis;

white-space: nowrap;

line-height: 1.2;

}


.slot-price {

font-size: 9px;

font-weight: 700;

color: #f59e0b;

margin: 0;

line-height: 1;

}


/* Hover Actions */

.slot-actions {

position: absolute;

top: 0;

left: 0;

right: 0;

bottom: 0;

background: rgba(0, 0, 0, 0.75);

display: flex;

align-items: center;

justify-content: center;

gap: 6px;

opacity: 0;

transition: opacity 0.2s ease;

border-radius: 6px;

}


.inventory-slot:hover .slot-actions {

opacity: 1;

}


.slot-btn {

width: 28px;

height: 28px;

border-radius: 6px;

border: none;

display: flex;

align-items: center;

justify-content: center;

cursor: pointer;

transition: all 0.2s ease;

}


.edit-btn {

background: #fbbf24;

color: white;

}


.edit-btn:hover {

background: #f59e0b;

transform: scale(1.08);

}


.delete-btn {

background: #ef4444;

color: white;

}


.delete-btn:hover {

background: #dc2626;

transform: scale(1.08);

}


@keyframes pulse {

0%, 100% {

opacity: 1;

transform: scale(1);

}

50% {

opacity: 0.7;

transform: scale(1.05);

}

}

`}</style>

        </div>

    );

}