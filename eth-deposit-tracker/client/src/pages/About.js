import React from 'react';
import { Typography, Link, Paper, Grid, Button } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import "./About.css"; // Ensure this path is correct

const About = () => {
  return (
    <div className="about-container">
      <Paper style={{ padding: '20px', margin: '20px 0' }}>
        <Typography variant="h4" gutterBottom>About Me</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h6">Name: Rishabh Vyas</Typography>
            <Typography variant="h6">College: VIT Vellore</Typography>
            <Typography variant="h6">Registration Number: 21BCE0871</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h5" gutterBottom>Projects</Typography>
            <Typography>
              - <Link href="https://hostel-helper-client.vercel.app/" className="project-link" target="_blank" rel="noopener noreferrer">Hostel Helper</Link><br />
              - <Link href="https://quizze-client.vercel.app/" className="project-link" target="_blank" rel="noopener noreferrer">Quizze</Link><br />
              - <Link href="#" className="project-link">Book Recommender System</Link>
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h5" gutterBottom>Connect with me</Typography>
            <Button
              variant="contained"
              color="primary"
              startIcon={<GitHubIcon />}
              href="https://github.com/VyasRishabh/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ marginRight: '10px' }}
            >
              GitHub
            </Button>
            <Button
              variant="contained"
              color="primary"
              startIcon={<LinkedInIcon />}
              href="https://www.linkedin.com/in/rishabh-vyas-7344ba223"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="secondary"
              href="https://drive.google.com/file/d/1t0L6XT3GD4yRzc-L5GxlGJEbQstCt-po/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="resume-button"
            >
              View my Resume
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h5" gutterBottom>Login Credentials</Typography>
            <Typography variant="h6">Hostel Helper</Typography>
            <Typography>Student:</Typography>
            <Typography>Email: sjdav1223@gmail.com</Typography>
            <Typography>Password: 123456789</Typography>
            <Typography>Worker:</Typography>
            <Typography>Email: suraj@gmail.com</Typography>
            <Typography>Password: 123456789</Typography>
            <Typography>Warden:</Typography>
            <Typography>Email: rishabh38889@gmail.com</Typography>
            <Typography>Password: 123456789</Typography>
            <Typography variant="h6">Quizze</Typography>
            <Typography>Admin:</Typography>
            <Typography>Email: rishabh38889@gmail.com</Typography>
            <Typography>Password: 123456789</Typography>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default About;
