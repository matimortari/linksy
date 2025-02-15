import { deleteAccount } from "@/src/services/userService"

export default function DeleteAccountForm() {
	const handleDeleteAccount = async () => {
		const confirm = window.confirm("Are you sure you want to delete your account?")
		if (!confirm) return false
		else {
			const response = await deleteAccount()
			if (response.error) {
				alert(response.error)
			} else {
				window.location.href = "/"
			}
		}
	}

	return (
		<>
			<header className="my-2">
				<h2>Delete Account</h2>
				<h6 className="text-danger">This action is irreversible. All data will be lost.</h6>
			</header>

			<div className="input-group">
				<button onClick={handleDeleteAccount} title="Delete Account" className="btn bg-danger">
					Delete Account
				</button>
			</div>
		</>
	)
}
