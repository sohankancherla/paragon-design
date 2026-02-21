import { useEffect, useState } from "react";

export function useUserTimezone(fallback = "UTC") {
	const [timezone, setTimezone] = useState(fallback);

	useEffect(() => {
		setTimezone(Intl.DateTimeFormat().resolvedOptions().timeZone);
	}, []);

	return timezone;
}
