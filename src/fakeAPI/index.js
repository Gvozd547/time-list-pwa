export function getData(url) {
    return new Promise((resolve, reject) => {
        setTimeout(async () => {
            try {
                let response = await fetch(url);
                if (response.ok) { // если HTTP-статус в диапазоне 200-299
                    // получаем тело ответа (см. про этот метод ниже)
                    const data = await response.json();
                    resolve(data);
                }
            } catch(err) {
                reject(err);
            }
        }, 300);
    })
}