import {useState} from 'react';
import {DollarSign, TrendingUp, Users, ShoppingBag, Package, Activity} from 'lucide-react';
import {
    Area,
    AreaChart,
    Bar,
    BarChart,
    Cell,
    Line,
    LineChart,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip
} from 'recharts';

// Types
interface DashboardStats {
    newCustomers: number;
    newCustomersYTD: number;
    salesRevenue: number;
    salesRevenueYTD: number;
    profit: number;
    profitYTD: number;
    profitMargin: number;
}

interface MonthlyRevenue {
    month: string;
    revenue: number;
}

interface SalesByCountry {
    country: string;
    value: number;
    percentage: number;
}

interface MonthlyGrowth {
    month: string;
    revenue: number;
}

interface CustomerMetrics {
    month: string;
    clv: number;
    cac: number;
}

export function SellerDashboardPage() {
    const [stats] = useState<DashboardStats>({
        newCustomers: 809,
        newCustomersYTD: 809,
        salesRevenue: 34952669,
        salesRevenueYTD: 34952669,
        profit: 5324590,
        profitYTD: 5324590,
        profitMargin: 80.91
    });

    // Monthly revenue data for bar chart
    const monthlyRevenueData: MonthlyRevenue[] = [
        {month: 'Jan 2016', revenue: 650000},
        {month: 'Feb 2016', revenue: 720000},
        {month: 'Mar 2016', revenue: 680000},
        {month: 'Apr 2016', revenue: 750000},
        {month: 'May 2016', revenue: 920000},
        {month: 'Jun 2016', revenue: 810000},
        {month: 'Jul 2016', revenue: 890000},
        {month: 'Aug 2016', revenue: 960000},
        {month: 'Sep 2016', revenue: 870000},
        {month: 'Oct 2016', revenue: 930000},
        {month: 'Nov 2016', revenue: 890000},
        {month: 'Dec 2016', revenue: 950000},
    ];

    // Sales by country (Pie chart)
    const salesByCountry: SalesByCountry[] = [
        {country: 'Germany', value: 11300000, percentage: 32.34},
        {country: 'Switzerland', value: 11870000, percentage: 33.94},
        {country: 'Austria', value: 11971000, percentage: 33.72},
    ];

    const COLORS = ['#b97b48', '#8B5A34', '#FAEECF'];

    // Monthly growth data (area chart)
    const monthlyGrowthData: MonthlyGrowth[] = [
        {month: 'Jan', revenue: 75000},
        {month: 'Feb', revenue: 82000},
        {month: 'Mar', revenue: 95000},
        {month: 'Apr', revenue: 105000},
        {month: 'May', revenue: 118000},
        {month: 'Jun', revenue: 135000},
        {month: 'Jul', revenue: 152000},
        {month: 'Aug', revenue: 168000},
        {month: 'Sep', revenue: 182000},
        {month: 'Oct', revenue: 195000},
        {month: 'Nov', revenue: 210000},
        {month: 'Dec', revenue: 225000},
    ];

    // Average revenue per unit (line chart)
    const arpuData = [
        {month: 'Jan', value: 85},
        {month: 'Feb', value: 92},
        {month: 'Mar', value: 88},
        {month: 'Apr', value: 95},
        {month: 'May', value: 98},
        {month: 'Jun', value: 102},
        {month: 'Jul', value: 105},
        {month: 'Aug', value: 108},
        {month: 'Sep', value: 110},
        {month: 'Oct', value: 115},
        {month: 'Nov', revenue: 118},
    ];

    // Customer lifetime value data
    const clvData: CustomerMetrics[] = [
        {month: 'Jan', clv: 45, cac: 363},
        {month: 'Feb', clv: 105, cac: 329},
        {month: 'Mar', clv: 154, cac: 303},
        {month: 'Apr', clv: 209, cac: 309},
        {month: 'May', clv: 232, cac: 278},
        {month: 'Jun', clv: 256, cac: 278},
        {month: 'Jul', clv: 270, cac: 255},
        {month: 'Aug', clv: 303, cac: 249},
        {month: 'Sep', clv: 372, cac: 240},
        {month: 'Oct', clv: 322, cac: 235},
    ];

    return (
        <div className="w-full max-w-full p-6 min-h-screen"
             style={{
                 fontFamily: 'Inter, Poppins, sans-serif',
                 background: 'linear-gradient(135deg, #faf8f6 0%, #f5f1ed 50%, #faf8f6 100%)'
             }}>
            {/* Header */}
            <div className="mb-8">
                <div
                    className="rounded-3xl p-8 shadow-lg backdrop-blur-xl border border-white/50 relative overflow-hidden"
                    style={{
                        background: 'linear-gradient(135deg, rgba(185, 123, 72, 0.15) 0%, rgba(139, 90, 52, 0.12) 100%)',
                        boxShadow: '0 8px 32px rgba(185, 123, 72, 0.1)'
                    }}>
                    <div
                        className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-white/30 to-transparent rounded-full blur-3xl"></div>
                    <h1 className="text-5xl font-bold tracking-tight relative z-10"
                        style={{
                            color: '#8B5A34',
                            letterSpacing: '-0.02em'
                        }}>
                        Business Performance Overview
                    </h1>
                    <p className="text-sm mt-2 relative z-10" style={{color: '#b97b48'}}>
                        TỔNG QUAN HIỆU SUẤT KINH DOANH
                    </p>
                </div>
            </div>

            {/* Top Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {/* New Customers Card */}
                <div
                    className="group rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 backdrop-blur-xl border border-white/50 relative overflow-hidden"
                    style={{
                        background: 'linear-gradient(135deg, rgba(185, 123, 72, 0.95) 0%, rgba(139, 90, 52, 0.95) 100%)',
                        boxShadow: '0 8px 32px rgba(185, 123, 72, 0.25)'
                    }}>
                    <div
                        className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700"></div>
                    <div className="relative z-10">
                        <div className="flex items-start justify-between mb-6">
                            <div
                                className="w-14 h-14 rounded-2xl bg-white/25 backdrop-blur-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300"
                                style={{border: '1px solid rgba(255, 255, 255, 0.3)'}}>
                                <Users className="text-white" size={28}/>
                            </div>
                        </div>
                        <p className="text-xs font-semibold text-white/80 tracking-wider uppercase mb-2">
                            New Customers | YTD
                        </p>
                        <h3 className="text-5xl font-bold text-white mb-1 tracking-tight">
                            {stats.newCustomers.toLocaleString()}
                        </h3>
                        <div className="h-1 w-16 bg-white/40 rounded-full mt-3"></div>
                    </div>
                </div>

                {/* Sales Revenue Card */}
                <div
                    className="group rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 backdrop-blur-xl border border-white/50 relative overflow-hidden"
                    style={{
                        background: 'linear-gradient(135deg, rgba(185, 123, 72, 0.95) 0%, rgba(139, 90, 52, 0.95) 100%)',
                        boxShadow: '0 8px 32px rgba(185, 123, 72, 0.25)'
                    }}>
                    <div
                        className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700"></div>
                    <div className="relative z-10">
                        <div className="flex items-start justify-between mb-6">
                            <div
                                className="w-14 h-14 rounded-2xl bg-white/25 backdrop-blur-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300"
                                style={{border: '1px solid rgba(255, 255, 255, 0.3)'}}>
                                <TrendingUp className="text-white" size={28}/>
                            </div>
                        </div>
                        <p className="text-xs font-semibold text-white/80 tracking-wider uppercase mb-2">
                            Sales Revenue | YTD
                        </p>
                        <h3 className="text-5xl font-bold text-white mb-1 tracking-tight">
                            {(stats.salesRevenueYTD / 1000000).toFixed(2)}M€
                        </h3>
                        <div className="h-1 w-16 bg-white/40 rounded-full mt-3"></div>
                    </div>
                </div>

                {/* Profit Card */}
                <div
                    className="group rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 backdrop-blur-xl border border-white/50 relative overflow-hidden"
                    style={{
                        background: 'linear-gradient(135deg, rgba(185, 123, 72, 0.95) 0%, rgba(139, 90, 52, 0.95) 100%)',
                        boxShadow: '0 8px 32px rgba(185, 123, 72, 0.25)'
                    }}>
                    <div
                        className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700"></div>
                    <div className="relative z-10">
                        <div className="flex items-start justify-between mb-6">
                            <div
                                className="w-14 h-14 rounded-2xl bg-white/25 backdrop-blur-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300"
                                style={{border: '1px solid rgba(255, 255, 255, 0.3)'}}>
                                <DollarSign className="text-white" size={28}/>
                            </div>
                        </div>
                        <p className="text-xs font-semibold text-white/80 tracking-wider uppercase mb-2">
                            Profit | YTD
                        </p>
                        <h3 className="text-5xl font-bold text-white mb-1 tracking-tight">
                            {(stats.profitYTD / 1000000).toFixed(2)}M€
                        </h3>
                        <div className="h-1 w-16 bg-white/40 rounded-full mt-3"></div>
                    </div>
                </div>
            </div>

            {/* Middle Section - Charts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {/* Monthly Revenue Bar Chart */}
                <div
                    className="rounded-3xl p-8 shadow-lg backdrop-blur-xl border border-white/50 relative overflow-hidden hover:shadow-2xl transition-all duration-500"
                    style={{
                        background: 'rgba(255, 255, 255, 0.8)',
                        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)'
                    }}>
                    <div
                        className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-[#b97b48]/10 to-transparent rounded-full blur-2xl"></div>
                    <div className="relative z-10">
                        <div className="mb-6">
                            <p className="text-xs font-semibold tracking-wider uppercase mb-2"
                               style={{color: '#8B5A34'}}>
                                Average Monthly Sales Revenue
                            </p>
                            <h3 className="text-4xl font-bold tracking-tight" style={{color: '#b97b48'}}>
                                970,907 €
                            </h3>
                        </div>
                        <ResponsiveContainer width="100%" height={220}>
                            <BarChart data={monthlyRevenueData}>
                                <defs>
                                    <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#b97b48" stopOpacity={1}/>
                                        <stop offset="100%" stopColor="#8B5A34" stopOpacity={0.8}/>
                                    </linearGradient>
                                </defs>
                                <Bar dataKey="revenue" fill="url(#barGradient)" radius={[12, 12, 0, 0]}/>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Profit Margin Donut Chart */}
                <div
                    className="rounded-3xl p-8 shadow-lg backdrop-blur-xl border border-white/50 relative overflow-hidden hover:shadow-2xl transition-all duration-500"
                    style={{
                        background: 'rgba(255, 255, 255, 0.8)',
                        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)'
                    }}>
                    <div
                        className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-[#b97b48]/10 to-transparent rounded-full blur-2xl"></div>
                    <div className="relative z-10">
                        <div className="mb-6">
                            <p className="text-xs font-semibold tracking-wider uppercase mb-2"
                               style={{color: '#8B5A34'}}>
                                Sales Target Achievement
                            </p>
                            <h3 className="text-4xl font-bold tracking-tight" style={{color: '#b97b48'}}>
                                8,247,331 €
                            </h3>
                        </div>
                        <div className="relative" style={{height: 200}}>
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={[
                                            {name: 'Achieved', value: stats.profitMargin},
                                            {name: 'Remaining', value: 100 - stats.profitMargin}
                                        ]}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={80}
                                        startAngle={90}
                                        endAngle={-270}
                                        dataKey="value"
                                    >
                                        <Cell fill="#b97b48"/>
                                        <Cell fill="#f0f0f0"/>
                                    </Pie>
                                </PieChart>
                            </ResponsiveContainer>
                            <div className="absolute inset-0 flex items-center justify-center flex-col">
                                <p className="text-xs" style={{color: '#8B5A34'}}>34.95M€</p>
                                <p className="text-2xl font-bold" style={{color: '#b97b48'}}>
                                    {stats.profitMargin}%
                                </p>
                                <p className="text-xs" style={{color: '#8B5A34'}}>8M €</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Monthly Growth Trend */}
                <div
                    className="rounded-3xl p-8 shadow-lg backdrop-blur-xl border border-white/50 relative overflow-hidden hover:shadow-2xl transition-all duration-500"
                    style={{
                        background: 'rgba(255, 255, 255, 0.8)',
                        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)'
                    }}>
                    <div
                        className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-[#b97b48]/10 to-transparent rounded-full blur-2xl"></div>
                    <div className="relative z-10">
                        <p className="text-xs font-semibold tracking-wider uppercase mb-4" style={{color: '#8B5A34'}}>
                            Monthly Business Growth
                        </p>
                        <div className="text-center mb-6">
                            <p className="text-5xl font-bold" style={{color: '#b97b48'}}>13.00%</p>
                            <p className="text-sm mt-2" style={{color: '#8B5A34'}}>
                                Target Growth: <span className="font-bold">15%</span>
                            </p>
                        </div>
                        <ResponsiveContainer width="100%" height={180}>
                            <BarChart data={monthlyGrowthData}>
                                <defs>
                                    <linearGradient id="growthGradient" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#b97b48" stopOpacity={0.9}/>
                                        <stop offset="100%" stopColor="#8B5A34" stopOpacity={0.7}/>
                                    </linearGradient>
                                </defs>
                                <Bar dataKey="revenue" fill="url(#growthGradient)" radius={[8, 8, 0, 0]}/>
                            </BarChart>
                        </ResponsiveContainer>
                        <p className="text-xs text-center mt-4" style={{color: '#8B5A34'}}>
                            Cumulative Revenue | Last 12 Months
                        </p>
                    </div>
                </div>

                {/* Sales by Country */}
                <div
                    className="rounded-3xl p-8 shadow-lg backdrop-blur-xl border border-white/50 relative overflow-hidden hover:shadow-2xl transition-all duration-500"
                    style={{
                        background: 'rgba(255, 255, 255, 0.8)',
                        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)'
                    }}>
                    <div
                        className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-[#b97b48]/10 to-transparent rounded-full blur-2xl"></div>
                    <div className="relative z-10">
                        <p className="text-xs font-semibold tracking-wider uppercase mb-4" style={{color: '#8B5A34'}}>
                            Sales Performance by Country
                        </p>
                        <ResponsiveContainer width="100%" height={250}>
                            <PieChart>
                                <Pie
                                    data={salesByCountry as any}
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={80}
                                    dataKey="value"
                                    label={(item: any) => `${item.percentage}%`}
                                >
                                    {salesByCountry.map((_, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]}/>
                                    ))}
                                </Pie>
                                <Tooltip/>
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="mt-4 space-y-2">
                            {salesByCountry.map((country, idx) => (
                                <div key={idx} className="flex items-center justify-between text-sm">
                                    <div className="flex items-center gap-2">
                                        <div
                                            className="w-3 h-3 rounded-full"
                                            style={{backgroundColor: COLORS[idx]}}
                                        />
                                        <span style={{color: '#8B5A34'}}>{country.country}</span>
                                    </div>
                                    <span className="font-bold" style={{color: '#b97b48'}}>
                                    {(country.value / 1000000).toFixed(2)}M€
                                </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Customer Metrics */}
                <div
                    className="rounded-3xl p-8 shadow-lg backdrop-blur-xl border border-white/50 relative overflow-hidden hover:shadow-2xl transition-all duration-500"
                    style={{
                        background: 'rgba(255, 255, 255, 0.8)',
                        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)'
                    }}>
                    <div
                        className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-[#b97b48]/10 to-transparent rounded-full blur-2xl"></div>
                    <div className="relative z-10">
                        <div className="mb-8">
                            <p className="text-xs font-semibold tracking-wider uppercase mb-2"
                               style={{color: '#8B5A34'}}>
                                Average Revenue per Unit (ARPU)
                            </p>
                            <p className="text-4xl font-bold tracking-tight" style={{color: '#b97b48'}}>104.92 €</p>
                            <ResponsiveContainer width="100%" height={80}>
                                <AreaChart data={arpuData}>
                                    <defs>
                                        <linearGradient id="arpuGradient" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="0%" stopColor="#b97b48" stopOpacity={0.4}/>
                                            <stop offset="100%" stopColor="#FAEECF" stopOpacity={0.1}/>
                                        </linearGradient>
                                    </defs>
                                    <Area type="monotone" dataKey="value" stroke="#b97b48" strokeWidth={2}
                                          fill="url(#arpuGradient)"/>
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>

                        <div className="mb-8">
                            <p className="text-xs font-semibold tracking-wider uppercase mb-2"
                               style={{color: '#8B5A34'}}>
                                Customer Lifetime Value (CLV)
                            </p>
                            <p className="text-4xl font-bold tracking-tight" style={{color: '#b97b48'}}>250.08 €</p>
                            <ResponsiveContainer width="100%" height={80}>
                                <LineChart data={clvData}>
                                    <Line type="monotone" dataKey="clv" stroke="#b97b48" strokeWidth={3} dot={false}/>
                                </LineChart>
                            </ResponsiveContainer>
                        </div>

                        <div>
                            <p className="text-xs font-semibold tracking-wider uppercase mb-2"
                               style={{color: '#8B5A34'}}>
                                Customer Acquisition Cost (CAC)
                            </p>
                            <p className="text-4xl font-bold tracking-tight" style={{color: '#b97b48'}}>282.67 €</p>
                            <ResponsiveContainer width="100%" height={80}>
                                <BarChart data={clvData}>
                                    <defs>
                                        <linearGradient id="cacGradient" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="0%" stopColor="#b97b48" stopOpacity={0.9}/>
                                            <stop offset="100%" stopColor="#8B5A34" stopOpacity={0.6}/>
                                        </linearGradient>
                                    </defs>
                                    <Bar dataKey="cac" fill="url(#cacGradient)" radius={[6, 6, 0, 0]}/>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
