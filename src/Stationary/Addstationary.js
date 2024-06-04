// import * as React from 'react';
// import Button from '@mui/material/Button';
// import CssBaseline from '@mui/material/CssBaseline';
// import TextField from '@mui/material/TextField';
// import Grid from '@mui/material/Grid';
// import Box from '@mui/material/Box';
// import Container from '@mui/material/Container';
// import Typography from '@mui/material/Typography';
// import { createTheme, ThemeProvider } from '@mui/material/styles';
// import axios from 'axios';
// import { APIData, org } from '../Authentication/APIData';

// const defaultTheme = createTheme();
// var imageconverted="";

// export default function  Addstationary() {
//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     const data = new FormData(event.currentTarget);

//     const fileInput = event.currentTarget.querySelector('input[type="file"]');
//     const imageFile = fileInput.files[0];

//     if (imageFile) {
//       const base64Image = await convertImageToBase64(imageFile);
//     //   console.log(base64Image);
//       imageconverted = base64Image;
//     //   console.log(imageconverted);

//       // Now you can include the base64 data in your API request or wherever needed
//     }
//     const formData={
//       count:data.get('count') ,
//        id: data.get(0),
//       name: data.get('Name'),
//       image: "",
//       org:org
//     };
//     try {
//       const response = await axios.post(APIData.api+'stationary', formData,{ headers: APIData.headers });
//      alert("Submitted")
//      window.location.reload();
//     } catch (error) {
//       alert('Error submitting form');
//     }
//   };
//   const convertImageToBase64 = (file) => {
//     return new Promise((resolve, reject) => {
//       const reader = new FileReader();

//       reader.onload = () => {
//         resolve(reader.result);
//       };

//       reader.onerror = (error) => {
//         reject(error);
//       };

//       reader.readAsDataURL(file);
//     });
//   };
//   return (
//     <ThemeProvider theme={defaultTheme}>
//       <Container component="main" maxWidth="xs">
//         <CssBaseline />
//         <Box
//           sx={{
//             marginTop: 5,
//             display: 'flex',
//             flexDirection: 'column',
//             alignItems: 'center',
//           }}
//         >
//               <Typography component="h1" variant="h5">
//             Add Stationary
//           </Typography>
//           <Box component="form"  noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
//             <Grid container spacing={2}>
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   autoComplete="name"
//                   name="Name"
//                   required
//                   fullWidth
//                   id="Name"
//                   label="Name"
//                   type="string"
//                   autoFocus
//                 />
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   autoComplete="count"
//                   name="count"
//                   required
//                   fullWidth
//                   id="count"
//                   label="count"
//                   type="string"
//                   autoFocus
//                 />
//               </Grid>
//               <div style={{ marginLeft: "16px", marginTop: "0px" }}>
//                 <label style={{ textAlign: "center", marginTop: "0.8rem", fontFamily: "monospace" }}>Upload Image </label>
//                 <input type="file" name='file'  required style={{ border: "2px solid ", padding: "1.5rem", borderStyle:"double", borderRadius: "10px" }} placeholder='upload' />
//               </div>
//             </Grid>
//             <Button
//               type="submit"
//               fullWidth
//               variant="contained"
//               sx={{ mt: 3, mb: 2 }}
//             >
//               submit
//             </Button>
//         </Box>
//       </Box>
//     </Container>
//   </ThemeProvider>
//   );
// }
import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { APIData, org } from '../Authentication/APIData';

const defaultTheme = createTheme();

export default function Addstationary() {
 
  const handleSubmit = async (event) => {
    const fileInput = event.currentTarget.querySelector('input[type="file"]');
    const imageFile = fileInput.files[0];
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const formData = {
      count: data.get('count'),
      id: data.get(0),
      name: data.get('Name'),
      image: "",
      org: org
    }
    console.log(formData);
   
    try {
      const response = await axios.post(APIData.api + 'stationary', formData, { headers: APIData.headers });
      console.log(response.data.id);
      const id  = response.data.id;


      if (imageFile) {
        const imageFormData = new FormData();
        imageFormData.append('id', id);
        imageFormData.append('file', imageFile);
        
        const url= (APIData.api + `stationary/${id}/image`) 
        console.log(url);
        const resp = await axios.post(url,imageFormData,{ headers: APIData.headers })
          .then((resp) => {
            console.log(resp);
          })
          .catch((error) => {
            console.log(error);
          })
      }

      alert("Submitted");
   
    } catch (error) {
      console.log(error);
      alert('Error submitting form');
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 5,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            Add Stationary
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="name"
                  name="Name"
                  required
                  fullWidth
                  id="Name"
                  label="Name"
                  type="string"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="count"
                  name="count"
                  required
                  fullWidth
                  id="count"
                  label="count"
                  type="string"
                  autoFocus
                />
              </Grid>
              <div style={{ marginLeft: "16px", marginTop: "0px" }}>
                <label style={{ textAlign: "center", marginTop: "0.8rem", fontFamily: "monospace" }}>Upload Image </label>
                <input type="file" name='file' required style={{ border: "2px solid ", padding: "1.5rem", borderStyle: "double", borderRadius: "10px" }} placeholder='upload' />
              </div>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              submit
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
