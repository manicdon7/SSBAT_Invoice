import React from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
// import { Card } from '@/components/ui/card';
import dr from "../src/Assests/dr.png";
import { IoIosMail } from "react-icons/io";
import { MdCall } from "react-icons/md";

const DonationReceipt = ({ donationData }) => {
    const generatePDF = async () => {
        const receipt = document.getElementById('donation-receipt');
        const canvas = await html2canvas(receipt);
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save(`donation-receipt-${donationData.Receipt_NO}.pdf`);
    };

    return (
        <div className="p-4">
            <button
                onClick={generatePDF}
                className="mb-4 bg-red-700 text-white px-4 py-2 rounded hover:bg-red-800"
            >
                Download Receipt
            </button>

            <div id="donation-receipt" className="bg-white p-8 max-w-3xl mx-auto">
                {/* Header */}
                <div className="relative">
                    <div className="absolute top-0 right-0">
                        <img
                            src="/api/placeholder/100/100"
                            alt="Trust Logo"
                            className="w-24 h-24"
                        />
                    </div>
                    <div className="mb-8">
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

                {/* Donation Receipt Title */}
                <div className="relative flex justify-center items-center mb-8">
                    {/* Image */}
                    <img
                        src={dr}
                        alt="DONATION RECEIPT background"
                        className="h-full w-96"
                    />

                    {/* Text on Image */}
                    <h2 className="absolute text-3xl font-bold text-red-700 bottom-10 text-shadow">
                        DONATION RECEIPT
                    </h2>

                </div>

                {/* Receipt Details */}
                <div className="grid grid-cols-2 gap-8 mb-8">
                    <div className="bg-[#fce805] px-4 py-2 rounded-full">
                        <p className="font-bold px-4 mb-4">Receipt No: {donationData.Receipt_NO}</p>
                    </div>
                    <div className="bg-[#fce805] px-4 py-2 rounded-full">
                        <p className="font-bold px-4 mb-4">Donation Date: {donationData.Donation_Date}</p>
                    </div>
                </div>

                {/* Contributor Details */}
                <div className="space-y-4 mb-8 text-[#750004] font-extrabold ml-12">
                    <div className="grid grid-cols-3 gap-2">
                        <p className="">Contributor's Name</p>
                        <p className="col-span-2">:  &nbsp;{donationData.Contributor_Name}</p>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                        <p className="">Mobile No</p>
                        <p className="col-span-2">: &nbsp;{donationData.Mobile_No}</p>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                        <p className="">Amount</p>
                        <p className="col-span-2">:  &nbsp;{donationData.Amount}</p>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                        <p className="">Amount in words</p>
                        <p className="col-span-2">:  &nbsp;{donationData.Amount_in_words}</p>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                        <p className="">Address</p>
                        <p className="col-span-2">:  &nbsp;{donationData.Address}</p>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                        <p className="">Payment Mode</p>
                        <p className="col-span-2">:  &nbsp;{donationData.Payment_mode}</p>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                        <p className="">Contribution Date</p>
                        <p className="col-span-2">: &nbsp;{donationData.Contribution_Date}</p>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                        <p className="">PAN No</p>
                        <p className="col-span-2">: &nbsp;{donationData.PAN_No}</p>
                    </div>
                </div>

                {/* Footer Message */}
                <div className="text-center mb-8">
                    <p className="italic mb-4">
                        Our Heartfelt Gratitude for Your Support, to Help US Create an Opportunity
                        to Serve Our Sadhguru, Shirdhi Sai Baba, By Spreading Love to All Needy
                        Through Various Activities
                    </p>
                    <p className="text-sm">
                        Note: You have donated to an organisation which offers tax-exemption U/S 80G of income Tax Act 1951.
                        This is online generated receipt, signature not required.
                    </p>
                </div>

                {/* Trust Footer */}
                <div className="mt-8">
                    <p className="text-right mb-4 font-extrabold">For Shirdi Sai Baba Annadhanam Trust</p>
                    <p className="text-right font-extrabold mt-20">Authorized Signatory</p>
                </div>

                {/* Contact Information */}
                <div className="mt-8 flex justify-between items-center text-sm">
                    <div className="flex gap-2 items-center">
                        <div className='mt-4'>
                      <IoIosMail className='text-white text-xl text-center bg-black rounded-full  '/>
                      </div>
                      <div>
                        <span className="mr-2 font-extrabold">Email:</span>
                        <span className='font-semibold'>ssbatrust@gmail.com</span>
                        </div>
                    </div>
                    <div className="flex gap-2 items-center">
                        <div className='mt-4'>
                       <MdCall className='text-white text-xl text-center bg-black rounded-full' />
                       </div>
                       <div>
                        <span className="mr-2 font-extrabold">Contact us:</span>
                        <span className='font-semibold'>99622 24476</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DonationReceipt;