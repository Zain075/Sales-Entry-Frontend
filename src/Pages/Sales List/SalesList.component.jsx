import { useState, useEffect } from "react";

function SalesList() {
  const [sales, setSales] = useState([]);
  const [customerName, setCustomerName] = useState("");
  const [paymentMode, setPaymentMode] = useState("CASH");
  const [postStatus, setPostStatus] = useState("");
  const [billValue, setBillValue] = useState("");
  const [location, setLocation] = useState("");
  const [dateFrom, setDateFrom] = useState("2024-01-21");
  const [dateTo, setDateTo] = useState("2025-01-21");

  // Fetch sales data (Simulated, replace with API call later)
  useEffect(() => {
    fetchSalesData();
  }, []);

  const fetchSalesData = async () => {
    const data = [
      { id: 832, billNo: "12826", date: "2024-08-31", time: "10:30:54", payment: "CASH", customer: "CASH CUSTOMER", salesRep: "Arjun", subtotal: 100.0, discount: 0.00, tax: 5.0, commission: 0.0, netAmount: 105.0, status: "NOT POSTED" },
      { id: 833, billNo: "12827", date: "2024-08-31", time: "8:21:07", payment: "CASH", customer: "NASER AL SAYER & CO. (LLC)", salesRep: "Ravi", subtotal: 455.0, discount: 0.00, tax: 22.75, commission: 0.0, netAmount: 477.75, status: "NOT POSTED" },
      { id: 834, billNo: "12828", date: "2024-09-01", time: "7:17:09", payment: "CASH", customer: "PIONEER PRECAST CON CRET", salesRep: "John", subtotal: 160.0, discount: 0.00, tax: 8.0, commission: 0.0, netAmount: 168.0, status: "NOT POSTED" }
    ];
    setSales(data);
  };


  // ** Calculate Total Values **
  const totalSubtotal = sales.reduce((sum, sale) => sum + sale.subtotal, 0);
  const totalDiscount = sales.reduce((sum, sale) => sum + sale.discount, 0);
  const totalTax = sales.reduce((sum, sale) => sum + sale.tax, 0);
  const totalCommission = sales.reduce((sum, sale) => sum + sale.commission, 0);
  const totalNetAmount = sales.reduce((sum, sale) => sum + sale.netAmount, 0);

  // ** Button Functionalities **
  const handlePrint = () => {
    window.print();
  };

  const handleClose = () => {
    alert("Close button clicked! Implement navigation logic.");
  };


  return (
    <div className="w-full max-w-[98%] mx-auto mt-1 p-6 bg-white rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-4">Sales List</h2>

      {/* Search Filters */}
      <div className="bg-gray-100 p-4 border border-gray-300 rounded-lg mb-4">
        <h3 className="text-sm font-bold mb-2">Search Values</h3>

        {/* Search Filters - First Row */}
        <div className="grid grid-cols-5 gap-4 items-end mb-2">
          <div>
            <label className="block text-sm font-medium mb-1">Customer Name</label>
            <select className="w-full border px-2 py-1 rounded" value={customerName} onChange={(e) => setCustomerName(e.target.value)}>
              <option>&lt;---Select---&gt;</option>
              <option>John Doe</option>
              <option>Jane Smith</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Bill Value</label>
            <input type="text" className="w-full border px-2 py-1 rounded" value={billValue} onChange={(e) => setBillValue(e.target.value)} />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Location</label>
            <select className="w-full border px-2 py-1 rounded" value={location} onChange={(e) => setLocation(e.target.value)}>
              <option>--SELECT--</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Sales Date</label>
            <div className="flex gap-2">
              <input type="date" className="border px-2 py-1 rounded w-full" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} />
              <input type="date" className="border px-2 py-1 rounded w-full" value={dateTo} onChange={(e) => setDateTo(e.target.value)} />
            </div>
          </div>

          <div className="flex justify-end">
            <button className="bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2">
              🔍 Search
            </button>
          </div>
        </div>

        {/* Search Filters - Second Row */}
        <div className="grid grid-cols-5 gap-4 items-end">
          <div>
            <label className="block text-sm font-medium mb-1">Payment Mode</label>
            <select className="w-full border px-2 py-1 rounded" value={paymentMode} onChange={(e) => setPaymentMode(e.target.value)}>
              <option>CASH</option>
              <option>CREDIT</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Post Status</label>
            <input type="text" className="w-full border px-2 py-1 rounded" value={postStatus} onChange={(e) => setPostStatus(e.target.value)} />
          </div>
        </div>
      </div>

      {/* Table - Full Width, No Scroll */}
      <div className="w-full border border-gray-300 rounded-lg">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-blue-600 text-white">
              <th className="py-2 px-2 border">SI No</th>
              <th className="py-2 px-2 border">Bill No</th>
              <th className="py-2 px-2 border">Bill Date</th>
              <th className="py-2 px-2 border">Bill Time</th>
              <th className="py-2 px-2 border">Payment Mode</th>
              <th className="py-2 px-2 border">Customer Name</th>
              <th className="py-2 px-2 border">Sales Rep</th>
              <th className="py-2 px-2 border">Subtotal</th>
              <th className="py-2 px-2 border">Discount</th>
              <th className="py-2 px-2 border">Tax Amount</th>
              <th className="py-2 px-2 border">Comm. Amt</th>
              <th className="py-2 px-2 border">Net Amount</th>
              <th className="py-2 px-2 border">Post Status</th>
            </tr>
          </thead>
          <tbody>
            {sales.map((sale) => (
              <tr key={sale.id} className="text-center border">
                <td className="py-2 px-2 border">{sale.id}</td>
                <td className="py-2 px-2 border">{sale.billNo}</td>
                <td className="py-2 px-2 border">{sale.date}</td>
                <td className="py-2 px-2 border">{sale.time}</td>
                <td className="py-2 px-2 border">{sale.payment}</td>
                <td className="py-2 px-2 border">{sale.customer}</td>
                <td className="py-2 px-2 border">{sale.salesRep}</td>
                <td className="py-2 px-2 border">{sale.subtotal.toFixed(2)}</td>
                <td className="py-2 px-2 border">{sale.discount.toFixed(2)}</td>
                <td className="py-2 px-2 border">{sale.tax.toFixed(2)}</td>
                <td className="py-2 px-2 border">{sale.commission.toFixed(2)}</td>
                <td className="py-2 px-2 border">{sale.netAmount.toFixed(2)}</td>
                <td className="py-2 px-2 border text-red-600 font-bold">{sale.status}</td>
              </tr>
            ))}
          </tbody>
       {/* Totals Row - Inside TFOOT */}
       <tfoot>
            <tr className="text-center font-bold bg-gray-200">
              <td colSpan="7" className="py-2 px-2 border text-right">Total:</td>
              <td className="py-2 px-2 border">{totalSubtotal.toFixed(2)}</td>
              <td className="py-2 px-2 border">{totalDiscount.toFixed(2)}</td>
              <td className="py-2 px-2 border">{totalTax.toFixed(2)}</td>
              <td className="py-2 px-2 border">{totalCommission.toFixed(2)}</td>
              <td className="py-2 px-2 border">{totalNetAmount.toFixed(2)}</td>
              <td className="py-2 px-2 border"></td>
            </tr>
          </tfoot>
        </table>
      </div>

      
       {/* Print & Close Buttons */}
       <div className="flex justify-end gap-4 mt-4">
        <button className="bg-blue-600 text-white px-4 py-2 rounded flex items-center" onClick={handlePrint}>🖨️ Print</button>
        <button className="bg-gray-500 text-white px-4 py-2 rounded flex items-center" onClick={handleClose}>❌ Close</button>
      </div>
    </div>
  );
}

export default SalesList;