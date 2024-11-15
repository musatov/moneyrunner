import * as React from "react";

import { Paper, Box, Typography, Container, TextField,  } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";

import { Logo } from "components/logo";
import { GoogleButton } from "../components/google_button";

import { login } from "../services/auth";

const useStyles = makeStyles((theme) => ({
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  signButton: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(2),
  },
  logo: {
    marginBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(5),
    textAlign: "center",
  },
  user: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    padding: theme.spacing(2),
    border: "1px solid #f0f0f0",
  },
  userSubHeader: {
    color: "#666",
  },
}));

export const Login = () => {
  const classes = useStyles();
  const [loading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [user, setUser] = React.useState({ name: "", email: "" });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(user);
    login(user)
      .then((response: { data: any }) => {
        window.location.href = response.data.authUri;
      })
      .catch((e) => {
        setError(e?.response?.error || "An error occurred");
      });
  };

  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <Box
        sx={{
          mt: 20,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Paper variant="outlined" className={classes.paper}>
          <div className={classes.logo}>
            <Logo />
          </div>
          {error && (
            <Typography color="error" style={{ marginTop: "10px" }}>
              {error}
            </Typography>
          )}
          <div className={classes.user}>
            <h3>Full name and email of the test user</h3>
            <span className={classes.userSubHeader}>Must exactly match data in admin panel</span>
            <TextField 
              onChange={(e) => setUser({ ...user, name: e.target.value })}
              label="Full Name" size="small" margin="normal" fullWidth />
            <TextField
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              label="Email" size="small" margin="normal" fullWidth />
          </div>
          <Typography paragraph>Sign in with your Google account to continue.</Typography>
          <GoogleButton onClick={handleSubmit} disabled={loading} />
        </Paper>
      </Box>
    </Container>
  );
};
