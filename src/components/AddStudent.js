import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';


// properties addCoure is required, function called when Add clicked.
class AddStudent extends Component {
      constructor(props) {
      super(props);
      this.state = {student_name: '', email: '' };  //these are the variables within the class, 2 string;
    };
    
    handleClickOpen = () => {
      this.setState( {open:true} );
    };

    handleClose = () => {
      this.setState( {open:false} );
    };

    handleChange = (event) => {     //this method changes the values of the variables in the class
      this.setState({[event.target.name]: event.target.value}); //need to use this.setState, cant just use =
    }

  // Save student and close modal form
    handleAdd = () => {                         //we need a fetch method that will actually call to the database and send/request data
      fetch('http://localhost:8080/student',    //the location of the data
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: this.state.student_name,       //x:y, w needs to match the names in the eclipse student class, y is the name of the variable in THIS class
          email: this.state.email     
        })
      })
      .then(response => response.json() )
      .then(responseData => { console.log(responseData)})
      .catch(err => console.error(err))
       this.handleClose();
    }

    render()  { 
      return (
          <div>
            <Button variant="outlined" color="primary" style={{margin: 10}} onClick={this.handleClickOpen}>
              Add Student
            </Button>
            <Dialog open={this.state.open} onClose={this.handleClose}>
                <DialogTitle>Add Student</DialogTitle>
                <DialogContent  style={{paddingTop: 20}} >
                  <TextField autoFocus fullWidth label="Student name" name="student_name" onChange={this.handleChange} value={this.state.student_name} /> 
                  <TextField autoFocus fullWidth label="Email" name="email" onChange={this.handleChange} value={this.state.email} /> 
                </DialogContent>
                <DialogActions>
                  <Button color="secondary" onClick={this.handleClose}>Cancel</Button>
                  <Button id="Add" color="primary" onClick={this.handleAdd}>Add</Button>
                </DialogActions>
              </Dialog>      
          </div>
      ); 
    }
}

export default AddStudent;