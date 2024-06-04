import React, { useRef } from "react";
import Webcam from "react-webcam";
import axios from "axios";
import { APIData } from "./../Authentication/APIData";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import * as AiIcons from "react-icons/ai";

const videoConstraints = {
  width: 540,
  facingMode: "user",
};

const sessiondetails = JSON.parse(localStorage.getItem("sessiondetails"));
const initialState = {};

const StudentCamera = () => {
  const [post, setPost] = React.useState(null);

  const email = sessiondetails.email;

  let baseURL = "";
  let postURL = "";

  // get api urls
  sessiondetails.userType == "superadmin"
    ? (baseURL = APIData.api + "admins/detail?emailId=" + email)
    : sessiondetails.userType == "admin"
    ? (baseURL = APIData.api + "admins/detail?emailId=" + email)
    : sessiondetails.userType == "employee"
    ? (baseURL = APIData.api + "employee/detail?emailId=" + email)
    : (baseURL = APIData.api + "students/data?emailId=" + email);

  // post api urls
  sessiondetails.userType == "superadmin"
    ? (postURL = APIData.api + "admins/")
    : sessiondetails.userType == "admin"
    ? (postURL = APIData.api + "admins/")
    : sessiondetails.userType == "employee"
    ? (postURL = APIData.api + "employee/")
    : (postURL = APIData.api + "students/");

  React.useEffect(() => {
    axios.get(baseURL, { headers: APIData.headers }).then((response) => {
      setPost(response.data);
    });
  }, []);

  // if (!post) return null;
  //
//   console.log(post);

  const webcamRef = useRef(null);

  const [url, setUrl] = React.useState(null);

  const capturePhoto = React.useCallback(async () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setUrl(imageSrc);
    // console.log(imageSrc);
  }, [webcamRef]);

  const onUserMedia = (e) => {
    // console.log(e);
  };

  let validation = () => {};
  let submitHandler = (e) => {
    e.preventDefault();
    // const isValide = this.validation();
    // if (!isValide) {
    // this.setState(initialState);
    //   if (!this.state.admin_name || !this.state.admin_phone_number) {
    //     toast("Please, Enter Vaild Details!");
    //   }
    // } else
    {
      var sendstate = {
        student_id: sessiondetails.user,
        name: post.name,
        email: post.email,
        phone_number: post.phone_number,
        fathers_name: post.fathers_name,
        mother_name: post.mother_name,
        address: post.address,
        gender: post.gender,
        alt_number: post.alt_number,
        institution: post.institution,
        educational_qualification: post.educational_qualification,
        professional_exp: post.professional_exp,
        dob: post.dob,
        photo: url,
      };
      axios
        .post(postURL, sendstate, {
          headers: APIData.headers,
        })
        .then((response) => {
          if (response.data.status.toString().toLowerCase() == "success") {
            toast(response.data.description);
            toast("Successfully Updated");
            setTimeout(() => {
              sessiondetails.userType == "superadmin"
                ? window.location.replace(APIData.website + "superadminprofile")
                : sessiondetails.userType == "admin"
                ? window.location.replace(APIData.website + "adminprofile")
                : sessiondetails.userType == "employee"
                ? window.location.replace(APIData.website + "facultyProfile")
                : window.location.replace(APIData.website + "studentProfile");
            }, 2000);
          } else {
            toast(response.data.errorDesc);
            setTimeout(() => {
              window.location.reload();
            }, 2000);
          }
        })

        .catch((error) => {
          toast("Update failed");
        //   console.log(error);
        });
    }
  };

  return (
    <>
        <Link
          to={
            sessiondetails.userType == "superadmin"
              ? "superadminprofile"
              : sessiondetails.userType == "admin"
              ? "adminprofile"
              : sessiondetails.userType == "employee"
              ? "facultyProfile"
              : "studentProfile"
          }
        >
          <AiIcons.AiFillCloseCircle />
        </Link>
      <div className="bringitcenter">
        <Webcam
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          videoConstraints={videoConstraints}
          onUserMedia={onUserMedia}
          mirrored={true}

        />
        <button onClick={capturePhoto} className="Submitbutton">
          Capture
        </button>
        <button onClick={() => setUrl(null)} className="Submitbutton">
          Retake
        </button>
      </div>
      {url && (
        <div className="bringitcenter">
          <img src={url} alt="Screenshot" />
          <form onSubmit={submitHandler}>
            <button type="submit" className="Submitbutton">
              Update
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default StudentCamera;
