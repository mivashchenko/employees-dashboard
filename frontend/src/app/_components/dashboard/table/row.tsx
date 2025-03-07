import {TableCell, TableRow} from "@/components/ui/table";
import {Badge} from "@/components/ui/badge";
import Link from "next/link";
import {Message} from "@/stores/messages-store";
import {CSSProperties} from "react";

interface DashboardRecentMessagesProps {
  message: Message;
  style: CSSProperties;
}

export const DashboardTableRow = ({message, style}: DashboardRecentMessagesProps) => {
  const date = new Date(message.timestamp);

  const humanReadable = date.toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  return <TableRow key={message.id} style={style}>
    <TableCell>
      <div className='font-medium'>{message.user}</div>
    </TableCell>
    <TableCell>
      <div className='font-medium'>{message.email}</div>
    </TableCell>
    <TableCell className=''>
      {message.content}
    </TableCell>
    <TableCell className=''>
      {humanReadable}
    </TableCell>
    <TableCell className=''>
      <Badge className='text-xs' variant='outline'>
        {message.severity}
      </Badge>
    </TableCell>
    <TableCell className='text-right'>
      <Link href='#'>
        View
      </Link>
    </TableCell>
  </TableRow>
}