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

    
    addFavourite = (pet, petFav) => {
        //Önce tıklanan peti API'a ekle ki favoritePage güncellensin.
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
        //Daha sonra PetListteki favoritePets state'ine ekle ki buton kırmızıya dönsün.
        this.props.addFavouriteToState(petFav);
    }

    
    // burada tıklanan pet i dinamik bir şekilde API'dan silmek istiyorum fakat MockApiId'sini bu comp seviyesinde göremiyorum. 
    removeFavourite = (MockAPIid, url, id) => {
        //Önce PetListteki favoritePets state'inden çıkar ki butonu yeşile döndürsün.
        this.props.removeFavouriteFromState(id);
        //Daha sonra API'dan çıkar ki favoritePage güncellensin.
        return fetch(url + '/' + MockAPIid, {
          method: 'delete'
        })
        .then(response => response.json());
        

        
      }
    
    render() {
        
        const {name, image, age, breed, id, onScroll } = this.props.pet;
        const detailPage = `/details/${id}`;
        console.log(this.props);
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
                        this.props.isFavourite 
                        ? <button onClick={() => this.removeFavourite({/*burada dinamik bir mockAPIId olmalı */}, "http://5dd7af92505c590014d3b4ac.mockapi.io/favorites", this.props.pet.id)} type="button" class="btn btn-outline-danger">Remove from Favorites</button>
                        : <button onClick={() => this.addFavourite(this.props.pet, this.props)} type="button" class="btn btn-outline-success">Add to Favorites</button>
                    }
                    
                    
                   
                </div>
            </div>
        </div>

        )
    }
}
export default Pet;
