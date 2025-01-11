// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function Dialog({ isOpen, onClose, title, children }) {
	if (!isOpen) return null

	return (
		<div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50">
			<div className="popover w-96 max-w-full">
				{title && <h2 className="mb-4 text-lg font-semibold">{title}</h2>}
				<div className="mb-4">{children}</div>
			</div>
		</div>
	)
}
