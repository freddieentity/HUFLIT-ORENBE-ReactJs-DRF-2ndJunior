import React from 'react'
import { Link } from 'react-router-dom'

function FormSuccess() {
    return (
        <div>           
            
            <div className="form-content-right">
                <div className="form-success">You sucessfully registered. Click the picture below to log in</div>
                <div className="form"> <Link to="/login"><button style={{cursor: "pointer"}}><img src="https://cdn4.iconfinder.com/data/icons/flat-business-3/512/Flat_business-14-512.png" alt="register-success" className="form-img-2"/></button></Link></div>                
            </div>
            
        </div>  
    )
}

export default FormSuccess
