"use client";
import NavBar from '@/app/components/NavBar';

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <NavBar />
            {children}
        </div>
    );
}