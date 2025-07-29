import { useState, useEffect } from "react";

function SalesTable() {
  const [sales, setSales] = useState([]);
  const [salesTerms, setSalesTerms] = useState("");
  const [paidAmount, setPaidAmount] = useState(0);
  const [balanceAmount, setBalanceAmount] = useState(0);
  const [discountPercent, setDiscountPercent] = useState(0);
  const [taxRate, setTaxRate] = useState(5); // Default tax rate at 5%

  // Helper function to safely handle undefined/null values
const safeNum = (value) => (typeof value === "number" && !isNaN(value) ? value : 0);


  useEffect(() => {
    fetchSalesData();
  }, []);

  const fetchSalesData = async () => {
    const data = [
      { id: 1, ownRefNo: "REF123", productCode: "P001", product: "AXLE ASSY (NOT ORIGINAL) LH", serialNo: "-", packDetails: "-", packQty: 0, unit: "PCS", qty: 1, focQty: 0, price: 500, discountAmount: 0, tax: 5 },
      { id: 2, ownRefNo: "REF124", productCode: "P002", product: "LOWER ARM BALL JOINT RH (NOT ORIGINAL)", serialNo: "-", packDetails: "-", packQty: 0, unit: "PCS", qty: 1, focQty: 0, price: 140, discountAmount: 0, tax: 5 },
      { id: 3, ownRefNo: "REF125", productCode: "P003", product: "WHEEL BEARING (NOT ORIGINAL) RH", serialNo: "-", packDetails: "-", packQty: 0, unit: "PCS", qty: 1, focQty: 0, price: 150, discountAmount: 0, tax: 5 },
    ];
    setSales(data);
  };

  const deleteRow = (id) => {
    setSales(sales.filter((sale) => sale.id !== id));
  };

  const totalQty = sales.reduce((sum, sale) => sum + sale.qty, 0);
  const totalSubtotal = sales.reduce((sum, sale) => sum + sale.qty * sale.price, 0);
  const totalTax = sales.reduce((sum, sale) => sum + ((sale.price * sale.qty) * sale.tax) / 100, 0);
  const totalDiscount = (totalSubtotal * discountPercent) / 100;
  const totalLineTotal = totalSubtotal + totalTax - totalDiscount;

  // Calculate balance amount dynamically
  useEffect(() => {
    setBalanceAmount(totalLineTotal - paidAmount);
  }, [paidAmount, totalLineTotal]);

  // Button Handlers
  const handleCancel = () => {
    setSales([]);
    setSalesTerms("");
    setPaidAmount(0);
    setBalanceAmount(0);
    setDiscountPercent(0);
  };

  const handleUnPost = () => alert("🔄 UnPost clicked! This will revert the sales entry.");

  const handleNew = () => {
    fetchSalesData();
    setSalesTerms("");
    setPaidAmount(0);
    setBalanceAmount(0);
    setDiscountPercent(0);
  };

  const handlePost = () => alert("📤 Post clicked! Data will be submitted to backend.");

  const handleDoPrint = () => window.print();

  const handlePrint = () => window.print();

  const handleUpdate = () => alert("💾 Update clicked! Data will be modified.");

  return (
    <div className="w-full overflow-x-auto bg-white p-6 shadow-md rounded-lg">
      {/* Table */}
      <table className="w-full border-collapse border border-gray-300 text-sm">
        <thead className="bg-gray-900 text-white">
          <tr>
            {[
              "Sl No", "Own Ref No", "Product Code", "Product Name", "Serial No",
              "Pack Details", "Pack Qty", "Unit", "Qty", "Foc Qty", "Unit Price",
              "Disc %", "Disc Amt", "Sub Total", "Tax %", "Tax Amt", "Line Total", "Action"
            ].map((header) => (
              <th key={header} className="border px-3 py-2 text-center">{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sales.map((sale, index) => {
            const subtotal = safeNum(sale.price * sale.qty);
            const taxAmount = (subtotal * safeNum(sale.tax)) / 100;
            const discountAmount = (subtotal * safeNum(discountPercent)) / 100;
            const lineTotal = subtotal + taxAmount - discountAmount;

            return (
              <tr key={sale.id} className="border text-center">
                <td className="border px-3 py-2">{index + 1}</td>
                <td className="border px-3 py-2">{sale.ownRefNo}</td>
                <td className="border px-3 py-2">{sale.productCode}</td>
                <td className="border px-3 py-2">{sale.product}</td>
                <td className="border px-3 py-2">{sale.serialNo}</td>
                <td className="border px-3 py-2">{sale.packDetails}</td>
                <td className="border px-3 py-2">{safeNum(sale.packQty).toFixed(2)}</td>
                <td className="border px-3 py-2">{sale.unit}</td>
                <td className="border px-3 py-2">{safeNum(sale.qty).toFixed(4)}</td>
                <td className="border px-3 py-2">{safeNum(sale.focQty)}</td>
                <td className="border px-3 py-2">{safeNum(sale.price).toFixed(2)}</td>
                <td className="border px-3 py-2">{safeNum(discountPercent).toFixed(2)}</td>
                <td className="border px-3 py-2">{safeNum(discountAmount).toFixed(2)}</td>
                <td className="border px-3 py-2">{safeNum(subtotal).toFixed(2)}</td>
                <td className="border px-3 py-2">{safeNum(sale.tax).toFixed(2)}</td>
                <td className="border px-3 py-2">{safeNum(taxAmount).toFixed(2)}</td>
                <td className="border px-3 py-2">{safeNum(lineTotal).toFixed(2)}</td>
                <td className="border px-3 py-2">
                  <button className="bg-red-500 hover:bg-red-700 text-white px-3 py-1 rounded" onClick={() => deleteRow(sale.id)}>
                    🗑️
                  </button>
                </td>
              </tr>
            );
          })}
        {/* Totals Row */}
        <tr className="bg-gray-200 font-bold text-center">
            <td colSpan="8" className="border px-3 py-2">Totals:</td>
            <td className="border px-3 py-2">{totalQty.toFixed(4)}</td>
            <td colSpan="3"></td>
            <td className="border px-3 py-2">{totalDiscount.toFixed(2)}</td>
            <td className="border px-3 py-2">{totalSubtotal.toFixed(2)}</td>
            <td></td>
            <td className="border px-3 py-2">{totalTax.toFixed(2)}</td>
            <td className="border px-3 py-2">{totalLineTotal.toFixed(2)}</td>
            <td></td>
          </tr>
        </tbody>
      </table>
      
      {/* Sales Terms Section */}
      <div className="mt-6 p-4 bg-gray-100 rounded-lg flex justify-between items-start">

        {/* Left Section - Remarks Input */}
        <div className="w-1/3 p-4 bg-white border border-gray-300 rounded-lg">
          <label className="block font-semibold mb-2">Sales Terms</label>
          <textarea
            className="w-full h-20 border border-gray-300 rounded p-2"
            placeholder="Enter remarks here..."
          ></textarea>
        </div>

        {/* Middle Section - Paid Amount & Balance */}
        <div className="w-[28%] flex flex-col space-y-2">
          <div className="flex items-center">
            <label className="w-2/3 font-semibold">Paid Amount:</label>
            <input
              type="number"
              value={paidAmount}
              onChange={(e) => setPaidAmount(Number(e.target.value))}
              className="w-1/3 text-right border border-gray-400 p-2 rounded bg-gray-100"
            />
          </div>

          <div className="flex items-center">
            <label className="w-2/3 font-semibold">Balance Amount:</label>
            <input
              type="number"
              value={balanceAmount}
              readOnly
              className="w-1/3 text-right border border-gray-400 p-2 rounded bg-gray-100"
            />
          </div>

          {/* Checkbox Option (Format2) */}
          <div className="flex items-center space-x-2 mt-2">
            <input type="checkbox" id="format2" className="w-4 h-4" />
            <label htmlFor="format2" className="text-sm">Format2</label>
          </div>
        </div>

        {/* Right Section - Total Calculations */}
        <div className="w-1/3 p-4 bg-white border border-gray-300 rounded-lg">
          <div className="flex justify-between mb-1">
            <span className="font-semibold">Total Amount:</span>
            <span className="text-red-600">{totalSubtotal.toFixed(2)}</span>
          </div>

          {/* Discount % and Amount */}
          <div className="flex items-center mb-1">
            <label className="font-semibold w-1/3">Discount Amt:</label>
            <input
              type="number"
              value={discountPercent}
              onChange={(e) => setDiscountPercent(Number(e.target.value))}
              className="w-1/3 text-right border border-gray-400 p-1 ml-10 rounded bg-gray-100"
            />
            <span className="text-red-600 ml-6">{totalDiscount.toFixed(2)}</span>
          </div>

          <div className="flex justify-between mb-1">
            <span className="font-semibold">Sub Total Amt:</span>
            <span className="text-red-600">{totalSubtotal.toFixed(2)}</span>
          </div>

          {/* Tax Selection */}
          <div className="flex items-center mb-1">
            <label className="font-semibold w-1/2">Tax:</label>
            <select
              value={taxRate}
              onChange={(e) => setTaxRate(Number(e.target.value))}
              className="w-1/3 text-right border border-gray-400 p-1 rounded bg-gray-100"
            >
              <option value="5">5.00%</option>
              <option value="10">10.00%</option>
            </select>
            <span className="text-red-600 ml-2">{totalTax.toFixed(2)}</span>
          </div>

          <div className="flex justify-between mb-1">
            <span className="font-semibold">Round Off:</span>
            <span className="text-red-600">0.0000</span>
          </div>
          <div className="flex justify-between mb-1">
            <span className="font-semibold">Commission Amt:</span>
            <span className="text-red-600">0.0000</span>
          </div>
          <div className="flex justify-between text-lg font-bold mt-2">
            <span>Net Amount:</span>
            <span className="text-red-600">{totalLineTotal.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Buttons Section */}
      <div className="flex justify-center gap-3 mt-6">
        <button onClick={handleCancel} className="bg-gray-600 hover:bg-red-700 text-white px-4 py-2 rounded flex items-center gap-2">
          ❌ Cancel
        </button>
        <button onClick={handleUnPost} className="border border-red-600 text-red-600 px-4 py-2 rounded flex items-center gap-2">
          🔄 UnPost
        </button>
        <button onClick={handleNew} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded flex items-center gap-2">
          📄 New
        </button>
        <button onClick={handlePost} className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded flex items-center gap-2">
          📤 Post
        </button>
        <button onClick={handleDoPrint} className="bg-blue-800 hover:bg-blue-900 text-white px-4 py-2 rounded flex items-center gap-2">
          🖨️ DO Print
        </button>
        <button onClick={handlePrint} className="bg-blue-900 hover:bg-gray-900 text-white px-4 py-2 rounded flex items-center gap-2">
          🖨️ Print
        </button>
        <button onClick={handleUpdate} className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded flex items-center gap-2">
          💾 Update
        </button>
      </div>

    </div>
  );
}

export default SalesTable;
