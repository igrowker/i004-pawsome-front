
const donationsUrl = './db.json'

export const getDonationsData = async () => {
    const data = await fetch(donationsUrl)
    const donationValue = data.json()
    const results = donationValue
    return results
}