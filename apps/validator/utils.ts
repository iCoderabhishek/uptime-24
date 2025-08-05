interface LocationData {
    country: string;
    region: string;
    city: string;
    postal: string;
    ip: string;
}

async function getPublicIP(): Promise<string> {
  const res = await fetch("https://api.ipify.org?format=json");
  const json = await res.json() as LocationData;
  return json.ip;
}

export { getPublicIP };