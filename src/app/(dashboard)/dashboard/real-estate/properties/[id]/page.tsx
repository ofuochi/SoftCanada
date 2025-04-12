import PropertyForm from "@/components/dashboard/advisor/add-property";
import auth0 from "@/lib/auth0";
import { Button, Result } from "antd";

export default async function PropertyPage({
  params,
}: {
  params: { id: string };
}) {
  const isEditMode = !!params.id;
  let propertyData = null;

  if (isEditMode) {
    try {
      propertyData = await fetchPropertyById(params.id);

      if (!propertyData) {
        return (
          <Result
            status="500"
            title="Error Occurred"
            subTitle="Sorry, something went wrong."
            extra={
              <Button
                loading={!!propertyData}
                onClick={() => fetchPropertyById(params.id)}
                type="primary"
              >
                Refresh
              </Button>
            }
          />
        );
      }
    } catch (error) {
      return (
        <Result
          status="500"
          title="Error Occurred"
          subTitle="Sorry, something went wrong."
          extra={
            <Button
              loading={!!propertyData}
              onClick={() => fetchPropertyById(params.id)}
              type="primary"
            >
              Refresh
            </Button>
          }
        />
      );
    }
  }

  return (
    <>
      <PropertyForm propertyData={propertyData} />
    </>
  );
}

// Server-side data fetching function
async function fetchPropertyById(id: string) {
  const BASE_URL =
    process.env.NEXT_PUBLIC_API_BASE_URL ||
    process.env.API_BASE_URL ||
    "https://softcanada-api-cqarcuhpc9chc5cp.canadacentral-01.azurewebsites.net";

  const session = await auth0.getSession();
  const accessToken = session?.tokenSet.accessToken;

  if (!accessToken) {
    throw new Error("Not authenticated");
  }

  try {
    const response = await fetch(
      `${BASE_URL}/api/RealEstate/properties/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        cache: "no-store",
      }
    );

    if (!response.ok) {
      if (response.status === 404) {
        return null; // Will trigger Result component
      }
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Failed to fetch property data:", error);
    throw error;
  }
}

