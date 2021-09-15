import {useState} from 'react'
import './App.css';
import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined';
import TextField from '@material-ui/core/TextField';
import 'react-phone-input-2/lib/style.css'
import {Select, MenuItem, FormControl, InputLabel, makeStyles, Input, Button} from "@material-ui/core";
import Modal from '@material-ui/core/Modal';
import mainBgImage from './image/mainBgImage.jpg'
const useStyles = makeStyles(theme=>({
  formControl: {
    minWidth: 100
  },
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  container: {
    backgroundImage: `url(${mainBgImage})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    width: '100vw',
    height: '100vh'
}
}));

function App() {
const [country, setCountry] = useState("");
const [fullName, setFullName] = useState("");
const [Email, setEmail] = useState("");
const [Phone, setPhone] = useState("");
const [phoneErr, setPhoneErr] = useState("");
const [emailErr, setEmailErr] = useState('');
const [additionalInfo, setAdditionalInfo] = useState('');
const [additionalInfoError, setAdditionalInfoError] = useState(false);
const [image, setImage] = useState(null);
const [imageErr, setImageErr] = useState(false);
const [modalStyle] = useState(getModalStyle);
const [uploadModal, setUploadModal] = useState(false);

function getModalStyle () {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const classes = useStyles();
const getCountry = (e) => {
  setCountry(e.target.value);
}

const checkEmail = () => {
  let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  let checkEmail = re.test(String(Email).toLowerCase());
  if(!checkEmail){
    setEmailErr('show Error');
  }else{
    setEmailErr('');
  }
}
const checkPhoneNum = () => {
  let phone = Phone.split('');
  if(phone.length < 10){
    setPhoneErr('show Error');
  }else{
    setPhoneErr('');
  }
}
const checkAdditionalInfo = () => {
  let re = /^[-@.,_\w\s]*$/;
  // const checkADInfo = re.test(string(additionalInfo).toLowerCase());
  const checkAdInfo = additionalInfo.match(re);
  if(!checkAdInfo){
    setAdditionalInfoError(true)
  }
  else{
    setAdditionalInfoError(false);
  }
}
const uploadImage = (e) => {
  if(e.target.files[0]){
    setImage(e.target.files[0])
  }
}
const checkUploadSize = () => {
  if(image!=null){
    if(image.size / 1024 /1024 < 15 || image.size /1024 /1024 > 50){
      setImageErr(true);
    }
    else{
      setImageErr(false);
    }
  }
}
const checkValidations = () => {
  checkEmail();
  checkPhoneNum();
  checkAdditionalInfo();
  checkUploadSize();
  if(emailErr=="" && phoneErr =="" && additionalInfoError == false &&  imageErr== false){
    setUploadModal(true);
  }
  if(fullName == "" || Email == "" || Phone == "" || additionalInfo == "" || image== null){
    setUploadModal(false);
    alert('ALL THE FIELDS ARE MANDATORY!')
  }
}

  return (
    <div className={classes.container}>
    <div className="wrapper">
      {/* <img src={mainBgImage} alt="bg" class="bg"/> */}
       <Modal
                open = {uploadModal}
                onClose = {()=>setUploadModal(false)}>
                <div style= {modalStyle} className={classes.paper}>
                    <center>
                    <form>
                        <h3>Do you want to Submit? </h3>
                        <Button type="submit" onClick={()=>alert('Data submitted!')}>Yes</Button>
                        <Button type="submit" onClick={()=>setUploadModal(false)}>No</Button>
                    </form>
                    </center>
                </div>
            </Modal>
      <form className="reg_box" onSubmit={checkValidations}>
        <div>
        <h3 className="face_icon">User Registration form </h3>
        </div>
        <div className="face_icon">
          <PersonOutlineOutlinedIcon  style={{ fontSize: 150 }}/>
        </div>
        <TextField placeholder="Full Name" name="name"  variant="outlined" value={fullName} onChange={(e)=>{setFullName(e.target.value)}}/>
       <TextField style={{marginTop:"10px"}}id="email"placeholder="Email" value={Email}  onChange={(e)=>{setEmail(e.target.value)}} variant="outlined"/>
        {emailErr!=""?<div style={{color:"red"}}>Email ID is not valid!</div>:null}
        <TextField style={{marginTop:"10px"}} placeholder="Phone Number" value={Phone} onChange={(e)=>{setPhone(e.target.value)}} type="number" variant="outlined"/>
        {phoneErr!=""?<div style={{color:"red"}}>Phone Number is not correct!</div>:null}
        <FormControl style={{marginTop:"10px"}}className={classes.formControl}>
          <InputLabel>
            Country
          </InputLabel>
          <Select  onChange={getCountry}>
            <MenuItem value={"India"}>India</MenuItem>
            <MenuItem value={"Pakistan"}>Pakistan</MenuItem>
            <MenuItem value={"United States"}>United States</MenuItem>
            <MenuItem value={"France"}>France</MenuItem>
            <MenuItem value={"Russia"}>Russia</MenuItem>
            <MenuItem value={"Australia"}>Australia</MenuItem>
          </Select>
        </FormControl>
        <TextField style={{marginTop:"10px"}} onChange={(e)=>{setAdditionalInfo(e.target.value)}}placeholder="Additional Info" variant="outlined" />
        {additionalInfoError?<div style={{color:"red"}}>Additional Info supports alphanumeric character and ,.@_ </div>:null}
        <Input type="file" style={{marginTop:"10px"}} onChange={uploadImage}/>
        {imageErr==true?<div style={{color:"red"}}>Upload file size should be in between 15MB to 50MB! </div>:null}
        {console.log(setImageErr)}
        <Button
        // disabled={
        //   emailErr!="" || phoneErr !="" || additionalInfoError == true 
        // }
         onClick={checkValidations}
         style={{marginTop:"10px"}} 
         variant="contained" 
         color="primary">
          Submit
        </Button>
      </form>
      {console.log(country, fullName, Email, Phone)}
    </div>
    </div>
  );
}

export default App;
