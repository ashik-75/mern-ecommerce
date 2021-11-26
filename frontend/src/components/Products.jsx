import { Typography } from "@mui/material";
import { Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import Product from "./Product";

const useStyle = makeStyles({
  root: {
    padding: 30,
    // paddingBottom: 50,
  },
  notFound: {
    fontSize: "25px",
    letterSpacing: 2,
    padding: "20px 20px",
    textAlign: "center",
  },
});

const Products = ({ products }) => {
  const classes = useStyle();

  return (
    <div className={classes.root}>
      {products?.length > 0 ? (
        <Grid container spacing={2}>
          {products.map((product) => (
            <Grid key={product._id} item xs={12} sm={6} md={4} lg={3}>
              <Product product={product} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <div className={classes.notFound}>
          No content has been found here, sorry :)
        </div>
      )}
    </div>
  );
};

export default Products;
