const backendUrl = "https://TUA_API_BACKEND.vercel.app";

async function depositar() {
    let amount = prompt("Quanto queres depositar? (€)");

    if (amount && amount > 0) {
        const response = await fetch(`${backendUrl}/pay`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ amount, currency: "eur" })
        });

        const data = await response.json();
        if (data.clientSecret) {
            const stripe = Stripe("TUA_PUBLIC_STRIPE_KEY");
            stripe.redirectToCheckout({ sessionId: data.clientSecret });
        }
    }
}

async function atualizarSaldo() {
    const response = await fetch(`${backendUrl}/saldo`);
    const data = await response.json();
    document.getElementById("saldo").innerText = data.saldo + "€";
}

function playSlots() {
    let symbols = ["🍒", "🍋", "🔔", "⭐", "🍉"];
    let result = [
        symbols[Math.floor(Math.random() * symbols.length)],
        symbols[Math.floor(Math.random() * symbols.length)],
        symbols[Math.floor(Math.random() * symbols.length)]
    ];
    document.getElementById("slots").innerText = result.join(" ");
    if (result[0] === result[1] && result[1] === result[2]) {
        document.getElementById("result").innerText = "🎉 GANHASTE 10€! 🎉";
    } else {
        document.getElementById("result").innerText = "❌ Tenta outra vez!";
    }
}

atualizarSaldo();
