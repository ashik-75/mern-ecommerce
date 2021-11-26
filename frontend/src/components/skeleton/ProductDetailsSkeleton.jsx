import { Grid, Skeleton } from "@mui/material";

const ProductDetailsSkeleton = () => {
  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Skeleton variant="rectangular" height="300px" width="100%" />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Skeleton
            style={{ marginBottom: 10 }}
            variant="text"
            height="30px"
            width="80%"
          />
          <Skeleton
            style={{ marginBottom: 10 }}
            variant="text"
            height="30px"
            width="60%"
          />
          <Skeleton
            style={{ marginBottom: 10 }}
            variant="text"
            height="30px"
            width="50%"
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default ProductDetailsSkeleton;
