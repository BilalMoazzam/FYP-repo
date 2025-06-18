// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


const SalesChart = ({ data, dateRange }) => {
  const getTitle = () => {
    switch (dateRange) {
      case "week":
        return "Sales - Last 7 Days"
      case "year":
        return "Sales - Last 12 Months"
      default:
        return "Sales - Last 30 Days"
    }
  }

  const formatYAxis = (value) => {
    if (value >= 1000) {
      return `$${(value / 1000).toFixed(0)}k`
    }
    return `$${value}`
  }

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="label">{`${label}`}</p>
          <p className="value">{`Sales: $${payload[0].value.toLocaleString()}`}</p>
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
          <YAxis
            tickFormatter={formatYAxis}
            tick={{ fill: "#333" }}
            axisLine={{ stroke: "#ccc" }}
            tickLine={{ stroke: "#ccc" }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Line
            type="monotone"
            dataKey="value"
            name="Sales"
            stroke="#FFC107"
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default SalesChart

