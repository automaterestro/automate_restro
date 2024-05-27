import Link from "next/link";

export default function Header() {
    return <>
   <ul className="flex gap-4 items-center justify-center">
        <li className="hover:text-red-500"><Link href='/manager'>Manager</Link></li>
        <li className="hover:text-red-500"><Link href='/kitchen'>Kitchen</Link></li>
        <li className="hover:text-red-500"><Link href='/table'>Table</Link></li>
        <li className="hover:text-red-500"><Link href='/waiter'>Waiter</Link></li>
        <li className="hover:text-red-500"><Link href='/'>Login/Signup</Link></li>
      </ul>
    </>
}