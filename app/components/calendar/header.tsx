import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { ViewType } from "./types";
import { formatDate, formatMonthYear } from "./utils";

interface CalendarHeaderProps {
	currentDate: Date;
	view: ViewType;
	onNavigate: (direction: "prev" | "next") => void;
	onViewChange: (view: ViewType) => void;
	onAddEvent: () => void;
}

export function CalendarHeader({
	currentDate,
	view,
	onNavigate,
	onViewChange,
	onAddEvent,
}: CalendarHeaderProps) {
	return (
		<div className="flex-shrink-0 p-4 md:p-6 pb-2 md:pb-6 bg-white border-b border-gray-200">
			<div className="flex flex-col sm:flex-row items-start sm:items-center justify-end gap-4">
				<Button size="lg" className="w-full sm:w-auto" onClick={onAddEvent}>
					<Plus className="h-4 w-4 mr-2" />
					<span>Nouveau post</span>
				</Button>
			</div>

			<div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-4">
				<div className="flex items-center gap-2 md:gap-4">
					<div className="flex items-center gap-1 md:gap-2">
						<Button
							variant="outline"
							size="sm"
							onClick={() => onNavigate("prev")}
						>
							<ChevronLeft className="h-4 w-4" />
						</Button>
						<Button
							variant="outline"
							size="sm"
							onClick={() => onNavigate("next")}
						>
							<ChevronRight className="h-4 w-4" />
						</Button>
					</div>

					<h2 className="text-base md:text-xl font-semibold">
						{view === "month"
							? formatMonthYear(currentDate)
							: formatDate(currentDate)}
					</h2>
				</div>

				<div className="flex gap-1 md:gap-2 w-full sm:w-auto">
					<Button
						variant={view === "month" ? "outline" : "secondary"}
						size="sm"
						onClick={() => onViewChange("month")}
						className="flex-1 sm:flex-none"
					>
						Mois
					</Button>
					<Button
						variant={view === "week" ? "outline" : "secondary"}
						size="sm"
						onClick={() => onViewChange("week")}
						className="flex-1 sm:flex-none"
					>
						Semaine
					</Button>
					<Button
						variant={view === "day" ? "outline" : "secondary"}
						size="sm"
						onClick={() => onViewChange("day")}
						className="flex-1 sm:flex-none"
					>
						Jour
					</Button>
				</div>
			</div>
		</div>
	);
}
