// ===================================
// Simple Map Solution - Always Works
// ===================================
document.addEventListener('DOMContentLoaded', function() {
    const mapContainer = document.getElementById('map');
    
    if (mapContainer) {
        // Use OpenStreetMap iframe - no API key needed, always works
        mapContainer.innerHTML = `
            <iframe 
                width="100%" 
                height="100%" 
                frameborder="0" 
                scrolling="no" 
                marginheight="0" 
                marginwidth="0" 
                src="https://www.openstreetmap.org/export/embed.html?bbox=10.6269,35.8206,10.6469,35.8306&amp;layer=mapnik&amp;marker=35.8256,10.6369" 
                style="border: none; border-radius: 10px;">
            </iframe>
            <div style="
                position: absolute;
                bottom: 20px;
                left: 50%;
                transform: translateX(-50%);
                background: linear-gradient(135deg, #d4af37, #c9a86a);
                color: white;
                padding: 12px 24px;
                border-radius: 30px;
                font-weight: 700;
                box-shadow: 0 4px 20px rgba(212, 175, 55, 0.4);
                display: flex;
                align-items: center;
                gap: 8px;
                z-index: 1000;
            ">
                <i class="fas fa-coffee"></i>
                Café Bohème - Avenue Habib Bourguiba, Sousse
            </div>
        `;
        
        // Add a click handler to open in new tab
        const mapFrame = mapContainer.querySelector('iframe');
        if (mapFrame) {
            mapContainer.style.position = 'relative';
            
            // Add a link overlay for the address
            const linkOverlay = document.createElement('a');
            linkOverlay.href = 'https://www.openstreetmap.org/?mlat=35.8256&mlon=10.6369#map=16/35.8256/10.6369';
            linkOverlay.target = '_blank';
            linkOverlay.style.cssText = `
                position: absolute;
                top: 20px;
                right: 20px;
                background: white;
                color: #6b4423;
                padding: 10px 20px;
                border-radius: 25px;
                text-decoration: none;
                font-weight: 600;
                box-shadow: 0 4px 15px rgba(0,0,0,0.1);
                display: flex;
                align-items: center;
                gap: 8px;
                transition: all 0.3s ease;
                z-index: 1001;
            `;
            linkOverlay.innerHTML = '<i class="fas fa-external-link-alt"></i> Agrandir';
            linkOverlay.onmouseover = function() {
                this.style.transform = 'scale(1.05)';
                this.style.boxShadow = '0 6px 20px rgba(0,0,0,0.15)';
            };
            linkOverlay.onmouseout = function() {
                this.style.transform = 'scale(1)';
                this.style.boxShadow = '0 4px 15px rgba(0,0,0,0.1)';
            };
            
            mapContainer.appendChild(linkOverlay);
        }
        
        console.log('✅ Map loaded successfully using OpenStreetMap iframe');
    }
});
