import React, {useState, useEffect} from 'react'
import {Divider, Drawer, PageHeader} from 'antd';
import {Button} from 'react-bootstrap';
import OrderList from '../components/OrderList.js';

export default function Header(props) {

    const [drawerVisible, setDrawerVisible] = useState(false); 
    const handleDrawerClose = () => setDrawerVisible(false); 
    const handleDrawerShow = () => setDrawerVisible(true); 

    const [title, setTitle] = useState('');
    const [options, setOptions] = useState([]);

    useEffect(() => {
        if (props.customer){
            setTitle('welcome ' + props.customer.givenName)
            setOptions([<Button variant = "outline-dark" key = "1"
                onClick = {handleDrawerShow}>See Orders</Button>])
        }else{
            setTitle('welcome')
        }
    }, []); 


    return (
        <div>
            <PageHeader title = {title}
                extra = {options}>
            </PageHeader>
            <Drawer visible ={drawerVisible}
                closable = {true}
                onClose = {handleDrawerClose}
                width={"60vw"}>
                All Orders
                <Divider/>
                <OrderList orders={props.orders} />
            </Drawer>
        </div>
    )
}
