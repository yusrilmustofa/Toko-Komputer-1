import React from "react"
import Navbar from "../component/Navbar"
import axios from 'axios'
import {base_url} from "../config"
import NavBar from "../component/Navbar"
export default class Home extends React.Component{
    constructor(){
        super()
        this.state ={
            token:"",
            adminName:null,
            productsCount:0,
            customersCount:0,
            transactionsCount:0,
            adminCount: 0
        }
        if (localStorage.getItem("token")) {
            this.state.token = localStorage.getItem("token")
        }else{
            window.location ="/login"
        }
    }
    headerConfig =()=>{
        let header ={
            headers: {authorization: `Bearer ${this.state.token}`}
        }
        return header
    }
    getProduct =()=>{
        let url =base_url + "/product"
        axios.get(url,this.headerConfig())
        .then(response =>{
            this.setState({productsCount:response.data.length})
        })
        .catch(error =>{
            if (error.response) {
                if (error.response.status) {
                    window.alert(error.response.data.message)
                    this.props.history.push("/login")
                }
            }else {
                console.log(error);
            }
        })
    }
    getCustomer =() =>{
        let url =base_url + "/customer"
        axios.get(url,this.headerConfig())
        .then(response =>{
            this.setState({customersCount:response.data.length})
        })
        .catch(error =>{
            if (error.response) {
                if (error.response.status) {
                    window.alert(error.response.data.message)
                    this.props.history.push("/login")
                }
            }else{
                console.log(error);
            }
        })
    }
    getTransaction =() =>{
        let url =base_url + "/transaksi"
        axios.get(url,this.headerConfig())
        .then(response =>{
            this.setState({transactionsCount:response.data.length})
        })
        .catch(error =>{
            if (error.response) {
                if (error.response.status) {
                    window.alert(error.response.data.message)
                    this.props.history.push("/login")
                }
            }else{
                console.log(error);
            }
        })
    }

    getAdmins =() => {
        //  kyk yg lain
        // siap pak
        let url = base_url + "/admin"
        axios.get(url, this.headerConfig())
        .then(response =>{
            this.setState({adminCount:response.data.length})
        })
        .catch(error =>{
            if (error.response) {
                if (error.response.status) {
                    window.alert(error.response.data.message)
                    this.props.history.push("/login")
                }
            }else{
                console.log(error);
            }
        })
    }
    componentDidMount(){
        this.getCustomer()
        this.getAdmins()
        this.getProduct()
        this.getTransaction()
        this.getAdmin()
    }
    getAdmin =() =>{
        let admin =JSON.parse(localStorage.getItem("admin"))
        this.setState({adminName:admin.name})
    }
    render(){
        return(
            <div>
                <NavBar />
                <div className="container mt-2 ">
                    <h3 className="my-3">
                        <strong className="text-bold text-white text-center" >Welcome Back ,</strong>
                        <h1 className="text-danger text-bold">{this.state.adminName}</h1>
                    </h3>
                    <div className="row">
                        {/* Product Count */}
                        <div className="col-lg-4 col-md-6 col-sm-12 mt-2">
                            <div className="card">
                                <div className="card-body bg-success">
                                    <h4 className="text-dark">
                                        <strong>Product Count</strong>
                                    </h4>
                                    <h1 className="text-white">
                                        <strong>{this.state.productsCount}</strong>
                                    </h1>
                                </div>
                            </div>
                        </div>
                        {/* Customers Count */}
                        <div className="col-lg-4 col-md-6 col-sm-12 mt-2">
                            <div className="card">
                                <div className="card-body bg-warning">
                                    <h4 className="text-dark">
                                        <strong>Customers Count</strong>
                                    </h4>
                                    <h1 className="text-white">
                                        <strong>{this.state.customersCount}</strong>
                                    </h1>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-sm-12 mt-2">
                            <div className="card">
                                <div className="card-body bg-primary">
                                    <h4 className="text-dark">
                                        <strong>Transaction Count</strong>
                                    </h4>
                                    <h1 className="text-white">
                                        <strong>{this.state.transactionsCount}</strong>
                                    </h1>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-sm-12 mt-2">
                            <div className="card">
                                <div className="card-body bg-danger">
                                    <h4 className="text-white">
                                        <strong>Admin Count</strong>
                                    </h4>
                                    <h1 className="text-white">
                                        <strong>{this.state.adminCount}</strong>
                                    </h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
