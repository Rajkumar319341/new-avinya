import React, { Component } from 'react';
// import './Cards.css';
import CardItem from './CardItem';
import Mulesoft from '../Images/img-9.jpg';
import Spring from '../Images/img-2.jpg';
import CSD from '../Images/img-10.jpg';
import WebApp from '../Images/img-3.jpg';
import Cloud from '../Images/img-4.jpg';
import DevOps from '../Images/img-8.jpg';
import SoftwareProcto from '../Images/img-12.jpg';
import Quality from '../Images/img-13.jpg';
import SBS from '../Images/img-14.jpg';
import AppDev from '../Images/img-18.jpg';

class Cards extends Component {

  constructor(props) {
    super(props);
    this.state = {
        isMobile: false
    };
}

  componentDidMount() {
    window.addEventListener('resize', () => {
      this.setState({
        isMobile: window.innerWidth < 1024
      });
    }, false);
  }

  render() {

    return (
      <div className='homepage-cards'>
        {/* <h1>Our Services</h1> */}
        <div className='cards__container'>
          <div className='cards__wrapper'>
            <ul className='cards__items'>
              <CardItem
                src={Mulesoft}
                text='APIdreamz helps you build a strategy, and achieve a result-driven solution for the full range of MuleSoft development services'
                label='MULESOFT'
                path='/Mulesoft'
              />
              <CardItem
                src={Spring}
                text='Microservice architecture is a &apos;normal new feature&apos;. Creating small, standalone applications that are user-friendly can bring great flexibility and added stability to your code.'
                label='SPRING MICROSERVICES'
                path='/spring-microservices'
              />
              <CardItem
                src={CSD}
                text='Developing software or applications that meet certain business needs is essential to survive in today&apos;s competitive world'
                label='CUSTOM SOFTWARE DEVELOPMENT'
                path='/custom-software-development'
              />
            </ul>
            <ul className='cards__items'>
              <CardItem
                src={WebApp}
                text='Partner with Care4Edu to create a versatile website, built on a foundation of quality code.'
                label='WEB APPLICATION DEVELOPMENT'
                path='/web-application-development'
              />
              <CardItem
                src={Cloud}
                text='We at Care4Edu help solve all of that by helping you select the right cloud solutions that integrate smoothly, based on your needs.'
                label='CLOUD COMPUTING'
                path='/cloud-computing'
              />
              <CardItem
                src={DevOps}
                text='Our DevOps solutions help organizations to reach their goals, rapidly and reliably, producing high-quality products and services.'
                label='DEVOPS AUTOMATION'
                path='/devops-automation'
              />
            </ul>
            <ul className='cards__items'>
              <CardItem
                src={SoftwareProcto}
                text='Care4Edu creates a functional and refined product, by first analyzing your project idea from both the technical and business side and then we decide on how to go about your project.'
                label='SOFTWARE PROTOTYPING'
                path='/software-prototyping'
              />
              <CardItem
                src={Quality}
                text='Quality Assurance  is any systematic process of determining whether a product or service meets certain requirements.
                    We have a responsibility to ensure that products and services meet the standards set by the client. This includes maintaining strict quality control in line with customer loyalty, performance and expectations.'
                label='QUALITY ASSURANCE'
                path='/quality-assurance'
              />
              <CardItem
                src={SBS}
                text='Our goal is to help business owners save time and money by arranging for these essential service through one main contact.'
                label='STREAMLINE BUSINESS SOLUTIONS'
                path='/streamline-business-solutions'
              />
            </ul>
            <ul className={this.state.isMobile ? 'cards_item' : 'last-card'}>
              {/* <div className='last-card'> */}
              <CardItem
                src={AppDev}
                text='The Application Development team devotes atmost time and care in delivering the required product to its customers. '
                label='APPLICATION DEVELOPMENT'
                path='/app-development'
              />
              {/* </div> */}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default Cards;
