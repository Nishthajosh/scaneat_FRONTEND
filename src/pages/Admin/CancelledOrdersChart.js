import React, { useState, useEffect } from 'react';
import FusionCharts from 'fusioncharts';
import Charts from 'fusioncharts/fusioncharts.charts';
import ReactFusioncharts from 'react-fusioncharts';
import axios from 'axios';
import { BASE_URL } from "../helper"


Charts(FusionCharts);

const CancelledOrdersChart = () => {
  const [cancelledOrders, setCancelledOrders] = useState([]);

  useEffect(() => {
    const fetchOrderStatus = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/v1/auth/orders`);
        console.log(response.status,"oeders cancel");
        if (response.status===200) {
          const orderStatusList = response.data.map((order) => order.status);
          console.log(orderStatusList, "order status list");
          setCancelledOrders(orderStatusList);
        } else {
          console.log(response.data.message);
        }
      } catch (err) {
        console.error(err);
      }
    };
  
    fetchOrderStatus();
  }, []);
  
  // useEffect(() => {
  //   const fetchCancelledOrders = async () => {
  //     try {
  //       const response = await axios.get(`${BASE_URL}/api/v1/auth/orders`);
  //       console.log(response.data,"cancelders");
  //       console.log(response.data.status,"suss")
  //       if (response.data.success) {
  //         const cancelledOrders = response.data.orders.filter((order) => order.status === 'Cancelled');
  //         setCancelledOrders(cancelledOrders);
  //         console.log(response,"cancel charts");
  //       } else {
  //         console.log(response.data.message);
  //       }
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   };

  //   fetchCancelledOrders();
  // }, []);

  const dataSource = {
    chart: {
      caption: 'Number of Cancelled Orders by Reason',
      showvalues: '1',
      theme: 'fusion',
    },
    data: cancelledOrders.reduce((acc, order) => {
      // console.log(order.products.name,"product");
      if (order && order.products) {
      order.products.forEach((product) => {
        console.log(product.category.name)
        const category = product.category.name;
        const index = acc.findIndex((item) => item.label === category);
        if (index === -1) {
          acc.push({ label: category, value: 1 });
        } else {
          acc[index].value++;
        }
      });
    }
      return acc;
    }, []),
  };

  return (
    <ReactFusioncharts
      type="pie2d"
      width="100%"
      height="400"
      dataFormat="JSON"
      dataSource={dataSource}
    />
  );
};

export default CancelledOrdersChart;
