import QrReader from 'react-qr-scanner';
import { useRef, useState } from 'react';
import axios from 'axios';
import './styles/Qr.css'
import { QRAPI_URL } from "./helper"


function Qr() {
  const qrRef = useRef();
  const [scanresult, setScanresult] = useState('');

  const handleErrorfile = (error) => {
    alert('There is a technical error');
    console.log(error);
  };

  const handleScanfile = async (result) => {
    if (result) {
      setScanresult(result.text);
      if (result.text === 'Table_1') {
        
        try {
          const response = await axios.post(`${QRAPI_URL}/feedback/add`, {
            tableid: result.text,
          });

          console.log(response.data, 'userData');
          alert('Scanned');
          console.log('matched');
          window.location.href = './Login';
        } catch (err) {
          console.log('ERROR:' + err);
        }
      } else {
        alert('Not Scanned');
        alert('Please scan the correct QR code');
      }
      console.log(result);
    }
  };

  return (
    <div className="main" >
      <div className="container">
        <div className="row">
          <div className="col-lg-6 col-md-6 col-12">
            <h1 style={{color:"white"}} >Instructions to scan the QR code</h1>
            <h2 style={{color:"white"}}>Step 1:</h2>
            <p style={{color: "antiquewhite"}}>Scan the placed QR code by any of the application from your device</p>
            <h2 style={{color:"white"}}>Step 2:</h2>
            <p style={{color: "antiquewhite"}}>Login by entering your correct details</p>
            <h2 style={{color:"white"}}>Step 3:</h2>
            <p style={{color: "antiquewhite"}}>You will be redirected to the Digital menu</p>
            <h2 style={{color:"white"}}>Step 4:</h2>
            <p style={{color: "antiquewhite"}}>Checkout to pay,Once all ordering is done </p>
          </div>

          <div className="col-lg-6 col-md-6 col-12">
            <QrReader
              ref={qrRef}
              delay={300}
              style={{ width: '100%' }}
              onError={handleErrorfile}
              onScan={handleScanfile}
            />
            <h3>
              {/* Get scanned code: <a href={scanresult}>{scanresult}</a> */}
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Qr;
