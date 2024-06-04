import React, { useEffect, useState } from "react";
import Board, { moveCard } from "@asseinfo/react-kanban";
import "@asseinfo/react-kanban/dist/styles.css";
import { toast } from "react-toastify";
// Use your own styles to override the default styles
import { APIData, exitKeyWord , org} from "../../Authentication/APIData";
import axios from "axios";
import Loading2 from "../../Dashboard/Loading2";
import "./styles.css";
import { Typography } from "@mui/material";
import { MdEmail } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { IoTime } from "react-icons/io5";

function ControlledBoard() {
  const arr = [];
  const user = APIData.sessiondetails;
  const [controlledBoard, setBoard] = useState({ columns: arr });
  const [lifeCycleStatus, setLifeCycleStatus] = useState([]);
  const [loading, setloading] = useState(true);

  const createNewStatus = async (card, status) => {
    const url = APIData.api + `employee/exit?org=${org}`;
    const oldData = {
      id: card.id,
      empEmail: card.empEmail,
      empUserName: card.empUserName,
      description: card.description,
      status: card.status,
      approvedBy: user.email,
      type: exitKeyWord,
      createdTime: card.createdTime,
      updatedTime: "",
      org: org
    };
    const formBody = {
      id: 0,
      empEmail: card.empEmail,
      empUserName: card.empUserName,
      description: "",
      status: status,
      approvedBy: "",
      type: exitKeyWord,
      createdTime: "",
      updatedTime: "",
      org: org
    };
    console.log(oldData);
    console.log(formBody);
    try {
      setloading(true);
      await axios
        .put(url, oldData, { headers: APIData.headers })
        .then((resp) => {
          toast.success("Submitted successfully");
        })
        .catch((err) => {
          toast.error("Unable to submit kindly submit after sometime");
        });
      await axios
        .post(url, formBody, { headers: APIData.headers })
        .then((resp) => {
          // toast.success("Submitted successfully");
        })
        .catch((err) => {
          toast.error("Unable to submit kindly submit after sometime");
        });
      setloading(false);
      fetchExitLifeCycleStatuses();
    } catch (error) {
      setloading(false);
    } finally {
      setloading(false);
    }
  };

  const fetchExitLifeCycleStatusesPending = async (status) => {
    const url =
      APIData.api +
      `employee/exit/pending/status-type?status=${status}&type=${exitKeyWord}&org=${org}`;
    const data = await axios
      .get(url, { headers: APIData.headers })
      // console.log(data.data)
      .catch((err) => {
        toast.error("Unable to fetch");
      });
    return data.data;
   
  };

  const fetchExitLifeCycleStatuses = async () => {
    setloading(true);
    const url = APIData.api + `employee/life-cycle/type?type=${exitKeyWord}&org=${org}`;
    const data = await axios
      .get(url, { headers: APIData.headers })
      .catch((err) => {
        toast.error("Unable to fetch");
      });
    const response = (await data.data) || [];
    setLifeCycleStatus(response);
    // console.log(response);
    await Promise.all(
      response?.map(async (data) => {
        const statusData = await fetchExitLifeCycleStatusesPending(
          data.statusName
        );
        const val = {
          id: data.id,
          title: data.statusName,
          cards: statusData,
        };
        // console.log(val);
        arr.push(val);
      })
    );
    arr.sort((a, b) => parseInt(a.id) - parseInt(b.id));
    // console.log(arr);
    setBoard({ columns: arr });
    setloading(false);
    // return data;
  };

  const fetchRoles= async()=>{
    const url =
      APIData.api +
      `user-roles/?org=${org}`;
    const data = await axios
      .get(url, { headers: APIData.headers })
      .catch((err) => {
        toast.error("Unable to fetch");
      });
      sessionStorage.setItem("roles", JSON.stringify(data.data))
      // console.log(JSON.parse(sessionStorage.getItem("roles")));
  }

  useEffect(() => {
    fetchExitLifeCycleStatuses();
    fetchRoles();
  }, []);

  function handleCardMove(_card, source, destination) {
    if (source.fromColumnId < destination.toColumnId) {
      if (!(destination.toColumnId - source.fromColumnId === 1)) {
        toast.error("You cant move task more than one state at time");
        return;
      }
      // console.log(_card,source,destination);
      // console.log(lifeCycleStatus[destination.toColumnId - 1].statusName);
      // console.log(lifeCycleStatus[source.fromColumnId - 1].statusName);
      const roles = JSON.parse(sessionStorage.getItem("roles")) || [];
      const Authuser = roles&&roles?.filter((role)=>{
            return role.role === lifeCycleStatus[source.fromColumnId - 1].statusName
      })
      if (user.email.toString().toLowerCase() === Authuser[0].email_id.toString().toLowerCase()) {
        createNewStatus(
          _card,
          lifeCycleStatus[destination.toColumnId - 1].statusName
        );
        const updatedBoard = moveCard(controlledBoard, source, destination);
        setBoard(updatedBoard);
        console.log("inside authorized");
      }
      else if(user.userType === "superadmin"){
        createNewStatus(
          _card,
          lifeCycleStatus[destination.toColumnId - 1].statusName
        );
        const updatedBoard = moveCard(controlledBoard, source, destination);
        setBoard(updatedBoard);
        console.log("inside admin");
      }
      else{
        toast.error("You dont have access to this stage and cannot any perform actions at this stage")
      }
    } else {
      toast.error("You cant drag task to previous stage");
    }
  }
  return (
    <>
      {loading ? (
        <Loading2 />
      ) : (
        <div
          style={{
            border: "2px solid #0B7285",
            borderRadius: "5px",
            backgroundColor: "#fff9c4",
            padding:"0.8rem",
            boxShadow: "rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset, rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px"
          }}
        >
          <Board
            onCardDragEnd={handleCardMove}
            disableColumnDrag
            renderCard={(
              { id, empEmail, empUserName, createdTime,},
              { dragging }
            ) => (
              <div
              key={id}
                style={{
                  // width: "100%",
                  width:" 12.3rem",
                  backgroundColor: "#FAF7F7",
                  margin: "0.5rem 0rem",
                  padding: "0.8rem 0.5rem",
                  textAlign: "",
                  borderRadius: "7px",
                  borderBottom:"3px solid #ef5350",
                  boxShadow: "rgba(0, 0, 0, 0.15) 2.4px 2.4px 3.2px",
                  fontFamily:"monospace"
                }}
              
                onClick={() =>
                  console.log("Clicked -- call the function or navigate")
                }
                // dragging={dragging}
              >
                {/* <Typography variant="body2" p={1}>
                  <span style={{ color: "#0B7285" }}>Id : </span> {id}
                </Typography> */}
                <Typography style={{ fontSize: "0.8rem", color: "#006064", fontFamily:"sans-serif" }}>
                  <span style={{ color: "#827717", padding: "0 0.5rem" }}>
                    {" "}
                    <MdEmail />{" "}
                  </span>
                  {empEmail}
                </Typography>
                <Typography style={{ fontSize: "0.8rem", color: "#006064", fontFamily:"sans-serif" }}>
                  <span style={{ color: "#827717", padding: "0 0.5rem" }}>
                    {" "}
                    <FaUser />{" "}
                  </span>
                  {empUserName}
                </Typography>
                <Typography style={{ fontSize: "0.8rem", color: "#006064", fontFamily:"sans-serif" }}>
                  <span style={{ color: "#827717", padding: "0 0.5rem" }}>
                    <IoTime />{" "}
                  </span>
                  {new Date(createdTime).toString().substring(0, 21)}
                </Typography>
                {/* <div style={{height:"1.2rem", backgroundColor:"black"}}></div> */}
                {/* <Typography style={{fontSize:"0.8rem",color:"#006064"}}>
                  <span style={{ color: "#263238" }}>Time : </span>
                  {new Date(createdTime).toString().substring(16, 25)}
                </Typography> */}
              </div>
            )}
          >
            {controlledBoard}
          </Board>
        </div>
      )}
    </>
  );
}

function AdminConsoleForExit() {
  return (
    <div>
      <p
        style={{
          textAlign: "center",
          color: "#0B7285",
          fontFamily: "monospace",
          fontSize: "1.5rem",
          marginBottom: "1.2rem",
          textDecoration: "underline",
        }}
      >
        Exit process console
      </p>
      <div
    
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div style={{ maxWidth: "98%" }} key={1}>
          <ControlledBoard />
        </div>
      </div>
    </div>
  );
}

export default AdminConsoleForExit;
