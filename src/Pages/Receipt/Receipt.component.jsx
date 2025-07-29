import { useState, useEffect } from "react";
import { FiPrinter, FiSave, FiXSquare } from "react-icons/fi"; 
import { useNavigate } from "react-router-dom"; // For navigation

function Receipt() {
  const navigate = useNavigate(); // Hook for page redirection
  const [selectedTab, setSelectedTab] = useState("billDetails");

  // State for receipt data (Initially empty, will fetch data later)
  const [receipts, setReceipts] = useState([]);

  // Fetch data from backend (to be connected later)
  useEffect(() => {
    fetchReceipts();
  }, []);

  const fetchReceipts = async () => {
    try {
      // TODO: Replace with actual API call
      const data = [
        { id: 1, voucherNo: "12367", name: "SALES TRADING", date: "27-04-2024", invoiceAmount: 735, osBalance: 735, paidAmount: 735, balanceAmount: 0, checked: true },
        { id: 2, voucherNo: "12368", name: "SALES TRADING", date: "27-04-2024", invoiceAmount: 735, osBalance: 735, paidAmount: 35, balanceAmount: 700, checked: false },
        { id: 3, voucherNo: "12497", name: "SALES TRADING", date: "30-05-2024", invoiceAmount: 735, osBalance: 735, paidAmount: 0, balanceAmount: 735, checked: false }
      ];
      setReceipts(data);
    } catch (error) {
      console.error("Error fetching receipt data:", error);
    }
  };

  // ** Calculate Totals Efficiently **
  const totalInvoiceAmount = receipts.reduce((sum, r) => sum + r.invoiceAmount, 0);
  const totalOsBalance = receipts.reduce((sum, r) => sum + r.osBalance, 0);
  const totalPaidAmount = receipts.reduce((sum, r) => sum + r.paidAmount, 0);
  const totalBalanceAmount = receipts.reduce((sum, r) => sum + r.balanceAmount, 0);

  // ** Button Functionalities **
  const handleUnPost = () => alert("UnPost action triggered!");
  const handlePost = () => alert("Post action triggered!");

  const handleNew = () => {
    setReceipts([]); // Clears the receipt data
    alert("New receipt form initialized!");
  };

  const handlePrint = () => window.print();

  const handleSave = () => {
    console.log("Receipt data saved:", receipts);
    alert("Receipt saved successfully!");
  };

  const handleClose = () => navigate("/sales-list");


  return (
    <div className="w-full max-w-[98%] mx-auto mt-6 p-4 bg-yellow-100 border border-gray-300 rounded-lg shadow">
      
      {/* Header Fields */}
      <div className="grid grid-cols-4 gap-4 text-sm text-red-700 font-semibold">
        <div>
          <label>Voucher No</label>
          <input type="text" className="w-full border px-2 py-1 rounded" readOnly />
        </div>
        <div>
          <label>Voucher Date</label>
          <input type="date" className="w-full border px-2 py-1 rounded" defaultValue="2025-01-21" />
        </div>
        <div>
          <label>Payment Mode</label>
          <select className="w-full border px-2 py-1 rounded">
            <option>CASH</option>
            <option>CREDIT</option>
          </select>
        </div>
        <div>
          <label>Entered Date</label>
          <input type="date" className="w-full border px-2 py-1 rounded" defaultValue="2025-01-21" />
        </div>
        <div>
          <label>Location Name</label>
          <select className="w-full border px-2 py-1 rounded">
            <option>--SELECT--</option>
          </select>
        </div>
        <div>
          <label>Customer Account</label>
          <input type="text" className="w-full border px-2 py-1 rounded" defaultValue="AMRAC" />
        </div>
        <div>
          <label>Deposit To</label>
          <select className="w-full border px-2 py-1 rounded">
            <option>MAIN CASH</option>
          </select>
        </div>
      </div>

      {/* Post and New Entry */}
      <div className="flex justify-between mt-2">
        <span className="text-red-700 font-bold">post</span>
        <span className="text-blue-600 font-bold">NEW ENTRY</span>
      </div>

      {/* Tabs (Bill Details / Accounts) */}
      <div className="flex border-b mt-2">
        <button onClick={() => setSelectedTab("billDetails")} className={`px-4 py-2 ${selectedTab === "billDetails" ? "border-b-2 border-black font-bold" : ""}`}>Bill Details</button>
        <button onClick={() => setSelectedTab("accounts")} className={`px-4 py-2 ${selectedTab === "accounts" ? "border-b-2 border-black font-bold" : ""}`}>Accounts</button>
      </div>

      {/* Table Section */}
      <div className="border border-gray-300 rounded-lg mt-2 bg-white overflow-x-auto">
        <table className="w-full text-sm text-center border-collapse">
          <thead className="bg-gray-200">
            <tr>
              <th className="border py-2 px-4"><input type="checkbox" /></th>
              <th className="border py-2 px-4">Sl No</th>
              <th className="border py-2 px-4">Voucher No</th>
              <th className="border py-2 px-4">Ref No</th>
              <th className="border py-2 px-4">Voucher Name</th>
              <th className="border py-2 px-4">Voucher Date</th>
              <th className="border py-2 px-4">Invoice Amount</th>
              <th className="border py-2 px-4">OsBalance</th>
              <th className="border py-2 px-4">Paid Amount</th>
              <th className="border py-2 px-4">Balance Amount</th>
            </tr>
          </thead>
          <tbody>
            {receipts.map((receipt, index) => (
              <tr key={receipt.id} className="border">
                <td className="border py-2 px-4"><input type="checkbox" checked={receipt.checked} /></td>
                <td className="border py-2 px-4">{index + 1}</td>
                <td className="border py-2 px-4">{receipt.voucherNo}</td>
                <td className="border py-2 px-4">-</td>
                <td className="border py-2 px-4">{receipt.name}</td>
                <td className="border py-2 px-4">{receipt.date}</td>
                <td className="border py-2 px-4">{receipt.invoiceAmount.toFixed(2)}</td>
                <td className="border py-2 px-4">{receipt.osBalance.toFixed(2)}</td>
                <td className="border py-2 px-4">{receipt.paidAmount.toFixed(2)}</td>
                <td className="border py-2 px-4">{receipt.balanceAmount.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

        {/* === TOTALS ROW (Placed outside .map()) === */}
        <div className="border border-gray-300 bg-gray-200 p-2 mt-[-1px] text-right">
        <span className="text-lg font-bold">Total: </span>
        <span className="text-red-600 mx-4">{totalInvoiceAmount.toFixed(2)}</span>
        <span className="text-red-600 mx-4">{totalOsBalance.toFixed(2)}</span>
        <span className="text-red-600 mx-4">{totalPaidAmount.toFixed(2)}</span>
        <span className="text-red-600 mx-4">{totalBalanceAmount.toFixed(2)}</span>
      </div>

      {/* Remarks */}
      <div className="mt-2">
        <label className="block text-sm font-semibold">Remarks</label>
        <textarea className="w-half border px-2 py-1 rounded"></textarea>
      </div>

       {/* Buttons Section */}
       <div className="flex justify-between items-center mt-3">
        <div className="flex gap-3">
          <button onClick={handleUnPost} className="border border-red-600 text-red-600 px-4 py-2 rounded">UnPost</button>
          <button onClick={handlePost} className="border border-gray-300 text-gray-400 px-4 py-2 rounded">Post</button>
          <button onClick={handleNew} className="border border-red-600 text-red-600 px-4 py-2 rounded">New</button>
        </div>
        <div className="flex gap-3">
          <button onClick={handlePrint} className="border border-blue-600 text-blue-600 px-4 py-2 rounded flex items-center gap-2"><FiPrinter /> Print</button>
          <button onClick={handleSave} className="border border-green-600 text-green-600 px-4 py-2 rounded flex items-center gap-2"><FiSave /> Save</button>
          <button onClick={handleClose} className="border border-black text-black px-4 py-2 rounded flex items-center gap-2"><FiXSquare /> Close</button>
        </div>
      </div>
    </div>
  );
}

export default Receipt;