import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
function Transactions(props: any) {
  return (
    <div
      style={{ overflow: "auto" }}
      className="w-[55vw] min-w-[600px] h-[32vh] m-h-[400px] shadow-lg bg-white rounded-lg p-4 ml-3"
    >
      <Table>
        <TableCaption>A list of your recent transactions.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Transaction ID</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {props.transactions?.map((transaction: any) => (
            <TableRow key={transaction.id ? transaction.id : transaction}>
              {transaction.id ? (
                <>
                  <TableCell>{transaction.id}</TableCell>
                  <TableCell>{transaction.type}</TableCell>
                  <TableCell>$ {transaction.amount}</TableCell>
                  <TableCell>{transaction.date}</TableCell>
                </>
              ) : (
                <TableCell>{transaction}</TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default Transactions;
