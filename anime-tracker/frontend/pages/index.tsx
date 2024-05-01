import React from "react";
import {
    Container,
    Typography,
    Card,
    CardContent,
    CardHeader,
    Grid,
    Accordion,
    AccordionSummary,
    AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const Home = () => {
    return (
        <div style={{ paddingTop: "2rem" }}>
            <Container
                maxWidth="lg"
                sx={{
                    bgcolor: "rgba(68, 47, 87, 0.7)",
                    backdropFilter: "blur(4px)",
                    paddingY: "2rem",
                    paddingTop: "1rem",
                    borderRadius: ".75rem",
                }}
            >
                <Typography
                    variant="h3"
                    component="h1"
                    gutterBottom
                    sx={{ color: "text.primary", textAlign: "center" }}
                >
                    DMIT2015 Course Project
                </Typography>
                <Typography variant="h6" component="p" sx={{ color: "text.primary", mb: 4, textAlign: "center" }}>
                    Hello, this is a web application that allows users to manage their anime collections. Users can add,
                    view, update, and delete anime entries.
                </Typography>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                        <Card raised sx={{ bgcolor: "rgba(55, 46, 99, 0.6)" }}>
                            <CardHeader title="Frontend Technology" titleTypographyProps={{ align: "center" }} />
                            <CardContent>
                                <Accordion>
                                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                        <Typography>React & Next.js</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Typography>
                                            React is a JavaScript library for building user interfaces with reusable
                                            components. Next.js extends React by enabling server-side rendering and
                                            static site generation for faster, SEO-friendly web applications.
                                        </Typography>
                                    </AccordionDetails>
                                </Accordion>
                                <Accordion>
                                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                        <Typography>TypeScript</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Typography>
                                            TypeScript is a strongly typed programming language that builds on
                                            JavaScript.
                                        </Typography>
                                    </AccordionDetails>
                                </Accordion>
                                <Accordion>
                                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                        <Typography>Material-UI</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Typography>
                                            Material-UI offers React components for faster and easier web development,
                                            following Google's Material Design guidelines.
                                        </Typography>
                                    </AccordionDetails>
                                </Accordion>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Card raised sx={{ bgcolor: "rgba(55, 46, 99, 0.6)" }}>
                            <CardHeader title="Backend Technology" titleTypographyProps={{ align: "center" }} />
                            <CardContent>
                                <Accordion>
                                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                        <Typography>Express.js</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Typography>
                                            Express.js is a web application framework for Node.js, designed for building
                                            web applications and APIs.
                                        </Typography>
                                    </AccordionDetails>
                                </Accordion>
                                <Accordion>
                                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                        <Typography>Firebase Realtime Database</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Typography>
                                            A NoSQL database stores and syncs data between your users in realtime.
                                        </Typography>
                                    </AccordionDetails>
                                </Accordion>
                                <Accordion>
                                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                        <Typography>Firebase Authentication</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Typography>
                                            Provides easy-to-use SDKs and ready-made UI libraries to authenticate users.
                                        </Typography>
                                    </AccordionDetails>
                                </Accordion>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
};

export default Home;
