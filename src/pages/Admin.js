import React from "react"
import Navbar from "../component/Navbar"
import axios from "axios"
import { base_url } from "../config"
import $, { error } from "jquery"
export default class Admin extends React.Component {
    constructor() {
        super()
        this.state = {
            token: "",
            action: "",
            admins: [],
            admin_id: "",
            name: "",
            username: "",
            password: "",
            fillPassword: true
        }
        if (localStorage.getItem("token")) {
            this.state.token = localStorage.getItem("token")
        } else {
            window.location = "/login"
        }
    }
    headerConfig = () => {
        let header = {
            headers: { Authorization: `Bearer ${this.state.token}` }
        }
        return header
    }
    getAdmins = () => {
        let url = base_url + "/admin"
        axios.get(url, this.headerConfig())
            .then(response => {
                this.setState({ admins: response.data })
            })
            .catch(error => {
                if (error.response) {
                    if (error.response.status) {
                        window.alert(error.response.data.message)
                        this.props.history.push("/login")
                    }
                } else {
                    console.log(error);
                }
            })
    }
    componentDidMount() {
        this.getAdmins()
    }
    Add =() =>{
        $("#modal_admin").modal("show")
        this.setState({
            admin_id:0,
            name:"",
            username:"",
            password:"",
            fillPassword:true,
            action:"insert"
        })
    }
    Edit = selectedItem =>{
        $("#modal_admin").modal("show")
        this.setState({
            admin_id:selectedItem.admin_id,
            name:selectedItem.name,
            username:selectedItem.username,
            password:"",
            fillPassword:false,
            action:"update"
        })
    }
    saveAdmin = event =>{
        event.preventDefault()
        $("#modal_admin").modal("hide")
        let form= {
            admin_id:this.state.admin_id,
            name:this.state.name,
            username:this.state.username
        }
        if (this.state.filPassword) {
            form.password =this.state.password
        }
        let url = base_url + "/admin"
        if (this.state.action === "insert") {
            axios.post(url,form,this.headerConfig())
            .then(response=>{
                window.alert(response.data.message)
                this.getAdmins()
            })
            .catch(error => console.log(error))
        }else if (this.state.action === "update") {
            axios.put(url,form,this.headerConfig())
            .then(response =>{
                window.alert(response.data.message)
                this.getAdmins()
            })
            .catch(error => console.log(error))
        }
    }
    render(){
        return(
            <div>
                <Navbar />
                <div className="container">
                    <h3 className="text-bold text-warning mt-2">Admin List</h3>
                    <table className="table table-bordered bg-white">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Username</th>
                                <th>Option</th>
                            </tr>
                        </thead>
                        <tbody>
                            { this.state.admins.map((item,index)=>(
                                <tr key={index}>
                                    <td>{index+1}</td>
                                    <td>{item.name}</td>
                                    <td>{item.username}</td>
                                    <td>
                                        <button className="btn btn-info btn-sm m-1"
                                        onClick={()=> this.Edit(item)}>
                                            Edit
                                        </button>

                                        <button className="btn btn-danger btn-sm m-1"
                                        onClick={()=> this.Drop(item)}>
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}                            
                        </tbody>
                    </table>
                    <button className="btn btn-success form-control" onClick={() => this.Add()}>
                       Add Admin
                    </button>
                    {/* modal admin  */}
                    <div className="modal fade" id="modal_admin">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header bg-info text-white">
                                    <h4>Form Admin</h4>
                                </div>
                                <div className="modal-body">
                                    <form onSubmit={ev => this.saveAdmin(ev)}>
                                        Admin Name
                                        <input type="text" className="form-control mb-1"
                                        value={this.state.name}
                                        onChange={ev => this.setState({name: ev.target.value})}
                                        required
                                        />

                                        Username
                                        <input type="text" className="form-control mb-1"
                                        value={this.state.username}
                                        onChange={ev => this.setState({username: ev.target.value})}
                                        required
                                        />

                                        { this.state.action === "update" && this.state.fillPassword === false ? (
                                            <button className="btn btn-sm btn-secondary mb-1 btn-block"
                                            onClick={() => this.setState({fillPassword: true})}>
                                                Change Password
                                            </button>
                                        ) : (
                                            <div>
                                                Password
                                                <input type="password" className="form-control mb-1"
                                                value={this.state.password}
                                                onChange={ev => this.setState({password: ev.target.value})}
                                                required
                                                />
                                            </div>
                                        ) }

                                        <button type="submit" className="btn btn-block btn-success">
                                            Simpan
                                        </button>
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
