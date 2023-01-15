import { Card, Grid, Typography, CardContent, TextField, Button } from '@mui/material'
import React from 'react'
import { HelmetProvider, Helmet } from 'react-helmet-async'
import { useEffect, useState } from 'react'
import { IconButton, Stack } from '@mui/material'
import PhotoCamera from '@mui/icons-material/PhotoCamera'
import avatar from '../images/avatar.png'
import avatarID from '../images/avatarID.png'
import { Autocomplete } from '@mui/material'

//array of options for employee type
// const employeeOptions = [fetch('http://localhost:4000/work')];

export default function EmployeeForm() {
  
  //to fill combobox type of works with data from database
  const [work, setWork] = useState([]);

  const loadWork = async () => {
    const response = await fetch('http://localhost:4000/work');
    const data = await response.json();
    setWork(data);
  }

  useEffect(() => {
    loadWork();
  }, [work])

  //state for img
  const [img, setImg] = useState(null);
  const [imgID, setImgID] = useState(null);

  //state for employee  
  const [employee, setEmployee] = useState({
    photo_id: '',
    profile_picture: ''
  })

  //handle change for employee
  const handleChangeEmployee = (e) => {
    //console.log(e.target.name, e.target.value);
    setEmployee({ ...employee, [e.target.name]: e.target.value })
    setImg(e.target.files[0])
  }

  //handle change for imgID
  const handleChangeImgID = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value })
    setImgID(e.target.files[0])
  }

  const [works, setWorks] = useState({
    names: '',
    description: ''
  })

  //handle change for works
  const handleChangeWorks = (e) => {
    setWorks({ ...works, [e.target.name]: e.target.value })
  }

  const [employeeWork, setEmployeeWork] = useState({
    price_hour: '',
  })

  const handleChangeEmployeeWork = (e) => {
    setEmployeeWork({ ...employeeWork, [e.target.name]: e.target.value })
  }

  //handle submit for employee
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(employee, works, employeeWork);
  }

  return (
    <HelmetProvider>
      <Helmet>
        <style>{'body { background-color: #003748; }'}</style>
      </Helmet>
      <Grid
        container
        direction="column"
        alignItems="center"
        justifyContent="center"
      >
        <Grid item xs={3}>
          <Card
            sx={{ mt: 5, borderRadius: ".5rem" }}
            style={{
              backgroundColor: "#f7f6f6",
              padding: ".5rem"
            }}
          >
            <Typography
              variant='h5'
              sx={{ display: "block", textAlign: "center" }}
            >
              Registro empleado
            </Typography>
            <form onSubmit={handleSubmit}>
              <CardContent
                sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
              >
                <Autocomplete
                  disablePortal
                  options={Object.values(work.map((work) => work.names))}
                  onChange={(event, newValue) => { setWorks({ ...works, names: newValue }) }}
                  sx={{
                    display: "block",
                    margin: " 0rem 0",
                  }}
                  style={{ width: "80%" }}
                  renderInput={(params) => <TextField {...params} label="Tipo de trabajo" />}
                />
              </CardContent>
              <CardContent
                sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
              >
                <TextField
                  variant="outlined"
                  label="Precio por hora"
                  sx={{
                    display: "block",
                    margin: "-.8rem 0",
                  }}
                  style={{ width: "80%" }}
                  name="price_hour"
                  onChange={handleChangeEmployeeWork}
                />
                <CardContent
                  sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
                >
                  <TextField
                  variant="outlined"
                  label="Descripcion trabajo"
                  multiline
                  rows={4}
                  sx={{
                    display: "block",
                    margin: ".9rem 0",
                  }}
                  style={{ width: "93%" }}
                  name="description"
                  onChange={handleChangeWorks}

                />
                  <Stack
                    direction="row"
                    alignItems="center"
                    spacing={0}
                  >
                    <Typography
                      sx={{ fontWeight: 'medium', textAlign: 'center', fontSize: 15 }}
                      style={{ paddingLeft: "2rem" }}
                    >
                      Foto de perfil
                    </Typography>
                    <IconButton
                      color="inherit"
                      aria-label="upload picture" component="label"
                    >
                      <input
                        hidden accept="image/*"
                        type="file"
                        name='profile_picture'
                        onChange={handleChangeEmployee}
                      />
                      <PhotoCamera />
                    </IconButton>
                  </Stack>
                  <div
                    style={{ paddingLeft: ".8rem" }}
                  >
                    {img ?
                      <img
                        alt="Foto de perfil"
                        style={{ borderRadius: "100%", width: "9.5rem", height: "9rem" }}
                        src={URL.createObjectURL(img)}
                      /> :
                      <img
                        alt="Foto perfil predeterminada"
                        style={{ borderRadius: "100%", width: "9.5rem", height: "9rem" }}
                        src={avatar}
                      />
                    }
                  </div>
                  <Stack
                    direction="row"
                    alignItems="center"
                    spacing={0}
                  >
                    <Typography
                      sx={{ fontWeight: 'medium', textAlign: 'center', fontSize: 15 }}
                      style={{ paddingLeft: ".7rem" }} >
                      Foto identificacion
                    </Typography>
                    <IconButton
                      color="inherit"
                      aria-label="upload picture" component="label"
                    >
                      <input
                        hidden accept="image/*"
                        type="file"
                        name='photo_id'
                        onChange={handleChangeImgID}
                      />
                      <PhotoCamera />
                    </IconButton>
                  </Stack>
                  <div
                    style={{ paddingLeft: ".5rem" }}
                  >
                    {imgID ?
                      <img
                        alt="Foto documento de identidad"
                        style={{ width: "10rem", height: "7rem" }}
                        src={URL.createObjectURL(imgID)}
                      /> :
                      <img
                        alt="Foto documento predeterminada"
                        style={{ width: "10rem", height: "7rem" }}
                        src={avatarID}
                      />
                    }
                  </div>
                </CardContent>
                <Button
                  variant='contained'
                  color='primary'
                  type='submit'
                  sx={{
                    display: "block",
                    margin: ".5rem 0"
                  }}
                  style={{
                    backgroundColor: "#0a0a23",
                    color: "white",
                    width: "70%",
                    margin: "0 auto",
                    marginTop: "1rem"
                  }}
                >
                  Crear cuenta
                </Button>
              </CardContent>
            </form>
          </Card>
        </Grid>
      </Grid>
    </HelmetProvider>

  )
}
