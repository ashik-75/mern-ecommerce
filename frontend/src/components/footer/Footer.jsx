import { Grid, Typography } from "@mui/material";
import "./footer.scss";
import { Home, Phone, Email } from "@mui/icons-material";

const Footer = () => {
  return (
    <div className="footer">
      <Grid container sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6}>
          <div className="contact-container">
            <div className="title">Contact</div>
            <ul>
              <li>
                <span>
                  <Home />
                </span>
                <span>2/45 Tower Street, New York</span>
              </li>
              <li>
                <span>
                  <Phone />
                </span>
                <span>011330834</span>
              </li>
              <li>
                <span>
                  <Email />
                </span>
                <span>
                  <a href="mailto:john@example.com">contact@organic.com</a>
                </span>
              </li>
            </ul>
          </div>
        </Grid>
        <Grid item xs={12} sm={6}>
          <div className="information-container">
            <div className="title">Information</div>
            <ul>
              <li>
                <a href="#products">New Products</a>
              </li>
              <li>
                <a href="#seller">Top Seller</a>
              </li>
              <li>
                <a href="#Shop">About Shop</a>
              </li>
            </ul>
          </div>
        </Grid>
      </Grid>
      <Grid container className="lowerbranch">
        <Grid item xs={12} sm={4}>
          <div className="copyright">&copy;copyrighttoEcom</div>
        </Grid>
        <Grid item xs={12} sm={4}>
          <div className="privacy">
            <a href="#privacyPolicy">Privacy Policy</a>
          </div>
        </Grid>
        <Grid item xs={12} sm={4}>
          <div className="privacy">
            <a href="#terms&condition">Terms & Condition</a>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default Footer;
