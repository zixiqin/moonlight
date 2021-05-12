import { PresetColorTypes } from 'antd/lib/_util/colors';
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import Menu from './Menu.js';


export default function LeafletMap(props) {
 
    
    return (
        <>
            <MapContainer center={props.center} zoom={18} scrollWheelZoom={false} style={{height: "90vh"}}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    
                />
                <Marker position={props.center} iconUrl = {"https://static.thenounproject.com/png/780108-200.png"}>
                    <Popup>Your location </Popup>
                </Marker>
                {
                    props.vendors.map((vendor) => (
                        <Menu key = {vendor.id}
                            position = {vendor.location}
                            snacks = {props.snacks}
                            vendor = {vendor}
                            customer = {props.customer}/>
                        //<Marker position={vendor.location} icon = {vendorIcon}>
                          //  <Popup>vendor located </Popup>
                        //</Marker>
                    ))
                }
            </MapContainer>
        </>
    )
}
