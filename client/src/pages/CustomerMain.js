import {useState, useEffect} from 'react';
import {Button} from 'react-bootstrap';
import {Divider, Drawer, PageHeader} from 'antd';
import axios from "../commons/axios"
import LeafletMap  from '../components/LeafletMap.js';
import OrderList from '../components/OrderList.js';
import './main.css';


export default function CustomerMain(props) {

    const [drawerVisible, setDrawerVisible] = useState(false); 
    const handleDrawerClose = () => setDrawerVisible(false); 
    const handleDrawerShow = () => setDrawerVisible(true); 
    const [orders, setOrders] = useState([]);
    const [snacks, setSnacks] = useState([]);

    const [title, setTitle] = useState('');
    const [options, setOptions] = useState([]);

    useEffect(() => {
        if(props.location.state.customer){
            
            console.log(props.location.state.position)
            console.log(props.location.state.vendor)
            axios.get('/order?customer=' + props.location.state.customer.id).then(response => {
                setOrders(response.data.allOrders)
            })
           
            setTitle("Welcome "+props.location.state.customer.givenName)
            setOptions([<Button variant = "outline-dark" key = "1"
                onClick = {handleDrawerShow}>See Orders</Button>])
        }else{
            setTitle("Welcome!")
        }
        axios.get('/snack').then(response => {
            setSnacks(response.data.snacks)
        })
        
    }, [props.location.state.position, props.location.state.vendors, props.location.state.customer]); 
    
    

    console.log(props.location.state.position)
    // welcome!!
    return (
        <>
            
            <PageHeader title = {title}
                extra = {options}>
            </PageHeader>
            <Drawer visible ={drawerVisible}
                closable = {true}
                onClose = {handleDrawerClose}
                width={"60vw"}>
                All Orders
                <Divider/>
                <OrderList orders={orders} />
            </Drawer>
            <LeafletMap center = {props.location.state.position}
                        vendors = {props.location.state.vendors}
                        snacks={snacks}
                        customer={props.location.state.customer}
                        />
        </>
    )

    
}
