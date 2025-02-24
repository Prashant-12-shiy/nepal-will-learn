import AdminNavBar from "@/features/admin/auth/components/navbar";

interface AdminLayoutProps {
    children: React.ReactNode;
}

export default function AdminLayout({children}: AdminLayoutProps) {
    return (
        <div className="mx-2">
            <AdminNavBar />
            {children}
        </div>
    );
}