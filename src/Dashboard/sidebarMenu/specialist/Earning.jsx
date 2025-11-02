"use client"

import React from 'react';
import { IoCard } from 'react-icons/io5';
import { RiBankLine } from 'react-icons/ri';

export default function Earning() {
  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Title */}
      <h1 className="text-3xl font-semibold text-gray-900 mb-6">Earnings</h1>

      {/* Total Balance Card */}
      <div className="bg-red-100 p-6 rounded-xl flex items-center justify-between mb-6">
        <div className="flex items-center">
          <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
            {/* Wallet Icon (Add icon if needed) */}
            <span className="text-2xl text-red-600"><IoCard /></span>
          </div>
          <div className="ml-4">
            <h2 className="text-lg font-medium text-gray-700">Total Balance</h2>
            <p className="text-xl font-bold text-gray-800">$1200</p>
          </div>
        </div>
        <button className="bg-red-600 text-white py-2 px-6 rounded-lg hover:bg-red-700 transition-colors">
          Withdraw Balance
        </button>
      </div>

      {/* Recent Withdrawals */}
      <div className="bg-white rounded-lg border border-gray-100 p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Recent Withdrawals</h3>
        <div className="space-y-4">
          {[
            { amount: "$150", bank: "Bank of America", date: "May 6, 2025" },
            { amount: "$150", bank: "Bank of America", date: "May 6, 2025" },
            { amount: "$150", bank: "Bank of America", date: "May 6, 2025" },
            { amount: "$150", bank: "Bank of America", date: "May 6, 2025" }
          ].map((withdrawal, index) => (
            <div key={index} className="flex justify-between items-center text-gray-700">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-red-50 rounded-full flex items-center justify-center mr-4">
                  <span className="text-xl text-red-600"><RiBankLine /></span>
                </div>
                <div>
                  <p className="font-medium">{withdrawal.bank}</p>
                  <p className="text-sm text-gray-500">{withdrawal.date}</p>
                </div>
              </div>
              <p className="font-bold text-gray-800">{withdrawal.amount}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
