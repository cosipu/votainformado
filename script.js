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

    if (p.includes("partido de trabajadores revolucionarios") || p === "ptr"||
    p.includes("upa") || p === "upa"
) return "Extrema Izquierda";
    if (p.includes("partido comunista") || p === "pc" ||
        p.includes("partido socialista") || p === "ps") return "Izquierda";
    if (
      p.includes("frente amplio") || p === "fa" ||
      p.includes("partido por la democracia") || p === "ppd" ||
      p.includes("partido liberal") || p === "pl" ||
      p.includes("partido radical") || p === "pr" ||
      p.includes("accion humanista") || p === "ah" ||
      p.includes("frente regionalista verde social") || p === "frvs"
    ) return "Centro Izquierda";
    if (p.includes("democratas") || p === "dem" ||
        p.includes("amarillos por chile") || p === "ama" ||
        p.includes("partido popular") || p === "pop") return "Centro";
    if (p.includes("evopoli") || p === "evo" || p.includes("evópoli") ||
        p.includes("democrata cristiano") || p === "dc" || p === "pdc") return "Centro Derecha";
    if (
      p.includes("union democrata independiente") || p === "udi" ||
      p.includes("partido de la gente") || p === "pdg" ||
      p.includes("renovacion nacional") || p === "rn"
    ) return "Derecha";
    if (p.includes("partido republicano") || p.includes("republicanos") ||
        p.includes("partido social cristiano") || p.includes("social cristiano") ||
        p.includes("partido nacional libertario") || p.includes("libertario")) return "Extrema Derecha";

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

        // Foto
        const img = document.createElement("img");
        img.src = c.foto || PLACEHOLDER_IMG;
        img.alt = c.nombre || "Candidato/a";

        // Nombre
        const h3 = document.createElement("h3");
        h3.textContent = c.nombre || "Sin nombre";

        // Cargo
        const pCargo = document.createElement("p");
        pCargo.innerHTML = `<b>Cargo:</b> ${c.cargo || "—"}`;

        // Partido
        const pPartido = document.createElement("p");
        pPartido.innerHTML = `<b>Partido:</b> ${c.partido || "Independiente"}`;

        // Distrito
        const pDistrito = document.createElement("p");
        pDistrito.innerHTML = `<b>Distrito:</b> ${c.distrito || "No especificado"}`;

        // Posición política
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

        // === NUEVO: Cantidad de veces presentado a elecciones populares ===
        let vecesElecciones = 0;
        if (Array.isArray(c.elecciones) && c.elecciones.length) {
          vecesElecciones = c.elecciones.filter(e => e.tipo === "popular").length;
        }
        const elecDiv = document.createElement("div");
        elecDiv.className = "elecciones-info";
        elecDiv.textContent = `Se ha presentado ${vecesElecciones} veces a elecciones populares`;
        card.appendChild(elecDiv);

        // Antecedentes / Delitos
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

  // Filtro
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
