// "use client"
// import React from 'react';
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';

// const RootLayouts = ({ portfolio = [] }: { portfolio: any[] }) => {
//  // Process data for charts
//   const symbolData = portfolio.reduce((acc, trade) => {
//     if (!acc[trade.symbol]) {
//       acc[trade.symbol] = {
//         symbol: trade.symbol,
//         totalQty: 0,
//         totalValue: 0,
//         avgPrice: 0,
//         trades: 0
//       };
//     }
//     acc[trade.symbol].totalQty += trade.trade_qty;
//     acc[trade.symbol].totalValue += parseFloat(trade.value);
//     acc[trade.symbol].trades += 1;
//     acc[trade.symbol].avgPrice = acc[trade.symbol].totalValue / acc[trade.symbol].totalQty;
//     return acc;
//   }, {});

//   const chartData = Object.values(symbolData);

//   // Colors for pie chart
//   const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D', '#FFC658'];

//   const totalPortfolioValue = portfolio.reduce((sum, trade) => sum + parseFloat(trade.value), 0);

//   return (
//     <div className="p-6 bg-gray-50 min-h-screen">
//       <div className="max-w-7xl mx-auto">
//         <h1 className="text-3xl font-bold text-gray-900 mb-8">Portfolio Trading Dashboard</h1>

//         {/* Summary Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
//           <div className="bg-white rounded-lg shadow p-6">
//             <h3 className="text-sm font-medium text-gray-500">Total Portfolio Value</h3>
//             <p className="text-2xl font-bold text-gray-900">NPR {totalPortfolioValue.toLocaleString()}</p>
//           </div>
//           <div className="bg-white rounded-lg shadow p-6">
//             <h3 className="text-sm font-medium text-gray-500">Total Trades</h3>
//             <p className="text-2xl font-bold text-gray-900">{portfolio.length}</p>
//           </div>
//           <div className="bg-white rounded-lg shadow p-6">
//             <h3 className="text-sm font-medium text-gray-500">Unique Symbols</h3>
//             <p className="text-2xl font-bold text-gray-900">{Object.keys(symbolData).length}</p>
//           </div>
//           <div className="bg-white rounded-lg shadow p-6">
//             <h3 className="text-sm font-medium text-gray-500">Avg Trade Value</h3>
//             <p className="text-2xl font-bold text-gray-900">NPR {(totalPortfolioValue / portfolio.length).toFixed(2)}</p>
//           </div>
//         </div>

//         {/* Charts Row */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
//           {/* Bar Chart - Total Value by Symbol */}
//           <div className="bg-white rounded-lg shadow p-6">
//             <h3 className="text-lg font-semibold text-gray-900 mb-4">Total Value by Symbol</h3>
//             <div className="h-80">
//               <ResponsiveContainer width="100%" height="100%">
//                 <BarChart data={chartData}>
//                   <CartesianGrid strokeDasharray="3 3" />
//                   <XAxis dataKey="symbol" />
//                   <YAxis />
//                   <Tooltip formatter={(value) => [`NPR ${parseFloat(String(value)).toLocaleString()}`, 'Total Value']} />
//                   <Bar dataKey="totalValue" fill="#3B82F6" />
//                 </BarChart>
//               </ResponsiveContainer>
//             </div>
//           </div>

//           {/* Pie Chart - Portfolio Distribution */}
//           <div className="bg-white rounded-lg shadow p-6">
//             <h3 className="text-lg font-semibold text-gray-900 mb-4">Portfolio Distribution</h3>
//             <div className="h-80">
//               <ResponsiveContainer width="100%" height="100%">
//                 <PieChart>
//                   <Pie
//                     data={chartData}
//                     cx="50%"
//                     cy="50%"
//                     labelLine={false}
//                     label={({ symbol, percent }) => `${symbol} ${(percent * 100).toFixed(0)}%`}
//                     outerRadius={80}
//                     fill="#8884d8"
//                     dataKey="totalValue"
//                   >
//                     {chartData.map((entry, index) => (
//                       <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                     ))}
//                   </Pie>
//                   <Tooltip formatter={(value) => [`NPR ${parseFloat(String(value)).toLocaleString()}`, 'Value']} />
//                 </PieChart>
//               </ResponsiveContainer>
//             </div>
//           </div>
//         </div>

//         {/* Quantity and Price Charts */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
//           {/* Bar Chart - Total Quantity by Symbol */}
//           <div className="bg-white rounded-lg shadow p-6">
//             <h3 className="text-lg font-semibold text-gray-900 mb-4">Total Quantity by Symbol</h3>
//             <div className="h-80">
//               <ResponsiveContainer width="100%" height="100%">
//                 <BarChart data={chartData}>
//                   <CartesianGrid strokeDasharray="3 3" />
//                   <XAxis dataKey="symbol" />
//                   <YAxis />
//                   <Tooltip formatter={(value) => [value, 'Total Quantity']} />
//                   <Bar dataKey="totalQty" fill="#10B981" />
//                 </BarChart>
//               </ResponsiveContainer>
//             </div>
//           </div>

//           {/* Line Chart - Average Price by Symbol */}
//           <div className="bg-white rounded-lg shadow p-6">
//             <h3 className="text-lg font-semibold text-gray-900 mb-4">Average Price by Symbol</h3>
//             <div className="h-80">
//               <ResponsiveContainer width="100%" height="100%">
//                 <LineChart data={chartData}>
//                   <CartesianGrid strokeDasharray="3 3" />
//                   <XAxis dataKey="symbol" />
//                   <YAxis />
//                   <Tooltip formatter={(value) => [`NPR ${parseFloat(String(value)).toFixed(2)}`, 'Avg Price']} />
//                   <Line type="monotone" dataKey="avgPrice" stroke="#F59E0B" strokeWidth={3} />
//                 </LineChart>
//               </ResponsiveContainer>
//             </div>
//           </div>
//         </div>

//         {/* Trading Data Grid */}
//         <div className="bg-white rounded-lg shadow">
//           <div className="px-6 py-4 border-b border-gray-200">
//             <h3 className="text-lg font-semibold text-gray-900">All Trading Transactions</h3>
//           </div>
//           <div className="overflow-x-auto">
//             <table className="min-w-full divide-y divide-gray-200">
//               <thead className="bg-gray-50">
//                 <tr>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Symbol</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Value</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date Created</th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-gray-200">
//                 {portfolio.map((trade) => (
//                   <tr key={trade.id} className="hover:bg-gray-50">
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="flex items-center">
//                         <div className="text-sm font-medium text-gray-900">{trade.symbol}</div>
//                       </div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
//                         trade.transaction_type === 'sell' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
//                       }`}>
//                         {trade.transaction_type.toUpperCase()}
//                       </span>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                       {trade.trade_qty}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                       NPR {parseFloat(trade.price).toFixed(2)}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
//                       NPR {parseFloat(trade.value).toLocaleString()}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                       {new Date(trade.created_at).toLocaleDateString()}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>

//         {/* Symbol Summary Grid */}
//         <div className="mt-8 bg-white rounded-lg shadow">
//           <div className="px-6 py-4 border-b border-gray-200">
//             <h3 className="text-lg font-semibold text-gray-900">Symbol Summary</h3>
//           </div>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
//             {Object.values(symbolData).map((symbol: any) => (
//               <div key={symbol.symbol} className="border border-gray-200 rounded-lg p-4">
//                 <h4 className="text-lg font-semibold text-gray-900 mb-3">{symbol.symbol}</h4>
//                 <div className="space-y-2">
//                   <div className="flex justify-between">
//                     <span className="text-sm text-gray-500">Total Quantity:</span>
//                     <span className="text-sm font-medium text-gray-900">{symbol.totalQty}</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span className="text-sm text-gray-500">Total Value:</span>
//                     <span className="text-sm font-medium text-gray-900">NPR {symbol.totalValue.toLocaleString()}</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span className="text-sm text-gray-500">Average Price:</span>
//                     <span className="text-sm font-medium text-gray-900">NPR {symbol.avgPrice.toFixed(2)}</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span className="text-sm text-gray-500">Number of Trades:</span>
//                     <span className="text-sm font-medium text-gray-900">{symbol.trades}</span>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RootLayouts;

"use client";
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  TrendingDown,
  DollarSign,
  Activity,
  User,
  Calendar,
  Clock,
} from "lucide-react";
import { string } from "zod";

const TradingDashboard = ({ portfolio = [] }: { portfolio: any[] }) => {
  // Return early if no data
  if (!portfolio || portfolio.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 md:p-6">
        <div className="max-w-7xl mx-auto">
          <Card className="bg-white border border-slate-200 shadow-lg">
            <CardContent className="flex items-center justify-center p-12">
              <div className="text-center">
                <Activity className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-slate-600">
                  No Trading Data
                </h3>
                <p className="text-slate-500">
                  No portfolio data available to display.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Process data for charts
  const symbolData: {
    [key: string]: {
      symbol: string;
      totalValue: number;
      totalQty: number;
      trades: number;
    };
  } = {};
  portfolio.forEach((trade: any) => {
    if (!symbolData[trade.symbol]) {
      symbolData[trade.symbol] = {
        symbol: trade.symbol,
        totalValue: 0,
        totalQty: 0,
        trades: 0,
      };
    }
    symbolData[trade.symbol].totalValue += parseFloat(trade.value);
    symbolData[trade.symbol].totalQty += trade.trade_qty;
    symbolData[trade.symbol].trades += 1;
  });

  const chartData = Object.values(symbolData);
  const pieData = chartData.map((item: any, index: number) => ({
    ...item,
    fill: `hsl(${index * 60}, 70%, 50%)`,
  }));

  const totalValue = portfolio.reduce(
    (sum: number, trade: any) => sum + parseFloat(trade.value),
    0
  );
  const totalTrades = portfolio.length;
  const uniqueSymbols = new Set(portfolio.map((trade: any) => trade.symbol))
    .size;

  // Time series data with proper date formatting
  const timeSeriesData = portfolio
    .sort(
      (a: any, b: any) =>
        new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
    )
    .map((trade: any) => ({
      id: trade.id,
      value: parseFloat(trade.value),
      symbol: trade.symbol,
      date: new Date(trade.created_at).toLocaleDateString(),
      time: new Date(trade.created_at).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      fullDateTime: new Date(trade.created_at).toLocaleString(),
    }));

  // Enhanced bar chart data with date/time info
  const enhancedBarData = Object.keys(symbolData).map((symbol: string) => {
    const symbolTrades = portfolio
      .filter((trade: any) => trade.symbol === symbol)
      .sort(
        (a: any, b: any) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );

    const latestTrade = symbolTrades[0];
    const earliestTrade = symbolTrades[symbolTrades.length - 1];

    return {
      ...symbolData[symbol],
      latestTradeTime: new Date(latestTrade.created_at).toLocaleString(),
      earliestTradeTime: new Date(earliestTrade.created_at).toLocaleString(),
      latestDate: new Date(latestTrade.created_at).toLocaleDateString(),
      latestTime: new Date(latestTrade.created_at).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
  });

  const user = portfolio[0]?.user;
  const clientInfo = portfolio[0];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header with User Info */}
        <div className="bg-white rounded-xl  p-4 md:p-6 border border-slate-200">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <Avatar className="h-12 w-12 md:h-16 md:w-16 bg-gradient-to-r from-blue-500 to-purple-600 flex-shrink-0">
                <AvatarFallback className="text-black bg-gray-100 font-bold text-sm md:text-lg">
                  {user?.first_name?.charAt(0)}
                  {user?.last_name?.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="min-w-0">
                <h1 className="text-xl md:text-3xl font-bold text-slate-800 truncate">
                  {clientInfo?.client_name}
                </h1>
                <div className="flex flex-wrap items-center gap-2 text-slate-600 text-sm md:text-base">
                  <div className="flex items-center space-x-1">
                    <User size={14} />
                    <span>@{user?.username}</span>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {user?.role?.replace("_", " ")}
                  </Badge>
                </div>
                <p className="text-xs md:text-sm text-slate-500">
                  Client ID: {clientInfo?.client_id}
                </p>
              </div>
            </div>
            <div className="text-left sm:text-right w-full sm:w-auto">
              <p className="text-sm text-slate-500">Email</p>
              <p className="font-medium text-sm md:text-base break-all sm:break-normal">
                {user?.email}
              </p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white border-0">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-base md:text-lg font-medium">
                Total Value
              </CardTitle>
              <DollarSign className="h-4 w-4 md:h-5 md:w-5" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl md:text-3xl font-bold">
                Rs.{totalValue.toLocaleString()}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white border-0">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-base md:text-lg font-medium">
                Total Trades
              </CardTitle>
              <Activity className="h-4 w-4 md:h-5 md:w-5" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl md:text-3xl font-bold">
                {totalTrades}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white border-0 sm:col-span-2 lg:col-span-1">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-base md:text-lg font-medium">
                Unique Symbols
              </CardTitle>
              <TrendingDown className="h-4 w-4 md:h-5 md:w-5" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl md:text-3xl font-bold">
                {uniqueSymbols}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {/* Bar Chart */}
          <Card className="bg-white border border-slate-200 shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg md:text-xl font-bold text-slate-800">
                Trading Volume by Symbol
              </CardTitle>
              <CardDescription>
                Total value traded with latest trading times
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={enhancedBarData}
                  margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    className="stroke-slate-200"
                  />
                  <XAxis
                    dataKey="symbol"
                    className="text-slate-600"
                    fontSize={12}
                    angle={-45}
                    textAnchor="end"
                    height={60}
                  />
                  <YAxis className="text-slate-600" fontSize={12} />
                  <Tooltip
                    formatter={(value) => [
                      `Rs.${parseFloat(String(value)).toLocaleString()}`,
                      "Total Value",
                    ]}
                    labelFormatter={(symbol, payload) => {
                      const data = payload?.[0]?.payload;
                      return data
                        ? `${symbol} (Last: ${data.latestTime} on ${data.latestDate})`
                        : symbol;
                    }}
                    contentStyle={{
                      backgroundColor: "#f8fafc",
                      border: "1px solid #e2e8f0",
                      borderRadius: "6px",
                      fontSize: "14px",
                    }}
                  />
                  <Bar
                    dataKey="totalValue"
                    fill="#10b981"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Pie Chart */}
          <Card className="bg-white border border-slate-200 shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg md:text-xl font-bold text-slate-800">
                Symbol Distribution
              </CardTitle>
              <CardDescription>
                Percentage of total trading volume with detailed info
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <ResponsiveContainer width="100%" height={280}>
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ symbol, percent }) =>
                        percent > 5
                          ? `${symbol} ${(percent * 100).toFixed(1)}%`
                          : ""
                      }
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="totalValue"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value) => [
                        `Rs.${parseFloat(String(value)).toLocaleString()}`,
                        "Total Value",
                      ]}
                      contentStyle={{
                        backgroundColor: "#f8fafc",
                        border: "1px solid #e2e8f0",
                        borderRadius: "6px",
                        fontSize: "14px",
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>

                {/* Symbol Info Table */}
                <div className="space-y-2">
                  <h4 className="font-semibold text-slate-700 text-sm">
                    Symbol Details
                  </h4>
                  <div className="max-h-64 overflow-y-auto space-y-2">
                    {chartData.map((item: any, index: number) => (
                      <div
                        key={item.symbol}
                        className="flex items-center justify-between p-2 bg-slate-50 rounded-lg border border-slate-100"
                      >
                        <div className="flex items-center space-x-2">
                          <div
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: pieData[index]?.fill }}
                          />
                          <Badge
                            variant="outline"
                            className="font-mono text-xs"
                          >
                            {item.symbol}
                          </Badge>
                        </div>
                        <div className="text-right text-xs">
                          <div className="font-semibold text-slate-800">
                            Rs.{item.totalValue.toLocaleString()}
                          </div>
                          <div className="text-slate-500">
                            {item.trades} trades • {item.totalQty} qty
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Trading Timeline */}
        <Card className="bg-white border border-slate-200 shadow-lg">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-blue-500" />
              <div>
                <CardTitle className="text-lg md:text-xl font-bold text-slate-800">
                  Trading Timeline
                </CardTitle>
                <CardDescription>
                  Trade values over time with date and time
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <LineChart
                data={timeSeriesData}
                margin={{ top: 5, right: 30, left: 20, bottom: 60 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  className="stroke-slate-200"
                />
                <XAxis
                  dataKey="time"
                  className="text-slate-600"
                  fontSize={11}
                  angle={-45}
                  textAnchor="end"
                  height={80}
                  interval={0}
                />
                <YAxis className="text-slate-600" fontSize={12} />
                <Tooltip
                  formatter={(value, name, props) => [
                    `Rs.${parseFloat(String(value)).toLocaleString()}`,
                    `${props.payload.symbol} Value`,
                  ]}
                  labelFormatter={(label, payload) =>
                    payload && payload[0]
                      ? `${payload[0].payload.fullDateTime}`
                      : label
                  }
                  contentStyle={{
                    backgroundColor: "#f8fafc",
                    border: "1px solid #e2e8f0",
                    borderRadius: "6px",
                    fontSize: "14px",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#10b981"
                  strokeWidth={3}
                  dot={{ fill: "#10b981", strokeWidth: 2, r: 5 }}
                  activeDot={{ r: 7, stroke: "#10b981", strokeWidth: 3 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Trading History Table */}
        <Card className="bg-white border border-slate-200 shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg md:text-xl font-bold text-slate-800">
              Trading History
            </CardTitle>
            <CardDescription>Detailed view of all transactions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse min-w-[700px]">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="text-left p-3 md:p-4 font-semibold text-slate-700 text-sm md:text-base">
                      ID
                    </th>
                    <th className="text-left p-3 md:p-4 font-semibold text-slate-700 text-sm md:text-base">
                      Symbol
                    </th>
                    <th className="text-left p-3 md:p-4 font-semibold text-slate-700 text-sm md:text-base">
                      Type
                    </th>
                    <th className="text-left p-3 md:p-4 font-semibold text-slate-700 text-sm md:text-base">
                      Quantity
                    </th>
                    <th className="text-left p-3 md:p-4 font-semibold text-slate-700 text-sm md:text-base">
                      Price
                    </th>
                    <th className="text-left p-3 md:p-4 font-semibold text-slate-700 text-sm md:text-base">
                      Value
                    </th>
                    <th className="text-left p-3 md:p-4 font-semibold text-slate-700 text-sm md:text-base">
                      <div className="flex items-center space-x-1">
                        <Clock size={14} />
                        <span>Date & Time</span>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {portfolio.map((trade: any, index: number) => (
                    <tr
                      key={trade.id}
                      className={`border-b border-slate-100 ${
                        index % 2 === 0 ? "bg-slate-50" : "bg-white"
                      } hover:bg-blue-50 transition-colors`}
                    >
                      <td className="p-3 md:p-4 text-slate-800 text-sm md:text-base">
                        #{trade.id}
                      </td>
                      <td className="p-3 md:p-4">
                        <Badge
                          variant="outline"
                          className="font-mono text-xs md:text-sm"
                        >
                          {trade.symbol}
                        </Badge>
                      </td>
                      <td className="p-3 md:p-4">
                        <Badge className="bg-red-100 text-red-800 border-red-200 text-xs md:text-sm">
                          {trade.transaction_type.toUpperCase()}
                        </Badge>
                      </td>
                      <td className="p-3 md:p-4 text-slate-800 text-sm md:text-base">
                        {trade.trade_qty}
                      </td>
                      <td className="p-3 md:p-4 text-slate-800 text-sm md:text-base">
                        Rs.{parseFloat(trade.price).toFixed(2)}
                      </td>
                      <td className="p-3 md:p-4 font-semibold text-slate-800 text-sm md:text-base">
                        Rs.{parseFloat(trade.value).toLocaleString()}
                      </td>
                      <td className="p-3 md:p-4 text-slate-600 text-xs md:text-sm">
                        <div className="space-y-1">
                          <div className="flex items-center space-x-1">
                            <Calendar size={12} />
                            <span>
                              {new Date(trade.created_at).toLocaleDateString()}
                            </span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock size={12} />
                            <span>
                              {new Date(trade.created_at).toLocaleTimeString(
                                [],
                                {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                }
                              )}
                            </span>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Trading Cards Grid */}
        <Card className="bg-white border border-slate-200 shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg md:text-xl font-bold text-slate-800">
              Trade Cards Overview
            </CardTitle>
            <CardDescription>
              Card view of individual transactions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {portfolio.map((trade: any) => (
                <div
                  key={trade.id}
                  className="bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200 rounded-lg p-3 hover:shadow-md transition-shadow duration-300"
                >
                  <div className="flex justify-between items-start  mb-2">
                    {/* <span className="text-lg font-bold text-slate-800">
                      #{trade.id}
                    </span> */}
                    <Badge variant="default" className="font-mono text-xs">
                      {trade.symbol}
                    </Badge>
                  </div>

                  <div className="space-y-1 mb-2">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-600 text-sm">Type:</span>
                      <Badge className="bg-red-100 text-red-800 border-red-200 text-xs">
                        {trade.transaction_type.toUpperCase()}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-600 text-sm">Quantity:</span>
                      <span className="font-semibold text-slate-800 text-sm">
                        {trade.trade_qty}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-600 text-sm">Price:</span>
                      <span className="font-semibold text-slate-800 text-sm">
                        Rs. {parseFloat(trade.price).toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <div className="border-t border-slate-200  mb-2">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-600 text-sm">
                        Total Value:
                      </span>
                      <span className="font-bold text-green-600">
                        Rs. {parseFloat(trade.value).toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <div className="text-xs text-slate-500 ">
                    <div className="flex items-center space-x-1">
                      <Calendar size={10} />
                      <span>
                        {new Date(trade.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock size={10} />
                      <span>
                        {new Date(trade.created_at).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TradingDashboard;
