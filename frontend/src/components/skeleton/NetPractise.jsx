import { Grid, Skeleton } from "@mui/material";
import "./skeleton.scss";

const NetPractise = () => {
  return (
    <div className="sk">
      <Grid container spacing={3}>
        <Grid item xs={12} sm={3}>
          <Skeleton
            style={{ marginBottom: 10 }}
            height="200px"
            variant="rectangular"
          />
          <Skeleton style={{ marginBottom: 10 }} height="30px" />
          <Skeleton style={{ marginBottom: 10 }} height="30px" width="60%" />
          <Skeleton style={{ marginBottom: 10 }} height="30px" width="30%" />
        </Grid>
        <Grid item xs={12} sm={3}>
          <Skeleton
            style={{ marginBottom: 10 }}
            height="200px"
            variant="rectangular"
          />
          <Skeleton style={{ marginBottom: 10 }} height="30px" />
          <Skeleton style={{ marginBottom: 10 }} height="30px" width="60%" />
          <Skeleton style={{ marginBottom: 10 }} height="30px" width="30%" />
        </Grid>
        <Grid item xs={12} sm={3}>
          <Skeleton
            style={{ marginBottom: 10 }}
            height="200px"
            variant="rectangular"
          />
          <Skeleton style={{ marginBottom: 10 }} height="30px" />
          <Skeleton style={{ marginBottom: 10 }} height="30px" width="60%" />
          <Skeleton style={{ marginBottom: 10 }} height="30px" width="30%" />
        </Grid>
        <Grid item xs={12} sm={3}>
          <Skeleton
            style={{ marginBottom: 10 }}
            height="200px"
            variant="rectangular"
          />
          <Skeleton style={{ marginBottom: 10 }} height="30px" />
          <Skeleton style={{ marginBottom: 10 }} height="30px" width="60%" />
          <Skeleton style={{ marginBottom: 10 }} height="30px" width="30%" />
        </Grid>
      </Grid>
    </div>
  );
};

export default NetPractise;
