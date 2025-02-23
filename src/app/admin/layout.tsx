import AdminNavBar from "@/features/admin/components/navbar";

interface AdminLayoutProps {
    children: React.ReactNode;
}

export default function AdminLayout({children}: AdminLayoutProps) {
    return (
        <div>
            <AdminNavBar />
            {children}
        </div>
    );
}