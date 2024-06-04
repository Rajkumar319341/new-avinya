    import React from 'react';
import { Route } from 'react-router-dom';
import policyHeader from './Images/policyHeader.png';

function PaymentPolicy() {
    return (
        <div className='privacy-div'>
            <div className='privacy-img'>
                <img src={policyHeader} />
            </div>
            <h2 className='privacy-title'>Payment and Refund Policies – ShikshakPro</h2>

            <br />
            <p>
                <b>1. Payment Options:</b> We offer the following payment options for our ShikshakPro Website/Mobile Application.
                <span>

                    <li>Credit/Debit Cards: We accept major credit and debit cards for subscription purchases, consultant certification fees,
                        and partner certification fees as provided by our partner payment gateway merchant..</li>

                    <li>Online Payment Services: You can use secure online payment services like Net banking, UPI etc.., available on our
                        platform.</li>

                </span>
            </p>
            <br />
            <p> <b>2. Consumer/Learner Subscription Policy: </b></p>
            <br />
            <p>
                Consumers/Learners can choose from various subscription plans to access our application's features. Payment for
                subscriptions is required upfront and provides full access for the duration of the chosen subscription period.</p>

            <br />
            <p> <b>3. Consultant Certification Fee:</b></p>
            <br />
            <p> Consultants seeking certification (from verified to certified status) to offer their services on our platform are
                required to pay a certification fee. This fee covers the evaluation process and resources provided during the certification
                process. However, the certification will be valid for one year; if the Provider/Consultant wish to continue on our
                Platform then he/she needs to renew their certification by paying Renewal fee as per the plans available on our
                platform during the time of renewal.</p>

            <br />
            <p> <b>4. Partner Certification Fee:</b></p>
            <br />
            <p>Partners interested in becoming certified partners of our platform are required to pay a certification fee. This fee covers
                the assessment of their partnership application and the resources provided during the certification process. . However,
                the certification will be valid for one year; if the Provider/Consultant wish to continue on our Platform then the partner
                needs to renew their certification by paying Renewal fee as per the plans available on our platform during the time of
                renewal. </p>
            <br />
            <p> <b>5. Pricing and Fee Details:</b></p>
            <br />
            <p>All pricing and fee details for subscriptions, consultant certification, and partner certification are clearly listed on our
                platform. These prices are subject to change and will be updated on the platform accordingly. </p>
            <br />
            <p> <b>Refund Policy</b></p>
            <br />
            <p> <b>1. Consumer/Learner Subscription Refunds:</b></p>
            <br />
            <p>Once a Consumer/Learner purchases a subscription plan, there will be no refunds granted under any circumstances.
                Please carefully evaluate the features and benefits of the subscription plan before making a purchase. In case you
                encounter technical issues or have questions about the subscription, please contact our customer support team for
                assistance.</p>
            <br />
            <p> <b>2. Failed Payment Refund (Subscription):</b></p>
            <br />
            <p> In the event of a failed payment during the subscription purchase process, the subscription fee will be automatically
                credited to the learner's account within 5-8 working days (subjected to respective user’s bank policy).</p>
            <br />
            <p> <b>3. Provider/Consultant Certification Refunds:</b></p>
            <br />
            <p> Fees paid for consultant certification are non-refundable. Once payment is made for obtaining the "Certified" status, it
                cannot be refunded. Please ensure that you meet all the requirements and qualifications before proceeding with the
                certification process.</p>
            <br />
            <p> <b>4. Failed Payment Refund (Provider/Consultant Certification):</b></p>
            <br />
            <p> If a payment for consultant certification fails, the certification fee will be credited to the learner's account within 5-8
                working days (subjected to respective user’s bank policy).</p>
            <br />
            <p> <b>5. Partner Certification Refunds:</b></p>
            <br />
            <p> Similar to consultant certification, fees paid for partner certification are non-refundable. Once payment is made for
                obtaining the "Certified Partner" status, it cannot be refunded. It's recommended that you thoroughly review the
                certification criteria before making the payment.</p>
            <br />
            <p> <b>6. Failed Payment Refund (Partner Certification):</b></p>
            <br />
            <p> In the event of a failed payment for partner certification, the certification fee will be credited to the learner's account
                within 5-8 working days (subjected to respective user’s bank policy). However, the certification will be valid for one year; if the Provider/Consultant wish to continue
                on our Platform then the partner needs to renew their certification by paying Renewal fee as per the plans available on
                our platform during the time of renewal.</p>
            <br />
            <p> <b>7. Payment Security:</b></p>
            <br />
            <p> We take payment security seriously. Our payment gateway merchant platform employs industry-standard encryption and security measures to
                ensure the safety of your payment information.</p>
            <br />
            <p> <b>8. Contact Us:</b></p>
            <br />
            <p>If you have any questions or concerns regarding our Refund Policy or any other matter, please don't hesitate to contact
                our dedicated customer support team at <b>contact@care4edu.com</b>. We are here to assist you and provide further
                clarification if needed. </p>
            <br />
            <p> <b>9. Policy Updates:</b></p>
            <br />
            <p> We reserve the right to update or modify our Refund Policy at any time. Any changes will be effective upon posting the
revised policy on our platform. It is advisable to review our policies periodically for any updates.</p>

            <br />
        </div>
    );
}

export default PaymentPolicy;
