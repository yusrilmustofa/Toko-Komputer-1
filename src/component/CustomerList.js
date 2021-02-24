import React from 'react'

export default class CustomerList extends React.Component{
    render(){
        return(
            <div className="card col-sm-12 my-1">
                <div className="card-body row">
                    <div className="col-sm-3">
                        <img alt={this.props.name} src={this.props.image}
                        className="img rounded-circle" width="150" height="150" />
                    </div>
                    <div className="col-sm-7">
                        <h5 className="text-bold">Customer Name: {this.props.name} </h5>
                        <h6 className="text-info">Customer Phone: {this.props.phone} </h6>
                        <h6 className="text-success">Customer Addres: {this.props.address} </h6>
                    </div>
                    <div className="col-sm-2">
                        {/* ACTION */}
                        <button className="btn btn-primary btn-sm btn-block" onClick={this.props.onEdit}>
                            EDIT
                        </button>

                        <button className="btn btn-danger btn-sm btn-block" onClick={this.props.onDrop}>
                            DELETE
                        </button>
                        </div>       
                </div>
            </div>
        )
    }
}