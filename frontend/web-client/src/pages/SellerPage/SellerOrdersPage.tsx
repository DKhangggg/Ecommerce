import {Box, Button, Chip, IconButton, Menu, MenuItem} from "@mui/material";
import {Input} from 'antd';
import 'antd/dist/reset.css';
import {
    ArrowDownRight,
    ArrowUpRight,
    Download,
    Eye,
    ListFilterPlus,
    MoreVertical,
    Package,
    PackagePlus,
    ShoppingBag,
    TrendingUp,
    XCircle
} from "lucide-react";
import {DataGrid, type GridColDef} from '@mui/x-data-grid';
import React, {useEffect, useState} from "react";
import type {OrderRow, OrderStats} from "../../types/order.ts";
import {orderService} from "../../services/orderService.ts";

const {Search} = Input;

// Action Menu Component
const ActionMenu = ({orderId}: { orderId: string }) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleViewDetails = () => {
        console.log("View details:", orderId);
        handleClose();
    };

    const handleUpdateStatus = () => {
        console.log("Update status:", orderId);
        handleClose();
    };

    const handleCancel = () => {
        console.log("Cancel order:", orderId);
        handleClose();
    };

    return (
        <>
            <IconButton
                size="small"
                onClick={handleClick}
                sx={{color: '#8B5A34'}}
            >
                <MoreVertical size={18}/>
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                PaperProps={{
                    sx: {
                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                        borderRadius: '8px',
                    }
                }}
            >
                <MenuItem onClick={handleViewDetails}>View Details</MenuItem>
                <MenuItem onClick={handleUpdateStatus}>Update Status</MenuItem>
                <MenuItem onClick={handleCancel} sx={{color: '#d32f2f'}}>Cancel Order</MenuItem>
            </Menu>
        </>
    );
};

const columns: GridColDef<OrderRow>[] = [
    {
        field: 'orderId',
        headerName: 'Order ID',
        width: 130,
        renderCell: (params) => (
            <span style={{fontWeight: 600, color: '#b97b48'}}>{params.value}</span>
        ),
    },
    {
        field: 'productName',
        headerName: 'Product Name',
        width: 220,
        flex: 1,
    },
    {
        field: 'customerName',
        headerName: 'Customer Name',
        width: 180,
    },
    {
        field: 'amount',
        headerName: 'Amount',
        type: 'number',
        width: 130,
        valueFormatter: (value: number | null | undefined) => {
            if (typeof value === 'number') {
                return `$${value.toFixed(2)}`;
            }
            return '$0.00';
        },
    },
    {
        field: 'status',
        headerName: 'Status',
        width: 140,
        renderCell: (params) => {
            let color: 'success' | 'error' | 'warning' | 'info' | 'default' = 'default';

            if (params.value === 'Delivered') color = 'success';
            if (params.value === 'Cancelled') color = 'error';
            if (params.value === 'Pending') color = 'warning';
            if (params.value === 'Processing' || params.value === 'Shipped') color = 'info';

            return <Chip label={params.value} color={color} size="small"/>;
        }
    },
    {
        field: 'createdAt',
        headerName: 'Order Date',
        type: 'dateTime',
        width: 180,
        valueFormatter: (value) => value ? new Date(value).toLocaleString() : '',
    },
    {
        field: 'actions',
        headerName: 'Actions',
        type: 'actions',
        width: 120,
        renderCell: (params) => (
            <Box sx={{display: 'flex', gap: 1, alignItems: 'center'}}>
                <IconButton
                    size="small"
                    sx={{color: '#b97b48', '&:hover': {backgroundColor: 'rgba(185, 123, 72, 0.1)'}}}
                    onClick={() => console.log("View details:", params.row.orderId)}
                    title="View Details"
                >
                    <Eye size={18}/>
                </IconButton>
                <ActionMenu orderId={params.row.orderId}/>
            </Box>
        ),
    },
];


export function SellerOrdersPage() {
    const onSearch = (value: string) => {
        console.log('Search:', value);
    };

    const [rows, setRows] = useState<OrderRow[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [stats, setStats] = useState<OrderStats>({
        totalOrders: 0,
        newOrders: 0,
        completedOrders: 0,
        cancelledOrders: 0,
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

    // Fetch orders and stats
    const fetchData = async () => {
        setIsLoading(true);
        try {
            const [ordersResponse, statsResponse] = await Promise.all([
                orderService.getAllOrders(),
                orderService.getOrderStats()
            ]);

            const orderRows = orderService.mapOrdersToRows(ordersResponse);
            setRows(orderRows);
            setStats(statsResponse);

        } catch (error) {
            console.error("Error fetching orders:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="w-full max-w-full" style={{fontFamily: 'Inter, Poppins, sans-serif'}}>
            {/* Header Section */}
            <div className="mb-6">
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 mb-6"
                     style={{background: 'rgba(185, 123, 72, 0.1)'}}>
                    <h1 className="text-4xl font-bold text-[#8B5A34]">Orders Management</h1>
                </div>

                {/* Stats Cards */}
                <div className="flex flex-row gap-5 mb-6 w-full">
                    {/* Total Orders */}
                    <div
                        className="flex-1 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all border-2 border-[#b97b48]"
                        style={{background: 'rgba(185, 123, 72, 0.1)'}}>
                        <div className="flex items-start justify-between mb-4">
                            <div>
                                <p className="text-sm font-medium mb-1 text-white">Total Orders</p>
                                <h3 className="text-3xl font-bold text-white">{stats.totalOrders.toLocaleString()}</h3>
                            </div>
                            <div
                                className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center backdrop-blur-sm">
                                <ShoppingBag className="text-white" size={24}/>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="flex items-center gap-1 text-white">
                                <ArrowUpRight size={16}/>
                                <span className="text-sm font-semibold">+12%</span>
                            </div>
                            <span className="text-xs text-white/80">vs last 365 days</span>
                        </div>
                    </div>

                    {/* New Orders */}
                    <div
                        className="flex-1 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all border-2 border-[#b97b48]"
                        style={{background: 'rgba(185, 123, 72, 0.1)'}}>
                        <div className="flex items-start justify-between mb-4">
                            <div>
                                <p className="text-sm font-medium mb-1 text-white">New Orders</p>
                                <h3 className="text-3xl font-bold text-white">{stats.newOrders.toLocaleString()}</h3>
                            </div>
                            <div
                                className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center backdrop-blur-sm">
                                <Package className="text-white" size={24}/>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="flex items-center gap-1 text-white">
                                <ArrowUpRight size={16}/>
                                <span className="text-sm font-semibold">+8%</span>
                            </div>
                            <span className="text-xs text-white/80">vs last 365 days</span>
                        </div>
                    </div>

                    {/* Completed Orders */}
                    <div
                        className="flex-1 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all border-2 border-[#b97b48]"
                        style={{background: 'rgba(185, 123, 72, 0.1)'}}>
                        <div className="flex items-start justify-between mb-4">
                            <div>
                                <p className="text-sm font-medium mb-1 text-white">Completed</p>
                                <h3 className="text-3xl font-bold text-white">{stats.completedOrders.toLocaleString()}</h3>
                            </div>
                            <div
                                className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center backdrop-blur-sm">
                                <TrendingUp className="text-white" size={24}/>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="flex items-center gap-1 text-white">
                                <ArrowUpRight size={16}/>
                                <span className="text-sm font-semibold">+15%</span>
                            </div>
                            <span className="text-xs text-white/80">vs last 365 days</span>
                        </div>
                    </div>

                    {/* Cancelled Orders */}
                    <div
                        className="flex-1 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all border-2 border-[#b97b48]"
                        style={{background: 'rgba(185, 123, 72, 0.1)'}}>
                        <div className="flex items-start justify-between mb-4">
                            <div>
                                <p className="text-sm font-medium mb-1 text-white">Cancelled</p>
                                <h3 className="text-3xl font-bold text-white">{stats.cancelledOrders.toLocaleString()}</h3>
                            </div>
                            <div
                                className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center backdrop-blur-sm">
                                <XCircle className="text-white" size={24}/>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="flex items-center gap-1 text-white">
                                <ArrowDownRight size={16}/>
                                <span className="text-sm font-semibold">-5%</span>
                            </div>
                            <span className="text-xs text-white/80">vs last 365 days</span>
                        </div>
                    </div>
                </div>

                {/* Actions Row */}
                <div className="flex items-center justify-between gap-4">
                    {/* Left: Search */}
                    <div className="flex items-center gap-3 flex-1">
                        <Search
                            placeholder="Search orders..."
                            allowClear
                            onSearch={onSearch}
                            style={{maxWidth: 400}}
                            className="custom-search-beige"
                        />
                    </div>

                    {/* Right: Action Buttons */}
                    <Box sx={{display: "flex", alignItems: "center", gap: 2}}>
                        <Button
                            variant="contained"
                            startIcon={<PackagePlus size={18}/>}
                            sx={beigeButtonStyle}
                        >
                            Add Order
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
                className="bg-white rounded-xl shadow-sm border border-gray-200"
                sx={{height: 600, width: '100%'}}
            >
                <DataGrid
                    rows={rows}
                    columns={columns}
                    loading={isLoading}
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
        </div>
    );
}