/**
 * Loading component
 * - covers the entire screen with a loading indicator
 * - content underneath is blurred
 */

interface Props {
	isVisible?: boolean;
	text?: string;
}

export const FullScreenLoader = ({ text, isVisible = false }: Props) => {
	if (!isVisible) {
		return null;
	}
	return (
		<div className="fixed inset-0 z-200 flex items-center justify-center backdrop-blur-xs">
			<div className="flex flex-col items-center gap-2 text-lg text-slate-700">
				<span>{text || ""}</span>
				<span
					className="inline-flex items-center gap-1"
					aria-hidden="true"
				>
					<span className="h-2 w-2 animate-bounce rounded-full bg-slate-700 [animation-delay:0ms]" />
					<span className="h-2 w-2 animate-bounce rounded-full bg-slate-700 [animation-delay:150ms]" />
					<span className="h-2 w-2 animate-bounce rounded-full bg-slate-700 [animation-delay:300ms]" />
				</span>
			</div>
		</div>
	);
};
