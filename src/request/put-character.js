export async function putCharacter(newInfo, id) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    const authToken = `Bearer ${localStorage.getItem('token')}`;
    headers.append('Authorization', authToken);

    const response = await fetch('http://192.168.100.13:3010/api/characters/' + id, {
        method: 'PUT',
        headers,
        body: JSON.stringify(newInfo)
    });
    const data = await response.json();
    return data;
}
