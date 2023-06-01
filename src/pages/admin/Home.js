import '../../App.css'
import React, { useEffect, useState } from "react";
import {faFingerprint} from  '@fortawesome/free-solid-svg-icons'
import Layout from "../../components/Layout";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
function Home() {
  return (
    <Layout>
        <div style={{background:"#330101",height:"100%",display:"grid",placeItems:"center"}}>
            <h1 className="text-center" style={{color:"white"}}>ADMIN PAGE</h1>
            <FontAwesomeIcon className='fingerprint' icon={faFingerprint} />
        </div>
  </Layout>
  )
}

export default Home