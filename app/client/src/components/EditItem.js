import React, { useState, useEffect } from 'react';

import Grid from '@material-ui/core/Grid';
import Navbar from './Navbar';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useHistory, useLocation } from "react-router-dom";
import CircularProgress from '@material-ui/core/CircularProgress';
import { Typography } from '@material-ui/core';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";

import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: '30px',
    // backgroundColor: theme.palette.background.paper,
  },
}));

function CreateItem(){
  const classes = useStyles();
  const history = useHistory();
  let { id } = useParams();

  let [ elem, setElem ] = useState(null);

  useEffect(()=>{
    axios.get('/api/'+id)
      .then((res) => {
        setElem(res.data)
      });
  }, [id]);

  const formik = useFormik({
    initialValues: {
      text: (elem)? elem.text: '',
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      text: Yup.string().required('Required')
    }),
    onSubmit: (values) => {
      setTimeout(()=>{
        history.replace('/dashboard');
      }, 1000);
    },
  });

  return (
    <React.Fragment>
      <Navbar />
      <form noValidate autoComplete="off" onSubmit={formik.handleSubmit}>
        <Grid container className={classes.root} spacing={2} direction="column" jusify="center" alignItems="center">
          <Grid item>
            <Typography variant="h4">
              Id: {id} {(!elem)? ', Not found': ''}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField 
              id="text" 
              label="Text" 
              value={formik.values.text}
              onChange={formik.handleChange}
              error={formik.touched.text && Boolean(formik.errors.text)}
              helperText={formik.touched.text && formik.errors.text}
              disabled={formik.isSubmitting || !elem}
            />
          </Grid>

          { formik.isSubmitting &&
            <Grid item xs={12}>
              <CircularProgress />
            </Grid>
          }

          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  disabled={formik.isSubmitting || !elem}
                >
                  Save
                </Button>
              </Grid>
              <Grid item>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="default"
                  className={classes.submit}
                  disabled={formik.isSubmitting}
                  onClick={()=>{history.push('/dashboard')}}
                >
                  Cancel
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </React.Fragment>
  );
}

export default CreateItem;