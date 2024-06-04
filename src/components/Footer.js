import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="footer-container">
      <section class="social-media">
        <div class="social-media-wrap">
          <div class="footer-logo">
            <Link to="/" className="social-logo">
              CARE 4 EDU SOLUTIONS PVT LTD
            </Link>
          </div>
          <small class="website-rights">
            Copyright © 2021 Care 4 Edu Solutions pvt ltd - All Rights Reserved.
          </small>
        </div>
      </section>
    </div>
  );
}

export default Footer;
