
import axios from "axios";

var basicAuth = "Basic " + btoa("admin".concat(":", "Smarter@1234"));
var today = new Date();
export const APIData = {
  api: "https://qa-api.care4edu.com/c4e/",
  // api: "http://localhost:8083/c4e/",

  headers: { Authorization: basicAuth },
  url: "https://avinya.care4edu.com/",
  // url:"http://localhost:3000/#/",
  admin: "sladmin",
  website: "https://avinya.care4edu.com/",
  //  website: "http://localhost:3000/#/",
  date:
  today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate(),
  orgName:"Avinya Academy",
  sessiondetails: JSON.parse(localStorage.getItem("sessiondetails")),
};

export const AuthorizationRoles = ["superadmin", "admin"];
export const empRole = "employee"
export const exitKeyWord = "exit"
export const org="avinya";