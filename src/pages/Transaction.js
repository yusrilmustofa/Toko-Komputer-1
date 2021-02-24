import React from "react"
import Navbar from "../component/Navbar"
import TransactionList from '../component/TransactionList'
import {base_url,product_image_url} from'../config'
import $ from 'jquery'
import axios from 'axios'
export default class Transaction extends React.Component{
    constructor(){
        super()
        this.state={
            token:"",
            transaction:[],
            selectedItem:null
        }
        if (localStorage.getItem("token")) {
            this.state.token = localStorage.getItem("token")
        }else{
            window.location ="/login"
        }
    }
    headerConfig =() =>{
        let header ={
            headers:{ Authorization: `Bearer ${this.state.token}`}
        }
        return header
    }
    getTransaction =() =>{
        let url = base_url + "/transaksi"
        axios.get(url,this.headerConfig())
        .then(response =>{
            this.setState({transaction:response.data})
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
    componentDidMount(){
        this.getTransaction()
    }
    render(){
        return (
            <div>
                <Navbar />

                <div className="container">
                    <h3 className="text-bold text-warning mt-2">Transactions List</h3>
                    { this.state.transaction.map(item => (
                        <TransactionList
                        key = {item.transaksi_id}
                        transaction_id = {item.transaksi_id}
                        customer_name = {item.customer.name}
                        customer_address = {item.customer.address}
                        time = {item.waktu}
                        products = {item.detail_transaksi}
                         />
                    )) }
                    <button className="btn btn-sm btn-success form-control" onClick={() => this.Add()}>
                    Add Transaction
                </button>
                <div className="modal fade" id="modal_transaksi">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header bg-info">
                                <h4>Form Transaction</h4>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={ev => this.saveTransaksi}>
                                    Customer Name
                                    <input type="text" className="form-control m-1"
                                    value={this.state.name} onChange={ev => this.setState({name:ev.target.value})} required />
                                    
                                    Customer Address
                                    <input type="text" className="form-control mb-1"
                                    value={this.state.address} onChange={ev =>this.setState({address:ev.target.value})} required />

                                    Time
                                    <input type="time" className="form-control mb-1"
                                    value={this.state.time} onChange={ev =>this.setState({time:ev.target.value})} required />
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        )
    }
}

