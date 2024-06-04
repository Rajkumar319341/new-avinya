import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Timeline from "@material-ui/lab/Timeline";
import TimelineItem from "@material-ui/lab/TimelineItem";
import TimelineSeparator from "@material-ui/lab/TimelineSeparator";
import TimelineConnector from "@material-ui/lab/TimelineConnector";
import TimelineContent from "@material-ui/lab/TimelineContent";
import TimelineOppositeContent from "@material-ui/lab/TimelineOppositeContent";
import TimelineDot from "@material-ui/lab/TimelineDot";
import AssignmentTurnedInIcon from "@material-ui/icons/AssignmentTurnedIn";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { APIData, exitKeyWord, org } from "../Authentication/APIData";
import axios from "axios";
import { toast } from "react-toastify";
import Loading from "../Loading";
import Loading2 from "../Dashboard/Loading2";
import ResignationForm from "./ResignationForm";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: "6px 16px",
  },
  secondaryTail: {
    backgroundColor: theme.palette.secondary.main,
  },
}));

function EmployeeExit() {
  const classes = useStyles();

  const [lifecycleStatus, setLifecycleStatus] = useState([]);
  const [loading, setLoading] = useState(true);
  const [empStatus, setEmpStatus] = useState([]);
  const user = APIData.sessiondetails;

  const fetchExitLifeCycleStatuses = async () => {
    const url = APIData.api + `employee/life-cycle/type?type=${exitKeyWord}&org=${org}`;
    const data = await axios
      .get(url, { headers: APIData.headers })
      .then((resp) => {
        setLifecycleStatus(resp.data);
        setLoading(false);
      })
      .catch((err) => {
        toast.error("Unable to fetch");
      });
    setLoading(false);
  };

  const fetchEmployeeExitLifeCycle = async () => {
    setLoading(true);
    const url =
      APIData.api +
      `employee/exit/emp-username?username=${user.userName}&type=${exitKeyWord}&org=${org}`;
     
    await axios
      .get(url, { headers: APIData.headers })
      .then((resp) => {
        setEmpStatus(resp.data);
        if (resp.data.length !== 0) {
          setLoading(true);
          fetchExitLifeCycleStatuses();
        }
        setLoading(false);
      })
      .catch((err) => {
        toast.error("Unable to fetch user status");
      });
    setLoading(false);
  };

  useEffect(() => {
    fetchEmployeeExitLifeCycle();
  }, []);

  return (
    <>
      {loading ? (
        <Loading2 />
      ) : (
        <>
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
            {user.userName} exit process
          </p>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Timeline align="alternate" style={{ maxWidth: "90%" }}>
              {lifecycleStatus.length !== 0 ? (
                <>
                  {lifecycleStatus?.map((lifeCycle, index) => {
                    var empStat;
                    if (index < empStatus.length) {
                      empStat = empStatus[index];
                    }
                    return (
                      <>
                        <TimelineItem key={index}>
                          <TimelineOppositeContent>
                            <Typography
                              variant="body"
                              style={{ color: "#1098AD" }}
                            >
                              {/* 9:30 am{!!empStat&&console.log(new Date(empStat?.createdTime))} */}
                              {!!empStat &&
                                new Date(empStat?.updatedTime)
                                  .toString()
                                  .substring(0, 25)}
                            </Typography>
                          </TimelineOppositeContent>
                          <TimelineSeparator>
                            <TimelineDot
                              style={{
                                color: !!empStat?.approvedBy
                                  ? "#0B7285"
                                  : "aliceblue",
                                backgroundColor: !!empStat?.approvedBy
                                  ? "#E9ECEF"
                                  : "",
                              }}
                            >
                              {empStat?.status === "Completed" ? (
                                <>
                                  <div
                                    style={{
                                      color: "#0B7285",
                                      // backgroundColor: "#E9ECEF",
                                    }}
                                  >
                                    <CheckCircleOutlineIcon />
                                  </div>
                                </>
                              ) : (
                                <AssignmentTurnedInIcon />
                              )}
                            </TimelineDot>
                            {lifeCycle.statusName === "Completed" ? (
                              <></>
                            ) : (
                              <TimelineConnector />
                            )}
                          </TimelineSeparator>
                          <TimelineContent>
                            <Paper elevation={3} className={classes.paper}>
                              <Typography
                                variant="h6"
                                component="h1"
                                style={{
                                  fontFamily: "monospace",
                                  color: "#1098AD",
                                }}
                              >
                                {lifeCycle.statusName}
                              </Typography>
                              {/* <Typography> {console.log(empStat)}</Typography> */}
                              <Typography style={{}}>
                                {empStat?.approvedBy && "Approved By : "}
                                {empStat?.approvedBy}
                              </Typography>
                              <Typography>
                                {" "}
                                {empStat?.description && "Details : "}
                                {empStat?.description}
                              </Typography>
                            </Paper>
                          </TimelineContent>
                        </TimelineItem>
                      </>
                    );
                  })}
                </>
              ) : (
                <>
                  <ResignationForm />
                </>
              )}
            </Timeline>
          </div>
        </>
      )}
    </>
  );
}

export default EmployeeExit;
