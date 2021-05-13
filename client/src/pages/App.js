import {useState, useEffect} from 'react';
import {Jumbotron, Button, OverlayTrigger,Tooltip, Modal, Form} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "../commons/axios"
// import { response } from 'express';
import { message, Typography } from 'antd';
import 'antd/dist/antd.css'
import e from 'cors';

const{Link}=Typography;

function App(props) {

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = (e) => {
    if (e.target.outerText === "Customer"){
      setModal('customer')
    }else{
      setModal('vendor')
    }
    setShow(true)
  };

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userName, setName] = useState('');

  const[lat,setLat] = useState('');
  const[lng,setLng] = useState('');
  const[vendors,setVendors] = useState([]);
  const[modal,setModal] = useState([]);

  // const renderTooltip = (props) => (
  //   <Tooltip id = 'button-tooltip' {...props}>
  //     feature still in progess
  //   </Tooltip>
  // );

  useEffect(() =>{
    navigator.geolocation.getCurrentPosition(function (position){
      setLat(position.coords.latitude)
      setLng(position.coords.longitude)
    });
    axios.get('/vendor?lat='+lat+'&lng='+lng).then(response =>{
      setVendors(response.data.vendors)
    })
  },[lat,lng])

  const onCustomerLogin = () => {
    axios.post("/customer/login", {email: email, password: password}).then(response => {
      if(response.data.success){
        //传递本页信息到下一页
        props.history.push('/customer', {
          customer : response.data.customer, 
          vendors: vendors, 
          position: [lat,lng]
        });
      }else{
        message.error(response.data.error)
      }
    }).catch(error =>{
      console.log(error)
      })
  }

  const onVendorLogin = () => {
    axios.post("/vendor/login", {userName: userName, password: password}).then(response => {
      if(response.data.success){
        //传递本页信息到下一页
        message.success("Logged in successfully!!")
        props.history.push('/vendor', {
          vendor : response.data.vendor, 
          position: [lat,lng],
          vendors: []
        });
      }else{
        message.error(response.data.error)
      }
    }).catch(error =>{
      setShow(false);
      console.log(error.response.data.error)
      message.error(error.response.data.error)
      })
  }

  const onSkip = () =>{
    props.history.push('/customer',{
      position:[lat, lng],
      vendors: vendors
    });
  }

  const customerModal = (
    <>
      <Modal.Header closeButton>
          <Modal.Title>Customer Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email"
                onChange={e => setEmail(e.target.value)} />
              <Form.Text className="text-muted">
                We promise that never sharing your details with others = )
              </Form.Text>  
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password"
                onChange={e => setPassword(e.target.value)} /> 
            </Form.Group>
          </Form>
          <Link onClick={onSkip}>
            Skip for now
            </Link>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-dark" onClick={handleClose}>
            Close
          </Button>
          <Button variant="dark" onClick={onCustomerLogin}>
            Login
          </Button>
        </Modal.Footer>
    </>
  )

  const vendorModal = (
    <>
      <Modal.Header closeButton>
          <Modal.Title>Vendor Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formBasic">
              <Form.Label>User Name</Form.Label>
              <Form.Control type="text" placeholder="Enter name"
                onChange={e => setName(e.target.value)} />
              <Form.Text className="text-muted">
                We promise that never sharing your details with others = )
              </Form.Text>  
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password"
                onChange={e => setPassword(e.target.value)} /> 
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-dark" onClick={handleClose}>
            Close
          </Button>
          <Button variant="dark" onClick={onVendorLogin}>
            Login
          </Button>
        </Modal.Footer>
    </>
  )
 
  return (
    <div style={{width: '40%', margin :'auto', marginTop: '20%'}}>
      <Modal show={show} onHide={handleClose} style={{ marginTop: '2vh' }} >
        {(modal === "customer")? customerModal : vendorModal}
      </Modal>
      <Jumbotron style = {{background: "white"}}>
        <h1>
        <img alt="" src="/coffee-truck.png" width="70" height="50" className="d-inline-block align-top"/>
          Welcome to Le Sillage !!
        </h1>
        <p>
          tell me more about the van:
        </p>
        <p>
          <Button variant = "outline-dark" onClick = {handleShow}>Customer</Button>
          <Button variant = "dark" style = {{marginLeft: "1vw"}} onClick = {handleShow}>Vendor</Button>
        </p>
      </Jumbotron>
    </div>
  );
}

export default App;