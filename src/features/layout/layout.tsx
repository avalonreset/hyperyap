import { Outlet } from '@tanstack/react-router';
import { SidebarProvider, SidebarInset } from '../../components/sidebar';
import { AppSidebar } from './app-sidebar/app-sidebar';
import { Toaster } from '@/components/sonner';

export const Layout = () => {
    return (
        <SidebarProvider defaultOpen={true} className="bg-zinc-900 dark">
            <AppSidebar />
            <SidebarInset className="bg-zinc-900 text-white px-8 pt-8 flex items-center">
                <div className="max-w-[800px] w-full ">
                    <Outlet />
                </div>
            </SidebarInset>
            <Toaster />
        </SidebarProvider>
    );
};
