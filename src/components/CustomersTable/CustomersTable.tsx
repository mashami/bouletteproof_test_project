"use client"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { CustomerType } from "@/utils/types";
import { useState } from "react";
import { ArrowLeftSvg, ArrowRightSvg, CloseSvg, SearchSvg } from "../Svg";
import { Button } from "../ui/button";

interface CustomersTableProps {
  customers: CustomerType[];
}

const CustomersTable = ({ customers: customerData }: CustomersTableProps) => {
  const [searchTerm, setSearchTerm] = useState<string>(""); 
  const [currentPage, setCurrentPage] = useState<number>(1); 
  const customersPerPage = 10;

  // Filter customers based on search term
  const filteredCustomers = customerData.filter(
    (customer) =>
      customer.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Reset page to 1 when search term changes
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  // Calculate the total number of pages based on filtered results
  const totalPages = Math.ceil(filteredCustomers.length / customersPerPage);

  // Calculate the customers to show on the current page (after filtering)
  const currentCustomers = filteredCustomers.slice(
    (currentPage - 1) * customersPerPage,
    currentPage * customersPerPage
  );

  // Handle next page click
  const nextHandle = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  // Handle previous page click
  const previousHandle = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-end justify-end">
        <div
          className="flex items-center justify-between p-2 w-[356px] rounded-md border"
          style={{
            borderColor: "rgba(75, 192, 192, 1)"
          }}
        >
          <SearchSvg />
          <input
            type="text"
            className="flex flex-1 px-2 outline-none bg-transparent"
            value={searchTerm}
            onChange={handleSearch} // Handle search input change
            placeholder="Search a name or email"
          />
          <CloseSvg onClick={() => setSearchTerm("")} className="cursor-pointer" />
        </div>
      </div>

      {currentCustomers.length > 0 ? (
        <div className="py-0">
          <Table className="w-full">
            <TableHeader className="w-full">
              <TableRow className="text-[#475467] text-[14px] leading-5">
                <TableHead className="text-[#475467] text-[14px] leading-5">No</TableHead>
                <TableHead className="text-[#475467] text-[14px] leading-5">
                  Customer Name
                </TableHead>
                <TableHead className="text-[#475467] text-[14px] leading-5">Email</TableHead>
                <TableHead className="text-[#475467] text-[14px] leading-5">Signup Date</TableHead>
                <TableHead className="text-[#475467] text-[14px] leading-5">Last Activity</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="w-full">
              {currentCustomers.map((customer, index) => (
                <TableRow
                  key={customer.id}
                  className=" text-[#475467] text-[14px] font-normal leading-5"
                >
                  <TableCell className="">
                    {(currentPage - 1) * customersPerPage + index + 1}
                  </TableCell>
                  <TableCell className="">{customer.customer_name}</TableCell>
                  <TableCell className="flex items-center space-x-2">{customer.email}</TableCell>
                  <TableCell>{customer.signup_date}</TableCell>
                  <TableCell>{customer.last_activity}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div className="w-full border-[#EAECF0] border-[1px] flex items-center justify-between pt-[10px] pb-[13px] rounded-b-md px-5">
            <Button
              className="flex items-center gap-[6.5px] border-[0.823px] border-[#EAECF0] rounded-[6.5px] px-[11.5px] py-[4px] text-[11.4px] text-[#344054] font-semibold leading-[16.462px] cursor-pointer bg-white hover:bg-white/80"
              text="Previous"
              svg={<ArrowLeftSvg />}
              onClick={previousHandle}
              disabled={currentPage === 1} // Disable if it's the first page
            />
            <Button
              className={cn(
                "flex items-center gap-[6.5px] border-[0.823px] border-[#EAECF0] rounded-[6.5px] px-[11.5px] py-[4px] text-[11.4px] text-[#344054] font-semibold leading-[16.462px] cursor-pointer bg-white hover:bg-white/80"
              )}
              text="Next"
              svg={<ArrowRightSvg />}
              onClick={nextHandle}
              disabled={currentPage === totalPages || totalPages === 0} // Disable if it's the last page
            />
          </div>
        </div>
      ) : (
        <p>No Customers Yet</p>
      )}
    </div>
  );
};

export default CustomersTable;
