import React from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "./../../components/Layout/Layout";
import QRCode  from 'qrcode';
import QrReader from 'react-qr-scanner'
import { useRef, useState } from 'react';
import axios from 'axios';
import {useEffect } from 'react';
import toast from "react-hot-toast";
import { QRAPI_URL } from "../helper"

const styles = {
  table: {
    borderCollapse: 'collapse',
    border: '1px solid black',
  },
  th: {
    border: '1px solid black',
    padding: '5px',
  },
  td: {
    border: '1px solid black',
    padding: '5px',
  },
  button: {
    backgroundColor: 'red',
    color: 'white',
    padding: '5px 10px',
    border: 'none',
    borderRadius: '3px',
    cursor: 'pointer',
  },
};
const Users = () => {
  const [file, setFile] = useState(null);

  const handleFileUpload = (event) => {
    setFile(event.target.files[0]);
  };


  const[text,setText]=useState();
const[imgUrl,setImgUrl]=useState();
  
const generateQrCode=async()=>{
  try{
 const res=await QRCode.toDataURL(text);
 setImgUrl(res);
 console.log(res);
  }
  catch(error){
console.log(error);
  }
}
const handleImageUpload = () => {
  const formData = new FormData();
  formData.append('image', file);
  formData.append('text', text); // append the text to the formData

  axios.post(`${QRAPI_URL}/qrcode/image`, formData)
    .then(response => {
      toast.success("Image uploaded");
      console.log(response.data);
    })
    .catch(error => {
      console.log(error);
    });
};
// const generateQrCode = async (e) => {
//   e.preventDefault(); // add this line to prevent the default form submission

//   try {
//     const res = await QRCode.toDataURL(text);
//     setImgUrl(res);
//     console.log(res);
//   } catch (error) {
//     console.log(error);
//   }
// };
const handleDeleteImage = (id) => {
  axios
    .delete(`http://localhost:6000/qrimage/image/${id}`)
    .then((response) => {
      console.log(response.data);
      setImageList(imageList.filter((image) => image.id !== id));
    })
    .catch((error) => {
      console.log(error);
    });
};
  const [imageList, setImageList] = useState([]);

  useEffect(() => {
    axios.get(`${QRAPI_URL}/qrcode/image`)
      .then(response => {
        setImageList(response.data);
        console.log(response.data)
      })
      .catch(error => {
        console.log(error);
      });
  }, []);
  
  return (
    <Layout title={"Dashboard - All Users"} >
      <div className="container-fluid m-3 p-3">
        <div className="row" style={{marginTop:"70px"}} >
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            {/* <h1>All Users</h1> */}
            <form action="">
      <input type="url"  style={{borderBottom:"2px solid black"}} onChange={(e)=>setText(e.target.value)} />
      <button type="submit" onClick={()=>generateQrCode()}>Generate Qr Code</button>
      </form> 
<br />
{imgUrl  ? (<a href={imgUrl} download> <img src={imgUrl} alt="img"  style={{height: "40%"}}/> </a> ) : ""}
<hr /><input type="file" onChange={handleFileUpload} />
      <button onClick={handleImageUpload}>Upload Qr code</button> <hr />
            {/* <form action="">
      <input type="text" style={{borderBottom: "2px solid black"}}className="mt-5" onChange={(e)=>setText(e.target.value)} />
      <button type="submit" onClick={()=>generateQrCode()}>Generate Qr Code</button>
      <br />
      {imgUrl  ? (<a href={imgUrl} download> <img src={imgUrl} alt="img"  style={{height: "60%"}}/> </a> ) : ""}
      </form>  */}
      <br />
      <table style={styles.table}>
      <thead>
        <tr>
          <th style={styles.th}>Image</th>
          <th style={styles.th}>Image Text</th>
          <th style={styles.th}>Action</th>
        </tr>
      </thead>
      <tbody>
        {imageList.map((image, index) => (
          <tr key={index}>
            <td style={styles.td}><img src={`data:${image.contentType};base64,${image.data}`} alt="img" /></td>
            <td style={styles.td}>{image.text}</td>
            <td style={styles.td}>
              <button style={styles.button} onClick={() => handleDeleteImage(image.id)}>
                Delete {image.text}
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
      {/* {imageList.map((image, index) => (
        <>
  <img
    key={index}
    src={`data:${image.contentType};base64,${image.data}`}
    alt="img"
  />
  <h5>{image.text}</h5>
  <button onClick={() => handleDeleteImage(image.id)}>
                  Delete {image.text}
                </button>
  </>
))} */}

      

<br />

      
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Users;
