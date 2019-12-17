import React from 'react';


function FavoritesPets(props) {
    console.log(props)
    const { age, name, image, breed, description} = props.pet;
    return(
            
        <div  style={{margin: "auto"}} className="col-lg-4 col-md-4 mb-4">
            <div className="card h-100">
                <img className="card-img-top"  src={image} alt="" />
                  <div className="card-body">
                    <h4 className="card-title">
                        <a href="#">{name}</a>
                        <div>
                            <span className="badge badge-primary" style={{fontSize: "12px"}}>{breed}</span>
                        </div>
                        <div>
                            <span className="badge badge-warning" style={{fontSize: "12px"}}>{age}</span>
                        </div>
                        </h4>
                        <p className="card-text">
                            {description}
                        </p>
                        </div>
                        
            </div>
        </div>
    
    
    )
}

export default FavoritesPets;