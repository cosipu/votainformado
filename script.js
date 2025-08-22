// script.js
(() => {
    const DATA_URL = "data/candidatos.json";
    const PLACEHOLDER_IMG = "https://via.placeholder.com/80?text=?";

    // Elementos
    const $candidates = document.getElementById("candidates");
    const $office = document.getElementById("filter-office");
    const $name = document.getElementById("filter-name");
    const $party = document.getElementById("filter-party");
    const $district = document.getElementById("filter-district");
    const $count = document.getElementById("result-count");

    // === NUEVO: Select de comunas ===
    const $comunaWrap = document.createElement("div");
    const $comunaSelect = document.createElement("select");
    const $distritoResult = document.createElement("span");
    $distritoResult.style.marginLeft = "10px";
    $distritoResult.style.fontWeight = "bold";

    
    $comunaWrap.appendChild($distritoResult);
    document.body.prepend($comunaWrap);

    // Mapa de comunas → distrito
    const comunasDistritos = {
        "Arica y toda la Region de Arica y parinacota": "Distrito 1",
        "Iquique y toda la Region de Tarapaca": "Distrito 2",
        "Antofagasta y toda la Region de Antofagasta": "Distrito 3",
        "Copiapó y toda la Region de Atacama": "Distrito 4",
        "La Serena y toda la Region de Coquimbo": "Distrito 5",
        "Cabildo": "Distrito 6",
        "Calle Larga": "Distrito 6",
        "Catemu": "Distrito 6",
        "Hijuelas": "Distrito 6",
        "La calera": "Distrito 6",
        "La cruz": "Distrito 6",
        "La ligua": "Distrito 6",
        "Limache": "Distrito 6",
        "Llay-Llay": "Distrito 6",
        "Nogales": "Distrito 6",
        "Olmue": "Distrito 6",
        "Panquehue": "Distrito 6",
        "Papudo": "Distrito 6",
        "Petorca": "Distrito 6",
        "Puchuncavi": "Distrito 6",
        "Putaendo": "Distrito 6",
        "Quilpue": "Distrito 6",
        "Quintero": "Distrito 6",
        "Rinconada": "Distrito 6",
        "San esteban": "Distrito 6",
        "San felipe": "Distrito 6",
        "Santa maria": "Distrito 6",
        "Villa alemana": "Distrito 6",
        "Zapallar": "Distrito 6",
        "Quillota": "Distrito 6",
        "Los Andes": "Distrito 6",
        "Algarrobo": "Distrito 7",
        "Cartagena": "Distrito 7",
        "Casablanca": "Distrito 7",
        "Concón": "Distrito 7",
        "El Quisco": "Distrito 7",
        "El Tabo": "Distrito 7",
        "Isla de Pascua": "Distrito 7",
        "Juan Fernández": "Distrito 7",
        "San Antonio": "Distrito 7",
        "Santo Domingo": "Distrito 7",
        "Valparaíso": "Distrito 7",
        "Viña del Mar": "Distrito 7",
        "Cerrillos": "Distrito 8",
        "Colina": "Distrito 8",
        "Estación Central": "Distrito 8",
        "Lampa": "Distrito 8",
        "Maipú": "Distrito 8",
        "Tiltil": "Distrito 8",
        "Pudahuel": "Distrito 8",
        "Quilicura": "Distrito 8",
        "Cerro Navia": "Distrito 9",
        "Conchalí": "Distrito 9",
        "Huechuraba": "Distrito 9",
        "Independencia": "Distrito 9",
        "Lo Prado": "Distrito 9",
        "Quinta Normal": "Distrito 9",
        "Recoleta": "Distrito 9",
        "Renca": "Distrito 9",
        "La Granja": "Distrito 10",
        "Macul": "Distrito 10",
        "Ñuñoa": "Distrito 10",
        "Providencia": "Distrito 10",
        "San Joaquín": "Distrito 10",
        "Santiago": "Distrito 10",
        "La Reina": "Distrito 11",
        "Las Condes": "Distrito 11",
        "Lo Barnechea": "Distrito 11",
        "Peñalolén": "Distrito 11",
        "Vitacura": "Distrito 11",
        "La Florida": "Distrito 12",
        "La Pintana": "Distrito 12",
        "Pirque": "Distrito 12",
        "Puente Alto": "Distrito 12",
        "San José de Maipo": "Distrito 12",
        "El Bosque": "Distrito 13",
        "La Cisterna": "Distrito 13",
        "Lo Espejo": "Distrito 13",
        "Pedro Aguirre Cerda": "Distrito 13",
        "San Miguel": "Distrito 13",
        "San Ramón": "Distrito 13",
        "Alhué": "Distrito 14",
        "Buin": "Distrito 14",
        "Calera de Tango": "Distrito 14",
        "Curacaví": "Distrito 14",
        "El Monte": "Distrito 14",
        "Isla de Maipo": "Distrito 14",
        "María Pinto": "Distrito 14",
        "Melipilla": "Distrito 14",
        "Padre Hurtado": "Distrito 14",
        "Paine": "Distrito 14",
        "Peñaflor": "Distrito 14",
        "San Bernardo": "Distrito 14",
        "San Pedro": "Distrito 14",
        "Talagante": "Distrito 14",
        "Codegua": "Distrito 15",
        "Coinco": "Distrito 15",
        "Coltauco": "Distrito 15",
        "Doñihue": "Distrito 15",
        "Graneros": "Distrito 15",
        "Machalí": "Distrito 15",
        "Malloa": "Distrito 15",
        "Mostazal": "Distrito 15",
        "Olivar": "Distrito 15",
        "Quinta de Tilcoco": "Distrito 15",
        "Rancagua": "Distrito 15",
        "Rengo": "Distrito 15",
        "Requínoa": "Distrito 15",
        "Chépica": "Distrito 16",
        "Chimbarongo": "Distrito 16",
        "La Estrella": "Distrito 16",
        "Las Cabras": "Distrito 16",
        "Litueche": "Distrito 16",
        "Lolol": "Distrito 16",
        "Marchigüe": "Distrito 16",
        "Nancagua": "Distrito 16",
        "Navidad": "Distrito 16",
        "Palmilla": "Distrito 16",
        "Paredones": "Distrito 16",
        "Peralillo": "Distrito 16",
        "Peumo": "Distrito 16",
        "Pichidegua": "Distrito 16",
        "Pichilemu": "Distrito 16",
        "Placilla": "Distrito 16",
        "Pumanque": "Distrito 16",
        "San Fernando": "Distrito 16",
        "San Vicente": "Distrito 16",
        "Santa Cruz": "Distrito 16",
        "Constitución": "Distrito 17",
        "Curepto": "Distrito 17",
        "Curicó": "Distrito 17",
        "Empedrado": "Distrito 17",
        "Hualañé": "Distrito 17",
        "Licantén": "Distrito 17",
        "Maule": "Distrito 17",
        "Molina": "Distrito 17",
        "Pelarco": "Distrito 17",
        "Pencahue": "Distrito 17",
        "Rauco": "Distrito 17",
        "Río Claro": "Distrito 17",
        "Romeral": "Distrito 17",
        "Sagrada Familia": "Distrito 17",
        "San Clemente": "Distrito 17",
        "San Rafael": "Distrito 17",
        "Talca": "Distrito 17",
        "Teno": "Distrito 17",
        "Vichuquén": "Distrito 17",
        "Cauquenes": "Distrito 18",
        "Chanco": "Distrito 18",
        "Colbún": "Distrito 18",
        "Linares": "Distrito 18",
        "Longaví": "Distrito 18",
        "Parral": "Distrito 18",
        "Pelluhue": "Distrito 18",
        "Retiro": "Distrito 18",
        "San Javier": "Distrito 18",
        "Villa Alegre": "Distrito 18",
        "Yerbas Buenas": "Distrito 18",
        "Chillán": "Distrito 19",
        "Chillán Viejo": "Distrito 19",
        "Bulnes": "Distrito 19",
        "Coihueco": "Distrito 19",
        "Ñiquén": "Distrito 19",
        "San Carlos": "Distrito 19",
        "San Fabián": "Distrito 19",
        "San Ignacio": "Distrito 19",
        "Quillón": "Distrito 19",
        "Pemuco": "Distrito 19",
        "Cobquecura": "Distrito 19",
        "El Carmen": "Distrito 19",
        "Ninhue": "Distrito 19",
        "Pinto": "Distrito 19",
        "Quirihue": "Distrito 19",
        "Ranquil": "Distrito 19",
        "Treguaco": "Distrito 19",
        "Yungay": "Distrito 19",
        "Chiguayante": "Distrito 20",
        "Concepción": "Distrito 20",
        "Coronel": "Distrito 20",
        "Florida": "Distrito 20",
        "Hualpén": "Distrito 20",
        "Hualqui": "Distrito 20",
        "Penco": "Distrito 20",
        "San Pedro de la Paz": "Distrito 20",
        "Santa Juana": "Distrito 20",
        "Talcahuano": "Distrito 20",
        "Tomé": "Distrito 20",
        "Alto Biobío": "Distrito 21",
        "Antuco": "Distrito 21",
        "Arauco": "Distrito 21",
        "Cañete": "Distrito 21",
        "Contulmó": "Distrito 21",
        "Curanilahue": "Distrito 21",
        "Laja": "Distrito 21",
        "Los Álamos": "Distrito 21",
        "Los Ángeles": "Distrito 21",
        "Lebu": "Distrito 21",
        "Lota": "Distrito 21",
        "Mulchén": "Distrito 21",
        "Nacimiento": "Distrito 21",
        "Negrete": "Distrito 21",
        "Quilaco": "Distrito 21",
        "Quilleco": "Distrito 21",
        "San Rosendo": "Distrito 21",
        "Santa Bárbara": "Distrito 21",
        "Tirúa": "Distrito 21",
        "Tucapel": "Distrito 21",
        "Angol": "Distrito 22",
        "Collipulli": "Distrito 22",
        "Curacautín": "Distrito 22",
        "Ercilla": "Distrito 22",
        "Galvarino": "Distrito 22",
        "Lautaro": "Distrito 22",
        "Lonquimay": "Distrito 22",
        "Los Sauces": "Distrito 22",
        "Melipeuco": "Distrito 22",
        "Perquenco": "Distrito 22",
        "Purén": "Distrito 22",
        "Renaico": "Distrito 22",
        "Traiguén": "Distrito 22",
        "Victoria": "Distrito 22",
        "Vilcún": "Distrito 22",
        "Carahue": "Distrito 23",
        "Cholchol": "Distrito 23",
        "Cunco": "Distrito 23",
        "Curarrehue": "Distrito 23",
        "Freire": "Distrito 23",
        "Gorbea": "Distrito 23",
        "Loncoche": "Distrito 23",
        "Nueva Imperial": "Distrito 23",
        "Padre Las Casas": "Distrito 23",
        "Pitrufquén": "Distrito 23",
        "Pucón": "Distrito 23",
        "Saavedra": "Distrito 23",
        "Temuco": "Distrito 23",
        "Teodoro Schmidt": "Distrito 23",
        "Toltén": "Distrito 23",
        "Villarrica": "Distrito 23",
        "Valdivia": "Distrito 24",
        "Corral": "Distrito 24",
        "Lanco": "Distrito 24",
        "Los Lagos": "Distrito 24",
        "Máfil": "Distrito 24",
        "Mariquina": "Distrito 24",
        "Paillaco": "Distrito 24",
        "Panguipulli": "Distrito 24",
        "La Unión": "Distrito 24",
        "Futrono": "Distrito 24",
        "Lago Ranco": "Distrito 24",
        "Río Bueno": "Distrito 24",
        "Fresia": "Distrito 25",
        "Frutillar": "Distrito 25",
        "Llanquihue": "Distrito 25",
        "Los Muermos": "Distrito 25",
        "Osorno": "Distrito 25",
        "Puerto Octay": "Distrito 25",
        "Puerto Varas": "Distrito 25",
        "Puyehue": "Distrito 25",
        "Purranque": "Distrito 25",
        "Río Negro": "Distrito 25",
        "San Juan de la Costa": "Distrito 25",
        "San Pablo": "Distrito 25",
        "Puerto Montt": "Distrito 26",
        "Castro": "Distrito 26",
        "Ancud": "Distrito 26",
        "Calbuco": "Distrito 26",
        "Chaiten": "Distrito 26",
        "Chonchi": "Distrito 26",
        "Cochamo": "Distrito 26",
        "Curaco de velez": "Distrito 26",
        "Dalcahue": "Distrito 26",
        "Futalefu": "Distrito 26",
        "Hualaihue": "Distrito 26",
        "Maullin": "Distrito 26",
        "Paqueldon": "Distrito 26",
        "Queilen": "Distrito 26",
        "Quellon": "Distrito 26",
        "Quemchi": "Distrito 26",
        "Quinchao": "Distrito 26",
        "Coyhaique y toda la region de aysen": "Distrito 27",
        "Punta Arenas y toda la region de magallanes": "Distrito 28",
    };

    // Llenar select de comunas
    const select = document.getElementById("comunas");
    Object.keys(comunasDistritos).forEach(comuna => {
        const option = document.createElement("option");
        option.value = comuna;
        option.textContent = comuna;
        select.appendChild(option);
    });

    select.addEventListener("change", () => {
        const comuna = select.value;
        const resultado = document.getElementById("resultado-distrito");
        if (comuna && comunasDistritos[comuna]) {
            resultado.textContent = `La comuna ${comuna} pertenece a: ${comunasDistritos[comuna]}`;
        } else {
            resultado.textContent = "";
        }
    });

    let ALL = [];

    // Normalizar string
    const norm = (s) =>
        (s ?? "")
            .toString()
            .trim()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase();

    const getNumber = (s) => {
        const m = (s ?? "").toString().match(/(\d+)/);
        return m ? parseInt(m[1], 10) : Infinity;
    };

    const officeOrder = (o) => {
        const key = norm(o);
        if (key.startsWith("president")) return 1;
        if (key.startsWith("senador") || key.startsWith("senadora")) return 2;
        if (key.startsWith("diputad")) return 3;
        return 9;
    };

    // === CLASIFICACIÓN por partido ===
    function getPosicionPolitica(partido) {
        const p = norm(partido);

        if (p.includes("partido de trabajadores revolucionarios") || p === "ptr" || p.includes("upa") || p === "upa")
            return "Extrema Izquierda";
        if (p.includes("partido comunista") || p === "pc" || p.includes("partido socialista") || p === "ps")
            return "Izquierda";
        if (p.includes("frente amplio") || p === "fa" ||
            p.includes("partido por la democracia") || p === "ppd" ||
            p.includes("partido liberal") || p === "pl" ||
            p.includes("partido radical") || p === "pr" ||
            p.includes("accion humanista") || p === "ah" ||
            p.includes("frente regionalista verde social") || p === "frvs")
            return "Centro Izquierda";
        if (p.includes("democratas") || p === "dem" ||
            p.includes("amarillos por chile") || p === "ama" ||
            p.includes("partido popular") || p === "pop")
            return "Centro";
        if (p.includes("evopoli") || p === "evo" || p.includes("evópoli") ||
            p.includes("democrata cristiano") || p === "dc" || p === "pdc")
            return "Centro Derecha";
        if (p.includes("union democrata independiente") || p === "udi" ||
            p.includes("partido de la gente") || p === "pdg" ||
            p.includes("renovacion nacional") || p === "rn")
            return "Derecha";
        if (p.includes("partido republicano") || p.includes("republicanos") ||
            p.includes("partido social cristiano") || p.includes("social cristiano") ||
            p.includes("partido nacional libertario") || p.includes("libertario"))
            return "Extrema Derecha";

        return "No definido";
    }

    // === Colores según posición ===
    function getPosicionClass(pos) {
        const p = norm(pos);
        if (p.includes("extrema izquierda") || p === "izquierda") return "pos-izquierda"; // rojo
        if (p.includes("centro izquierda") || p === "centro" || p.includes("centro derecha")) return "pos-centro"; // celeste
        if (p.includes("derecha")) return "pos-derecha"; // amarillo
        return "pos-default";
    }

    // Render
    function render(list) {
        if (!$candidates) return;
        $candidates.innerHTML = "";

        if (Array.isArray(list) && list.length) {
            list.forEach((c) => {
                const card = document.createElement("article");
                card.className = "candidate";

                const img = document.createElement("img");
                img.src = c.foto || PLACEHOLDER_IMG;
                img.alt = c.nombre || "Candidato/a";

                const h3 = document.createElement("h3");
                h3.textContent = c.nombre || "Sin nombre";

                const pCargo = document.createElement("p");
                pCargo.innerHTML = `<b>Cargo:</b> ${c.cargo || "—"}`;

                const pPartido = document.createElement("p");
                pPartido.innerHTML = `<b>Partido:</b> ${c.partido || "Independiente"}`;

                const pDistrito = document.createElement("p");
                pDistrito.innerHTML = `<b>Distrito:</b> ${c.distrito || "No especificado"}`;

                const posicion = getPosicionPolitica(c.partido);
                const posDiv = document.createElement("div");
                posDiv.textContent = posicion;
                posDiv.className = `posicion ${getPosicionClass(posicion)}`;

                card.appendChild(img);
                card.appendChild(h3);
                card.appendChild(pCargo);
                card.appendChild(pPartido);
                card.appendChild(pDistrito);
                card.appendChild(posDiv);

                // Posturas políticas (solo si es presidente y tiene posturas)
                if (c.cargo && c.cargo.toLowerCase().includes("presidente") && c.posturas && Object.keys(c.posturas).length) {
                    const posturasDiv = document.createElement("div");
                    posturasDiv.className = "posturas";

                    const title = document.createElement("h4");
                    title.textContent = "Posturas:";
                    posturasDiv.appendChild(title);

                    Object.entries(c.posturas).forEach(([clave, valor]) => {
                        const p = document.createElement("p");
                        p.textContent = `${clave}: ${valor}`;
                        posturasDiv.appendChild(p);
                    });

                    card.appendChild(posturasDiv);
                }


                let vecesElecciones = 0;
                if (Array.isArray(c.elecciones) && c.elecciones.length) {
                    vecesElecciones = c.elecciones.filter(e => e.tipo === "popular").length;
                }
                const elecDiv = document.createElement("div");
                elecDiv.className = "elecciones-info";
                elecDiv.textContent = `Se ha presentado ${vecesElecciones} veces a elecciones populares`;
                card.appendChild(elecDiv);

                if (Array.isArray(c.delitos) && c.delitos.length) {
                    const wrap = document.createElement("div");
                    const title = document.createElement("h4");
                    title.textContent = "Antecedentes:";
                    wrap.appendChild(title);

                    c.delitos.forEach((d) => {
                        const div = document.createElement("div");
                        div.className = "case";

                        if (typeof d === "string") {
                            div.textContent = d;
                        } else {
                            const strong = document.createElement("strong");
                            strong.textContent = d.titulo || "Caso";
                            div.appendChild(strong);

                            if (d.estado) {
                                const estado = document.createTextNode(` - ${d.estado}`);
                                div.appendChild(estado);
                            }

                            if (d.fuente) {
                                const br = document.createElement("br");
                                const a = document.createElement("a");
                                a.href = d.fuente;
                                a.target = "_blank";
                                a.rel = "noopener noreferrer";
                                a.textContent = "Fuente";
                                div.appendChild(br);
                                div.appendChild(a);
                            }
                        }

                        wrap.appendChild(div);
                    });

                    card.appendChild(wrap);
                } else {
                    const p = document.createElement("p");
                    p.textContent = "Sin antecedentes conocidos";
                    card.appendChild(p);
                }

                $candidates.appendChild(card);
            });
        } else {
            const p = document.createElement("p");
            p.textContent = "No se encontraron candidatos.";
            $candidates.appendChild(p);
        }

        if ($count) {
            $count.textContent = `Resultados: ${list?.length ?? 0}`;
        }
    }

    function applyFilters() {
        const fOffice = norm($office?.value || "");
        const fName = norm($name?.value || "");
        const fParty = $party?.value || "";
        const fDistrict = norm($district?.value || "");

        if (!fOffice && !fName && !fParty && !fDistrict) {
            render([]);

            return;
        }

        const filtered = ALL.filter((c) => {
            const byOffice = fOffice ? norm(c.cargo).startsWith(fOffice) : true;
            const byName = fName ? norm(c.nombre).includes(fName) : true;
            const byParty = fParty ? norm(c.partido) === fParty : true;
            const byDistrict = fDistrict ? norm(c.distrito) === fDistrict : true;
            return byOffice && byName && byParty && byDistrict;
        }).sort((a, b) => {
            const oa = officeOrder(a.cargo);
            const ob = officeOrder(b.cargo);
            if (oa !== ob) return oa - ob;

            const da = getNumber(a.distrito);
            const db = getNumber(b.distrito);
            if (da !== db) return da - db;

            return norm(a.nombre).localeCompare(norm(b.nombre));
        });

        render(filtered);
    }

    // Debounce
    let debounceId;
    const debounce = (fn, wait = 200) => {
        clearTimeout(debounceId);
        debounceId = setTimeout(fn, wait);
    };

    function bindEvents() {
        if ($office) $office.addEventListener("change", applyFilters);
        if ($name) $name.addEventListener("input", () => debounce(applyFilters));
        if ($party) $party.addEventListener("change", applyFilters);
        if ($district) $district.addEventListener("change", applyFilters);
    }

    async function load() {
        if (!$candidates) return;
        $candidates.innerHTML = `<p>Cargando…</p>`;

        try {
            const res = await fetch(`${DATA_URL}?v=${Date.now()}`, { cache: "no-store" });
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            const data = await res.json();

            if (!Array.isArray(data)) throw new Error("El JSON no es un arreglo.");
            ALL = data;

            // Generar opciones únicas de partido
            const parties = [...new Set(ALL.map(c => norm(c.partido)))].sort();
            parties.forEach(p => {
                const option = document.createElement("option");
                option.value = p;
                option.textContent = p.charAt(0).toUpperCase() + p.slice(1);
                $party.appendChild(option);
            });

            render([]);
        } catch (err) {
            console.error(err);
            $candidates.innerHTML = `
        <p style="color:#b91c1c">
          No pude cargar <code>${DATA_URL}</code>.<br>
          Revisa que el archivo exista y que estés sirviendo la página con un servidor local.
        </p>
      `;
        }
    }


    bindEvents();
    load();
})();
