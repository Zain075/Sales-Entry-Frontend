import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./Components/Header/Header.component";
import Sidebar from "./Components/Sidebar/Sidebar.component";
import Dashboard from "./Pages/Dashboard/Dashboard.component";
import SalesEntry from "./Pages/Sales Entry/SalesEntry.component";
import Footer from "./Components/Footer/Footer.component";
import styles from "./App.module.css"
import SalesList from "./Pages/Sales List/SalesList.component";
import Receipt from "./Pages/Receipt/Receipt.component";



const App = () => (
  <div className={styles.app}>
  <Header />
  <div className={styles.mainContent}>
    <Sidebar />
    <div className={styles.content}>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/sales-entry" element={<SalesEntry />} />
        <Route path="/sales-list" element={<SalesList />} />
        <Route path="/sales-receipt" element={<Receipt />} /> 
      </Routes>
    </div>
  </div>
  <Footer />
</div>
);

export default App;
