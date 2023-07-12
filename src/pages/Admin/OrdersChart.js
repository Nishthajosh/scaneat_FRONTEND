import React, { useState, useEffect } from 'react';
import FusionCharts from 'fusioncharts';
import Charts from 'fusioncharts/fusioncharts.charts';
import ReactFusioncharts from 'react-fusioncharts';
import axios from 'axios';

Charts(FusionCharts);

const OrdersChart = ({ chartType }) => {
  const [ordersByTime, setOrdersByTime] = useState({});

  useEffect(() => {
    const fetchOrdersByTime = async () => {
      try {
        const response = await axios.get(`/api/v1/order/orders-by-${chartType}`);
        if (response.data.success) {
          setOrdersByTime(response.data.ordersByTime);
        } else {
          console.log(response.data.message);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchOrdersByTime();
  }, [chartType]);

  const dataSource = {
    chart: {
      caption: `Number of Orders by ${chartType.charAt(0).toUpperCase()}${chartType.slice(1)}`,
      showvalues: '1',
      theme: 'fusion',
    },
    data: Object.entries(ordersByTime).map(([time, count]) => ({ label: time, value: Math.round(count) })),
  };

  return (
    <ReactFusioncharts
      type="column2d"
      width="100%"
      height="400"
      dataFormat="JSON"
      dataSource={dataSource}
    />
  );
};

export default OrdersChart;
