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
        "Algarrobo": "Distrito 7",
        "Alhué": "Distrito 14",
        "Alto Biobío": "Distrito 21",
        "Ancud": "Distrito 26",
        "Angol": "Distrito 22",
        "Antofagasta y toda la Region de Antofagasta": "Distrito 3",
        "Antuco": "Distrito 21",
        "Arauco": "Distrito 21",
        "Arica y toda la Region de Arica y parinacota": "Distrito 1",
        "Buín": "Distrito 14",
        "Bulnes": "Distrito 19",
        "Cabildo": "Distrito 6",
        "Calbuco": "Distrito 26",
        "Calera de Tango": "Distrito 14",
        "Calle Larga": "Distrito 6",
        "Carahue": "Distrito 23",
        "Cartagena": "Distrito 7",
        "Casablanca": "Distrito 7",
        "Castro": "Distrito 26",
        "Catemu": "Distrito 6",
        "Cañete": "Distrito 21",
        "Cauquenes": "Distrito 18",
        "Cerrillos": "Distrito 8",
        "Cerro Navia": "Distrito 9",
        "Chaiten": "Distrito 26",
        "Chanco": "Distrito 18",
        "Chépica": "Distrito 16",
        "Chiguayante": "Distrito 20",
        "Chillán": "Distrito 19",
        "Chillán Viejo": "Distrito 19",
        "Chimbarongo": "Distrito 16",
        "Cholchol": "Distrito 23",
        "Chonchi": "Distrito 26",
        "Cobquecura": "Distrito 19",
        "Codegua": "Distrito 15",
        "Coihueco": "Distrito 19",
        "Coinco": "Distrito 15",
        "Colbún": "Distrito 18",
        "Colina": "Distrito 8",
        "Coltauco": "Distrito 15",
        "Collipulli": "Distrito 22",
        "Colina": "Distrito 8",
        "Concón": "Distrito 7",
        "Conchalí": "Distrito 9",
        "Concepción": "Distrito 20",
        "Constitución": "Distrito 17",
        "Contulmó": "Distrito 21",
        "Copiapó y toda la Region de Atacama": "Distrito 4",
        "Coronel": "Distrito 20",
        "Corral": "Distrito 24",
        "Coyhaique y toda la region de aysen": "Distrito 27",
        "Cochamo": "Distrito 26",
        "Curacautín": "Distrito 22",
        "Curacaví": "Distrito 14",
        "Curaco de velez": "Distrito 26",
        "Curarrehue": "Distrito 23",
        "Curepto": "Distrito 17",
        "Curicó": "Distrito 17",
        "Dalcahue": "Distrito 26",
        "Doñihue": "Distrito 15",
        "El Bosque": "Distrito 13",
        "El Carmen": "Distrito 19",
        "El Monte": "Distrito 14",
        "El Quisco": "Distrito 7",
        "El Tabo": "Distrito 7",
        "Empedrado": "Distrito 17",
        "Ercilla": "Distrito 22",
        "Estación Central": "Distrito 8",
        "Florida": "Distrito 20",
        "Freire": "Distrito 23",
        "Fresia": "Distrito 25",
        "Frutillar": "Distrito 25",
        "Futalefu": "Distrito 26",
        "Futrono": "Distrito 24",
        "Galvarino": "Distrito 22",
        "Gorbea": "Distrito 23",
        "Graneros": "Distrito 15",
        "Hijuelas": "Distrito 6",
        "Hualaihue": "Distrito 26",
        "Hualañé": "Distrito 17",
        "Hualpén": "Distrito 20",
        "Hualqui": "Distrito 20",
        "Huechuraba": "Distrito 9",
        "Independencia": "Distrito 9",
        "Iquique y toda la Region de Tarapaca": "Distrito 2",
        "Isla de Maipo": "Distrito 14",
        "Isla de Pascua": "Distrito 7",
        "Juan Fernández": "Distrito 7",
        "La Calera": "Distrito 6",
        "La Cisterna": "Distrito 13",
        "La Cruz": "Distrito 6",
        "La Estrella": "Distrito 16",
        "La Florida": "Distrito 12",
        "La Granja": "Distrito 10",
        "La Ligua": "Distrito 6",
        "La Pintana": "Distrito 12",
        "La Reina": "Distrito 11",
        "La Serena y toda la Region de Coquimbo": "Distrito 5",
        "La Unión": "Distrito 24",
        "Lago Ranco": "Distrito 24",
        "Laja": "Distrito 21",
        "Lampa": "Distrito 8",
        "Lanco": "Distrito 24",
        "Las Cabras": "Distrito 16",
        "Las Condes": "Distrito 11",
        "Lautaro": "Distrito 22",
        "Lebu": "Distrito 21",
        "Licantén": "Distrito 17",
        "Limache": "Distrito 6",
        "Linares": "Distrito 18",
        "Litueche": "Distrito 16",
        "Llanquihue": "Distrito 25",
        "Llay-Llay": "Distrito 6",
        "Lo Barnechea": "Distrito 11",
        "Lo Espejo": "Distrito 13",
        "Lo Prado": "Distrito 9",
        "Lolol": "Distrito 16",
        "Loncoche": "Distrito 23",
        "Longaví": "Distrito 18",
        "Lonquimay": "Distrito 22",
        "Los Álamos": "Distrito 21",
        "Los Andes": "Distrito 6",
        "Los Ángeles": "Distrito 21",
        "Los Lagos": "Distrito 24",
        "Los Muermos": "Distrito 25",
        "Los Sauces": "Distrito 22",
        "Lota": "Distrito 21",
        "Macul": "Distrito 10",
        "Machalí": "Distrito 15",
        "Malloa": "Distrito 15",
        "Maipú": "Distrito 8",
        "Mariquina": "Distrito 24",
        "María Pinto": "Distrito 14",
        "Marchigüe": "Distrito 16",
        "Máfil": "Distrito 24",
        "Maullin": "Distrito 26",
        "Melipeuco": "Distrito 22",
        "Melipilla": "Distrito 14",
        "Molina": "Distrito 17",
        "Mostazal": "Distrito 15",
        "Mulchén": "Distrito 21",
        "Nancagua": "Distrito 16",
        "Nacimiento": "Distrito 21",
        "Navidad": "Distrito 16",
        "Negrete": "Distrito 21",
        "Ninhue": "Distrito 19",
        "Nogales": "Distrito 6",
        "Nueva Imperial": "Distrito 23",
        "Ñiquén": "Distrito 19",
        "Ñuñoa": "Distrito 10",
        "Olmué": "Distrito 6",
        "Olivar": "Distrito 15",
        "Osorno": "Distrito 25",
        "Palmilla": "Distrito 16",
        "Panquehue": "Distrito 6",
        "Paillaco": "Distrito 24",
        "Paine": "Distrito 14",
        "Paqueldon": "Distrito 26",
        "Papudo": "Distrito 6",
        "Paredones": "Distrito 16",
        "Parral": "Distrito 18",
        "Pedro Aguirre Cerda": "Distrito 13",
        "Peñaflor": "Distrito 14",
        "Peñalolén": "Distrito 11",
        "Pelarco": "Distrito 17",
        "Pelluhue": "Distrito 18",
        "Pemuco": "Distrito 19",
        "Peumo": "Distrito 16",
        "Petorca": "Distrito 6",
        "Pichidegua": "Distrito 16",
        "Pichilemu": "Distrito 16",
        "Pinto": "Distrito 19",
        "Pirque": "Distrito 12",
        "Placilla": "Distrito 16",
        "Providencia": "Distrito 10",
        "Pucón": "Distrito 23",
        "Puchuncaví": "Distrito 6",
        "Pudahuel": "Distrito 8",
        "Puente Alto": "Distrito 12",
        "Puerto Montt": "Distrito 26",
        "Puerto Octay": "Distrito 25",
        "Puerto Varas": "Distrito 25",
        "Pumanque": "Distrito 16",
        "Punitaqui": "Distrito 5",
        "Punta Arenas y toda la region de magallanes": "Distrito 28",
        "Purranque": "Distrito 25",
        "Puyehue": "Distrito 25",
        "Queilen": "Distrito 26",
        "Quellon": "Distrito 26",
        "Quemchi": "Distrito 26",
        "Quilicura": "Distrito 8",
        "Quillón": "Distrito 19",
        "Quillota": "Distrito 6",
        "Quilaco": "Distrito 21",
        "Quileco": "Distrito 21",
        "Quilpue": "Distrito 6",
        "Quinchao": "Distrito 26",
        "Quinta de Tilcoco": "Distrito 15",
        "Quinta Normal": "Distrito 9",
        "Quintero": "Distrito 6",
        "Quirihue": "Distrito 19",
        "Rancagua": "Distrito 15",
        "Ranquil": "Distrito 19",
        "Rauco": "Distrito 17",
        "Recoleta": "Distrito 9",
        "Renaico": "Distrito 22",
        "Rengo": "Distrito 15",
        "Requínoa": "Distrito 15",
        "Renca": "Distrito 9",
        "Retiro": "Distrito 18",
        "Río Bueno": "Distrito 24",
        "Río Claro": "Distrito 17",
        "Río Negro": "Distrito 25",
        "Romeral": "Distrito 17",
        "Saavedra": "Distrito 23",
        "Sagrada Familia": "Distrito 17",
        "San Antonio": "Distrito 7",
        "San Bernardo": "Distrito 14",
        "San Carlos": "Distrito 19",
        "San Clemente": "Distrito 17",
        "San Esteban": "Distrito 6",
        "San Fabián": "Distrito 19",
        "San Felipe": "Distrito 6",
        "San Fernando": "Distrito 16",
        "San Ignacio": "Distrito 19",
        "San Javier": "Distrito 18",
        "San Joaquín": "Distrito 10",
        "San José de Maipo": "Distrito 12",
        "San Juan de la Costa": "Distrito 25",
        "San Miguel": "Distrito 13",
        "San Pablo": "Distrito 25",
        "San Pedro": "Distrito 14",
        "San Pedro de la Paz": "Distrito 20",
        "San Rafael": "Distrito 17",
        "San Ramón": "Distrito 13",
        "San Rosendo": "Distrito 21",
        "San Vicente": "Distrito 16",
        "Santa Bárbara": "Distrito 21",
        "Santa Cruz": "Distrito 16",
        "Santa Juana": "Distrito 20",
        "Santa María": "Distrito 6",
        "Santiago": "Distrito 10",
        "Santo Domingo": "Distrito 7",
        "Talagante": "Distrito 14",
        "Talcahuano": "Distrito 20",
        "Talca": "Distrito 17",
        "Temuco": "Distrito 23",
        "Teno": "Distrito 17",
        "Teodoro Schmidt": "Distrito 23",
        "Tiltil": "Distrito 8",
        "Tirúa": "Distrito 21",
        "Tomé": "Distrito 20",
        "Toltén": "Distrito 23",
        "Traiguén": "Distrito 22",
        "Treguaco": "Distrito 19",
        "Tucapel": "Distrito 21",
        "Valdivia": "Distrito 24",
        "Valparaíso": "Distrito 7",
        "Victoria": "Distrito 22",
        "Vichuquén": "Distrito 17",
        "Villa Alegre": "Distrito 18",
        "Villa Alemana": "Distrito 6",
        "Villarrica": "Distrito 23",
        "Viña del Mar": "Distrito 7",
        "Vitacura": "Distrito 11",
        "Yungay": "Distrito 19",
        "Yerbas Buenas": "Distrito 18",
        "Zapallar": "Distrito 6"


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
            p.includes("popular") || p === "pop" ||
            p.includes("federacion regionalista verde social") || p === "frvs")
            return "Centro Izquierda";
        if (p.includes("democratas") || p === "dem" ||
            p.includes("amarillos por chile") || p === "ama")
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




                // --- AQUÍ VIENE LA LÓGICA DE PARTIDO ---
                const pPartido = document.createElement("p");
                let partidoBase = c.partido || "Independiente";

                if (c.independientePor) {
                    // Mostrar en pantalla como "Independiente – RN"
                    pPartido.innerHTML = `<b>Partido:</b> Independiente – ${c.independientePor}`;
                    // Pero para clasificación y filtros usamos el partido patrocinante
                    partidoBase = c.independientePor;
                } else {
                    // Caso normal
                    pPartido.innerHTML = `<b>Partido:</b> ${partidoBase}`;
                }

                const pDistrito = document.createElement("p");
                pDistrito.innerHTML = `<b>Distrito:</b> ${c.distrito || "No especificado"}`;


                // Posición política basada en el partido base
                const posicion = getPosicionPolitica(partidoBase);
                const posDiv = document.createElement("div");
                posDiv.textContent = posicion;
                posDiv.className = `posicion ${getPosicionClass(posicion)}`;
                card.appendChild(posDiv);

                // --- Agregar todo al card ---
                card.appendChild(img);
                card.appendChild(h3);
                card.appendChild(pCargo);
                card.appendChild(pPartido);
                card.appendChild(pDistrito);
                if (c.reeleccion && c.cargo) {
                    const cargoLower = c.cargo.toLowerCase();
                    if (cargoLower.includes("diputado") || cargoLower.includes("senador")) {
                        const pReeleccion = document.createElement("p");
                        pReeleccion.innerHTML = `<b>Reelección:</b> Sí`;
                        // Inserta inmediatamente DESPUÉS de pDistrito
                        pDistrito.insertAdjacentElement("afterend", pReeleccion);
                    }
                }
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
