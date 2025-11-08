"use client";

import { GeneralLayoutProps } from "@/types/ui/layouts";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useIsMobile } from "@/hooks/use-mobile";

function AppSidebarClient({ children }: GeneralLayoutProps) {
	const isMobile = useIsMobile();

	if (isMobile) {
		return (
			<div className="flex flex-col w-full">
				<div className="flex items-center gap-1 p-2 border-b">
					<SidebarTrigger />
					<span className="text-xl">WDS Jobs</span>
				</div>

				<div className="flex flex-1">{children}</div>
			</div>
		);
	}

	return children;
}
export default AppSidebarClient;
