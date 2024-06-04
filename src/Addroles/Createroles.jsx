// import { MenuItem, Select, TextField } from '@mui/material'
// import React, { useState } from 'react'
// import { APIData, org } from '../Authentication/APIData'
// import axios from 'axios'
// import { toast } from 'react-toastify'

// const Createroles = () => {
//     const [roles, setRoles] = useState()
//     const [profile, setProfile] = useState()
//     const [accesslevel, setAccesslevel] = useState([])

//     function handlesubmit(e) {
//         const formdata = {
//             id: 0,
//             roles: roles,
//             profile: profile,
//             access_level: accesslevel,
//             org: org
//         }
//         console.log(formdata);
//         axios.post(APIData.api + "org-roles/", formdata, { headers: APIData.headers })
//             .then((resp) => {
//                 // console.log(resp);
//                 toast.success("Added Successfully")
//                 window.location.reload()
//             })
//             .catch((err) => {
//                 // console.log(err);
//                 toast.error("Please contact adminstrator")
//             })

//     }

//     return (
//         <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>

//             <form style={{ display: "flex", flexDirection: "column", textAlign: "center", width: "40%" }} onSubmit={handlesubmit}>
//                 <h4 style={{ marginBottom: 20 }}>Add Roles for access </h4>
//                 <TextField
//                     label="Role"
//                     required
//                     sx={{ mb: 2 }}
//                     value={roles}
//                     onChange={(e) => setRoles(e.target.value)}
//                     helperText="Enter user roles"
//                 />
//                 <TextField
//                     label="Profile"
//                     required
//                     sx={{ mb: 2 }}
//                     values={profile}
//                     onChange={(e) => setProfile(e.target.value)}
//                     helperText="Enter user profile"
//                 />
//                 <Select
//                     label="Access level"
//                     multiple
//                     sx={{ mb: 2 }}
//                     value={accesslevel}
//                     onChange={(e) => setAccesslevel(e.target.value)}
//                     renderValue={(selected) => selected.join(', ')}
//                     required
//                 >
//                     <MenuItem value="Admin">Admin</MenuItem>
//                     <MenuItem value="User">User</MenuItem>
//                     <MenuItem value="Viewer">Viewer</MenuItem>
//                 </Select>
//                 <button>Add Role</button>
//             </form>
//         </div>
//     )
// }

// export default Createroles

import React, { useState } from 'react';
import { TextField } from '@mui/material';
import { APIData, org } from '../Authentication/APIData';
import axios from 'axios';
import { toast } from 'react-toastify';

const Createroles = () => {
    const [roles, setRoles] = useState('');
    const [profile, setProfile] = useState('');
    const [accessLevels, setAccessLevels] = useState('');

    function handleSubmit(e) {
        e.preventDefault();
        const formData = {
            id: 0,
            roles: roles,
            profile: profile,
            access_level: accessLevels.split(',').map(level => level.trim()),
            org: org
        };
        console.log(formData);
        axios.post(APIData.api + "org-roles/", formData, { headers: APIData.headers })
            .then((resp) => {
                toast.success("Added Successfully");
                {setTimeout(() => {
                    window.location.reload();
                }, 1000);}
               
            })
            .catch((err) => {
                toast.error("Please contact administrator");
            });
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
            <form style={{ display: "flex", flexDirection: "column", textAlign: "center", width: "40%" }} onSubmit={handleSubmit}>
                <h4 style={{ marginBottom: 20 }}>Add Roles for access </h4>
                <TextField
                    label="Role"
                    required
                    sx={{ mb: 2 }}
                    value={roles}
                    onChange={(e) => setRoles(e.target.value)}
                    helperText="Enter user roles"
                />
                <TextField
                    label="Profile"
                    required
                    sx={{ mb: 2 }}
                    value={profile}
                    onChange={(e) => setProfile(e.target.value)}
                    helperText="Enter user profile"
                />
                <TextField
                    label="Access levels (comma-separated)"
                    required
                    sx={{ mb: 2 }}
                    value={accessLevels}
                    onChange={(e) => setAccessLevels(e.target.value)}
                    helperText="Enter access levels separated by commas"
                />
                <button type="submit">Add Role</button>
            </form>
        </div>
    );
};

export default Createroles;

