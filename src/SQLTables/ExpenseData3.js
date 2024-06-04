import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@material-ui/core";
import { AiOutlinePlusCircle, AiOutlineDownload } from "react-icons/ai";
import Loading from "../Loading";
import { APIData } from "../Authentication/APIData";
import { toast } from "react-toastify";

toast.configure();

var total = 0;
const sessiondetails = JSON.parse(localStorage.getItem("sessiondetails"));

let tasks = [];

function getTask(testTask) {
  testTask.forEach(function (item) {
    if (item.status.toLowerCase() === "completed") total += parseInt(item.cost);
  });
  if (sessiondetails.userType !== "superadmin") {
    testTask = testTask.filter((element) => element.created_by === sessiondetails.user);
  }

  tasks = testTask;
}

class ExpenseData extends Component {
  state = {
    loading: false,
  };

  constructor(props) {
    super(props);
    this.responseloading = this.responseloading.bind(this);
    window.responseload = this;
    getTask(this.props.data);
  }

  responseloading() {
    this.setState({ loading: !this.state.loading });
  }

  render() {
    return (
      <div>
        <div>{this.state.loading ? <Loading /> : <Expense userType={sessiondetails.userType} />}</div>
        <br />
        <br />
      </div>
    );
  }
}

const Expense = ({ userType }) => (
  <div style={styles.container}>
    {returntypebased(userType)}
  </div>
);

function returntypebased(userType) {
  if (userType === "superadmin") {
    return (
      <div>
        <div>
          <Link to="addExpenses">
            <div className="Upload">
              <AiOutlinePlusCircle />
            </div>
          </Link>
        </div>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Cost</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Item Count</TableCell>
                <TableCell>Month</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tasks.map((task) => (
                <TableRow key={task.id}>
                  <TableCell>{task.id}</TableCell>
                  <TableCell>{task.cost}</TableCell>
                  <TableCell>{task.exp_date}</TableCell>
                  <TableCell>{task.exp_name}</TableCell>
                  <TableCell>{task.exp_type}</TableCell>
                  <TableCell>{task.item_count}</TableCell>
                  <TableCell>{task.month}</TableCell>
                  <TableCell>{task.status}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => service.download(task)}
                    >
                      Download
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => service.delete(task)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <div style={{ float: "right" }}>
          <div>
            <b>&nbsp; Total:&nbsp;&#8377;{parseFloat(total)}</b>
          </div>
        </div>
      </div>
    );
  } else if (userType === "employee") {
    return (
      <div>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Cost</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Item Count</TableCell>
                <TableCell>Month</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tasks.map((task) => (
                <TableRow key={task.id}>
                  <TableCell>{task.id}</TableCell>
                  <TableCell>{task.cost}</TableCell>
                  <TableCell>{task.exp_date}</TableCell>
                  <TableCell>{task.exp_name}</TableCell>
                  <TableCell>{task.exp_type}</TableCell>
                  <TableCell>{task.item_count}</TableCell>
                  <TableCell>{task.month}</TableCell>
                  <TableCell>{task.status}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => service.download(task)}
                    >
                      Download
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <div style={{ float: "right" }}>
          <div>
            <b>&nbsp; Total:&nbsp;&#8377;{parseFloat(total)}</b>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Cost</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Item Count</TableCell>
                <TableCell>Month</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tasks.map((task) => (
                <TableRow key={task.id}>
                  <TableCell>{task.id}</TableCell>
                  <TableCell>{task.cost}</TableCell>
                  <TableCell>{task.exp_date}</TableCell>
                  <TableCell>{task.exp_name}</TableCell>
                  <TableCell>{task.exp_type}</TableCell>
                  <TableCell>{task.item_count}</TableCell>
                  <TableCell>{task.month}</TableCell>
                  <TableCell>{task.status}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => service.download(task)}
                    >
                      Download
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <div style={{ float: "right" }}>
          <div>
            <b>&nbsp; Total:&nbsp;&#8377;{parseFloat(total)}</b>
          </div>
        </div>
      </div>
    );
  }
}

const styles = {
  container: { margin: "auto", width: "fit-content" },
};

const service = {
  download: (data) => {
    window.responseload.responseloading();
    axios
      .get(APIData.api + "expenses/download/" + data.id, {
        headers: APIData.headers,
      })
      .then((response) => {
        window.responseload.responseloading();
        window.location.href = response.request.responseURL;
      })
      .catch((error) => {
        window.responseload.responseloading();
        toast("Failed to download. Please try again later.");
      });
  },
  delete: (data) => {
    const url = APIData.api + "expenses/" + data.id;
    window.responseload.responseloading();
    axios
      .delete(url, { headers: APIData.headers })
      .then((response) => {
        if (response.status === 200) {
          toast("Expense deleted successfully.");
          tasks = tasks.filter((t) => t.id !== data.id);
          window.responseload.responseloading();
        }
      })
      .catch((error) => {
        toast("Failed to delete expense. Please try again later.");
        window.responseload.responseloading();
      });
  },
};

export default ExpenseData;