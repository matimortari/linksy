export function CheckboxInput({ id, label, checked, onChange }) {
	return (
		<div className="my-2 flex items-center space-x-2">
			<input id={id} type="checkbox" checked={checked} onChange={onChange} />
			<label htmlFor={id} className="font-semibold">
				{label}
			</label>
		</div>
	)
}

export function ColorInput({ id, label, value, onChange, disabled = false }) {
	return (
		<div className="my-2 flex items-center space-x-2">
			<input id={id} type="color" value={value} onChange={onChange} disabled={disabled} />
			<label htmlFor={id} className={`font-semibold ${disabled ? "text-muted line-through" : ""}`}>
				{label}
			</label>
		</div>
	)
}

export function RadioOptions({ options, name, value, onChange, label }) {
	return (
		<div className="my-2">
			<p className="mb-2 font-bold">{label}</p>
			<div className="space-y-1">
				{options.map((option: any) => (
					<label key={option.value} className="flex items-center space-x-2 text-xs">
						<input type="radio" name={name} value={option.value} checked={value === option.value} onChange={onChange} />
						<span className="font-normal">{option.label}</span>
					</label>
				))}
			</div>
		</div>
	)
}
