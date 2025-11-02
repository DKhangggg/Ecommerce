import {
    Avatar,
    Box,
    Button,
    Chip,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    TextField
} from "@mui/material";
import {Input} from 'antd';
import 'antd/dist/reset.css';
import {Download, Edit, ListFilterPlus, Plus, Trash2} from "lucide-react";
import {DataGrid, type GridColDef} from '@mui/x-data-grid';
import React, {useEffect, useState} from "react"; // 1. Thêm useEffect
import type {CreateProductPayload, ProductRow, ProductRowStatus} from "../../types/product.ts";
import {useAuth} from "../../context/AuthContext.tsx";
import {type BackendStatus, productService} from "../../services/productService.ts";
import type {EnrichedInventoryItem} from "../../types/Inventory.ts";

const {Search} = Input;

const mapBackendStatusToFrontendStatus = (backendStatus: BackendStatus): ProductRowStatus => {
    switch (backendStatus) {
        case "IN_STOCK":
            return "In Stock";
        case "OUT_OF_STOCK":
            return "Out of Stock";
        case "LOW_STOCK":
            return "Low Stock";
        case "DISCONTINUED":
            return "Discontinued";
        case "RESERVED":
            return "Reserved";
        default:
            // Xử lý trường hợp không mong muốn
            return "In Stock";
    }
};
const columns: GridColDef<ProductRow>[] = [
    {
        field: 'id',
        headerName: 'ID',
        width: 90
    },
    {
        field: 'imageUrls',
        headerName: 'Ảnh',
        width: 80,
        renderCell: (params) => (
            <Avatar
                src={params.row.imageUrls && params.row.imageUrls.length > 0 ? params.row.imageUrls[0] : undefined}
                variant="rounded"
                sx={{width: 48, height: 48}}
            >
                ?
            </Avatar>
        ),
        sortable: false,
    },
    {
        field: 'name', // Đổi tên field này
        headerName: 'Tên sản phẩm',
        width: 200,
        editable: true,
    },
    {
        field: 'status',
        headerName: 'Trạng thái',
        width: 120,
        renderCell: (params) => {
            let color: 'success' | 'error' | 'warning' | 'default' = 'success';

            if (params.value === 'Out of Stock') color = 'error';
            if (params.value === 'Low Stock') color = 'warning';
            // Thêm 2 màu mới
            if (params.value === 'Discontinued') color = 'default';
            if (params.value === 'Reserved') color = 'default'; // Hoặc 'info'
            return <Chip label={params.value} color={color} size="small"/>;
        }
    },
    {
        field: 'quantity',
        headerName: 'Tồn kho',
        type: 'number',
        width: 90,
        editable: true,
    },
    {
        field: 'price', // Đổi tên field này
        headerName: 'Giá',
        type: 'number',
        width: 110,
        editable: true,
        valueFormatter: (value: number | null | undefined) => {
            // Kiểm tra xem value có phải là một số (kể cả số 0) hay không
            if (typeof value === 'number') {
                return `$${value.toFixed(2)}`;
            }
            // Nếu value là null, undefined, hoặc không phải số
            return '$0.00';
        },
    },
    {
        field: 'reserved',
        headerName: 'Đã đặt',
        type: 'number',
        width: 90,
        editable: true,
    },
    {
        field: 'categories',
        headerName: 'Danh mục',
        width: 150,
        renderCell: (params) => (params.value || []).join(', '),
    },
    {
        field: 'location',
        headerName: 'Vị trí kho',
        width: 120,
        editable: true,
    },

    {
        field: 'actions',
        headerName: 'Hành động',
        type: 'actions',
        width: 120,
        renderCell: (params) => (
            <Box sx={{display: 'flex', gap: 1}}>
                <IconButton
                    size="small"
                    sx={{color: '#b97b48'}}
                    onClick={() => console.log("Edit:", params.id)}
                >
                    <Edit size={18}/>
                </IconButton>
                <IconButton
                    size="small"
                    sx={{color: '#d32f2f'}}
                    onClick={() => console.log("Delete:", params.id)}
                >
                    <Trash2 size={18}/>
                </IconButton>
            </Box>
        ),
    },
    {
        field: 'description',
        headerName: 'Mô tả',
        width: 250
    },
    {
        field: 'attributes',
        headerName: 'Thuộc tính',
        width: 150,
        renderCell: (params) => params.value ? `${(params.value || []).length} thuộc tính` : '0 thuộc tính'
    },
    {
        field: 'updatedAt',
        headerName: 'Cập nhật lần cuối',
        type: 'dateTime',
        width: 180,
        valueFormatter: (value) => value ? new Date(value).toLocaleString() : '',
    },
    {
        field: 'createdAt',
        headerName: 'Ngày tạo',
        type: 'dateTime',
        width: 180,
        valueFormatter: (value) => value ? new Date(value).toLocaleString() : '',
    },
];


export function SellerInventoryPage() {
    const onSearch = (value: string) => {
        console.log('Search:', value);
    };
    const {user} = useAuth();

    // 5. Thêm State cho DataGrid
    const [rows, setRows] = useState<ProductRow[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const beigeButtonStyle = {
        backgroundColor: "#FDF5E6",
        color: "#8B5A34",
        fontWeight: 600,
        border: "1px solid #E0CDB6",
        boxShadow: 'none',
        "&:hover": {
            backgroundColor: "#FAEECF",
            boxShadow: 'none',
        },
    };

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newProductData, setNewProductData] = useState({
        name: '',
        price: 0,
        stock: 0,
        description: '',
        location: '',
        imageUrls: '',
        attributes: '',
        categories: ''
    });

    // 6. Hàm Fetch Data
    const fetchData = async () => {
        setIsLoading(true);
        try {
            // Gọi API gộp (chỉ 1 lần)
            const data: EnrichedInventoryItem[] = await productService.getEnrichedInventories();

            // 7. Biến đổi (Map) data từ API sang kiểu ProductRow
            const productRows: ProductRow[] = data.map(item => {

                const frontendStatus = mapBackendStatusToFrontendStatus(item.status);

                return {
                    // Dữ liệu từ Inventory
                    id: item.productId, // Dùng productId làm id cho DataGrid
                    quantity: item.quantity,
                    location: item.location || '',
                    status: frontendStatus,

                    // Dữ liệu "làm giàu" từ Product
                    name: item.productName || 'N/A',
                    price: item.productPrice || 0,
                    imageUrls: item.productImageUrls || [],
                    description: item.productDescription || '',
                    categories: item.productCategories || [],
                    attributes: item.productAttributes || [],

                    // Dữ liệu giả (bạn nên lấy từ BE nếu có)
                    reserved: 0,
                    updatedAt: new Date(), // Nên dùng item.updatedAt từ BE
                    createdAt: new Date(), // Nên dùng item.createdAt từ BE
                };
            });

            setRows(productRows);

        } catch (error) {
            console.error("Lỗi fetch data cho grid:", error);
            // (Bạn có thể set 1 state error để hiển thị cho user)
        } finally {
            setIsLoading(false);
        }
    };

    // 8. Gọi fetchData khi component mount
    useEffect(() => {
        fetchData();
    }, []); // [] đảm bảo chỉ chạy 1 lần

    const handleModalOpen = () => {
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
        setNewProductData({
            name: '',
            price: 0,
            stock: 0,
            categories: '',
            description: '',
            location: '',
            imageUrls: '',
            attributes: ''
        });
    };
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setNewProductData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // 9. Cập nhật fetchData sau khi submit
    const handleModalSubmit = async () => {
        if (!user) {
            console.error("Lỗi: Không tìm thấy user, không thể gửi sellerId.");
            return;
        }

        let attributesData = [];
        try {
            // Đảm bảo attributes là JSON hợp lệ, nếu không thì là mảng rỗng
            attributesData = JSON.parse(newProductData.attributes || "[]");
        } catch (error) {
            console.warn("Attributes JSON không hợp lệ, gửi mảng rỗng");
            attributesData = [];
        }

        const finalData: CreateProductPayload = {
            name: newProductData.name,
            description: newProductData.description,
            price: Number(newProductData.price) || 0,
            stock: Number(newProductData.stock) || 0,
            categories: newProductData.categories.split(',').map(c => c.trim()).filter(c => c),
            location: newProductData.location || undefined,
            imageUrls: newProductData.imageUrls.split(',').map(url => url.trim()).filter(url => url),
            attributes: attributesData,
            sellerId: user.id, // (Bạn nên bỏ trường này nếu BE tự lấy từ X-User-Id)
        };

        try {
            console.log("Payload gửi đi:", finalData);
            const newProduct = await productService.createProduct(finalData);

            if (newProduct) {
                alert('Thêm sản phẩm thành công!');
                handleModalClose();

                // TẢI LẠI DỮ LIỆU CHO GRID
                await fetchData();
            } else {
                alert('Có lỗi xảy ra khi thêm sản phẩm.');
                handleModalClose();
            }
        } catch (error) {
            console.error("Lỗi khi submit form:", error);
            alert('Lỗi: ' + (error as Error).message);
        }
    };

    const submitButtonStyle = {
        backgroundColor: "#b97b48",
        color: "#FFF",
        fontWeight: 600,
        "&:hover": {
            backgroundColor: "#a06a3e",
        },
    };

    return (
        <div className="w-full max-w-full" style={{fontFamily: 'Inter, Poppins, sans-serif'}}>
            {/* Header Section */}
            <div>
                <div className="flex flex-col gap-4">
                    {/* Title */}
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Inventory Stock</h1>
                    </div>

                    {/* Actions Row */}
                    <div className="flex items-center justify-between gap-4">
                        {/* Left: Search */}
                        <div className="flex items-center gap-3 flex-1">
                            <Search
                                placeholder="Search list..."
                                allowClear
                                onSearch={onSearch}
                                style={{maxWidth: 400}}
                                className="custom-search-beige"
                            />
                        </div>
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 2,
                            }}
                        >
                            <Button
                                variant="contained"
                                startIcon={<Plus size={18}/>}
                                sx={beigeButtonStyle}
                                onClick={handleModalOpen}
                            >
                                Create
                            </Button>
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
                                Download
                            </Button>
                        </Box>
                    </div>
                </div>
            </div>

            <style>{`
                .custom-search-beige .ant-input {
                    border-radius: 12px;
                    border: 1px solid #d1d5db;
                    padding: 8px 12px;
                }
                .custom-search-beige .ant-input:hover {
                    border-color: #b97b48;
                }
                .custom-search-beige .ant-input:focus {
                    border-color: #b97b48;
                    box-shadow: 0 0 0 2px rgba(185, 123, 72, 0.1);
                }
                .custom-search-beige .ant-input-search-button {
                    border-radius: 0 12px 12px 0;
                    background: #FDF5E6;
                    border-color: #E0CDB6;
                    color: #8B5A34 !important;
                    height: 38px;
                }
                .custom-search-beige .ant-input-search-button:hover {
                    background: #FAEECF;
                    border-color: #E0CDB6;
                }
            `}</style>

            {/* DataGrid Section */}
            <Box
                className="bg-white rounded-xl shadow-sm border border-gray-200 mt-4"
                sx={{height: 600, width: '100%'}}
            >
                <DataGrid
                    rows={rows} // 10. Dùng state
                    columns={columns}
                    loading={isLoading} // 11. Dùng state
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 10,
                            },
                        },
                    }}
                    pageSizeOptions={[5, 10, 20]}
                    checkboxSelection
                    disableRowSelectionOnClick
                    sx={{
                        border: 0,
                        '& .MuiDataGrid-columnHeaders': {
                            backgroundColor: '#FDF5E6',
                            color: '#8B5A34',
                            fontWeight: 'bold',
                        },
                        '& .MuiDataGrid-main': {
                            borderRadius: '12px',
                        },
                        '& .MuiDataGrid-row.Mui-selected': {
                            backgroundColor: 'rgba(253, 245, 230, 0.7)',
                            '&:hover': {
                                backgroundColor: 'rgba(250, 238, 207, 0.8)',
                            }
                        },
                        '& .MuiCheckbox-root.Mui-checked': {
                            color: '#b97b48',
                        },
                        '& .MuiDataGrid-cell:focus, & .MuiDataGrid-cell:focus-within': {
                            outline: 'none',
                        },
                        '& .MuiDataGrid-columnHeader:focus, & .MuiDataGrid-columnHeader:focus-within': {
                            outline: 'none',
                        }
                    }}
                />
            </Box>

            {/* ----- 6.MODAL (DIALOG)  ----- */}
            <Dialog
                open={isModalOpen}
                onClose={handleModalClose}
                maxWidth="sm"
                fullWidth
            >
                <DialogTitle sx={{fontWeight: 600, color: '#333'}}>
                    Thêm sản phẩm mới
                </DialogTitle>
                <DialogContent>
                    <Box
                        component="form"
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 2,
                            mt: 2
                        }}
                    >
                        {/* Các trường cũ */}
                        <TextField
                            autoFocus
                            label="Tên sản phẩm"
                            name="name"
                            value={newProductData.name}
                            onChange={handleInputChange}
                            fullWidth
                            variant="outlined"
                        />
                        <TextField
                            label="Giá"
                            name="price"
                            type="number"
                            value={newProductData.price}
                            onChange={handleInputChange}
                            fullWidth
                            variant="outlined"
                        />
                        <TextField
                            label="Số lượng tồn kho"
                            name="stock"
                            type="number"
                            value={newProductData.stock}
                            onChange={handleInputChange}
                            fullWidth
                            variant="outlined"
                            required
                        />
                        <TextField
                            label="Mô tả"
                            name="description"
                            value={newProductData.description}
                            onChange={handleInputChange}
                            fullWidth
                            variant="outlined"
                            multiline
                            rows={3}
                        />

                        <TextField
                            label="Vị trí kho"
                            name="location"
                            value={newProductData.location}
                            onChange={handleInputChange}
                            fullWidth
                            variant="outlined"
                        />
                        <TextField
                            label="Image URLs"
                            name="imageUrls"
                            value={newProductData.imageUrls}
                            onChange={handleInputChange}
                            fullWidth
                            variant="outlined"
                            helperText="Nhập các URL, cách nhau bằng dấu phẩy (,)"
                        />
                        <TextField
                            label="Categories"
                            name="categories"
                            value={newProductData.categories}
                            onChange={handleInputChange}
                            fullWidth
                            variant="outlined"
                            helperText="Nhập các danh mục, cách nhau bằng dấu phẩy (,)"
                        />
                        <TextField
                            label="Thuộc tính (Attributes)"
                            name="attributes"
                            value={newProductData.attributes}
                            onChange={handleInputChange}
                            fullWidth
                            variant="outlined"
                            multiline
                            rows={3}
                            helperText='Nhập dưới dạng: [{"name": "Color", "value": "Red"}]'
                        />

                    </Box>
                </DialogContent>
                <DialogActions sx={{p: 2}}>
                    <Button onClick={handleModalClose} sx={{color: '#555'}}>
                        Huỷ
                    </Button>
                    <Button
                        onClick={handleModalSubmit}
                        variant="contained"
                        sx={submitButtonStyle}
                    >
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}