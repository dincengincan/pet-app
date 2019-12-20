import React from 'react';
import FavoritesPets from "../components/FavoritesPets"
import Axios from 'axios';



class FavoritesPage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            favouritePets: []
        }
    }


    componentDidMount() {
        document.title = "Favourites Page"
       
       
        Axios
          .get("http://5dd7af92505c590014d3b4ac.mockapi.io/favorites")
          .then(res =>
            this.setState(
              {
                favouritePets: res.data
              }
            )
          );
      }

    
    
    render(){
        return(
            <div>
                <h2>Favorite Page</h2>
                {this.state.favouritePets.map(pet => {
                    if(pet.pet && pet.owner ==="Engin Can"){
                        return <FavoritesPets key={Math.random()} {...pet}
                        />
                    }
                })}
            </div>
        );


    } 
    
}

export default FavoritesPage;
