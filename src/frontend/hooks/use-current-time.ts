import { DateTime } from "luxon";
import { useEffect, useState } from "react";

export function useCurrentTime() {
	const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

	const [currentTime, setCurrentTime] = useState(() =>
		DateTime.now().setZone(timeZone)
	);

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentTime(DateTime.now().setZone(timeZone));
		}, 1000);

		return () => clearInterval(interval);
	}, [timeZone]);

	return currentTime;
}
