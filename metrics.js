<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Métricas</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <script type="module" src="https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js"></script>
    <script type="module" src="https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js"></script>
    <script type="module" src="https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js"></script>
</head>
<body><nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container">
        <a class="navbar-brand" href="#">Sistema de Tickets</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
                <li class="nav-item">
                    <a class="nav-link" href="tickets.html">Tickets</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="new-ticket.html">Nuevo Ticket</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="metrics.html">Métricas</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="admin.html">Administración</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" id="logout-link" href="#">Cerrar Sesión</a>
                </li>
            </ul>
        </div>
    </div>
</nav>
    <div class="container mt-4">
        <h2>Métricas del Sistema de Tickets</h2>
        <div id="metrics-content">
            <p>Cargando métricas...</p>
        </div>
    </div>
    <script type="module">
        // Firebase Configuration and Initialization
        import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
        import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";
        import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js";

        const firebaseConfig = {
            apiKey: "AIzaSyBZFPKo-_sMqKQ_q-B1a1Nje-n7znSRiic",
            authDomain: "tickets-premium.firebaseapp.com",
            projectId: "tickets-premium",
            storageBucket: "tickets-premium.firebasestorage.app",
            messagingSenderId: "839680677649",
            appId: "1:839680677649:web:929385278ed03c647e9eb0"
        };
        const app = initializeApp(firebaseConfig);
        const auth = getAuth(app);
        const db = getFirestore(app);
        const metricsContent = document.getElementById('metrics-content');

        onAuthStateChanged(auth, async (user) => {
            if (user) {
                await loadMetrics();
            } else {
                window.location.href = 'index.html';
            }
        });

        async function loadMetrics() {
            try {
                const ticketsSnapshot = await getDocs(collection(db, "tickets"));
                const usersSnapshot = await getDocs(collection(db, "users"));

                const tickets = ticketsSnapshot.docs.map(doc => doc.data());
                const users = usersSnapshot.docs.map(doc => doc.data());

                const totalTickets = tickets.length;
                const openTickets = tickets.filter(ticket => ticket.status === 'abierto').length;
                const inProgressTickets = tickets.filter(ticket => ticket.status === 'en progreso').length;
                const closedTickets = tickets.filter(ticket => ticket.status === 'cerrado').length;
                const totalUsers = users.length;

                metricsContent.innerHTML = `
                    <p><strong>Total de Tickets:</strong> ${totalTickets}</p>
                    <p><strong>Tickets Abiertos:</strong> ${openTickets}</p>
                    <p><strong>Tickets En Progreso:</strong> ${inProgressTickets}</p>
                    <p><strong>Tickets Cerrados:</strong> ${closedTickets}</p>
                    <p><strong>Total de Usuarios:</strong> ${totalUsers}</p>
                `;
            } catch (error) {
                console.error('Error al cargar las métricas:', error);
                metricsContent.innerHTML = '<p>Error al cargar las métricas.</p>';
            }
        }
    </script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
