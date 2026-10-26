import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from "recharts"
import { useTimeline } from "../../context/TimelineContext"

const COLORS = {
    Text: '#7C3AED',
    Call: '#2D4A3E',
    Video: '#4ADE80',
}

export default function Stats() {
    const { entries } = useTimeline()

    const counts = entries.reduce((acc, entry) => {
        acc[entry.type] = (acc[entry.type] || 0) + 1
        return acc
    }, {})

    const data = ['Call', 'Text', 'Video']
        .filter(type => counts[type] > 0)
        .map(type => ({
            name: type,
            value: counts[type],
        }))

    const hasData = data.length > 0

    return (
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">

            <h1 className="text-3xl font-extrabold text-gray-900 mb-8">
                Friendship Analytics
            </h1>

            <div className="bg-white rounded-xl border border-gray-100 p-6">
                <p className="text-sm font-medium text-gray-500 mb-6">
                    By Interaction Type
                </p>

                {hasData ? (
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={data}
                                cx="50%"
                                cy="50%"
                                innerRadius={90}
                                outerRadius={130}
                                paddingAngle={4}
                                dataKey="value"
                            >
                                {data.map((entry) => (
                                    <Cell key={entry.name} fill={COLORS[entry.name]} />
                                ))}
                            </Pie>
                            <Tooltip
                                formatter={(value, name) => [`${value} interactions`, name]}
                                contentStyle={{
                                    borderRadius: '8px',
                                    border: '1px solid #e5e7eb',
                                    fontSize: '13px',
                                }}
                            />
                            <Legend
                                iconType="circle"
                                iconSize={10}
                                formatter={(value) => (
                                    <span style={{ color: '#6b7280', fontSize: '13px' }}>
                                        {value}
                                    </span>
                                )}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                ) : (
                    <div className="flex flex-col items-center justify-center py-24 gap-3">
                        <p className="text-gray-400 text-sm">No interactions logged yet.</p>
                        <p className="text-gray-300 text-xs">
                            Go to a friend's page and log a Call, Text, or Video.
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}