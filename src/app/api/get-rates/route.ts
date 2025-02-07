// // import { shipengine } from "@/lib/shipengine";
// import { Address, Package } from "@/app/types/types";
// import { NextRequest } from "next/server";

// export async function POST(req: NextRequest) {
//   try {
//     const {
//       shipeToAddress,
//       packages,
//     }: { shipeToAddress: Address; packages: Package[] } = await req.json();

//     if (!shipeToAddress || !packages) {
//       return new Response(
//         JSON.stringify({
//           error: "Missing required fields: shipeToAddress and packages",
//         }),
//         { status: 400 }
//       );
//     }

//     const shipFromAddress: Address = {
//       name: "Osama Bin Nadeem",
//       phone: "+44 255-2229",
//       addressLine1: "546  Avenue",
//       addressLine2: "Apartment Street 2",
//       cityLocality: "Washington",
//       stateProvince: "CA",
//       postalCode: "90761",
//       countryCode: "US",
//       addressResidentialIndicator: "no",
//     };

//     // const shipmentDetails = await shipengine.getRatesWithShipmentDetails({
//     //   shipment: {
//     //     shipTo: shipeToAddress,
//     //     shipFrom: shipFromAddress,
//     //     packages: packages,
//     //   },
//     //   rateOptions: {
//     //     carrierIds: [
//     //       process.env.SHIPENGINE_FIRST_COURIER || "",
//     //       process.env.SHIPENGINE_SECOND_COURIER || "",
//     //       process.env.SHIPENGINE_THIRD_COURIER || "",
//     //       process.env.SHIPENGINE_FOURTH_COURIER || "",
//     //     ].filter(Boolean),
//     //   },
//     // });

//     console.log("Ship To Address:", shipeToAddress);
//     console.log("Packages:", packages);
//     console.log("Shipment Details:", shipmentDetails);

//     return new Response(
//       JSON.stringify({ shipeToAddress, packages, shipmentDetails }),
//       { status: 200 }
//     );
//   } catch (error) {
//     console.log("Error fetching shipping rates:", error)
//     return new Response(JSON.stringify({ error: error }), {
//       status: 500,
//     });
//   }
// }