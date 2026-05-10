import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const data = [
  { name: 'Core Team', value: 15, color: '#ff9d00' },
  { name: 'Staking Rewards', value: 40, color: '#880000' },
  { name: 'DAO Treasury', value: 25, color: '#1a0033' },
  { name: 'Public Sale', value: 20, color: '#2d2d2d' },
];

export default function HolderChart() {
  return (
    <div className="p-6 bg-mine-900 border border-mine-700 rounded-xl h-full flex flex-col">
      <h3 className="text-xs font-mono uppercase text-mine-500 mb-6">Extraction Distribution</h3>
      
      <div className="flex-1 flex flex-col md:flex-row items-center gap-8">
        <div className="w-full h-48">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
                stroke="none"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ backgroundColor: '#0a0a0a', border: '1px solid #202020', fontSize: '10px', color: '#fff' }}
                itemStyle={{ color: '#fff' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="flex-1 w-full space-y-3">
          {data.map((d, i) => (
            <div key={i} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: d.color }} />
                <span className="text-[10px] font-mono text-mine-500 uppercase">{d.name}</span>
              </div>
              <span className="text-xs font-mono text-white">{d.value}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
