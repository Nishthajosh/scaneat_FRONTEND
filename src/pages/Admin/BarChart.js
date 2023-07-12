import React, { useState, useEffect } from 'react';
import FusionCharts from 'fusioncharts';
import Charts from 'fusioncharts/fusioncharts.charts';
import ReactFC from 'react-fusioncharts';
import axios from 'axios';
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "./../../components/Layout/Layout";
import { BASE_URL } from "../helper"


ReactFC.fcRoot(FusionCharts, Charts);

const BarChart = () => {
  const [salesData, setSalesData] = useState({});

  useEffect(() => {
    const fetchSalesData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/v1/product/get-product`);
        const products = response.data.products;
        const data = products.reduce((acc, product) => {
          const name = product.name;
          if (acc[name]) {
            acc[name]++;
          } else {
            acc[name] = 1;
          }
          return acc;
        }, {});
        setSalesData(data);
        console.log(data)
      } catch (error) {
        console.log(error);
      }
    };
    fetchSalesData();
  }, []);

  const dataSource = {
    chart: {
      caption: 'Sales by Menu Item',
      subCaption: 'Top 5 Items',
      xAxisName: 'Menu Items',
      yAxisName: 'Sales',
      theme: 'fusion',
    },
    data: Object.entries(salesData)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([label, value]) => ({
        label,
        value: parseInt(value, 10),
          })),
  };

  const chartConfigs = {
    type: 'column2d',
    width: '100%',
    height: '400',
    dataFormat: 'JSON',
    dataSource: dataSource,
  };

  return (<>
              <ReactFC {...chartConfigs} />

  </>

  );
};

export default BarChart;
