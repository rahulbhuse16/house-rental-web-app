import React, { useEffect, useState } from "react";
import { jsPDF } from "jspdf";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchPayments } from "@/Redux/ThunkFunction/Payment";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Skeleton from "@mui/material/Skeleton";
import DownloadIcon from '@mui/icons-material/Download';
import ReceiptIcon from '@mui/icons-material/Receipt';

const PaymentHistory = () => {
    const [search, setSearch] = useState("");
    const { userId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {  payments = [], isLoading } = useSelector((state) => state.Payment);
    const isPending = useSelector(state => state.Payment.isLoading);
    const role=localStorage.getItem('role')
    useEffect(() => {
        dispatch(fetchPayments({ userId }));
    }, []);

    const filteredData = Array.isArray(payments)
        ? payments.filter((payment) => payment.email.toLowerCase().includes(search.toLowerCase()))
        : [];


    const handlePrint = () => {
        window.print();
    };

const creditCardSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20"><path d="M21 3H3c-1.1 0-1.99.9-1.99 2L1 19c0 1.1.89 2 1.99 2H21c1.1 0 1.99-.9 1.99-2L23 5c0-1.1-.89-2-1.99-2zm0 16H3V8h18v11zM3 6h18V5H3v1z"/></svg>`;
const calendarSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20"><path d="M19 3h-1V1H6v2H5c-1.1 0-1.99.9-1.99 2L3 19c0 1.1.89 2 1.99 2H19c1.1 0 1.99-.9 1.99-2V5c0-1.1-.89-2-1.99-2zm-6 14H9v-2h4v2zm3-4H8V9h10v4z"/></svg>`;
const dollarSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14h-2v2h2v-2zm0-4h-2V7h2v5z"/></svg>`;
const successSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20"><path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm1 17l-5-5 1.41-1.41L12 14.17l3.59-3.59L17 12l-4 5z"/></svg>`;
const failureSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20"><path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm1 17l-5-5 1.41-1.41L12 14.17l3.59-3.59L17 12l-4 5z"/></svg>`;

const downloadReceipt = (payment) => {
    const doc = new jsPDF();

    // Title and Style
    doc.setFontSize(20);
    doc.setFont("helvetica", "bold");
    doc.text('Payment Receipt', 105, 20, null, null, 'center');

    // Add a border around the document
    doc.setDrawColor(0, 0, 0); // black border
    doc.rect(5, 5, 200, 287); // x, y, width, height
    
    // Payment Information Section with Icons
    doc.setFontSize(12);
    doc.text('----------------------------------------------------', 10, 30);

    // Email with Material Icon (Credit Card)
    doc.setFontSize(12);
    doc.text('Email: ', 10, 40);
    doc.text(payment.email, 40, 40);
    
    // Card Holder Name
    doc.text('Card Holder: ', 10, 50);
    doc.text(payment.cardHolder, 40, 50);

    // Expiry Date with Material Icon (Calendar)
    doc.text('Expiry Date: ', 10, 60);
    doc.text(payment.expiryDate, 40, 60);

    // Masking Card Number (show only last 4 digits)
    doc.text('Card Number: **** **** **** ' + payment.cardNumber.slice(-4), 10, 70);
    doc.text('----------------------------------------------------', 10, 80);

    // Payment Details Section
    doc.text('Amount: ', 10, 90);
    doc.text(`$${payment.totalAmount}`, 40, 90);

    // Payment Method
    doc.text('Payment Method: ', 10, 100);
    doc.text(payment.paymentMethod || "Debit Card", 40, 100);

    doc.text('----------------------------------------------------', 10, 110);

    // House Name
    doc.text('House Name: ', 10, 120);
    doc.text(payment.House.houseName || "N/A", 40, 120);

    // Payment Status with Material UI Icon (Success or Failure)
    const statusIcon = payment.paymentStatus === 'Success' ? successSvg : failureSvg;
    doc.text('Payment Status: ', 10, 130);
    doc.text(payment.paymentStatus || "Pending", 40, 130);
    
    // Date of Payment
    const paymentDate = new Date(payment.updatedAt);
    doc.text('Date: ' + paymentDate.toLocaleDateString(), 10, 140);

    // Separator line
    doc.text('----------------------------------------------------', 10, 150);

    // Footer section
    doc.text('Thank you for your payment!', 10, 160);
    doc.text('For any inquiries, contact support@company.com', 10, 170);

    // Save the PDF with the user's email as filename
    doc.save(`${payment.email}_receipt.pdf`);
};


    
    return (
        <div className="p-6 bg-gray-50 min-h-screen rounded-lg shadow-md">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                    <ArrowBackIcon
                        onClick={() => navigate(-1)}
                        style={{ cursor: "pointer", marginRight: 10 }}
                    />
                    <h1 className="text-4xl font-semibold text-gray-800">
                        {role==='admin'? 'Payments Collected':'Payment History'}
                        
                    </h1>
                </div>

            </div>

            <input
                type="text"
                placeholder="Search by Email"
                className="p-2 rounded-md border border-gray-300 w-full max-w-xs mb-6"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            <div className="overflow-x-auto bg-white rounded-lg shadow-sm">
                <table className="min-w-full table-auto">
                    <thead className="bg-purple-500 text-white">
                        <tr style={{ backgroundColor: "#51158c" }}>
                            <th className="py-3 px-4 text-left">Email</th>
                            <th className="py-3 px-4 text-left">Card Holder</th>
                            <th className="py-3 px-4 text-left">Card Number</th>
                            <th className="py-3 px-4 text-left">Expiry Date</th>
                            <th className="py-3 px-4 text-left">CVC</th>
                            <th className="py-3 px-4 text-left">Amount ($)</th>
                            {role==='user'?
                            (<React.Fragment>
                            <th className="py-3 px-4 text-left">Username</th>
                            <th className="py-3 px-4 text-left">House Name</th>
                            <th className="py-3 px-4 text-left">Address</th>
                            </React.Fragment>):null}
                            <th className="py-3 px-4 text-left">Payment Date</th>
                            <th className="py-3 px-4 text-left">Get Receipt</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isPending
                            ? Array.from({ length: 5 }).map((_, index) => (
                                <tr key={index}>
                                    {Array.from({ length: 12 }).map((_, cellIndex) => (
                                        <td key={cellIndex} className="py-2 px-4">
                                            <Skeleton variant="text" width={100} height={30} />
                                        </td>
                                    ))}
                                </tr>
                            ))
                            : filteredData.map((payment) => (
                                <tr key={payment.id} className="border-t">
                                    <td className="py-2 px-4">{payment.email}</td>
                                    <td className="py-2 px-4">{payment.cardHolder}</td>
                                    <td className="py-2 px-4">{payment.cardNumber}</td>
                                    <td className="py-2 px-4">{payment.expiryDate}</td>
                                    <td className="py-2 px-4">{payment.cvc}</td>
                                    <td className="py-2 px-4">{payment.totalAmount}</td>
                                    {role==='user' ?
                                    (<React.Fragment>
                                    <td className="py-2 px-4">{payment?.User?.username}</td>
                                    <td className="py-2 px-4">{payment?.House?.houseName}</td>
                                    <td className="py-2 px-4">{payment?.House?.address}</td>
                                    </React.Fragment>):null}
                                    <td className="py-2 px-4">
                                        {new Date(payment.updatedAt).toLocaleDateString('en-GB', {
                                            year: 'numeric',
                                            month: '2-digit',
                                            day: '2-digit'
                                        })}
                                    </td>
                                    <td className="py-2 px-4">
                                        <button
                                            style={{ backgroundColor: "#2b0057" }}
                                            onClick={() => downloadReceipt(payment)}
                                            className="px-4 py-1 text-white rounded-lg hover:bg-blue-700"
                                        >
                                            <ReceiptIcon/>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PaymentHistory;
