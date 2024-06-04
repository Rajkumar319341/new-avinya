import num2words from "num2words";
import React, { useEffect, useState } from "react";
import { Grid, Paper, TextField, Typography } from "@mui/material";
import { APIData, org } from "../../Authentication/APIData";
import axios from "axios";
import { toast } from "react-toastify";
import { Button } from "@mui/material";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import {FormHelperText} from "@mui/material";

export const CreateInvoice = () => {
  const [ParentIdData, setParentIdData] = useState([]);
  const [emailError, setEmailError] = useState("");
  const [parentInvoiceIds, setParentInvoiceIds] = useState([]);
  const [showFields, setShowFields] = useState(false);
  const [showInvoiceFields, setShowInvoiceFields] = useState(false);
  const [invType, setInvType] = useState("");

  const [formData, setFormData] = useState({
    idinvoices: "",
    invoiceid: "",
    parentInvoiceid: "",
    custEmailId: "",
    date: "",
    due_date: "",
    toName: "",
    toAddress: "",
    amount: "",
    balance: "",
    amountWords: "",
    total: "",
    subTotal: "",
    cgstPercentage: "",
    cgstAmount: "",
    sgstPercentage: "",
    sgstAmount: "",
    totalTax: "",
    paidAmount: "",
    partialPaid1: "",
    partialPaid2: "",
    partialPaid3: "",
    org: org,
    invType: "",
    items: {
      item: "",
      quantity: "",
      unitPrice: "",
      itemTotal: "",
      slno: "",
    },
    paymentstatus: "",
  });



  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'custEmailId') {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      setEmailError(!emailPattern.test(value));
    }

    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prevState => ({
        ...prevState,
        [parent]: {
          ...prevState[parent],
          [child]: value
        }
      }));
    } else {
      if (name === 'invType') {
        setInvType(value);
      }

      setFormData({
        ...formData,
        [name]: value
      });
    }
    if (name === 'invType' && (value === 'PARTIAL_INVOICE')) {
      setShowFields(true);
    }
    if (name === 'invType' && (value === 'INVOICE')) {
      setShowInvoiceFields(true)
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = APIData.api + `invoices/`;
      const response = await axios.post(url, formData, {
        headers: APIData.headers,
      });
      console.log(response.data);
      const itemTotal = formData.items.itemTotal;
      console.log("Item Total:", itemTotal);

      setFormData((prevState) => ({
        ...prevState,
        idinvoices: 0,
        invoiceid: 0,
        parentInvoiceid: "",
        custEmailId: "",
        date: "",
        due_date: "",
        toName: "",
        toAddress: "",
        amount: itemTotal,
        balance: "",
        amountWords: "",
        total: "",
        subTotal: "",
        cgstPercentage: "",
        cgstAmount: "",
        sgstPercentage: "",
        sgstAmount: "",
        totalTax: "",
        paidAmount: "",
        partialPaid1: "",
        partialPaid2: "",
        partialPaid3: "",
        org: org,
        invType: "",
        items: {
          item: "",
          quantity: "",
          unitPrice: "",
          itemTotal: "",
          slno: "",
        },
        paymentstatus: "",
      }));

      if (formData.invType === 'QUOTATIONS' || formData.invType === 'PROFORMA') {
        setFormData((prevState) => ({
          ...prevState,
          parentInvoiceid: "",
          partialPaid1: "",
          partialPaid2: "",
          partialPaid3: "",
          balance: ""
        }));
      }

      if(formData.invType === 'INVOICE'){
        // const date= formData.date;
        // console.log("Date:",date)
        setFormData((prevState)=>({
          ...prevState,
          parentInvoiceid:"",
          partialPaid1:"",
          partialPaid2:"",
          partialPaid3:"",
          due_date:"2024-05-04",

        }))
      }
      toast.success("Invoice sent successfully to Customer Email Address");



      console.log(formData);
      if (response.data.status === "success") {
        toast.success("Invoice created successfully");
      }
    } catch (error) {
      console.error("Error creating invoice:", error);
      toast.error("Error creating invoice");
    }
  };

  useEffect(() => {
    const url = `${APIData.api}invoices?org=${org}`;
    axios
      .get(url, { headers: APIData.headers })
      .then((response) => {
        const parentInvoiceIdsArray = [
          ...new Set(response.data.map((item) => item.parentInvoiceid)),
        ];
        setParentInvoiceIds(parentInvoiceIdsArray);
        console.log(parentInvoiceIdsArray);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    if (
      formData.parentInvoiceid &&
      parentInvoiceIds.includes(formData.parentInvoiceid)
    ) {
      fetchParentIdData();
    }
  }, [formData.parentInvoiceid, parentInvoiceIds]);

  useEffect(() => {
    const { quantity, unitPrice } = formData.items;
    const {
      cgstPercentage,
      sgstPercentage,
      paidAmount,
      partialPaid1,
      partialPaid2,
      partialPaid3,
    } = formData;

    if (quantity && unitPrice) {
      const itemTotal = quantity * unitPrice;
      setFormData((prevState) => ({

        ...prevState,
        items: {
          ...prevState.items,
          itemTotal,
          subTotal: itemTotal,
        },
      }));
    }

    if (formData.items.itemTotal) {
      if (cgstPercentage) {
        const cgstAmount = formData.items.itemTotal * (cgstPercentage / 100);
        setFormData((prevState) => ({
          ...prevState,
          cgstAmount,
        }));
      }

      if (sgstPercentage) {
        const sgstAmount = formData.items.itemTotal * (sgstPercentage / 100);
        setFormData((prevState) => ({
          ...prevState,
          sgstAmount,
        }));
      }
    }

    if (formData.cgstAmount && formData.sgstAmount) {
      const totalTax = formData.cgstAmount + formData.sgstAmount;
      setFormData((prevState) => ({
        ...prevState,
        totalTax,
      }));
    }

    if (formData.items.itemTotal && formData.totalTax) {
      const total =
        parseFloat(formData.items.itemTotal) + parseFloat(formData.totalTax);
      setFormData((prevState) => ({
        ...prevState,
        total,
      }));
    }

    if (paidAmount) {
      console.log("paid amt:", paidAmount)
      const amountWords = num2words(paidAmount, { currency: true });
      console.log("amountWords amt:", amountWords)

      const formattedAmountWords = formatAmountWords(amountWords);
      console.log("formattedAmountWords:", formattedAmountWords)

      setFormData((prevState) => ({
        ...prevState,
        amountWords: formattedAmountWords,
      }));
    }

    if (
      formData.total &&
      partialPaid1 !== undefined &&
      partialPaid2 !== undefined &&
      partialPaid3 !== undefined
    ) {
      const balance = formData.total - partialPaid1 - partialPaid2 - partialPaid3;
      setFormData((prevState) => ({
        ...prevState,
        balance,
        paymentstatus: balance === 0 ? "RECEIVED" : "PENDING",
      }



      ));
    }
    if (formData.total && paidAmount !== undefined) {
      const balance = formData.total - paidAmount;
      setFormData((prevState) => ({
        ...prevState,
        balance,
        paymentstatus: balance === 0 ? "RECEIVED" : "PENDING",
      }

      ));
    }
  }, [
    formData.items.quantity,
    formData.items.unitPrice,
    formData.items.itemTotal,
    formData.cgstPercentage,
    formData.sgstPercentage,
    formData.cgstAmount,
    formData.sgstAmount,
    formData.totalTax,
    formData.total,
    formData.paidAmount,
    formData.partialPaid1,
    formData.partialPaid2,
    formData.partialPaid3,
    formData.balance,
  ]);

  const formatAmountWords = (amountWords) => {
    const words = amountWords.split(" ");
    return `${words
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ")
      .trim()} Rupees`;
  };

  const fetchParentIdData = async () => {
    const url = `${APIData.api}invoices/parent-invoiceId?parentInvoiceId=${formData.parentInvoiceid}&org=${org}`;
    try {
      const response = await axios.get(url, { headers: APIData.headers });
      const data = response.data[response.data.length - 1];
      setParentIdData(response.data);
      setFormData({
        ...formData,
        idinvoices: data.idinvoices,
        invoiceid: data.invoiceid,
        custEmailId: data.custEmailId,
        date: data.date,
        due_date: data.due_date,
        toName: data.toName,
        toAddress: data.toAddress,
        amount: data.amount,
        balance: data.balance,
        amountWords: '',
        total: data.total,
        subTotal: data.subTotal,
        cgstPercentage: data.cgstPercentage,
        cgstAmount: data.cgstAmount,
        sgstPercentage: data.sgstPercentage,
        sgstAmount: data.sgstAmount,
        totalTax: data.totalTax,
        paidAmount: '',
        partialPaid1: data.partialPaid1,
        partialPaid2: data.partialPaid2,
        partialPaid3: data.partialPaid3,
        org: data.org,
        invType: data.invType,
        items: {
          slno: data.items.slno,
          item: data.items.item,
          quantity: data.items.quantity,
          unitPrice: data.items.unitPrice,
          itemTotal: data.items.itemTotal,
        },
        paymentstatus: data.paymentstatus,
      });
      console.log("id based form data:", formData)
    } catch (error) {
      console.error("Error fetching Parent Invoice Data:", error);
    }
  };
  return (
    <Paper elevation={3} sx={{ padding: 2, maxWidth: 800, margin: "auto" }}>
      <Typography variant="h5" style={{ textAlign: "center" }}>
        {" "}
        Create Invoice{" "}
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Invoice Type
              </InputLabel>
              <Select
                labelId="invType"
                name="invType"
                value={formData.invType}
                label="Invoice Type"
                required
                onChange={handleChange}
              >
                <MenuItem value="QUOTATIONS">QUOTATIONS</MenuItem>
                <MenuItem value="PROFORMA">PROFORMA</MenuItem>
                <MenuItem value="PARTIAL_INVOICE">PARTIAL INVOICE</MenuItem>
                <MenuItem value="INVOICE">INVOICE </MenuItem>
              </Select>
              <FormHelperText>Select the Invoice Type ie. QUOTATIONS, PROFORMA, PARTIAL INVOICE, INVOICE</FormHelperText>

            </FormControl>
          </Grid>

          {showFields &&(
             <Grid item xs={12} sm={6}>
             <TextField
               label="Parent Invoice Id"
               required
               fullWidth
               name="parentInvoiceid"
               value={formData.parentInvoiceid}
               onChange={handleChange}
               helperText="Parent Invoice Id is previous Invoice Id which is generated when we send PROFORMA Invoice"
             />
           </Grid>
          )}

          <Grid item xs={12} sm={6}>
            <TextField
              label="Customer Email ID"
              required
              fullWidth
              name="custEmailId"
              value={formData.custEmailId}
              onChange={handleChange}
              error={emailError}
              helperText={
                emailError ? "Please enter a valid email address" : "Enter Customer Email Address"
              }
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Customer Name"
              required
              fullWidth
              name="toName"
              value={formData.toName}
              onChange={handleChange}
              helperText="Enter  name of a Customer"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Customer Address"
              required
              fullWidth
              name="toAddress"
              value={formData.toAddress}
              onChange={handleChange}
              helperText="Enter Address of a Customer"
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Serial No"
              required
              fullWidth
              name="items.slno"
              value={formData.items.slno}
              onChange={handleChange}
              helperText="Enter Serial No of the item"
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Item Name"
              required
              fullWidth
              name="items.item"
              value={formData.items.item}
              onChange={handleChange}
              helperText="Enter name of the Product"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Item Quantity"
              required
              fullWidth
              name="items.quantity"
              value={formData.items.quantity}
              onChange={handleChange}
              helperText="Enter the Quantity of Product , ie. Number of Product Items "
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Unit Price of an Item"
              required
              fullWidth
              name="items.unitPrice"
              value={formData.items.unitPrice}
              onChange={handleChange}
              helperText="Enter the price of the Product"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Total Amount of an Item"
              required
              fullWidth
              name="items.itemTotal"
              value={formData.items.itemTotal}
              onChange={handleChange}
              helperText="Total amount of the Product"
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Sub Total"
              required
              fullWidth
              name="subTotal"
              value={formData.subTotal}
              onChange={handleChange}
              type="number"
              helperText="Sub Total ex: 1st item = 100 Rs(Total amount of an item), 2nd item= 200 Rs(Total amount of an item), Sub Total will be 300Rs"
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="CGST Percentage"
              required
              fullWidth
              name="cgstPercentage"
              value={formData.cgstPercentage}
              onChange={handleChange}
              helperText="CGST : Central Goods and Service Tax"
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="CGST Amount"
              required
              fullWidth
              name="cgstAmount"
              value={formData.cgstAmount}
              onChange={handleChange}
              helperText="CGST Amount= SubTotal of CGST Percentage"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="SGST Percentage"
              required
              fullWidth
              name="sgstPercentage"
              value={formData.sgstPercentage}
              onChange={handleChange}
              helperText="SGST : State Goods and Service Tax"
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="SGST Amount"
              required
              fullWidth
              name="sgstAmount"
              value={formData.sgstAmount}
              onChange={handleChange}
              helperText="SGST Amount= Subtotal of SGST Percentage"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Total Tax"
              required
              fullWidth
              name="totalTax"
              value={formData.totalTax}
              onChange={handleChange}
              helperText="Total Tax, ie. Combination of SGST Amount and CGST Amount"
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Final Amount"
              required
              fullWidth
              name="total"
              value={formData.total}
              onChange={handleChange}
              type="number"
              helperText="Final Amount: ie, Amount including tax and product price"
            />
          </Grid>
          
          {showFields && (
            <>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Partial Payment 1"
                  fullWidth
                  name="partialPaid1"
                  value={formData.partialPaid1}
                  onChange={handleChange}
                  type="number"
                  helperText="Partial Payment 1, ie. The amount which customer pays first time from the Total Amount"
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="Partial Payment 2"
                  fullWidth
                  name="partialPaid2"
                  value={formData.partialPaid2}
                  onChange={handleChange}
                  type="number"
                  helperText="Partial Payment 2, ie. The amount which customer pays Second time from the remaining amount to be paid "
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Partial Payment 3"
                  fullWidth
                  name="partialPaid3"
                  value={formData.partialPaid3}
                  onChange={handleChange}
                  type="number"
                  helperText="Partial Payment 3, ie. The amount which customer pays for the final time from the remaining amount"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Paid Amount"
                  fullWidth
                  name="paidAmount"
                  value={formData.paidAmount}
                  onChange={handleChange}
                  type="number"
                  helperText="The amount paid by the customer"
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="Paid Amount In Words"
                  fullWidth
                  name="amountWords"
                  value={formData.amountWords}
                  onChange={handleChange}
                  helperText="The paid amount to display in the Words"
                />
              </Grid>


              <Grid item xs={12} sm={6}>
                <TextField
                  label="Balance Amount"
                  fullWidth
                  name="balance"
                  value={formData.balance}
                  onChange={handleChange}
                  type="number"
                  helperText="The balance amount to be paid by the customer"
                />
              </Grid>
            </>
          )}

          {showInvoiceFields && (
            <>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Paid Amount"
                  fullWidth
                  name="paidAmount"
                  value={formData.paidAmount}
                  onChange={handleChange}
                  type="number"
                  helperText="The amount paid by the customer"

                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="Amount In Words"
                  fullWidth
                  name="amountWords"
                  value={formData.amountWords}
                  onChange={handleChange}
                  helperText="The paid amount to display in the Words"

                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Balance Amount"
                  fullWidth
                  name="balance"
                  value={formData.balance}
                  onChange={handleChange}
                  type="number"
                  helperText="The balance amount to be paid by the customer"

                />
              </Grid>
            </>
          )}


          <Grid item xs={12} sm={6}>
            <TextField
              label="Date"
              fullWidth
              name="date"
              value={formData.date}
              onChange={handleChange}
              type="date"
              InputLabelProps={{ shrink: true }}
              helperText="Date of generating the invoice"
            />
          </Grid>


          {invType !== "INVOICE" && (
            <Grid item xs={12} sm={6}>
              <TextField
                label="Due Date"
                fullWidth
                name="due_date"
                value={formData.due_date}
                onChange={handleChange}
                type="date"
                InputLabelProps={{ shrink: true }}
                helperText="Due Date : The dead line where balance amount to be paid by the customer"
              />
            </Grid>
          )}


          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Payment Status
              </InputLabel>
              <Select
                labelId="paymentstatus"
                name="paymentstatus"
                value={formData.paymentstatus}
                label="Payment Status"
                onChange={handleChange}
              >
                <MenuItem value="PENDING">PENDING</MenuItem>
                <MenuItem value="RECEIVED">RECEIVED</MenuItem>
              </Select>
              <FormHelperText> Status of the Payment ie, either the Amount to be paid is Pending or Received</FormHelperText>
            </FormControl>
          </Grid>

          <Grid item xs={12}  style={{textAlign:"center"}}>
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default CreateInvoice;

