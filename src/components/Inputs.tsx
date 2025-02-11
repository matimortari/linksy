export function CheckboxInput({ id, label, checked, onChange }) {
	return (
		<div className="my-4 flex items-center space-x-2">
			<input id={id} type="checkbox" checked={checked} onChange={onChange} />
			<label htmlFor={id} className="text-sm font-semibold">
				{label}
			</label>
		</div>
	)
}

export function ColorInput({ id, label, value, onChange, disabled = false }) {
	return (
		<div className="my-4 flex items-center space-x-2">
			<input id={id} type="color" value={value} onChange={onChange} disabled={disabled} />
			<label htmlFor={id} className={`text-sm font-semibold ${disabled ? "text-muted line-through" : ""}`}>
				{label}
			</label>
		</div>
	)
}

export function SelectInput({ id, label, value, onChange, options }) {
	return (
		<div className="my-4">
			<label htmlFor={id} className="text-sm font-semibold">
				{label}
			</label>
			<select id={id} value={value} onChange={onChange} className="mt-2 block w-full rounded-2xl border p-2 text-sm">
				{options.map((option: any) => (
					<option key={option.value} value={option.value} className="bg-card text-muted-foreground">
						{option.label}
					</option>
				))}
			</select>
		</div>
	)
}

export function RadioOptions({ options, name, value, onChange, label, disabled = false }) {
	return (
		<div className="my-4">
			<p className={`mb-2 text-sm font-semibold ${disabled ? "text-muted line-through" : ""}`}>{label}</p>
			<div className="space-y-1">
				{options.map((option: any) => (
					<label key={option.value} className="flex items-center space-x-2 text-xs">
						<input
							type="radio"
							name={name}
							value={option.value}
							checked={value === option.value}
							onChange={onChange}
							disabled={disabled}
						/>
						<span className={`font-normal ${disabled ? "text-muted line-through" : ""}`}>{option.label}</span>
					</label>
				))}
			</div>
		</div>
	)
}
