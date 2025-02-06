import React from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import dr from "../src/assets/dr.png";
import { IoIosMail } from "react-icons/io";
import { MdCall } from "react-icons/md";
import tp from "../src/assets/SSBATTotalPage.png";

const DonationReceipt = ({ donationData }) => {
    // Enhanced PDF generation function with improved resolution and error handling
    const generatePDF = async () => {
        try {
            // Select the donation receipt container for PDF generation
            const receipt = document.getElementById('donation-receipt');

            // Capture high-resolution canvas of the receipt
            const canvas = await html2canvas(receipt, {
                scale: 2, // Increased scale for better resolution
                width: 794, // Fixed width for A4
                height: 1123, // Fixed height for A4
                useCORS: true, // Avoid cross-origin issues
            });

            // Convert canvas to image data
            const imgData = canvas.toDataURL('image/png');

            // Initialize PDF document with A4 dimensions
            const pdf = new jsPDF('p', 'mm', 'a4');

            // Calculate PDF page width and proportional height
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

            // Add captured image to PDF with optimized compression
            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight, '', 'FAST');

            // Log PDF file size for monitoring
            const pdfBlob = pdf.output('blob');
            const fileSizeInKB = pdfBlob.size / 1024;
            console.log(`PDF Size: ${fileSizeInKB.toFixed(2)} KB`);

            // Save PDF with unique filename based on receipt number
            pdf.save(`donation-receipt-${donationData.Receipt_NO}.pdf`);
        } catch (error) {
            // Error handling for PDF generation
            console.error("PDF Generation Error:", error);
            alert("Failed to generate receipt. Please try again.");
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return '';
    
        // Check if the format is DD-MM-YYYY and convert it
        const dateParts = dateString.split('-'); // Split by '-'
        if (dateParts.length === 3) {
            const [day, month, year] = dateParts;
            const formattedDate = new Date(`${year}-${month}-${day}`); // Convert to YYYY-MM-DD
            if (!isNaN(formattedDate.getTime())) {
                return `${day}-${month}-${year}`; // Return in dd/MM/yyyy format
            }
        }
    
        console.error("Invalid Date:", dateString);
        return "Invalid Date";
    };
    
    return (
        <div className="p-4">
            {/* Download Receipt Button */}
            <button
                onClick={generatePDF}
                className="mb-4 bg-red-700 text-white px-4 py-2 rounded hover:bg-red-800"
            >
                Download Receipt
            </button>

            {/* Main container for donation receipt */}
            <div className="relative w-[210mm] h-[297mm] mx-auto font-canvasans" id="donation-receipt">
                {/* Background Template Image */}
                <img
                    src={tp}
                    alt="Background Template"
                    className="absolute top-0 left-0 w-full h-full object-cover"
                />

                {/* Content overlay */}
                <div className="absolute inset-0">
                    {/* Trust Header Section */}
                    <div className="px-8 pt-20">
                        <div className="flex justify-between items-start">
                            <div>
                                <h1 className="text-2xl font-bold mb-2">Shirdhi Sai Baba Annadanam Trust</h1>
                                <p className="text-sm">
                                    BBCL VAJRA, TOWER 3, #11D, NOLAMBUR BY-PASS,<br />
                                    CHENNAI-600 037
                                </p>
                                <p className="text-sm">Registration no: R/Konnur/Book-4/118/2024</p>
                                <p className="text-sm">Pan no: ABJTS7288J</p>
                                <p className="text-sm">UIN: ABJTS7288JF20241</p>
                            </div>
                        </div>
                    </div>

                    {/* Donation Receipt Title */}
                    <div className="relative flex justify-center items-center my-6">
                        <img
                            src={dr}
                            alt="DONATION RECEIPT background"
                            className="h-full w-96"
                        />
                        <h2 className="absolute text-3xl font-bold font-alice text-center text-red-700 bottom-10">
                            DONATION RECEIPT
                        </h2>
                    </div>

                    {/* Receipt Details Section */}
                    <div className="px-8">
                        {/* Receipt Number and Date */}
                        <div className="grid grid-cols-2 gap-8 mb-8">
                            <div className="bg-[#fce805] px-4 py-2 rounded-full">
                                <p className="font-extrabold text-xl px-4 mb-4">Receipt No: {donationData.Receipt_NO}</p>
                            </div>
                            <div className="bg-[#fce805] px-4 py-2 rounded-full">
                                <p className="font-extrabold text-xl px-4 mb-4">Receipt Date: {donationData.Receipt_Date}</p>
                            </div>
                        </div>

                        {/* Contributor Details */}
                        <div className="space-y-[8px] mb-6 text-[#750004] ml-20 font-alice">
                            {/* Individual Detail Rows */}
                            <div className="grid grid-cols-3 gap-2">
                                <p className='font-extrabold'>Contributor's Name</p>
                                <p className="col-span-2 font-extrabold">: &nbsp;{donationData.Contributor_Name}</p>
                            </div>
                            <div className="grid grid-cols-3 gap-2">
                                <p className='font-extrabold'>Mobile No</p>
                                <p className="col-span-2 font-extrabold">: &nbsp;{donationData.Mobile_No}</p>
                            </div>
                            <div className="grid grid-cols-3 gap-2">
                                <p className='font-extrabold'>Amount</p>
                                <p className="col-span-2 font-extrabold">: &nbsp;₹ {parseFloat(donationData.Amount).toFixed(2)}</p>
                            </div>
                            <div className="grid grid-cols-3 gap-2">
                                <p className='font-extrabold'>Amount in words</p>
                                <p className="col-span-2 font-extrabold">: &nbsp;{donationData.Amount_in_words}</p>
                            </div>
                            <div className="grid grid-cols-3 gap-2">
                                <p className='font-extrabold'>Address</p>
                                <p className="col-span-2 font-extrabold">: &nbsp;{donationData.Address}</p>
                            </div>
                            <div className="grid grid-cols-3 gap-2">
                                <p className='font-extrabold'>Payment Mode</p>
                                <p className="col-span-2 font-extrabold">: &nbsp;{donationData.Payment_mode}</p>
                            </div>
                            <div className="grid grid-cols-3 gap-2">
                                <p className='font-extrabold'>Contribution Date</p>
                                <p className="col-span-2 font-extrabold">: &nbsp;{formatDate(donationData.Contribution_Date)}</p>
                            </div>
                            <div className="grid grid-cols-3 gap-2">
                                <p className='font-extrabold'>PAN No</p>
                                <p className="col-span-2 font-extrabold">: &nbsp;{donationData.PAN_No}</p>
                            </div>
                        </div>

                        {/* Footer Message */}
                        <div className="text-center mb-4">
                            <p className="font-oregano mb-2 text-2xl">
                                Our Heartfelt Gratitude for Your Support, to Help US Create an Opportunity<br></br>
                                to Serve Our Sadhguru, Shirdhi Sai Baba, By Spreading Love to All Needy<br></br>
                                Through Various Activities
                            </p>
                            <p className="text-sm">
                                Note: You have donated to an organisation which offers tax-exemption U/S 80G of income Tax Act 1951.
                                This is online generated receipt, signature not required.
                            </p>
                        </div>

                        {/* Trust Footer */}
                        <div className="mt-8">
                            <p className="text-right mb-4 font-extrabold mr-9">For Shirdi Sai Baba Annadhanam Trust</p>
                            <p className="text-right font-extrabold mt-16 mr-24">Authorized Signatory</p>
                        </div>
                    </div>

                    {/* Contact Information Footer */}
                    <div className=''>
                        <div className="absolute bottom-2 left-8 right-8 flex justify-between items-center text-sm">
                            <div className="flex gap-2 items-center">
                                <div className="mt-4">
                                    <IoIosMail className="text-white text-xl text-center bg-black rounded-full" />
                                </div>
                                <div>
                                    <span className="mr-2 font-extrabold">Email:</span>
                                    <span className="font-semibold">ssbatrust@gmail.com</span>
                                </div>
                            </div>
                            <div className="flex gap-2 items-center">
                                <div className="mt-4">
                                    <MdCall className="text-white text-xl text-center bg-black rounded-full" />
                                </div>
                                <div>
                                    <span className="mr-2 font-extrabold">Contact us:</span>
                                    <span className="font-semibold">99622 24476</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DonationReceipt;