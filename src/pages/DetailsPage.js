import React from 'react';
import axios from "axios";
//Bunun propsu nereye bağlanmış oldu? Router içerisindeki ":" işaretini kullanmazsam this.props çıktı vermiyor. Bu da Router'ın aslında buraya props gönderdiği anlamına geliyor yanılmıyorsam?
//Router'a verdiğim ":" işaretinden sonra id bilgisi buraya, match.params içerisinde nasıl geliyor? Pet.js dosyasında Link to içerisinde id'yi vermem, Router'ı bundan nasıl haberdar ediyor? 
// Buna tekrar veri çekmektense PetList üzerinde çektiğim veriyi buraya props olarak geçip kullansam olmaz mıydı? Tekrar veri çekmek neden gerekli?

class DetailsPage extends React.Component {
    constructor(props){
        super(props);
        this.state={
            detail: []
        }
    }
    
    componentDidMount(){
        document.title = "Details Page"

        const id = this.props.match.params.id;
        
        
        axios.get(`http://5dd7af92505c590014d3b4ac.mockapi.io/pets/${id}`)
        .then( res => {
            const detailData = res.data;
            this.setState({
                detail: detailData
            })
        })

       
       /* //Alternative 2 - Fetch

         fetch(`http://5dd7af92505c590014d3b4ac.mockapi.io/pets/${id}`)
        .then((resp) => resp.json())
        .then((data) => {
            this.setState({
                detail: data
             })
         })*/
    }
    render(){
        const { age, name, published_at, image, breed, description} = this.state.detail;
        return(
            
            <div  style={{margin: "auto"}} className="col-lg-6 col-md-4 mb-4">
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

    
}

export default DetailsPage;
