
export default async function LoginFetch ({cedula}){

    const res = await fetch("http://localhost:5000/cliente/login", {
      method: "POST",
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ cedula }), // Enviar como "cedula"
    });

    const data = await res.json();

    if (res.ok) {
     data.message

    } else {
      data.message
    }

    return {res}
}