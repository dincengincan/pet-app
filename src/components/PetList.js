import React from 'react';
import {Pet} from "../components";
import {getPets} from "../constants";
import {stringContains} from "../helpers";
import Axios from 'axios';



class PetList extends React.Component{
    breed;
    constructor(props){
        super(props);
        this.state = {
            _pets: [],
            pets: [],
            yukleniyor: true,
            favouritePets: [],
        }
    }

    componentDidMount() {
        getPets().then((data) => {
            this.setState({
                _pets: data,
                pets: data,
                yukleniyor: false,
                index: 0
            })
        })
        this.getFavouritePets();
        window.addEventListener("scroll", this.handleScroll);
    }

    componentWillUnmount() {
        window.removeEventListener("scroll", this.handleScroll);
    }

    componentDidUpdate(prevProps) {
        if(prevProps.activeFilter !== this.props.activeFilter){
            this.filterPets();
        }
        if(prevProps.searchValue !== this.props.searchValue){
            this.filterPets();
        }
        
    }

    //when component is Mounted get data and save it to the state.
    getFavouritePets = () => {
        Axios
        .get("http://5dd7af92505c590014d3b4ac.mockapi.io/favorites")
        .then(res => this.setState({
            favouritePets: res.data
        }, ()=> console.log(this.state.favouritePets)))
    }

    filterPets = () => {
        if(!this.props.activeFilter){
            this.setState({
                pets: this.state._pets.filter((pet) => {
                    return stringContains(pet.name, this.props.searchValue)
                })
            })
        }else{
            this.setState({
                pets: this.state._pets.filter((pet) => {
                    return pet.breed === this.props.activeFilter;
                }).filter((filteredPet) => {
                    return stringContains(filteredPet.name, this.props.searchValue)
                })
            })
        }
    }
    
    
    handleScroll = () => {
        const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
        const body = document.body;
        const html = document.documentElement;
        const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
        const windowBottom = windowHeight + window.pageYOffset;
        if (windowBottom >= docHeight) {
            setTimeout(this.setState({
                index: this.state.index+4
            }), 1000) 
        } 
      }
    
    //Didnt' work out. When i click favoritepage and turn back to homepage afterwards, button restores itself as green.
    /*toggleFavorite = (favoriteItem) => {
        const newPets = this.state.pets.map(pet => {
            if(pet.id === favoriteItem.id){
                return {...pet, checked: !pet.checked}
            }else{
                return pet;
            }
        })  
        this.setState({
            pets: newPets
        })
    }*/

    

    //Şu anda buton güncellemesi için state'den bilgi alıyorum, favorite page güncellemesi için ise API'ı birnevi state gibi kullanıyorum...
    //...Burada bir saçmalık var ama çözemedim? Direk state'den hem butonu hem de favoritePage'i kontrol etmek mümkün olabilmeli???

    removeFavouriteFromState = (id) => {
        //Çıkarılan pet için state'i güncelle
        //Burada state'i başarılı bir şekilde güncelliyorum ve buton yeşile dönüyor. 
        //Fakat bu API'ı dinamik bir şekilde güncellenmediğim için fake bir etki oluyor.
        //Zaten sayfayı yenileyince tekrar kırmızıya dönüyor.
        const newFavPets = this.state.favouritePets.filter(pet => {
            return pet.pet.id != id;
        })
        this.setState({
            favouritePets: newFavPets
        }, ()=>console.log(this.state.favouritePets))
    }
    
    //Eklenen pet için state'i güncelle
    addFavouriteToState = (newPet) => {
        this.setState({
            favouritePets: this.state.favouritePets.concat(newPet)
        })
    }
    
    render(){
        const newList = this.state.pets.slice(0, this.state.index+4)
        const Yukleniyor = <div>Loading...</div>;
        const EmptyPets = <div>Could't Find Any Pets</div>;
        const Pets =  [<h3>Total Pets Shown: {newList.length} </h3>,<div className="row">
            {
                newList.map(pet=> {
                    const isFavourite = this.state.favouritePets.some(favouritePet => {
                        if(favouritePet.pet && favouritePet.owner == "Engin Can"){
                            return pet.id === favouritePet.pet.id
                        }
                    })  
                    return  <Pet key={Math.random()} pet={pet}         
                            isFavourite = {isFavourite}
                            favouritePets = {this.state.favouritePets}
                            removeFavouriteFromState = {this.removeFavouriteFromState}
                            addFavouriteToState={this.addFavouriteToState}
                            owner= "Engin Can" />
                }) 
            }
        </div>];
        if(this.state.yukleniyor){
            return Yukleniyor;
        }else if(this.state.pets.length === 0){
            return EmptyPets
        }else{
            return Pets;
        }
    }
}


export default PetList;
