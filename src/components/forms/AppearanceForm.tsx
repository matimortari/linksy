export default function AppearanceForm({ settings, setSettings }) {
	const handleColorChange = (key: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
		setSettings((prev: any) => ({ ...prev, [key]: e.target.value }))
	}

	const handleRadioChange = (key: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
		setSettings((prev: any) => ({ ...prev, [key]: e.target.value }))
	}

	const handleCheckboxChange = (key: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
		setSettings((prev: any) => ({ ...prev, [key]: e.target.checked }))
	}

	// TODO - Handle form submit for updating appearance

	// TODO - Handle reset to default appearance

	return <div>AppearanceForm</div>
}
