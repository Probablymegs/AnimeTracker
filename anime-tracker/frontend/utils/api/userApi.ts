import { baseUrl } from "../apiUrl";

const login = async (email: string, password: string) => {
    let response = await fetch(`${baseUrl}/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email, password: password }),
    });

    if (response.ok) {
        let data: any = await response.json();
        return data.token;
    } else {
        const errorBody = await response.text();
        try {
            const errorData = JSON.parse(errorBody);

            throw { status: response.status, error: errorData };
        } catch {
            throw { status: response.status, error: errorBody };
        }
    }
};

const register = async (email: string, password: string) => {
    let response = await fetch(`${baseUrl}/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email, password: password }),
    });

    if (response.ok) {
        let data: any = await response.json();
        return data.token;
    } else {
        const errorBody = await response.text();
        try {
            const errorData = JSON.parse(errorBody);

            throw { status: response.status, error: errorData };
        } catch {
            throw { status: response.status, error: errorBody };
        }
    }
};

const logout = async (token: string) => {
    await fetch(`${baseUrl}/logout`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    });
};

const verifyAuth = async (token: string) => {
    let response = await fetch(`${baseUrl}/verifyAuth`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    });

    if (response.ok) {
        return true;
    } else {
        return false;
    }
};

export { login, logout, register, verifyAuth };
