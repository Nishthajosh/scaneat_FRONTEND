import React, { useState, useEffect } from "react";
import UserMenu from "../../components/Layout/UserMenu";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import { useAuth } from "../../context/auth";
import moment from "moment";
import jsPDF from "jspdf";
import 'jspdf-autotable';
import { BASE_URL } from "../helper"
import { QRAPI_URL } from "../helper"


const Orders = () => {

  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();
  const [table, setTable] = useState();
  const getOrders = async () => {
    try {
      const { data } = await axios.get(`${BASE_URL}/api/v1/auth/orders`);
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };
  const getTableid = async () => {
    try {
      const { data } = await axios.get(`${QRAPI_URL}/feedback/`);
      console.log('Table Data:', data[0].tableid);
      setTable(data.tableid);
    } catch (error) {
      console.log(error);
    }
  };

  
  useEffect(() => {
    if (auth?.token){
      if (auth?.token) {
        getOrders();
        getTableid();
      }
    }
  }, [auth?.token]);
  
  useEffect(() => {
    combineData();
  }, [orders, table]);


  const combineData = () => {
    const combinedData = orders.map((order, index) => {
      const tableData = table ? table.find(t => t.tableId === order.tableId) : null;
      return {
        ...order,
        ...(tableData ? tableData : {}),
      };
    });
    console.log('Combined Data:', combinedData);
    return combinedData;
  };
  
  
  const generateBill = () => {
    const doc = new jsPDF();
    const currentDate = moment().format("YYYY-MM-DD");
    const currentOrders = orders.filter(
      (o) => moment(o.createdAt).format("YYYY-MM-DD") === currentDate
    );
    const tableHeaders = [
      "#",
      "Status",
      "Buyer",
      "Table ID",
      "Date",
      "Payment",
      "Quantity",
    ];
    const tableData = combineData().map((o, i) => {
      return [
        i + 1,
        o.status,
        o.buyer.name,
        o.tableid,
        moment(o.createdAt).format("YYYY-MM-DD HH:mm:ss"),
        o.payment.success ? "Success" : "Failed",
        o.products.reduce((total, product) => total + product.quantity, 0),
      ];
    });
    doc.autoTable({
      head: [tableHeaders],
      body: tableData,
    });
    doc.save("bill.pdf");
  };
  

    
    
  return (
    <Layout title={"Your Orders"}>
      <div className="container-flui p-3 m-3 dashboard">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <h1 className="text-center">All Orders</h1>
            <button onClick={generateBill}>Download Bill</button>
            {orders?.map((o, i) => {
              return (
                <div className="border shadow">
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Status</th>
                        <th scope="col">Buyer</th>
                        <th scope="col">Table ID</th>
                        <th scope="col"> date</th>
                        <th scope="col">Payment</th>
                        <th scope="col">Quantity</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{i + 1}</td>
                        <td>{o?.status}</td>
                        <td>{o?.buyer?.name}</td>
                        <td>{o?.tableid}</td>
                        <td>{moment(o?.createdAt).fromNow()}</td>
                        <td>{o?.payment.success ? "Success" : "Failed"}</td>
                        <td>{o?.products?.reduce((total, product) => total + product.quantity, 0)}</td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="" style={{display:"flex"}}>
                    {o?.products?.map((p, i) => (
                      <div className="row mb-2 p-3 card flex-row" key={p._id}>
                        <div className="col-md-4">
                          <img
                            src={`${BASE_URL}/api/v1/product/product-photo/${p._id}`}
                            className=""
                            alt={p.name}
                            width="100px"
                            height={"100px"}
                          />
                        </div>
                        <div className="col-md-8">
                          <p>{p.name}</p>
                          <p>{p.description.substring(0, 30)}</p>
                          <p>Price : {p.price}</p>
                          <p>Quantity: {p.quantity}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      
    </Layout>
  );
};

export default Orders;
