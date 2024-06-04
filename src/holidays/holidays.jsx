
// import React, { useState, useEffect } from 'react';
// import { makeStyles } from '@material-ui/core/styles';
// import Table from '@material-ui/core/Table';
// import TableBody from '@material-ui/core/TableBody';
// import TableCell from '@material-ui/core/TableCell';
// import TableContainer from '@material-ui/core/TableContainer';
// import TableHead from '@material-ui/core/TableHead';
// import TableRow from '@material-ui/core/TableRow';
// import { APIData } from '../Authentication/APIData';
// import axios from 'axios';

// const useStyles = makeStyles({
//     table: {
//         maxWidth: 750,
//     },
// });
// export default function Holidays() {
//     const classes = useStyles();
//     const [data, setData] = useState([]);

//     useEffect(() => {
//         axios.get(APIData.api + 'holidays/', { headers: APIData.headers })
//             .then(res => setData(res.data))
//             .catch(err => console.log(err));
//     }, []);

//     return (
//         <div style={{ marginTop: "35px", textAlign: "center" }}>
//             <h4 style={{ fontFamily: "Roboto Slab", color: "red" }}>Details of Holidays</h4>
//             <TableContainer style={{ marginTop: "20px" }}>
//                 <Table className={classes.table} size="small" aria-label="a dense table" style={{ border: '2px solid #000000' }}>
//                     <TableHead>
//                         <TableRow>
//                             <TableCell align="left" style={{ fontFamily: "Roboto Slab", color: "red" }}>Name</TableCell>
//                             <TableCell align="left" style={{ fontFamily: "Roboto Slab", color: "red" }}>Date&nbsp;</TableCell>
//                             <TableCell align="left" style={{ fontFamily: "Roboto Slab", color: "red" }}>Description&nbsp;</TableCell>
//                         </TableRow>
//                     </TableHead>
//                     <TableBody>
//                         {data.map((rowData, index) => (
//                             <TableRow key={index}>
//                                 <TableCell align="left" style={{ fontFamily: "Roboto Slab" }}>{rowData.holiday_name}</TableCell>
//                                 <TableCell align="left" style={{ fontFamily: "Roboto Slab" }}>{rowData.holiday_date}</TableCell>
//                                 <TableCell align="left" style={{ fontFamily: "Roboto Slab" }}>{rowData.description}</TableCell>
//                             </TableRow>
//                         ))}
//                     </TableBody>
//                 </Table>
//             </TableContainer>
//         </div>
//     );
// }



import React, { Component } from 'react';
import Loading from '../Loading';
import {APIData, org} from '../Authentication/APIData';
import HolidayData from '../SQLTables/HolidayData';


class Holidays extends Component {
  state={
      loading: true,
      person: null
  };
 async componentDidMount(){
  const url = APIData.api+`holidays/?org=${org}`;
  const response = await fetch(url,{headers:APIData.headers});
      const daata = await response.json();
      this.setState({person: daata, loading: false});
  }       
  render() {
  return (
      
    <div className="superAdminFaculty">
      {this.state.loading || !this.state.person ? <Loading />: 
    <p>
    <div className="carrybox">
    <HolidayData data={this.state.person}/>
    </div>

    </p>} 
    </div>
  );
  }
 }
export default Holidays;