export const VERCEL_API_URL = "https://api.vercel.com/v9/projects";

export interface VercelDomainResponse {
  name: string;
  apexName: string;
  projectId: string;
  redirect?: string | null;
  redirectStatusCode?: number | null;
  gitBranch?: string | null;
  updatedAt?: number;
  createdAt?: number;
  verified: boolean;
  verification?: {
    type: string;
    domain: string;
    value: string;
    reason: string;
  }[];
}

export interface VercelConfigResponse {
  configuredBy?: string;
  acceptedChallenges?: string[];
  misconfigured: boolean;
}

export interface VercelDomainVerificationResponse {
  domain: VercelDomainResponse;
  config: VercelConfigResponse;
}

export const addDomainToVercel = async (domain: string) => {
  if (!process.env.VERCEL_API_TOKEN) throw new Error("VERCEL_API_TOKEN is not set");
  if (!process.env.VERCEL_PROJECT_ID) throw new Error("VERCEL_PROJECT_ID is not set");

  const response = await fetch(
    `${VERCEL_API_URL}/${process.env.VERCEL_PROJECT_ID}/domains${
      process.env.VERCEL_TEAM_ID ? `?teamId=${process.env.VERCEL_TEAM_ID}` : ""
    }`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.VERCEL_API_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: domain }),
      cache: 'no-store',
    }
  );

  const data = await response.json();
  if (data.error) {
    throw new Error(data.error.message);
  }
  return data as VercelDomainResponse;
};

export const removeDomainFromVercel = async (domain: string) => {
  if (!process.env.VERCEL_API_TOKEN) throw new Error("VERCEL_API_TOKEN is not set");
  if (!process.env.VERCEL_PROJECT_ID) throw new Error("VERCEL_PROJECT_ID is not set");

  const response = await fetch(
    `${VERCEL_API_URL}/${process.env.VERCEL_PROJECT_ID}/domains/${domain}${
      process.env.VERCEL_TEAM_ID ? `?teamId=${process.env.VERCEL_TEAM_ID}` : ""
    }`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${process.env.VERCEL_API_TOKEN}`,
      },
      cache: 'no-store',
    }
  );

  const data = await response.json();
  if (data.error) {
    throw new Error(data.error.message);
  }
  return data;
};

export const getDomainResponse = async (domain: string) => {
  if (!process.env.VERCEL_API_TOKEN) throw new Error("VERCEL_API_TOKEN is not set");
  if (!process.env.VERCEL_PROJECT_ID) throw new Error("VERCEL_PROJECT_ID is not set");

  const response = await fetch(
    `${VERCEL_API_URL}/${process.env.VERCEL_PROJECT_ID}/domains/${domain}${
      process.env.VERCEL_TEAM_ID ? `?teamId=${process.env.VERCEL_TEAM_ID}` : ""
    }`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.VERCEL_API_TOKEN}`,
      },
      cache: 'no-store',
    }
  );

  const data = await response.json();
  if (data.error) {
    throw new Error(data.error.message);
  }
  return data as VercelDomainResponse;
};

export const getConfigResponse = async (domain: string) => {
  if (!process.env.VERCEL_API_TOKEN) throw new Error("VERCEL_API_TOKEN is not set");
  if (!process.env.VERCEL_PROJECT_ID) throw new Error("VERCEL_PROJECT_ID is not set");

  const response = await fetch(
    `${VERCEL_API_URL}/${process.env.VERCEL_PROJECT_ID}/domains/${domain}/config${
      process.env.VERCEL_TEAM_ID ? `?teamId=${process.env.VERCEL_TEAM_ID}` : ""
    }`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.VERCEL_API_TOKEN}`,
      },
      cache: 'no-store',
    }
  );

  const data = await response.json();
  if (data.error) {
    throw new Error(data.error.message);
  }
  return data as VercelConfigResponse;
};

export const verifyDomain = async (domain: string) => {
  if (!process.env.VERCEL_API_TOKEN) throw new Error("VERCEL_API_TOKEN is not set");
  if (!process.env.VERCEL_PROJECT_ID) throw new Error("VERCEL_PROJECT_ID is not set");

  const response = await fetch(
    `${VERCEL_API_URL}/${process.env.VERCEL_PROJECT_ID}/domains/${domain}/verify${
      process.env.VERCEL_TEAM_ID ? `?teamId=${process.env.VERCEL_TEAM_ID}` : ""
    }`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.VERCEL_API_TOKEN}`,
      },
      cache: 'no-store',
    }
  );

  const data = await response.json();
  if (data.error) {
    throw new Error(data.error.message);
  }
  return data as VercelDomainResponse;
};
