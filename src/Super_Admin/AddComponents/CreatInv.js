import React, { Component } from 'react';
import MainLogo from "../../Images/logo.jpg";
import { toast } from "react-toastify";
import axios from "axios";
import { APIData } from "../../Authentication/APIData";
import * as AiIcons from "react-icons/ai";
import { Link } from "react-router-dom";
import Loading from "../../Loading";

const sessiondetails = JSON.parse(localStorage.getItem("sessiondetails"));

class InvoiceGenerator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [
        { description: 'Item 1', quantity: 2, price: 10 },
        { description: 'Item 2', quantity: 1, price: 20 },
        // Add more items as needed
      ],
      balance: '',
      course: '',
      date: '',
      due_date: '',
      email_id: '',
      paid: '',
      student_id: '',
    };
  }

  printPage() {
    var printContents = document.getElementById("invoicePrint").innerHTML;
    console.log(printContents);
    var originalContents = document.body.innerHTML;
    console.log(originalContents);
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
  }

  calculateTotal() {
    return this.state.items.reduce((total, item) => total + item.quantity * item.price, 0);
  }

  taxAmount() {
    return (this.calculateTotal() * 0.18).toFixed(2);
  }

  grandTotal() {
    return parseFloat(this.calculateTotal()) + parseFloat(this.taxAmount());
  }

  submitHandler = (e) => {
    e.preventDefault();

    // Validate your form data if needed
    // ...

    const sendState = {
      balance: this.state.balance,
      course: this.state.course,
      date: this.state.date,
      due_date: this.state.due_date,
      email_id: this.state.email_id,
      idinvoices: " ",
      paid: this.state.paid.toString(),
      student_id: this.state.student_id,
    };

    axios
      .post(APIData.api + "invoices/", sendState, {
        headers: APIData.headers,
      })
      .then((response) => {
        if (response.data.status.toString().toLowerCase() === "success") {
          this.printPage();
          toast(response.data.description);
          var url;
          if (sessiondetails.userType === "superadmin")
            url = new URL(APIData.url + "superAdminInvoice");
          else if (sessiondetails.userType === "admin")
            url = new URL(APIData.url + "invoice");
          setTimeout(() => {
            window.location.assign(url);
          }, 2000);
        } else {
          toast(response.data.errorDesc);
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        }
      })
      .catch((error) => {
        toast("Generation failed");
        console.log(error);
      });
  };

  render() {
    return (
      <form className="invoice" onSubmit={this.submitHandler}>
        <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '10px', background: '#fff' }}>


          <div style={{ display: 'flex', border: '1px solid #ccc', borderRadius: '10px', overflow: 'hidden' }}>
            {/* Left Side */}
            <div style={{ flex: 1, padding: '20px', borderRight: '1px solid #ccc' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                <div>
                  {/* Company Logo */}
                  <img src={MainLogo} alt="Company Logo" style={{ maxWidth: '100px' }} />
                  {/* Line between logo and billing to */}
                  {/* <hr style={{ border: '1px solid #ccc', margin: '10px 0' }} /> */}

                  <div
                  // style={{ marginTop: '10px' }}
                  >
                    {/* Billing To */}
                    <strong>Billing From:</strong>
                    <h4 style={{ marginTop: "10px" }}>CARE4EDU</h4>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side */}
            <div style={{ flex: 1, padding: '20px' }}>
              <div style={{ marginBottom: '20px' }}>
                {/* Line between Invoice ID, Invoice Date, and Billing From */}
                {/* <hr style={{ border: '1px solid #ccc', marginBottom: '20px' }} /> */}
                <div>
                  {/* Invoice ID */}
                  <div>
                    <strong>Invoice ID:</strong> #123
                  </div>
                  {/* Invoice Date */}
                  <div>
                    <strong>Invoice Date:</strong> {new Date().toLocaleDateString()}
                  </div>
                  <div>
                    <strong>Due Date:</strong> {new Date().toLocaleDateString()}
                  </div>
                </div>
                {/* Line between Invoice Date and Billing From */}
                {/* <hr style={{ border: '1px solid #ccc', marginBottom: '20px', marginTop: '20px' }} /> */}
                <div>
                  {/* Billing From */}
                  <div>
                    <strong>Billing To:</strong>
                    {/* Add Billing From Details */}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div style={{ margin: '20px', padding: '20px' }}>
            <h2>Invoice</h2>
            <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px', borderRadius: '8px', overflow: 'hidden' }}>
              <thead style={{ background: '#f5f5f5', borderRadius: '8px 8px 0 0' }}>
                <tr>
                  <th style={{ border: '1px solid #ccc', padding: '8px', textAlign: 'left' }}>Sl. No</th>
                  <th style={{ border: '1px solid #ccc', padding: '8px', textAlign: 'left' }}>Description</th>
                  <th style={{ border: '1px solid #ccc', padding: '8px', textAlign: 'left' }}>Qty</th>
                  <th style={{ border: '1px solid #ccc', padding: '8px', textAlign: 'left' }}>Price</th>
                  <th style={{ border: '1px solid #ccc', padding: '8px', textAlign: 'left' }}>Total</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, index) => (
                  <tr key={index} style={{ borderBottom: '1px solid #ccc' }}>
                    <td style={{ border: '1px solid #ccc', padding: '8px' }}>{index + 1}</td>
                    <td style={{ border: '1px solid #ccc', padding: '8px' }}>{item.description}</td>
                    <td style={{ border: '1px solid #ccc', padding: '8px' }}>{item.quantity}</td>
                    <td style={{ border: '1px solid #ccc', padding: '8px' }}>₹{item.price}</td>
                    <td style={{ border: '1px solid #ccc', padding: '8px' }}>₹{item.quantity * item.price}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot style={{ borderRadius: '0 0 8px 8px' }}>
                <tr>
                  <td colSpan="4" style={{ textAlign: 'right', paddingRight: '8px' }}>
                    <strong>Total:</strong>
                  </td>
                  <td style={{ border: '1px solid #ccc', padding: '8px' }}>
                    ₹{this.calculateTotal}
                  </td>
                </tr>
                <tr>
                  <td colSpan="4" style={{ textAlign: 'right', paddingRight: '8px' }}>
                    <strong>Tax:</strong>
                  </td>
                  <td style={{ border: '1px solid #ccc', padding: '8px' }}>
                    ₹{this.taxAmount}
                  </td>
                </tr>
                <tr>
                  <td colSpan="4" style={{ textAlign: 'right', paddingRight: '8px' }}>
                    <strong>Grand Total:</strong>
                  </td>
                  <td style={{ border: '1px solid #ccc', padding: '8px' }}>
                    ₹{this.grandTotal}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
            <div>
              {/* Left-aligned signature */}
              ___________________________
            </div>
            <div>
              {/* Right-aligned computer-generated note */}
              Computer Generated Invoice
            </div>
          </div>
        </div>
        <div>
          <button id="print" type="submit">
            {" "}
            PRINT INVOICE
          </button>
        </div>
      </form>
    );
  }
}

export default InvoiceGenerator;
