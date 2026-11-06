const API_URL = window.API_URL || "http://localhost:8081";

async function requisicaoAPI(endpoint, opcoes = {}) {
    return fetch(`${API_URL}${endpoint}`, {
        ...opcoes,
        headers: {
            "Content-Type": "application/json",
            ...opcoes.headers
        }
    });
}