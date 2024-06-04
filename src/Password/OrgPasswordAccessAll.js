import React, { Component } from "react";
import "../CRUDTable.css";
import { APIData, org } from "../Authentication/APIData";
import Loading from "../Loading";
import { toast } from "react-toastify";
import * as AiIcons from "react-icons/ai";
import axios from "axios";

const sessiondetails = JSON.parse(localStorage.getItem("sessiondetails"));


class OrgPasswordAccess extends Component {

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
        const url = APIData.api + `passwordaccess/details?org=${org}`;
        axios.get(url, { headers: APIData.headers }).then((response) => {
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
            const url = APIData.api +`passwordaccess/details?org=${org}`;
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
                ) : (
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

                        <div class="crud-table__caption">ORG ACCESS REQUEST PAGE</div>

                        <table className="crud-table">
                            <thead className="crud-table__header">
                                <tr className="crud-table__row crud-table__row--fields">
                                    <th className="crud-table__header-cell">Title</th>
                                    <th className="crud-table__header-cell">Reason</th>
                                    <th className="crud-table__header-cell">Requested By</th>
                                    <th className="crud-table__header-cell">Authorised By</th>
                                    <th className="crud-table__header-cell">Authorised At</th>
                                    <th className="crud-table__header-cell">Requested At</th>
                                    <th className="crud-table__header-cell">Supervisor ID</th>
                                    <th className="crud-table__header-cell">
                                        Supervisor Email
                                    </th>
                                    <th
                                        className="crud-table__header-cell"
                                        onClick={this.sortStatus}
                                    >
                                        Status
                                    </th>
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
                                                    {item.authorised_by}
                                                </td>
                                                <td className="crud-table__cell">
                                                    {item.authorised_at}
                                                </td>
                                                <td className="crud-table__cell">
                                                    {item.requested_at}
                                                </td>
                                                <td className="crud-table__cell">
                                                    {item.supervisor_id}
                                                </td>
                                                <td className="crud-table__cell">
                                                    {item.supervisor_email}
                                                </td>
                                                <td className="crud-table__cell">{item.status}</td>
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
                )
                }

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
