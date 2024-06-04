import React, { Component } from "react";
import "../CRUDTable.css";
import { APIData, org } from "../Authentication/APIData";
import Loading from "../Loading";
import { toast } from "react-toastify";
import * as ImIcons from "react-icons/im";
import * as AiIcons from "react-icons/ai";
import * as TiIcons from "react-icons/ti";
import axios from "axios";

const sessiondetails = JSON.parse(localStorage.getItem("sessiondetails"));

class OrgReject extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: null,
            title: "",
            reason: "",
            requested_by: "",
            authorised_by: sessiondetails.user,
            status: "",
            requested_at: "",
            authorised_at: "",
            supervisor_id: "",
            supervisor_email: "",
            reject_reason: "",
            requested_email: "",
        };

    }



    componentDidMount() {
        const fetchData = async () => {


            try {
                const urll = APIData.api + "passwordaccess/detail?id=" +this.props.value ;

                const response = await fetch(urll, { headers: APIData.headers });
                const data = await response.json();

                // const data = daata.filter(
                //     (item) => item.id === parseInt(this.props.value)
                // );
                // console.log(data);



                this.setState({
                    id: data.id,
                    title: data.title,
                    reason: data.reason,
                    requested_by: data.requested_by,
                    authorised_by: data.authorised_by,
                    status: data.status,
                    requested_at: data.requested_at,
                    authorised_at: data.authorised_at,
                    supervisor_id: data.supervised_id,
                    supervisor_email: data.supervised_email,
                    reject_reason: data.reject_reason,
                    requested_email: data.requested_email,
                });
            } catch (err) {
                toast(err);
            }
        };
        fetchData();
    }

    handleSubmit = (e) => {
        e.preventDefault();


        let today = new Date().toISOString().slice(0, 10);
        this.setState({ loading: true })

        // console.log(this.state.requested_at)

        const RejectReason = {
            authorised_at: today,
            authorised_by: sessiondetails.user,
            id: this.state.id,
            reject_reason: this.state.reject_reason,
            reason: this.state.reason,
            requested_by: this.state.requested_by,
            requested_email: this.state.requested_email,
            requested_at: this.state.requested_at,
            status: "rejected",
            supervisor_email: this.state.supervisor_email,
            supervisor_id: this.state.supervisor_id,
            title: this.state.title,
        };



        axios
            .put(
                APIData.api + "passwordaccess/update?id=" + this.state.id,
                RejectReason,
                { headers: APIData.headers }
            )
            .then((response) => {
                toast("Updation Successful!");
                this.setState({ loading: false })
                window.location.reload();
            });

        this.props.changeListing(true);
    };

    render() {

        return (
            <div>

                <form className="createMarks" onSubmit={this.handleSubmit}>
                    <div className="carrybox">


                        <a
                            onClick={() => {
                                this.props.changeListing(true);
                            }}
                        >
                            <AiIcons.AiOutlineCloseCircle />
                        </a>

                        <div>
                            <h2 className="mainheading01">Reject Reason</h2>
                        </div>
                        <label className="heading02">Requested By</label>

                        <input
                            required
                            readOnly
                            className="inputfield"
                            type="text"
                            value={this.state.requested_by}

                        />

                        <label className="heading02">Title</label>
                        <input
                            required
                            className="inputfield"
                            type="text"
                            readOnly
                            value={this.state.title}
                            placeholder="Enter Title"
                        />
                        <label className="heading02">Reason</label>
                        <input
                            required
                            className="inputfield"
                            type="text"
                            value={this.state.reject_reason}
                            placeholder="Enter Reason"
                            onChange={(e) => this.setState({ reject_reason: e.target.value })}
                        />
                    </div>
                    <button className="Submitbutton" type="submit">
                        Submit
                    </button>
                </form>
            </div>
        );
    }
}

class OrgPasswordAccess extends Component {
    changeShowListing = (value) => {
        this.setState({ showListing: value });
    };

    constructor(props) {
        super(props);
        this.state = {
            taskdata: null,
            currentPage: 1,
            totalItems: 0,
            itemsPerPage: 5,
            loading: true,
            a: [],
            id: null,
            showListing: true,
        };
        this.handlePageChange = this.handlePageChange.bind(this);
    }

    handlePageChange(pageNumber) {
        this.setState({ currentPage: pageNumber });
    }

    componentDidMount() {
        const url = APIData.api + `passwordaccess/supervisor?supervisor_id= ${sessiondetails.user} &org=${org}`;
        axios.get(url, { headers: APIData.headers }).then((response) => {
            // const filteredData = response.data.filter((item) => sessiondetails.user === item.supervisor_id)
            this.setState({ taskdata: response.data, totalItems: response.data.length, loading: false });
        });
    }

    filterAssignedStatus = (e) => {
        let a = [];
        this.setState({ loading: true })

        if (e.target.value !== "all") {
            for (let i = 0; i < this.state.taskdata.length; i++) {
                if (this.state.taskdata[i].status === e.target.value) {
                    a.push(this.state.taskdata[i]);
                }
            }
            this.setState({ taskdata: a, loading: false });
        }
        else {
            const url = APIData.api +  `passwordaccess/supervisor?supervisor_id= ${sessiondetails.user} &org=${org}`;
            axios.get(url, { headers: APIData.headers }).then((response) => {

                this.setState({ taskdata: response.data, totalItems: response.data.length, loading: false });
            });
        }
    };

    sortStatus = () => {
        if (this.state.ascending) {
            this.setState({
                taskdata: this.state.taskdata.sort((a, b) => {
                    if (a.status < b.status) {
                        return -1;
                    }
                    if (a.status > b.status) {
                        return 1;
                    }
                    return 0;
                }),
            });
            // console.log(this.state.taskdata);
        } else {
            this.setState({
                taskdata: this.state.taskdata.sort((a, b) => {
                    if (a.status > b.status) {
                        return -1;
                    }
                    if (a.status < b.status) {
                        return 1;
                    }
                    return 0;
                }),
            });
        }
        this.setState({ ascending: !this.state.ascending });
    };


    acceptData = async (id) => {
        let today = new Date().toISOString().slice(0, 10);
        var data;
        this.setState({ loading: true })

        data = this.state.taskdata.filter((item) => item.id === id)
        // console.log(data)

        data[0].status = "approved";
        data[0].authorised_at = today;
        data[0].authorised_by = sessiondetails.user;
        data[0].reject_reason = "";


        axios.put(APIData.api + "passwordaccess/update?id=" + id, data[0], {
            headers: APIData.headers,
        }).then(response => {
            toast("Accepted Successfully!");
            this.setState({ loading: false })
        })

    };

    Removefunction = (id) => {
        this.setState({ loading: true })
        console.log(id)
        // if (window.confirm("Do you want to remove?")) {
            const url =
                APIData.api + "passwordaccess/delete?id=" + id;
            axios.delete(url, { headers: APIData.headers }).then((response) => {
                toast("Request Deleted Successfully!");
                window.location.reload();
            });
        // }
        this.setState({ loading: false })
    };

    render() {

        const posts = this.state.taskdata;
        const currentPage = this.state.currentPage;
        const totalItems = this.state.totalItems;
        const itemsPerPage = this.state.itemsPerPage;

        const indexOfLastPost = currentPage * itemsPerPage;
        const indexOfFirstPost = indexOfLastPost - itemsPerPage;
        let currentPosts;
        {
            posts &&
                (currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost))
        }


        return (
            <div className="adminJobs">
                {this.state.loading ? (
                    <Loading />
                ) : this.state.showListing ? (
                    <p>
                        <div className="carrybox">
                            <div className="Filter">
                                <select
                                    name="selectList"
                                    id="selectList"
                                    onChange={this.filterAssignedStatus}
                                >
                                    <option value="all" selected hidden>
                                        Status
                                    </option>
                                    <option value="all">All</option>
                                    {
                                        (this.state.a = [
                                            ...new Set(
                                                this.state.taskdata.map((item) => item.status)
                                            ),
                                        ])
                                    }
                                    {this.state.a.map((item, index) => {
                                        return <option value={item}>{item}</option>;
                                    })}
                                </select>
                            </div>

                            <div class="crud-table__caption">ORGANISATIONAL ACCESS REQUESTS</div>

                            <table className="crud-table">
                                <thead className="crud-table__header">
                                    <tr className="crud-table__row crud-table__row--fields">
                                        <th className="crud-table__header-cell">Title</th>
                                        <th className="crud-table__header-cell">Reason</th>
                                        <th className="crud-table__header-cell">Requested By</th>
                                        <th className="crud-table__header-cell">Requested At</th>
                                        <th className="crud-table__header-cell">Authorised At</th>
                                        <th
                                            className="crud-table__header-cell"
                                            onClick={this.sortStatus}
                                        >
                                            Status
                                        </th>
                                        <th className="crud-table__header-cell">Action</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {currentPosts &&
                                        currentPosts

                                            .map((item) => (
                                                <tr key={item.id}>
                                                    <td className="crud-table__cell">{item.title}</td>

                                                    <td className="crud-table__cell">{item.reason}</td>
                                                    <td className="crud-table__cell">
                                                        {item.requested_by}
                                                    </td>
                                                    <td className="crud-table__cell">
                                                        {item.requested_at}
                                                    </td>
                                                    <td className="crud-table__cell">
                                                        {item.authorised_at}
                                                    </td>
                                                    <td className="crud-table__cell">{item.status}</td>
                                                    <td className="crud-table__cell">
                                                        {
                                                            (item.status === "") &&
                                                            <div>
                                                                <button
                                                                    type="button"
                                                                    className="crud-button crud-button--primary"
                                                                    onClick={(e) => {
                                                                        this.acceptData(item.id);
                                                                    }}
                                                                >
                                                                    <TiIcons.TiTick />
                                                                </button>
                                                                <button
                                                                    type="button"
                                                                    className="crud-button crud-button--negative"
                                                                    onClick={(e) => {
                                                                        this.setState({ showListing: false });
                                                                        this.setState({ id: item.id });
                                                                    }}
                                                                >
                                                                    <ImIcons.ImCross />
                                                                </button>
                                                            </div>
                                                        }
                                                        <a
                                                            onClick={() => {
                                                                this.Removefunction(item.id);
                                                            }}
                                                            className="btn btn-danger"
                                                        >
                                                            <button class="crud-button crud-button--negative">
                                                                <AiIcons.AiFillDelete />
                                                            </button>
                                                        </a>


                                                    </td>

                                                </tr>
                                            ))}
                                </tbody>
                            </table>
                            <Pagination
                                current={currentPage}
                                total={totalItems}
                                itemsPerPage={itemsPerPage}
                                onChange={this.handlePageChange}
                            />
                        </div>
                    </p>
                ) : (
                    <OrgReject
                        changeListing={this.changeShowListing}
                        value={this.state.id}
                    />
                )}
            </div>
        );
    }
}

const Pagination = ({ current, total, itemsPerPage, onChange }) => {
    const totalPages = Math.ceil(total / itemsPerPage);

    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    return (
        <ul className='pagination'>
            {pageNumbers.map(number => (
                <span key={number} className={`page-item${number === current ? ' active' : ''}`}>
                    <button onClick={() => onChange(number)} className={`crud-table-pagination__link--${number === current ? 'active' : 'inactive'} crud-table-pagination__link margin-pagination`}>
                        {number}
                    </button>
                </span>
            ))}
        </ul>
    );
};


export default OrgPasswordAccess;
