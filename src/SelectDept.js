import React, { useState } from 'react';
import { Paper, TextField, MenuItem, Button, FormControl, InputLabel, Select, Typography } from '@mui/material';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify'; 
export const SelectDept = () => {
    const [selectedDept, setSelectedDept] = useState('');
    const sessionDetails = JSON.parse(localStorage.getItem("sessiondetails"));
    // console.log(sessionDetails.dept[0] )
    const history = useHistory(); 

    const handleSubmit = () => {
        if (selectedDept === "TECHNICAL" ) {
            localStorage.setItem("Depart Details","TECHNICAL")
            // history.push('/admin'); 
            window.location.reload();

        } 
        else if(selectedDept === "SALES"){
            localStorage.setItem("Depart Details","SALES")

            window.location.reload();

        }
        else if(selectedDept === "HR" ){
            localStorage.setItem("Depart Details","HR")

            window.location.reload();

        }
        else if(selectedDept === "FINANCE"){
            localStorage.setItem("Depart Details","FINANCE")

            window.location.reload();

        }
        else if((sessionDetails && sessionDetails.dept.length === 1)&& sessionDetails.dept[0]==="TECHNICAL" ){
            localStorage.setItem("Depart Details","TECHNICAL")
            window.location.reload();
        }
        else if((sessionDetails && sessionDetails.dept.length === 1)&& sessionDetails.dept[0]==="SALES" ){
            localStorage.setItem("Depart Details","SALES")        
            window.location.reload();
        }
        else if((sessionDetails && sessionDetails.dept.length === 1)&& sessionDetails.dept[0]==="HR" ){
            localStorage.setItem("Depart Details","HR")            
            window.location.reload();
        }
        else if((sessionDetails && sessionDetails.dept.length === 1)&& sessionDetails.dept[0]==="FINANCE" ){
            localStorage.setItem("Depart Details","FINANCE")          
            window.location.reload();
        }
        else {
            console.log("error")
            toast.error("Please contact adminstrator")
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 'fit-content',marginTop:'5rem' }}>
           
            <Paper elevation={3} sx={{ p: 2, maxWidth: 500, width: '100%', textAlign: 'center' }}>
                {/* <div>
                    You want to login as
                </div> */}
                 <Typography variant='h6' style={{fontFamily:"Roboto slab"}}> You want to Sign In as:</Typography>
                {sessionDetails && sessionDetails.dept.length === 1 ? (
                    <TextField
                        label="Department"
                        value={sessionDetails.dept[0]}
                        variant="outlined"
                        fullWidth
                        disabled
                        sx={{ mt: 2 }}
                    />
                ) : (
                    <FormControl fullWidth variant="outlined" sx={{ mt: 2 }}>
                        <InputLabel id="select-dept-label">Select Department</InputLabel>
                        <Select
                            labelId="select-dept-label"
                            value={selectedDept}
                            onChange={(e) => setSelectedDept(e.target.value)}
                            label="Select Department"
                        >
                            {sessionDetails && Array.isArray(sessionDetails.dept) && sessionDetails.dept.map((dept, index) => (
                                <MenuItem key={index} value={dept}>
                                    {dept}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                )}
                <br></br>
                <br></br>

                <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={handleSubmit}>
                    Sign In
                </Button>
            </Paper>
        </div>
    );
}


export default SelectDept;
