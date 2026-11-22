window.r = function() {
    if (window._rOn) {
        if (window._rPanel) window._rPanel.remove();
        window._rOn = false;
        return 'Retard OFF';
    }

    // On crée un petit panneau d'affichage
    var panel = document.createElement('div');
    panel.style.cssText = 'position:fixed; top:10px; left:50%; transform:translateX(-50%); background:rgba(0,0,0,0.8); color:#00ff00; padding:10px; border-radius:5px; z-index:999999; font-family:monospace; font-size:16px; pointer-events:none; text-align:center; border:1px solid #00ff00;';
    panel.innerHTML = '⏳ En attente des données WebSocket...';
    document.body.appendChild(panel);
    window._rPanel = panel;
    window._rOn = true;

    // On intercepte la création de WebSockets
    var OriginalWebSocket = window.WebSocket;
    window.WebSocket = function(url, protocols) {
        var ws = new OriginalWebSocket(url, protocols);
        
        ws.addEventListener('message', function(event) {
            if (!window._rOn) return;
            try {
                // On cherche les données de prix dans les messages (format JSON)
                var data = JSON.parse(event.data.substring(event.data.indexOf('[')));
                if (Array.isArray(data) && data[0] === 'updateStream') {
                    var asset = data[1].asset;
                    var price = data[1].data ? data[1].data[3] : null; // Le prix est souvent à l'index 3
                    
                    if (price) {
                        // On affiche le prix en direct (on pourrait ajouter un délai ici plus tard)
                        panel.innerHTML = '📡 ASSET: ' + asset + '<br>PRIX: <span style="font-size:24px; color:#fff;">' + price + '</span>';
                    }
                }
            } catch(e) {}
        });
        return ws;
    };

    // On remplace aussi les méthodes de création pour les anciens navigateurs
    window.WebSocket.prototype = OriginalWebSocket.prototype;

    return 'Retard ON (Mode WebSocket)';
};
