import React, { useEffect } from 'react'
import Navbar from '../components/Navbar'
import SideBar from '../components/SideBar'
import { useDisplay } from '../context/ComponentContext'
import AdminDashBoard from '../components/AdminDashBoard'
import StoreDashBoard from '../components/StoreDashBoard'
import StoreList from '../components/StoreList'

const HomeDashBoard = () => {
    const {currentEle,setCurrentEle}=useDisplay();
    const role=localStorage.getItem("userRole");
    useEffect(()=>{
        if(role==="Admin"){
            setCurrentEle(<AdminDashBoard/>)
        }else if(role==="User"){
            setCurrentEle(<StoreList/>)
        }else{
            setCurrentEle(<StoreDashBoard/>)
        }
    },[]);
  return (
    <div className='mainContainer'>
        <Navbar/>
        <div className='main'>   
        <SideBar/>
        {currentEle}
        </div>
    </div>
  )
}

export default HomeDashBoard