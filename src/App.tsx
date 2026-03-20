import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Warehouse, 
  ShoppingCart, 
  Sprout, 
  BarChart3, 
  Truck, 
  Bell, 
  User, 
  Settings, 
  Search,
  ChevronRight,
  Droplets,
  Scale,
  AlertTriangle,
  FileText,
  TrendingUp,
  Thermometer,
  Bug,
  ShieldAlert,
  Eye,
  MessageSquare,
  PieChart,
  Map,
  Video,
  Menu,
  X
} from 'lucide-react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  BarChart, Bar, Cell, AreaChart, Area, PieChart as RePieChart, Pie, RadarChart, PolarGrid, PolarAngleAxis, Radar
} from 'recharts';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from './lib/utils';

// --- Mock Data ---
const moistureData = [
  { time: '08:00', value: 12.5 },
  { time: '09:00', value: 12.8 },
  { time: '10:00', value: 13.2 },
  { time: '11:00', value: 12.9 },
  { time: '12:00', value: 12.6 },
  { time: '13:00', value: 12.4 },
];

const warnings = [
  { id: '1', type: '水分异常', location: '3号库入库口', time: '10:25', severity: 'high', status: '待处理' },
  { id: '2', type: '虫情预警', location: 'A区5号仓', time: '09:15', severity: 'medium', status: '处理中' },
  { id: '3', type: '人员违规', location: '装卸区B', time: '08:45', severity: 'low', status: '已解决' },
];

const salesTrend = [
  { name: '周一', sales: 4000 },
  { name: '周二', sales: 3000 },
  { name: '周三', sales: 2000 },
  { name: '周四', sales: 2780 },
  { name: '周五', sales: 1890 },
  { name: '周六', sales: 2390 },
  { name: '周日', sales: 3490 },
];

// --- Components ---

const Card = ({ children, className, title, subtitle }: { children: React.ReactNode; className?: string; title?: string; subtitle?: string; key?: React.Key }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className={cn("bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden", className)}
  >
    {(title || subtitle) && (
      <div className="px-6 py-4 border-b border-slate-50">
        {title && <h3 className="text-sm font-bold text-slate-800">{title}</h3>}
        {subtitle && <p className="text-[10px] text-slate-400 mt-0.5">{subtitle}</p>}
      </div>
    )}
    <div className="p-6">
      {children}
    </div>
  </motion.div>
);

const StatCard = ({ icon: Icon, label, value, trend, color }: { icon: any; label: string; value: string; trend?: string; color: string; key?: React.Key }) => (
  <motion.div 
    whileHover={{ y: -4 }}
    className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4"
  >
    <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-lg", color)}>
      <Icon className="w-6 h-6" />
    </div>
    <div>
      <p className="text-xs text-slate-400 font-medium">{label}</p>
      <div className="flex items-baseline gap-2">
        <h3 className="text-xl font-bold text-slate-800">{value}</h3>
        {trend && (
          <span className={cn("text-[10px] font-bold px-1.5 py-0.5 rounded", 
            trend.startsWith('+') ? 'bg-emerald-50 text-emerald-600' : 
            trend === '正常' || trend === '安全' || trend === '稳定' ? 'bg-blue-50 text-blue-600' : 'bg-slate-50 text-slate-500'
          )}>{trend}</span>
        )}
      </div>
    </div>
  </motion.div>
);

// --- Module Views ---

const TabButton = ({ active, onClick, label }: { active: boolean, onClick: () => void, label: string }) => (
  <button 
    onClick={onClick}
    className={cn(
      "px-4 py-2 text-sm font-medium rounded-lg transition-all",
      active ? "bg-white text-emerald-700 shadow-sm" : "text-slate-500 hover:text-slate-700 hover:bg-slate-100"
    )}
  >
    {label}
  </button>
);

const AcquisitionView = () => {
  const [tab, setTab] = useState('quality');
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Scale} label="今日收购总量" value="1,240 吨" trend="+12%" color="bg-emerald-500" />
        <StatCard icon={Droplets} label="平均水分" value="12.6%" trend="-0.2%" color="bg-blue-500" />
        <StatCard icon={Thermometer} label="平均温度" value="18.5°C" trend="稳定" color="bg-orange-500" />
        <StatCard icon={User} label="今日入库农户" value="42 户" trend="+5" color="bg-indigo-500" />
      </div>

      <div className="flex items-center gap-2 p-1 bg-slate-200/50 rounded-xl w-fit">
        <TabButton active={tab === 'quality'} onClick={() => setTab('quality')} label="质量检测" />
        <TabButton active={tab === 'warning'} onClick={() => setTab('warning')} label="粮情预警" />
        <TabButton active={tab === 'ocr'} onClick={() => setTab('ocr')} label="单据识别" />
        <TabButton active={tab === 'pricing'} onClick={() => setTab('pricing')} label="定价建议" />
        <TabButton active={tab === 'farmer'} onClick={() => setTab('farmer')} label="农户管理" />
      </div>

      <AnimatePresence mode="wait">
        {tab === 'quality' && (
          <motion.div key="quality" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card title="水分/容重实时分析" subtitle="智能传感器实时采集数据">
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={moistureData}>
                      <defs>
                        <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                          <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <XAxis dataKey="time" axisLine={false} tickLine={false} />
                      <YAxis axisLine={false} tickLine={false} />
                      <Tooltip />
                      <Area type="monotone" dataKey="value" stroke="#3b82f6" fillOpacity={1} fill="url(#colorValue)" strokeWidth={2} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </Card>
              <Card title="等级评定结果" subtitle="依据国家粮食质量标准自动判断">
                <div className="flex flex-col items-center justify-center h-full py-8">
                  <div className="w-32 h-32 rounded-full border-8 border-emerald-500 flex items-center justify-center mb-4">
                    <span className="text-4xl font-bold text-emerald-600">一等</span>
                  </div>
                  <div className="grid grid-cols-2 gap-8 w-full">
                    <div className="text-center">
                      <p className="text-sm text-slate-500">综合评分</p>
                      <p className="text-2xl font-bold text-slate-800">94.5</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-slate-500">达标率</p>
                      <p className="text-2xl font-bold text-slate-800">100%</p>
                    </div>
                  </div>
                  <div className="mt-6 w-full space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-500">杂质含量</span>
                      <span className="text-emerald-600 font-bold">0.8% (优)</span>
                    </div>
                    <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 w-[92%]" />
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-500">不完善粒</span>
                      <span className="text-emerald-600 font-bold">2.1% (优)</span>
                    </div>
                    <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 w-[88%]" />
                    </div>
                  </div>
                </div>
              </Card>
            </div>
            <Card title="最近入库记录">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-slate-100">
                      <th className="pb-4 font-semibold text-slate-500 text-sm">时间</th>
                      <th className="pb-4 font-semibold text-slate-500 text-sm">农户</th>
                      <th className="pb-4 font-semibold text-slate-500 text-sm">品种</th>
                      <th className="pb-4 font-semibold text-slate-500 text-sm">数量</th>
                      <th className="pb-4 font-semibold text-slate-500 text-sm">等级</th>
                      <th className="pb-4 font-semibold text-slate-500 text-sm">状态</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {[
                      { time: '14:20', name: '张建国', type: '优质小麦', amount: '24.5t', grade: '一等', status: '已入库' },
                      { time: '13:45', name: '李大为', type: '红小麦', amount: '18.2t', grade: '二等', status: '质检中' },
                      { time: '13:10', name: '王爱军', type: '优质小麦', amount: '32.0t', grade: '一等', status: '已入库' },
                    ].map((r, i) => (
                      <tr key={i} className="hover:bg-slate-50 transition-colors">
                        <td className="py-4 text-sm text-slate-600">{r.time}</td>
                        <td className="py-4 text-sm font-medium text-slate-800">{r.name}</td>
                        <td className="py-4 text-sm text-slate-600">{r.type}</td>
                        <td className="py-4 text-sm text-slate-600">{r.amount}</td>
                        <td className="py-4 text-sm text-emerald-600 font-bold">{r.grade}</td>
                        <td className="py-4">
                          <span className={cn("px-2 py-1 rounded text-[10px] font-bold", 
                            r.status === '已入库' ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-100 text-blue-700'
                          )}>
                            {r.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </motion.div>
        )}

        {tab === 'warning' && (
          <motion.div key="warning" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} className="space-y-6">
            <Card title="粮情监测总览">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-4 rounded-xl bg-red-50 border border-red-100">
                  <p className="text-red-600 text-sm font-bold mb-1">高风险预警</p>
                  <p className="text-3xl font-bold text-red-900">1</p>
                </div>
                <div className="p-4 rounded-xl bg-amber-50 border border-amber-100">
                  <p className="text-amber-600 text-sm font-bold mb-1">中风险预警</p>
                  <p className="text-3xl font-bold text-amber-900">2</p>
                </div>
                <div className="p-4 rounded-xl bg-blue-50 border border-blue-100">
                  <p className="text-blue-600 text-sm font-bold mb-1">正常监测点</p>
                  <p className="text-3xl font-bold text-blue-900">124</p>
                </div>
              </div>
            </Card>
            <Card title="实时预警列表">
              <div className="space-y-4">
                {warnings.map(w => (
                  <div key={w.id} className="flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-100">
                    <div className="flex items-center gap-4">
                      <AlertTriangle className={cn("w-6 h-6", w.severity === 'high' ? 'text-red-500' : 'text-amber-500')} />
                      <div>
                        <p className="font-semibold text-slate-800">{w.type}</p>
                        <p className="text-xs text-slate-500">{w.location} · {w.time}</p>
                      </div>
                    </div>
                    <button className="text-sm font-medium text-blue-600 hover:underline">查看详情</button>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        )}

        {tab === 'ocr' && (
          <motion.div key="ocr" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card title="单据扫描上传">
              <div className="flex flex-col items-center justify-center h-64 border-2 border-dashed border-slate-200 rounded-xl bg-slate-50 cursor-pointer hover:bg-slate-100 transition-colors">
                <Video className="w-12 h-12 text-slate-400 mb-4" />
                <p className="text-slate-600 font-medium">点击开启摄像头扫描</p>
                <p className="text-xs text-slate-400 mt-2">或拖拽文件到此处</p>
              </div>
            </Card>
            <Card title="OCR 识别结果预览">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase text-slate-400 font-bold">粮食种类</label>
                    <input type="text" defaultValue="优质小麦" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase text-slate-400 font-bold">数量 (吨)</label>
                    <input type="text" defaultValue="24.5" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase text-slate-400 font-bold">农户姓名</label>
                    <input type="text" defaultValue="张建国" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase text-slate-400 font-bold">收购等级</label>
                    <input type="text" defaultValue="一等" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm" />
                  </div>
                </div>
                <div className="flex gap-2 pt-4">
                  <button className="flex-1 bg-emerald-600 text-white py-2 rounded-lg text-sm font-medium">确认入库</button>
                  <button className="flex-1 bg-slate-100 text-slate-600 py-2 rounded-lg text-sm font-medium">重新识别</button>
                </div>
              </div>
            </Card>
          </motion.div>
        )}

        {tab === 'pricing' && (
          <motion.div key="pricing" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card title="建议定价区间" className="lg:col-span-1">
                <div className="text-center py-8">
                  <p className="text-sm text-slate-500 mb-2">AI 推荐收购价</p>
                  <p className="text-4xl font-bold text-indigo-600">¥2.52</p>
                  <p className="text-xs text-slate-400 mt-2">区间: ¥2.45 - ¥2.58</p>
                  <div className="mt-8 p-4 bg-indigo-50 rounded-xl text-left">
                    <p className="text-xs text-indigo-700 font-bold mb-2 uppercase">定价依据</p>
                    <ul className="text-xs text-indigo-600 space-y-1">
                      <li>• 市场行情上涨 0.8%</li>
                      <li>• 粮食等级评定为一等</li>
                      <li>• 当前库存处于低位</li>
                    </ul>
                  </div>
                </div>
              </Card>
              <Card title="市场行情分析" className="lg:col-span-2">
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={salesTrend}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="sales" stroke="#6366f1" strokeWidth={3} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </Card>
            </div>
          </motion.div>
        )}

        {tab === 'farmer' && (
          <motion.div key="farmer" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card title="农户信息管理" className="lg:col-span-2" subtitle="基于历史收购质量与履约情况">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-slate-100">
                      <th className="pb-4 font-semibold text-slate-500 text-sm">农户姓名</th>
                      <th className="pb-4 font-semibold text-slate-500 text-sm">种植面积 (亩)</th>
                      <th className="pb-4 font-semibold text-slate-500 text-sm">历史收购 (吨)</th>
                      <th className="pb-4 font-semibold text-slate-500 text-sm">信用等级</th>
                      <th className="pb-4 font-semibold text-slate-500 text-sm">操作</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {[
                      { name: '张建国', area: 120, total: 450, credit: '优' },
                      { name: '李大为', area: 85, total: 320, credit: '良' },
                      { name: '王爱军', area: 200, total: 800, credit: '优' },
                      { name: '赵铁柱', area: 50, total: 180, credit: '中' },
                    ].map(f => (
                      <tr key={f.name} className="hover:bg-slate-50 transition-colors">
                        <td className="py-4 text-sm font-medium text-slate-800">{f.name}</td>
                        <td className="py-4 text-sm text-slate-600">{f.area}</td>
                        <td className="py-4 text-sm text-slate-600">{f.total}</td>
                        <td className="py-4">
                          <span className={cn("px-2 py-1 rounded text-[10px] font-bold", 
                            f.credit === '优' ? 'bg-emerald-100 text-emerald-700' : 
                            f.credit === '良' ? 'bg-blue-100 text-blue-700' : 'bg-amber-100 text-amber-700'
                          )}>
                            {f.credit}
                          </span>
                        </td>
                        <td className="py-4">
                          <button className="text-xs text-indigo-600 font-semibold hover:underline">查看画像</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
            <div className="space-y-6">
              <Card title="农户分布分析" subtitle="区域供应占比">
                <div className="h-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RePieChart>
                      <Pie data={[
                        { name: '东部产区', value: 400 },
                        { name: '西部产区', value: 300 },
                        { name: '南部产区', value: 200 },
                        { name: '北部产区', value: 100 },
                      ]} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                        <Cell fill="#6366f1" />
                        <Cell fill="#8b5cf6" />
                        <Cell fill="#a855f7" />
                        <Cell fill="#d946ef" />
                      </Pie>
                      <Tooltip />
                    </RePieChart>
                  </ResponsiveContainer>
                </div>
                <div className="grid grid-cols-2 gap-2 mt-4">
                  {[
                    { label: '东部', color: 'bg-indigo-500' },
                    { label: '西部', color: 'bg-violet-500' },
                    { label: '南部', color: 'bg-purple-500' },
                    { label: '北部', color: 'bg-fuchsia-500' },
                  ].map(item => (
                    <div key={item.label} className="flex items-center gap-2">
                      <div className={cn("w-2 h-2 rounded-full", item.color)} />
                      <span className="text-[10px] text-slate-500">{item.label}</span>
                    </div>
                  ))}
                </div>
              </Card>
              <Card title="收购价格走势" subtitle="近 7 日均价 (元/斤)">
                <div className="h-[150px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={[
                      { day: '03-14', price: 1.25 },
                      { day: '03-15', price: 1.26 },
                      { day: '03-16', price: 1.24 },
                      { day: '03-17', price: 1.27 },
                      { day: '03-18', price: 1.28 },
                      { day: '03-19', price: 1.27 },
                      { day: '03-20', price: 1.29 },
                    ]}>
                      <XAxis dataKey="day" hide />
                      <Tooltip />
                      <Bar dataKey="price" fill="#6366f1" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </Card>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const StorageView = () => {
  const [tab, setTab] = useState('env');
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Warehouse} label="当前总库存" value="12,450 吨" trend="安全" color="bg-emerald-500" />
        <StatCard icon={Thermometer} label="平均仓温" value="16.2°C" trend="-0.5°C" color="bg-orange-500" />
        <StatCard icon={Droplets} label="平均仓湿" value="54%" trend="+2%" color="bg-blue-500" />
        <StatCard icon={Bug} label="虫情风险" value="极低" trend="稳定" color="bg-emerald-500" />
      </div>

      <div className="flex items-center gap-2 p-1 bg-slate-200/50 rounded-xl w-fit">
        <TabButton active={tab === 'env'} onClick={() => setTab('env')} label="温湿度调控" />
        <TabButton active={tab === 'pest'} onClick={() => setTab('pest')} label="虫情监测" />
        <TabButton active={tab === 'safety'} onClick={() => setTab('safety')} label="安全防护" />
        <TabButton active={tab === 'behavior'} onClick={() => setTab('behavior')} label="行为管控" />
      </div>

      <AnimatePresence mode="wait">
        {tab === 'env' && (
          <motion.div key="env" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card title="温湿度实时曲线" className="lg:col-span-2">
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={[
                      { time: '00:00', temp: 15, hum: 50 },
                      { time: '04:00', temp: 14, hum: 52 },
                      { time: '08:00', temp: 16, hum: 55 },
                      { time: '12:00', temp: 20, hum: 58 },
                      { time: '16:00', temp: 22, hum: 56 },
                      { time: '20:00', temp: 19, hum: 53 },
                    ]}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="time" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="temp" stroke="#f97316" strokeWidth={2} name="温度" />
                      <Line type="monotone" dataKey="hum" stroke="#0ea5e9" strokeWidth={2} name="湿度" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </Card>
              <Card title="设备控制面板">
                <div className="space-y-4">
                  {[
                    { name: '1号仓通风机', status: '运行中', mode: '自动' },
                    { name: '2号仓除湿机', status: '待机', mode: '手动' },
                    { name: '3号仓空调', status: '运行中', mode: '自动' },
                    { name: '环流熏蒸系统', status: '关闭', mode: '手动' },
                  ].map(d => (
                    <div key={d.name} className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-slate-800">{d.name}</span>
                        <span className={cn("text-[10px] px-1.5 py-0.5 rounded font-bold", 
                          d.status === '运行中' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-200 text-slate-600'
                        )}>{d.status}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-slate-400">模式: {d.mode}</span>
                        <div className={cn("w-10 h-5 rounded-full relative cursor-pointer transition-colors", d.status === '运行中' ? 'bg-emerald-500' : 'bg-slate-300')}>
                          <div className={cn("absolute top-1 w-3 h-3 bg-white rounded-full transition-all", d.status === '运行中' ? 'right-1' : 'left-1')} />
                        </div>
                      </div>
                    </div>
                  ))}
                  <button className="w-full mt-2 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors">配置全局调控策略</button>
                </div>
              </Card>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map(i => (
                <Card key={i} title={`${i}号仓状态`} className="p-0">
                  <div className="p-4 space-y-3">
                    <div className="flex justify-between items-end">
                      <div>
                        <p className="text-xs text-slate-400">当前储量</p>
                        <p className="text-xl font-bold text-slate-800">2,400t</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-slate-400">品种</p>
                        <p className="text-sm font-medium text-slate-600">优质小麦</p>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-[10px] text-slate-400">
                        <span>仓容利用率</span>
                        <span>85%</span>
                      </div>
                      <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500 w-[85%]" />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-50">
                      <div className="text-center">
                        <p className="text-[10px] text-slate-400">平均温</p>
                        <p className="text-xs font-bold text-orange-600">16.5°C</p>
                      </div>
                      <div className="text-center">
                        <p className="text-[10px] text-slate-400">平均湿</p>
                        <p className="text-xs font-bold text-blue-600">52%</p>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </motion.div>
        )}

        {tab === 'pest' && (
          <motion.div key="pest" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card title="虫情监测仪表盘">
              <div className="flex flex-col items-center py-8">
                <div className="relative w-48 h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <RePieChart>
                      <Pie data={[{v: 85}, {v: 15}]} innerRadius={60} outerRadius={80} startAngle={180} endAngle={0} dataKey="v">
                        <Cell fill="#10b981" />
                        <Cell fill="#f1f5f9" />
                      </Pie>
                    </RePieChart>
                  </ResponsiveContainer>
                  <div className="absolute inset-0 flex flex-col items-center justify-center pt-8">
                    <span className="text-3xl font-bold text-slate-800">低风险</span>
                    <span className="text-xs text-slate-400">全仓覆盖率 98%</span>
                  </div>
                </div>
              </div>
            </Card>
            <Card title="害虫识别结果">
              <div className="space-y-4">
                {[
                  { type: '米象', count: 12, trend: 'stable', advice: '建议局部物理防治' },
                  { type: '谷蠹', count: 5, trend: 'down', advice: '维持当前环境' },
                ].map(p => (
                  <div key={p.type} className="p-4 rounded-xl border border-slate-100 bg-slate-50">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-bold text-slate-800">{p.type}</span>
                      <span className="text-sm text-slate-500">检测数量: {p.count}</span>
                    </div>
                    <p className="text-xs text-indigo-600 font-medium">防治建议: {p.advice}</p>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        )}

        {tab === 'safety' && (
          <motion.div key="safety" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} className="space-y-6">
            <Card title="安全监控总览">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-white"><ShieldAlert className="w-5 h-5" /></div>
                  <div><p className="text-xs text-emerald-600 font-bold">火灾监测</p><p className="text-lg font-bold text-emerald-900">正常</p></div>
                </div>
                <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-white"><Droplets className="w-5 h-5" /></div>
                  <div><p className="text-xs text-emerald-600 font-bold">漏水监测</p><p className="text-lg font-bold text-emerald-900">正常</p></div>
                </div>
              </div>
            </Card>
            <Card title="安全防护策略">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600"><ShieldAlert className="w-4 h-4" /></div>
                    <span className="text-sm font-medium">自动报警联动系统</span>
                  </div>
                  <div className="w-10 h-5 bg-emerald-500 rounded-full relative">
                    <div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full" />
                  </div>
                </div>
                <p className="text-xs text-slate-500">已启用 AI 实时监控，检测到火灾或漏水将立即触发声光报警并推送至管理端。</p>
              </div>
            </Card>
          </motion.div>
        )}

        {tab === 'behavior' && (
          <motion.div key="behavior" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card title="人员行为实时监控">
              <div className="relative aspect-video bg-slate-900 rounded-xl overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Video className="w-12 h-12 text-white/20" />
                </div>
                <div className="absolute top-4 left-4 flex items-center gap-2 px-2 py-1 bg-emerald-500 rounded text-[10px] text-white font-bold">
                  <div className="w-1.5 h-1.5 bg-white rounded-full animate-ping" />
                  AI 行为分析 - 5号仓
                </div>
              </div>
            </Card>
            <Card title="违规行为记录">
              <div className="space-y-4">
                {[
                  { type: '未戴安全帽', time: '14:20', location: 'A区通道', status: '已提醒' },
                  { type: '违规吸烟', time: '11:05', location: '装卸区外围', status: '已处理' },
                ].map((b, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-rose-50 border border-rose-100 rounded-lg">
                    <div className="flex items-center gap-3">
                      <AlertTriangle className="w-4 h-4 text-rose-500" />
                      <div>
                        <p className="text-sm font-bold text-rose-900">{b.type}</p>
                        <p className="text-[10px] text-rose-700">{b.location} · {b.time}</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold text-rose-600">{b.status}</span>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const SalesView = () => {
  const [tab, setTab] = useState('customer');
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={ShoppingCart} label="今日销售额" value="¥428,500" trend="+15.2%" color="bg-violet-500" />
        <StatCard icon={FileText} label="订单总量" value="156 单" trend="+8" color="bg-blue-500" />
        <StatCard icon={TrendingUp} label="客户转化率" value="24.5%" trend="+1.2%" color="bg-emerald-500" />
        <StatCard icon={Truck} label="待发货订单" value="12 单" trend="-3" color="bg-amber-500" />
      </div>

      <div className="flex items-center gap-2 p-1 bg-slate-200/50 rounded-xl w-fit">
        <TabButton active={tab === 'customer'} onClick={() => setTab('customer')} label="智能客服" />
        <TabButton active={tab === 'analysis'} onClick={() => setTab('analysis')} label="销售分析" />
      </div>

      <AnimatePresence mode="wait">
        {tab === 'customer' && (
          <motion.div key="customer" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card title="客服工作台" className="lg:col-span-2">
              <div className="flex flex-col h-[450px]">
                <div className="flex-1 space-y-4 overflow-y-auto pr-2 custom-scrollbar">
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-cyan-100 flex items-center justify-center flex-shrink-0"><MessageSquare className="w-4 h-4 text-cyan-600" /></div>
                    <div className="bg-slate-100 p-3 rounded-2xl rounded-tl-none text-sm text-slate-700 max-w-[80%]">您好！我是粮智云AI助手。请问有什么可以帮您的？</div>
                  </div>
                  <div className="flex gap-3 flex-row-reverse">
                    <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center flex-shrink-0"><User className="w-4 h-4 text-slate-500" /></div>
                    <div className="bg-violet-500 p-3 rounded-2xl rounded-tr-none text-sm text-white max-w-[80%]">我想查询一下最近的优质小麦价格。</div>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-cyan-100 flex items-center justify-center flex-shrink-0"><MessageSquare className="w-4 h-4 text-cyan-600" /></div>
                    <div className="bg-slate-100 p-3 rounded-2xl rounded-tl-none text-sm text-slate-700 max-w-[80%]">当前优质小麦（一等）的市场参考价为 ¥2.58/斤，较昨日上涨 0.8%。根据您的采购历史，大宗采购可享受 9.5 折优惠。</div>
                  </div>
                  <div className="flex gap-3 flex-row-reverse">
                    <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center flex-shrink-0"><User className="w-4 h-4 text-slate-500" /></div>
                    <div className="bg-violet-500 p-3 rounded-2xl rounded-tr-none text-sm text-white max-w-[80%]">那帮我生成一份 500 吨的采购意向单。</div>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-cyan-100 flex items-center justify-center flex-shrink-0"><MessageSquare className="w-4 h-4 text-cyan-600" /></div>
                    <div className="bg-slate-100 p-3 rounded-2xl rounded-tl-none text-sm text-slate-700 max-w-[80%]">好的，已为您生成采购意向单草案，请核对：<br/>品种：优质小麦（一等）<br/>数量：500 吨<br/>单价：¥2.45/斤（已含大宗优惠）<br/>总额：¥2,450,000</div>
                  </div>
                </div>
                <div className="mt-4 flex gap-2">
                  <input type="text" placeholder="输入您的问题..." className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500" />
                  <button className="bg-violet-500 text-white px-6 py-2 rounded-xl text-sm font-medium hover:bg-violet-600 transition-colors">发送</button>
                </div>
              </div>
            </Card>
            <div className="space-y-6">
              <Card title="常见问题知识库">
                <div className="space-y-2">
                  {['如何判定粮食等级？', '收购定价的依据是什么？', '仓储环境如何调控？', '种子品类如何推荐？', '大宗交易优惠政策', '物流配送覆盖范围'].map(q => (
                    <button key={q} className="w-full text-left p-3 rounded-lg hover:bg-slate-50 text-sm text-slate-600 border border-transparent hover:border-slate-200 transition-all">
                      {q}
                    </button>
                  ))}
                </div>
              </Card>
              <Card title="客户画像分析" subtitle="基于 AI 的意向客户分析">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600">活跃客户数</span>
                    <span className="text-sm font-bold text-slate-800">1,240</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600">复购率</span>
                    <span className="text-sm font-bold text-emerald-600">68%</span>
                  </div>
                  <div className="pt-4 border-t border-slate-50">
                    <p className="text-xs text-slate-400 mb-2 uppercase font-bold">客户地区分布</p>
                    <div className="space-y-2">
                      {[
                        { label: '华东', value: 45 },
                        { label: '华北', value: 30 },
                        { label: '华南', value: 25 },
                      ].map(d => (
                        <div key={d.label} className="space-y-1">
                          <div className="flex justify-between text-[10px]">
                            <span className="text-slate-500">{d.label}</span>
                            <span className="text-slate-800 font-bold">{d.value}%</span>
                          </div>
                          <div className="h-1 bg-slate-100 rounded-full overflow-hidden">
                            <div className="h-full bg-violet-500" style={{ width: `${d.value}%` }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </motion.div>
        )}

        {tab === 'analysis' && (
          <motion.div key="analysis" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card title="销量趋势图表" subtitle="近一周销售额波动情况">
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={salesTrend}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} />
                      <YAxis axisLine={false} tickLine={false} />
                      <Tooltip />
                      <Bar dataKey="sales" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </Card>
              <Card title="市场需求预测" subtitle="基于 AI 算法的未来 7 天需求预测">
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={[
                      { time: 'T+1', value: 120 },
                      { time: 'T+2', value: 150 },
                      { time: 'T+3', value: 180 },
                      { time: 'T+4', value: 160 },
                      { time: 'T+5', value: 210 },
                      { time: 'T+6', value: 240 },
                      { time: 'T+7', value: 280 },
                    ]}>
                      <defs>
                        <linearGradient id="colorPredict" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#ec4899" stopOpacity={0.1}/>
                          <stop offset="95%" stopColor="#ec4899" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <XAxis dataKey="time" axisLine={false} tickLine={false} />
                      <YAxis axisLine={false} tickLine={false} />
                      <Tooltip />
                      <Area type="monotone" dataKey="value" stroke="#ec4899" fillOpacity={1} fill="url(#colorPredict)" strokeWidth={2} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </Card>
            </div>
            <Card title="热销品种排行榜">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-slate-100">
                      <th className="pb-4 font-semibold text-slate-500 text-sm">排名</th>
                      <th className="pb-4 font-semibold text-slate-500 text-sm">品种名称</th>
                      <th className="pb-4 font-semibold text-slate-500 text-sm">销量 (吨)</th>
                      <th className="pb-4 font-semibold text-slate-500 text-sm">成交额</th>
                      <th className="pb-4 font-semibold text-slate-500 text-sm">环比增长</th>
                      <th className="pb-4 font-semibold text-slate-500 text-sm">库存状态</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {[
                      { rank: 1, name: '优质小麦 (一等)', sales: 1240, revenue: '¥3.2M', trend: '+12.5%', status: '充足' },
                      { rank: 2, name: '红小麦', sales: 850, revenue: '¥2.1M', trend: '+8.2%', status: '充足' },
                      { rank: 3, name: '抗逆金种玉米', sales: 620, revenue: '¥1.8M', trend: '+15.4%', status: '紧张' },
                      { rank: 4, name: '丰产一号小麦', sales: 480, revenue: '¥1.2M', trend: '+5.1%', status: '充足' },
                    ].map((r, i) => (
                      <tr key={i} className="hover:bg-slate-50 transition-colors">
                        <td className="py-4 text-sm text-slate-500 font-bold">#{r.rank}</td>
                        <td className="py-4 text-sm font-medium text-slate-800">{r.name}</td>
                        <td className="py-4 text-sm text-slate-600">{r.sales}</td>
                        <td className="py-4 text-sm text-slate-600">{r.revenue}</td>
                        <td className="py-4 text-sm text-emerald-600 font-bold">{r.trend}</td>
                        <td className="py-4">
                          <span className={cn("px-2 py-1 rounded text-[10px] font-bold", 
                            r.status === '充足' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                          )}>
                            {r.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const SeedView = () => {
  const [tab, setTab] = useState('recommend');
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Sprout} label="推荐品种数" value="24 种" trend="+4" color="bg-emerald-500" />
        <StatCard icon={User} label="覆盖农户" value="1,850 户" trend="+120" color="bg-blue-500" />
        <StatCard icon={TrendingUp} label="预计增产" value="15.8%" trend="+2.1%" color="bg-orange-500" />
        <StatCard icon={MessageSquare} label="技术指导次数" value="3,420 次" trend="+450" color="bg-indigo-500" />
      </div>

      <div className="flex items-center gap-2 p-1 bg-slate-200/50 rounded-xl w-fit">
        <TabButton active={tab === 'recommend'} onClick={() => setTab('recommend')} label="品类推荐" />
        <TabButton active={tab === 'guide'} onClick={() => setTab('guide')} label="技术指导" />
      </div>

      <AnimatePresence mode="wait">
        {tab === 'recommend' && (
          <motion.div key="recommend" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card title="种子推荐主界面" subtitle="基于土壤、气候与历史产量的 AI 推荐">
                <div className="space-y-4">
                  {[
                    { name: '丰产一号小麦', match: '98%', area: '华北平原', type: '抗旱高产', price: '¥4.5/kg' },
                    { name: '抗逆金种玉米', match: '92%', area: '东北地区', type: '稳产抗病', price: '¥12.8/kg' },
                    { name: '早熟优质水稻', match: '89%', area: '长江中下游', type: '生长期短', price: '¥8.2/kg' },
                    { name: '高油大豆 2 号', match: '85%', area: '黄淮海平原', type: '含油量高', price: '¥6.5/kg' },
                  ].map(s => (
                    <div key={s.name} className="p-4 rounded-xl border border-slate-100 bg-slate-50 hover:border-emerald-200 hover:shadow-md transition-all cursor-pointer group">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-bold text-slate-800 group-hover:text-emerald-700">{s.name}</h4>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-slate-400">匹配度</span>
                          <span className="text-emerald-600 font-bold">{s.match}</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex gap-4 text-xs text-slate-500">
                          <span>适配区域: {s.area}</span>
                          <span>特性: {s.type}</span>
                        </div>
                        <span className="text-sm font-bold text-slate-700">{s.price}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
              <Card title="区域适配性分析" subtitle="多维度评估指标">
                <div className="h-[350px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="80%" data={[
                      { subject: '耐旱性', A: 120, B: 110, fullMark: 150 },
                      { subject: '抗病性', A: 98, B: 130, fullMark: 150 },
                      { subject: '产量', A: 140, B: 130, fullMark: 150 },
                      { subject: '周期', A: 86, B: 100, fullMark: 150 },
                      { subject: '成本', A: 99, B: 90, fullMark: 150 },
                    ]}>
                      <PolarGrid stroke="#e2e8f0" />
                      <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 12 }} />
                      <Radar name="丰产一号" dataKey="A" stroke="#10b981" fill="#10b981" fillOpacity={0.5} />
                      <Radar name="抗逆金种" dataKey="B" stroke="#6366f1" fill="#6366f1" fillOpacity={0.3} />
                      <Tooltip />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </Card>
            </div>
            <Card title="品种对比表">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-slate-100">
                      <th className="pb-4 font-semibold text-slate-500 text-sm">指标</th>
                      <th className="pb-4 font-semibold text-slate-500 text-sm">丰产一号小麦</th>
                      <th className="pb-4 font-semibold text-slate-500 text-sm">普通小麦品种</th>
                      <th className="pb-4 font-semibold text-slate-500 text-sm">优势</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {[
                      { metric: '平均亩产', target: '650kg', baseline: '520kg', advantage: '+25%' },
                      { metric: '抗病等级', target: '高抗', baseline: '中抗', advantage: '显著提升' },
                      { metric: '生长期', target: '235天', baseline: '245天', advantage: '缩短10天' },
                      { metric: '蛋白质含量', target: '14.5%', baseline: '12.8%', advantage: '+1.7%' },
                    ].map((r, i) => (
                      <tr key={i} className="hover:bg-slate-50 transition-colors">
                        <td className="py-4 text-sm text-slate-500 font-medium">{r.metric}</td>
                        <td className="py-4 text-sm font-bold text-slate-800">{r.target}</td>
                        <td className="py-4 text-sm text-slate-600">{r.baseline}</td>
                        <td className="py-4 text-sm text-emerald-600 font-bold">{r.advantage}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </motion.div>
        )}

        {tab === 'guide' && (
          <motion.div key="guide" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card title="个性化种植方案" className="lg:col-span-2" subtitle="基于当前生长阶段的 AI 建议">
              <div className="space-y-6">
                <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-100 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-10">
                    <Sprout className="w-24 h-24 text-emerald-600" />
                  </div>
                  <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-0.5 bg-emerald-600 text-white text-[10px] font-bold rounded uppercase">当前阶段</span>
                      <h4 className="font-bold text-emerald-800 text-lg">拔节期 (Jointing Stage)</h4>
                    </div>
                    <p className="text-sm text-emerald-700 leading-relaxed">
                      当前小麦进入关键生长期。建议追施尿素 15-20kg/亩，并结合灌溉。近期气温回升较快，需重点防治纹枯病与蚜虫。预计 10 天后进入孕穗期。
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-4 rounded-xl border border-slate-100 bg-slate-50">
                    <p className="text-xs text-slate-500 mb-1">建议施肥量</p>
                    <p className="text-xl font-bold text-slate-800">18kg / 亩</p>
                    <p className="text-[10px] text-emerald-600 mt-1">推荐: 尿素</p>
                  </div>
                  <div className="p-4 rounded-xl border border-slate-100 bg-slate-50">
                    <p className="text-xs text-slate-500 mb-1">建议灌溉量</p>
                    <p className="text-xl font-bold text-slate-800">35m³ / 亩</p>
                    <p className="text-[10px] text-blue-600 mt-1">方式: 喷灌</p>
                  </div>
                  <div className="p-4 rounded-xl border border-slate-100 bg-slate-50">
                    <p className="text-xs text-slate-500 mb-1">病虫害风险</p>
                    <p className="text-xl font-bold text-amber-600">中等</p>
                    <p className="text-[10px] text-amber-600 mt-1">关注: 纹枯病</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <h5 className="text-sm font-bold text-slate-800">未来 15 天农事计划</h5>
                  <div className="space-y-2">
                    {[
                      { day: 'D+1', task: '追施拔节肥', priority: '高' },
                      { day: 'D+3', task: '全田灌溉', priority: '高' },
                      { day: 'D+7', task: '病虫害化学防治', priority: '中' },
                      { day: 'D+12', task: '田间杂货清理', priority: '低' },
                    ].map(t => (
                      <div key={t.day} className="flex items-center gap-4 p-3 bg-white border border-slate-100 rounded-xl">
                        <span className="text-xs font-bold text-slate-400 w-8">{t.day}</span>
                        <span className="text-sm text-slate-700 flex-1">{t.task}</span>
                        <span className={cn("text-[10px] px-2 py-0.5 rounded font-bold", 
                          t.priority === '高' ? 'bg-red-100 text-red-600' : 
                          t.priority === '中' ? 'bg-amber-100 text-amber-600' : 'bg-slate-100 text-slate-600'
                        )}>{t.priority}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
            <Card title="农事提醒推送" subtitle="实时环境监测与预警">
              <div className="space-y-4">
                {[
                  { title: '大风预警', content: '预计明晚有6级大风，请加固大棚，防止倒伏。', time: '10:00', type: 'warning' },
                  { title: '施肥提醒', content: '您的3号地块已进入施肥窗口期，请及时处理。', time: '08:30', type: 'info' },
                  { title: '降水预报', content: '未来48小时有小雨，建议推迟灌溉计划。', time: '昨日', type: 'info' },
                  { title: '虫情发现', message: '5号地块边缘发现少量蚜虫，请加强巡查。', time: '昨日', type: 'warning' },
                ].map((n, i) => (
                  <div key={i} className={cn("p-4 rounded-xl border-l-4", 
                    n.type === 'warning' ? 'bg-amber-50 border-amber-500' : 'bg-blue-50 border-blue-500'
                  )}>
                    <div className="flex justify-between items-start mb-1">
                      <p className="text-sm font-bold text-slate-800">{n.title}</p>
                      <span className="text-[10px] text-slate-400">{n.time}</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">{n.content || n.message}</p>
                  </div>
                ))}
                <button className="w-full py-2 border border-slate-200 rounded-lg text-xs font-medium text-slate-500 hover:bg-slate-50 transition-colors">查看历史提醒</button>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const DataView = () => {
  return (
    <div className="space-y-6">
      <Card title="全业务数据汇总看板" className="bg-slate-900 border-none">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-4">
          {[
            { label: '年度总营收', value: '¥4.2B', trend: '+12.5%', color: 'text-emerald-400' },
            { label: '总库存量', value: '1.2M 吨', trend: '安全', color: 'text-blue-400' },
            { label: '仓储损耗率', value: '0.08%', trend: '-0.02%', color: 'text-emerald-400' },
            { label: '农户满意度', value: '98.5%', trend: '优秀', color: 'text-amber-400' },
          ].map(item => (
            <div key={item.label} className="text-center">
              <p className="text-slate-400 text-xs mb-1">{item.label}</p>
              <p className="text-2xl font-bold text-white mb-1">{item.value}</p>
              <p className={cn("text-[10px] font-medium", item.color)}>{item.trend}</p>
            </div>
          ))}
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card title="各模块数据明细" className="lg:col-span-1">
          <div className="space-y-6">
            {[
              { label: '粮食收购', value: '1,240t', sub: '今日入库', color: 'bg-emerald-500' },
              { label: '销售运营', value: '¥428k', sub: '今日销售', color: 'bg-violet-500' },
              { label: '种子服务', value: '42 户', sub: '今日指导', color: 'bg-blue-500' },
              { label: '物流装卸', value: '156 次', sub: '今日作业', color: 'bg-amber-500' },
            ].map(m => (
              <div key={m.label} className="flex items-center gap-4">
                <div className={cn("w-1 h-10 rounded-full", m.color)} />
                <div>
                  <p className="text-xs text-slate-400">{m.label}</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-lg font-bold text-slate-800">{m.value}</span>
                    <span className="text-[10px] text-slate-500">{m.sub}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card title="业务模块占比分析" className="lg:col-span-1">
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <RePieChart>
                <Pie
                  data={[
                    { name: '粮食收购', value: 40 },
                    { name: '销售运营', value: 30 },
                    { name: '种子经营', value: 20 },
                    { name: '农业服务', value: 10 },
                  ]}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  <Cell fill="#10b981" />
                  <Cell fill="#8b5cf6" />
                  <Cell fill="#3b82f6" />
                  <Cell fill="#f59e0b" />
                </Pie>
                <Tooltip />
              </RePieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-4">
            {[
              { name: '粮食收购', color: 'bg-emerald-500' },
              { name: '销售运营', color: 'bg-violet-500' },
              { name: '种子经营', color: 'bg-blue-500' },
              { name: '农业服务', color: 'bg-amber-500' },
            ].map(l => (
              <div key={l.name} className="flex items-center gap-2">
                <div className={cn("w-2 h-2 rounded-full", l.color)} />
                <span className="text-[10px] text-slate-500">{l.name}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card title="经营风险雷达图" className="lg:col-span-1">
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={[
                { subject: '市场风险', A: 45, fullMark: 100 },
                { subject: '库存风险', A: 30, fullMark: 100 },
                { subject: '资金风险', A: 20, fullMark: 100 },
                { subject: '质量风险', A: 15, fullMark: 100 },
                { subject: '安全风险', A: 10, fullMark: 100 },
              ]}>
                <PolarGrid stroke="#e2e8f0" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 10 }} />
                <Radar name="风险指数" dataKey="A" stroke="#ef4444" fill="#ef4444" fillOpacity={0.5} />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <Card title="全产业链协同效率" subtitle="基于 AI 优化的业务流转速度">
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={[
              { name: '1月', efficiency: 65 },
              { name: '2月', efficiency: 68 },
              { name: '3月', efficiency: 75 },
              { name: '4月', efficiency: 82 },
              { name: '5月', efficiency: 88 },
              { name: '6月', efficiency: 94 },
            ]}>
              <defs>
                <linearGradient id="colorEff" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} />
              <YAxis axisLine={false} tickLine={false} />
              <Tooltip />
              <Area type="monotone" dataKey="efficiency" stroke="#10b981" fillOpacity={1} fill="url(#colorEff)" strokeWidth={3} name="协同效率 %" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
};

const LogisticsView = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Truck} label="今日运力" value="124 辆" trend="+12" color="bg-blue-500" />
        <StatCard icon={Map} label="在途车辆" value="42 辆" trend="正常" color="bg-indigo-500" />
        <StatCard icon={LayoutDashboard} label="装卸效率" value="85%" trend="+5%" color="bg-emerald-500" />
        <StatCard icon={ShieldAlert} label="安全运行" value="428 天" trend="稳定" color="bg-emerald-600" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card title="装卸作业监控" className="lg:col-span-2" subtitle="AI 实时行为识别与效率分析">
          <div className="space-y-6">
            <div className="relative aspect-video bg-slate-900 rounded-2xl overflow-hidden group">
              <div className="absolute inset-0 flex items-center justify-center">
                <Video className="w-16 h-16 text-white/10 group-hover:text-white/20 transition-colors" />
              </div>
              <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 bg-emerald-500 rounded-full text-[10px] text-white font-bold shadow-lg">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                实时视频流 - 1号泊位 (装卸作业中)
              </div>
              <div className="absolute bottom-4 right-4 flex gap-2">
                <button className="p-2 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-md text-white transition-all">
                  <Eye className="w-4 h-4" />
                </button>
                <button className="p-2 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-md text-white transition-all">
                  <Settings className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { label: '作业效率', value: '85%', color: 'bg-emerald-500', sub: '高于平均 5%' },
                { label: '设备负荷', value: '62%', color: 'bg-blue-500', sub: '运行平稳' },
                { label: '安全评分', value: '98', color: 'bg-emerald-500', sub: '表现优秀' },
              ].map(item => (
                <div key={item.label} className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="flex justify-between text-xs mb-2">
                    <span className="text-slate-500 font-medium">{item.label}</span>
                    <span className="text-slate-800 font-bold">{item.value}</span>
                  </div>
                  <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden mb-2">
                    <div className={cn("h-full rounded-full", item.color)} style={{ width: item.value.includes('%') ? item.value : `${item.value}%` }} />
                  </div>
                  <p className="text-[10px] text-slate-400">{item.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </Card>

        <div className="space-y-6">
          <Card title="违规操作告警" subtitle="最近 24 小时异常记录">
            <div className="space-y-4">
              {[
                { time: '10:32', type: '野蛮装卸', location: '2号泊位', severity: 'high' },
                { time: '09:15', type: '未穿反光背心', location: '装卸区B', severity: 'medium' },
                { time: '08:45', type: '超速行驶', location: '园区主干道', severity: 'medium' },
              ].map((w, i) => (
                <div key={i} className={cn("p-3 rounded-xl border flex items-start gap-3", 
                  w.severity === 'high' ? 'bg-rose-50 border-rose-100' : 'bg-amber-50 border-amber-100'
                )}>
                  <AlertTriangle className={cn("w-4 h-4 mt-0.5", w.severity === 'high' ? 'text-rose-500' : 'text-amber-500')} />
                  <div>
                    <p className={cn("text-xs font-bold", w.severity === 'high' ? 'text-rose-900' : 'text-amber-900')}>{w.type}</p>
                    <p className={cn("text-[10px]", w.severity === 'high' ? 'text-rose-700' : 'text-amber-700')}>{w.location} · {w.time}</p>
                  </div>
                </div>
              ))}
              <button className="w-full py-2 bg-slate-100 text-slate-600 rounded-lg text-xs font-medium hover:bg-slate-200 transition-colors">查看全部告警</button>
            </div>
          </Card>
          <Card title="在途车辆分布" subtitle="实时 GPS 定位状态">
            <div className="space-y-4">
              <div className="h-32 bg-slate-100 rounded-xl flex items-center justify-center relative overflow-hidden">
                <Map className="w-12 h-12 text-slate-300" />
                <div className="absolute top-4 left-10 w-2 h-2 bg-emerald-500 rounded-full animate-ping" />
                <div className="absolute bottom-6 right-12 w-2 h-2 bg-blue-500 rounded-full animate-ping" />
                <div className="absolute top-10 right-20 w-2 h-2 bg-indigo-500 rounded-full animate-ping" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500">准点到达率</span>
                  <span className="text-emerald-600 font-bold">94.2%</span>
                </div>
                <div className="h-1 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 w-[94%]" />
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      <Card title="最近物流任务">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="pb-4 font-semibold text-slate-500 text-sm">任务编号</th>
                <th className="pb-4 font-semibold text-slate-500 text-sm">车牌号</th>
                <th className="pb-4 font-semibold text-slate-500 text-sm">目的地</th>
                <th className="pb-4 font-semibold text-slate-500 text-sm">货物</th>
                <th className="pb-4 font-semibold text-slate-500 text-sm">预计到达</th>
                <th className="pb-4 font-semibold text-slate-500 text-sm">状态</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {[
                { id: 'LOG-20260320-01', plate: '鲁A·88888', dest: '济南中心库', cargo: '优质小麦', eta: '16:30', status: '运输中' },
                { id: 'LOG-20260320-02', plate: '鲁B·66666', dest: '青岛港口', cargo: '红小麦', eta: '18:45', status: '已出发' },
                { id: 'LOG-20260320-03', plate: '鲁C·99999', dest: '淄博加工厂', cargo: '玉米种子', eta: '14:20', status: '已送达' },
              ].map((t, i) => (
                <tr key={i} className="hover:bg-slate-50 transition-colors">
                  <td className="py-4 text-sm text-slate-500 font-mono">{t.id}</td>
                  <td className="py-4 text-sm font-medium text-slate-800">{t.plate}</td>
                  <td className="py-4 text-sm text-slate-600">{t.dest}</td>
                  <td className="py-4 text-sm text-slate-600">{t.cargo}</td>
                  <td className="py-4 text-sm text-slate-600">{t.eta}</td>
                  <td className="py-4">
                    <span className={cn("px-2 py-1 rounded text-[10px] font-bold", 
                      t.status === '运输中' ? 'bg-blue-100 text-blue-700' : 
                      t.status === '已送达' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'
                    )}>
                      {t.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};



// --- Main App ---

export default function App() {
  const [activeModule, setActiveModule] = useState('acquisition');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const modules = [
    { id: 'acquisition', name: '粮食收购 AI', icon: LayoutDashboard, component: AcquisitionView },
    { id: 'storage', name: '粮油仓储 AI', icon: Warehouse, component: StorageView },
    { id: 'sales', name: '销售供应链 AI', icon: ShoppingCart, component: SalesView },
    { id: 'seed', name: '种子农业 AI', icon: Sprout, component: SeedView },
    { id: 'data', name: '数据管理 AI', icon: BarChart3, component: DataView },
    { id: 'logistics', name: '装卸搬运 AI', icon: Truck, component: LogisticsView },
  ];

  const ActiveComponent = modules.find(m => m.id === activeModule)?.component || AcquisitionView;

  return (
    <div className="flex h-screen bg-slate-50 font-sans text-slate-900 overflow-hidden">
      {/* Sidebar */}
      <motion.aside 
        initial={false}
        animate={{ width: isSidebarOpen ? 280 : 80 }}
        className="bg-white border-r border-slate-200 flex flex-col z-20"
      >
        <div className="p-6 flex items-center gap-3 overflow-hidden">
          <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center flex-shrink-0">
            <Warehouse className="text-white w-5 h-5" />
          </div>
          {isSidebarOpen && <span className="font-bold text-xl tracking-tight text-slate-800 whitespace-nowrap">粮智云 AI</span>}
        </div>

        <nav className="flex-1 px-3 space-y-1 mt-4">
          {modules.map(module => (
            <button
              key={module.id}
              onClick={() => setActiveModule(module.id)}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 group relative",
                activeModule === module.id 
                  ? "bg-emerald-50 text-emerald-700" 
                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
              )}
            >
              <module.icon className={cn("w-5 h-5 flex-shrink-0", activeModule === module.id ? "text-emerald-600" : "group-hover:text-slate-800")} />
              {isSidebarOpen && <span className="font-medium text-sm whitespace-nowrap">{module.name}</span>}
              {activeModule === module.id && (
                <motion.div layoutId="active-pill" className="absolute left-0 w-1 h-6 bg-emerald-600 rounded-r-full" />
              )}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-100">
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="w-full flex items-center justify-center p-2 rounded-lg hover:bg-slate-50 text-slate-400"
          >
            {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 z-10">
          <div className="flex items-center gap-4">
            <h2 className="text-lg font-semibold text-slate-800">
              {modules.find(m => m.id === activeModule)?.name}
            </h2>
            <div className="hidden md:flex items-center bg-slate-100 rounded-full px-3 py-1">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse mr-2" />
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">系统运行正常</span>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="搜索功能或数据..." 
                className="bg-slate-100 border-none rounded-full pl-10 pr-4 py-1.5 text-sm w-64 focus:ring-2 focus:ring-emerald-500 transition-all"
              />
            </div>
            <div className="flex items-center gap-4">
              <button className="relative p-2 text-slate-500 hover:bg-slate-50 rounded-full">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white" />
              </button>
              <div className="h-8 w-px bg-slate-200" />
              <div className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity">
                <div className="text-right hidden md:block">
                  <p className="text-sm font-semibold text-slate-800 leading-none">管理员</p>
                  <p className="text-[10px] text-slate-500 mt-1 uppercase">运营中心</p>
                </div>
                <div className="w-9 h-9 rounded-full bg-slate-200 border-2 border-white shadow-sm flex items-center justify-center overflow-hidden">
                  <img src="https://picsum.photos/seed/admin/100/100" alt="Avatar" referrerPolicy="no-referrer" />
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Scrollable Area */}
        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeModule}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <ActiveComponent />
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e2e8f0;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #cbd5e1;
        }
      `}</style>
    </div>
  );
}
