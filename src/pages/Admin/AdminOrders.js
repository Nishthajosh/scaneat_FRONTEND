import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import { useAuth } from "../../context/auth";
import moment from "moment";
import { Select } from "antd";
import { BASE_URL } from "../helper"
import { QRAPI_URL } from "../helper"



const { Option } = Select;

const AdminOrders = () => {
  const[tableid,setTableid]=useState({});
  const [status, setStatus] = useState([
    "Not Preparing",
    "Preparing",
    "Served",
    "cancel",
  ]);
  const [changeStatus, setCHangeStatus] = useState("");
  const [orders, setOrders] = useState([]);
  const [table, setTable] = useState();
  const [auth, setAuth] = useAuth();
  
  const getOrders = async () => {
    try {
      const { data } = await axios.get(`${BASE_URL}/api/v1/auth/all-orders`);
      console.log('Orders Data:', data);
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };
  
  const getTableid = async () => {
    try {
      const { data } = await axios.get(`${QRAPI_URL}/feedback/`);
      console.log('Table Data:', data);
      setTable(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) {
      getOrders();
      getTableid();
    }
  }, [auth?.token])

  
  // const tableQr=()=>{
  //   axios.get('${BASE_URL}/qr/')
  //  .then((data)=>{
  //   console.log(data.data.data,"userData")
  //   setTableid(data.data.data);
  //  })
  //  .catch((err)=>{
  //   console.log("Error"+err);
  //  })
  // }
  const handleChange = async (orderId, value) => {
    try {
      const { data } = await axios.put(`${BASE_URL}/api/v1/auth/order-status/${orderId}`, {
        status: value,
      });
      getOrders();
    } catch (error) {
      console.log(error);
    }
  };
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
  
  return (
    <Layout title={"All Orders Data"}>
      <div className="row dashboard">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h1 className="text-center">All Orders</h1>
          {combineData()?.map((o, i) => {
            return (
              <div className="border shadow">
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Status</th>
                      <th scope="col">Buyer</th>
                      <th scope="col">Table ID</th>
                      <th scope="col">Date</th>
                      <th scope="col">Payment</th>
                      <th scope="col">Quantity</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{i + 1}</td>
                      <td>
                        <Select
                          bordered={false}
                          onChange={(value) => handleChange(o._id, value)}
                          defaultValue={o?.status}
                        >
                          {status.map((s, i) => (
                            <Option key={i} value={s}>
                              {s}
                            </Option>
                          ))}
                        </Select>
                      </td>
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
    </Layout>
  );
};

export default AdminOrders;
