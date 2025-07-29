import React, { useState } from "react";
import SalesTable from "./SalesTable/SalesTable.component";

const SalesEntry = () => {
  const [formData, setFormData] = useState({
    billNo: "",
    invoiceParty: "CASH CUSTOMER",
    customerName: "CASH CUSTOMER",
    billDate: "",
    paymentType: "CASH",
    accountHead: "CASH IN HAND (PETTY CASH)",
    salesMan: "",
    localBillNo: "",
    custLPONo: "",
    counterNo: "",
    location: "",
    jobCardNo: "",
    invoiceAmount: "0.00",
    remarks: "",
  });

  const [isInvoicePartyModalOpen, setInvoicePartyModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Invoice party list
  const invoicePartyOptions = [
    { custNo: 125, name: "CASH CUSTOMER", trn: "", mobile: "", telephone: "" },
    { custNo: 1, name: "RAMADA", trn: "1005632458000", mobile: "", telephone: "" },
    { custNo: 2, name: "FIX PRO CONTRACT", trn: "1004731681000", mobile: "", telephone: "" },
  ];

  // Filtered invoice party options based on search query
  const filteredCustomers = invoicePartyOptions.filter(
    (party) =>
      party.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      party.trn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      party.mobile.toLowerCase().includes(searchQuery.toLowerCase()) ||
      party.telephone.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle input change
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

   // Handle invoice party selection
   const handleInvoiceSelect = (party) => {
    setFormData({ ...formData, invoiceParty: party.name });
    setInvoicePartyModalOpen(false); // ✅ Corrected modal close function
  };


  

  return (
    <div className="max-w-screen-2xl mx-auto bg-white shadow-md rounded-lg p-6">
      <h1 className="text-2xl font-bold mb-4 text-gray-700">Sales Entry</h1>

      {/* ✅ First Row (No blank spaces) */}
      <div className="grid grid-cols-8 gap-4">
        <div className="col-span-1">
          <label className="block text-gray-600 font-medium">Bill No</label>
          <input type="text" name="billNo" value={formData.billNo} onChange={handleFormChange} className="w-full border rounded px-2 py-1" />
        </div>

        <div className="col-span-2">
          <label className="block text-gray-600 font-medium">Invoice Party</label>
          <div className="relative">
            <input type="text" name="invoiceParty" value={formData.invoiceParty} readOnly className="w-full border rounded px-2 py-1 cursor-pointer" onClick={() => setInvoicePartyModalOpen(true)} />
            <button type="button" className="absolute right-2 top-1/2 transform -translate-y-1/2" onClick={() => setInvoicePartyModalOpen(true)}>
              ▼
            </button>
          </div>
        </div>

        <div className="col-span-2">
          <label className="block text-gray-600 font-medium">Customer Name</label>
          <select name="customerName" value={formData.customerName} onChange={handleFormChange} className="w-full border rounded px-2 py-1">
            <option value="CASH CUSTOMER">CASH CUSTOMER</option>
            <option value="REGULAR CUSTOMER">REGULAR CUSTOMER</option>
          </select>
        </div>

        <div className="col-span-1">
          <label className="block text-gray-600 font-medium">Local Bill No</label>
          <input type="text" name="localBillNo" value={formData.localBillNo} onChange={handleFormChange} className="w-full border rounded px-2 py-1" />
        </div>

        <div className="col-span-1">
          <label className="block text-gray-600 font-medium">Cust LPO No</label>
          <input type="text" name="custLPONo" value={formData.custLPONo} onChange={handleFormChange} className="w-full border rounded px-2 py-1" />
        </div>

        <div className="col-span-1">
          <label className="block text-gray-600 font-medium">Counter #</label>
          <input type="text" name="counterNo" value={formData.counterNo} onChange={handleFormChange} className="w-full border rounded px-2 py-1" />
        </div>

        <div className="col-span-1">
          <label className="block text-gray-600 font-medium">Location</label>
          <input type="text" name="location" value={formData.location} onChange={handleFormChange} className="w-full border rounded px-2 py-1" />
        </div>
      </div>

      {/* ✅ Second Row (Correct Input Placement) */}
      <div className="grid grid-cols-8 gap-4 mt-4">
        <div className="col-span-2">
          <label className="block text-gray-600 font-medium">Bill Date</label>
          <input type="date" name="billDate" value={formData.billDate} onChange={handleFormChange} className="w-full border rounded px-2 py-1" />
        </div>

        <div className="col-span-2">
          <label className="block text-gray-600 font-medium">Payment Type</label>
          <select name="paymentType" value={formData.paymentType} onChange={handleFormChange} className="w-full border rounded px-2 py-1">
            <option value="CASH">CASH</option>
            <option value="CARD">CARD</option>
            <option value="ONLINE">ONLINE</option>
          </select>
        </div>

        <div className="col-span-2">
          <label className="block text-gray-600 font-medium">Account Head</label>
          <select name="accountHead" value={formData.accountHead} onChange={handleFormChange} className="w-full border rounded px-2 py-1">
            <option value="CASH IN HAND (PETTY CASH)">CASH IN HAND (PETTY CASH)</option>
            <option value="BANK ACCOUNT">BANK ACCOUNT</option>
          </select>
        </div>

        <div className="col-span-2">
          <label className="block text-gray-600 font-medium">Sales Man</label>
          <input type="text" name="salesMan" value={formData.salesMan} onChange={handleFormChange} className="w-full border rounded px-2 py-1" />
        </div>

        <div className="col-span-2">
          <label className="block text-gray-600 font-medium">Invoice Amt</label>
          <input type="text" name="invoiceAmount" value={formData.invoiceAmount} readOnly className="w-full border rounded px-2 py-1 bg-gray-100" />
        </div>
      </div>

      {/* ✅ Job Card & Remarks Section (Rightmost Side) */}
      <div className="flex justify-end mt-4">
        <div className="w-1/3 bg-gray-100 p-4 rounded-lg shadow-md">
          <label className="block text-gray-600 font-medium">Job Card No</label>
          <input type="text" name="jobCardNo" value={formData.jobCardNo} onChange={handleFormChange} className="w-full border rounded px-2 py-1 mb-3" />

          <label className="block text-gray-600 font-medium">Remarks</label>
          <textarea name="remarks" value={formData.remarks} onChange={handleFormChange} className="w-full border rounded px-2 py-1 h-16"></textarea>
        </div>
      </div>

      {/* ✅ Sales Table */}
      <SalesTable />
  {/* ✅ Invoice Party Modal */}
  {isInvoicePartyModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-md w-2/3">
            <h2 className="text-lg font-bold">Select Invoice Party</h2>

            {/* Search Bar */}
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full border rounded px-2 py-1 my-2"
            />

            {/* Table */}
            <table className="w-full border-collapse border text-sm">
              <thead className="bg-gray-200">
                <tr>
                  <th className="border p-2">Cust No</th>
                  <th className="border p-2">Customer Name</th>
                  <th className="border p-2">TRN No</th>
                  <th className="border p-2">Mobile No</th>
                  <th className="border p-2">Telephone</th>
                  <th className="border p-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredCustomers.map((party, index) => (
                  <tr key={index} className="border">
                    <td className="border p-2">{party.custNo}</td>
                    <td className="border p-2">{party.name}</td>
                    <td className="border p-2">{party.trn}</td>
                    <td className="border p-2">{party.mobile}</td>
                    <td className="border p-2">{party.telephone}</td>
                    <td className="border p-2">
                      <button className="bg-blue-500 text-white px-4 py-1 rounded" onClick={() => handleInvoiceSelect(party)}>
                        Select
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* ✅ Close Button Fix */}
            <button className="mt-4 bg-red-500 text-white px-4 py-1 rounded" onClick={() => setInvoicePartyModalOpen(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SalesEntry;