import './styles/QRHome.css'
import ScanMenu from '../src/ScanMenu.gif';
// import qrBack from "../public/images/qrBack.jpg";

function QRHome() {
  // const defaultOptions = {
  //   loop: true,
  //   autoplay: true, 
  //   animationData: data,
  //   rendererSettings: {
  //     preserveAspectRatio: 'xMidYMid slice'
  //   }
  // };
  return (
    <div className='main'>
    <div className="qr">
      <div className="container">
        <div className="center">
          {/* {
      <Lottie options={defaultOptions}
              height={400}
              width={400}
             />} */}
          {/* <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div> */}
            <img src={ScanMenu} className='img' alt="wait until the page loads" />
              <button className='img' style={{width:"-webkit-fill-available"}} onClick={()=>{
              window.location.href='./Qr';
              }}>
                Scan
              </button>

           
          
        </div>
      </div>
    </div>
    </div>
  )
}

export default QRHome
