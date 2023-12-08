async function getData(reference, edition) {
    const baseUrl = process.env.BASE_URL;
    const url = `${baseUrl}/ayah/${reference}/${edition}`;
    const res = await fetch(url);

    if (!res.ok) {
        throw new Error('Failed to fetch verse');
    }

    return res.json();
}

export { getData };

