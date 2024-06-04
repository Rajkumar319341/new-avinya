import {
  Button,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { MdArrowCircleLeft, MdPhotoCamera, MdStore } from "react-icons/md";
import { toast } from "react-toastify";
import { APIData, org, } from "../Authentication/APIData";
import { Link } from "react-router-dom/cjs/react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    // textAlign: "center",
    // color: theme.palette.text.primary,
    color: "#007a99",
  },
}));

export default function AddAsset() {
  
  const sessiondetails = JSON.parse(localStorage.getItem("sessiondetails"));
  // console.log(sessiondetails);
  const classes = useStyles();
  const [file, setFile] = useState();
  const [assetGroupName, setAssetGroupName] = useState("");
  const [assetType, setAssetType] = useState("");
  const [generatedId, setGeneratedId] = useState();

  const [assetName, setAssetName] = useState("");
  const [cost, setCost] = useState();
  const [assetGroupId, setAssetGroupId] = useState([]);
  const [assetGroupIdSelected, setAssetGroupIdSelected] = useState();
  const [productId, setProductId] = useState("");
  const [purchasedDate, setPurchasedDate] = useState("");
  const [assetListType, setAssetListType] = useState("");
  const [assetStatus, setAssetStatus] = useState("");
  const [assetOwnerName, setAssetOwnerName] = useState(sessiondetails.userName);
  const [assetOwnerEmail, setAssetOwnerEmail] = useState(sessiondetails.email);



  const clearData = () => {
    toast("Successfully Added");
    setAssetGroupName("");
    setAssetType("");

    setFile("");
    setAssetGroupId();
    setAssetName("");
    setCost("");
    setAssetGroupIdSelected("");
    setProductId("");
    setPurchasedDate("");
    setAssetListType("");
    setAssetStatus("");
    // setAssetOwnerName("");
    // setAssetOwnerEmail("");
    fetchAssetGroupNames();
  };
  const fetchAssetGroupNames = () => {
    const url = APIData.api + `assetgroup/names?org=${org}`;
    const data = axios
      .get(url, { headers: APIData.headers })
      .then((resp) => {
        setAssetGroupId(resp.data);
        // console.log(resp.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

 
  const postAssetGroup = (event) => {
    const fileInput = event.currentTarget.querySelector('input[type="file"]');
    const imageFile = fileInput.files[0];
    event.preventDefault();
    const url = APIData.api + "assetgroup/";
    const AssetGroupData = {
      asset_group_imageUrl: "",
      asset_group_name: assetGroupName,
      type: assetType,
      org: org
    };
    console.log(AssetGroupData);
    const data = axios
      .post(url, AssetGroupData, { headers: APIData.headers })
      .then((resp) => {
        console.log(resp);
        const id = resp.data.asset_group_id;
        if (resp.status == 200) {
         
          if (fileInput.files[0].size > 300000) {

            toast.error("File too large");
            return;
          }
          else {
            const imageForm = new FormData();
            imageForm.append('id', id);
            imageForm.append('file', imageFile);
            console.log(id);
            const url = (APIData.api + `assetgroup/${id}/image`)
            console.log(url);
            axios.post(url, imageForm, { headers: APIData.headers })
              .then((resp) => {
                console.log(resp);
              })
              .catch((error) => {
                console.log(error);
              })
          }
        }
      })
      .catch((err) => {
        toast("Failed to Create");
      });
  };

  const postAssetList = () => {
    const url = APIData.api + "asset-list/";
    const AssetListData = {
      allocation: "Not Allocated",
      asset_group_id: assetGroupIdSelected,
      asset_id: "",
      asset_name: assetName,
      asset_owner_email: assetOwnerEmail,
      asset_owner_name: assetOwnerName,
      asset_status: assetStatus,
      cost: parseInt(cost),
      product_id: productId,
      purchased_date: purchasedDate,
      renewed_date: "",
      type: assetListType,
      org: org
    };
    console.log(AssetListData);
    const data = axios
      .post(url, AssetListData, { headers: APIData.headers })
      .then((resp) => {
        clearData();
      })
      .catch((err) => {
        toast("Failed to Create");
      });
  };
  const handleAssetSubmit = (e) => {
    e.preventDefault();
    postAssetList();
    console.log("Submited");
  };
  function handleSubmit(e) {
    e.preventDefault();
    postAssetGroup(e);
  }
  useEffect(() => {
    fetchAssetGroupNames();
  }, []);
  return (
    <div className={classes.root} style={{ margin: "1.5rem" }}>
      <Link
        to="/assets"
        style={{ fontSize: "2rem", float: "left", marginLeft: "4rem" }}
      >
        <MdArrowCircleLeft /> <MdStore />
      </Link>
      <Grid container spacing={1}>
        <Grid item xs={12} md={6}>
          <Paper className={classes.paper}>
            <h2 style={{ textAlign: "center" }}>Add an Asset Group</h2>
            <form onSubmit={handleSubmit} style={{ padding: "1rem 2rem" }}>
              <TextField
                required
                id="standard-required"
                label="Asset Group Name"
                fullWidth
                value={assetGroupName}
                onChange={(e) => {
                  setAssetGroupName(e.target.value);
                }}
              />
              <InputLabel id="select-label" style={{ marginTop: "1.5rem" }}>
                Select Asset Type
              </InputLabel>
              <Select
                labelId="select-label"
                id="demo-simple-select"
                value={assetType}
                onChange={(e) => {
                  setAssetType(e.target.value);
                }}
                fullWidth
                required
              >
                <MenuItem value={"Hardware"}>Hardware</MenuItem>
                <MenuItem value={"Software"}>Software</MenuItem>
                <MenuItem value={"Stationary"}>Stationary</MenuItem>
              </Select>
              <br />
              <input
                accept="image/*"
                // className={classes.input}
                id="contained-button-file"
                type="file"
                // onChange={handleChange}
                required
              />
              <label htmlFor="contained-button-file">
                <Button
                  variant="contained"
                  size="small"
                  style={{ backgroundColor: "#004bac", color: "white" }}
                  component="span"
                >
                  Upload an image{" "}
                  <MdPhotoCamera style={{ marginLeft: "1.2rem" }} />
                </Button>
              </label>
              <div style={{ display: "flex", justifyContent: "center" }}>
                {file && file ? (
                  <img
                    src={file}
                    alt="Asset Image"
                    height={150}
                    width={250}
                    style={{ objectFit: "contain" }}
                  />
                ) : (
                  ""
                )}
              </div>
              <br />
              <div style={{ display: "flex", justifyContent: "center" }}>
                <button
                  type="submit"
                  style={{ marginTop: "1.2rem", width: "15.5rem" }}
                >
                  Add Asset-Group
                </button>
              </div>
            </form>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper className={classes.paper}>
            <h2 style={{ textAlign: "center" }}>Add an Asset</h2>
            <form onSubmit={handleAssetSubmit} style={{ padding: "1rem 2rem" }}>
              <TextField
                required
                id="standard-required"
                label="Asset Name"
                fullWidth
                value={assetName}
                onChange={(e) => {
                  setAssetName(e.target.value);
                }}
              />
              <TextField
                required
                id="standard-required"
                label="Asset Cost"
                type="number"
                fullWidth
                value={cost}
                onChange={(e) => {
                  setCost(e.target.value);
                }}
              />
              <TextField
                required
                id="standard-required"
                label="Product Id"
                fullWidth
                value={productId}
                onChange={(e) => {
                  setProductId(e.target.value);
                }}
              />
              <TextField
                id="date"
                label="Purchased Date"
                type="datetime-local"
                className={classes.textField}
                value={purchasedDate}
                style={{ marginTop: "1.2rem" }}
                required
                onChange={(e) => {
                  setPurchasedDate(e.target.value);
                }}
                InputLabelProps={{
                  shrink: true,
                }}
                fullWidth
              />
              <TextField
                required
                id="standard-required"
                label="Asset Owner"
                value={assetOwnerName}
                disabled
                style={{
                  marginTop: "1.2rem",
                  marginLeft: "0.1rem",
                  width: "15.8rem",
                }}
                onChange={(e) => {
                  setAssetOwnerName(e.target.value);
                }}
              />
              <TextField
                required
                id="standard-required"
                label="Asset Owner Email"
                disabled
                value={assetOwnerEmail}
                style={{
                  marginTop: "1.2rem",
                  marginLeft: "0.1rem",
                  width: "15.8rem",
                }}
                onChange={(e) => {
                  setAssetOwnerEmail(e.target.value);
                }}
              />
              {/* <TextField
                required
                id="standard-required"
                label="Asset Status"
                style={{marginTop:"1.2rem",marginLeft:"0.1rem", width:"13.8rem"}}
                value={assetStatus}
                onChange={(e) => {
                  setAssetStatus(e.target.value);
                }}
              /> */}
              <InputLabel id="select-label" style={{ marginTop: "1.5rem" }}>
                Asset Status
              </InputLabel>
              <Select
                labelId="select-label"
                id="demo-simple-select"
                value={assetStatus}
                onChange={(e) => {
                  setAssetStatus(e.target.value);
                }}
                fullWidth
                required
              >
                <MenuItem value={"Working"}>Working</MenuItem>
                <MenuItem value={"Not Working"}>Not Working</MenuItem>
                <MenuItem value={"In Repair"}>In Repair</MenuItem>
              </Select>
              <br />
              <InputLabel id="select-label" style={{ marginTop: "1.5rem" }}>
                Select Asset Type
              </InputLabel>
              <Select
                labelId="select-label"
                id="demo-simple-select"
                value={assetListType}
                onChange={(e) => {
                  setAssetListType(e.target.value);
                }}
                fullWidth
                required
              >
                <MenuItem value={"Hardware"}>Hardware</MenuItem>
                <MenuItem value={"Software"}>Software</MenuItem>
                <MenuItem value={"Stationary"}>Stationary</MenuItem>
              </Select>
              <br />
              <InputLabel id="select-label2" style={{ marginTop: "1.5rem" }}>
                Select Asset Group
              </InputLabel>
              <Select
                labelId="select-label2"
                id="demo-simple-select"
                value={assetGroupIdSelected}
                onChange={(e) => {
                  setAssetGroupIdSelected(e.target.value);
                }}
                fullWidth
                required
              >
                {/* {assetGroupId &&
                  assetGroupId?.map(([id, name]) => (
                    <MenuItem value={id} key={id}>
                      {name}
                    </MenuItem>
                  ))} */}
                {Array.isArray(assetGroupId) && assetGroupId.map(([id, name]) => (
                  <MenuItem value={id} key={id}>
                    {name}
                  </MenuItem>
                ))}
              </Select>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <button
                  type="submit"
                  style={{ marginTop: "1.2rem", width: "15.5rem" }}
                >
                  Add Asset
                </button>
              </div>
            </form>
          </Paper>
        </Grid>
      </Grid>
      <Link to="/assets">
        <p
          style={{
            margin: "1rem 1rem",
            textAlign: "center",
            cursor: "pointer",
            fontSize: "1.5rem",
          }}
        >
          Go to Store
        </p>
      </Link>
    </div>
  );
}
