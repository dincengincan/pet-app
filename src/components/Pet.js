import React from 'react';
import {Link} from "react-router-dom";
import Axios from 'axios';


class Pet extends React.Component{
    
    constructor(props){
        super(props);
        this.state = {
            favourite: false
        }
    }

    addFavourite = (pet) => {
        this.setState({
            favourite: !this.state.favourite
        })
        
    }
    /*addFavourite = (pet) => {
        Axios
        .post("http://5dd7af92505c590014d3b4ac.mockapi.io/favorites", {
            pet: pet,
            owner: "Engin Can"
        }).then(data => {
            if(data){
                this.setState({
                    favourite: !this.state.favourite
                })
            }
        })
    }*/

    removeFavourite = (pet) => {
        console.log(pet.name,"Removed!")
    }
    // BURADA CHECK FAVORITE KISMINDA MANTIK HATASI VAR. ÜSTTE PETLISTTE FAVORITE STATE DENEN KISIMDA BU DATA VARSA BUTONU DEĞİŞTİR DİCEM YAPAMADIM
    render() {
        //console.log(this.props)
        const {name, image, age, breed, id, onScroll, isFavourite } = this.props;
        const detailPage = `/details/${id}`;
        
        return(
            <div  className="col-lg-6 col-md-4 mb-4">
            <div className="card h-100">
                <Link to={detailPage}>
                    <img onScroll={onScroll} className="card-img-top"  src={image} alt="" style={{height: "292px"}}/>
                </Link>
                <div className="card-body">
                    <h4 className="card-title">
                        <Link to={detailPage}>{name}</Link>
                        <div>
                            <span className="badge badge-primary" style={{fontSize: "12px"}}>{breed}</span>
                        </div>
                        <div>
                            <span className="badge badge-warning" style={{fontSize: "12px"}}>{age}</span>
                        </div>
                    </h4>
                    
                </div>
                <div className="card-footer">
                    
                    {
                        isFavourite
                        ? <button onClick={() => this.removeFavourite(this.props)} type="button" class="btn btn-outline-danger">Remove from Favorites</button>
                        : <button onClick={() => this.addFavourite(this.props)} type="button" class="btn btn-outline-success">Add to Favorites</button>
                    }
                    
                    
                   
                </div>
            </div>
        </div>

        )
    }
}
export default Pet;
