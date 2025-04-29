// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const InventoryChart = ({ data, dateRange }) => {
  const getTitle = () => {
    switch (dateRange) {
      case "week":
        return "Inventory Levels - Last 7 Days"
      case "year":
        return "Inventory Levels - Last 12 Months"
      default:
        return "Inventory Levels - Last 30 Days"
    }
  }

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="label">{`${label}`}</p>
          <p className="value">{`Inventory: ${payload[0].value} units`}</p>
        </div>
      )
    }
    return null
  }

  return (
    <div className="chart-wrapper">
      <h4 className="chart-title">{getTitle()}</h4>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
          <XAxis dataKey="name" tick={{ fill: "#333" }} axisLine={{ stroke: "#ccc" }} tickLine={{ stroke: "#ccc" }} />
          <YAxis tick={{ fill: "#333" }} axisLine={{ stroke: "#ccc" }} tickLine={{ stroke: "#ccc" }} />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Line
            type="monotone"
            dataKey="value"
            name="Inventory"
            stroke="#4CAF50"
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default InventoryChart

