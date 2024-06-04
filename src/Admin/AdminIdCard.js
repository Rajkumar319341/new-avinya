import React, { Component } from 'react'
import { APIData, org } from "../Authentication/APIData";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import axios from "axios";
import IdCard from '../IdCard'

var a = []

export class AdminIdCard extends Component {
    state = {
        selectedID: "",
        display: false,
        dob: "",
        name: "",
        phone: "",
        photo: "",
        id: "",
        empdata: []

    }

    async componentDidMount() {
        try {
            const url = APIData.api + `employee/details?org=${org}`;
            const response = await fetch(url, { headers: APIData.headers });
            const daata = await response.json();
            this.setState({ empdata: daata, loading: false });

        }
        catch (err) {
            toast(err)
        }
    }
    submitHandler = (e) => {
        e.preventDefault()
        // const url = APIData.api + "employee/" + this.state.selectedID;
        // console.log(url)
        // axios.get(url, { headers: APIData.headers })
        //     .then((response) => {
        //         console.log('Res', response)
        //         console.log('Name from Api:', response.data)
        //         this.setState({ name: response.data.name, dob: response.data.dob, phone: response.data.phone_number, id: response.data.faculty_id, photo: response.data.photo, display: true })
        //     })
        this.setState({display: true })
    }

    changeHandler = (e) => {
        this.setState({ selectedID: [e.target.value] });
        console.log(e.target.value)
        console.log(this.state.selectedID)
        const url = APIData.api + "employee/" + e.target.value;
        console.log(url)
        axios.get(url, { headers: APIData.headers })
            .then((response) => {
                console.log('Res', response)
                console.log('Name from Api:', response.data)
                this.setState({ name: response.data.name, dob: response.data.dob, phone: response.data.phone_number, id: response.data.faculty_id, photo: response.data.photo,display: false })
            })
    }




    render() {

        return (
            <div className="carrybox">
                <br></br>
                <form onSubmit={this.submitHandler}>
                {/* <form> */}
                <label className='Filter'><b>Select Employee ID</b></label>

                <div className='Filter'>
                    <select name="selectList" id="selonClickctList" onChange={this.changeHandler} >

                        <option value="" selected>Select employee ID</option>
                        {a = [...new Set(this.state.empdata.map(item => item.faculty_id))]}
                        {a.map((item, index) => {
                            return (
                                <option name='selectedID' value={item}>{item}</option>
                            );
                        })}
                    </select>
                    </div>
                    {console.log(this.state.empdata)}
                    {/* <input type='text' id='id_value' name='selectedID' value={this.state.selectedID}
                        onChange={this.changeHandler}
                    /> */}
                    <br></br>
                    <button className='Downloadbutton' type='submit'>Submit</button>

                </form>
                {
                    this.state.display ? <div>
                        {console.log(this.state.name)}
                        <IdCard data={this.state} />
                    </div> : null
                }

            </div>
        )
    }
}

export default AdminIdCard