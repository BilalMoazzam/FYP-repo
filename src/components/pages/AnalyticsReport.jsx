"use client";

import { useState, useEffect,useCallback } from "react";
import Header from "../layout/Header";
import MetricsCards from "../analytics/MetricsCards";
import SalesChart from "../analytics/SalesChart";
import InventoryChart from "../analytics/InventoryChart";
import CustomizableReport from "../analytics/CustomizableReport";
import ExportReports from "../analytics/ExportReports";
import { RefreshCw } from "lucide-react";
import "../styles/AnalyticsReport.css";

const AnalyticsReport = () => {
  const [metrics, setMetrics] = useState({
    totalSales: 0,
    bestSellingProduct: "",
    inventoryHealth: 0,
  });

  const [salesData, setSalesData] = useState([]);
  const [inventoryData, setInventoryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState("month");
  const [lastUpdated, setLastUpdated] = useState("");

 const fetchAnalyticsData = useCallback(() => {
  setLoading(true);

  setTimeout(() => {
    setMetrics({
      totalSales: 234600,
      bestSellingProduct: "Shirts",
      inventoryHealth: 85,
    });

    const mockSalesData = generateSalesData(dateRange);
    setSalesData(mockSalesData);

    const mockInventoryData = generateInventoryData(dateRange);
    setInventoryData(mockInventoryData);

    const now = new Date();
    setLastUpdated(now.toLocaleString());

    setLoading(false);
  }, 1000);
}, [dateRange]); 

  useEffect(() => {
    fetchAnalyticsData();
  }, [fetchAnalyticsData]);

  const generateSalesData = (range) => {
    const data = [];
    let days = 30;

    if (range === "week") {
      days = 7;
    } else if (range === "year") {
      days = 12; // Months in a year
    }

    for (let i = 0; i < days; i++) {
      const value = Math.floor(Math.random() * 10000) + 5000;

      if (range === "year") {
        // For yearly data, use month names
        const monthNames = [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ];
        data.push({
          name: monthNames[i],
          value: value,
        });
      } else {
        // For weekly or monthly data, use day numbers
        data.push({
          name: `Day ${i + 1}`,
          value: value,
        });
      }
    }

    return data;
  };

  const generateInventoryData = (range) => {
    const data = [];
    let days = 30;

    if (range === "week") {
      days = 7;
    } else if (range === "year") {
      days = 12; // Months in a year
    }

    for (let i = 0; i < days; i++) {
      const value = Math.floor(Math.random() * 500) + 300;

      if (range === "year") {
        // For yearly data, use month names
        const monthNames = [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ];
        data.push({
          name: monthNames[i],
          value: value,
        });
      } else {
        // For weekly or monthly data, use day numbers
        data.push({
          name: `Day ${i + 1}`,
          value: value,
        });
      }
    }

    return data;
  };
  const handleDateRangeChange = (e) => {
    setDateRange(e.target.value);
  };

  const handleRefresh = () => {
    fetchAnalyticsData();
  };

  return (
    <div className="analytics-report">
      <Header
        title="Analytics and Reports"
        breadcrumbs={[
          { text: "Dashboard", active: false },
          { text: "Analytics and Reports", active: true },
        ]}
      />

      <div className="analytics-container">
        <div className="analytics-header">
          <div className="header-left">
            <h2>Analytics and Reports</h2>
            <p className="last-updated">
              Last updated: {lastUpdated}
              <button className="btn-refresh" onClick={handleRefresh}>
                <RefreshCw size={14} />
              </button>
            </p>
          </div>
          <div className="header-right">
            <div className="date-range-selector">
              <label>Date Range:</label>
              <select value={dateRange} onChange={handleDateRangeChange}>
                <option value="week">Last 7 Days</option>
                <option value="month">Last 30 Days</option>
                <option value="year">Last 12 Months</option>
              </select>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="loading">Loading analytics data...</div>
        ) : (
          <>
            <MetricsCards metrics={metrics} />

            <div className="section">
              <div className="section-header">
                <h3>Analytics & Graphs</h3>
              </div>
              <div className="charts-grid">
                <div className="chart-container">
                  <SalesChart data={salesData} dateRange={dateRange} />
                </div>
                <div className="chart-container">
                  <InventoryChart data={inventoryData} dateRange={dateRange} />
                </div>
              </div>
            </div>
            <div className="section">
              <div className="section-header">
                <h3>Customizable Report</h3>
              </div>
              <CustomizableReport />
            </div>

            <div className="section">
              <div className="section-header">
                <h3>Export Reports</h3>
              </div>
              <ExportReports />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AnalyticsReport;
