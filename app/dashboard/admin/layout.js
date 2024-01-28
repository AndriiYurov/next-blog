import Link from "next/link";
export default function AdminLayout({ children }) {
 return (
 <>
 <nav className="nav justify-content-center">
 <Link className="nav-link" href="/dashboard/admin">
 Admin
 </Link>
 <Link className="nav-link" href="/dashboard/admin/blog/create">
 Create Blog
 </Link>
 <Link className="nav-link" href="/dashboard/admin/blog/list">
 Blogs List
 </Link>
 </nav>
 {children}
 </>
 );
}