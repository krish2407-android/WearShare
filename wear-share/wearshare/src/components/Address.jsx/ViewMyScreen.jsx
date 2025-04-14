import axios from 'axios'
import React, { useEffect, useState } from 'react'

export const ViewMyScreen = () => {

    const [screens, setscreens] = useState([])
    const getAllMyScreens = async() => {

        const res = await axios.get("/address/getaddressbyuserid/"+localStorage.getItem("id"))
        console.log(res.data) //api response...
        setscreens(res.data.data)

    }

    useEffect(() => {
        
        getAllMyScreens()
        
    }, [])
    

  return (
    <div style={{textAlign:"center"}}>
        MY SCREENS
        <table className='table table-dark'>
            <thead>
                <tr>
                    <th>Address</th>
                    <th>IMAGE</th>
                </tr>
            </thead>
            <tbody>
                {
                   screens?.map((sc)=>{
                    return<tr>
                        <td>{sc.address}</td>
                        <td>
                            <img  style ={{height:100,width:100}}src={sc?.addressURL}></img>
                        </td>
                    </tr>
                   }) 
                }
            </tbody>
        </table>
    </div>
  )
}