import React from 'react'
import { Link } from 'react-router-dom';
import HomepageCard from '../HomepageCard';
import {APIData} from '../Authentication/APIData'
const sessiondetails=JSON.parse(localStorage.getItem("sessiondetails"));

function HomeUser() {
              return (
  <div className="home">
        <div>
          <main className="wrapper">
            <section className="hero">
              <h1>{APIData.orgName}</h1>
                <article>
                  <p>Welcome {sessiondetails.user}</p>
                  <Link to="/contact">Contact Us</Link>
                </article>
              </section>
              <HomepageCard />

        </main>
      </div>
</div>
              )
            }
export default HomeUser