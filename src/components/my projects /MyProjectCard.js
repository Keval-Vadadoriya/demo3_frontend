import React from "react";

import {
  Card,
  CardContent,
  Typography,
  Button,
  CardActionArea,
  CardActions,
  Container,
} from "@mui/material";

function MyProjectCard({ project, onClick }) {
  return (
    <Container>
      <Card
        sx={{
          margin: "5px",
          border: "1px dashed black",
          transition: "all 0.5s ease",
          "&:hover": { transform: "scale(1.05)", borderRadius: "40px" },
        }}
      >
        <CardActionArea>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {project.project_name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Requirement :- {project.profession}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Location :- {project.location}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              description :- {project.description}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              money :- {project.money}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button onClick={onClick.bind(null, project._id)}>Remove</Button>
        </CardActions>
      </Card>
    </Container>
  );
}

export default MyProjectCard;
