export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01'

export const dataset = assertValue(
  process.env.NEXT_PUBLIC_SANITY_DATASET,
  'Missing environment variable: NEXT_PUBLIC_SANITY_DATASET'
)

export const projectId = assertValue(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  'Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID'
)

export const token = assertValue(
  "skrVHiY9xxlnbv7KKWG8Lo8YARmGjC2CNNkJtoY3HFb0eMlhKJArpdo7ECuKWdH7QK8xZx0MktuVYOkcOwtqBINKARSzxcWNFG81TzeA6vucBNgkTaoMFgLF2nIT4mAriaNrkm32jd9qGCjhio7jIbIbM4uR4blaT223EzNajLLpahjbkIde",
  'Missing environment variable:NEXT_PUBLIC_SANITY_API_TOKEN'
)



function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    throw new Error(errorMessage)
  }

  return v
}
