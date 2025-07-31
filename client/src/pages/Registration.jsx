import React from 'react'

const Registration = () => {
  return (
    <div>
        <div className="container">
            <div className="row">
            <div className="col-md-6 offset-md-3 mt-5 shadow p-3 mb-5 bg-body rounded">
            <h1 className="text-center">Registration Form</h1>
                <form className="row g-3">
                    <div className="col-md-6">
                        <label htmlFor="inputEmail4" className="form-label">Name</label>
                        <input type="text" className="form-control" id="name"/>
                    </div>
                  
                    
                    <div className="col-md-6">
                        <label htmlFor="inputEmail4" className="form-label">Email</label>
                        <input type="email" className="form-control" id="inputEmail4"/>
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="inputEmail4" className="form-label">Number</label>
                        <input type="text" className="form-control" id="number"/>
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="inputPassword4" className="form-label">Password</label>
                        <input type="password" className="form-control" id="inputPassword4"/>
                    </div>
                    <div className="col-md-12">
                        <label  className="form-label">Address</label>
                        <input type="text" className="form-control" id="address"/>
                    </div>
                    <div className="col-md-12">
                        <label  className="form-label">College</label>
                        <input type="text" className="form-control" id="college"/>
                    </div>
                    <div className="col-md-12">
                        <label  className="form-label">Qualification</label>
                        <input type="text" className="form-control" id="qualification"/>
                    </div>
                   
                   
                    <div className="col-sm-12 text-center">
                        <button type="submit" className="btn btn-primary w-100 ">Submit</button>
                    </div>
                </form>
                <p className='text-center'>Already have an account? <a href="/login">Login here</a></p>
                </div>
                </div>
                </div>
    </div>
  )
}

export default Registration