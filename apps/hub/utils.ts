export interface LocationData {
    country: string;
    region: string;
    city: string;
    postal: string;
}

async function getLocationFromIP(ip: string): Promise<string> {
  try {
    const res = await fetch(`https://ipinfo.io/${ip}/json`);
    const data = await res.json() as LocationData
    return `${data.city}, ${data.region}, ${data.country}`; // Or just data.country if you prefer
  } catch (error) {
    console.error("Failed to get location:", error);
    return 'unknown';
  }
}

export { getLocationFromIP };